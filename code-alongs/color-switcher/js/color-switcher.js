var colors = [{color:"#BDFF0E", name:"Lime"},
			  {color:"#FF2063", name:"Radical Red"},
			  {color:"#84FFF3", name:"Aquamarine"},
			  {color:"#5E1A8E", name:"Seance"},
			  {color:"#FFCE00", name:"Supernova"},
			  {color:"#93FF75", name:"Mint Green"},
			  {color:"#FFA7FE", name:"Lavender Rose"},
			  {color:"#0084EE", name:"Azure Radiance"},
			  {color:"#FF3A00", name:"Vermilion"},
			  {color:"#7F7F7F", name:"Tin"}] 
var colorList;
var currentColor;

function init() {
	shuffle(colors);
	colorList = document.querySelector("ul");
	currentColor = document.querySelector(".current-color");
	for(var i = 0; i < colors.length; i++) {
		var newColorLI = document.createElement("li");
		TweenMax.set(newColorLI, {backgroundColor:colors[i].color});
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
	TweenMax.to("body", 2, {backgroundColor:colors[id].color, ease:Bounce.easeOut});
	detectBrightness(colors[id].color);
	//currentColor.textContent = "Current color theme is: " + colors[id].name;
	TweenMax.to(currentColor, 1, {text:"Current color theme is: " + colors[id].name, ease:Linear.easeNone});
}

function detectBrightness(color) {
	var bColor = new tinycolor(color);
	var brightness = bColor.getBrightness();
	console.log(brightness);
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