gamepadConnected = false;
moonShoesController = false;

Controller.search({
    settings: {
        useAnalogAsDpad: "both"
    }
});

window.addEventListener('gc.controller.found', function(event) {
    var controller = event.detail.controller;
    console.log("Controller found at index " + controller.index + ".");
    console.log("'" + controller.name + "' is ready!");
    gamepadConnected = true;
}, false);

window.addEventListener('gc.controller.lost', function(event) {
    console.log("The controller at index " + event.detail.index + " has been disconnected.");
    console.log(Controller.getController(0));
    gamepadConnected = false;
}, false);



var controllerA = Controller.getController(0);

if (Controller.supported) {
    Controller.search();
} else {
    // Fallback...
}


    var controller = Controller.getController(0);

    window.addEventListener('gc.button.press', function(event) {
        console.log(event.detail);
    
        if(gameState == "title"){                              
            animatingTitle = false;
            gameState = "rpSection0";
            showRpSection0();                    
        }else if(gameState === "rpSection0"){
            animating = false;
            gameState = "running";
            startGame();              
        }else if(gameState === "rpSection1"){
            animatingSection1 = false;
            startBossLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
            section1Number = 0;
        }else if(gameState === "rpSection2"){
            if(event.detail.name === "DPAD_LEFT" && moonShoes === false){
                moonShoes = true;
                cancelAnimationFrame(myReq);
                gameState = "rpSection3";
                showRpSection3();
                pauseSound('music');
                pauseSound('musicMenuMuffled'); 
                pauseSound('bossmusic');
            }
            if(event.detail.name === "DPAD_RIGHT" && eaterSoul === false){
                eaterSoul = true;
                cancelAnimationFrame(myReq);
                gameState = "rpSection4"
                showRpSection4();
                pauseSound('music');
                pauseSound('musicMenuMuffled'); 
                pauseSound('bossmusic');
            } 
        }else if(gameState === "rpSection3"){
            ctx.shadowBlur = 0;
            animatingMutationSelection1 = false;
            cancelAnimationFrame(myReq);
            pauseSound('transitionMusic2a');
            ctx.restore();
            startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
        }else if(gameState === "rpSection4"){
            ctx.shadowBlur = 0;
            animatingMutationSelection1 = false;
            cancelAnimationFrame(myReq);
            pauseSound('transitionMusic2b');
            playSound('music3');
            playSound('music3MenuMuffled');
            level = 14;
            ctx.restore();
            startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
        }else if(gameState === "rpSection5"){
            animatinglevel2aCutscene = false;
            cancelAnimationFrame(myReq);
            startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
        }else if(gameState === "rpSection6"){
            animatingCutscene1 = false;
            cancelAnimationFrame(myReq);
            ctx.shadowBlur = 0;
            pauseSound('rpSection0Music'); 
            startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
        }else if(gameState === "interactiveSection1"){
            if(event.detail.name === "DPAD_DOWN"){
                interactiveX1 -= 55;
                console.log(interactiveX1);
                showInteractiveSection1(); 
            }
            if(event.detail.name === "DPAD_UP"){
                interactiveX1 += 55;
                console.log(interactiveX1);
                showInteractiveSection1(); 
            }
            if(event.detail.name === "DPAD_RIGHT"){
                interactiveY1 += 89;
                console.log(interactiveY1);
                showInteractiveSection1(); 
            }
            if(event.detail.name === "DPAD_LEFT"){
                interactiveY1 -= 89;
                console.log(interactiveY1);
                showInteractiveSection1(); 
            }
            if(event.detail.name === "SELECT" && interactiveY1 === 89 && interactiveX1 === 55){
                showInteractiveSection2();
            }  
        }else if(gameState == "dead"){                             
            showTitle();
            pauseAllMusic(); 
        }else if(gameState === "running"){
            if(animatingLevel2aTooltip === true){
                animatingLevel2aTooltip = false;
                cancelAnimationFrame(myReq);
                sounds.music2.muted = false;
                return;                
            }

            if (showOptions === true){
                if (event.detail.name === "DPAD_DOWN"){
                    playSound('menuScrollDown');
                    optionsSelector += 1;
                    console.log(optionsSelector);
                }else if(event.detail.name === "DPAD_UP"){
                    playSound('menuScrollUp');
                    optionsSelector -= 1;
                    console.log(optionsSelector);
                }

                if(event.detail.name === "FACE_1" && optionsSelector === 0){
                    playSound('menuSelect');
                    showOptions = false;
                    showInventory = true;
                    
                    showInventoryMenu();

                }
                if(event.detail.name === "FACE_1" && optionsSelector === 1){
                    playSound('menuSelect');
                    showOptions = false;
                    showDevtools = true;
                    devtoolsSelectorY = 0;
                    showDevtoolsMenu();

                }else if(event.detail.name === "FACE_1" && optionsSelector === 2){
                    playSound('menuSelect');
                    showOptions = false;
                    showGraphics = true;
                    showGraphicsMenu();
                }else if(event.detail.name === "FACE_1" && optionsSelector === 3){
                    playSound('menuClose');
                    sounds.musicMenuMuffled.muted = true;
                    sounds.music.muted = false;

                    showOptions = false;
                    optionsSelector = 3;

                    cancelAnimationFrame(myReq);
                }

                if(event.detail.name === "START" || event.detail.name === "FACE_2"){
                    showOptions = false;
                    cancelAnimationFrame(myReq);
                    optionsSelector = 0;
                }


                //allowing continuous scrolling through top/bottom
                if (optionsSelector > 3){
                    optionsSelector = -1;
                }else if(optionsSelector < -1){
                    optionsSelector = 3;
                }

                return;    
            }

            if (showDevtools === true){

                if (event.detail.name === "FACE_1" && devtoolsSelectorY === 1){

                    if (level <= 5){
                        playSound('menuSelect');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
                        sounds.musicMenuMuffled.muted = true;
                        sounds.music.muted = false;

                        startLevel();
                        playSound("music");
                        playSound("musicMenuMuffled"); 
                
                    }else if (level === 6){
                        playSound('menuSelect');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
                        startBossLevel();

                        
                    }else if(level >= 7 && level <= 13){
                        playSound('menuSelect');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
                        startLevel();

                        pauseSound('music');
                        pauseSound('musicMenuMuffled');
                        pauseSound('music3');
                        pauseSound('music3MenuMuffled');
                        playSound("music2");
                        playSound("musicMenu2Muffled");
                        sounds.music2MenuMuffled.muted = true;
                        sounds.music2.muted = false;
                    }else if(level >= 14 && level <= 19){
                        playSound('menuSelect');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
                        startLevel();
                        sounds.music3MenuMuffled.muted = true;
                        sounds.music3.muted = false;
                        playSound('music3');
                        playSound('music3MenuMuffled');
                    }else if(level === 20){
                        playSound('menuSelect');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
                        startLevel();
                        pauseSound('music');
                        pauseSound('musicMenuMuffled');
                        pauseSound('music3');
                        pauseSound('music3MenuMuffled');

                        playSound('boss2bMusic');
                        playSound('boss2bMusicMenuMuffled');
                    }else {
                        playSound('menuSelect');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
                        startLevel();
                        sounds.music2MenuMuffled.muted = true;
                        sounds.music2.muted = false;
                    }
                    player.hp = level + 3;
                }

                console.log('showingDevtools');
                if (event.detail.name === "START" || event.detail.name === "FACE_2"){
                    playSound('menuOpen');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
    
    
                        showOptions = true;
                        optionsSelector = 1;
                        showOptionsMenu();
                }

                if(event.detail.name === "DPAD_UP"){
                    playSound('menuScrollUp');
                    devtoolsSelectorY -= 1;
                }
                if(event.detail.name === "DPAD_LEFT"){
                    if (devtoolsSelectorY === 0){
                        level -= 1;
                        if (level < 1){
                            level = numLevels;
                        }
                    }
                    playSound('menuScrollDown');
                    //graphicsSelector -= 1;
                }
                if(event.detail.name === "DPAD_DOWN"){
                    playSound('menuScrollDown');
                    devtoolsSelectorY += 1;
                }
                if(event.detail.name === "DPAD_RIGHT"){
                    if (devtoolsSelectorY === 0){
                        level += 1;
                        if (level > numLevels){
                            level = 1
                        }
                    }
                    playSound('menuScrollUp');
                    //graphicsSelector += 1;
                }

                if (devtoolsSelectorY > 1){
                    devtoolsSelectorY = 0;
                }else if(devtoolsSelectorY < 0){
                    devtoolsSelectorY = 1;
                }

                return;
            } 

            if (showGraphics === true){
                if (event.detail.name === "START" || event.detail.name === "FACE_1"){
                    playSound('menuSelect');
                    showGraphics = false;
                    cancelAnimationFrame(myReq);

                    showOptions = true;
                    optionsSelector = 2;
                    showOptionsMenu();
                }
                if(event.detail.name === "DPAD_RIGHT" || event.detail.name === "DPAD_UP"){
                    playSound('menuScrollUp');
                    graphicsSelector += 1;
                }
                if(event.detail.name === "DPAD_LEFT" || event.detail.name === "DPAD_DOWN"){
                    playSound('menuScrollDown');
                    graphicsSelector -= 1;
                }
                console.log(graphicsSelector);
                //allowing continuous scrolling through left/right
                if (graphicsSelector > 1){
                    graphicsSelector = 0;
                }else if(graphicsSelector < 0){
                    graphicsSelector = 1;
                }

                if(event.detail.name === "START" || event.detail.name === "FACE_2"){
                    playSound('menuOpen');
                        showGraphics = false;
                        cancelAnimationFrame(myReq);
    
                        showOptions = true;
                        optionsSelector = 2;
                        showOptionsMenu();
                }
                console.log(graphicsSelector);
                return;
            }

            if(showInventory === true){

                if(event.detail.name === "DPAD_UP"){
                    playSound('menuScrollDown');
                    inventorySelector -= 1;
                }

                if(event.detail.name === "DPAD_DOWN"){
                    playSound('menuScrollDown');
                    inventorySelector += 1;
                }

                if (inventorySelector > 3){
                    inventorySelector = 0;
                }else if(inventorySelector < 0){
                    inventorySelector = 3;
                }

                if (event.detail.name === "FACE_1"){
                    playSound('menuSelect');
                    if(inventorySelector === 0){
                        player.equipSword(0);
                    }else if(inventorySelector === 1){
                        player.equipArmor(0);
                    }else if(inventorySelector === 2){
                        playSound('menuOpen');
                        showInventory = false;
                        cancelAnimationFrame(myReq);
                        optionsSelector = 0;    
                        showOptions = true;
                        optionsSelector = 0;
                        showOptionsMenu();
                    }else if(inventorySelector === 3){
                        playSound('menuOpen');
                        showInventory = false;
                        cancelAnimationFrame(myReq);
                        optionsSelector = 0;    
                    }

                }
                

                if(event.detail.name === "START" || event.detail.name === "FACE_2"){
                        playSound('menuOpen');
                        showInventory = false;
                        cancelAnimationFrame(myReq);
                        optionsSelector = 0;
                }

                return;
            }
            
            if (moonShoesController === false){
                if (event.detail.name === "DPAD_DOWN"){
                    pY = 1;
                    pX = 0;
                    playerDirection = "down";
                    player.tryMove(0, 1);
                    //console.log(pY);
                }else if(event.detail.name === "DPAD_UP"){
                    pY = -1;
                    pX = 0;
                    playerDirection = "up";
                    player.tryMove(0, -1);
                    //console.log(pY); 
                }else if(event.detail.name === "DPAD_RIGHT"){
                    pY = 0;
                    pX = 1;
                    playerDirection = "right";
                    player.tryMove(1, 0);
                    //console.log(pX);  
                }else if(event.detail.name === "DPAD_LEFT"){
                    pY = 0;
                    pX = -1;
                    playerDirection = "left";
                    player.tryMove(-1, 0);
                    //console.log(pX);    
                }    
            }else if (moonShoesController === true){
                if (event.detail.name === "DPAD_DOWN"){
                    player.tryMove(0, 2);
                    playerDirection = "down"; 
                }else if(event.detail.name === "DPAD_UP"){
                    player.tryMove(0, -2);
                    playerDirection = "up";    
                }else if(event.detail.name === "DPAD_RIGHT"){
                    player.tryMove(2, 0)
                    playerDirection = "right"; 
                }else if(event.detail.name === "DPAD_LEFT"){
                    player.tryMove(-2, 0)
                    playerDirection = "left"; 
                }
            }

            if (event.detail.name === "LEFT_ANALOG_BUTTON" && eaterSoul === true){
                if (eatsWalls === true){
                    eatsWalls = false;
                    return;
                }else {
                    eatsWalls = true;  
                }
            }

            if (event.detail.name === "RIGHT_ANALOG_BUTTON" && moonShoes === true){
                console.log(moonShoesController);
                if (moonShoesController === false ){
                    moonShoesController = true;
                }else if (moonShoesController === true){
                    moonShoesController = false;
                }
            }

            if(event.detail.name === "FACE_1" && readyToExit === true){
                welldepleted = false  
                if(level === numLevels){
                    addScore(score, true); 
                    showTitle();
                }else if (level === 3){
                    currentKonamiKey = 0;
                    level = -777
                    startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
                    playSound("newLevel");
                    pauseSound("music");
                    playSound("musicShopkeep");
                }else if (level === -777){
                    level = 4
                    startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
                    pauseSound("musicShopkeep");
                    pauseSound("musicShopkeepAngry");
                    pauseSound("konamiSong");
                    playSound("newLevel"); 
                    playSound('music');
                }else if(level === 5){
                    showRpSection1();
                    level++;
                    playSound("newLevel");  
                }else if (level === 6){
                    animatingMutationSelection1 = true;
                    playSound("newLevel");
                    showRpSection2();
                    console.log('why ');
                    level += 1
                }else if(level === 7){
                    if(unlockDoor0 === true){
                        playSound("newLevel");
                        level++;
                        startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);    
                    }else {
                        playSound("doorLocked");
                        return;
                    }
                }else if(level === 8 || level === 10 || level === 11 || level === 12){
                    if (unlockDoor0 === true && unlockDoor1 === true){
                        if(level === 12){
                            playSound("newLevel");
                            level++;
                            showRpSection5();
                        }else{
                            playSound("newLevel");
                            level++;
                        startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);    
                        }     
                    }else {
                        playSound("doorLocked");
                        return;
                    }
                }else if (level === 13){
                    level = 21;
                    playSound("newLevel");
                    startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
                }else if(level === 19){
                    playSound("newLevel");
                    showRpSection6();    
                }else if(level === 20){
                    animatingMutationSelection1 = true;
                    showRpSection2();
                    playSound("newLevel");
                    pauseSound('boss2bMusic');

                }else if(level === 21){
                    showRpSectionFinal();
                    playSound("newLevel");
                    console.log('should be final cutscene here')
                    return;
                }else {
                    playSound("newLevel");
                    level++;
                    console.log("the culprit")
                    startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
                }
            }

            if(event.detail.name === "FACE_1" && readyToExit != true && readyToDrink != true &&readyToDamage2aBoss != true){
                if (level > 6 && level <= 13){
                    if(canPause2a === true){
                        monster2aPaused = true;
                        canPause2a = false;
                        playSound('shadowFreeze');    
                    }else {
                        monster2aPaused = false;
                        canPause2a = true;
                        playSound('shadowUnfreeze');          
                    }
                }
            }

            if(event.detail.name === "FACE_1" && readyToDrink === true){
                playSound("well");
                welldepleted = true;
                readyToDrink = false;
                if(player.hp === maxHp){
                    score += 6;
                    if(numSpells < 6){
                        numSpells += 1;
                        player.addSpell();
                        numSpells += 1;
                        player.addSpell();
                    }
                }else{
                    player.hp += 6;
                    score += 3;
                    if(numSpells < 6){
                        numSpells += 1;
                        player.addSpell();
                    }
                }
                    for(let i=1;i<numTiles-1;i++){
                        let findwell = tiles[i].findIndex((tile) => tile instanceof Well);
                        console.log(findwell);
                    if (findwell !== -1){
                            let tile = getTile(i, findwell);
                            tile.replace(EmptyWell);
                    }
                }
            }

            if(event.detail.name === "FACE_1" && readyToMutate === true){
                playSound("well");
                mutatedepleted = true;
                readyToMutate = false;
                moonShoes = true;
                    for(let i=1;i<numTiles-1;i++){
                        let findmutate = tiles[i].findIndex((tile) => tile instanceof Mutation1);
                        console.log(findmutate);
                    if (findmutate !== -1){
                            let tile = getTile(i, findmutate);
                            tile.replace(MutateFloor);
                    }
                }
            }
            
            if(event.detail.name === "FACE_1" && boss2bButtonRPushed === true && boss2bBombable === true && boss2bButtonRCooldown === 0 && reveal2bHelper === true){
                boss2bHP -= 8;
                boss2bHPCorrection +=8;
                    shakeAmount = 10;
                    screenshake();
                boss2bDamageAnimation = 34;
                drawBoss2bDamageAnimation();

                boss2bButtonRCooldown = 144;
                playSound('boss2bExplosion');
            }else if (event.detail.name === "FACE_1" && level === 20 && boss2bButtonRPushed === true && boss2bBombable === false){
                playSound('doorLocked');
            }

            if(event.detail.name === "FACE_1" && level === 21){
                if (readyToTriggerTopBot === true && topBotActivated === false && topBotSlain != true && score >= 6){
                    console.log('top triggered')
                    topBotActivated = true;
                    greenLightTileActivated = true;
                    redLightTileActivated = false;
                    tiles[4][1] = new Floor(4, 1);
                    botSavedOrKilled += 1;
                    score -= 6;
                }
                if(readyToTriggerBottomBot === true && bottomBotActivated === false && botBotSlain != true && score >= 12){
                    console.log('bottom triggered')
                    bottomBotActivated = true;
                    greenLightTileActivated = true;
                    redLightTileActivated = false;
                    tiles[4][7] = new Floor(4, 7);
                    botSavedOrKilled += 1;
                    score -= 12;
                }
                if(readyToTriggerRightBot === true && rightBotActivated === false && rightBotSlain != true && eaterSoul === true){
                    console.log('right triggered')
                    rightBotActivated = true;
                    greenLightTileActivated = true;
                    redLightTileActivated = false;
                    tiles[7][4] = new Floor(7, 4);
                    botSavedOrKilled += 1;
                    eaterSoul = false;
                }
                if(readyToTriggerLeftBot === true && leftBotActivated === false && leftBotSlain != true && moonShoes === true){
                    console.log('left triggered')
                    leftBotActivated = true;
                    greenLightTileActivated = true;
                    redLightTileActivated = false;
                    tiles[1][4] = new Floor(1, 4);
                    botSavedOrKilled += 1;
                    moonShoes = false;
                }

                if (gameState === "rpSectionfinal"){
                    cancelAnimationFrame(myReq);
                    addScore(score, true); 
                    showTitle();
                    readyToTriggerTopBot = false;
                    readyToTriggerRightBot = false;
                    readyToTriggerBottomBot = false;
                    readyToTriggerLeftBot = false;

                }
            }

            if(event.detail.name === "FACE_1" && level === -777 && shopkeepHostile === false){

                //HP purchase Trigger
                if(readyToBuyHP6 === true){
                    if (score >= 6){
                        score -= 6
                        player.hp += 6
                        playSound("well");
                    }else{
                        playSound("soldOut"); 
                    }
                }
                //Sword 1/2/X purchase trigger
                else if (readyToBuySwordUpgrade === true && numSword === 0){
                    if (score >= 6){
                        score -= 6
                        numSword +=1;
                        player.addSword();
                        playSound("pickup_sword");
                        this.tier1Sword = false;    
                    }else{
                        playSound("soldOut"); 
                    }           
                }
                else if (readyToBuySwordUpgrade === true && numSword === 1 && weaponUpgraded != true){
                    if (score >= 12){
                        score -= 12
                        weaponUpgraded = true;
                        playSound("pickup_sword");
                            if (tier1SwordEquipped === true){
                                player.baseAttack = 5;
                            }   
                    }else{
                        playSound("soldOut"); 
                    }    
                }else if(readyToBuySwordUpgrade === true && weaponUpgraded === true){
                    playSound("soldOut");
                }
                //Armor 1/2/X purchase trigger
                else if (readyToBuyArmorUpgrade === true && numArmor === 0){
                    if (score >= 6){
                        score -= 6
                        numArmor += 1;
                        player.addArmor();
                        playSound("pickup_armor");
                        this.tier1Armor = false;
                    }else {
                        playSound('soldOut');
                    }
                }else if (readyToBuyArmorUpgrade === true && numArmor === 1 && armorUpgraded != true){
                    if (score >= 12){
                        score -= 12;
                        armorUpgraded = true;
                        playSound("pickup_armor");
                        if (tier1ArmorEquipped === true){
                                player.damageReduction = 3
                            }
                    }else {
                        playSound('soldOut');
                    }

                }else if(readyToBuyArmorUpgrade === true && armorUpgraded === true){
                    playSound("soldOut");
                }
                //talking to shopkeep dialog handler, counts from 0 up to 8, then resets.
                //If konami Code is activated, it counts from -1 down to -6, then resets.
                else if (readyToTalkToShopKeeper === true){
                    playSound('buttonOut');
                    if (konamiActivated === false){
                        shopKeepDialogIndicator += 1;
                    }else if (konamiActivated === true){
                        shopKeepDialogIndicator -= 1
                    }

                    if (shopKeepDialogIndicator >= 8){
                        shopKeepDialogIndicator = 0;
                    }
                    if (shopKeepDialogIndicator <= -6){
                        shopKeepDialogIndicator = -1
                    }
                }
            }

            if(event.detail.name === "LEFT_SHOULDER_BOTTOM"){
                player.castSpell(0);
            }else if(event.detail.name === "RIGHT_SHOULDER_BOTTOM"){
                player.castSpell(1);
            }else if(event.detail.name === "LEFT_SHOULDER"){
                player.castSpell(2);
            }else if(event.detail.name === "RIGHT_SHOULDER"){
                player.castSpell(3);
            }else if(event.detail.name === "FACE_3"){
                player.castSpell(4);
            }else if(event.detail.name === "FACE_4"){
                player.castSpell(5);
            }else if(event.detail.name === "FACE_2"){
                tick();
            }

        
            if(event.detail.name === "START" && gameState === "running" && animatingLevel2aTooltip != true){
                console.log('menu should be closed')
                if(showOptions === false && showGraphics === false && showDevtools === false && showInventory === false){
                        playSound('menuOpen');
                        sounds.musicMenuMuffled.muted = false;
                        sounds.music2MenuMuffled.muted = false;
                        sounds.bossmusicMenuMuffled.muted = false;
                        sounds.music3MenuMuffled.muted = false;
                        
    
                        sounds.music.muted = true;
                        sounds.music2.muted = true;
                        sounds.bossmusic.muted = true;
                        sounds.music3.muted = true;
                        
    
                        if (level === 20){
                            sounds.boss2bMusicMenuMuffled.muted = false;
                            sounds.boss2bMusic.muted = true;
                            alienFloaterX = 10000;
                            alienFloaterY = 10000;
                        }
    
                        showOptions = true;
                        showOptionsMenu();
                }else if(showGraphics === true){
                        playSound('menuOpen');
                        showGraphics = false;
                        cancelAnimationFrame(myReq);
    
                        showOptions = true;
                        optionsSelector = 2;
                        showOptionsMenu();
                }else if(showDevtools === true){
                        playSound('menuOpen');
                        showDevtools = false;
                        cancelAnimationFrame(myReq);
    
    
                        showOptions = true;
                        optionsSelector = 1;
                        showOptionsMenu();
    
                }else if(showInventory === true){
                        playSound('menuOpen');
                        showInventory = false;
                        cancelAnimationFrame(myReq);
                        optionsSelector = 0;
                }else if(showOptions === true){
                        console.log('menu should be closed')
                        showOptions = false;
    
                        cancelAnimationFrame(myReq);
                }else {
                        playSound('menuClose');
                        sounds.musicMenuMuffled.muted = true;
                        sounds.music2MenuMuffled.muted = true;
                        sounds.bossmusicMenuMuffled.muted = true;
                        sounds.music3MenuMuffled.muted = true;
                        sounds.boss2bMusicMenuMuffled.muted = true;
    
                        sounds.music.muted = false;
                        sounds.music2.muted = false;
                        sounds.bossmusic.muted = false;
                        sounds.music3.muted = false;
                        sounds.boss2bMusic.muted = false;
    
                        if (level === 20){
                            alienFloaterX = 160;
                            alienFloaterY = 160;
                            alienFloaterStatus = 'goingToB'
                        }
    
    
    
                        showOptions = false;
    
                        cancelAnimationFrame(myReq);
                    }

    
                    console.log(showOptions);
                }
             
        }
    }, false);