gameState = "Title";
moonShoes = false;
let canvas2;

let num2bMonsters = 0;
let boss2bDefeated = false;

function setupCanvas(){
    canvas = document.querySelector("#layer1");
    ctx = canvas.getContext("2d");

    canvas.width = tileSize*(numTiles+uiWidth);
    canvas.height = tileSize*numTiles;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    ctx.imageSmoothingEnabled = false;
}

function setupCanvas2(){
    canvas2 = document.querySelector("#layer2");
    ctx2 = canvas.getContext("2d");

    canvas2.width = tileSize*(numTiles+uiWidth);
    canvas2.height = tileSize*numTiles;
    canvas2.style.width = canvas2.width + 'px';
    canvas2.style.height = canvas2.height + 'px';
    ctx2.imageSmoothingEnabled = false;
    alpha: false;
}             

function drawSprite(sprite, x, y){
    ctx.drawImage(
        spritesheet,
        sprite*16,
        0,
        16,
        16,
        x*tileSize + shakeX,
        y*tileSize + shakeY,
        tileSize,
        tileSize
    );
}

function draw(){
    if(gameState === 'running'|| gameState == "dead"){  
        ctx.clearRect(0,0,canvas.width,canvas.height);

        screenshake();

        if(level ===  6){
            for(let i=0;i<numTiles;i++){
                for(let j=0;j<numTiles;j++){
                    getBossTile(i,j).draw();
                }
            }    
        }else if (level >= 7 && level <= 13){
           for(let i=0;i<numTiles;i++){
                for(let j=0;j<numTiles;j++){
                    getMutateTile(i,j).draw();
                }
            } 
        }else if (level >= 14 && level <= 20){
           for(let i=0;i<numTiles;i++){
                for(let j=0;j<numTiles;j++){
                    getEaterMutateTile(i,j).draw();
                }
            } 
        }
        else {
            for(let i=0;i<numTiles;i++){
                for(let j=0;j<numTiles;j++){
                    getTile(i,j).draw();
                }
            }    
        }

        for(let i=0;i<monsters.length;i++){
            monsters[i].draw();
        }
        
        player.draw();

        if (level > 13){
            drawText("Level: Y."+(level - 13), 30, false, 40, "violet");    
        }else if (level > 6 && level <= 13){
            drawText("Level: X."+(level - 6), 30, false, 40, "violet");
        }else {
            drawText("Level: 1."+(level), 30, false, 40, "violet");    
        }

        if (score === 1){
            drawText("Disk: "+score, 30, false, 70, "violet");    
        }else {
            drawText("Disks: "+score, 30, false, 70, "violet");    
        }

        drawText("HP: "+player.hp, 30, false, 100, "violet");

        if (level === 20 && boss2bHP > 0){

            //background
            ctx.fillStyle = `rgb(0,0,0,${.84})`;
            ctx.fillRect(13, 13, 525, 38)


            //health bar
            drawText("Palrythion " + (boss2bHP), 21, false, 38, "white", 34);
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(213, 26, boss2bHP * 9 + 2, 12)
            ctx.fillStyle = 'red';
            ctx.fillRect(214, 27, boss2bHP * 9, 10)
            ctx.restore();

            //alien floater
            drawBoss2bHelper();



        }

        if(gamepadConnected === false){
            drawText("Executables", 21, false, 140, "violet");
            let spellText1 = (1) + ") " + (player.spells[0] + ".EXE" || "");                        
                let spellText2 = (2) + ") " + (player.spells[1] + ".EXE" || "");
                let spellText3 = (3) + ") " + (player.spells[2] + ".EXE"  || "");
                let spellText4 = (4) + ") " + (player.spells[3] + ".EXE"  || "");
                let spellText5 = (5) + ") " + (player.spells[4] + ".EXE"  || "");
                let spellText6 = (6) + ") " + (player.spells[5] + ".EXE"  || "");
                drawText(spellText1, 16, false, 170+0*21, "aqua");
                drawText(spellText2, 16, false, 170+1*21, "aqua");        
                drawText(spellText3, 16, false, 170+2*21, "aqua");        
                drawText(spellText4, 16, false, 170+3*21, "aqua");        
                drawText(spellText5, 16, false, 170+4*21, "aqua");        
                drawText(spellText6, 16, false, 170+5*21, "aqua"); 

            drawText("Functions ", 21, false, 315 , "violet");
                drawText("ENTER) USE(); ", 16, false, 345 , "aqua");
                drawText("f) TICK(); ", 16, false, 366 , "aqua");

            drawText("Hardware (Press #)", 21, false, 406, "violet");
                let swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? '[Equipped]' : '' || ""));                          
                drawText(swordText, 16, false, 436, "aqua");        

                let armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? '[Equipped]' : '' || ""));                         
                drawText(armorText, 16, false, 457, "aqua");

            drawText("Mutations", 21, false, 497, "violet");
                if (moonShoes === true){
                    drawText("9) Move two (hold shift)", 16, false, 517, "aqua");     
                }else if (readyToMutate === true){
                    drawText("9) Press Enter to Mutate", 16, false, 517, "aqua");     
                }
                if(eatsWalls === true && eaterSoul === true){
                    drawText("Eat walls enabled", 16, false, 538, "aqua");            
                }else if (eatsWalls === false && eaterSoul === true){
                    drawText("Hold k to eat walls", 16, false, 538, "aqua");
                } 
        }

        if(gamepadConnected === true){
            drawText("Executables", 21, false, 140, "violet");
                let spellText1 = (1) + ") " + (player.spells[0] || "");                        
                let spellText2 = (2) + ") " + (player.spells[1] || "");
                let spellText3 = (3) + ") " + (player.spells[2] || "");
                let spellText4 = (4) + ") " + (player.spells[3] || "");
                let spellText5 = (5) + ") " + (player.spells[4] || "");
                let spellText6 = (6) + ") " + (player.spells[5] || "");
                drawText("LT/" + spellText1, 16, false, 170+0*21, "aqua");
                drawText("RT/" + spellText2, 16, false, 170+1*21, "aqua");        
                drawText("LB/" + spellText3, 16, false, 170+2*21, "aqua");        
                drawText("RB/" + spellText4, 16, false, 170+3*21, "aqua");        
                drawText("X/" + spellText5, 16, false, 170+4*21, "aqua");        
                drawText("Y/" + spellText6, 16, false, 170+5*21, "aqua");                
            
            drawText("Functions ", 21, false, 315 , "violet");
                drawText("SELECT/ENTER) USE(); ", 16, false, 345 , "aqua");
                drawText("START/f) TICK(); ", 16, false, 366 , "aqua");


            drawText("Hardware (Press # to Equip) ", 21, false, 406, "violet");
                let swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? '[Equipped]' : '' || ""));                        
                drawText("A/" + swordText, 16, false, 436, "aqua");        
            
            
                let armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? '[Equipped]' : '' || ""));                        
                drawText("B/" + armorText, 16, false, 457, "aqua");

            drawText("Mutations", 21, false, 497, "violet");
                if (moonShoes === true){
                    drawText("9) Move two (toggle R Stick)", 16, false, 517, "aqua");     
                }else if (readyToMutate === true){
                    drawText("9) Press Start to Mutate", 16, false, 517, "aqua");     
                }        
            
            drawText("Gamepad Connected ", 21, false, 555, "violet");
        }
    }else {
        return;
    }
}

 
function tick(){
    for(let k=monsters.length-1;k>=0;k--){
        if(!monsters[k].dead){
            monsters[k].update();
        }else{
            monsters.splice(k,1);
        }
    }

    if (standingInFire === true){
        player.hp -= 1    
        if(player.hp <= 0){
            player.die();
            addScore(score, false);   
            tier1SwordEquipped = false;
            tier1ArmorEquipped = false;
            readyToExit = false;
            gameState = "dead";
        }
    }

    player.update();


    //console.log(bossDamageReduction);

    if(bossDamageReduction > 1){
        bossDamageReduction -=1;
        //console.log(bossDamageReduction);
    }

    if (level >= 14 && level != 20){
        if(Math.random() <= 0.34){
            randomPassableTile().replace(EatableEaterMutateWall);
        }    
    }

    if(level === 6){
        if(Math.random() <= 0.34){ 
            for(let i=1;i<numTiles-1;i++){
                let findHazardBoss = tiles[i].findIndex((tile) => tile instanceof Rubble);
                if (findHazardBoss !== -1){
                    let tile = getBossTile(i, findHazardBoss);
                    tile.replace(BossFloor);
                    break;
                }
            }           
        }
    }else if(level >= 4 && level < 6  || level > 7){
        if(Math.random() <= 0.34){ 
            for(let i=1;i<numTiles-1;i++){
                let findHazard = tiles[i].findIndex((tile) => tile instanceof MagicRubble);
                if (findHazard !== -1){
                    let tile = getTile(i, findHazard);
                    tile.replace(Floor);
                    break;
                }
            }    
        }
    };

    if(player.dead){
        player.die();
        addScore(score, false);   
        tier1SwordEquipped = false;
        tier1ArmorEquipped = false;
        readyToExit = false;
        gameState = "dead";
    }

    if(player.hp <= 0){
        player.die();
        addScore(score, false);   
        tier1SwordEquipped = false;
        tier1ArmorEquipped = false;
        readyToExit = false;
        gameState = "dead";
    }


    spawnCounter--;
    if (level > 6 && level <= 13){
        return;
    }else {
        if(spawnCounter <= 0){  
            spawnMonster();
            spawnCounter = spawnRate;
            spawnRate--;
        }    
    }

    if (boss2bHP <= 0 && boss2bDefeated === false){
        tiles[4][4] = new MutateExit(4, 4);
        boss2bDefeated = true;
    }

    if (level === 20 && boss2bDefeated === false){
        num2bMonsters += 1;
        if(num2bMonsters === 3){
            monsters.push(new LargeExplodingMonster(tiles[3][1]));    
        }else if(num2bMonsters === 5){
            monsters.push(new ExplodingMonster(tiles[5][1]));    
        }else if(num2bMonsters === 8){
            monsters.push(new LargeExplodingMonster(tiles[1][7]));    
        }else if(num2bMonsters === 13){
            monsters.push(new ExplodingMonster(tiles[7][7]));    
        }else if(num2bMonsters === 21){
            monsters.push(new LargeExplodingMonster(tiles[4][4]));    
        }else if(num2bMonsters === 34){
            num2bMonsters = 0;    
        }
        
    }

}

function startGame(){
    playSound("music");
    soundStopped = false;                                       
    level = 20;
    score = 0;
    numSpells = 1;
    numBossSpells = 1;
    numSword = 0;
    numArmor = 0;
    tier1SwordEquipped = false;
    tier1ArmorEquipped = false;
    //moonShoes = false;
    readyToMutate = false;
    startLevel(startingHp);

    gameState = "running";
}

function startLevel(playerHp, playerSpells, playerBaseAttack = 1){         
    readyToExit = false;
    spawnRate = 15;              
    spawnCounter = spawnRate;
    if (level >= 14){
        generateEaterMutationLevel();    
    }else if (level > 6 && level <= 13){
        console.log(level);
        generateMutationLevel();
        spawnRate = 30
    }else {
        generateLevel();       
    } 

    if (level === 20){
        player = new Player(certainPassableTile());
    }else{
        player = new Player(randomPassableTile());    
    }

    player.hp = playerHp;
    player.baseAttack = playerBaseAttack;
    welldepleted = false;
    mutatedepleted = false;
    if(playerSpells){
        player.spells = playerSpells;
    } 

    if((Math.random() * 10 < 5) && level != 20){
        randomPassableTile().replace(Well);
    }
    
    if (level >= 14){
        console.log("this is where an exit would have been drawn, but level Y Exits are hidden in the walls!");
    }else {
        randomPassableTileNotWell().replace(Exit);    
    }

    if (level === 7 || level === 9){
        randomPassableTileNotWell().replace(MutateFloorButton);    
    }
    if (level === 8 || level === 10 || level === 11 || level === 12){
        randomPassableTileNotWell().replace(MutateFloorButton);
        randomPassableTileNotWell().replace(MutateFloorButton2);    
    }

    gameState = "running";

    if (level === 7){
        pauseSound('bossmusic');
        playSound('music2');
    }
    if (level === 14){
        pauseSound('music2');
        playSound('music3');
    }
    /*if (level === 14){
        pauseSound('music2');
        playSound('music3');
    }*/

    if (level === 20){
        //play level 20 music
        num2bMonsters = 0;
    }

}

function startBossLevel(playerHp, playerSpells, playerBaseAttack = 1){         
    readyToExit = false;
    spawnRate = 15;              
    spawnCounter = spawnRate;
    if (level === 6){
        generateBossLevel();
    }else if (level === 13){
        generateBossLevel2();    
    }                                 
    

    player = new Player(randomPassableTile());

    player.hp = playerHp;
    player.baseAttack = playerBaseAttack;
    welldepleted = false;

    if(playerSpells){
        player.spells = playerSpells;
    } 
    gameState = "running";
}

function drawText(text, size, centered, textY, color, textX){
    ctx.fillStyle = color;
    ctx.font = size + "px monospace";

    if(centered){
        textX = (canvas.width-ctx.measureText(text).width)/2;
    }else if(textX === undefined){
        textX = canvas.width-uiWidth*tileSize+25;
    }

    ctx.fillText(text, textX, textY);
}

function getScores(){
    if(localStorage["scores"]){
        return JSON.parse(localStorage["scores"]);
    }else{
        return [];
    }
}

function addScore(score, won){
    let scores = getScores();
    let scoreObject = {score: score, run: 1, totalScore: score, active: won};
    let lastScore = scores.pop();

    if(lastScore){
        if(lastScore.active){
            scoreObject.run = lastScore.run+1;
            scoreObject.totalScore += lastScore.totalScore;
        }else{
            scores.push(lastScore);
        }
    }
    scores.push(scoreObject);

    localStorage["scores"] = JSON.stringify(scores);
}

function drawScores(){
    let scores = getScores();
    if(scores.length){
        drawText(
            rightPad(["RUN","SCORE","TOTAL"]),
            18,
            true,
            canvas.height/2,
            "white"
        );

        let newestScore = scores.pop();
        scores.sort(function(a,b){
            return b.totalScore - a.totalScore;
        });
        scores.unshift(newestScore);

        for(let i=0;i<Math.min(10,scores.length);i++){
            let scoreText = rightPad([scores[i].run, scores[i].score, scores[i].totalScore]);
            drawText(
                scoreText,
                18,
                true,
                canvas.height/2 + 24+i*24,
                i == 0 ? "aqua" : "violet"
            );
        }
    }
}

function screenshake(){
    if(shakeAmount){
        shakeAmount--;
    }
    let shakeAngle = Math.random()*Math.PI*2;
    shakeX = Math.round(Math.cos(shakeAngle)*shakeAmount);
    shakeY = Math.round(Math.sin(shakeAngle)*shakeAmount);
}

function initSounds(){          
    sounds = {
        dig1: new Audio('sounds/dig1.wav'),
        dig2: new Audio('sounds/dig2.wav'),

        hit1: new Audio('sounds/hit1.wav'),
        hit2: new Audio('sounds/hit2.wav'),
        smallexplosion: new Audio('sounds/smallexplosion.wav'),
        treasure: new Audio('sounds/treasure.wav'),
        treasure2: new Audio('sounds/treasure2.wav'),
        newLevel: new Audio('sounds/newLevel.wav'),
        spell: new Audio('sounds/spell.wav'),
        well: new Audio('sounds/well.wav'),
        empty_well: new Audio('sounds/empty_well.wav'),
        pickup_armor: new Audio('sounds/pickup_armor.ogg'),
        pickup_sword: new Audio('sounds/pickup_sword.ogg'),
        equip_armor: new Audio('sounds/equip_armor.wav'),
        equip_sword: new Audio('sounds/equip_sword.wav'),
        music: new Audio('sounds/music.wav'),
        music2: new Audio('sounds/music2.wav'),
        music3: new Audio('sounds/music3.wav'),
        bossmusic: new Audio('sounds/bossmusic.wav'),
        rpSection0Music: new Audio('sounds/rpSection0Music.wav'),
        transitionMusic2b: new Audio('sounds/transition1.wav'),
        transitionMusic2a: new Audio('sounds/transition2.wav'),
    };
        sounds.music.loop = true;
        sounds.bossmusic.loop = true;
        sounds.music2.loop = true;
        sounds.music3.loop = true;
        sounds.rpSection0Music.loop = true;

}

function playSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].play();
}

function pauseSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].pause();
}

function playTreasureSounds(){
    if (Math.random() > .5){
        playSound("treasure");
    }else {
        playSound("treasure2");
    }
};

init();
