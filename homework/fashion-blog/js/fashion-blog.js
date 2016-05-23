var navButtons;
var articles;

function init() {
	navButtons = document.querySelectorAll("li");
	for(var h = 0; h < navButtons.length; h++) {
		var button = navButtons[h];
		TweenMax.from(button, 1, {y:20, alpha:0, ease:Bounce.easeOut, delay:h*0.2});
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