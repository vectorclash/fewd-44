var firstNumber;
var secondNumber;
var sign;
var compare;

function init() {
	firstNumber = document.querySelector(".first-number");
	secondNumber = document.querySelector(".second-number");
	sign = document.querySelector(".sign");
	compare = document.querySelector(".compare");

	// set event listeners
	compare.addEventListener('click', onCompareClick);
}

// Event Handlers
// ----------------------------------------
// update the page - change the sign

function onCompareClick() {
	compare.removeEventListener("click", onCompareClick);

	var firstValue = parseInt(firstNumber.value);
	var secondValue = parseInt(secondNumber.value);

	var newSymbol = "null";
	if(firstValue > secondValue) {
		newSymbol = ">";
	} else if(firstValue < secondValue) {
		newSymbol = "<";
	} else if(firstValue == secondValue) {
		newSymbol = "=";
	}

	sign.textContent = newSymbol;
	TweenMax.from(firstNumber, 0.5, {transformOrigin:"50% 100%", scaleY:0, ease:Back.easeOut});
	TweenMax.from(sign, 0.5, {alpha:0, ease:Back.easeOut, delay:0.2});
	TweenMax.from(secondNumber, 0.5, {transformOrigin:"50% 100%", scaleY:0, ease:Back.easeOut, delay:0.4, onComplete:function(){compare.addEventListener("click", onCompareClick);}});
}