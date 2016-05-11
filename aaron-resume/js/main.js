var particleNum = 20;
var nameSplit;

function init() {
	buildLogo();
	var nameSplit = new SplitText(document.querySelector(".name", {type:"chars"}));
	TweenMax.delayedCall(5, colorPulse, [nameSplit.chars, true]);

	var elements = document.querySelector("main");
	TweenMax.set("main", {alpha:1});
	TweenMax.staggerFrom(elements.childNodes, 1, {alpha:0, transformOrigin:"50% 0%", scaleY:1.1, y:10, ease:Bounce.easeOut}, 0.07);

	var text = document.querySelectorAll("p");

	for(var i = 0; i < text.length; i++) {
		var element = text[i];
		if(element.className != "name") {
			var textSplit = new SplitText(element, {type:"words"});
			TweenMax.delayedCall(i, colorPulse, [textSplit.words, false]);
			TweenMax.staggerFrom(textSplit.words, 1, {alpha:0, 
													  cycle:{x:[0, ranCoord(), 0, ranCoord(), 0, ranCoord(), 0], 
													  	     y:[ranCoord(), 0, ranCoord(), 0, ranCoord(), 0, ranCoord()]}, 
													  delay:i*0.05, 
													  ease:Back.easeOut}, 0.02);
		}
	}

	var image = document.querySelector(".about-image");
	if(image) {
		TweenMax.from(image, 2, {skewY:-20, ease:Back.easeInOut, delay:0.2});
	}

	TweenMax.from(".particle-container", 2, {height:0, ease:Back.easeOut, delay:3});
	setParticles();

	var footerNav = document.querySelector("footer");
	var footerElements = footerNav.querySelectorAll("li");
	for(var n = 0; n < footerElements.length; n++) {
		var element = footerElements[n];
		element.addEventListener("mouseover", onSocialOver);
		element.addEventListener("mouseout", onSocialOut);
	}
}

function ranCoord() {
	var rc = -30 + Math.random() * 60;
	return rc;
}

function setParticles() {
	var particleContainer = document.querySelector(".particle-container");
	for(var i = 0; i < particleNum; i++) {
		addParticle(particleContainer);
	}
}

function addParticle(container) {
	var particle = document.createElement("div");
	particle.className = "particle";
	container.appendChild(particle);
	TweenMax.set(particle, {x:Math.random()*window.innerWidth, 
							rotation:-4+Math.random()*8, 
							backgroundColor:Math.random()*0xFFFFFF, 
							width:Math.random()*200, 
							height:200,
							alpha:0});
	var ranTime = 10+Math.random()*50;
	TweenMax.to(particle, 1, {alpha:1});
	TweenMax.to(particle, ranTime, {scaleX:-5+Math.random()*10, 
									x: -(window.innerWidth/2)+Math.random()*window.innerWidth,
									rotation:-4+Math.random()*8,
									ease:Power1.easeInOut});
	TweenMax.to(particle, 1, {alpha:0, delay:ranTime-10, onComplete:removeParticle, onCompleteParams:[particle, container]});
}

function removeParticle(particle, container) {
	container.removeChild(particle);
	addParticle(container);
}

function colorPulse(elementSplit, animateLogo) {
	var colorOffset = Math.random();
	for(var i = 0; i < elementSplit.length; i++) {
		var element = elementSplit[i];
		var color = i/elementSplit.length + colorOffset;
		if(color > 1) {
			color -= 1;
		}
		TweenMax.to(element, 2, {color:hslToRgb(color, Math.random(), Math.random()), ease:Quad.easeOut, delay:i*0.08});
		TweenMax.to(element, 0.5, {color:0xFFFFFF, ease:Sine.easeOut, delay:1+i*0.08});
	}

	if(animateLogo) {
		onShapeClicked(null);
	}
	TweenMax.delayedCall(10, colorPulse, [elementSplit, animateLogo]);
}

function onSocialOver(e) {
	TweenMax.to(e.target, 0.5, {scaleX:1.3, scaleY:1.3, ease:Back.easeOut});
}

function onSocialOut(e) {
	TweenMax.to(e.target, 0.5, {scaleX:1, scaleY:1, ease:Bounce.easeOut});
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
}