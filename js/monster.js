let bossDamageReduction = 1;
eatsWalls = false;

class Monster{
	constructor(tile, sprite, hp){
        this.move(tile);
        this.sprite = sprite;
        this.hp = hp;
        this.teleportCounter = 2;
        this.offsetX = 0;                                                   
        this.offsetY = 0;
        this.lastMove = [-1,0];
        this.bonusAttack = 0;
        this.baseAttack = 1;
        this.damageReduction = 1;
	}

	heal(damage){
        this.hp = Math.min(maxHp, this.hp+damage);
    }

	update(){
		this.teleportCounter--;
		if(this.stunned || this.teleportCounter > 0){ 
            this.stunned = false;
                if(this.isBoss && Math.random() > .5){
                    this.doStuff();
                }else{
                return;
            }
        }
        this.doStuff();
    }

    doStuff(){
       let neighbors = this.tile.getAdjacentPassableNeighbors();
       
       neighbors = neighbors.filter(t => !t.monster || t.monster.isPlayer);

       if(neighbors.length){
           neighbors.sort((a,b) => a.dist(player.tile) - b.dist(player.tile));
           let newTile = neighbors[0];
           this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);
       }
    }

    doStuffOpposite(){
       let neighbors = this.tile.getAdjacentPassableNeighbors();
       
       neighbors = neighbors.filter(t => !t.monster || t.monster.isPlayer);

       if(neighbors.length){
           neighbors.sort((a,b) => a.dist(player.tile) + b.dist(player.tile));
           let newTile = neighbors[0];
           this.tryMove(newTile.x - this.tile.x, newTile.y - this.tile.y);
       }
    }

    getDisplayX(){                     
        return this.tile.x + this.offsetX;
    }

    getDisplayY(){                                                                  
        return this.tile.y + this.offsetY;
    }   

	draw(){
		if(this.teleportCounter > 0){                                        
           	drawSprite(10, this.getDisplayX(),  this.getDisplayY());                     
        }else{        
	        drawSprite(this.sprite, this.getDisplayX(),  this.getDisplayY());
	        this.drawHp();
	    }

	    this.offsetX -= Math.sign(this.offsetX)*(1/8);     
        this.offsetY -= Math.sign(this.offsetY)*(1/8); 
	}

	drawHp(){
        for(let i=0; i<this.hp; i++){
            drawSprite(
                9,
                this.getDisplayX() + (i%6)*(2.66666666667/16),   
                this.getDisplayY() - Math.floor(i/6)*(2.66666666667/16)
            );
        }
    }	

	tryMove(dx, dy){
        let newTile = this.tile.getNeighbor(dx,dy);
        if(newTile.passable){
        	this.lastMove = [dx,dy];
            if(!newTile.monster && !newTile.player){
                this.move(newTile);
            }else{
              	if(this.isPlayer != newTile.monster.isPlayer){
                    this.attackedThisTurn = true;
                    newTile.monster.stunned = true;

                    newTile.monster.hit((this.baseAttack + this.bonusAttack));
                    this.bonusAttack = 0;

                    shakeAmount = 4;

                    this.offsetX = (newTile.x - this.tile.x)/2;         
                    this.offsetY = (newTile.y - this.tile.y)/2;
                }
            }
            return true;
        }
        if(!newTile.passable && this.isPlayer){
            this.lastMove = [dx,dy];
            for(let k=monsters.length-1;k>=0;k--){
                if(!monsters[k].dead){
                monsters[k].update();
                }else{
                monsters.splice(k,1);
                }   
            }

            if(eatsWalls === true){
                console.log(eatsWalls, "should eat this")
                player.hp += 0.5
                if (level >= 14){
                    if (Math.random() >= .21){
                        newTile.replace(EaterMutateFloor);    
                    }else {
                        newTile.replace(Exit);    
                    }

                }else if (level > 6 && level <= 13){
                    newTile.replace(MutateFloor);    
                }
                /*let neighbors = this.tile.getAdjacentNeighbors().filter(t => !t.passable && inBounds(t.x,t.y));
                if(neighbors.length){
                    if(level > 6){
                        neighbors[0].replace(MutateFloor);
                        this.heal(0.5);*/
            }
        }

    }

    hit(damage){
    	 if(this.shield>0){           
            return;                                                             
        }
        
        if (this.isPlayer){
            this.hp -= ((damage)/this.damageReduction);
        }else if(this.isBoss){
            this.hp -= ((damage)/bossDamageReduction);
        }else {
            this.hp -= (damage);
        }

        
        if(this.hp <= 0){
            this.die();

            if(this.isBird && numSword === 0){
                if(Math.random() < 0.5){
                    randomPassableTile().tier1Sword = true;
                }
            }else if(this.isBird && numSword >= 1){
                if(Math.random() < 0.5){
                    randomPassableTile().treasure = true;
                }
            }

            if(this.isTank && numArmor === 0){
                if(Math.random() < 0.5){
                    randomPassableTile().tier1Armor = true;
                }
            }else if(this.isTank && numArmor >= 1){
                if(Math.random() < 0.5){
                    randomPassableTile().treasure = true;
                }
            }

            if(this.isBoss){
                randomPassableTile().replace(MutateExit);
            }
            if(this.isShadow === true || this.isMirror === true){
                spawnAdditionalPaperweight();
            }

        }

        if(this.isPlayer){                                                     
            playSound("hit1");                                              
        }else{                                                       
            playSound("hit2");                                              
        }   

    }

    die(){
        this.dead = true;
        this.tile.monster = null;
        if(this.isPlayer){
            this.sprite = 1;
            gameState = "dead";
            moonShoes = false;
        }
    }

    move(tile){
        if(this.tile){
            this.tile.monster = null;
            this.offsetX = this.tile.x - tile.x;    
            this.offsetY = this.tile.y - tile.y;
        }
        this.tile = tile;
        tile.monster = this;
        tile.stepOn(this);
    }

}

class Player extends Monster{
	    constructor(tile){
	        super(tile, 0, 3);
	        this.isPlayer = true;
	        this.teleportCounter = 0;
	        this.spells = (Object.keys(spells)).splice(0,numSpells);
	        this.swords = (Object.keys(swords)).splice(0,numSword);
            this.armors = (Object.keys(armors)).splice(0,numArmor);
	    }

	    update(){          
        this.shield--;                                                      
    	} 

	    tryMove(dx, dy){
	        if(super.tryMove(dx,dy)){
	            tick();
	        }
	    }

	    addSpell(){
            if(numSpells < 6){                                                       
    	        let newSpell = (Object.keys(spells))[numSpells - 1];
    	        this.spells.push(newSpell);
            }
	    }

	    castSpell(index){                                                   
	        let spellName = this.spells[index];
	        if(spellName){
	            delete this.spells[index];
	            spells[spellName]();
	            playSound("spell");
	            tick();
	        }
	    }

	    addSword(){ 
            let newSword = (Object.keys(swords))[numSword - 1];                                                      
	        this.swords.push(newSword);
	    }

	    equipSword(index){                                                   
	        let swordName = this.swords[index];
	        if(swordName){
	            swords[swordName]();
	            playSound("equip_sword");
	            tick();
	        }
	    }

        addArmor(){ 
            let newArmor = (Object.keys(armors))[0];                                                      
            this.armors.push(newArmor);
        }

        equipArmor(index){                                                   
            let armorName = this.armors[index];
                if(armorName){
                armors[armorName]();
                playSound("equip_armor");
                tick();
            }
        }

}

class Bird extends Monster{
    constructor(tile){
        super(tile, 4, 3);
        this.isBird = true;
    }
    doStuff(){
        super.doStuff();
    }
}

class Mage extends Monster{
    constructor(tile){
        super(tile, 27, 2);
        this.isMage = true;
    }

    doStuff(){
        let mageX = Math.floor(Math.random() * 3)
        let mageY = Math.floor(Math.random() * 3)

        if (Math.random() > 0.5){
            this.tryMove(-1 * (mageX), -1 * (mageY));  
        }else {
            this.tryMove(mageX, mageY);
            let neighbors = this.tile.getAdjacentNeighbors().filter(t => t.passable && inBounds(t.x,t.y) && !t.exit);
            if(neighbors.length){
                neighbors[0].replace(MagicRubble);
            }
        }
    }

}

class Snake extends Monster{
    constructor(tile){
        super(tile, 5, 1);
    }

    doStuff(){
        this.attackedThisTurn = false;
        super.doStuff();

        if(!this.attackedThisTurn){
            super.doStuff();
        }
    }
}

class Tank extends Monster{
    constructor(tile){
        super(tile, 6, 2);
        this.isTank = true;
    }

  	update(){
        let startedStunned = this.stunned;
        super.update();
        if(!startedStunned){
            this.stunned = true;
        }
    }
}

class Eater extends Monster{
    constructor(tile){
        super(tile, 7, 1);
    }

    doStuff(){
        let neighbors = this.tile.getAdjacentNeighbors().filter(t => !t.passable && inBounds(t.x,t.y));
        if(neighbors.length){
            if(level >= 14){
                neighbors[0].replace(EaterMutateFloor);
                this.heal(0.5);
            }else if(level > 6 && level <= 13){
                neighbors[0].replace(MutateFloor);
                this.heal(0.5);    
            }else {
                neighbors[0].replace(Floor);
                this.heal(0.5);    
            }
        }else{
            super.doStuff();
        }
    }

}

class Jester extends Monster{
    constructor(tile){
        super(tile, 8, 2);
    }

    doStuff(){
        let neighbors = this.tile.getAdjacentPassableNeighbors();
        if(neighbors.length){
            this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y);
        }
    }
}

class Boss extends Monster{
    constructor(tile){
        super(tile, 25, 6);
        this.isBoss = true;
        this.bossSpells = (Object.keys(spells)).splice(0,numBossSpells);
        this.teleportCounter = 0;
    }

    update(){
        let startedStunned = this.stunned;
        super.update();
        if(!startedStunned){
            this.stunned = true;
        }
    }

    doStuff(){
        let randomBossAbility = Math.floor(Math.random() * 5);
        console.log(randomBossAbility);
        if(randomBossAbility === 0 /*Mage ability*/){
            let bossX = Math.floor(Math.random() * 3)
            let bossY = Math.floor(Math.random() * 3)
            let neighbors = this.tile.getAdjacentNeighbors().filter(t => t.passable && inBounds(t.x,t.y));
                if(neighbors.length){
                    neighbors[0].replace(Rubble);
                    this.heal(1);
                }
            if (Math.random() > 0.5){
                this.tryMove(-1 * (bossX), -1 * (bossY));  
            }else {
                this.tryMove(bossX, bossY);
            }
        }

        if(randomBossAbility === 1 /*Snake Abiity*/){
            this.attackedThisTurn = false;
            super.doStuff();

            if(!this.attackedThisTurn){
                super.doStuff();
            }  
        }

        if(randomBossAbility === 2 /*Tank Ability*/){
            return;
        }

        if(randomBossAbility === 3 /*Eater Ability*/){
            let neighbors = this.tile.getAdjacentNeighbors().filter(t => !t.passable && inBounds(t.x,t.y));
            if(neighbors.length){
                neighbors[0].replace(BossFloor);
                this.heal(0.5);
            }else{
                super.doStuff();
            }    
        }

        if(randomBossAbility === 4){
            let neighbors = this.tile.getAdjacentPassableNeighbors();
            if(neighbors.length){
                this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y);
            }
        }

    }
}

class Shadow extends Monster{
    constructor(tile){
        super(tile, 31, 3);
        this.isShadow = true;
    }
    doStuff(){
        this.tryMove(pX, pY);
    }
}

class Mirror extends Monster{
    constructor(tile){
        super(tile, 32, 3);
        this.isMirror = true;
    }
    doStuff(){
        this.tryMove(-1 * pX, pY * -1);
    }
}