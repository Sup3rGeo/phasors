/* 
Author: Victor Maryama

Based on: https://codepen.io/andremichelle/pen/LVzMRz

alpha, beta: This script considers base coordinates with alpha (positive x axis) and beta lagging 90º (positive y axis)

Then, for representation in the canvas, alpha is represented in the y axis (positive upwards) and beta in the x axis (positive to the left) - so the coordinates are rotated 90º counter clockwise

However, the canvas writing coordinates have x positive to the right and y positive downwards, so in the printing functions the y axis has a negative alpha value and x axis has a negative beta value. 

*/

var frequencyInput = document.querySelector("input[name=frequency]");
var harm1nInput = document.querySelector("input[name=harm1n]");
var harm1magInput = document.querySelector("input[name=harm1mag]");
var harm1phInput = document.querySelector("input[name=harm1ph]");
var harm2nInput = document.querySelector("input[name=harm2n]");
var harm2magInput = document.querySelector("input[name=harm2mag]");
var harm2phInput = document.querySelector("input[name=harm2ph]");
var locusInput = document.querySelector("input[name=locus]");
var circleInput = document.querySelector("input[name=circle]");
var coordalphabetaInput = document.querySelector("input[name=coordalphabeta]");
var coordabcInput = document.querySelector("input[name=coordabc]");

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var TAU = Math.PI * 2.0;
var Scale = 64.0;
var time = 0.0;
var startTime = new Date().getTime();
var Pointer = 0;
var alphas = [];
var betas = [];
var as = [];
var bs = [];
var cs = [];
var angle = [];
var anglefund = [];
var anglediff = [];
var magnitude = [];
var x0 = 144.0,
		y0 = 128.0;
var beta = 0,
		alpha = 0;
var betafund = 0,
		alphafund = 0;
			
function harmonic(order,mag,phase,circle) {
	var phase = (order * time * TAU) + phase*Math.PI/180;
	var radius = 4.0 / Math.PI * Scale * mag;
	context.beginPath();
	context.lineWidth = 1.0;
	context.strokeStyle = "rgba(255,128,32,1.0)";
	if (circle) context.arc(-beta+x0, -alpha+y0, radius, 0, TAU);
	context.stroke();
	if (order == 1) {
		context.strokeStyle = "rgba(255,255,255,0.4)";	
	} else {
		context.strokeStyle = "rgba(255,255,255,0.4)";	
	}
	context.moveTo(-beta+x0, -alpha+y0);
	alpha += Math.cos(phase) * radius;
	beta += Math.sin(phase) * radius;
  if (order == 1) {
		betafund = beta;
		alphafund = alpha;
	}
	context.lineTo(-beta+x0, -alpha+y0);
	context.stroke();
};

function connect() {
	context.beginPath();
	context.moveTo(-beta + x0 , -alpha + y0 );
	context.lineTo(256*2 , -alpha + y0 );
	context.strokeStyle = "rgba(255,255,32,1.0)";
	context.stroke();
};



/* 	function drawAngleFund() {
			anglefund[anglefundPointer++ & 255] = 15*Math.atan2(yfund-128, xfund-144)+128;
			context.beginPath();
			context.strokeStyle = "rgba(0,255,0,1)";
			context.moveTo(256 + 0.5, 15*Math.atan2(yfund-128, xfund-144)+128 + 0.5);
			for (var i = 1; i < 256; ++i) {
					context.lineTo(256 + i + 0.5, anglefund[(anglefundPointer - i) & 255] + 0.5);
			}
			context.stroke();
	} */


function drawCoordinatesAlphaBeta() {
	var len = 100;
	context.beginPath();
	context.strokeStyle = "rgba(255,255,0,1)";
	context.fillStyle = "yellow";

	context.moveTo(x0 , y0 );
	context.lineTo(x0 , y0-len );
	context.fillText(" alpha (0º)",x0 , y0-len );

	context.moveTo(x0 , y0 );
	context.lineTo(x0-len , y0 );	
	context.fillText("beta (90º)",x0-len - 35, y0 - 5);

	context.stroke();
}

function drawCoordinatesAbc() {
	var len = 100;
	context.beginPath();
	context.strokeStyle = "rgba(255,255,0,1)";
	context.fillStyle = "yellow";

	context.moveTo(x0 , y0 );
	context.lineTo(x0 , y0-len );
	context.fillText(" a (0º)",x0 , y0-len );
	
 	context.moveTo(x0 , y0 );
	context.lineTo(x0 - 0.866*len, y0 + 0.5*len );	
	context.fillText("b (120º)",x0 - 0.866*len - 40, y0 + 0.5*len );

 	context.moveTo(x0 , y0 );
	context.lineTo(x0 + 0.866*len, y0 + 0.5*len );	
	context.fillText("c (240º)",x0 + 0.866*len, y0 + 0.5*len + 10);
	
	context.stroke();
}
	
function drawZeroLine() {
	context.beginPath();
	context.strokeStyle = "rgba(255,255,0,1)";
	context.moveTo(256 , y0 );
	context.lineTo(256*2 , y0 );
	context.stroke();
}


function drawPhasor() {
	context.beginPath();
	context.lineWidth = 1.0;
	context.strokeStyle = "rgba(255,128,32,1.0)";
	context.moveTo(x0, y0);
	context.lineTo(-beta+x0, -alpha+y0);
	context.stroke();
}

	function drawLocus() {
		context.beginPath();
		context.strokeStyle = "rgba(0,255,0,1)";
		context.moveTo(-betas[Pointer & 255] + x0 , -alphas[Pointer & 255] + y0 );
		for (var i = 1; i < 256; ++i) {
				context.lineTo(	-betas[(Pointer - i) & 255] + x0 , -alphas[(Pointer - i) & 255] + y0 );
		}
		context.stroke();
		//if
	}	
	
	
 	function drawAngle() {
		context.beginPath();
		context.strokeStyle = "rgba(0,255,0,1)";
		context.moveTo(256*2 , -15*angle[Pointer & 255]+ y0 );
		for (var i = 1; i < 256; ++i) {
			context.lineTo(256*2 - i , -15*angle[(Pointer - i) & 255] + y0 );
		}
		context.stroke();
	}

	function drawAngleDiff() {
		context.beginPath();
		context.strokeStyle = "rgba(0,255,0,1)";		
		context.moveTo(256*2 , -50*anglediff[Pointer & 255]+y0 );
		for (var i = 1; i < 256; ++i) {
			context.lineTo(256*2 - i , -50*anglediff[(Pointer - i) & 255]+ y0 );
		}
		context.stroke();
	}
	
 	function drawMagnitude() {
		context.beginPath();
		context.strokeStyle = "rgba(0,255,0,1)";
		context.moveTo(256*2 , -magnitude[Pointer & 255]+y0 );
		for (var i = 1; i < 256; ++i) {
				context.lineTo(256*2 - i , -magnitude[(Pointer - i) & 255]+y0 );
		}
		context.stroke();
	} 
	
	function drawWaveAlphaBeta() {
		//Alpha component
		connect();
		context.beginPath();
		context.strokeStyle = "red";
		context.moveTo(256*2 , -alpha + y0 );
		for (var i = 1; i < 256; ++i) {
				context.lineTo(256*2 - i , -alphas[(Pointer - i) & 255] + y0 );
		}
		context.stroke();
		//Beta component
 		context.beginPath();
		context.strokeStyle = "green";
		context.moveTo(256*2 , -beta + y0 );
		for (var i = 1; i < 256; ++i) {
				context.lineTo(256*2 - i , -betas[(Pointer - i) & 255] + y0 );
		}
		context.stroke();
	}
	
	function drawWaveAbc() {
		//A component
		connect();
		context.beginPath();
		context.strokeStyle = "red";
		context.moveTo(256*2 , -as[Pointer & 255] + y0 );
		for (var i = 1; i < 256; ++i) {
				context.lineTo(256*2 - i , -as[(Pointer - i) & 255] + y0 );
		}
		context.stroke();
		//B component
 		context.beginPath();
		context.strokeStyle = "green";
		context.moveTo(256*2 , -bs[Pointer & 255] + y0 );
		for (var i = 1; i < 256; ++i) {
				context.lineTo(256*2 - i , -bs[(Pointer - i) & 255] + y0 );
		}
		context.stroke();
		//C component
 		context.beginPath();
		context.strokeStyle = "blue";
		context.moveTo(256*2 , -cs[Pointer & 255] + y0 );
		for (var i = 1; i < 256; ++i) {
				context.lineTo(256*2 - i , -cs[(Pointer - i) & 255] + y0 );
		}
		context.stroke();		
	}	

	
	(function frame() {
			var plotInput = document.querySelector("input[name=plot]:checked");
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;		
			var now = new Date().getTime();		
			time += (now - startTime) * Math.pow(10.0, frequencyInput.value);
			startTime = now;
			
			// Compose total vector
			alpha = 0;
			beta = 0;	
			harmonic(1,1,0,circleInput.checked);
			harmonic(harm1nInput.value,harm1magInput.value,harm1phInput.value,circleInput.checked);
			harmonic(harm2nInput.value,harm2magInput.value,harm2phInput.value,circleInput.checked);
			
			alphas[Pointer & 255] = alpha;
			betas[Pointer & 255] = beta;
			as[Pointer & 255] = alpha;
			bs[Pointer & 255] = -0.5*alpha+0.5*Math.sqrt(3)*beta;
			cs[Pointer & 255] = -0.5*alpha-0.5*Math.sqrt(3)*beta;
			anglefund[Pointer & 255] = Math.atan2(betafund, alphafund);
			angle[Pointer & 255] = Math.atan2(beta, alpha);
			anglediff[Pointer & 255] = angle[Pointer & 255] - anglefund[Pointer & 255];
			if (anglediff[Pointer & 255] > Math.PI) anglediff[Pointer & 255] -= 2*Math.PI;
			if (anglediff[Pointer & 255] < -Math.PI) anglediff[Pointer & 255] += 2*Math.PI;
			//console.log(anglefund[Pointer & 255]+","+angle[Pointer & 255]+","+anglediff[Pointer & 255]);
			magnitude[Pointer & 255] = 0.5*Math.sqrt(beta*beta+alpha*alpha);				
			
 			drawPhasor();
			drawZeroLine();		
			
			if (locusInput.checked) { drawLocus(); }
			if (coordalphabetaInput.checked) { drawCoordinatesAlphaBeta(); }
			if (coordabcInput.checked) { drawCoordinatesAbc(); }

 			switch(plotInput.value) {
				case "anglediff":
					drawAngleDiff();
					break;
				case "angle":
					drawAngle();
					break;
				case "magnitude":
					drawMagnitude();
					break;
				case "waveAlphaBeta":
					drawWaveAlphaBeta();
					break;
				case "waveAbc":
					drawWaveAbc();
					break;
			} 
			
			Pointer++;
			window.requestAnimationFrame(frame);
	})();