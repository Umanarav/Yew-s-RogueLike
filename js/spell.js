spells = {
    WOOP: function(){
        if(this.isPlayer = true){
            player.move(randomPassableTile());
        }else if(this.isBoss = true){
            boss.move(randomPassableTile());
        }
    },
    QUAKE: function(){                  
        for(let i=0; i<numTiles; i++){
            for(let j=0; j<numTiles; j++){
                let tile = getTile(i,j);
                if(tile.monster){
                    let numWalls = 4 - tile.getAdjacentPassableNeighbors().length;
                    tile.monster.hit(numWalls*2);
                }
            }
        }
        shakeAmount = 20;
    },
    RESTORE: function(){
        player.tile.getAdjacentNeighbors().forEach(function(t){
            t.setEffect(13);
            if(t.monster){
                t.monster.heal(1);
            }
        });
        player.tile.setEffect(13);
        player.heal(1);
    },
    WALL_TO_DISK: function(){
        player.tile.getAdjacentNeighbors().forEach(function(t){
            if(!t.passable && inBounds(t.x, t.y)){
                if(level === 6){
                    t.replace(BossFloor).treasure = true;
                }else{
                    t.replace(Floor).treasure = true;  
                }
            }
        });
    },
    SHOCK: function(){
        let directions = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0]
        ];
        for(let k=0;k<directions.length;k++){
            boltTravel(directions[k], 15 + Math.abs(directions[k][1]), 2);
        }
    },
    VENT_HEAT: function(){
        let directions = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ];
        for(let k=0;k<directions.length;k++){
            boltTravel(directions[k], 14, 3);
        }
    },
    MONSTER_SHOCK: function(){
        let directions = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0]
        ];
        for(let k=0;k<directions.length;k++){
            boltTravelMonster(directions[k], 15 + Math.abs(directions[k][1]), 2);
        }
    },
};

function boltTravel(direction, effect, damage){
    let newTile = player.tile;
    while(true){
        let testTile = newTile.getNeighbor(direction[0], direction[1]);
        if(testTile.passable){
            newTile = testTile;
            if(newTile.monster){
                newTile.monster.hit(damage);
            }
            newTile.setEffect(effect);
        }else{
            break;
        }
    }
};

function boltTravelMonster(direction, effect, damage){
    let newTile = mage.tile;
    while(true){
        let testTile = newTile.getNeighbor(direction[0], direction[1]);
        if(testTile.passable){
            newTile = testTile;
            if(newTile.player){
                newTile.player.hit(damage);
            }
            newTile.setEffect(effect);
        }else{
            break;
        }
    }
};

    /*MAELSTROM: function(){
        for(let i=0;i<monsters.length;i++){
            monsters[i].move(randomPassableTile());
            monsters[i].teleportCounter = 2;
        }
    },*/
    /*MULLIGAN: function(){
        startLevel(1, player.spells);
    },*/
    /*POWER: function(){
        player.bonusAttack=5;
    },*/
    
    /*BRAVERY: function(){
        player.shield = 2;
        for(let i=0;i<monsters.length;i++){
            monsters[i].stunned = true;
        }
    },*/
    /*BOLT: function(){
        boltTravel(player.lastMove, 15 + Math.abs(player.lastMove[1]), 4);
    },*/
    /*DASH: function(){
        let newTile = player.tile;
        while(true){
            let testTile = newTile.getNeighbor(player.lastMove[0],player.lastMove[1]);
            if(testTile.passable && !testTile.monster){
                newTile = testTile;
            }else{
                break;
            }
        }
        if(player.tile != newTile){
            player.move(newTile);
            newTile.getAdjacentNeighbors().forEach(t => {
                if(t.monster){
                    t.setEffect(14);
                    t.monster.stunned = true;
                    t.monster.hit(1);
                }
            });
        }
    },*/
    /*DIG: function(){
        for(let i=1;i<numTiles-1;i++){
            for(let j=1;j<numTiles-1;j++){
                let tile = getTile(i,j);
                if(!tile.passable){
                    tile.replace(Floor);
                }
            }
        }
        player.tile.setEffect(13);
        player.heal(2);
    },*/
    /*KINGMAKER: function(){
        for(let i=0;i<monsters.length;i++){
            monsters[i].heal(1);
            monsters[i].tile.treasure = true;
        }
    },*/
