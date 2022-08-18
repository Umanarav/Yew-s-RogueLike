let interactiveX1 = 275;
let interactiveY1 = 712;
let interactiveX2 = 416;
let interactiveY2 = 288;

let interactiveMXX1 = 266;
let interactiveMXY1 = 56;

let descending = true;
let ascending = false;

let trackingRotation = 0

let shrinking = false;
let shrinkingCounter = 0;
let shrinkingNumber = -1;

let rotateClockwise = true;

let myReq;

let animatingMutationSelection1 = false;

let fallingMX01 = true;
let fallingMX01Speed = 0.2746781115879828;
let dWidth = 64;
let dHeight = 64;

let spriteWallPreview;
let spriteFloorPreview;
let previewCounter;

let alienFloaterStatus = 'goingToB';
let alienFloaterX = 160;
let alienFloaterY = 160;
let reveal2bHelperCounter = 0;
let boss2bBombable = false;
let boss2bDamageAnimation = 0;



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
        }, 142.8571428571429);
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


let rpSection1Backdrop = [];

for(let i = 0;i < 114;i += 1){
    rpSection1Backdrop[i] = new Image(); 
}


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
var section1Number = 0;
animating = false;
animatingSection1 = false;

function init() {
    rpSection0Backdrop0.src = 'rpSection0Backdrop/rpSection0Backdrop0.png'
    rpSection0Backdrop1.src = 'rpSection0Backdrop/rpSection0Backdrop1.png'
    rpSection0Backdrop2.src = 'rpSection0Backdrop/rpSection0Backdrop2.png'
    rpSection0Backdrop3.src = 'rpSection0Backdrop/rpSection0Backdrop3.png'
    rpSection0Backdrop4.src = 'rpSection0Backdrop/rpSection0Backdrop4.png'
    rpSection0Backdrop5.src = 'rpSection0Backdrop/rpSection0Backdrop5.png'
    rpSection0Backdrop6.src = 'rpSection0Backdrop/rpSection0Backdrop6.png'



    for(let i = 0; i < 114; i += 1){
        rpSection1Backdrop[i].src = 'rpSection1Backdrop/rpSection1Backdrop' + i + '.png'; 
    }



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

        setTimeout(() => {
            window.requestAnimationFrame(drawRpSection0Backdrop); 
        }, 142.8571428571429);
    }else {
        return;
    }
}

function drawRpSection1Backdrop() {
    if (animatingSection1 === true){
        console.log(section1Number);
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.fillRect(0,0,canvas.width, canvas.height);

        if (section1Number < 113){    
            ctx.drawImage(rpSection1Backdrop[section1Number], 0, 0); 
            section1Number += 1;
        }

        if (section1Number === 113){
            ctx.drawImage(rpSection1Backdrop[113], 0, 0);
            animatingSection1 = false;
        }
        
        setTimeout(() => {
            window.requestAnimationFrame(drawRpSection1Backdrop); 
        }, 150);
        
    }
}

function drawRpSection2Backdrop() {
    
}

function showTitle(){                                          
    ctx.fillStyle = 'rgba(0,0,0,.75)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    animatingTitle = true;
    gameState = "title";

    drawTitleBackdrop();
    pauseSound('music3');

}

function showRpSection0(){                                          
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    animating = true;
    gameState = "rpSection0";
    playSound("rpSection0Music");
    drawRpSection0Backdrop();
    
}

function showRpSection1(){                                          
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    animatingSection1 = true;
    gameState = "rpSection1";
    
    drawRpSection1Backdrop();

    pauseSound('music');
    playSound('bossmusic');
}

function showRpSection2(){                                          
    ctx.fillStyle = 'rgba(0,0,0,.75)';

    ctx.fillRect(0,0,canvas.width, canvas.height);

    gameState = "rpSection2";

    animatingMutationSelection1 = true;

    ctx.save();
    showInteractiveSection2();
    pauseSound('music');
    pauseSound('bossmusic');
    playSound('rpSection0Music');

    previewCounter = 0;

    //text, size, centered, textY, color, textX//

}

function showRpSection3(){    
    //drawfractalanimation
        ctx.fillStyle = 'rgba(0,0,0,.75)';
        ctx.translate(interactiveX2, interactiveY2);
        ctx.rotate((0.0023998277 * trackingRotation) * -1);
        ctx.translate(-interactiveX2, -interactiveY2);

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(0,0,canvas.width, canvas.height);

        gameState = "rpSection3";
        
        showInteractiveSection2();

        fallingMX01Speed = 1;
        trackingRotation = 0;
        previewCounter = 0;
        showMX01EnteringLevel2a();
        pauseSound('rpSection0Music');
        playSound('transitionMusic2a');

        //animatingMutationSelection1 = false;
        //cancelAnimationFrame(myReq);
}

function showRpSection4(){
    //drawfractalanimation2                                          
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.translate(interactiveX2, interactiveY2);
    ctx.rotate((0.0023998277 * trackingRotation) * -1);
    ctx.translate(-interactiveX2, -interactiveY2);

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width, canvas.height);

    gameState = "rpSection4";

    showInteractiveSection2();

    fallingMX01Speed = 1;
    trackingRotation = 0;
    previewCounter = 0;
    showMX01EnteringLevel2a();
    pauseSound('rpSection0Music');
    playSound('transitionMusic2b');

}

function showRpSection5(){
    level = 13;                                         
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    gameState = "rpSection5";

    drawText("mutation X boss fight", 55, false, 377, "white", 144);

}

function showRpSection6(){
    level = 20;                                         
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    gameState = "rpSection6";

    drawText("mutation Y boss fight", 55, false, 377, "white", 144);

}

function showInteractiveSection1(){
    gameState = "interactiveSection1";
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(55,55,55,1)';
    ctx.fillRect(55,55,610, 610);

    ctx.fillStyle = 'rgba(89,89,89,1)';
    ctx.fillRect(55,55,377, 377);

    ctx.fillStyle = 'rgba(144,144,144,1)';
    ctx.fillRect(55,55,233, 233);

    ctx.fillStyle = 'rgba(233,233,233,1)';
    ctx.fillRect(55,55,144, 144);

    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(55,55,89, 89);

    ctx.fillStyle = 'rgba(55,89,144,1)';
    ctx.fillRect(interactiveX1,interactiveX1,interactiveY1, interactiveY1);

    

    if(interactiveX1 === 55){
        X1Color = "yellow"
    }else{
        X1Color = "white"    
    }
    if(interactiveY1 === 89){
        Y1Color = "yellow"
    }else{
        Y1Color = "white"    
    }    

    drawText(""+interactiveX1, 89, false, 420, X1Color, 666);
    drawText(""+interactiveY1, 89, false, 555, Y1Color, 666);

}

function showInteractiveSection2(){
    if (animatingMutationSelection1 === true){
    //gameState = "interactiveSection2";
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#D7B8D9';
    //ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.shadowColor = "black";
    ctx.shadowBlur = 21;

    if (gameState === 'rpSection3'){
        showLevel2Preview();
    }else if (gameState === 'rpSection4'){
        showLevel2bPreview();
    }
    
    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, 233 + shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, 144 + shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, 89 + shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, 55 + shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, 34 + shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, 21 + shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, 13 + shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //ctx.beginPath();
    //ctx.moveTo(interactiveX2, interactiveY2);
    ctx.fillStyle = '#F088F2';
    ctx.shadowBlur = 5;
    //Begin arm 1a
    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, .5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - 3.7795275591 , (1 - shrinkingNumber), 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 2) , 2 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 3) , 3 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 5) , 5 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 8) , 8 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 13) , 13 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 21) , 21 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 34) , 34 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 - (3.7795275591 * 55) , 55 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //Begin arm 1b
    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2, .5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + 3.7795275591 , 1 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 2 - shrinkingNumber) , 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 3 - shrinkingNumber) , 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 5 - shrinkingNumber) , 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 8 - shrinkingNumber) , 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 13 - shrinkingNumber) , 13, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 21 - shrinkingNumber) , 21, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 34 - shrinkingNumber) , 34, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2, interactiveY2 + (3.7795275591 * 55 - shrinkingNumber) , 55, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();


    //begin arm 2a
    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795), interactiveY2 + (2.8346456693) , 1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 2), interactiveY2 + (2.8346456693 * 2  - shrinkingNumber), 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 3), interactiveY2 + (2.8346456693 * 3 - shrinkingNumber) , 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 5), interactiveY2 + (2.8346456693 * 5 - shrinkingNumber) , 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 8), interactiveY2 + (2.8346456693 * 8 - shrinkingNumber) , 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 13), interactiveY2 + (2.8346456693 * 13 - shrinkingNumber) , 13, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 21), interactiveY2 + (2.8346456693 * 21 - shrinkingNumber) , 21, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 34), interactiveY2 + (2.8346456693 * 34 - shrinkingNumber) , 34, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55 - shrinkingNumber) , 55, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //begin arm 2b
    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795), interactiveY2 - (2.8346456693) , 1 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 2), interactiveY2 - (2.8346456693 * 2 - shrinkingNumber), 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 3), interactiveY2 - (2.8346456693 * 3 - shrinkingNumber) , 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 5), interactiveY2 - (2.8346456693 * 5 - shrinkingNumber) , 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 8), interactiveY2 - (2.8346456693 * 8 - shrinkingNumber) , 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 13), interactiveY2 - (2.8346456693 * 13 - shrinkingNumber) , 13, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 21), interactiveY2 - (2.8346456693 * 21 - shrinkingNumber) , 21, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 34), interactiveY2 - (2.8346456693 * 34 - shrinkingNumber) , 34, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (1.8897637795 * 55), interactiveY2 - (2.8346456693 * 55 - shrinkingNumber) , 55, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //begin arm 3a
    ctx.beginPath();
    ctx.arc(interactiveX2 - 3.7795275591, interactiveY2 , 1 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 2), interactiveY2 , 2 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 3), interactiveY2 , 3 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 5), interactiveY2 , 5 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 8), interactiveY2 , 8 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 13), interactiveY2 , 13 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 21), interactiveY2 , 21 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 34), interactiveY2 , 34 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 - (3.7795275591 * 55), interactiveY2 , 55 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //begin arm 3b
    ctx.beginPath();
    ctx.arc(interactiveX2 + 3.7795275591, interactiveY2 , 1 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 2), interactiveY2 , 2 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 3), interactiveY2 , 3 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 5), interactiveY2 , 5 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 8), interactiveY2 , 8 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 13), interactiveY2 , 13 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 21), interactiveY2 , 21 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 34), interactiveY2 , 34 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(interactiveX2 + (3.7795275591 * 55), interactiveY2 , 55 - shrinkingNumber, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    //lines 1a to 2a
    ctx.lineWidth = 0 - (shrinkingNumber) / 2;
    ctx.shadowColor = "black";
    ctx.shadowBlur = 5 - (shrinkingNumber) /2 ;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 1), interactiveY2 + (2.8346456693 * 1));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 1));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 2), interactiveY2 + (2.8346456693 * 2));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 2));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 3), interactiveY2 + (2.8346456693 * 3));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 3));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 5), interactiveY2 + (2.8346456693 * 5));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 5));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 8), interactiveY2 + (2.8346456693 * 8));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 8));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 13), interactiveY2 + (2.8346456693 * 13));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 13));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 21), interactiveY2 + (2.8346456693 * 21));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 21));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 34), interactiveY2 + (2.8346456693 * 34));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 34));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55));
    ctx.stroke();

    //lines 1b to 2b

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 1), interactiveY2 - (2.8346456693 * 1));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 1));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 2), interactiveY2 - (2.8346456693 * 2));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 2));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 3), interactiveY2 - (2.8346456693 * 3));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 3));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 5), interactiveY2 - (2.8346456693 * 5));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 5));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 8), interactiveY2 - (2.8346456693 * 8));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 8));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 13), interactiveY2 - (2.8346456693 * 13));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 13));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 21), interactiveY2 - (2.8346456693 * 21));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 21));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 34), interactiveY2 - (2.8346456693 * 34));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 34));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 55), interactiveY2 - (2.8346456693 * 55));
    ctx.stroke();

    //lines 2a to 3a
    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795), interactiveY2 + (2.8346456693));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 1), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 1), interactiveY2 + (2.8346456693 * 1));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 2), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 2), interactiveY2 + (2.8346456693 * 2));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 3), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 3), interactiveY2 + (2.8346456693 * 3));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 5), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 5), interactiveY2 + (2.8346456693 * 5));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 8), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 8), interactiveY2 + (2.8346456693 * 8));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 13), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 13), interactiveY2 + (2.8346456693 * 13));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 21), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 21), interactiveY2 + (2.8346456693 * 21));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 34), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 34), interactiveY2 + (2.8346456693 * 34));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    //lines 2b to 3b
    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795), interactiveY2 - (2.8346456693));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 1), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 1), interactiveY2 - (2.8346456693 * 1));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 2), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 2), interactiveY2 - (2.8346456693 * 2));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 3), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 3), interactiveY2 - (2.8346456693 * 3));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 5), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 5), interactiveY2 - (2.8346456693 * 5));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 8), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 8), interactiveY2 - (2.8346456693 * 8));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 13), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 13), interactiveY2 - (2.8346456693 * 13));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 21), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 21), interactiveY2 - (2.8346456693 * 21));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 34), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 34), interactiveY2 - (2.8346456693 * 34));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    //lines 3a to 1a
    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 1), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 2));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 2), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 3));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 3), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 5));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 5), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 8));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 8), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 13));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 13), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 21));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 21), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 34));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 34), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 55));
    ctx.stroke();

    //lines 3b to 1b
    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 1), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 2));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 2), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 3));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 3), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 5));
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 5), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 8));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 8), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 13));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 13), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 21));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 21), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 34));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 34), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 55));
    ctx.stroke();

    //lines all around top layer 1a
    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 55));
    ctx.lineTo(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 - (3.7795275591 * 55));
    ctx.stroke();

    //lines all around top layer 1b

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 + (3.7795275591 * 55));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 55), interactiveY2 - (2.8346456693 * 55));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (1.8897637795 * 55), interactiveY2 - (2.8346456693 * 55));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (3.7795275591 * 55), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 55));
    ctx.stroke();

    //lines from 1a
    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 55));
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 55));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 55));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2, interactiveY2 - (3.7795275591 * 55));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 55), interactiveY2 - (2.8346456693 * 55));
    ctx.stroke();

    //lines from 2a
    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55));
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 55));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55));
    ctx.lineTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55));
    ctx.lineTo(interactiveX2 - (1.8897637795 * 55), interactiveY2 - (2.8346456693 * 55));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 + (1.8897637795 * 55), interactiveY2 + (2.8346456693 * 55));
    ctx.lineTo(interactiveX2 + (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    //lines from 3a
    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.lineTo(interactiveX2, interactiveY2 + (3.7795275591 * 55));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.lineTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.lineTo(interactiveX2 - (1.8897637795 * 55), interactiveY2 - (2.8346456693 * 55));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(interactiveX2 - (3.7795275591 * 55), interactiveY2);
    ctx.lineTo(interactiveX2 + (3.7795275591 * 55), interactiveY2);
    ctx.stroke();

    if (interactiveY2 === 275){
        descending = true;
        ascending = false;
    }

    if (descending === true){
        interactiveY2 += 1   
    }

    if (interactiveY2 === 301){
        descending = false;
        ascending = true;
    }

    if (ascending === true){
        interactiveY2 -= 1
  
    }


    if(gameState === 'rpSection2'){   

        if (trackingRotation === -137){
            rotateClockwise = true;
        }
        if (rotateClockwise === true){
            trackingRotation += 1;
            ctx.translate(interactiveX2, interactiveY2);
            ctx.rotate(0.0023998277);
            ctx.translate(-interactiveX2, -interactiveY2);      
        }
        if (trackingRotation === 137){
            rotateClockwise = false;
        }
        if (rotateClockwise === false){
            trackingRotation -= 1;
            ctx.translate(interactiveX2, interactiveY2);
            ctx.rotate(-0.0023998277);
            ctx.translate(-interactiveX2, -interactiveY2);      
        }
    }

        if (shrinking === false){
            shrinkingNumber += -.1375
            shrinkingCounter += 1;
        }

        if (shrinking === true){
            shrinkingNumber += .1375
            shrinkingCounter -= 1;
        }

        if (shrinkingCounter === 21){
            shrinking = true;    
        }

        if (shrinkingCounter === 0){
            shrinking = false;    
        }
    

    if (gameState === 'rpSection2'){
        drawText("press 1 for Moon Shoes", 55 - shrinkingNumber, false, 141 + shrinkingNumber, "black", 89 - shrinkingNumber);
        drawText("press 2 for Eater Soul", 55 + shrinkingNumber, false, 230 - shrinkingNumber, "black", 89 + shrinkingNumber); 
        drawText("press 3 for mutationZ", 55 - shrinkingNumber, false, 374 + shrinkingNumber, "black", 89 - shrinkingNumber);

        drawText("press 1 for Moon Shoes", 55 - shrinkingNumber, false, 144 + shrinkingNumber, "white", 89 - shrinkingNumber);
        drawText("press 2 for Eater Soul", 55 + shrinkingNumber, false, 233 - shrinkingNumber, "white", 89 + shrinkingNumber); 
        drawText("press 3 for mutationZ", 55 - shrinkingNumber, false, 377 + shrinkingNumber, "white", 89 - shrinkingNumber);
    }
    
    myReq = window.requestAnimationFrame(showInteractiveSection2); 
        
    //drawText("Ineractive Section 2", 55, false, 377, "white", 144);
    }else {
        return;
    }
}

function showMX01EnteringLevel2a(){
    if (animatingMutationSelection1 === true){
        ctx2.drawImage(
            spritesheet,
            0*16,
            0,
            16,
            16,
            (interactiveMXX1),
            (interactiveMXY1),
            dWidth,
            dHeight
        );

        trackingRotation += 1;

        ctx2.translate(interactiveX2, interactiveY2);
        ctx2.rotate(-0.0023998277);
        ctx2.translate(-interactiveX2, -interactiveY2);

        if (fallingMX01 = true){
            if (interactiveMXX1 < 416){
                interactiveMXX1 += 1;
                dWidth -= 0.2746781115879828;
            }
            if (interactiveMXY1 < 288)
                interactiveMXY1 += 1;
                if (dHeight > 0){
                    dHeight -= 0.2746781115879828;
                }
        }
 

        //console.log(interactiveMXY1);
        //console.log(dHeight);

        requestAnimationFrame(showMX01EnteringLevel2a);


    }else{
        return;
    }
}

function showLevel2Preview(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if (gameState === 'rpSection4'){
        spriteWallPreview = 36;
        spriteFloorPreview = 35;
    }
    if (gameState === 'rpSection3'){
        spriteWallPreview = 34;
        spriteFloorPreview = 33;
    }

            for(let i = 0;i < 832;i += 64){
                ctx2.drawImage(
                    spritesheet,
                    (spriteWallPreview*(previewCounter/4)),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (i),
                    (0),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    spriteWallPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (i),
                    (512),
                    previewCounter,
                    previewCounter
                );
            }

            for(let i = 0;i < 576;i += 64){
                ctx2.drawImage(
                    spritesheet,
                    spriteWallPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (0),
                    (i),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    spriteWallPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (768),
                    (i),
                    previewCounter,
                    previewCounter
                );
            }

            for(let i = 0;i < 704;i += 64){
                console.log(i)
                ctx2.drawImage(
                    spritesheet,
                    (97 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64),
                    previewCounter,
                    previewCounter
                );

                ctx2.drawImage(
                    spritesheet,
                    (97 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 2),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    (97 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 3),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    (97 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 4),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    (97 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 5),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    (97 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 6),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    (97 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 7),
                    previewCounter,
                    previewCounter
                );

            }

                if (previewCounter < 64){
                    console.log(previewCounter)

                    if (previewCounter <= 9){
                        previewCounter += 4;
                        return;    
                    }else if (previewCounter <= 30){
                        previewCounter += 2;
                        return;    
                    }else if (previewCounter <= 43){
                        previewCounter += 1;
                        return;    
                    }else if (previewCounter <= 51){
                        previewCounter += .5;
                        return;    
                    }else if (previewCounter <= 61){
                        previewCounter += .125;
                        return;    
                    }else if (previewCounter <= 62){
                        previewCounter +=.0625;
                        return;    
                    }else if (previewCounter <= 63){
                        previewCounter +=.03125;
                        return;    
                    }else if (previewCounter <= 64){
                        previewCounter +=.015625;
                        return;    
                    }
                    
                }       
}

function showLevel2bPreview(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    audioContext = new AudioContext()

    if (gameState === 'rpSection4'){
        spriteWallPreview = 36;
        spriteFloorPreview = 35;
    }
    if (gameState === 'rpSection3'){
        spriteWallPreview = 34;
        spriteFloorPreview = 33;
    }

            for(let i = 0;i < 832;i += 64){
                ctx2.drawImage(
                    spritesheet,
                    (100 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (i),
                    (0),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    (100 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (i),
                    (512),
                    previewCounter,
                    previewCounter
                );
            }

            for(let i = 0;i < 576;i += 64){
                ctx2.drawImage(
                    spritesheet,
                    (100 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (0),
                    (i),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    (100 - previewCounter) * 16,
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (768),
                    (i),
                    previewCounter,
                    previewCounter
                );
            }

            for(let i = 0;i < 704;i += 64){
                ctx2.drawImage(
                    spritesheet,
                    spriteFloorPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64),
                    previewCounter,
                    previewCounter
                );

                ctx2.drawImage(
                    spritesheet,
                    spriteFloorPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 2),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    spriteFloorPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 3),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    spriteFloorPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 4),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    spriteFloorPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 5),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    spriteFloorPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 6),
                    previewCounter,
                    previewCounter
                );
                ctx2.drawImage(
                    spritesheet,
                    spriteFloorPreview*(previewCounter/4),
                    0,
                    previewCounter/4,
                    previewCounter/4,
                    (64 + i),
                    (64 * 7),
                    previewCounter,
                    previewCounter
                );

            }

                if (previewCounter < 64){
                    console.log(previewCounter)

                    if (previewCounter <= 9){
                        console.log(Math.floor(Date.now()/1000));
                        previewCounter += 4;
                        if (previewCounter === 1 || previewCounter === 0){
                            console.log(previewCounter);
                        }
                        else if (previewCounter === 2 || previewCounter === 3){
                            console.log(previewCounter);
                        }else if (previewCounter === 3 || previewCounter === 4){
                            console.log(previewCounter);
                        }else if (previewCounter === 8){
                            console.log(previewCounter);
                        }

                        return;    
                    }else if (previewCounter <= 30){
                        previewCounter += 2;
                        if (previewCounter === 12 || previewCounter === 14){

                        }else if (previewCounter === 21 || previewCounter === 22){
                                
                        } 
                        return;    
                    }else if (previewCounter <= 43){
                        previewCounter += 1;
                        if (previewCounter === 34){

                        } 
                        return;    
                    }else if (previewCounter <= 51){
                        previewCounter += .5;
                        
                        return;    
                    }else if (previewCounter <= 61){
                        previewCounter += .125;
                        if (previewCounter === 55){

                        } 
                        return;    
                    }else if (previewCounter <= 62){
                        previewCounter +=.0625;
                        
                        return;    
                    }else if (previewCounter <= 63){
                        previewCounter +=.03125;
                        
                        return;    
                    }else if (previewCounter <= 64){
                        previewCounter +=.015625;
                        if (previewCounter === 63.984375 ){
                            playSynth(0, 1, 0.5);
                            console.log(Math.floor(Date.now()/1000));
                        }
                        return;    
                    }
                    
                }       
}

function drawBoss2bHelper() {
        //console.log(alienFloaterX, 'X');
        //console.log(alienFloaterY, 'Y');

        if (alienFloaterStatus === 'goingToB'){
            alienFloaterX += 0.8;
            alienFloaterY += 2;
            if((alienFloaterY >= 400 || alienFloaterY <= 204)){
                drawBoss2bHelperHighlight();
                if (bossLocation === 1 && alienFloaterY <= 204){
                    boss2bBombable = true;
                }else if(bossLocation === 3 && alienFloaterY >= 400){
                    boss2bBombable = true;
                }
            }else {
                boss2bBombable = false;    
            }
            if (alienFloaterY === 480){
                alienFloaterStatus = 'goingToR';
            }
        }else if (alienFloaterStatus === 'goingToR'){
            alienFloaterX += 0.8;
            alienFloaterY -= 2;
            if(alienFloaterY <= 480 && alienFloaterY >= 414 || alienFloaterY <= 224){
                drawBoss2bHelperHighlight();
                if (bossLocation === 3 && (alienFloaterY <= 480 && alienFloaterY >= 414)){
                    boss2bBombable = true;
                }else if(bossLocation === 2 && alienFloaterY <= 224){
                    boss2bBombable = true;
                }
            }else {
                boss2bBombable = false;    
            }
            if (alienFloaterY === 160){
                alienFloaterStatus = 'goingToL';
            }
        }else if (alienFloaterStatus === 'goingToL'){
            alienFloaterX -= 1;
            //console.log(alienFloaterX);
            if( alienFloaterX <= 417 && alienFloaterX >= 352 || alienFloaterX <= 222){
                drawBoss2bHelperHighlight();
                if (bossLocation === 2 && alienFloaterX <= 480 && alienFloaterX >= 414){
                    boss2bBombable = true;
                }else if(bossLocation === 1 && alienFloaterX <= 224){
                    boss2bBombable = true;
                }
            }else {
                boss2bBombable = false;    
            }
            if (alienFloaterX <= 160){
                alienFloaterStatus = 'goingToB';
            }
        }

        if(reveal2bHelper === true){
            if (reveal2bHelperCounter > 0){
                console.log(reveal2bHelperCounter);
                ctx.save();
                ctx.fillStyle = 'rgba(0,0,0,.75)';
                ctx.beginPath();
                ctx.arc(alienFloaterX, alienFloaterY, 34, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgba(5,5,5,.45)';
                ctx.beginPath();
                ctx.arc(alienFloaterX, alienFloaterY, reveal2bHelperCounter/7, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.restore();

                if (boss2bButtonLPushed === false){
                    reveal2bHelperCounter -= 1;
                }
            }else if (reveal2bHelperCounter === 0){
                reveal2bHelper = false;
                return;
            }
        }

        if(boss2bButtonRCooldown > 0 && reveal2bHelper === true){
            boss2bButtonRCooldown -= 1;
                ctx.save();
                ctx.fillStyle = 'rgba(255,0,0,.75)';
                ctx.beginPath();
                ctx.arc(alienFloaterX, alienFloaterY, (boss2bButtonRCooldown/4.3), 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.restore();
        } 
        
       
}

function drawBoss2bHelperHighlight(){
    if(reveal2bHelper === true){
        ctx.save();
        ctx.fillStyle = `rgba(0,144,0,.89)`;
        ctx.beginPath();
        ctx.arc(alienFloaterX, alienFloaterY, 33, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    } 
}

const boss2bDamageAnimationImage = new Image();

function drawBoss2bDamageAnimation(){
    boss2bDamageAnimationImage.src = 'images/rocket.png'
    if (boss2bDamageAnimation >= 1){
        boss2bDamageAnimation -=1;
        drawText('damage!', 21 + boss2bDamageAnimation, false, alienFloaterY + boss2bDamageAnimation, 'white', alienFloaterX + boss2bDamageAnimation);
        requestAnimationFrame(drawBoss2bDamageAnimation);
    }else{
        return;
    }
}


