let bossDamageReduction = 1;
eatsWalls = false;
explodingMonsterAnimating = 5;
explodingMonsterMoving = false;

let bossLocation = 0;
let boss2bHP;
let boss2bHPCorrection = 0;

let monster2aPaused = false;
let canPause2a = true;


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

        if(this.player != true && level === 20 && boss2bHP <= 0){
            this.die();
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
            if (level <= 6){
                drawSprite(10, this.getDisplayX(),  this.getDisplayY());    
            }else if (level >= 6 && level <= 13){
                drawSprite(59, this.getDisplayX(),  this.getDisplayY());
            }else if (level >= 14){
                drawSprite(60, this.getDisplayX(),  this.getDisplayY());  
            }                                                             
        }else{        
	        drawSprite(this.sprite, this.getDisplayX(),  this.getDisplayY());
            if (!this.isBigBird && !this.isEaterBoss){
	           this.drawHp();
            }
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
              	if(this.isPlayer != newTile.monster.isPlayer || this.isShadow || this.isMirror){
                    this.attackedThisTurn = true;
                    newTile.monster.stunned = true;

                    newTile.monster.hit((this.baseAttack + this.bonusAttack));
                    this.bonusAttack = 0;

                    shakeAmount = 4;

                    this.offsetX = (newTile.x - this.tile.x)/2;         
                    this.offsetY = (newTile.y - this.tile.y)/2;
                    if (this.isExplodingMonster){
                        this.hp -= 1;
                        this.sprite = 40; 
                        this.die();
                        this.tile.setEffect(14);
                        playSound('smallexplosion'); 
                    }
                    if(this.isLargeExplodingMonster){
                        this.hp -= 3;
                        this.sprite = 53; 
                        this.die();
                        this.tile.setEffect(14);
                        playSound('smallexplosion');
                    }
                }
            }
            return true;
        }else if(!newTile.passable && this.isPlayer){
            this.lastMove = [dx,dy];
            for(let k=monsters.length-1;k>=0;k--){
                if(!monsters[k].dead){
                monsters[k].update();
                }else{
                monsters.splice(k,1);
                }   
            }
            player.update();

            if(eatsWalls === true && newTile.eatable){
                console.log(eatsWalls, "should eat this")

                if (level === 20){
                    if (newTile.pylon){
                        console.log('where boss takes damge');
                        boss2bHP -= 1;
                        if (newTile.hp > 0){
                            newTile.hp -= 1;
                            newTile.sprite += 2;
                            playSound('dig1');
                            shakeAmount = 3;
                            screenshake();  
                            return;    
                        }else{
                            newTile.replace(EaterMutateBossFloor);
                            playSound('dig2');
                            shakeAmount = 5;
                            screenshake(); 
                            return;    
                        }

                    }
                    player.hp += 0.25;
                    if (Math.random() >= .89 - (level * 4 / 100) ){
                        newTile.replace(EaterMutateBossFloor);
                        playSound('dig1');    
                    }else {
                        newTile.replace(EaterMutateBossFloor);
                        playSound('dig2');    
                    };
                }else if (level >= 14 && level != 20){
                    player.hp += 0.5;
                    if (Math.random() >= .89 - (level * 4 / 100) ){
                        newTile.replace(EaterMutateFloor);
                        playSound('dig1');    
                    }else {
                        newTile.replace(Exit);
                        playSound('dig2');    
                    }

                }else if (level > 6 && level <= 13){
                    newTile.replace(MutateFloor);
                    player.hp += 0.5;    
                }else if (level < 6){
                    newTile.replace(Floor);
                    player.hp += .25;      
                }else if (level === 6){
                    newTile.replace(BossFloor);
                    player.hp += 0.5;    
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

        if (this.isBigBird){
            player.hp -= .25
            this.tryMove(pX, pY);
            this.stunned = true;

            if(this.hp >= 5){
                if(Math.random() >= .5){
                this.sprite = 54;    
                }else {
                    this.sprite = 58;     
                }    
            }else if(Math.random() >= .5){
                this.sprite = 61;    
                }else {
                    this.sprite = 62;     
                }
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

            if(this.isExplodingMonster || this.isLargeExplodingMonster){
                this.tile.setEffect(14);   
            }

        }

        if(this.isPlayer){                                                     
            playSound("hit1");                                              
        }else{                                                       
            playSound("hit2");                                              
        }

        if(this.isEaterBoss){
            this.doStuff();
            console.log(this.hp, 'true hp');
            if (tier1SwordEquipped === true){
                boss2bHP -= 3;    
            }else{
                boss2bHP -= 1;    
            }
            if (boss2bHP <= 0){
                this.die();
                tiles[4][4] = new MutateExit(4, 4);
                playSound('boss2bDeathCry');
            }
             console.log(boss2bHP, 'hp bar boss');
            this.sprite = 86;
        }
}

    die(){
        this.dead = true;
        this.tile.monster = null;
        if(this.isPlayer){
            this.sprite = 1;
            gameState = "dead";
            moonShoes = false;
            reveal2bHelperCounter = 0;
        }
        if(this.isExplodingMonster){
            this.sprite = 40;
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
            if (playerDirection === "right"){
                this.sprite = 41;
            }else if (playerDirection === "left"){
                this.sprite = 42;
            }else if (playerDirection === "down"){
                this.sprite = 0;
            }
            else if (playerDirection === "up"){
                this.sprite = 43;
            }                                                             
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

class Mage2 extends Monster{
    constructor(tile){
        super(tile, 52, 4);
        this.isMage = true;
    }

    doStuff(){
        let mage2X = Math.floor(Math.random() * 3)
        let mage2Y = Math.floor(Math.random() * 3)

        if (Math.random() > 0.5){
            this.tryMove(-1 * (mage2X), -1 * (mage2Y));  
        }else {
            this.tryMove(mage2X, mage2Y);
            let neighbors = this.tile.getAdjacentNeighbors().filter(t => t.passable && inBounds(t.x,t.y) && !t.exit);
            if(neighbors.length && Math.random() <= .34 ){
                spawnWave();
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
        if (monster2aPaused === true){
            return;
        }else{
            this.tryMove(pX, pY);    
        }
    }
}

class Mirror extends Monster{
    constructor(tile){
        super(tile, 32, 3);
        this.isMirror = true;
    }
    doStuff(){
        if (monster2aPaused === true){
            return;
        }else{
            this.tryMove(-pX, -pY);    
        }
    }
}

class ShadowOpposite extends Monster{
    constructor(tile){
        super(tile, 37, 3);
        this.isShadow = true;
    }
    doStuff(){
        if (monster2aPaused === true){
            return;
        }else{
            this.tryMove(pY, pX);    
        }
    }
}

class MirrorOpposite extends Monster{
    constructor(tile){
        super(tile, 38, 3);
        this.isMirror = true;
    }
    doStuff(){
        if (monster2aPaused === true){
            return;
        }else{
            this.tryMove(-pY, -pX);    
        }
    }
}

class hostileShadow extends Monster{
    constructor(tile){
        super(tile, 109, 3);
        this.ishostileShadow = true;
    }
    doStuff(){
        super.doStuff();
    }
}

class DarkMX extends Monster{
    constructor(tile){
        super(tile, 0, 6);
        this.isDarkMX = true;
    }
    doStuff(){
        super.doStuff();
        this.tryMove(-1 * pX, pY);
    }
}

class ExplodingMonster extends Monster{
    constructor(tile){
        super(tile, 39, 1);
        this.isExplodingMonster = true;
        this.baseAttack = 3;
    }

    tryMove(dx, dy){
        if (super.tryMove(dx,dy)){
            console.log(dx, dy);
            
            if (dx === 1){
                this.sprite = 39;
            }else if (dx === -1){
                this.sprite = 44;
            }else if (dy === 1){
                this.sprite = 45;
            }
            else if (dy === -1){
                this.sprite = 46;
            } 
            
            if(this.hp <= 0){
                this.sprite = 40;
            }          
        }
    }

    doStuff(){
        super.doStuff();         
    }    
}

class LargeExplodingMonster extends Monster{
    constructor(tile){
        super(tile, 47, 3);
        this.isLargeExplodingMonster = true;
        this.baseAttack = 5;
    }

    update(){
        let startedStunned = this.stunned;
        super.update();
        if(!startedStunned){
            this.stunned = true;
        }
    }

    tryMove(dx, dy){
        if (super.tryMove(dx,dy)){
            console.log(dx, dy);

           
                if (dx === 1){
                    this.sprite = 47;
                }else if (dx === -1){
                    this.sprite = 48;
                }else if (dy === 1){
                    this.sprite = 49;
                }else if (dy === -1){
                    this.sprite = 50;
                }   
            }

            if(this.hp <= 0){
                this.sprite = 51;
            }        
        }

    doStuff(){
        super.doStuff();         
    }

}

class BigBird extends Monster{
    constructor(tile){
        super(tile, 53, 21);
        this.isBigBird = true;
    }

    tryMove(dx, dy){
        if (super.tryMove(dx,dy)){
            console.log(dx, dy);
            
            if(this.hp >= 5){
                if (dx === 1){
                    this.sprite = 56;
                }else if (dx === -1){
                    this.sprite = 53;
                }else if (dy === 1){
                    this.sprite = 55;
                }
                else if (dy === -1){
                    this.sprite = 57;
                } 
                
                if(this.hp <= 0){
                    this.sprite = 54;
                }  
            }else{
                if (dx === 1){
                    this.sprite = 65;
                }else if (dx === -1){
                    this.sprite = 63;
                }else if (dy === 1){
                    this.sprite = 64;
                }
                else if (dy === -1){
                    this.sprite = 66;
                } 
                
                if(this.hp <= 0){
                    this.sprite = 64;
                }  
            }           
        }
    }

    update(){
        let startedStunned = this.stunned;
        super.update();
        if(!startedStunned){
            this.stunned = true;
        }
    }

    doStuff(){
        if (this.hp >= 5){
            super.doStuff();
        }else {
            let neighbors = this.tile.getAdjacentPassableNeighbors();
            if(neighbors.length){
                this.tryMove(neighbors[0].x - this.tile.x, neighbors[0].y - this.tile.y);
            }
        }
    }
}

class EaterBoss extends Monster{
    constructor(tile){
        super(tile, 71, 34);
        this.isEaterBoss = true;
        this.teleportCounter = 2;
    }
    doStuff(){
        console.log(bossLocation);
        if (bossLocation === 0){
                //movetoL
                this.tryMove(-2, 1);
                bossLocation = 1;
                    turnOnL();
            } 
        if (Math.random() >= .75){
            if (bossLocation === 1){
                    turnOffL();              
                if (Math.random() >= .5){
                    //moveToR
                        this.tryMove(4, 0);
                        bossLocation = 2;
                            turnOnR();
                            
                }else {
                    //moveToB
                    this.tryMove(2, 5);
                    bossLocation = 3;
                        turnOnB();
                }          
            }else if (bossLocation === 2){
                        turnOffR();
                if (Math.random() >= .5){
                    //moveToB
                    this.tryMove(-2, 5);
                    bossLocation = 3;
                        turnOnB();    
                }else {
                    //movetoL
                    this.tryMove(-4, 0);
                    bossLocation = 1;
                        turnOnL();
                }    
                         
            }else if (bossLocation === 3){
                        turnOffB();
                if (Math.random() >= .5){
                    //moveToR
                    this.tryMove(2, -5);
                    bossLocation = 2;
                        turnOnR();    
                }else {
                    //movetoL
                    this.tryMove(-2, -5);
                    bossLocation = 1;
                        turnOnL();
                }                
            }
            //super.doStuff();
            console.log(bossLocation);
        }
    }

    update(){
        if (this.hp <= 0 || boss2bHP <= 0){
            this.die();
        }

        if (this.sprite === 71){
            this.sprite = 78
        }else if (this.sprite === 78){
            if(Math.random() >= .5){
                this.sprite = 71;
            }else {
                this.sprite = 80;    
            }
        }else if (this.sprite === 80){
            this.sprite = 82;
        }else if (this.sprite >= 82 && this.sprite < 85){
            this.sprite += 1;
        }else if (this.sprite === 85){
            this.sprite = 78;
        }else if (this.sprite >= 86 && this.sprite < 90){
            this.sprite += 1;
        }
        else if (this.sprite === 90){
            this.sprite = 71;
        }
        if (boss2bHPCorrection > 0){
            this.hp -= boss2bHPCorrection;
            boss2bHPCorrection -= boss2bHPCorrection;
            this.sprite = 86;
        }
        let startedStunned = this.stunned;
        super.update();

        if (boss2bButtonRCooldown > 0){
            this.stunned = true;
        }else {
            if(!startedStunned){
            this.stunned = true;
        }
        }
        
    }
}

//boss 2b functions                        
function turnOffL(){
    tiles[1][2] = new EaterMutateBossWall2(1, 2);
    tiles[3][2] = new EaterMutateBossWall2(3, 2);
    tiles[2][1] = new EaterMutateBossWall2(2, 1);
    tiles[2][3] = new EaterMutateBossWall2(2, 3);       
}

function turnOffR(){
    tiles[5][2] = new EaterMutateBossWall2(5, 2);
    tiles[7][2] = new EaterMutateBossWall2(7, 2);
    tiles[6][1] = new EaterMutateBossWall2(6, 1);
    tiles[6][3] = new EaterMutateBossWall2(6, 3);       
}

function turnOffB(){
    tiles[3][7] = new EaterMutateBossWall2(3, 7);
    tiles[5][7] = new EaterMutateBossWall2(5, 7);
    tiles[4][6] = new EaterMutateBossWall2(4, 6);       
}

function turnOnL(){
    playSound('boss2bWoosh');
    tiles[1][2] = new EaterMutateBossWall3(1, 2);
    tiles[3][2] = new EaterMutateBossWall3(3, 2);
    tiles[2][1] = new EaterMutateBossWall3(2, 1);
    tiles[2][3] = new EaterMutateBossWall3(2, 3);       
}

function turnOnR(){
    playSound('boss2bWoosh2');
    tiles[5][2] = new EaterMutateBossWall3(5, 2);
    tiles[7][2] = new EaterMutateBossWall3(7, 2);
    tiles[6][1] = new EaterMutateBossWall3(6, 1);
    tiles[6][3] = new EaterMutateBossWall3(6, 3);       
}

function turnOnB(){
    playSound('boss2bWoosh3');
    tiles[3][7] = new EaterMutateBossWall3(3, 7);
    tiles[5][7] = new EaterMutateBossWall3(5, 7);
    tiles[4][6] = new EaterMutateBossWall3(4, 6);       
}

class Boss2bLackey extends Monster{
    constructor(tile){
        super(tile, 78, 3);
        this.isBoss2bLackey = true;
    }
    doStuff(){
        super.doStuff();
    }
}