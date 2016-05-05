var elements;

function init() {
	elements = document.getElementsByTagName("a");
	for(var i = 0; i < elements.length; i++) {
		var element = elements[i];
		element.addEventListener("mouseover", onElementOver);
		element.addEventListener("mouseout", onElementOut);
	}
}

function onElementOver(e) {
	TweenMax.to(e.srcElement, 0.5, {color:0xFF235D, x:20, ease:Expo.easeOut});
}

function onElementOut(e) {
	TweenMax.to(e.srcElement, 0.5, {color:0x000000, x:0, ease:Elastic.easeOut});
}