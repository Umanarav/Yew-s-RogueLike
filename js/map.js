function generateLevel(){
    tryTo('generate map', function(){
        return generateTiles() == randomPassableTile().getConnectedTiles().length;
    });

    generateMonsters();

    for(let i=0;i<3;i++){                                         
        randomPassableTile().treasure = true;                            
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

function generateTiles(){
    let passableTiles=0;
    tiles = [];
    for(let column=0;column<numTiles;column++){
        tiles[column] = [];
        for(let row=0;row<numTiles;row++){
            if(Math.random() < 0.3 || !inBounds(column,row)){
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
            if(Math.random() < 0.3 || !inBounds(column,row)){
                tiles[column][row] = new BossWall(column,row);
            }else{
                tiles[column][row] = new BossFloor(column,row);
                passableTiles++;
            }
        }
    }
    return passableTiles;
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

function randomPassableTile(){
    let tile;
    tryTo('get random passable tile', function(){
        let x = randomRange(0,numTiles-1);
        let y = randomRange(0,numTiles-1);
        if(level === 6){
            tile = getBossTile(x, y);
        }else{
            tile = getTile(x, y);  
        }

        return tile.passable && !tile.monster;
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

function randomHazardTile(){
    let tile;
    tryTo('get random hazard tile', function(){
        let x = randomRange(0,numTiles-1);
        let y = randomRange(0,numTiles-1);
        if(level === 6){
            tile = getBossTile(x, y);
        }else{
            tile = getTile(x, y);  
        }

        return tile.hazard && !tile.monster;
    });
    return tile;
}

function randomPassableTileNotWell(){
    let tile;
    tryTo("get random passable tile that isn't well", function(){
        let x = randomRange(0,numTiles-1);
        let y = randomRange(0,numTiles-1);
        if(level === 6){
            tile = getBossTile(x, y);
        }else{
            tile = getTile(x, y);  
        }

        return tile.passable && !tile.monster && !tile.object;
    });
    return tile;
}







function generateMonsters(){
    monsters = [];
    let numMonsters = level+1;
    for(let i=0;i<numMonsters;i++){
        spawnMonster();
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
    if(level === 6){
        return;
    }else{
    let monsterType = shuffle([Bird, Snake, Tank, Eater, Jester])[0];
    let monster = new monsterType(randomPassableTile());
    monsters.push(monster);
    }
}

function spawnBossMonster(){
    let bossMonsterType = shuffle([Boss])[0];
    let bossMonster = new bossMonsterType(randomPassableTile());
    monsters.push(bossMonster);
}