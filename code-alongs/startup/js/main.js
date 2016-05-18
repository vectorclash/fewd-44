var blockButtons;
var mymButton;

function init() {
	blockButtons = document.querySelectorAll(".lower-block-button");
	for(var i = 0; i < blockButtons.length; i++) {
		blockButtons[i].addEventListener("mouseover", onButtonOver);
		blockButtons[i].addEventListener("mouseout", onButtonOut);
	}

	mymButton = document.querySelector(".mym-button");
	mymButton.addEventListener("mouseover", onButtonOver);
	mymButton.addEventListener("mouseout", onButtonOut);
}

function onButtonOver(e) {
	TweenMax.to(e.currentTarget, 0.3, {css:{boxShadow:"0 6px 6px rgba(20, 20, 50, 0.8)", borderRadius:"10px"}, ease:Bounce.easeOut});
}

function onButtonOut(e) {
	TweenMax.to(e.currentTarget, 0.3, {css:{boxShadow:"0 2px 2px rgba(0, 0, 0, 0.7)", borderRadius:"5px"}, ease:Quad.easeOut});
}