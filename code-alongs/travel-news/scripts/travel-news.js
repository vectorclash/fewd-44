var elements;
var logo;
var linkContainer;

function init() {
	linkContainer = document.querySelector("#link-container");
	createItem("She already done had herses", "#", linkContainer);

	logo = document.querySelector(".logo");
	TweenMax.from(logo, 2, {alpha:0, delay:1, ease:Quad.easeOut});
	elements = document.querySelectorAll("a");
	for(var i = 0; i < elements.length; i++) {
		var element = elements[i];
		element.addEventListener("mouseover", onElementOver);
		element.addEventListener("mouseout", onElementOut);
	}
}

function createItem(title, url, container) {
	var newLi = document.createElement("li");
	newLi.innerHTML = "<a href='" + url + "'><h3>" + title + "</h3></a>";
	container.appendChild(newLi);
	newLi.addEventListener("mouseover", onElementOver);
	newLi.addEventListener("mouseout", onElementOut);
}

function onElementOver(e) {
	TweenMax.to(e.srcElement, 0.5, {color:0xFF235D, x:20, ease:Expo.easeOut});
}

function onElementOut(e) {
	TweenMax.to(e.srcElement, 0.5, {color:0x000000, x:0, ease:Elastic.easeOut});
}