var blockButtons;
var mymButton;
var lowerBlocks;

function init() {
	blockButtons = document.querySelectorAll(".lower-block-button");
	for(var i = 0; i < blockButtons.length; i++) {
		blockButtons[i].addEventListener("mouseover", onButtonOver);
		blockButtons[i].addEventListener("mouseout", onButtonOut);
	}

	mymButton = document.querySelector(".mym-button");
	mymButton.addEventListener("mouseover", onButtonOver);
	mymButton.addEventListener("mouseout", onButtonOut);

	//lowerBlocks = document.querySelector(".lower-blocks");
	//console.log(lowerBlocks);
}

function onButtonOver(e) {
	TweenMax.to(e.currentTarget, 0.5, {css:{boxShadow:"0 4px 6px rgba(20, 20, 50, 0.6)"}, ease:Elastic.easeOut});
}

function onButtonOut(e) {
	TweenMax.to(e.currentTarget, 0.3, {css:{boxShadow:"0 2px 2px rgba(0, 0, 0, 0.5)"}, ease:Quad.easeOut});
}