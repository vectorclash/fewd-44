var fahrenheitField;
var celsiusField;
var sign;
var footer;
var particleNum = 10;
var currentParticles = 0;
var maxParticles = 100;
var time = 0.0;
var interval = 0.005;

function init() {
	sign = document.querySelector(".sign");
	footer = document.querySelector("footer");
	initParticles(footer);
	// set field elements
	fahrenheitField = document.querySelector(".fahrenheit");
	celsiusField = document.querySelector(".celsius");

	// set event listeners
	fahrenheitField.addEventListener("keyup", onFahrenheitUpdate);
	fahrenheitField.addEventListener("focus", onFieldFocus);
	celsiusField.addEventListener("keyup", onCelsiusUpdate);
	celsiusField.addEventListener("focus", onFieldFocus);

	TweenMax.ticker.addEventListener("tick", loop);
}

// particle field effect
// ---------------------

function initParticles(container) {
	particleContainer = container;
	for(var i = 0; i < particleNum; i++) {
		if(currentParticles <= maxParticles) {
			var particle = document.createElement("div");
			particle.className = "particle";
			container.appendChild(particle);
			var ranSize = Math.random();
			var ranTime = 20 + Math.random() * 40;
			var ranX = -200+((Math.random()*window.innerWidth)+200);
			particle.x = ranX;
			TweenMax.set(particle, {scaleX:ranSize, scaleY:ranSize, y:200, x:ranX});
			TweenMax.to(particle, ranTime, {y:-(window.innerHeight/2), ease:Back.easeOut, delay:i*0.5});
			TweenMax.to(particle, ranTime/2, {backgroundColor:Math.random()*0xFFFFFF, alpha:0, scaleX:ranSize-0.2, scaleY:ranSize-0.2, ease:Back.easeOut, delay:ranTime/3+(i*0.5), onComplete:removeParticle, onCompleteParams:[particle, container]});
		}
	}

	TweenMax.delayedCall(Math.random()*20, initParticles, [container]);
}

function removeParticle(particle, container) {
	container.removeChild(particle);
	currentParticles--;
}

// animations
// ----------

function colorPulse(field) {
	TweenMax.to(sign, 0.2, {color:Math.random()*0xFFFFFF});
	TweenMax.to(sign, 0.5, {color:0xFF284C, delay:0.21});

	TweenMax.to(field, 0.2, {backgroundColor:0xFF3E5C});
	TweenMax.to(field, 0.5, {backgroundColor:0xFFFFFF, delay:0.21, ease:Expo.easeOut});
}

// Render loop

function loop() {

	for(var i = 0; i < particleContainer.children.length; i++) {
		var particle = particleContainer.children[i];
		TweenMax.set(particle, {x:particle.x+noise.perlin2(particle.x, time)*100});
	}

	time += interval;
}

// event listeners
// ---------------

function onCelsiusUpdate() {
	var conversion = (celsiusField.value * 1.8) + 32;
	fahrenheitField.value = conversion.toFixed(1);
	colorPulse(fahrenheitField);
}

function onFahrenheitUpdate() {
	var conversion = (fahrenheitField.value - 32) * 0.5556;
	celsiusField.value = conversion.toFixed(1);
	colorPulse(celsiusField);
}

function onFieldFocus(e) {
	e.currentTarget.value = "";
}