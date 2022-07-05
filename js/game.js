function setupCanvas(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = tileSize*(numTiles+uiWidth);
    canvas.height = tileSize*numTiles;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    ctx.imageSmoothingEnabled = false;
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
    if(gameState == "running" || gameState == "dead"){  
        ctx.clearRect(0,0,canvas.width,canvas.height);

        screenshake();

        for(let i=0;i<numTiles;i++){
            for(let j=0;j<numTiles;j++){
                getTile(i,j).draw();
            }
        }

        for(let i=0;i<monsters.length;i++){
            monsters[i].draw();
        }
        
        player.draw();

        drawText("Level: "+level, 30, false, 40, "violet");
        drawText("Score: "+score, 30, false, 70, "violet");
        drawText("HP: "+player.hp, 30, false, 100, "violet");

        if(gamepadConnected === false){
            drawText("Executables", 21, false, 140, "violet");
            let spellText1 = (1) + ") " + (player.spells[0] + ".EXE" || "");                        
                let spellText2 = (2) + ") " + (player.spells[1] + ".EXE" || "");
                let spellText3 = (3) + ") " + (player.spells[2] + ".EXE"  || "");
                let spellText4 = (4) + ") " + (player.spells[3] + ".EXE"  || "");
                let spellText5 = (5) + ") " + (player.spells[4] + ".EXE"  || "");
                let spellText6 = (6) + ") " + (player.spells[5] + ".EXE"  || "");
                drawText(spellText1, 20, false, 170+0*21, "aqua");
                drawText(spellText2, 20, false, 170+1*21, "aqua");        
                drawText(spellText3, 20, false, 170+2*21, "aqua");        
                drawText(spellText4, 20, false, 170+3*21, "aqua");        
                drawText(spellText5, 20, false, 170+4*21, "aqua");        
                drawText(spellText6, 20, false, 170+5*21, "aqua"); 

            drawText("Functions ", 21, false, 315 , "violet");
                drawText("ENTER) USE(); ", 20, false, 345 , "aqua");
                drawText("f) TICK(); ", 20, false, 366 , "aqua");

            drawText("Hardware ", 21, false, 406, "violet");
                let swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? '[Equipped]' : '' || ""));                          
                drawText(swordText, 20, false, 436, "aqua");        

                let armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? '[Equipped]' : '' || ""));                         
                drawText(armorText, 20, false, 457, "aqua");        
            
        }

        if(gamepadConnected === true){
            drawText("Executables", 21, false, 140, "violet");
                let spellText1 = (1) + ") " + (player.spells[0] || "");                        
                let spellText2 = (2) + ") " + (player.spells[1] || "");
                let spellText3 = (3) + ") " + (player.spells[2] || "");
                let spellText4 = (4) + ") " + (player.spells[3] || "");
                let spellText5 = (5) + ") " + (player.spells[4] || "");
                let spellText6 = (6) + ") " + (player.spells[5] || "");
                drawText("LT/" + spellText1, 20, false, 170+0*21, "aqua");
                drawText("RT/" + spellText2, 20, false, 170+1*21, "aqua");        
                drawText("LB/" + spellText3, 20, false, 170+2*21, "aqua");        
                drawText("RB/" + spellText4, 20, false, 170+3*21, "aqua");        
                drawText("X/" + spellText5, 20, false, 170+4*21, "aqua");        
                drawText("Y/" + spellText6, 20, false, 170+5*21, "aqua");                
            
            drawText("Functions ", 21, false, 315 , "violet");
                drawText("SELECT/ENTER) USE(); ", 20, false, 345 , "aqua");
                drawText("START/f) TICK(); ", 20, false, 366 , "aqua");


            drawText("Hardware ", 21, false, 406, "violet");
                let swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? '[Equipped]' : '' || ""));                        
                drawText("A/" + swordText, 20, false, 436, "aqua");        
            
            
                let armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? '[Equipped]' : '' || ""));                        
                drawText("B/" + armorText, 20, false, 457, "aqua");        
            
            drawText("Gamepad Connected ", 21, false, 555, "violet");
        }
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

    player.update();

    console.log(bossDamageReduction);

    if(bossDamageReduction > 1){
        bossDamageReduction -=1;
        console.log(bossDamageReduction);
    }


    if(level === 6){
        if(Math.random() < .5){ 
            randomHazardTile().replace(BossFloor);
            if(bossDamageReduction > 1){
            }
        }
    }


    if(player.dead){
        addScore(score, false);   
        tier1SwordEquipped = false;
        tier1ArmorEquipped = false;
        readyToExit = false;
        gameState = "dead";
    }

    spawnCounter--;
    if(spawnCounter <= 0){  
        spawnMonster();
        spawnCounter = spawnRate;
        spawnRate--;
    }
}

function showTitle(){                                          
    ctx.fillStyle = 'rgba(0,0,0,.75)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    gameState = "title";

    drawText("Yew's", 40, true, canvas.height/2 - 110, "white");
    drawText("Rogue-Like", 70, true, canvas.height/2 - 50, "white"); 

    drawScores(); 
}

function startGame(){
    playSound("music");
    soundStopped = false;                                       
    level = 1;
    score = 0;
    numSpells =0;
    numBossSpells = 1;
    numSword = 0;
    numArmor = 0;
    tier1SwordEquipped = false;
    tier1ArmorEquipped = false;
    startLevel(startingHp);

    gameState = "running";
}

function startLevel(playerHp, playerSpells, playerBaseAttack = 1){         
    readyToExit = false;
    spawnRate = 15;              
    spawnCounter = spawnRate;                  
    generateLevel();

    player = new Player(randomPassableTile());
    player.hp = playerHp;
    player.baseAttack = playerBaseAttack;
    welldepleted = false;
    if(playerSpells){
        player.spells = playerSpells;
    } 
    randomPassableTile().replace(Exit);

    if(Math.random() * 10 < 5){
     randomPassableTile().replace(Well);
    }
}

function startBossLevel(playerHp, playerSpells, playerBaseAttack = 1){         
    readyToExit = false;
    spawnRate = 15;              
    spawnCounter = spawnRate;                                 
    generateBossLevel();

    player = new Player(randomPassableTile());
    player.hp = playerHp;
    player.baseAttack = playerBaseAttack;
    welldepleted = false;
    if(playerSpells){
        player.spells = playerSpells;
    } 
}

function drawText(text, size, centered, textY, color){
    ctx.fillStyle = color;
    ctx.font = size + "px monospace";
    let textX;
    if(centered){
        textX = (canvas.width-ctx.measureText(text).width)/2;
    }else{
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
        hit1: new Audio('sounds/hit1.wav'),
        hit2: new Audio('sounds/hit2.wav'),
        treasure: new Audio('sounds/treasure.wav'),
        newLevel: new Audio('sounds/newLevel.wav'),
        spell: new Audio('sounds/spell.wav'),
        well: new Audio('sounds/well.wav'),
        empty_well: new Audio('sounds/empty_well.wav'),
        pickup_armor: new Audio('sounds/pickup_armor.ogg'),
        pickup_sword: new Audio('sounds/pickup_sword.ogg'),
        equip_armor: new Audio('sounds/equip_armor.wav'),
        equip_sword: new Audio('sounds/equip_sword.wav'),
        music: new Audio('sounds/music.wav'),
    };
}

function playSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].play();
}

function pauseSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].pause();
}


