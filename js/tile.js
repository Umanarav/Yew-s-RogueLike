readyToExit = false;
readyToDrink = false;
standingInFire = false;
readyToMutate = true;
unlockDoor0 = false;
unlockDoor1 = false;

class Tile{
	constructor(x, y, sprite, passable, hazard, object, exit, button){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.passable = passable;
        this.hazard = hazard;
        this.object = object;
        this.exit = exit;
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
            if (level > 6 && unlockDoor0 === true){
                unlockDoor0 = false;
            }
            if (level > 6 && unlockDoor1 === true){
                unlockDoor1 = false;
            }
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
            //console.log(unlockDoor0, "unlockdoor");
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
            //console.log(unlockDoor0, "unlockdoor");
        }

    }
};

class Wall extends Tile{
    constructor(x, y){
        super(x, y, 3, false, false, false, false);
        //x, y, sprite, passable, hazard, object, exit
    }
};

class BossWall extends Tile{
    constructor(x, y){
        super(x, y, 24, false);
    }
};

class MutateWall extends Tile{
    constructor(x, y){
        super(x, y, 34, false);
    }
};
class EaterMutateWall extends Tile{
    constructor(x, y){
        super(x, y, 36, false);
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