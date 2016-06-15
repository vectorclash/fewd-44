// Variables
// ------------------------------------------------
var entries;
var total;
var input;
var form;
var receipt = {
	lineItems: [],
	total: "$0.00",
};

// Setup
// ------------------------------------------------

function init() {
	entries = $(".entries");
	total = $(".total");
	input = $("input");
	form = $("form");

	// set event listeners
	form.on("submit", onInputKeyPress);
}


// Event handler functions
// ------------------------------------------------

function onInputKeyPress(event) {
	event.preventDefault();
	if(input.val()) {
		var price = Number(input.val());
		addEntry(price);
	}
	input.val("");
}

// Update page functions
// ------------------------------------------------

function addEntry(value) {
	updateTotal(value);
	var newEntry = $("<li>");
	newEntry.text("$" + value.toFixed(2));

	if(newEntry.text().indexOf('.') == -1)
	{
		newEntry.text() += ".00";
	}

	receipt.lineItems.push(Number(newEntry.text().replace("$", "")));
	entries.append(newEntry);

	var entrySplit = new SplitText(newEntry, {type:"chars"});
	var chars = entrySplit.chars;
	TweenMax.staggerFrom(chars, 0.5, {y:10, alpha:0, skewY:-10, delay:0.1, ease:Bounce.easeOut}, 0.07);
	TweenMax.from(newEntry, 0.5, {height:0, ease:Back.easeOut});
}

function updateTotal(value) {
	var currentTotal = Number(total.text().replace("$", ""));
	var newTotal = currentTotal+=value;
	var fixedTotal = newTotal.toFixed(2);
	var signedTotal = "$" + fixedTotal;

	if(signedTotal.indexOf('.') == -1) {
		signedTotal += ".00";
	}

	TweenMax.to(total, 1, {text:signedTotal, ease:Linear.easeNone});
	//total.text() = signedTotal;
}

function createReceipt() {
	receipt.lineItems.forEach(addEntry);
}

// Utility functions
// ------------------------------------------------
