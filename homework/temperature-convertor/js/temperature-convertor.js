var fahrenheitField;
var celsiusField;

function init() {
	fahrenheitField = document.querySelector(".fahrenheit");
	celsiusField = document.querySelector(".celsius");

	fahrenheitField.addEventListener("keyup", onFahrenheitUpdate);
	celsiusField.addEventListener("keyup", onCelsiusUpdate);
}

function onCelsiusUpdate() {
	var conversion = (celsiusField.value * 1.8) + 32;
	fahrenheitField.value = conversion.toFixed(1);
	TweenMax.from(fahrenheitField, 1, {backgroundColor:0xFF3E5C});
}

function onFahrenheitUpdate() {
	var conversion = (fahrenheitField.value - 32) * 0.5556;
	celsiusField.value = conversion.toFixed(1);
	TweenMax.from(celsiusField, 1, {backgroundColor:0xFF3E5C});
}