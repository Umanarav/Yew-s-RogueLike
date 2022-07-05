gamepadConnected = false;

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
            startGame();                
        }else if(gameState == "dead"){                             
            showTitle();
        }else if(gameState === "running"){
            if (event.detail.name === "DPAD_DOWN"){
                player.tryMove(0, 1); 
            }else if(event.detail.name === "DPAD_UP"){
                player.tryMove(0, -1)
            }else if(event.detail.name === "DPAD_RIGHT"){
                player.tryMove(1, 0)
            }else if(event.detail.name === "DPAD_LEFT"){
                player.tryMove(-1, 0)
            }else if(event.detail.name === "START"){
                tick();
            }else if(event.detail.name === "SELECT" && readyToExit === true){
                playSound("newLevel");
                welldepleted = false
                if(level === numLevels){
                    addScore(score, true); 
                    showTitle();
                }else if(level === 5){
                    level++;
                    startBossLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
                }else{
                    level++;
                    startLevel(Math.min(maxHp, player.hp+1),undefined, player.baseAttack);
                }
            }else if(event.detail.name === "SELECT" && readyToDrink === true){
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
            }else if(event.detail.name === "LEFT_SHOULDER_BOTTOM"){
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