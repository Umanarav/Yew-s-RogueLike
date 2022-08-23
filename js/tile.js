readyToExit = false;
readyToDrink = false;
standingInFire = false;
readyToMutate = true;
unlockDoor0 = false;
unlockDoor1 = false;

boss2bButtonRPushed = false;
boss2bButtonRSprite = 73;

boss2bButtonLPushed = false;

reveal2bHelper = false;

class Tile{
	constructor(x, y, sprite, passable, hazard, object, exit, button, eatable, pylon, hp){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.passable = passable;
        this.hazard = hazard;
        this.object = object;
        this.exit = exit;
        this.button = button;
        this.eatable = eatable;
        this.pylon = pylon;
        this.hp = hp;
	}

	replace(newTileType){
        tiles[this.x][this.y] = new newTileType(this.x, this.y);
        return tiles[this.x][this.y];
    }

	//manhattan distance
    dist(other){
        return Math.abs(this.x-other.x)+Math.abs(this.y-other.y);
    }

	getNeighbor(dx, dy){
        return getTile(this.x + dx, this.y + dy)
    }

    getAdjacentNeighbors(){
        return shuffle([
            this.getNeighbor(0, -1),
            this.getNeighbor(0, 1),
            this.getNeighbor(-1, 0),
            this.getNeighbor(1, 0)
        ]);
    }

    getAdjacentPassableNeighbors(){
        return this.getAdjacentNeighbors().filter(t => t.passable);
    }

    getConnectedTiles(){
        let connectedTiles = [this];
        let frontier = [this];
        while(frontier.length){
            let neighbors = frontier.pop()
                                .getAdjacentPassableNeighbors()
                                .filter(t => !connectedTiles.includes(t));
            connectedTiles = connectedTiles.concat(neighbors);
            frontier = frontier.concat(neighbors);
        }
        return connectedTiles;
    }

	draw(){
        drawSprite(this.sprite, this.x, this.y);

        if(this.treasure){                      
            drawSprite(12, this.x, this.y);                                             
        }
        if(this.tier1Sword){
            drawSprite(21, this.x, this.y)
        }
        if(this.tier1Armor){
            drawSprite(22, this.x, this.y)
        }

        if(this.effectCounter){                    
            this.effectCounter--;
            ctx.globalAlpha = this.effectCounter/30;
            drawSprite(this.effect, this.x, this.y);
            ctx.globalAlpha = 1;
        }
	}

    setEffect(effectSprite){                                  
        this.effect = effectSprite;
        this.effectCounter = 30;
    }

    update(){

    }

}

class Floor extends Tile{
    constructor(x,y){
        super(x, y, 2, true, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };

    stepOn(monster){
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
            standingInFire = false;
        }
        if(monster.isPlayer && !this.well){
            readyToDrink = false;
            standingInFire = false;
        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            if (level < 6){
                spawnMonster();
            }
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
                numSword +=1;
                player.addSword();
                playSound("pickup_sword");
                this.tier1Sword = false;
            }else{
                score +=1;
                this.tier1Sword = false;
                playSound("pickup_sword");
                return;
                }

        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
                numArmor +=1;
                player.addArmor();
                playSound("pickup_armor")
                this.tier1Armor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }
        }
    };
};

class BossFloor extends Tile{
    constructor(x,y){
        super(x, y, 23, true);
        //x, y, sprite, passable, hazard, object, exit
    };
    stepOn(monster){
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }
    }
};

class MutateFloor extends Tile{
    constructor(x,y){
        super(x, y, 33, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if(monster.isPlayer && !this.well){
            readyToDrink = false;
            standingInFire = false;
        }
        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
                numSword +=1;
                player.addSword();
                playSound("pickup_sword");
                this.tier1Sword = false;
            }else{
                score +=1;
                this.tier1Sword = false;
                playSound("pickup_sword");
                return;
                }
        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
                numArmor +=1;
                player.addArmor();
                playSound("pickup_armor")
                this.tier1Armor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }
        }

        if(monster.isShadow || monster.isMirror){
            if (level > 6 && level < 13){
                if (unlockDoor0 === true){
                    unlockDoor0 = false;
                playSound("buttonOut");
                    for(let i=1;i<numTiles-1;i++){
                        let findMutateFloorButton = tiles[i].findIndex((tile) => tile instanceof MutateFloorButton);
                        if (findMutateFloorButton !== -1){
                            let tile = getMutateTile(i, findMutateFloorButton);
                            tile.replace(MutateFloorButton);
                            break;
                        }
                    }
                    for(let i=1;i<numTiles-1;i++){
                        let findExit = tiles[i].findIndex((tile) => tile instanceof Exit);
                        if (findExit !== -1){
                            let tile = getMutateTile(i, findExit);
                            tile.replace(ExitLocked);
                            playSound("doorLocked");
                            break;
                        }
                    }
                }          
            }

            if (level === 8 || level === 10 || level === 11 || level === 12 ){
                if (unlockDoor1 === true){
                    unlockDoor1 = false;
                playSound("buttonOut");
                    for(let i=1;i<numTiles-1;i++){
                        let findMutateFloorButton2 = tiles[i].findIndex((tile) => tile instanceof MutateFloorButton2);
                        if (findMutateFloorButton2 !== -1){
                            let tile = getMutateTile(i, findMutateFloorButton2);
                            tile.replace(MutateFloorButton2);
                            break;
                        }
                    }
                }

                    if(unlockDoor1 === false || unlockDoor0 === false){
                        for(let i=1;i<numTiles-1;i++){
                            let findExit = tiles[i].findIndex((tile) => tile instanceof Exit);
                            if (findExit !== -1){
                                let tile = getMutateTile(i, findExit);
                                tile.replace(ExitLocked);
                                playSound("doorLocked");
                                break;
                            }
                        }  
                    } 
                  
            }

            /*if (level === 8 && unlockDoor1 === true && unlockDoor0 === true || level === 10 && unlockDoor1 === true && unlockDoor0 === true || level === 12 && unlockDoor1 === true && unlockDoor0 === true){
                for(let i=1;i<numTiles-1;i++){
                        let findExitLocked = tiles[i].findIndex((tile) => tile instanceof ExitLocked);
                        if (findExitLocked !== -1){
                            let tile = getMutateTile(i, findExitLocked);
                            tile.replace(Exit);
                            break;
                        }
                    }      
            }*/

        }
    }
};

class EaterMutateFloor extends Tile{
    constructor(x,y){
        super(x, y, 35, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
                numSword +=1;
                player.addSword();
                playSound("pickup_sword");
                this.tier1Sword = false;
            }else{
                score +=1;
                this.tier1Sword = false;
                playSound("pickup_sword");
                return;
                }
        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
                numArmor +=1;
                player.addArmor();
                playSound("pickup_armor")
                this.tier1Armor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }
        }

        if(monster.isShadow || monster.isMirror){
            if (level > 6 && unlockDoor0 === false){
                unlockDoor1 = false;
            }
            unlockDoor0 = false;
        }
    }
};

class EaterMutateBossFloor extends Tile{
    constructor(x,y){
        super(x, y, 67, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if (monster.isPlayer && boss2bButtonRPushed === true){
            boss2bButtonRPushed = false;
            cancelAnimationFrame(myReq);
            tiles[6][5] = new boss2bButtonR(6, 5);

            playSound('buttonOut');
        }
        if (monster.isPlayer && boss2bButtonLPushed === true){
            boss2bButtonLPushed = false;
            playSound('buttonOut');
            reveal2bHelperCounter = 233;
        }    
    }
};

class EaterMutateBossFloorCableDormant1 extends Tile{
    constructor(x,y){
        super(x, y, 101, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if (monster.isPlayer && boss2bButtonRPushed === true){
            boss2bButtonRPushed = false;
            cancelAnimationFrame(myReq);
            tiles[6][5] = new boss2bButtonR(6, 5);

            playSound('buttonOut');
        }
        if (monster.isPlayer && boss2bButtonLPushed === true){
            boss2bButtonLPushed = false;
            playSound('buttonOut');
            reveal2bHelperCounter = 233;
        }    
    }
};

class EaterMutateBossFloorCableDormant2 extends Tile{
    constructor(x,y){
        super(x, y, 102, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if (monster.isPlayer && boss2bButtonRPushed === true){
            boss2bButtonRPushed = false;
            cancelAnimationFrame(myReq);
            tiles[6][5] = new boss2bButtonR(6, 5);

            playSound('buttonOut');
        }
        if (monster.isPlayer && boss2bButtonLPushed === true){
            boss2bButtonLPushed = false;
            playSound('buttonOut');
            reveal2bHelperCounter = 233;
        }    
    }
};

class EaterMutateBossFloorCableDormant3 extends Tile{
    constructor(x,y){
        super(x, y, 103, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if (monster.isPlayer && boss2bButtonRPushed === true){
            boss2bButtonRPushed = false;
            cancelAnimationFrame(myReq);
            tiles[6][5] = new boss2bButtonR(6, 5);

            playSound('buttonOut');
        }
        if (monster.isPlayer && boss2bButtonLPushed === true){
            boss2bButtonLPushed = false;
            animateDormantCable();
            playSound('buttonOut');
            reveal2bHelperCounter = 233;
        }    
    }
};

class EaterMutateBossFloorCableActive1 extends Tile{
    constructor(x,y){
        super(x, y, 105, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if (monster.isPlayer && boss2bButtonRPushed === true){
            boss2bButtonRPushed = false;
            cancelAnimationFrame(myReq);
            tiles[6][5] = new boss2bButtonR(6, 5);

            playSound('buttonOut');
        }
        if (monster.isPlayer && boss2bButtonLPushed === true){
            boss2bButtonLPushed = false;
            playSound('buttonOut');
            reveal2bHelperCounter = 233;
        }    
    }
};

class EaterMutateBossFloorCableActive2 extends Tile{
    constructor(x,y){
        super(x, y, 106, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if (monster.isPlayer && boss2bButtonRPushed === true){
            boss2bButtonRPushed = false;
            cancelAnimationFrame(myReq);
            tiles[6][5] = new boss2bButtonR(6, 5);

            playSound('buttonOut');
        }
        if (monster.isPlayer && boss2bButtonLPushed === true){
            boss2bButtonLPushed = false;
            
            playSound('buttonOut');
            reveal2bHelperCounter = 233;
        }    
    }
};

class EaterMutateBossFloorCableActive3 extends Tile{
    constructor(x,y){
        super(x, y, 107, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if (monster.isPlayer && boss2bButtonRPushed === true){
            boss2bButtonRPushed = false;
            cancelAnimationFrame(myReq);
            tiles[6][5] = new boss2bButtonR(6, 5);

            playSound('buttonOut');
        }
        if (monster.isPlayer && boss2bButtonLPushed === true){
            boss2bButtonLPushed = false;
            playSound('buttonOut');
            reveal2bHelperCounter = 233;
        }    
    }
};

class EaterMutateBossFloor2 extends Tile{
    constructor(x,y){
        super(x, y, 69, true, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit//
    };
    stepOn(monster){
        readyToMutate = false;
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }



    }
};

class MutateFloorButton extends Tile{
    constructor(x,y){
        super(x, y, 29, true, false, false, false, true);
        //x, y, sprite, passable, hazard, object, exit, buttonpressed//
    };
    stepOn(monster){
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }
        if(monster.isShadow || monster.isMirror){
            unlockDoor0 = true;
            playSound("buttonIn");
            this.sprite = 91;
            //console.log(unlockDoor0, "unlockdoor");
            if (level === 7 || level === 9 || level === 11 ){
                for(let i=1;i<numTiles-1;i++){
                let findExitLocked = tiles[i].findIndex((tile) => tile instanceof ExitLocked);
                    if (findExitLocked !== -1){
                        let tile = getMutateTile(i, findExitLocked);
                        tile.replace(Exit);
                        playSound("unlockDoor");
                        break;
                    }
                }
            }else if (level === 8 || level === 10 || level === 11 || level === 12){
                if(unlockDoor0 === true && unlockDoor1 === true){
                    playSound("buttonIn");
                    for(let i=1;i<numTiles-1;i++){
                    let findExitLocked = tiles[i].findIndex((tile) => tile instanceof ExitLocked);
                        if (findExitLocked !== -1){
                            let tile = getMutateTile(i, findExitLocked);
                            tile.replace(Exit);
                            playSound("unlockDoor");
                            break;
                        }
                    }

                }

            }
            
        }
        
    }

    update(){
        if(unlockDoor0 === true){
            this.sprite = 91;
        }else if (unlockDoor0 === false){
            this.sprite = 29;
        }
    }
};

class MutateFloorButton2 extends Tile{
    constructor(x,y){
        super(x, y, 29, true, false, false, false, true);
        //x, y, sprite, passable, hazard, object, exit, buttonpressed//
    };
    stepOn(monster){
        standingInFire = false;
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }
        if(monster.isShadow || monster.isMirror){
            unlockDoor1 = true;
            playSound("buttonIn");
            this.sprite = 91;
            //console.log(unlockDoor0, "unlockdoor");
            if (level === 8 || level === 10 || level === 11 || level === 12){
                if(unlockDoor0 === true && unlockDoor1 === true){
                    for(let i=1;i<numTiles-1;i++){
                    let findExitLocked = tiles[i].findIndex((tile) => tile instanceof ExitLocked);
                        if (findExitLocked !== -1){
                            let tile = getMutateTile(i, findExitLocked);
                            tile.replace(Exit);
                            playSound("unlockDoor");
                            break;
                        }
                    }

                }

            }
        }

    }
};

class Wall extends Tile{
    constructor(x, y){
        super(x, y, 3, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit
    }
};

class EatableWall extends Tile{
    constructor(x, y){
        super(x, y, 3, false, false, false, false, false, true);
        //x, y, sprite, passable, hazard, object, exit, button, uneatable
        this.uneatable = true;
    }
};

class BossWall extends Tile{
    constructor(x, y){
        super(x, y, 24, false);
    }
};
class EatableBossWall extends Tile{
    constructor(x, y){
        super(x, y, 24, false, false, false, false, false, true);
    }
};

class MutateWall extends Tile{
    constructor(x, y){
        super(x, y, 34, false);
    }
};
class EatableMutateWall extends Tile{
    constructor(x, y){
        super(x, y, 34, false, false, false, false, false, true);
    }
};


class EaterMutateWall extends Tile{
    constructor(x, y){
        super(x, y, 36, false);
    }
};
class EatableEaterMutateWall extends Tile{
    constructor(x, y){
        super(x, y, 36, false, false, false, false, false, true);
    }
};

class EaterMutateBossWall extends Tile{
    constructor(x, y){
        super(x, y, 68, false);
    }
};

class EaterMutateBossWall2 extends Tile{
    constructor(x, y){
        super(x, y, 70, false, false, false, false, false, true);
    }
};

class EaterMutateBossWall3 extends Tile{
    constructor(x, y){
        super(x, y, 72, false, false, false, false, false, true, true, 2);

    }
};

class Exit extends Tile{
    constructor(x, y){
        super(x, y, 11, true, false, false, true);
        /*x, y, sprite, passable, hazard, object, exit*/
        this.exit = true;
    }

    stepOn(monster){
        if(monster.isPlayer){
            readyToExit = true;
            readyToDrink = false;
            standingInFire = false;          
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
            numSword +=1;
            player.addSword();
            playSound("pickup_sword");
            this.tier1Sword = false;
        }else{
            score +=1;
            this.tier1Sword = false;
            playSound("pickup_sword");
            return;
            }
        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
            numArmor +=1;
            player.addArmor();
            playSound("pickup_armor")
            this.tier1Armor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }

        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }

    }
}

class ExitLocked extends Tile{
    constructor(x, y){
        super(x, y, 92, true, false, false, true);
        /*x, y, sprite, passable, hazard, object, exit*/
        this.exit = true;
    }

    stepOn(monster){
        if(monster.isPlayer){
            readyToExit = true;
            readyToDrink = false;
            standingInFire = false;          
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
            numSword +=1;
            player.addSword();
            playSound("pickup_sword");
            this.tier1Sword = false;
        }else{
            score +=1;
            this.tier1Sword = false;
            playSound("pickup_sword");
            return;
            }
        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
            numArmor +=1;
            player.addArmor();
            playSound("pickup_armor")
            this.tier1Armor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }

        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }

    }
}

class MutateExit extends Tile{
    constructor(x, y){
        super(x, y, 30, true, false, false, true);
        /*x, y, sprite, passable, hazard, object, exit*/
        this.exit = true;
    }
    stepOn(monster){
        if(monster.isPlayer){
            readyToExit = true;
            standingInFire = false;          
        }
    }
}

class Well extends Tile{
    constructor(x, y){
        super(x, y, 19, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.well = true;
    }

    stepOn(monster){
        if(monster.isPlayer && welldepleted === false){
            readyToDrink = true;
            readyToExit = false;
            standingInFire = false;
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
            numSword +=1;
            player.addSword();
            playSound("pickup_sword");
            this.tier1Sword = false;
        }else{
            score +=1;
            this.tier1Sword = false;
            playSound("pickup_sword");
            return;
            }
        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
            numArmor +=1;
            player.addArmor();
            playSound("pickup_armor")
            this.tier1Armor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }

        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }
    }
}

class EmptyWell extends Tile{
    constructor(x, y){
        super(x, y, 20, true, false, true);
    }

    stepOn(monster){
        if(monster.isPlayer && welldepleted ===true){
           playSound("empty_well");
           standingInFire = false;
           readyToExit = false;
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
            numSword +=1;
            player.addSword();
            playSound("pickup_sword");
            this.tier1Sword = false;
        }else{
            score +=1;
            this.tier1Sword = false;
            playSound("pickup_sword");
            return;
            }
        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
            numArmor +=1;
            player.addArmor();
            playSound("pickup_armor")
            this.tierArmor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }

        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }
    }
}

class Rubble extends Tile{
    constructor(x, y){
        super(x, y, 26, true, true);
    }

    stepOn(monster){
        if(monster.isPlayer){
            console.log(player.hp);
            standingInFire = true;
            if(player.hp <= 0){
                addScore(score, false);   
                tier1SwordEquipped = false;
                tier1ArmorEquipped = false;
                readyToExit = false;
                gameState = "dead";
            }
            console.log(player.hp);
            playSound("hit1");
        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }
    }
};

class MagicRubble extends Tile{
    constructor(x, y){
        super(x, y, 28, true, true);
    }

    stepOn(monster){
        if(monster.isPlayer){
            console.log(player.hp);
            standingInFire = true;
            if(player.hp <= 0){
                player.dead = true;
                addScore(score, false);   
                tier1SwordEquipped = false;
                tier1ArmorEquipped = false;
                readyToExit = false;
                gameState = "dead";
            }
            console.log(player.hp);
            playSound("hit1");
        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
            numSword +=1;
            player.addSword();
            playSound("pickup_sword");
            this.tier1Sword = false;
        }else{
            score +=1;
            this.tier1Sword = false;
            playSound("pickup_sword");
            return;
            }
        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
            numArmor +=1;
            player.addArmor();
            playSound("pickup_armor")
            this.tierArmor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }

        }

    }
};

class Mutation1 extends Tile{
    constructor(x,y){
        super(x, y, 29, true);
    };

    stepOn(monster){
        if(monster.isPlayer && mutatedepleted === false){
            readyToMutate = true;
            readyToExit = false;
            standingInFire = false;
            console.log(readyToMutate);
        }

        if(monster.isPlayer && !this.exit){
            readyToExit = false;
            standingInFire = false;
        }
        if(monster.isPlayer && !this.well){
            readyToDrink = false;
            standingInFire = false;
        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playTreasureSounds();                        
            this.treasure = false;
            spawnMonster();
        }

        if (monster.isPlayer && this.tier1Sword){
            if(numSword === 0){
                numSword +=1;
                player.addSword();
                playSound("pickup_sword");
                this.tier1Sword = false;
            }else{
                score +=1;
                this.tier1Sword = false;
                playSound("pickup_sword");
                return;
                }

        }

        if (monster.isPlayer && this.tier1Armor){
            if(numArmor === 0){
                numArmor +=1;
                player.addArmor();
                playSound("pickup_armor")
                this.tier1Armor = false;
        }else{
            score +=1;
            this.tier1Armor = false;
            playSound("pickup_armor");
            return;
            }
        }
    }


};

class boss2bButtonR extends Tile{
    constructor(x, y){
        super(x, y, 73, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }

    stepOn(monster){
        if(monster.isPlayer && boss2bHP > 0){
            boss2bButtonRPushed = true;
            if (reveal2bHelperCounter > 0){
                this.sprite = 93;
                animateTile();
            }else {
                this.sprite = 75;    
            }
                
             playSound('buttonIn');   
        }
    }
}

class boss2bButtonR2 extends Tile{
    constructor(x, y){
        super(x, y, 93, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}

class boss2bButtonR3 extends Tile{
    constructor(x, y){
        super(x, y, 94, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}

class boss2bButtonR4 extends Tile{
    constructor(x, y){
        super(x, y, 95, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}

class boss2bButtonR5 extends Tile{
    constructor(x, y){
        super(x, y, 96, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}

class boss2bButtonR6 extends Tile{
    constructor(x, y){
        super(x, y, 97, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}

class boss2bButtonR7 extends Tile{
    constructor(x, y){
        super(x, y, 98, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}

class boss2bButtonR8 extends Tile{
    constructor(x, y){
        super(x, y, 99, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}

class boss2bButtonRPushedCosmetic extends Tile{
    constructor(x, y){
        super(x, y, 75, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonR = true;
    }
    stepOn(monster){
        console.log('teehee, that tickles');
    }
}


class boss2bButtonL extends Tile{
    constructor(x, y){
        super(x, y, 77, true, false, true, false);
        //x, y, sprite, passable, hazard, object, exit
        this.boss2bButtonL = true;
    }

    stepOn(monster){
        if(monster.isPlayer && boss2bHP > 0){
            boss2bButtonLPushed = true;
            this.sprite = 79;
            animateActiveCable();
            playSound('buttonIn');
            playSound("powderFuseTicking");

            reveal2bHelper = true;
            console.log(reveal2bHelper + 'button L pushed');
            reveal2bHelperCounter = 1;   
        }
    }
}