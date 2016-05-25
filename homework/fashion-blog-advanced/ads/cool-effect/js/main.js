var fightClimate;
var changeIn;
var three;
var two;
var one;
var makeDooDoo;
var doMore;
var fightClimateTwo;
var changeByTurning;
var pooIntoPower;
var cta;
var poopFalling;
var poop;
var main;

function init() {

	fightClimate =  document.querySelector(".fight-climate");
	changeIn = document.querySelector(".change-in");
	three = document.querySelector(".three");
	two = document.querySelector(".two");
	one = document.querySelector(".one");
	makeDooDoo =  document.querySelector(".make-doo-doo");
	doMore = document.querySelector(".do-more");
	fightClimateTwo = document.querySelector(".fight-climate-two");
	changeByTurning =  document.querySelector(".change-by-turning");
	pooIntoPower = document.querySelector(".poo-into-power");
	cta = document.querySelector(".cta");

	pig = document.querySelector(".pig");
	poopFalling = document.querySelector(".poop-falling");
	poop = document.querySelector(".poop");
	TweenMax.set(poop, {transformOrigin:"50% 100%"});

	main = document.querySelector("main");
	main.addEventListener("click", onBannerClick);

	animate();
}

function animate() {

	// Text animation

	TweenMax.to(fightClimate, 1, {alpha:1});
	TweenMax.to(changeIn, 1, {alpha:1, delay:0.4});

	TweenMax.to(three, 0.5, {alpha:1, delay:1});
	TweenMax.to(three, 0.5, {alpha:0, y:10, delay:2});

	TweenMax.to(two, 0.5, {alpha:1, delay:2.4});
	TweenMax.to(two, 0.5, {alpha:0, y:10, delay:3.4});

	TweenMax.to(one, 0.5, {alpha:1, delay:3.8});
	TweenMax.to(one, 0.5, {alpha:0, y:10, delay:4.8});

	TweenMax.to(fightClimate, 0.5, {alpha:0, delay:6});
	TweenMax.to(changeIn, 0.5, {alpha:0, delay:6});

	TweenMax.to(makeDooDoo, 0.5, {alpha:1, delay:6.4});
	TweenMax.to(doMore, 0.5, {alpha:1, delay:6.8});

	TweenMax.to(makeDooDoo, 0.5, {alpha:0, delay:8.2});
	TweenMax.to(doMore, 0.5, {alpha:0, delay:8.5});

	TweenMax.to(fightClimateTwo, 1, {alpha:1, delay:9});
	TweenMax.to(changeByTurning, 1, {alpha:1, delay:9.3});
	TweenMax.to(pooIntoPower, 1, {alpha:1, delay:9.6});
	TweenMax.to(cta, 1, {alpha:1, delay:10.5});
	TweenMax.from(cta, 1, {y:10, delay:10.5});

	// Pig animation

	TweenMax.to(pig, 0.5, {alpha:1});
	TweenMax.from(pig, 5, {x:-250, ease:Linear.easeNone});

	TweenMax.to(pig, 0.2, {y:-4, scaleY:0.98, rotation:-1, transformOrigin:"50% 0%", ease:Quad.easeOut, yoyo:true, repeat:23});

	TweenMax.to(pig, 0.5, {scaleX:1.06, rotation:1, ease:Quad.easeOut, delay:4.8});
	TweenMax.to(pig, 1, {scaleX:1, rotation:0, ease:Elastic.easeOut, delay:5.3});

	TweenMax.to(poopFalling, 0.6, {alpha:1, y:40, ease:Quad.easeOut, delay:5.4});
	TweenMax.to(poopFalling, 0.5, {alpha:0, ease:Quad.easeOut, delay:5.7, onComplete:resetPoop});

	TweenMax.to(poop, 1, {alpha:1, ease:Quad.easeOut, delay:5.7});
	TweenMax.from(poop, 1, {scaleY:1.5, scaleX:0.7, ease:Quad.easeOut, delay:5.7});

	TweenMax.to(pig, 0.5, {scaleX:1.06, rotation:1, ease:Quad.easeOut, delay:9.6});
	TweenMax.to(pig, 1, {scaleX:1, rotation:0, ease:Elastic.easeOut, delay:10});

	TweenMax.to(poopFalling, 0.6, {alpha:1, y:40, ease:Quad.easeOut, delay:10});
	TweenMax.to(poopFalling, 0.5, {alpha:0, ease:Quad.easeOut, delay:10.3});

	TweenMax.to(poop, 1, {scaleY:1.4, ease:Quad.easeOut, delay:10.2});
	TweenMax.to(poop, 1, {scaleX:1.3, ease:Quad.easeOut, delay:10.3});
}

function resetPoop() {
	TweenMax.set(poopFalling, {y:0, alpha:0});
}

function onBannerClick(e) {
	window.open(window.clickTag);
}