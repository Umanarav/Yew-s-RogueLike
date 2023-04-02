gameState = "Title";
let moonShoes = false;
let eaterSoul = false;
let canvas2;

let num2bMonsters = 0;
let boss2bDefeated = false;

let readyToBuyHP6 = false;
let readyToBuySwordUpgrade = false;
let readyToBuyArmorUpgrade = false;

let weaponUpgraded = false;
var armorUpgraded = false;

let konamiActivated = false;
let konamiAnimationTigger = false;

let readyToTalkToShopKeeper = false;
let shopKeepDialogIndicator = 0;

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
        }else if (level === -777){
            drawText("Shop:" + (level), 30, false, 40, "violet");
        }else {
            drawText("Level: 1."+(level), 30, false, 40, "violet");    
        }

        if (score === 1){
            drawText("Disk: "+score, 30, false, 70, "violet");    
        }else {
            drawText("Disks: "+score, 30, false, 70, "violet");    
        }

        drawText("HP: "+player.hp, 30, false, 100, "violet");

        /*if (level > 6 && level < 13 && monster2aPaused === true){
            ctx.save();
            ctx.shadowBlur = 5;
            drawText("Shadows Frozen ", 21, false, 38, "white", 144 + arc2AX1Counter);
            ctx.restore();

            //drawLevel2aPauseIndicator();    
        }else if (level > 6 && level < 13 && monster2aPaused === false && readyToExit != true && readyToDrink != true && animatingLevel2aTooltip === false){
            ctx.save();
            ctx.shadowBlur = 5;
            drawText("Press Enter to freeze Shadows ", 21, false, 38, "white", 34);
            ctx.restore();    
        }*/

        if (level === 20 && boss2bHP > 0){

            //background
            ctx.save();
            ctx.fillStyle = `rgb(0,0,0,${.84})`;
            ctx.fillRect(13, 13, 525, 38)
            ctx.restore();


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

        if (level === 13 && boss2aProgressIndicator >= 0){

            //background
            ctx.save();
            ctx.fillStyle = `rgb(0,0,0,${.84})`;
            ctx.fillRect(13, 13, 525, 38)
            ctx.restore();


            //health bar
            drawText("Boss2a: " + (boss2aProgressIndicator + 1), 21, false, 38, "white", 34);
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(213, 26, boss2aProgressIndicator * 69 + 2, 12)
            ctx.fillStyle = 'red';
            ctx.fillRect(214, 27, boss2aProgressIndicator * 69, 10)
            ctx.restore();

        }

        if (readyToTriggerTopBot === true || readyToTriggerRightBot === true || readyToTriggerLeftBot === true || readyToTriggerBottomBot === true){
            drawText("press Enter to activate the Bot!", 21, false, 233, "white", 89);
            if (readyToTriggerTopBot === true){
                drawText("-6 Disks", 21, false, 89, "white", 144);
                drawSprite(12, 2.5, 1.5);
            }

            if (readyToTriggerRightBot === true){
                drawText("-Eater Soul", 21, false, 377, "white", 377);
                drawSprite(53, 6.5, 6.5);
            }

            if (readyToTriggerLeftBot === true){
                drawText("-Moon Shoes", 21, false, 377, "white", 89);
                drawSprite(32, 2.5, 6.5);
            }


            if (readyToTriggerBottomBot === true){
                drawText("-12 Disks", 21, false, 377, "white", 144);
                drawSprite(12, 2.5, 6.5);
            }
        }

        if (level === 21 && readyToConverseWithScientistA === true){
            drawText("I locked myself in here", 21, false, 233, "white", 144);
                
        }

        if(level === -777 && shopkeepHostile === false){

            //buying bottome left HP 
            if(player.tile.x === 1 && player.tile.y === 7 ||player.tile.x === 2 && player.tile.y === 7 ||player.tile.x === 1 && player.tile.y === 6){
                readyToBuyHP6 = true;
                drawText("-6 Disks", 21, false, 89, "white", 144);
                drawText("+6 player.hp", 21, false, 144, "white", 233);
                drawSprite(12, 2.5, 1.5);
            }else {
                readyToBuyHP6 = false;
            }

            //drawing swords on top left square
            if (numSword === 0){
                drawSprite(21, 1, 1);
            }else if (numSword === 1 && weaponUpgraded != true){
                drawSprite(139, 1, 1);
            }

            if (numArmor === 0){
                drawSprite(22, 7, 1);
            }else if (numArmor === 1 && armorUpgraded != true){
                drawSprite(131, 7, 1);
            }


            //buying Plating and Plating+   

            if(player.tile.x === 7 && player.tile.y === 1 || player.tile.x === 6 && player.tile.y === 1 || player.tile.x === 7 && player.tile.y === 2 ){
                readyToBuyArmorUpgrade = true;
                if (numArmor === 0){
                    drawText("-6 Disks", 21, false, 89, "white", 144);
                    drawText("+ armor", 21, false, 144, "white", 233);
                    drawSprite(22, 2.5, 1.5);
                }else if (numArmor === 1 && armorUpgraded != true){
                    drawText("-12 Disks", 21, false, 89, "white", 144);
                    drawText("+Armor upgrade", 21, false, 144, "white", 233);
                    drawSprite(131, 2.5, 1.5);
                }else if (armorUpgraded === true){
                    drawText("sorry pal", 21, false, 89, "white", 144);
                    drawText("i'm sold out", 21, false, 144, "white", 233);
                }
            }else {
                readyToBuyArmorUpgrade = false;
            }

            //buying CPMII and upgrade to CPMIII
            if(player.tile.x === 1 && player.tile.y === 1 ||player.tile.x === 2 && player.tile.y === 1 ||player.tile.x === 1 && player.tile.y === 2 ){
                readyToBuySwordUpgrade = true;
                if (numSword === 0){
                    drawText("-6 Disks", 21, false, 89, "white", 144);
                    drawText("+ weapon", 21, false, 144, "white", 233);
                    drawSprite(21, 2.5, 1.5);
                }else if (numSword === 1 && weaponUpgraded != true){
                    drawText("-12 Disks", 21, false, 89, "white", 144);
                    drawText("+weapon upgrade", 21, false, 144, "white", 233);
                    drawSprite(139, 2.5, 1.5);
                }else if (weaponUpgraded === true){
                    drawText("sorry pal", 21, false, 89, "white", 144);
                    drawText("i'm sold out", 21, false, 144, "white", 233);
                }
            }else {
                readyToBuySwordUpgrade = false;
            }
        
            //talk to robot 
            if(player.tile.x === 4 && player.tile.y === 2 ||player.tile.x === 3 && player.tile.y === 1 ||player.tile.x === 5 && player.tile.y === 1 ){
                readyToTalkToShopKeeper = true;
                ctx.fillStyle = 'rgba(13, 21, 34 , .55)';
                ctx.fillRect(64*5.13,64,64 * 4.25 ,64*1.78);
                ctx.strokeRect(64*5.13,64,64 * 4.25 ,64*1.78);

                if (shopKeepDialogIndicator === 0){
                    if (shopkeepDamaged === true){
                        drawText("bruh,,,", 21, false, 89, "white", 335);
                    }else {
                        drawText("welcome to the shop", 21, false, 89, "white", 335);
                    }
                    
                }else if (shopKeepDialogIndicator === 1){
                    drawText(`if you do the`, 21, false, 89, "white", 335);
                    drawText(`"secret dance",`, 21, false, 111, "white", 335);
                    drawText(`i'll let you`, 21, false, 143, "white", 335);
                    drawText(`in on a secret.`, 21, false, 165, "white", 335);
                }else if (shopKeepDialogIndicator === 2){
                    drawText("anyway, i'm Anok", 21, false, 89, "white", 335);
                }else if (shopKeepDialogIndicator === 3){
                    drawText("are you the", 21, false, 89, "white", 335);
                    drawText("robot they released?", 21, false, 111, "white", 335);
                }else if (shopKeepDialogIndicator === 4){
                    drawText("*scoffs*", 21, false, 89, "white", 355);
                }else if (shopKeepDialogIndicator === 5){
                    drawText("...", 21, false, 89, "white", 355);
                }else if (shopKeepDialogIndicator === 6){
                    drawText("You gain Executables ", 21, false, 89, "white", 335);
                    drawText(`from those disks`, 21, false, 111, "white", 335);
                    drawText(`but you don't need to `, 21, false, 143, "white", 335);
                    drawText(`keep them you know...`, 21, false, 165, "white", 335);
                }else if (shopKeepDialogIndicator === 7){
                    drawText(`are you gunna`, 21, false, 89, "white", 335);
                    drawText(`buy something?`, 21, false, 111, "white", 335);
                    drawText(`I need those `, 21, false, 143, "white", 335);
                    drawText(`disks...`, 21, false, 165, "white", 335);
                }else if (shopKeepDialogIndicator === -1){
                    drawText("i saw you do the", 21, false, 89, "white", 335);
                    drawText(`dance, so i'll tell`, 21, false, 111, "white", 335);
                    drawText("you the secret.", 21, false, 133, "white", 335);
                    drawText('press ` to reset', 21, false, 155, "white", 335);
                    drawText('the floor.', 21, false, 177, "white", 335);
                }else if (shopKeepDialogIndicator === -2){
                    drawText("nice moves", 21, false, 89, "white", 335);
                }else if (shopKeepDialogIndicator === -3){
                    drawText("...", 21, false, 89, "white", 335);
                }else if (shopKeepDialogIndicator === -4){
                    drawText("yeah, nice moves...", 21, false, 89, "white", 335);
                    drawText(`heh`, 21, false, 111, "white", 335);
                }else if (shopKeepDialogIndicator === -5){
                    drawText("are you gunna", 21, false, 89, "white", 335);
                    drawText(`give me your disks`, 21, false, 111, "white", 335);
                    drawText(`or what?`, 21, false, 143, "white", 335);
                }  
            }else {
                readyToTalkToShopKeeper = false;
                shopKeepDialogIndicator = 0;
                if (konamiActivated === true){
                    shopKeepDialogIndicator = -1
                }
            }

            if(player.tile.x === 5 && player.tile.y === 5 ){
                //readyToPlacehold === false
            }else{
                //readyToPlacehol === false
            }

            if(konamiActivated === true){
                showShopkeepKonamiAnimation();
            }
        }

        if (level === 11 && player.tile.y === 1){
            console.log('secret wheat');
            drawText("hi", 21, false, 89, "white", 335);
            drawSprite(214, player.tile.x, player.tile.y - 1);
        }


        if(gamepadConnected === false){
            drawText("Executables", 21, false, 140, "violet");
            drawText("Press 1-6 to use .EXE", 12, false, 154, "yellow");
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
            drawText(".EXEs refresh each floor", 12, false, 294, "yellow"); 

            drawText("Functions ", 21, false, 315 , "violet");
                if(readyToExit === true){
                    drawText("ENTER) useDoor(); ", 16, false, 345 , "aqua");
                }else if(readyToDrink === true){
                    drawText("ENTER) useWell(); ", 16, false, 345 , "aqua");
                }else if(level === 20 && boss2bButtonRPushed === true){
                    drawText("ENTER) fireWeapon(); ", 16, false, 345 , "aqua");
                }else if(level > 6 && level <= 13 && monster2aPaused === false && readyToExit != true && readyToDrink != true){
                    drawText("ENTER) freezeShadows(); ", 16, false, 345 , "aqua");    
                }else if(level > 6 && level <= 13 && monster2aPaused === true && readyToExit != true && readyToDrink != true){
                    drawText("ENTER) unFreezeShadows(); ", 16, false, 345 , "aqua");    
                }else if(level === 21 && readyToTriggerTopBot === true && topBotSlain === false && topBotActivated === false){
                    drawText("ENTER) Activate Bot(); ", 16, false, 345 , "aqua");    
                }else if(level === -777 && readyToTalkToShopKeeper === true){
                    drawText("ENTER) converse(); ", 16, false, 345 , "aqua");
                }else if(level === -777 && readyToBuyHP6 === true){
                    drawText("ENTER) purchase HP(); ", 16, false, 345 , "aqua");
                }else if(level === -777 && readyToBuySwordUpgrade === true || readyToBuyArmorUpgrade === true){
                    drawText("ENTER) purchase(); ", 16, false, 345 , "aqua");
                }else {
                    drawText("ENTER) use(); ", 16, false, 345 , "aqua");
                }
                drawText("f) TICK(); ", 16, false, 366 , "aqua");

            drawText("Inventory (i)", 21, false, 406, "violet");
                drawText("Press 7/8 to (un)equip", 12, false, 420, "yellow");
            
                let swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? ' [Equipped]' : '' || "")); 
                
                if (weaponUpgraded === true){
                    swordText = (7) + ") " + ((player.swords[0] || "") + "I" + (tier1SwordEquipped ? ' [Equipped]' : '' || "")); 
                }else {
                    swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? ' [Equipped]' : '' || "")); 
                }
                drawText(swordText, 16, false, 436, "aqua");        

                let armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? ' [Equipped]' : '' || ""));                         
                
                if (armorUpgraded === true){
                    armorText = (8) + ") " + ((player.armors[0] || "") + " +" + (tier1ArmorEquipped ? ' [Equipped]' : '' || ""));
                }else {
                    armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? ' [Equipped]' : '' || "")); 
                }
                
                drawText(armorText, 16, false, 457, "aqua");

            drawText("Mutations", 21, false, 497, "violet");
                if (moonShoes === true){
                    drawText("Move two (hold shift)", 16, false, 517, "aqua");     
                }else if (readyToMutate === true){
                    drawText("9) Press Enter to Mutate", 16, false, 517, "aqua");     
                }
                if(eatsWalls === true && eaterSoul === true){
                    drawText("Eat walls enabled (k)", 16, false, 538, "aqua");            
                }else if (eatsWalls === false && eaterSoul === true){
                    drawText("press k to eat walls", 16, false, 538, "aqua");
                } 
        }

        if(gamepadConnected === true){
            drawText("Executables", 21, false, 140, "violet");
            drawText("Press button to use .EXE", 12, false, 154, "yellow");
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
                drawText(".EXEs refresh each floor", 12, false, 294, "yellow");           
            
            drawText("Functions ", 21, false, 315 , "violet");
                
                if(readyToExit === true){
                    drawText("A/ENTER) useDoor(); ", 16, false, 345 , "aqua");
                }else if(readyToDrink === true){
                    drawText("A/ENTER) useWell(); ", 16, false, 345 , "aqua");
                }else if(level === 20 && boss2bButtonRPushed === true){
                    drawText("A/ENTER) fireWeapon(); ", 16, false, 345 , "aqua");
                }else if(level > 6 && level <= 13 && monster2aPaused === false && readyToExit != true && readyToDrink != true){
                    drawText("A/ENTER) freeze(); ", 16, false, 345 , "aqua");    
                }else if(level > 6 && level <= 13 && monster2aPaused === true && readyToExit != true && readyToDrink != true){
                    drawText("A/ENTER) unFreeze(); ", 16, false, 345 , "aqua");    
                }else {
                    drawText("A/ENTER) USE(); ", 16, false, 345 , "aqua");
                }

                drawText("START/ESC) MENU(); ", 16, false, 366 , "aqua");
                drawText("B/f) TICK(); ", 16, false, 386 , "aqua");

                



            drawText("Hardware", 21, false, 406, "violet");
                drawText("Enter -> Inventory to (un)equip", 12, false, 420, "yellow");
            
            let swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? ' [Equipped]' : '' || "")); 
            
            if (weaponUpgraded === true){
                swordText = (7) + ") " + ((player.swords[0] || "") + "I" + (tier1SwordEquipped ? ' [Equipped]' : '' || "")); 
            }else {
                swordText = (7) + ") " + ((player.swords[0] || "") + (tier1SwordEquipped ? ' [Equipped]' : '' || "")); 
            }
            drawText(swordText, 16, false, 436, "aqua");        

            let armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? ' [Equipped]' : '' || ""));                         
            
            if (armorUpgraded === true){
                armorText = (8) + ") " + ((player.armors[0] || "") + " +" + (tier1ArmorEquipped ? ' [Equipped]' : '' || ""));
            }else {
                armorText = (8) + ") " + ((player.armors[0] || "") + (tier1ArmorEquipped ? ' [Equipped]' : '' || "")); 
            }
            
            drawText(armorText, 16, false, 457, "aqua");

                
                

            drawText("Mutations", 21, false, 497, "violet");
                if (moonShoes === true){
                    if (moonShoesController === false){
                        drawText("Move two - Off (toggle R)", 16, false, 517, "aqua"); 
                    }else {
                        drawText("Move two - On (toggle R)", 16, false, 517, "aqua"); 
                    }
                         
                }else if (readyToMutate === true){
                    drawText("Press Start to Mutate", 16, false, 517, "aqua");     
                }
                if(eatsWalls === true && eaterSoul === true){
                    drawText("Eat Walls - On (toggle L)", 13, false, 538, "aqua");            
                }else if (eatsWalls === false && eaterSoul === true){
                    drawText("Eat Walls - Off (toggle L)", 13, false, 538, "aqua");
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

    if (level >= 14 && level <= 19){
        if(Math.random() <= 0.34){
            randomPassableTile().replace(EatableEaterMutateWall);
        }    
    }

    if(level === 7 ){
        //console.log(unlockDoor0);
    
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
    }else if(level >= 4 && level < 6){
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
        shopkeepHostile = false;
        shopkeepDamaged = false;
        playSound('playerDied');
        player.die();
        addScore(score, false);   
        tier1SwordEquipped = false;
        tier1ArmorEquipped = false;
        readyToExit = false;
        gameState = "dead";
    }

    if(player.hp <= 0){
        playSound('playerDied');
        player.die();
        addScore(score, false);   
        tier1SwordEquipped = false;
        tier1ArmorEquipped = false;
        readyToExit = false;
        gameState = "dead";
    }


    spawnCounter--;
    if (level > 6 && level <= 13){
        if (level === 13){
            return;
        }
        if(spawnCounter <= 0){
            spawnInitialWave();
        if (level >= 8){
            spawnInitialWave();
        }
        if (level >= 9){
            spawnInitialWave();
        }
        if (level >= 11){
            spawnInitialWave();
            spawnInitialWave();
        }       
            spawnCounter = spawnRate;
            spawnRate--;
        }      
    }else {
        if(spawnCounter <= 0){  
            spawnMonster();
            spawnCounter = spawnRate;
            spawnRate--;
        }    
    }

    if (boss2bHP <= 0 && boss2bDefeated === false){
        tiles[4][4] = new MutateExit(4, 4);
        tiles[2][5] = new boss2bButtonL(2, 5);
        reveal2bHelperCounter = 0;
        if (bossLocation === 1){
            turnOffL();
        }else if (bossLocation === 2){
            turnOffR();
        }else if (bossLocation === 3){
            turnOffB();
        }
        playSound('boss2bDeathCry');
        pauseSound("powderFuseTicking");
        cancelAnimationFrame(myReq);
        animateDormantCable();
        boss2bDefeated = true;

    }

    if (shopkeepHostile === true){
        pauseSound('musicShopkeep');
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

    if (topBotActivated === true && rightBotActivated === true && leftBotActivated === true && bottomBotActivated === true && gameState != "rpSectionFinal" || botSavedOrKilled === 4 && gameState != "rpSectionFinal"){
        showRpSectionFinal();
        console.log('should be final cutscene here')
    }

}

function startGame(){
    soundStopped = false;                                       
    level = 1;
    score = 0; 
    numSpells = 1;
    numBossSpells = 1;
    numSword = 0;
    numArmor = 0;
    tier1SwordEquipped = false;
    tier1ArmorEquipped = false;

    weaponUpgraded = false;
    armorUpgraded = false;
    konamiActivated = false;

    readyToTalkToShopKeeper = false;



    //moonShoes = false;
    readyToMutate = false;

        topBotActivated = false;
        bottomBotActivated = false;
        rightBotActivated = false;
        leftBotActivated = false;

        topBotSlain = false;
        rightBotSlain = false;
        leftBotSlain = false;
        botBotSlain = false;

        topBotSpawned = false;
        rightBotSpawned = false;
        leftBotSpawned = false;
        botBotSpawned = false;

        greenLightTileActivated = false;
        redLightTileActivated = false;
        botSavedOrKilled = 0;

        topBotX = 7;
        rightBotX = 7;
        leftBotX = 7;
        bottomBotX = 7;

        ctx.shadowBlur = 0;

    startLevel(startingHp);



    

    gameState = "running";
    if (level === 20){
        //
    }else if (level >= 14 && level < 20){
        playSound("music3");
        playSound('music3MenuMuffled');
    }else if(level > 6 && level < 13){
        playSound('music2');
        playSound('music2MenuMuffled');
        pauseSound("rpSection0Music");    
    }else if (level === 13){
        playSound('bossmusic');
        playSound('bossmusicMenuMuffled');
    }else {
        if (level != -777){        
            playSound("music");
            playSound("musicMenuMuffled");  
        }
        if (level === -777){
            playSound('musicShopkeep');
        }
    }

}

function startLevel(playerHp, playerSpells, playerBaseAttack = 1){         
    readyToExit = false;
    spawnRate = 15;              
    spawnCounter = spawnRate;
    ctx.shadowBlur = 0;

    if (level >= 14 && level <= 20){
        generateEaterMutationLevel();    
    }else if (level > 6 && level < 13){
        console.log(level);
        generateMutationLevel();
        spawnRate = 30
    }else if(level === 13){
        generateMutationBossLevel();
        boss2aProgressIndicator = 3;
        spawnRate = 30
    }else {
        generateLevel();       
    } 

    if (level === 21){
        player = new Player(randomPassableTile());
        
    }
    if (level === 20){
        player = new Player(certainPassableTile());
    }else if (level === 13){
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

    if((Math.random() * 10 < 5) && level != 20 && level != 13 && level != 21 && level != -777){
        randomPassableTile().replace(Well);
    }
    
    if (level >= 14){
        console.log("this is where an exit would have been drawn, but level Y Exits are hidden in the walls!");
    }else if(level > 6 && level < 13){
        randomPassableTileNotWell().replace(ExitLocked);
    }else if(level === 13){
        pauseSound('musicMenuMuffled');
        pauseSound('rpSection0Music');
        playSound("bossmusic");  
        playSound('bossmusicMenuMuffled');   
        sounds.bossmusic.muted = false;
        console.log("this is where an exit would have been randomly drawn, but level 13/level2aBoss prevents it.");
    }else if(level === -777){
        console.log("this is where an exit would have been randomly drawn, but shops prevent this.");
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

    if (level <= 5){
        pauseSound('music2');
        pauseSound('music2MenuMuffled');
        pauseSound('bossmusic');
        pauseSound('bossmusicMenuMuffled');
        pauseSound('music3');
        pauseSound('music3MenuMuffled');
    }

    if (level === 7){
        pauseSound('music');
        pauseSound("musicMenuMuffled");
        pauseSound('bossmusic');
        pauseSound('bossmusicMenuMuffled');
        pauseSound("rpSection0Music");
        pauseSound('music3');
        pauseSound('music3MenuMuffled');
        playSound('music2');
        playSound('music2MenuMuffled');

        animatingLevel2aTooltip = true;
        showLevel2aTooltip();
        
    }

    if (level >= 7 && level < 13){
        pauseSound('music3');
        pauseSound('music3MenuMuffled');
    }

    if (level === 14){
        playSound('music3');
        playSound('music3MenuMuffled');
    }
    if (level >= 14 && level < 20){
        pauseSound('music');
        pauseSound('musicMenuMuffled');
        pauseSound('music2');
        pauseSound('music2MenuMuffled');
        pauseSound('bossmusic');
        pauseSound('bossmusicMenuMuffled');
    }

    /*if (level === 14){
        pauseSound('music2');
        playSound('music3');
    }*/

    if (level === 20){
        //play level 20 music
        pauseSound('music');
        pauseSound('musicMenuMuffled');
        pauseSound('music2');
        pauseSound('music2MenuMuffled');

        playSound('boss2bMusic')
        num2bMonsters = 0;
    }

    if (level === 21 ){
        pauseSound('boss2bMusic');
        pauseSound('rpSection0Music');
    }

    reveal2bHelperCounter = 0;

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

    if (gameState != "rpSection1"){
        playSound('bossmusic');
        playSound('bossmusicMenuMuffled');
        sounds.bossmusicMenuMuffled.muted = true;
        sounds.bossmusic.muted = false;

    }

    gameState = "running";


    pauseSound('music');
    pauseSound('musicMenuMuffled');
    pauseSound('music2');
    pauseSound('music2MenuMuffled');
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
        //level 2b 
            dig1: new Audio('sounds/dig1.wav'),
            dig2: new Audio('sounds/dig2.wav'),
            smallexplosion: new Audio('sounds/smallexplosion.wav'),
            

            //boss2b
                boss2bExplosion: new Audio('sounds/boss2bExplosion.wav'),
                boss2bMusic: new Audio('sounds/5)m.wav'),
                boss2bMusicMenuMuffled: new Audio('sounds/boss2bMusicMenuMuffled.wav'),
                boss2bWoosh: new Audio('sounds/boss2bWoosh.wav'),
                boss2bWoosh2: new Audio('sounds/boss2bWoosh2.wav'),
                boss2bWoosh3: new Audio('sounds/boss2bWoosh3.flac'),
                boss2bDeathCry: new Audio('sounds/boss2bDeathCry.wav'),
                powderFuseTicking: new Audio('sounds/powderFuseTicking.wav'),
        
        //level 2a

            buttonIn: new Audio('sounds/buttonIn.wav'),
            buttonOut: new Audio('sounds/buttonOut.ogg'),
            shadowFreeze: new Audio('sounds/shadowFreeze.wav'),
            shadowUnfreeze: new Audio('sounds/shadowUnfreeze.wav'),
            unlockDoor: new Audio('sounds/unlockDoor.wav'),
            doorLocked: new Audio('sounds/doorLocked.wav'),

        //general
            hit1: new Audio('sounds/hit1.wav'),
            hit2: new Audio('sounds/hit2.wav'),
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
            soldOut: new Audio('sounds/soldOut.wav'),
            playerDied: new Audio('sounds/playerDied.wav'),

        //level music
            music: new Audio('sounds/music.wav'),
            musicMenuMuffled: new Audio('sounds/musicMenuMuffled.wav'),

            musicShopkeep: new Audio('sounds/shopkeep.wav'),
            musicShopkeepAngry: new Audio('sounds/shopkeepAngry.wav'),
            konamiSong: new Audio('sounds/konamiSong.wav'),

            music2: new Audio('sounds/music2.wav'),
            music2MenuMuffled: new Audio('sounds/music2MenuMuffled.wav'),

            music3: new Audio('sounds/music3.wav'),
            music3MenuMuffled: new Audio('sounds/music3MenuMuffled.wav'),

            bossmusic: new Audio('sounds/bossmusic.wav'),
            bossmusicMenuMuffled: new Audio('sounds/bossmusicMenuMuffled.wav'),

            rpSection0Music: new Audio('sounds/rpSection0Music.wav'),
            transitionMusic2b: new Audio('sounds/transition1.wav'),
            transitionMusic2a: new Audio('sounds/transition2.wav'),
        

        //menuSFX
            menuSelect: new Audio('sounds/menuSelect.wav'),
            menuScrollUp: new Audio('sounds/menuScrollUp.wav'),
            menuScrollDown: new Audio('sounds/menuScrollDown.wav'),
            menuOpen: new Audio('sounds/menuOpen.wav'),
            menuClose: new Audio('sounds/menuClose.wav'),

    };
        sounds.music.loop = true;
        sounds.musicMenuMuffled.loop = true;
        sounds.musicMenuMuffled.muted = true;

        sounds.musicShopkeep.loop = true;
        sounds.musicShopkeepAngry.loop = true;
        sounds.konamiSong.loop = true;
        //sounds.musicShopkeepMuffled.loop = true;
        //sounds.musicShopkeepMuffled.muted = true;
        
        sounds.bossmusic.loop = true;
        sounds.bossmusicMenuMuffled.loop = true;
        sounds.bossmusicMenuMuffled.muted = true;

        sounds.music2.loop = true;
        sounds.music2MenuMuffled.loop = true;
        sounds.music2MenuMuffled.muted = true;

        sounds.music3.loop = true;
        sounds.music3MenuMuffled.loop = true;
        sounds.music3MenuMuffled.muted = true;

        sounds.boss2bMusic.loop = true;
        sounds.boss2bMusicMenuMuffled.loop = true;
        sounds.boss2bMusicMenuMuffled.muted = true;


        sounds.rpSection0Music.loop = true;

        sounds.powderFuseTicking.loop = true;

}

function playSound(soundName){                       
    sounds[soundName].currentTime = 0;  
    sounds[soundName].play();
}

function pauseSound(soundName) {
    if (sounds.hasOwnProperty(soundName)) {
        var sound = sounds[soundName];
        if (!sound.paused) {
            sound.currentTime = 0;
            sound.pause();
        }
    }
}

function playTreasureSounds(){
    if (Math.random() > .5){
        playSound("treasure");
    }else {
        playSound("treasure2");
    }
};

function menuMuffledSound(){
        sounds.musicMenuMuffled.muted = false;
        sounds.music.muted = true;

        sounds.bossmusicMenuMuffled.muted = false;
        sounds.bossmusic.muted = true;

        sounds.music2MenuMuffled.muted = false;
        sounds.music2.muted = true;
   
        /*sounds.music3MenuMuffled.muted = false;
        sounds.music3.muted = true;*/
   
    
}

function menuUnMuffledSound(){
    
        sounds.musicMenuMuffled.muted = true;
        sounds.music.muted = false;
    
        sounds.bossmusicMenuMuffled.muted = true;
        sounds.bossmusic.muted = false;
    
        sounds.music2MenuMuffled.muted = true;
        sounds.music2.muted = false;
    
        /*sounds.music3MenuMuffled.muted = false;
        sounds.music3.muted = true;*/
}

function pauseLevelAppropriateMusic(){
    if(level <= 5){
        pauseSound('music');
        pauseSound('musicMenuMuffled');
    }else if(level === 6){
        pauseSound('bossmusic');
        pauseSound('bossmusicMuffled');
    }else if(level >= 7 && level < 12){
        pauseSound('music2');
        pauseSound('music2MenuMuffled');
    }else if(level >= 13 && level <= 20){
        pauseSound('music2');
        pauseSound('music3');
        //pauseSound('music3MenuMuffled');
    }
 
}

function pauseAllMusic(){
        pauseSound('music');
        pauseSound('musicMenuMuffled');
    
        pauseSound('bossmusic');
        pauseSound('bossmusicMuffled');

        pauseSound('music2');
        pauseSound('music2MenuMuffled');

        pauseSound('music3');
        //pauseSound('music3MenuMuffled');
}

function playLevelAppropriateMusic(){
    if(level <= 5){
        playSound('music');
        playSound('musicMenuMuffled');
    }else if(level === 6){
        playSound('bossmusic');
        playSound('bossmusicMuffled');
    }else if(level >= 7 && level <= 12){
        
        playSound('music2');
        playSound('music2MenuMuffled');
    }else if(level > 13 && level <= 20){
        playSound('music3');
        //playSound('music3MenuMuffled');
    }
 
}

init();


