var navButtons;
var nav;
var articles;
var hmb;
var navOpen = false;

function init() {
	nav = document.querySelector("header nav");
	hmb = document.querySelector(".hmb-nav");
	hmb.addEventListener("click", onHMBClick);
	navButtons = document.querySelectorAll("header a");
	for(var h = 0; h < navButtons.length; h++) {
		var button = navButtons[h];
		TweenMax.from(button, 1, {y:20, alpha:0, ease:Bounce.easeOut, delay:h*0.2});
		button.addEventListener("mouseover", onButtonOver);
		button.addEventListener("mouseout", onButtonOut);
	}

	TweenMax.from(".container", 2, {css:{borderLeft:"0px solid #CCFF00"}, delay:2, ease:Elastic.easeOut});

	articles = document.querySelectorAll("article");
	for(var i = 0; i < articles.length; i++) {
		var article = articles[i];
		for(var j = 0; j < article.children.length; j++) {
			TweenMax.from(article.children[j], 1, {y:20, alpha:0, ease:Quad.easeOut, delay:i+(j*0.5)});
		}
	}
}

function onHMBClick(e) {
	if(navOpen) {
		TweenMax.to(nav, 1, {css:{height:"0px"}, ease:Bounce.easeOut});
		navOpen = false;
	} else {
		TweenMax.to(nav, 1, {css:{height:"100%"}, ease:Bounce.easeOut});
		navOpen = true;
	}
}

function onButtonOver(e) {
	TweenMax.to(e.currentTarget, 0.5, {backgroundColor:0xFF3157, ease:Bounce.easeOut});
}

function onButtonOut(e) {
	TweenMax.to(e.currentTarget, 0.5, {backgroundColor:0x000000, ease:Bounce.easeOut});
}