var infoButton;
var infoButtonBack;
var heroImage;

function init() {
	heroImage = document.querySelector(".hero-image");
	infoButton = document.querySelector(".info-button");
	infoButtonBack = document.querySelector(".info-button-back");
	TweenMax.set(infoButtonBack, {transformOrigin:"50% 100%"});
	onImageOut(null);

	heroImage.addEventListener("mouseover", onImageOver);
	heroImage.addEventListener("mouseout", onImageOut);

	var aside = document.querySelector("aside");
	TweenMax.from(aside, 2, {css:{flex:"0", opacity:"0", borderLeft:"20px solid #CCFF00"}, ease:Bounce.easeOut, delay:1});
}

function onImageOver(e) {
	TweenMax.to(infoButtonBack, 0.5, {scaleY:1, ease:Bounce.easeOut});
	TweenMax.to(infoButton, 0.5, {color:0xA3562F, ease:Quad.easeOut});
}

function onImageOut(e) {
	TweenMax.to(infoButtonBack, 0.5, {scaleY:0, ease:Bounce.easeOut});
	TweenMax.to(infoButton, 0.5, {color:0xFFFFFF, ease:Quad.easeOut});
}