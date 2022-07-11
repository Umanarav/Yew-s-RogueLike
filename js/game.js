//
/*animation*/
const titleBackdrop0 = new Image();
const titleBackdrop1 = new Image();
const titleBackdrop2 = new Image();
const titleBackdrop3 = new Image();
const titleBackdrop4 = new Image();
const titleBackdrop5 = new Image();
const titleBackdrop6 = new Image();

var someNumberTitle = 11;

animatingTitle = false;

function drawTitleBackdrop() {
    if (animatingTitle === true){
        someNumberTitle += 1;
        console.log(someNumberTitle);
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        if (someNumberTitle === 11 || someNumberTitle === 12){
            someNumberTitle +=1
            ctx.drawImage(titleBackdrop0, 0, 0,)
        }else if(someNumberTitle === 13 || someNumberTitle === 14){
            someNumberTitle +=1
            ctx.drawImage(titleBackdrop1, 0, 0,)
        }else if(someNumberTitle === 15 || someNumberTitle === 16){
            someNumberTitle +=1
            ctx.drawImage(titleBackdrop2, 0, 0,)
        }else if(someNumberTitle === 17 || someNumberTitle === 18){
            someNumberTitle +=1
            ctx.drawImage(titleBackdrop3, 0, 0,)
        }else if(someNumberTitle === 19 || someNumberTitle === 20){
            someNumberTitle +=1
            ctx.drawImage(titleBackdrop4, 0, 0,)
        }else if(someNumberTitle === 21 || someNumberTitle === 22){
            someNumberTitle +=1
            ctx.drawImage(titleBackdrop5, 0, 0,)
        }
        else if(someNumberTitle === 23 || someNumberTitle === 24){
            someNumberTitle = 11
            ctx.drawImage(titleBackdrop6, 0, 0,)
        }

        drawText("Yew's", 40, true, canvas.height/2 - 110, "white");
        drawText("Rogue-Like", 70, true, canvas.height/2 - 50, "white"); 
        drawScores(); 

        setTimeout(() => {
            window.requestAnimationFrame(drawTitleBackdrop); 
        }, 150);
    }else {
        return;
    }
}

/*animation*/
const rpSection0Backdrop0 = new Image();
const rpSection0Backdrop1 = new Image();
const rpSection0Backdrop2 = new Image();
const rpSection0Backdrop3 = new Image();
const rpSection0Backdrop4 = new Image();
const rpSection0Backdrop5 = new Image();
const rpSection0Backdrop6 = new Image();

const monsterEscapeText0 = new Image();
const monsterEscapeText1 = new Image();
const monsterEscapeText2 = new Image();
const monsterEscapeText3 = new Image();
const monsterEscapeText4 = new Image();
const monsterEscapeText5 = new Image();
const monsterEscapeText6 = new Image();
const monsterEscapeText7 = new Image();
const monsterEscapeText8 = new Image();
const monsterEscapeText9 = new Image();
const monsterEscapeText10 = new Image();
const monsterEscapeText11 = new Image();
const monsterEscapeText12 = new Image();
const monsterEscapeText13 = new Image();

var someNumber = 10;
var someNumberEscapeText = 10;
animating = false;

function init() {
    rpSection0Backdrop0.src = 'rpSection0Backdrop/rpSection0Backdrop0.png'
    rpSection0Backdrop1.src = 'rpSection0Backdrop/rpSection0Backdrop1.png'
    rpSection0Backdrop2.src = 'rpSection0Backdrop/rpSection0Backdrop2.png'
    rpSection0Backdrop3.src = 'rpSection0Backdrop/rpSection0Backdrop3.png'
    rpSection0Backdrop4.src = 'rpSection0Backdrop/rpSection0Backdrop4.png'
    rpSection0Backdrop5.src = 'rpSection0Backdrop/rpSection0Backdrop5.png'
    rpSection0Backdrop6.src = 'rpSection0Backdrop/rpSection0Backdrop6.png'

    titleBackdrop0.src = 'titleBackdrop/TitleBackdrop0.png'
    titleBackdrop1.src = 'titleBackdrop/TitleBackdrop1.png'
    titleBackdrop2.src = 'titleBackdrop/TitleBackdrop2.png'
    titleBackdrop3.src = 'titleBackdrop/TitleBackdrop3.png'
    titleBackdrop4.src = 'titleBackdrop/TitleBackdrop4.png'
    titleBackdrop5.src = 'titleBackdrop/TitleBackdrop5.png'
    titleBackdrop6.src = 'titleBackdrop/TitleBackdrop6.png'

    monsterEscapeText0.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText0.png'
    monsterEscapeText1.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText1.png'
    monsterEscapeText2.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText2.png'
    monsterEscapeText3.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText3.png'
    monsterEscapeText4.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText4.png'
    monsterEscapeText5.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText5.png'
    monsterEscapeText6.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText6.png'
    monsterEscapeText7.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText7.png'
    monsterEscapeText8.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText8.png'
    monsterEscapeText9.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText9.png'
    monsterEscapeText10.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText10.png'
    monsterEscapeText11.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText11.png'
    monsterEscapeText12.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText12.png'
    monsterEscapeText13.src = 'rpSection0Backdrop/monsterEscapeText/monsterEscapeText13.png'

    window.requestAnimationFrame(draw);
}

function drawRpSection0Backdrop() {
    if (animating === true){
        someNumber += 1;
        someNumberEscapeText +=1;
        console.log(someNumberEscapeText);
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        if (someNumber === 11 || someNumber === 12){
            someNumber +=1
            ctx.drawImage(rpSection0Backdrop0, 0, 0,)
        }else if(someNumber === 13 || someNumber === 14){
            someNumber +=1
            ctx.drawImage(rpSection0Backdrop1, 0, 0,)
        }else if(someNumber === 15 || someNumber === 16){
            someNumber +=1
            ctx.drawImage(rpSection0Backdrop2, 0, 0,)
        }else if(someNumber === 17 || someNumber === 18){
            someNumber +=1
            ctx.drawImage(rpSection0Backdrop3, 0, 0,)
        }else if(someNumber === 19 || someNumber === 20){
            someNumber +=1
            ctx.drawImage(rpSection0Backdrop4, 0, 0,)
        }else if(someNumber === 21 || someNumber === 22){
            someNumber +=1
            ctx.drawImage(rpSection0Backdrop5, 0, 0,)
        }
        else if(someNumber === 23 || someNumber === 24){
            someNumber = 11
            ctx.drawImage(rpSection0Backdrop6, 0, 0,)
        }

        if (someNumberEscapeText === 11 || someNumberEscapeText === 12){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText0, 0, 0,)
        }else if(someNumberEscapeText === 13 || someNumberEscapeText === 14){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText1, 0, 0,)
        }else if(someNumberEscapeText === 15 || someNumberEscapeText === 16){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText2, 0, 0,)
        }else if(someNumberEscapeText === 17 || someNumberEscapeText === 18){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText3, 0, 0,)
        }else if(someNumberEscapeText === 19 || someNumberEscapeText === 20){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText4, 0, 0,)
        }else if(someNumberEscapeText === 21 || someNumberEscapeText === 22){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText5, 0, 0,)
        }else if(someNumberEscapeText === 23 || someNumberEscapeText === 24){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText6, 0, 0,)
        }
        else if(someNumberEscapeText === 25 || someNumberEscapeText === 26){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText7, 0, 0,)
        }else if(someNumberEscapeText === 27 || someNumberEscapeText === 28){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText8, 0, 0,)
        }else if(someNumberEscapeText === 29 || someNumberEscapeText === 30){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText9, 0, 0,)
        }else if(someNumberEscapeText === 31 || someNumberEscapeText === 32){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText10, 0, 0,)
        }else if(someNumberEscapeText === 33 || someNumberEscapeText === 34){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText11, 0, 0,)
        }else if(someNumberEscapeText === 35 || someNumberEscapeText === 36){
            someNumberEscapeText +=1
            ctx.drawImage(monsterEscapeText12, 0, 0,)
        }else if(someNumberEscapeText >= 37){
            someNumberEscapeText = 25
            ctx.drawImage(monsterEscapeText13, 0, 0,)
        }

        /*text, size, centered, textY, color*/  

        drawText("(Press enter to continue)", 21, true, canvas.height/2, "white");

        setTimeout(() => {
            window.requestAnimationFrame(drawRpSection0Backdrop); 
        }, 150);
    }else {
        return;
    }
}

/*Other Functions*/

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
    if(gameState === 'running'|| gameState == "dead"){  
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
                drawText(spellText1, 16, false, 170+0*21, "aqua");
                drawText(spellText2, 16, false, 170+1*21, "aqua");        
                drawText(spellText3, 16, false, 170+2*21, "aqua");        
                drawText(spellText4, 16, false, 170+3*21, "aqua");        
                drawText(spellText5, 16, false, 170+4*21, "aqua");        
                drawText(spellText6, 16, false, 170+5*21, "aqua"); 

            drawText("Functions ", 21, false, 315 , "violet");
                drawText("ENTER) USE(); ", 16, false, 345 , "aqua");
                drawText("f) TICK(); ", 16, false, 366 , "aqua");

            drawText("Hardware (Press # to Equip)", 21, false, 406, "violet");
                let swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? '[Equipped]' : '' || ""));                          
                drawText(swordText, 16, false, 436, "aqua");        

                let armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? '[Equipped]' : '' || ""));                         
                drawText(armorText, 16, false, 457, "aqua");        
            
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

    animatingTitle = true;
    gameState = "title";

    drawTitleBackdrop();

}

function showRpSection0(){                                          
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    animating = true;
    gameState = "rpSection0";
    drawRpSection0Backdrop();
    
}

function showRpSection1(){                                          
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    gameState = "rpSection1";

    drawText("RP", 40, true, canvas.height/2 - 110, "white");
    drawText("SECTION 1", 70, true, canvas.height/2 - 50, "white"); 
    drawText("(Press enter to continue)", 40, true, canvas.height/2, "white"); 
}

function startGame(){
    playSound("music");
    soundStopped = false;                                       
    level = 1;
    score = 0;
    numSpells = 1;
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

    if(Math.random() * 10 < 5){
     randomPassableTile().replace(Well);
    }

    randomPassableTileNotWell().replace(Exit);

    gameState = "running";

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
        sounds.music.loop = true;
}

function playSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].play();
}

function pauseSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].pause();
}

init();
