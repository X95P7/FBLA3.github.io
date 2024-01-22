var windowPXLength = window.innerWidth;
var windowPXHeight = window.innerHeight;
var canvas;
var canvasWidth = 1.01; //in percenatges
var canvasHeight = .7;
var ctx;
var tick = 0;

var imagePool = ["images/group.JPG", "images/gift.JPG", "images/blanket2.JPG"];
var poolUsage = 2;
var hold1 = "images/group.JPG";
var hold2 = "images/gift.JPG";

window.devicePixelRatio=2;

function pTpG(pres, w){ //wanted precentage vaule, width(t) of height(f);
	var val;
	pres = pres /100;
		if(w == true || w == "w"){
		val = pres * canvas.width;
		}
		else{
			val = pres * canvas.height; 
		}
	return val;
}

function resizeCanvasG(){
	windowPXLength = window.innerWidth;
    windowPXHeight = window.innerHeight;
	
	canvas.width =  (canvasWidth * windowPXLength * 1) ; 
	canvas.height = (canvasHeight * windowPXHeight * 1) ;
	
	
	//redraw static image 
	drawMain();
}

function onLoad(){
	//change proportions for qol
	window.addEventListener('resize', resizeCanvasG, false);
	window.addEventListener('orientationchange', resizeCanvasG, false); 
	
	//get document elements
	canvas = document.getElementById("slideshowCanvas");
	canvas.width =  (canvasWidth * windowPXLength * 1); 
	canvas.height = (canvasHeight * windowPXHeight * 1);
	ctx = canvas.getContext("2d");
	console.log("main");
	drawMain();
	setInterval(drawMain, 25);
}

function drawMain(){
	
	var img = document.createElement('img');
	
	var imgXval = (tick % (2 * canvas.width)) - canvas.width;
		if(Math.abs(imgXval-(windowPXLength * 2 * canvasWidth)) < 3.5){
			hold1 = randomImg();
			console.log("change");
	}
		img.src = hold1
		img.height = (canvas.width / img.width) * img.height;
	
	ctx.drawImage(img, imgXval, img.height / -1.3 + 200, 0.99 * canvas.width, img.height * 1.833333);
	
	
	
	var img2 = document.createElement('img');
	var img2Xval =(tick + canvas.width) % (2 * canvas.width) - canvas.width;
				if(Math.abs(img2Xval-(windowPXLength * 2 * canvasWidth)) < 3.5){
			hold2 = randomImg();
			console.log("change2");
		}
		img2.src = hold2;
		img2.height =  canvas.width / img2.width * img2.height;
		ctx.drawImage(img2, img2Xval, img2.height / -1.3 + 200, 0.99 * canvas.width, img2.height * 1.833333);
	
	
	
	var c = Math.pow(0.4 + (Math.abs(((( tick) % canvas.width) - canvas.width) / (canvas.width)) - 0),5);
	tick +=  c*16;
	
	ctx.globalAlpha = 0.2;
	ctx.fillStyle = "#ababab";
	ctx.fillRect(0,0, pTpG(100, "w"),pTpG(100, "h"));
	
	//text
	var scale = window.devicePixelRatio;
	ctx.font = pTpG(5,"w") + "px regular";
				ctx.globalAlpha = 1;
				ctx.fillStyle = "white";
				var adjust = ctx.measureText("Help One, building the community").width * 1.1;
				ctx.fillText("Help One, building the community", (pTpG(85,"w") - adjust) / 2,pTpG(20,"h"));
				var adjust = ctx.measureText("One person at a time").width * 1.1;
				ctx.fillText("One person at a time", (pTpG(53,"w") - adjust) / 2,pTpG(35,"h"));
}

function randomImg(){
	var rand =  Math.floor(Math.random() * imagePool.length - 1) + 1;
	//var tempt = imagePool.splice(rand,1);
	//imagePool.splice(0,0,tempt[0]);
	return imagePool[rand];
}

	