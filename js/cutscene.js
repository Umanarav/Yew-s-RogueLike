let boss2bCutsceneCounter = 0;
let arcA20Counter = 0;
let arcA19Counter = 0;
let arcA18Counter = 0;
let arcA17Counter = 0;
let arcA16Counter = 0;
let arcA15Counter = 0;
let arcA14Counter = 0;
let arcA13Counter = 0;
let arcA12Counter = 0;
let arcA11Counter = 0;
let arcA10Counter = 0;
let arcA9Counter = 0;
let arcA8Counter = 0;
let arcA7Counter = 0;
let arcA6Counter = 0;
let arcA5Counter = 0;
let arcA4Counter = 0;
let arcA3Counter = 0;
let arcA2Counter = 0;
let arcA1Counter = 0;

let arcB16CounterX = 0;
let arcB15CounterX = 0;
let arcB14CounterX = 0;
let arcB13CounterX = 0;
let arcB12CounterX = 0;
let arcB11CounterX = 0;
let arcB10CounterX = 0;
let arcB9CounterX = 0;
let arcB8CounterX = 0;
let arcB7CounterX = 0;
let arcB6CounterX = 0;
let arcB5CounterX = 0;
let arcB4CounterX = 0;
let arcB3CounterX = 0;
let arcB2CounterX = 0;
let arcB1CounterX = 0;

let arcB1CounterY = 0;

let colorCounter30 = 0;
let colorCounter40 = 0;
let colorCounter60 = 0;
let colorCounter120 = 0;
let colorAscending = true;

let pointX1 = 0;
let pointY1 = 0;
let pointX2 = 832;
let pointY2 = 576;

let pointX1Addition = 0;
let pointY1Addition = 0;
let pointX2Addition = 0;
let pointY2Addition = 0;

let boss2bCounterX = 0;
let boss2bCounterY = 0;
let teleport2bCounterX = 0;
let teleport2bCounterY = 0;

let boss2bScaling = 0;
let boss2bBuffer = -1;


let cutscene1Req;
let animatingCutscene1 = false;

let boss2bSprite;
let boss2bSpriteTracker = 1;

const boss2b = new Image();
const boss2b2 = new Image();
const boss2b3 = new Image();
const boss2b4 = new Image();
const boss2b5 = new Image();
const boss2b6 = new Image();
const boss2b7 = new Image();

const boss2bFloor = new Image();
const teleport2b = new Image();

function showPreBoss2bCutscene() {
	if (animatingCutscene1 === true){
		ctx.fillStyle = '#D7B8D9';

	    //ctx.fillStyle = `rgba(${arcA13Counter}, ${arcA13Counter * 2}, ${arcA13Counter * 2}, ${arcA13Counter/100})`;
	    ctx.shadowColor = "black";
	    ctx.shadowBlur = 21;

	    if (boss2bCutsceneCounter < 6765) {
	        boss2bCutsceneCounter += 46.97916666666667;
	            //arcCountersForSlidingEffect
	            arcA20Counter += 29.03472222222222;
	            arcA19Counter += 17.94444444444444;
				arcA18Counter += 11.09027777777778;
				arcA17Counter += 6.854166666666667;
				arcA16Counter += 4.236111111111111;
				arcA15Counter += 2.618055555555556;
				arcA14Counter += 1.618055555555556;
				arcA13Counter += 1;
				arcA12Counter += 0.6180555555555556;
				arcA11Counter += 0.3819444444444444;
				arcA10Counter += 0.2361111111111111;
				arcA9Counter += 0.1458333333333333;
				arcA8Counter += 0.0902777777777778;
				arcA7Counter += 0.0555555555555556;
				arcA6Counter += 0.0347222222222222;
				arcA5Counter += 0.0208333333333333;
				arcA4Counter += 0.0138888888888889;
				arcA3Counter += 0.0069444444444444;
				arcA2Counter += 0.0069444444444444;
				arcA1Counter += 0.0069444444444444;

				//bottomLeftArcCounter
				arcB16CounterX += -1.076388888888889;
				arcB15CounterX += 1.541666666666667;
				arcB14CounterX += 3.159722222222222;
				arcB13CounterX += 4.159722222222222;
				arcB12CounterX += 4.777777777777778;;
				arcB11CounterX += 5.159722222222222;
				arcB10CounterX += 5.395833333333333;
				arcB9CounterX += 5.541666666666667;
				arcB8CounterX += 5.631944444444444;
				arcB7CounterX += 5.6875;
				arcB6CounterX += 5.722222222222222;
				arcB5CounterX += 5.743055555555556;
				arcB4CounterX += 5.756944444444444;
				arcB3CounterX += 5.763888888888889;
				arcB2CounterX += 5.770833333333333;
				arcB1CounterX += 5.777777777777778;

				arcB1CounterY += 3;


				//color
				colorCounter30 += 0.2083333333333333;
				colorCounter40 += 0.2777777777777778;
				colorCounter60 += 0.4166666666666667;
				colorCounter120 += 0.8333333333333333;
	
	        //console.log(boss2bCutsceneCounter);
		    }else if (boss2bCutsceneCounter >= 6765){
		        boss2bCutsceneCounter = 0;
		            //arcCountersForSlidingEffect
		            arcA20Counter = 0;
		            arcA19Counter = 0;
					arcA18Counter = 0;
					arcA17Counter = 0;
					arcA16Counter = 0;
					arcA15Counter = 0;
					arcA14Counter = 0;
					arcA13Counter = 0;
					arcA12Counter = 0;
					arcA11Counter = 0;
					arcA10Counter = 0;
					arcA9Counter = 0;
					arcA8Counter = 0;
					arcA7Counter = 0;
					arcA6Counter = 0;
					arcA5Counter = 0;
					arcA4Counter = 0;
					arcA3Counter = 0;
					arcA2Counter = 0;
					arcA1Counter = 0;

					//bottomLeftArcCounter
					arcB16CounterX = 0;
					arcB15CounterX = 0;
					arcB14CounterX = 0;
					arcB13CounterX = 0;
					arcB12CounterX = 0;
					arcB11CounterX = 0;
					arcB10CounterX = 0;
					arcB9CounterX = 0;
					arcB8CounterX = 0;
					arcB7CounterX = 0;
					arcB6CounterX = 0;
					arcB5CounterX = 0;
					arcB4CounterX = 0;
					arcB3CounterX = 0;
					arcB2CounterX = 0;
					arcB1CounterX = 0;
					arcB1CounterY += 3;

					//bottomLeftArcCounter
					arcB1CounterX = 0;
					arcB1CounterY = 0;

					//color
					colorCounter30 = 0;
					colorCounter40 = 0;
					colorCounter60 = 0;
					colorCounter120 = 0;

		    }

	    	//Top Left starting point
			    ctx.save();
			    ctx.fillStyle = `hsl(${360 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 17711, 17711, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${320 + colorCounter40}, 100%, 50%)`;
			    //ctx.fillStyle = `rgba(${arcA13Counter}, ${arcA13Counter * 2}, 0, 1)`;
			    ctx.beginPath();
			    ctx.arc(0, 10946 + boss2bCutsceneCounter, 10946 + boss2bCutsceneCounter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

				//arcA20
			    ctx.save();
			    ctx.fillStyle = `hsl(${280 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 6765 + arcA20Counter, 6765 + arcA20Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${240 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 4181 + arcA19Counter, 4181 + arcA19Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${120 + colorCounter120}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 2584 + arcA18Counter, 2584 + arcA18Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${60 + colorCounter60}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 1597 + arcA17Counter, 1597 + arcA17Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			   	ctx.fillStyle = `hsl(${30 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 987 + arcA16Counter, 987 + arcA16Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${360 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 610 + arcA15Counter, 610 + arcA15Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${320 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 377 + arcA14Counter, 377 + arcA14Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			   	ctx.fillStyle = `hsl(${280 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 233 + arcA13Counter, 233 + arcA13Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			   	ctx.fillStyle = `hsl(${240 + colorCounter40}, 100%, 50%)`;
			   	ctx.beginPath();
			    ctx.arc(0, 144 + arcA12Counter, 144 + arcA12Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${120 + colorCounter120}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 89 + arcA11Counter, 89 + arcA11Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${60 + colorCounter60}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 55 + arcA10Counter, 55 + arcA10Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${30 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 34 + arcA9Counter, 34 + arcA9Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${360 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 21 + arcA8Counter, 21 + arcA8Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			   	ctx.fillStyle = `hsl(${320 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 13 + arcA7Counter, 13 + arcA7Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			   	ctx.fillStyle = `hsl(${280 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 8 + arcA6Counter, 8 + arcA6Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
				ctx.fillStyle = `hsl(${240 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 5 + arcA5Counter, 5 + arcA5Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
				ctx.fillStyle = `hsl(${120 + colorCounter120}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 3 + arcA4Counter, 3 + arcA4Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${60 + colorCounter60}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 2 + arcA3Counter, 2 + arcA3Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			   	ctx.fillStyle = `hsl(${30 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 1 + arcA2Counter, 1 + arcA2Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${0 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0, 0 + arcA1Counter, 0 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

		    //Bottom Left starting point, scrolling on bottom
				ctx.save();
				ctx.fillStyle = `hsl(${30 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(987 + arcA16Counter, 576, 15 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${360 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(610 + arcA15Counter, 576, 14 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${320 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(377 + arcA14Counter, 576, 13 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${280 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(233 + arcA13Counter, 576, 12 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

				ctx.save();
				ctx.fillStyle = `hsl(${240 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(144 + arcA12Counter, 576, 11 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${120 + colorCounter120}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(89 + arcA11Counter, 576, 10 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${60 + colorCounter60}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(55 + arcA10Counter, 576, 9 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${30 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(34 + arcA9Counter, 576, 8 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${360 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(21 + arcA8Counter, 576, 7 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${320 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(13 + arcA7Counter, 576, 6 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${280 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(8 + arcA6Counter, 576, 5 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${240 + colorCounter40}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(5 + arcA5Counter, 576, 4 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${120 + colorCounter120}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(3 + arcA4Counter, 576, 3 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${60 + colorCounter60}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(2 + arcA3Counter, 576, 2 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${30 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(1 + arcA2Counter, 576, 1 + arcA1Counter, 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

			    ctx.save();
			    ctx.fillStyle = `hsl(${0 + colorCounter30}, 100%, 50%)`;
			    ctx.beginPath();
			    ctx.arc(0 + arcA1Counter, 576, 0 + arcA1Counter , 0, 2 * Math.PI);
			    ctx.stroke();
			    ctx.fill();
			    ctx.restore();

		    //boss2b

		    if (boss2bSpriteTracker >= 1 && boss2bSpriteTracker <= 5 ){
		    	boss2bSprite = boss2b;
		    	boss2bSpriteTracker += 1
		    }else if (boss2bSpriteTracker >= 6 && boss2bSpriteTracker <= 10 ){
		    	boss2bSprite = boss2b2;
		    	boss2bSpriteTracker += 1
		    }else if (boss2bSpriteTracker >= 11 && boss2bSpriteTracker <= 15 ){
		    	boss2bSprite = boss2b3;
		    	boss2bSpriteTracker += 1
		    }else if (boss2bSpriteTracker >= 16 && boss2bSpriteTracker <= 20 ){
		    	boss2bSprite = boss2b4;
		    	boss2bSpriteTracker += 1
		    }else if (boss2bSpriteTracker >= 21 && boss2bSpriteTracker <= 25 ){
		    	boss2bSprite = boss2b5;
		    	boss2bSpriteTracker += 1
		    }else if (boss2bSpriteTracker >= 26 && boss2bSpriteTracker <= 30 ){
		    	boss2bSprite = boss2b6;
		    	boss2bSpriteTracker += 1
		    }
		    else if (boss2bSpriteTracker >= 31 && boss2bSpriteTracker <= 35 ){
		    	boss2bSprite = boss2b7;
		    	boss2bSpriteTracker += 1
		    }else if(boss2bSpriteTracker === 36){
		    	boss2bSpriteTracker = 1
		    }
		    //console.log(boss2bSpriteTracker);

		    if (boss2bScaling < 64){
		    	boss2bScaling += 0.2222222222222222;
		    	//boss2b
				boss2bCounterX += 1.785430555555556;
				boss2bCounterY += 1.236069444444445;

				teleport2bCounterX += 1.103458333333334;
				teleport2bCounterY += 1.236069444444445;
			}else if(boss2bScaling >= 64){
				if(boss2bBuffer <= -1){
					boss2bBuffer = 128;
				}
				if(boss2bBuffer > 0){
			    	boss2bBuffer -= 1;
			    	console.log(boss2bBuffer);
			}else if (boss2bBuffer === 0){
				boss2bScaling = 0;
				//boss2b
				boss2bCounterX = 0;
				boss2bCounterY = 0;

				teleport2bCounterX = 0;
				teleport2bCounterY = 0;
				boss2bBuffer = -1;
			  }
			}



		    	
		    


		    ctx.save();
		    ctx.shadowBlur = 10;
		    ctx.drawImage(boss2bFloor, 317.796, 355.988, 0 + boss2bScaling, 0 + boss2bScaling);
		    ctx.shadowBlur = 0;
		    ctx.drawImage(boss2bSprite, 832 - boss2bCounterX, 0 + boss2bCounterY, 0 + boss2bScaling, 0 + boss2bScaling);
		    ctx.shadowBlur = 5;
		    ctx.drawImage(teleport2b, 0 + teleport2bCounterX, 0 + teleport2bCounterY, 0 + boss2bScaling, 0 + boss2bScaling)
		    ctx.restore();

		//console.log(arcA13Counter);
		
            myReq = window.requestAnimationFrame(showPreBoss2bCutscene);
        
	
		}else {
			return;
		}
}


