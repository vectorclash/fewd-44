
// Structure
// ------------------------------------------------
var input = document.querySelector(".task-item");
var taskButton = document.querySelector("button");
var itemsList = document.querySelector(".items");
var date = document.querySelector(".date");

// Setup
// ------------------------------------------------

var todoList = {
	tasks: []
}

// Events
// ------------------------------------------------
taskButton.addEventListener("click", submitForm);
window.addEventListener("load", reloadPage);

// Event Handlers
//

function submitForm(e) {
	var task = {
		name: input.value,
		date: date.value,
		complete: false
	};

	todoList.tasks.push(task);

	localStorage.setItem("todoList", JSON.stringify(todoList));

	//createTask(task);
	createTodoList();
}

function reloadPage(e) {
	todoList = JSON.parse(localStorage.getItem("todoList"));
	createTodoList();
}

function onCheckboxClick(e) {
	//todoList.tasks[e.target.myID].complete = e.target.checked;
	if(e.target.checked == true) {
		todoList.tasks.splice(e.target.myID);
	}
	
	localStorage.setItem("todoList", JSON.stringify(todoList));
}


// Update Page
// ------------------------------------------------

function createTodoList() {
	itemsList.innerHTML = "";
	todoList.tasks.forEach(createTask);
}

function createTask(task, index) {

	var addLi = document.createElement("li");
	var checkbox = document.createElement("input");
	var labelTask = document.createElement("label");
	var labelDate = document.createElement("label");

	checkbox.setAttribute("type", "checkbox");
	checkbox.checked = task.complete;
	checkbox.myID = index;
	checkbox.addEventListener("click", onCheckboxClick);
	labelTask.textContent = task.name;
	labelDate.textContent = "(" + task.date + ")";
	labelDate.classList.add("gray");

	itemsList.appendChild(addLi);
	addLi.appendChild(checkbox);
	addLi.appendChild(labelTask);
	addLi.appendChild(labelDate);
}
