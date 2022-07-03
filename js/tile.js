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
        if(monster.isPlayer && this.treasure){   
            score++;
            if(score % 3 == 0 && numSpells < 6){                         
                numSpells++;                
                player.addSpell();            
            }  
            playSound("treasure");                        
            this.treasure = false;
            spawnMonster();
        }

        if (monster.isPlayer && this.tier1Sword){
            numSword +=1;
            player.addSword();
            playSound("treasure")
            this.tier1Sword = false;
        }
    }

}

class Wall extends Tile{
    constructor(x, y){
        super(x, y, 3, false);
    }
}

class Exit extends Tile{
    constructor(x, y){
        super(x, y, 11, true);
    }

    stepOn(monster){
        if(monster.isPlayer){
            playSound("newLevel");
            welldepleted = false  
            if(level === numLevels){
                addScore(score, true); 
                showTitle();
            }else{
                level++;
                startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
            }
        }
    }
}

class Well extends Tile{
    constructor(x, y){
        super(x, y, 19, true);
    }

    stepOn(monster){
        if(monster.isPlayer && welldepleted === false){
            playSound("well");
            welldepleted = true;
            if(player.hp === maxHp){
                score += 6;
                numSpells += 1;
                player.addSpell();
                numSpells += 1;
                player.addSpell();
            }else{
                player.hp = maxHp;
                score += 3;
                numSpells += 1;
                player.addSpell();
            }
                for(let i=1;i<numTiles-1;i++){
                    let findwell = tiles[i].findIndex((tile) => tile instanceof Well);
                    console.log(findwell);
                if (findwell !== -1){
                        let tile = getTile(i, findwell);
                        tile.replace(EmptyWell);
                }
            }
        }
    }
}

class EmptyWell extends Tile{
    constructor(x, y){
        super(x, y, 20, true);
    }
}