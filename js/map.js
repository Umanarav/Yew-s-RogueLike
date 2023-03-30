function generateLevel(){
    tryTo('generate map', function(){
        return generateTiles() == randomPassableTile().getConnectedTiles().length;
    });

    generateMonsters();

    if(level === 7 || level === 21 || level === -777){
        if (level === -777) {
            console.log('gen shop level');
            monsters.push(new Shopkeep(tiles[4][1]));
            tiles[7][7] = new Exit(7, 7);
        }
        return;
    }else {
        for(let i=0;i<3;i++){                                         
            randomPassableTile().treasure = true;                            
        }
    }   
}

function generateBossLevel(){
    tryTo('generate map', function(){
        return generateBossTiles() == randomPassableTile().getConnectedTiles().length;
    });

    generateBossMonsters();

    /*for(let i=0;i<3;i++){                                         
        randomPassableTile().treasure = true;                            
    }*/
}

function generateBossLevel2(){
    tryTo('generate map', function(){
        return generateBossTiles2() == randomPassableTile().getConnectedTiles().length;
    });

    generateBossMonsters();

    /*for(let i=0;i<3;i++){                                         
        randomPassableTile().treasure = true;                            
    }*/
}

function generateMutationLevel(){
    tryTo('generate map', function(){
        return generateMutationTiles() == randomPassableTile().getConnectedTiles().length;
    });
    generateMonsters();
    /*for(let i=0;i<3;i++){                                         
        randomPassableTile().treasure = true;                            
    }*/
}

function generateMutationBossLevel(){
    tryTo('generate map', function(){
        return generateMutationBossTiles() == randomPassableTile().getConnectedTiles().length;
    });
    //top of wall
    tiles[1][3] = new MutateWall(1, 3);
    tiles[3][3] = new MutateWall(3, 3);
    tiles[5][3] = new MutateWall(5, 3);
    tiles[7][3] = new MutateWall(7, 3);
    //middle of wall
    tiles[1][4] = new MutateWall(1, 4);
    tiles[2][4] = new MutateWall(2, 4);
    tiles[3][4] = new MutateWall(3, 4);
    tiles[4][4] = new MutateWall(4, 4);
    tiles[5][4] = new MutateWall(5, 4);
    tiles[6][4] = new MutateWall(6, 4);
    tiles[7][4] = new MutateWall(7, 4);
    //botoom of wall
    tiles[2][5] = new MutateWall(2, 5);
    tiles[4][5] = new MutateWall(4, 5);
    tiles[6][5] = new MutateWall(6, 5);

    //top row buttons
    tiles[4][3] = new MutateBossSpecialFloorActivator(4, 3);
   
    generateMonsters();
    /*for(let i=0;i<3;i++){                                         
        randomPassableTile().treasure = true;                            
    }*/
}

function generateEaterMutationLevel(){
    generateEaterMutationTiles();
    generateMonsters();
    /*for(let i=0;i<3;i++){                                         
        randomPassableTile().treasure = true;                            
    }*/
}

function generateTiles(){
    let passableTiles=0;
    tiles = [];

    for(let column=0;column<numTiles;column++){
        tiles[column] = [];
        for(let row=0;row<numTiles;row++){
            if(Math.random() < 0.3 && level != 21 && level != -777) {
                tiles[column][row] = new EatableWall(column,row);
            }else if(!inBounds(column,row)){
                tiles[column][row] = new Wall(column,row);   
            }else{
                tiles[column][row] = new Floor(column,row);
                passableTiles++;
            }
        }
    
    }
    
    if (level === 21){
        tiles[1][4] = new BossFloor(1, 4);
        tiles[7][4] = new BossFloor(7, 4);
        tiles[4][1] = new BossFloor(4, 1);
        tiles[4][7] = new BossFloor(4, 7);

        tiles[2][2] = new BossFloorScientist(2, 2);
        tiles [7][7] = new Exit(7, 7);

    }

    return passableTiles;
}

function generateBossTiles(){
    let passableTiles=0;
    tiles = [];
    for(let column=0;column<numTiles;column++){
        tiles[column] = [];
        for(let row=0;row<numTiles;row++){
            if(Math.random() < 0.3){
                tiles[column][row] = new EatableBossWall(column,row);
            }else if(!inBounds(column,row)){
                tiles[column][row] = new BossWall(column,row);    
            }else {
                tiles[column][row] = new BossFloor(column,row);
                passableTiles++;
            }
        }
    }
    return passableTiles;
}

function generateBossTiles2(){
    let passableTiles=0;
    tiles = [];
    for(let column=0;column<numTiles;column++){
        tiles[column] = [];
        for(let row=0;row<numTiles;row++){
            if(Math.random() < 0.3 || !inBounds(column,row)){
                tiles[column][row] = new Wall(column,row);
            }else {
                tiles[column][row] = new MutateFloor(column,row);
                passableTiles++;
            }
        }
    }
    return passableTiles;
}

function generateMutationTiles(){
    let passableTiles=0;
    tiles = [];
        for(let column=0;column<numTiles;column++){
            tiles[column] = [];
            for(let row=0;row<numTiles;row++){
                if(Math.random() <= .21){
                    tiles[column][row] = new EatableMutateWall(column,row);
                }else if(!inBounds(column,row)){
                    tiles[column][row] = new MutateWall(column,row);    
                }else {
                    tiles[column][row] = new MutateFloor(column,row);
                    passableTiles++;
                }
            }
        }
    return passableTiles;
}

function generateMutationBossTiles(){
    let passableTiles=0;
    tiles = [];
    for(let column=0;column<numTiles;column++){
        tiles[column] = [];
        for(let row=0;row<numTiles;row++){
            if(Math.random() < 0){
                tiles[column][row] = new EatableMutateWall(column,row);
            }else if(!inBounds(column,row)){
                tiles[column][row] = new MutateWall(column,row);    
            }else {
                tiles[column][row] = new MutateFloor(column,row);
                passableTiles++;
            }
        }
    }

    return passableTiles;
}

function generateEaterMutationTiles(){
    tiles = [];
    if (level === 20){
        for(let column=0;column<numTiles;column++){
        tiles[column] = [];
            for(let row=0;row<numTiles;row++){
                if(Math.random() <= 0.34){
                    tiles[column][row] = new EaterMutateBossFloor(column,row);
                }else if(!inBounds(column,row)){
                    tiles[column][row] = new EaterMutateWall(column,row);    
                }else{
                    tiles[column][row] = new EaterMutateBossFloor(column,row);
                }
            }
        }
        //middle tiles
            tiles[2][2] = new EaterMutateBossFloor2(2, 2);
            tiles[6][2] = new EaterMutateBossFloor2(6, 2);
            tiles[4][7] = new EaterMutateBossFloor2(4, 7);      
        //surrounding tiles left
            tiles[1][2] = new EaterMutateBossWall2(1, 2);
            tiles[5][2] = new EaterMutateBossWall2(5, 2);
            tiles[3][7] = new EaterMutateBossWall2(3, 7);
            //tiles[1][6] = new Floor(1, 6);
            //tiles[5][6] = new Floor(5, 6);
        //surrounding right
            tiles[3][2] = new EaterMutateBossWall2(3, 2);
            tiles[7][2] = new EaterMutateBossWall2(7, 2);
            tiles[5][7] = new EaterMutateBossWall2(5, 7);
            //tiles[3][6] = new Floor(3, 6);
            //tiles[7][6] = new Floor(7, 6);
        //surrounding up
            tiles[2][1] = new EaterMutateBossWall2(2, 1);
            tiles[6][1] = new EaterMutateBossWall2(6, 1);
            tiles[4][6] = new EaterMutateBossWall2(4, 6);
            //tiles[2][5] = new Floor(2, 5);
            //tiles[6][5] = new Floor(6, 5);
        //surrounding down
            tiles[2][3] = new EaterMutateBossWall2(2, 3);
            tiles[6][3] = new EaterMutateBossWall2(6, 3);
            //tiles[2][7] = new Floor(2, 7);
            //tiles[6][7] = new Floor(6, 7);

        //buttons
            tiles[6][5] = new boss2bButtonR(6, 5);
            tiles[2][5] = new boss2bButtonL(2, 5);

        //cable between Buttons
            tiles[3][5] = new EaterMutateBossFloorCableDormant1(3, 5);
            tiles[4][5] = new EaterMutateBossFloorCableDormant2(4, 5); 
            tiles[5][5] = new EaterMutateBossFloorCableDormant3(5, 5); 

    }else {
        for(let column=0;column<numTiles;column++){
        tiles[column] = [];
            for(let row=0;row<numTiles;row++){
                if(Math.random() <= 0.34){
                    tiles[column][row] = new EatableEaterMutateWall(column,row);
                }else if(!inBounds(column,row)){
                    tiles[column][row] = new EaterMutateWall(column,row);    
                }else{
                    tiles[column][row] = new EaterMutateFloor(column,row);
                }
            }
        }    
    }
}

function inBounds(x,y){
    return x>0 && y>0 && x<numTiles-1 && y<numTiles-1;
}


function getTile(x, y){
    if(inBounds(x,y)){
        return tiles[x][y];
    }else{
        return new Wall(x,y);
    }
}

function getBossTile(x, y){
    if(inBounds(x,y)){
        return tiles[x][y];
    }else{
        return new BossWall(x,y);
    }
}

function getMutateTile(x, y){
    if(inBounds(x,y)){
        return tiles[x][y];
    }else{
        return new MutateWall(x,y);
    }
}

function getEaterMutateTile(x, y){
    if(inBounds(x,y)){
        return tiles[x][y];
    }else if(level === 20){
        return new EaterMutateBossWall(x,y);
    }else {
        return new EaterMutateWall(x,y);    
    }
}

function getEaterMutateTile(x, y){
    if(inBounds(x,y)){
        return tiles[x][y];
    }else if(level === 20){
        return new EaterMutateBossWall(x,y);
    }else {
        return new EaterMutateWall(x,y);    
    }
}

function randomPassableTile(){
    let tile;
    tryTo('get random passable tile', function(){
        let x = randomRange(0,numTiles-1);
        let y = randomRange(0,numTiles-1);
        if(level === 6){
            tile = getBossTile(x, y);
        }else if(level > 6 && level <= 13){
            tile = getMutateTile(x, y);
        }else if(level >= 14 && level <= 20){
            tile = getEaterMutateTile(x, y);
        }else if(level === 21 || level === -777){
            tile = getTile(4, 4)
        }else {
            tile = getTile(x, y);  
        }

        return tile.passable && !tile.monster && !tile.treasure && !tile.player && !tile.exit;
    });
    return tile;
}

function certainPassableTile(){
    let tile;
    tryTo('get random passable tile', function(){
        let x = 4;
        let y = 4;
        if(level === 20){
            tile = getEaterMutateTile(4, 4);
        }else if (level === 13){
            tile = getMutateTile(4, 6);
        }

        return tile.passable && !tile.monster && !tile.treasure && !tile.player && !tile.exit;
    });
    return tile;
}

function certainPassableBossTile(){
    let tile;
    tryTo('get random passable tile', function(){
        let x = 2;
        let y = 4;
        if(level === 20){
            tile = getEaterMutateTile(2, 4);
        }

        return tile.passable && !tile.monster && !tile.treasure && !tile.player && !tile.exit;
    });
    return tile;
}

function getTile(x, y){
    if(inBounds(x,y)){
        return tiles[x][y];
    }else{
        return new Wall(x,y);
    }
}

function getBossTile(x, y){
    if(inBounds(x,y)){
        return tiles[x][y];
    }else{
        return new BossWall(x,y);
    }
}

/*function randomHazardTile(){
    let tile;
    tryTo('get random hazard tile', function(){
        let x = randomRange(0,numTiles-1);
        let y = randomRange(0,numTiles-1);
        if(level === 6){
            tile = getBossTile(x, y);
        }else{
            tile = getTile(x, y);  
        }

        return tile.hazard && !tile.monster && !tile.exit && !tile.object;
    });
    return tile;
}*/

function randomPassableTileNotWell(){
    let tile;
    tryTo("get random passable tile that isn't well", function(){
        let x = randomRange(0,numTiles-1);
        let y = randomRange(0,numTiles-1);
        if(level === 6){
            tile = getBossTile(x, y);
        }else if(level > 6 && level <= 13){
            tile = getMutateTile(x, y);
        }else if(level >= 14){
            tile = getEaterMutateTile(x, y);
        }else {
            tile = getTile(x, y);  
        }

        return tile.passable && !tile.monster && !tile.object && !tile.exit && !tile.button;
    });
    return tile;
}







function generateMonsters(){
    monsters = [];
    let numMonsters = level+1;

     if (level >= 14){
        numMonsters = level - 13

        if (level === 20){
            monsters.push(new EaterBoss(tiles[4][1]));
            bossLocation = 0;
            boss2bHP = 34;
            boss2bDefeated = false;     
        }else if (level === 19){
            numMonsters = 2;
        }
        if (level === 18){
            numMonsters = 2;
        }
        for(let i=0;i<numMonsters;i++){
            spawnMonster();          
        }     
    }else if (level > 6 && level < 13){
        numMonsters = level - 6;
        spawnInitialWave(); 
        if (level === 9){
            numMonsters = 1
        }else if (level === 10 || level === 11 || level === 12){
            numMonsters = 2
        }
        for(let i=0;i<numMonsters;i++){
            spawnMonster();         
        }    
    }else if (level === 13){
            //numMonsters = 1;
            monsters.push(new DarkMX(tiles[4][2]));
            monsters.push(new hostileShadow(tiles[7][1]));
            /*for(let i=0;i<numMonsters;i++){
                spawnMonster();
            }*/   

    }else if(level === 21){
        numMonsters = 3;
    }
    else {
        for(let i=0;i<numMonsters;i++){
            spawnMonster();
            console.log(numMonsters);
        }    
    }
}

function generateBossMonsters(){
    monsters = [];
    let numBossMonsters = 1
        for(let i=0;i<numBossMonsters;i++){
        spawnBossMonster();
    }
}

function spawnMonster(){
    if (level === 21){
        if(topBotSlain != true && topBotSpawned != true){
            monsters.push(new TopBot(tiles[4][1]));
            topBotSpawned = true;
        }
        if(leftBotSlain != true && leftBotSpawned != true){
            monsters.push(new LeftBot(tiles[1][4]));
            leftBotSpawned = true;
        }
        if(rightBotSlain != true && rightBotSpawned != true){
            monsters.push(new RightBot(tiles[7][4]));
            rightBotSpawned = true;
        }
        if(botBotSlain != true && botBotSpawned != true){
            monsters.push(new BottomBot(tiles[4][7]));
            botBotSpawned = true;
        }

    }
    if (level === 20){
        //monsters.push(new EaterBoss(tiles[4][1]));        
    }
    if (level === 19){
        let monsterType = shuffle([BigBird])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
    }
    if (level === 18){
        let monsterType = shuffle([Mage2])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
    }
    if (level === 17){
        let monsterType = shuffle([LargeExplodingMonster, BigBird, ExplodingMonster])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
    }
    if (level === 16){
        let monsterType = shuffle([ExplodingMonster, BigBird, LargeExplodingMonster])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
    }
    if (level === 15){
        let monsterType = shuffle([ExplodingMonster, BigBird, LargeExplodingMonster])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
    }
    if (level === 14){
        let monsterType = shuffle([ExplodingMonster, BigBird])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
    }
    if (level === 13){
        /*let monsterType = shuffle([DarkMX])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);*/  
    }
    if (level === 12){
        let monsterType = shuffle([ShadowOpposite, MirrorOpposite])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
    }
    if (level === 11){
        let monsterType = shuffle([Shadow, Mirror])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);
    }
    if (level === 9 || level === 10){
        let monsterType = ([Mirror])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);
    }
    if (level === 8){
        let monsterType = shuffle([Shadow])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);
    }else if(level === 7){
        let monsterType = shuffle([Shadow])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);
    }else if(level === 6){
        return;
    }else if (level === 4 || level === 5){
    let monsterType = shuffle([Bird, Snake, Tank, Eater, Jester, Mage])[0];
    let monster = new monsterType(randomPassableTile());
    monsters.push(monster);
    }else if (level === 3){
    let monsterType = shuffle([Bird, Snake, Tank, Eater, Jester])[0];
    let monster = new monsterType(randomPassableTile());
    monsters.push(monster);
    }else if (level === 2){
    let monsterType = shuffle([Bird, Tank, Eater, Jester])[0];
    let monster = new monsterType(randomPassableTile());
    monsters.push(monster);
    }
    else if (level === 1){
    let monsterType = shuffle([Bird, Eater, Jester])[0];
    let monster = new monsterType(randomPassableTile());
    monsters.push(monster);
    }/*else {
    let monsterType = shuffle([Bird, Snake, Tank, Eater, Jester, Mage])[0];
    let monster = new monsterType(randomPassableTile());
    monsters.push(monster);
    }*/

}

function spawnBossMonster(){
    let bossMonsterType = shuffle([Boss])[0];
    let bossMonster = new bossMonsterType(randomPassableTile());
    monsters.push(bossMonster);
};

function spawnBossMonster2(){
    let bossMonsterType2 = shuffle([])[0];
    let bossMonster2 = new bossMonsterType2(randomPassableTile());
    monsters.push(bossMonster2);
};

function spawnInitialWave(){
    let monsterTypeDream = shuffle([hostileShadow])[0];
    let monsterDream = new monsterTypeDream(randomPassableTile());
    monsters.push(monsterDream);    
}

function spawnWave(){
    let monsterTypeWave = shuffle([BigBird, LargeExplodingMonster, ExplodingMonster])[0];
    let monsterWave = new monsterTypeWave(randomPassableTile());
    monsters.push(monsterWave);    
}

function spawnAdditionalPaperweight(){
    let monsterTypePaperweight = shuffle([Shadow, Mirror, ShadowOpposite, MirrorOpposite])[0];
    let monsterPaperweight = new monsterTypePaperweight(randomPassableTile());
    monsters.push(monsterPaperweight);
}