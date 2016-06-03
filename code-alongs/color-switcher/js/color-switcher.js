var colors = [{color:"#BDFF0E", name:"Lime"},
			  {color:"#FF2063", name:"Radical Red"},
			  {color:"#84FFF3", name:"Aquamarine"},
			  {color:"#5E1A8E", name:"Seance"},
			  {color:"#FFCE00", name:"Supernova"},
			  {color:"#93FF75", name:"Mint Green"},
			  {color:"#FFA7FE", name:"Lavender Rose"},
			  {color:"#0084EE", name:"Azure Radiance"},
			  {color:"#FF3A00", name:"Vermilion"},
			  {color:"#7F7F7F", name:"Tin"},
			  {color:"#1E8800", name:"Japanese Laurel Triadic Gradient", type:"gradient"},
			  {color:"#880061", name:"Fresh Eggplant Triadic Gradient", type:"gradient"},
			  {color:"#1B6FA1", name:"Matisse Triadic Gradient", type:"gradient"}];
var colorList;
var currentColor;
var gradientColors = {color1:"#ffffff", color2:"#ffffff", color3:"#ffffff"};

function init() {
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
		newColorLI.addEventListener("click", onColorClick);
		TweenMax.from(newColorLI, 1, {y:100, alpha:0, ease:Bounce.easeOut, delay:i*0.09});
	}

	TweenMax.from(currentColor, 1, {alpha:0, ease:Bounce.easeOut, delay:2});

	// pick a color to start
	var ranColor = Math.floor(Math.random()*colors.length);
	TweenMax.delayedCall(3, changeColor, [ranColor]);
}

function onColorClick(e) {
	TweenMax.to(e.currentTarget, 0.3, {css:{border:"20px solid black", height:"70px"}, ease:Quad.easeOut});
	TweenMax.to(e.currentTarget, 0.5, {css:{border:"5px solid black", height:"80px"}, delay:0.35, ease:Bounce.easeOut});
	changeColor(e.currentTarget.id);
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
	var gradientBackground = "linear-gradient(42deg," + gradientColors.color1 + "," + gradientColors.color2 + "," + gradientColors.color3 + ")";
	var theBody = document.querySelector("body");
	theBody.style.background = gradientBackground + " fixed no-repeat";
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