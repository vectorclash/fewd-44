var navButtons;
var nav;
var articles;
var hmb;
var navOpen = false;
var pageWidth;

function init() {
	pageWidth = window.innerWidth;
	nav = document.querySelector("header nav");
	if(pageWidth < 450) {
		TweenMax.set(nav, {css:{height:"0"}});
	}
	navButtons = document.querySelectorAll("header a");
	for(var h = 0; h < navButtons.length; h++) {
		var button = navButtons[h];
		if(pageWidth > 450) {
			TweenMax.from(button, 1, {y:20, alpha:0, ease:Bounce.easeOut, delay:h*0.2});
		}
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

	hmb = document.querySelector(".hmb-nav");
	hmb.addEventListener("click", onHMBClick);

	TweenMax.from(hmb, 1, {alpha:0, delay:0.5});

	TweenMax.to("#upperBun", 1, {fill:0x6F6E72, delay:1});
	TweenMax.to("#patty", 1, {fill:0x6F6E72, transformOrigin:"50% 50%", delay:1.1});
	TweenMax.to("#lowerBun", 1, {fill:0x6F6E72, delay:1.2});

	TweenMax.staggerFrom("aside section", 1, {alpha:0, y:20, ease:Bounce.easeOut, delay:1}, 0.2);

	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	var theWidth = window.innerWidth;
	if(pageWidth != theWidth) {
		if(theWidth > 450) {
			TweenMax.set(nav, {css:{height:"auto"}});
		} else if(theWidth < 450) {
			TweenMax.set(nav, {css:{height:"0"}});
			navOpen = false;
		}
	}
}

function onHMBClick(e) {
	animateHamburger();
	if(navOpen) {
		TweenMax.to(nav, 1, {height:0, ease:Bounce.easeOut});
		navOpen = false;
	} else {
		TweenMax.set(nav, {height:"auto"});
		TweenMax.from(nav, 1, {height:0, ease:Bounce.easeOut});
		for(var h = 0; h < navButtons.length; h++) {
			var button = navButtons[h];
			TweenMax.from(button, 0.5, {y:-20, alpha:0, ease:Bounce.easeOut, delay:h*0.099});
		}
		navOpen = true;
	}
}

function animateHamburger() {
	if(navOpen) {
		TweenMax.to("#upperBun", 1, {morphSVG:"#upperBun", fill:0x6F6E72, ease:Elastic.easeOut});
		TweenMax.to("#patty", 1, {morphSVG:"#patty", fill:0x6F6E72, rotation:0, ease:Elastic.easeOut});
		TweenMax.to("#lowerBun", 1, {morphSVG:"#lowerBun", fill:0x6F6E72, ease:Elastic.easeOut});
	} else {
		TweenMax.to("#upperBun", 1, {morphSVG:"#upperBar", fill:0xD40D5D, ease:Elastic.easeOut});
		TweenMax.to("#patty", 1, {morphSVG:"#dot", fill:0xD40D5D, rotation:90, ease:Elastic.easeOut});
		TweenMax.to("#lowerBun", 1, {morphSVG:"#lowerBar", fill:0xD40D5D, ease:Elastic.easeOut});
	}
}

function onButtonOver(e) {
	TweenMax.to(e.currentTarget, 0.5, {backgroundColor:0xFF3157, ease:Bounce.easeOut});
}

function onButtonOut(e) {
	TweenMax.to(e.currentTarget, 0.5, {backgroundColor:0x000000, ease:Bounce.easeOut});
}