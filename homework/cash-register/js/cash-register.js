// Variables
// ------------------------------------------------
var entries;
var total;
var input;

// Setup
// ------------------------------------------------

function init() {
	entries = document.querySelector(".entries");
	total = document.querySelector(".total");
	input = document.querySelector("input");

	// set event listeners
	input.addEventListener("keypress", onInputKeyPress);
}


// Event handler functions
// ------------------------------------------------

function onInputKeyPress(e) {
	switch(e.keyCode) {
		case 13:
		e.preventDefault();
		if(e.currentTarget.value) {
			var price = Number(e.currentTarget.value);
			addEntry(price);
		}
		e.currentTarget.value = "";
		break;
	}
}

// Update page functions
// ------------------------------------------------

function addEntry(value) {
	updateTotal(value);
	var newEntry = document.createElement("li");
	newEntry.textContent = "$" + value.toFixed(2);

	if(newEntry.textContent.indexOf('.') == -1)
	{
		newEntry.textContent += ".00";
	}

	entries.appendChild(newEntry);

	var entrySplit = new SplitText(newEntry, {type:"chars"});
	var chars = entrySplit.chars;
	TweenMax.staggerFrom(chars, 0.5, {y:10, alpha:0, skewY:-10, delay:0.1, ease:Bounce.easeOut}, 0.07);
	TweenMax.from(newEntry, 0.5, {height:0, ease:Back.easeOut});
}

// Utility functions
// ------------------------------------------------


function updateTotal(value) {
	var currentTotal = Number(total.textContent.replace("$", ""));
	var newTotal = currentTotal+=value;
	var fixedTotal = newTotal.toFixed(2);
	var signedTotal = "$" + fixedTotal;

	if(signedTotal.indexOf('.') == -1)
	{
		signedTotal += ".00";
	}

	TweenMax.to(total, 1, {text:signedTotal, ease:Linear.easeNone});
	//total.textContent = signedTotal;
}