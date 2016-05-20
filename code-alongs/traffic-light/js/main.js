var buttons;
var lights;

function init() {
	lights = document.querySelectorAll(".traffic-light li");
	buttons = document.querySelectorAll("nav li");
	for(var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.addEventListener("click", onButtonClick);
	}
}

function onButtonClick(e) {
	var redLight = lights[0];
	var yellowLight = lights[1];
	var greenLight = lights[2];

	switch(e.currentTarget.innerHTML) {
		case "stop":
		TweenMax.to(redLight, 0.5, {className:"light-red", ease:Bounce.easeOut});
		TweenMax.to(yellowLight, 0.5, {className:"light-off", ease:Bounce.easeOut});
		TweenMax.to(greenLight, 0.5, {className:"light-off", ease:Bounce.easeOut});
		// redLight.classList.add("light-red");
		// yellowLight.classList.remove("light-yellow");
		// greenLight.classList.remove("light-green");
		break;

		case "slow":
		TweenMax.to(redLight, 0.5, {className:"light-off", ease:Bounce.easeOut});
		TweenMax.to(yellowLight, 0.5, {className:"light-yellow", ease:Bounce.easeOut});
		TweenMax.to(greenLight, 0.5, {className:"light-off", ease:Bounce.easeOut});
		// redLight.classList.remove("light-red");
		// yellowLight.classList.add("light-yellow");
		// greenLight.classList.remove("light-green");
		break;

		case "go":
		TweenMax.to(redLight, 0.5, {className:"light-off", ease:Bounce.easeOut});
		TweenMax.to(yellowLight, 0.5, {className:"light-off", ease:Bounce.easeOut});
		TweenMax.to(greenLight, 0.5, {className:"light-green", ease:Bounce.easeOut});
		// redLight.classList.remove("light-red");
		// yellowLight.classList.remove("light-yellow");
		// greenLight.classList.add("light-green");
		break;
	}
}