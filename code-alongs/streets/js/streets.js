var inputField;
var submitButton;
var directions;
var streets = new Array();

function init() {
	inputField = document.querySelector("input");
	submitButton = document.querySelector("button");
	directions = document.querySelector(".directions");

	// set event listeners
	inputField.addEventListener("focus", onInputFocus);
	submitButton.addEventListener("click", onSubmitClicked);
}

// event handlers

function onInputFocus(e) {
	inputField.value = "";
}

function onSubmitClicked(e) {
	e.preventDefault();
	if(inputField.value != "") {
		streets.push(inputField.value);
		addStreet(inputField.value);
	} else {
		console.log("Input value was not valid");
	}
	
	inputField.value = "";
}

// update page

function addStreet(street) {
	var newStreet = document.createElement("li");
	newStreet.textContent = street;
	directions.appendChild(newStreet);
}