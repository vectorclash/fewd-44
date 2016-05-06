var elements;
var logo;
var linkContainer;

function init() {
	linkContainer = document.querySelector("#link-container");
	var newLi = document.createElement("li");
	newLi.innerHTML = "<a href='linkorsomething.html'><h3>She done already had herses</h3></a>";
	linkContainer.appendChild(newLi);

	logo = document.querySelector(".logo");
	TweenMax.from(logo, 2, {alpha:0, delay:1, ease:Quad.easeOut});
	elements = document.querySelectorAll("a");
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