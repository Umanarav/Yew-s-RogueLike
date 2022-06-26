function generateLevel(){
    tryTo('generate map', function(){
        return generateTiles() == randomPassableTile().getConnectedTiles().length;
    });
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

function randomPassableTile(){
    let tile;
    tryTo('get random passable tile', function(){
        let x = randomRange(0,numTiles-1);
        let y = randomRange(0,numTiles-1);
        tile = getTile(x, y);
        return tile.passable && !tile.monster;
    });
    return tile;
}