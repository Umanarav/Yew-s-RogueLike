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
        }else if(gameState === "rpSection2"){
            startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);  
        }else if(gameState == "dead"){                             
            showTitle();
        }else if(gameState === "running"){
            if (moonShoesController === false){
                if (event.detail.name === "DPAD_DOWN"){
                    player.tryMove(0, 1); 
                }else if(event.detail.name === "DPAD_UP"){
                    player.tryMove(0, -1)
                }else if(event.detail.name === "DPAD_RIGHT"){
                    player.tryMove(1, 0)
                }else if(event.detail.name === "DPAD_LEFT"){
                    player.tryMove(-1, 0)
                }    
            }else if (moonShoesController === true){
                if (event.detail.name === "DPAD_DOWN"){
                    player.tryMove(0, 2); 
                }else if(event.detail.name === "DPAD_UP"){
                    player.tryMove(0, -2)
                }else if(event.detail.name === "DPAD_RIGHT"){
                    player.tryMove(2, 0)
                }else if(event.detail.name === "DPAD_LEFT"){
                    player.tryMove(-2, 0)
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


            else if(event.detail.name === "START"){
                tick();
            }else if(event.detail.name === "SELECT" && readyToExit === true){
                playSound("newLevel");
                    welldepleted = false  
                if(level === numLevels){
                    addScore(score, true); 
                    showTitle();
                }else if(level === 5){
                    showRpSection1();
                    level++;  
                }else if (level === 7){
                    showRpSection2();
                    level++;
                }

                else{
                    level++;
                    startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
                }
            }

            if(event.detail.name === "SELECT" && readyToDrink === true){
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

            if(event.detail.name === "SELECT" && readyToMutate === true){
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
            }else if(event.detail.name === "FACE_1"){
                player.equipSword(0);
            }else if(event.detail.name === "FACE_2"){
                player.equipArmor(0);
            }
        }
    }, false);