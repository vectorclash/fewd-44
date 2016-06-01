var colors = [0xBDFF0E, 0xFF2063, 0x84FFF3, 0x5E1A8E, 0xFFCE00, 0x93FF75, 0xFFA7FE];
var colorList;
var currentColor;

function init() {
	colorList = document.querySelector("ul");
	currentColor = document.querySelector(".current-color");
	for(var i = 0; i < colors.length; i++) {
		var newColorLI = document.createElement("li");
		TweenMax.set(newColorLI, {backgroundColor:colors[i]});
		newColorLI.id = i;
		colorList.appendChild(newColorLI);
		newColorLI.addEventListener("click", onColorClick);
	}
}

function onColorClick(e) {
	TweenMax.to(e.currentTarget, 0.5, {css:{border:"20px solid black"}, ease:Quad.easeOut});
	TweenMax.to(e.currentTarget, 0.5, {css:{border:"5px solid black"}, delay:0.6, ease:Bounce.easeOut});

	TweenMax.to("body", 2, {backgroundColor:colors[e.currentTarget.id], ease:Bounce.easeOut});
	currentColor.textContent = "Current color theme is: " + colors[e.currentTarget.id];
}