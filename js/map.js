function generateLevel(){
    tryTo('generate map', function(){
        return generateTiles() == randomPassableTile().getConnectedTiles().length;
    });

    generateMonsters();

    if(level === 7){
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
            if(Math.random() < 0.3){
                tiles[column][row] = new EatableWall(column,row);
            }else if(!inBounds(column,row)){
                tiles[column][row] = new Wall(column,row);   
            }else{
                tiles[column][row] = new Floor(column,row);
                passableTiles++;
            }
        }
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
            if(Math.random() < 0.3){
                tiles[column][row] = new EatableMutateWall(column,row);
            }else if(!inBounds(column,row)){
                tiles[column][row] = new MutateWall(column,row);    
            }else{
                tiles[column][row] = new MutateFloor(column,row);
                passableTiles++;
            }
        }
    }
    return passableTiles;
}

function generateEaterMutationTiles(){
    tiles = [];
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
    }else{
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
        }else if(level >= 14){
            tile = getEaterMutateTile(x, y);
        }else {
            tile = getTile(x, y);  
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

    if (level === 20){
        return;
    }else if (level >= 14){
        numMonsters = level - 13
        if (level === 19){
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
        if (level === 9){
            numMonsters = 1
        }else if (level === 10 || level === 11 || level === 12){
            numMonsters = 2
        }
        for(let i=0;i<numMonsters;i++){
            spawnMonster();
            spawnInitialWave();          
        }    
    }else if (level === 13){
            numMonsters = 1;
            for(let i=0;i<numMonsters;i++){
                spawnMonster();
            }         
    }else {
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
        let monsterType = shuffle([DarkMX])[0];
        let monster = new monsterType(randomPassableTile());
        monsters.push(monster);    
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
    let monsterTypeDream = shuffle([Bird, Snake, Tank, Eater, Jester])[0];
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