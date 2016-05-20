var firstNumber;
var secondNumber;
var sign;
var compare;

function init() {
	firstNumber = document.querySelector(".first-number");
	secondNumber = document.querySelector(".second-number");
	sign = document.querySelector(".sign");
	compare = document.querySelector(".compare");

	compare.addEventListener("click", onCompareClick);
}

function onCompareClick() {
	sign.textContent = "Hello!"
}