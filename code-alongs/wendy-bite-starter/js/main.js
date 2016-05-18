function init() {
	var elements = document.querySelector("main");
	TweenMax.set("main", {alpha:1});
	TweenMax.staggerFrom(elements.childNodes, 1, {alpha:0, transformOrigin:"50% 0%", scaleY:1.1, y:10, ease:Bounce.easeOut}, 0.07);

	var text = document.querySelectorAll("p");
	for(var i = 0; i < text.length; i++) {
		var element = text[i];
		if(element.className != "name") {
			var textSplit = new SplitText(element, {type:"words"});
			TweenMax.staggerFrom(textSplit.words, 1, {alpha:0, y:20, delay:i*0.05, ease:Back.easeOut}, 0.02);
		}
	}

	var image = document.querySelector("img");
	if(image) {
		TweenMax.from(image, 1, {x:150, rotationY:90, skewY:20, ease:Bounce.easeOut, delay:1});
	}
}