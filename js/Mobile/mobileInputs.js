

const menuButtons = document.querySelectorAll('.menuButton');
let buttonValue = undefined;
let controllerMoonShoes = false;

const toggleButton = document.getElementById("toggle-button");
const buttonContainer = document.getElementById("button-container-1");

toggleButton.addEventListener("click", function() {
    if (buttonContainer.style.display === "none") {
      buttonContainer.style.display = "flex";
    } else {
      buttonContainer.style.display = "none";
    }
  });

menuButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {


    buttonValue = event.target.value;
    console.log(buttonValue);

    if (buttonValue=="k" && eaterSoul === true){
        if (eatsWalls === true){
            eatsWalls = false;
            console.log(eatsWalls);
        }else {
            eatsWalls = true;  
            console.log(eatsWalls);
        }
    }
    
    if (buttonValue=="l" && moonShoes === true){
        console.log(moonShoesController);
        if (moonShoesController === false ){
            moonShoesController = true;
        }else if (moonShoesController === true){
            moonShoesController = false;
        }
    }

    function showTitle(){                                          
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        animatingTitle = true;
        gameState = "title";

        drawTitleBackdrop();
        pauseSound('music3');
        pauseSound('boss2bMusic');

    }
    if(gameState == "title"){
        topBotActivated = false;
        rightBotActivated = false;
        leftBotActivated = false;
        bottomBotActivated = false; 

        animatingTitle = false;
        gameState = "rpSection0";
        showRpSection0();                              
    }else if(gameState === "rpSection0"){
        animating = false;
        gameState = "running";
        pauseSound('rpSection0Music');
        startGame();              
    }else if(gameState === "rpSection1"){
        animatingSection1 = false;
        startBossLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
        section1Number = 0;
    }else if(gameState === "rpSection2"){
        if(buttonValue=="1" && moonShoes === false){
            moonShoes = true;
            cancelAnimationFrame(myReq);
            gameState = "rpSection3";
            showRpSection3();
            pauseSound('music');
            pauseSound('musicMenuMuffled'); 
            pauseSound('bossmusic');
        }
        if(buttonValue=="2" && eaterSoul === false){
            eaterSoul = true;
            cancelAnimationFrame(myReq);
            gameState = "rpSection4"
            showRpSection4();
            pauseSound('music');
            pauseSound('musicMenuMuffled'); 
            pauseSound('bossmusic');
        } 
        if(buttonValue=="3"){
            //show lab animation
            //take me to final level
            cancelAnimationFrame(myReq);
            gameState = "running"
            ctx.restore();
            level = 21
            pauseSound('rpSection0Music');
            startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
            
        }
    }else if(gameState === "rpSection3"){
        ctx.shadowBlur = 0;
        animatingMutationSelection1 = false;
        cancelAnimationFrame(myReq);
        pauseSound('transitionMusic2a');
        ctx.restore();
        if (level === 20) {
            level = 7;
        }
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
        pauseSound('rpSection0Music');
    }else if(gameState === "rpSection6"){
        animatingCutscene1 = false;
        cancelAnimationFrame(myReq);
        ctx.shadowBlur = 0;
        pauseSound('rpSection0Music'); 
        startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
    }else if(gameState === "interactiveSection1"){
        if(buttonValue=="w"){
            interactiveX1 -= 55;
            console.log(interactiveX1);
            showInteractiveSection1(); 
        }
        if(buttonValue=="s"){
            interactiveX1 += 55;
            console.log(interactiveX1);
            showInteractiveSection1(); 
        }
        if(buttonValue=="d"){
            interactiveY1 += 89;
            console.log(interactiveY1);
            showInteractiveSection1(); 
        }
        if(buttonValue=="a"){
            interactiveY1 -= 89;
            console.log(interactiveY1);
            showInteractiveSection1(); 
        }
        if(buttonValue=="Enter" && interactiveY1 === 89 && interactiveX1 === 55){
            showInteractiveSection2();
        }
    }else if(gameState == "dead"){       
        showTitle();
        pauseAllMusic();                                      
    }else if(gameState == "running"){
        if(animatingLevel2aTooltip === true){
                animatingLevel2aTooltip = false;
                cancelAnimationFrame(myReq);
                ctx.shadowBlur = 0;
                sounds.music2.muted = false;
                return;                
        }

        if (showOptions === true){
            if (buttonValue=="s"){
                playSound('menuScrollDown');
                optionsSelector += 1;
                console.log(optionsSelector);
            }else if(buttonValue=="w"){
                playSound('menuScrollUp');
                optionsSelector -= 1;
                console.log(optionsSelector);
            }

            if(buttonValue=="Enter" && optionsSelector === 0){
                playSound('menuSelect');
                showOptions = false;
                showInventory = true;
                
                showInventoryMenu();

            }
            if(buttonValue=="Enter" && optionsSelector === 1){
                playSound('menuSelect');
                showOptions = false;
                showDevtools = true;
                devtoolsSelectorY = 0;
                showDevtoolsMenu();

            }else if(buttonValue=="Enter" && optionsSelector === 2){
                playSound('menuSelect');
                showOptions = false;
                showGraphics = true;
                showGraphicsMenu();
            }else if(buttonValue=="Enter" && optionsSelector === 3){
                playSound('menuClose');
                sounds.musicMenuMuffled.muted = true;
                sounds.music.muted = false;

                showOptions = false;

                cancelAnimationFrame(myReq);
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

            if (event.key === "Enter" && devtoolsSelectorY === 1){



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

                    
                }else if(level >= 7 && level < 13){
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
                }else if(level === 13){
                    playSound('menuSelect');
                    showDevtools = false;
                    cancelAnimationFrame(myReq);
                    startLevel();

                    pauseSound('music');
                    pauseSound('musicMenuMuffled');
                    pauseSound('music3');
                    pauseSound('music3MenuMuffled');
                    pauseSound("music2");
                    pauseSound("musicMenu2Muffled");
                    playSound('bossmusic');
                    playSound('bossmusicMuffled');
                    sounds.bossmusicMuffled.muted = true;
                    sounds.bossmusic.muted = false;
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
            if(buttonValue=="w"){
                playSound('menuScrollUp');
                devtoolsSelectorY -= 1;
            }
            if(buttonValue=="a"){
                if (devtoolsSelectorY === 0){
                    level -= 1;
                    if (level < 1){
                        level = numLevels;
                    }
                }
                playSound('menuScrollDown');
                //graphicsSelector -= 1;
            }
            if(buttonValue=="s"){
                playSound('menuScrollDown');
                devtoolsSelectorY += 1;
            }
            if(buttonValue=="d"){
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


            if (event.key === "Enter"){
                playSound('menuSelect');
                showGraphics = false;
                cancelAnimationFrame(myReq);

                showOptions = true;
                optionsSelector = 2;
                showOptionsMenu();

            }

            if(buttonValue=="d" || buttonValue=="w"){
                playSound('menuScrollUp');
                graphicsSelector += 1;
            }
            if(buttonValue=="a" || buttonValue=="s"){
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

            console.log(graphicsSelector);

            return;
        }

        if(showInventory === true){

            if(buttonValue=="w"){
                playSound('menuScrollDown');
                inventorySelector -= 1;
            }

            if(buttonValue=="s"){
                playSound('menuScrollDown');
                inventorySelector += 1;
            }

            if (inventorySelector > 3){
                inventorySelector = 0;
            }else if(inventorySelector < 0){
                inventorySelector = 3;
            }

            if (event.key === "Enter"){
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
            

            if(buttonValue === "i"){
                    playSound('menuOpen');
                    showInventory = false;
                    cancelAnimationFrame(myReq);
                    optionsSelector = 0;
            }

            return;
        }

        if(buttonValue === "i"){
            if(showInventory === false && showOptions === false && showDevtools === false && showGraphics === false){
                showInventory = true;
                showInventoryMenu();
            }
        }

        if(buttonValue=="w"){
            if (moonShoesController === false) {
                pY = -1;
                pX = 0;
                playerDirection = "up";
                player.tryMove(0, -1);
                //console.log(pY); 
            }else {
                player.tryMove(0, -2);
                playerDirection = "up";     
            }   
        }
        if(buttonValue=="s"){
            if (moonShoesController === false) {
            pY = 1;
            pX = 0;
            playerDirection = "down";
            player.tryMove(0, 1);
            //console.log(pY);
        }else {
            player.tryMove(0, 2);
            playerDirection = "down";    
        }   
        }
        if(buttonValue=="a"){
            if (moonShoesController === false) {
            pY = 0;
            pX = -1;
            playerDirection = "left";
            player.tryMove(-1, 0);
            //console.log(pX);    
        }else {
            player.tryMove(-2, 0);
            playerDirection = "left";  
        }   
        }
        if(buttonValue=="d"){
            if (moonShoesController === false) {
            pY = 0;
            pX = 1;
            playerDirection = "right";
            player.tryMove(1, 0);
            //console.log(pX);    
        }else {
            player.tryMove(2, 0);
            playerDirection = "right";  
        }   
        }

        if(buttonValue=="f"){
            playerDirection = "down";
            tick();    
        }
        //if(buttonValue=="g") moonShoes = true;

        
        if(buttonValue==="Enter" && readyToExit === true){
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

        //konami code'
        
        const konamiCode = ['w', 'w', 's', 's', 'a', 'd', 'a', 'd', 'b', 'a'] || ['DPAD_UP', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'DPAD_LEFT', 'DPAD_RIGHT', 'FACE_2', 'FACE_1'];
        var currentKonamiKey = 0;

        var keyHandler = function (event) {

            // If the key isn't in the KonamiCode, or isn't the currentKonamiKey in the KonamiCode, reset
            if (konamiCode.indexOf(event.key) < 0 && level === -777 && konamiActivated === false || event.key !== konamiCode[currentKonamiKey] && level === -777 && konamiActivated === false) {
                currentKonamiKey = 0;
                return;
            }

            // Update how much of the KonamiCode is complete
            if (level === -777 && konamiActivated === false){
                currentKonamiKey++;
            }
            

            // If complete, alert and reset
            if (konamiCode.length === currentKonamiKey && level === -777 && konamiActivated === false) {
                currentKonamiKey = 0;
                
                konamiActivated = true;
                console.log('konamiActivated');
                playSound('unlockDoor');
                pauseSound("musicShopkeep");
                playSound("konamiSong");
            }

        };

        // Listen for keydown events
        document.addEventListener('keydown', keyHandler, false);
        


    };

        if(buttonValue==="Enter" && readyToExit != true && readyToDrink != true &&readyToDamage2aBoss != true){
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

        if(buttonValue==="Enter" && readyToDrink === true){
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
                if (findwell !== -1){
                        let tile = getTile(i, findwell);
                        tile.replace(EmptyWell);
                    }
                }
        }

        if(buttonValue==="Enter" && readyToMutate === true){
            if (typeof tiles === 'undefined' || tiles === null){
                return;
            }
            playSound("well");
            mutatedepleted = true;
            readyToMutate = false;
            moonShoes = true;
                for(let i=1;i<numTiles-1;i++){
                    let findmutate = tiles[i].findIndex((tile) => tile instanceof Mutation1);
                if (findmutate !== -1){
                        let tile = getTile(i, findmutate);
                        tile.replace(MutateFloor);
                }
            }
        }    

        if(buttonValue==="Enter" && readyToDamage2aBoss === true){
            console.log('something done');
            readyToDamage2aBoss = false;

            tiles[4][3] = new MutateBossSpecialFloorActivator(4, 3);
            tiles[2][3] = new MutateFloor(2, 3);
            tiles[6][3] = new MutateFloor(6, 3);

            //bottom row buttons
            tiles[1][5] = new MutateFloor(1, 5);
            tiles[3][5] = new MutateFloor(3, 5);
            tiles[5][5] = new MutateFloor(5, 5);
            tiles[7][5] = new MutateFloor(7, 5);
            
        } 

        if(buttonValue>=1 && buttonValue<=6) player.castSpell(buttonValue-1);

        if(buttonValue==7) player.equipSword(0);
        if(buttonValue==8) player.equipArmor(0);

        if(buttonValue=="m"){
            if(soundStopped === false){
                document.getElementById('audioSymbol').src='images/imgX.png';
                pauseSound('music');
                pauseSound('musicMenuMuffled'); 
                soundStopped = true;
            }else if(soundStopped === true){
                document.getElementById('audioSymbol').src='images/img.png';
                playSound('music');
                playSound('musicMenuMuffled');  
                soundStopped = false;
            }
        }

        if(buttonValue=="`"){
            startLevel(Math.min(maxHp, player.hp),undefined, player.baseAttack);
        }

        if(buttonValue=="/"){
            numSpells = 6;
            numSword = 1;
            numArmor = 1;
            player.hp = 12;
            moonShoes = true;
            eaterSoul = true;
        }

        if (level === 20 && buttonValue=="Enter"){
            tick();
        }

        if(buttonValue=="Enter" && boss2bButtonRPushed === true && boss2bBombable === true && boss2bButtonRCooldown === 0 && reveal2bHelper === true){
            boss2bHP -= 8;
            boss2bHPCorrection +=8;
                shakeAmount = 10;
                screenshake();
            boss2bDamageAnimation = 34;
            drawBoss2bDamageAnimation();

            boss2bButtonRCooldown = 144;
            playSound('boss2bExplosion');
        }else if (buttonValue=="Enter" && level === 20 && boss2bButtonRPushed === true && boss2bBombable === false){
            playSound('doorLocked');
        }

        //add this line and below to controller function
        if(buttonValue=="Enter" && level === 21){
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

        if(buttonValue=="Enter" && level === -777 && shopkeepHostile === false){

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
                Shopkeep.sprite += 1;
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

    })
});





document.addEventListener('keyup', function(event){
        if(event.key === "Escape" && gameState === "running" && animatingLevel2aTooltip != true || event.key === "End" && gameState === "running" && animatingLevel2aTooltip != true){
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
            }
            else {
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
});