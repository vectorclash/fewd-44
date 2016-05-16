var infoButton;
var infoButtonBack;
var heroImage;
var tableCells;

function init() {
	heroImage = document.querySelector(".hero-image");
	infoButton = document.querySelector(".info-button");
	infoButtonBack = document.querySelector(".info-button-back");
	TweenMax.set(infoButtonBack, {transformOrigin:"50% 100%"});
	onImageOut(null);

	tableCells = document.querySelectorAll("td");
	for(var i = 0; i < tableCells.length; i++) {
		var td = tableCells[i];
		td.addEventListener("mouseover", onTDOver);
		td.addEventListener("mouseout", onTDOut);
	}

	heroImage.addEventListener("mouseover", onImageOver);
	heroImage.addEventListener("mouseout", onImageOut);
}

function onTDOver(e) {
	TweenMax.to(e.currentTarget, 1, {borderRadius:10, backgroundColor:0xAED7C1, ease:Back.easeOut});
}

function onTDOut(e) {
	TweenMax.to(e.currentTarget, 1, {borderRadius:0, backgroundColor:0xECEFD0, ease:Back.easeOut});
}

function onImageOver(e) {
	TweenMax.to(infoButtonBack, 0.5, {scaleY:1, ease:Bounce.easeOut});
	TweenMax.to(infoButton, 0.5, {color:0xA3562F, ease:Quad.easeOut});
}

function onImageOut(e) {
	TweenMax.to(infoButtonBack, 0.5, {scaleY:0, ease:Bounce.easeOut});
	TweenMax.to(infoButton, 0.5, {color:0xFFFFFF, ease:Quad.easeOut});
}