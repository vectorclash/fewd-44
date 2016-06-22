var buttons;
var lights;
var redLight;
var yellowLight;
var greenLight;

function init() {
	lights = document.querySelectorAll(".traffic-light li");
	redLight = lights[0];
	yellowLight = lights[1];
	greenLight = lights[2];
	buttons = document.querySelectorAll("nav li");
	for(var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.addEventListener("click", onButtonClick);
	}

	automate();
}

function automate() {
	setGreen();
	TweenMax.delayedCall(4, setYellow);
	TweenMax.delayedCall(5, setRed);
	TweenMax.delayedCall(9, automate);
}

function onButtonClick(e) {
	switch(e.currentTarget.innerHTML) {
		case "stop":
		setRed();
		// redLight.classList.add("light-red");
		// yellowLight.classList.remove("light-yellow");
		// greenLight.classList.remove("light-green");
		break;

		case "slow":
		setYellow();
		// redLight.classList.remove("light-red");
		// yellowLight.classList.add("light-yellow");
		// greenLight.classList.remove("light-green");
		break;

		case "go":
		setGreen();
		// redLight.classList.remove("light-red");
		// yellowLight.classList.remove("light-yellow");
		// greenLight.classList.add("light-green");
		break;
	}
}

function setRed() {
	TweenMax.to(redLight, 0.5, {className:"light-red", ease:Back.easeOut});
	TweenMax.to(yellowLight, 0.5, {className:"light-off", ease:Back.easeOut});
	TweenMax.to(greenLight, 0.5, {className:"light-off", ease:Back.easeOut});
}

function setYellow() {
	TweenMax.to(redLight, 0.5, {className:"light-off", ease:Back.easeOut});
	TweenMax.to(yellowLight, 0.5, {className:"light-yellow", ease:Back.easeOut});
	TweenMax.to(greenLight, 0.5, {className:"light-off", ease:Back.easeOut});	
}

function setGreen() {
	TweenMax.to(redLight, 0.5, {className:"light-off", ease:Back.easeOut});
	TweenMax.to(yellowLight, 0.5, {className:"light-off", ease:Back.easeOut});
	TweenMax.to(greenLight, 0.5, {className:"light-green", ease:Back.easeOut});
}