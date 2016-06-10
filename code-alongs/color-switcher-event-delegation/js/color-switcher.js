var colors = [{color:"#BDFF0E", name:"Lime", type:"color"},
			  {color:"#FF2063", name:"Radical Red", type:"color"},
			  {color:"#84FFF3", name:"Aquamarine", type:"color"},
			  {color:"#5E1A8E", name:"Seance", type:"color"},
			  {color:"#FFCE00", name:"Supernova", type:"color"},
			  {color:"#93FF75", name:"Mint Green", type:"color"},
			  {color:"#FFA7FE", name:"Lavender Rose", type:"color"},
			  {color:"#0084EE", name:"Azure Radiance", type:"color"},
			  {color:"#FF3A00", name:"Vermilion", type:"color"},
			  {color:"#7F7F7F", name:"Tin", type:"color"},
			  {color:"#1E8800", name:"Japanese Laurel Triadic Gradient", type:"gradient"},
			  {color:"#880061", name:"Fresh Eggplant Triadic Gradient", type:"gradient"},
			  {color:"#1B6FA1", name:"Matisse Triadic Gradient", type:"gradient"}];
var colorList;
var currentColor;
var gradientColors = {color1:"#ffffff", color2:"#ffffff", color3:"#ffffff"};

var addColor;
var jsColor;
var gradientCheck;

var nebulas = ["img/nebula.png", "img/nebula-two.png", "img/nebula-three.png"];
var currentBackgroundImage = "";
var spaceList;
var wrapper;

function init() {
	wrapper = document.querySelector(".wrapper");
	shuffle(colors);
	colorList = document.querySelector("ul");
	currentColor = document.querySelector(".current-color");
	for(var i = 0; i < colors.length; i++) {
		var newColorLI = document.createElement("li");
		if(colors[i].type == "gradient") {
			var myColor = new tinycolor(colors[i].color);
			var newgradientColors = myColor.triad();
			var gradientBackground = "linear-gradient(42deg," + newgradientColors[1].toHexString() + "," + newgradientColors[0].toHexString() + "," + newgradientColors[2].toHexString() + ")";
			TweenMax.set(newColorLI, {background:gradientBackground});
		} else {
			var gradientBackground = "linear-gradient(42deg," + colors[i].color + "," + colors[i].color + "," + colors[i].color + ")";
			TweenMax.set(newColorLI, {background:gradientBackground});
		}
		newColorLI.id = i;
		colorList.appendChild(newColorLI);
		TweenMax.from(newColorLI, 1, {y:100, alpha:0, ease:Bounce.easeOut, delay:i*0.09});
	}

	colorList.addEventListener("click", onColorClick);

	TweenMax.from(currentColor, 1, {alpha:0, ease:Bounce.easeOut, delay:2});

	// pick a color to start
	var ranColor = Math.floor(Math.random()*colors.length);
	TweenMax.delayedCall(3, changeColor, [ranColor]);

	// set add color elements

	addColor = document.querySelector(".add-color");
	jsColor = document.querySelector(".jscolor");
	gradientCheck = document.querySelector(".gradient-check");


	addColor.addEventListener("click", addNewColor);

	// build space selector

	spaceList = document.querySelector(".space-list");

	for(var i = 0; i < nebulas.length; i++) {
		var newSpaceLI = document.createElement("li");
		spaceList.appendChild(newSpaceLI);
		newSpaceLI.style.backgroundImage = "url(" + nebulas[i] + ")";
		newSpaceLI.id = i;
		TweenMax.from(newSpaceLI, 1, {y:100, alpha:0, ease:Bounce.easeOut, delay:2+i*0.09});
	}

	spaceList.addEventListener("click", onSpaceClick);
}

function onColorClick(e) {
	if(e.target.tagName != "LI") {
		return;
	}

	animateButton(e.target);
	changeColor(e.target.id);
}

function onSpaceClick(e) {
	if(e.target.tagName != "LI") {
		return;
	}
	
	animateButton(e.target);
	changeBackgroundNebula(e.target.id);
}

function animateButton(button) {
	TweenMax.to(button, 0.3, {css:{border:"20px solid black", height:"70px"}, ease:Quad.easeOut});
	TweenMax.to(button, 0.5, {css:{border:"5px solid black", height:"80px"}, delay:0.35, ease:Bounce.easeOut});
}

function changeBackgroundNebula(id) {
	currentBackgroundImage = nebulas[id];
	updateGradient();
}

function changeColor(id) {
	if(colors[id].type == "gradient") {
		var myColor = new tinycolor(colors[id].color);
		var newgradientColors = myColor.triad();
		TweenMax.to(gradientColors, 2, {color1:newgradientColors[1].toHexString(), color2:newgradientColors[0].toHexString(), color3:newgradientColors[2].toHexString(), ease:Bounce.easeOut, onUpdate:updateGradient});
		detectBrightness(newgradientColors[0].toHexString());
	} else {
		TweenMax.to(gradientColors, 2, {color1:colors[id].color, color2:colors[id].color, color3:colors[id].color, ease:Bounce.easeOut, onUpdate:updateGradient});
		detectBrightness(colors[id].color);
		//currentColor.textContent = "Current color theme is: " + colors[id].name;
	}

	TweenMax.to(currentColor, 1, {text:"Current color theme is: " + colors[id].name, ease:Linear.easeNone});
}

function updateGradient() {
	var gradientBackground = "url(" + currentBackgroundImage + "), linear-gradient(42deg," + gradientColors.color1 + "," + gradientColors.color2 + "," + gradientColors.color3 + ")";
	var theBody = document.querySelector("body");
	theBody.style.backgroundImage = gradientBackground;
}

function detectBrightness(color) {
	var bColor = new tinycolor(color);
	var brightness = bColor.getBrightness();
	if(brightness < 150) {
		TweenMax.to("body", 2, {color:0xFFFFFF, ease:Bounce.easeOut});
	} else {
		TweenMax.to("body", 2, {color:0x000000, ease:Bounce.easeOut});
	}
}

function addNewColor() {
	var newColor = new tinycolor(jsColor.value);
	var isGradient = gradientCheck.checked;
	var newColorLI = document.createElement("li");
	colorList.appendChild(newColorLI);
	var type;
	var name;
	if(isGradient) {
		type = "gradient";
		name = "User created triadic gradient of: #";
		var newgradientColors = newColor.triad();
		var gradientBackground = "linear-gradient(42deg," + newgradientColors[1].toHexString() + "," + newgradientColors[0].toHexString() + "," + newgradientColors[2].toHexString() + ")";
		TweenMax.set(newColorLI, {background:gradientBackground});
	} else {
		type = "color";
		name = "User created color: #";
		var gradientBackground = "linear-gradient(42deg,#" + jsColor.value + ",#" + jsColor.value + ",#" + jsColor.value + ")";
		TweenMax.set(newColorLI, {background:gradientBackground});
	}
	newColorLI.id = colorList.children.length - 1;
	var colorObject = {color:"#"+jsColor.value, name:name + jsColor.value, type:type};
	colors.push(colorObject);
	newColorLI.addEventListener("click", onColorClick);
	TweenMax.from(newColorLI, 1, {y:100, alpha:0, ease:Bounce.easeOut});
}

// Array shuffler
// Acquired here: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}