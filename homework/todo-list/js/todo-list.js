// setup

var events;
var addButton;
var taskField;
var dateField;

function init() {
	events = document.querySelector("ol");
	for(var i = 0; i < events.children.length; i++) {
		var event = events.children[i];
		var check = event.children[0];
		check.addEventListener("click", onCheckboxClicked);
	}

	taskField = document.querySelector(".task-field");
	dateField = document.querySelector(".date-field");
	addButton = document.querySelector("button");

	addButton.addEventListener("click", onAddClicked);
}

// event liseners

function onAddClicked(e) {
	e.preventDefault();
	addEvent();
}

function onCheckboxClicked(e) {
	var myParent = e.currentTarget.parentElement;
	if(e.currentTarget.checked) {
		myParent.classList.add("checked");
	} else {
		myParent.classList.remove("checked");
	}
}

// update page

function addEvent() {
	var newLi = document.createElement("li");
	var newTask;
	var newDate;
	var event = "";
	if(taskField.value) {
		newTask = "<span class='event-name'>" + taskField.value + "</span>";
		event += newTask;

		if(dateField.value) {
			newDate = "<span class='event-date'>(" + dateField.value + ")</span>";
			event += newDate;
		}

		var input = document.createElement("input");
		input.type = "checkbox";
		newLi.appendChild(input);
		newLi.innerHTML += event;
		newLi.children[0].addEventListener("click", onCheckboxClicked);
		events.appendChild(newLi);

		// animate in the new li
		TweenMax.from(newLi, 1, {height:0, alpha:0, y:10, ease:Back.easeOut});

		taskField.value = "";
		dateField.value = "";
	} else {
		// flash red for error
		TweenMax.to(taskField, 0.3, {backgroundColor:0xFF174B, ease:Quad.easeOut});
		TweenMax.to(taskField, 0.2, {backgroundColor:0xFFFFFF, ease:Bounce.easeOut, delay:0.3});
	}
}

// utility functions