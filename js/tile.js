readyToExit = false;
readyToDrink = false;

class Tile{
	constructor(x, y, sprite, passable){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.passable = passable;
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
        super(x, y, 2, true);
    };

    stepOn(monster){
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
        if(monster.isPlayer && !this.well){
            readyToDrink = false;
        }

        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells += 1;                
                player.addSpell();            
            }  
            playSound("treasure");                        
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
    };
};

class BossFloor extends Tile{
    constructor(x,y){
        super(x, y, 23, true);
    };
    stepOn(monster){
        if(monster.isPlayer && !this.exit){
            readyToExit = false;
        }
    }
};

class Wall extends Tile{
    constructor(x, y){
        super(x, y, 3, false);
    }
};

class BossWall extends Tile{
    constructor(x, y){
        super(x, y, 24, false);
    }
};

class Exit extends Tile{
    constructor(x, y){
        super(x, y, 11, true);
        this.exit = true;
    }

    stepOn(monster){
        if(monster.isPlayer){
            readyToExit = true;
            console.log(readyToExit);          
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
            this.tier1Sword = false;
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
            playSound("treasure");                        
            this.treasure = false;
            spawnMonster();
        }

    }
}

class Well extends Tile{
    constructor(x, y){
        super(x, y, 19, true);
        this.well = true;
    }

    stepOn(monster){
        if(monster.isPlayer && welldepleted === false){
            readyToDrink = true;
            console.log(readyToDrink);
        }
    }
}

class EmptyWell extends Tile{
    constructor(x, y){
        super(x, y, 20, true);
    }

    stepOn(monster){
        if(monster.isPlayer && welldepleted ===true){
           playSound("empty_well");
        }
    }
}

class Rubble extends Tile{
    constructor(x, y){
        super(x, y, 26, true);
    }

    stepOn(monster){
        if(monster.isPlayer){
            console.log(player.hp);
            player.hp -= 1;
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
    }


};