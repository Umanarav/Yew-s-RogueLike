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
        drawText("Spells", 21, false, 140, "violet");
        for(let i=0; i<player.spells.length; i++){
            let spellText = (i+1) + ") " + (player.spells[i] || "");                        
            drawText(spellText, 20, false, 170+i*21, "aqua");        
        }
        drawText("Inventory ", 21, false, 377, "violet");
        for(let i=0; i<player.swords.length; i++){
            let swordText = (7) + ") " + (player.swords[i] + (tier1SwordEquipped ? '[Equipped]' : '' || ""));                        
            drawText(swordText, 20, false, 407+i*21, "aqua");        
        }
        for(let i=0; i<player.armors.length; i++){
            let armorText = (8) + ") " + (player.armors[i] + (tier1ArmorEquipped ? '[Equipped]' : '' || ""));                        
            drawText(armorText, 20, false, 428, "aqua");        
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

    if(player.dead){
        addScore(score, false);   
        tier1SwordEquipped = false;
        tier1ArmorEquipped = false; 
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
    level = 1;
    score = 0;
    numSpells = 1;
    numSword = 0;
    numArmor = 0;
    tier1SwordEquipped = false;
    tier1ArmorEquipped = false;
    startLevel(startingHp);

    gameState = "running";
}

function startLevel(playerHp, playerSpells, playerBaseAttack = 1){         
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
        equip_armor: new Audio('sounds/equip_armor.wav'),
        equip_sword: new Audio('sounds/equip_sword.wav'),
    };
}

function playSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].play();
}