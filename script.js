// // Burger Menu Close / Open
// let menuIcon = document.getElementById("menu-icon");
// let links = document.querySelector("header .container nav ul");
// let closeMenuIcon = document.getElementById("close-menu-icon");

// menuIcon.addEventListener("click", function (i) {
// 	links.style.display = "flex";
// 	closeMenuIcon.style.display = "block";
// }); // Open

// closeMenuIcon.addEventListener("click", function (i) {
// 	links.style.display = "none";
// 	closeMenuIcon.style.display = "none";
// }); // Close

window.addEventListener("resize", function (e) {
	if (window.innerWidth <= 769) {
		links.style.display = "none";
	} else {
		links.style.display = "flex"
	}
});

// Create New Task Popup
let popButton = document.querySelector("div.add-task");
let addTaskPopup = document.querySelector("div.task-pop");

function openPopup(button) { // Open Popup
	addTaskPopup.style.display = "flex";
	addTaskPopup.style.animationName = "popup-opacity-open";
	popButton.classList.replace("false", "true"); 
}

function closePopup(button) { // Close Popup
	addTaskPopup.style.animationName = "popup-opacity-close";
	setTimeout(function () {
		addTaskPopup.style.display = "none";
	}, 1000);
	popButton.classList.replace("true", "false");
}

popButton.addEventListener("click", function (e) {
	if (this.classList.contains("false")) {
		openPopup(this);
	} else {
		closePopup(this);
	}
});

// Activate Create Task Button 
let taskNameInput = document.querySelector(".task-pop > input");
let createTaskButton = document.querySelector(".task-pop > button");
taskNameInput.addEventListener("blur", function (e) {
	if (e.target.value.length >= 4) {
		createTaskButton.style.cssText = `
			cursor: pointer;
			background-color: var(--main-color);
			color: white;
		`;
	}
});

createTaskButton.addEventListener("click", function (e) {
	closePopup(e.target);
	window.location.reload();
})

// Send Task Name And Type To LocalStorage
class Task {
	constructor(name, type) {
		this.name = name;
		this.type = type;
	}
}

let types = document.querySelectorAll(".task-type > input");

function taskType() {

let type; 

	types.forEach(function (t) {
		if (t.checked) {
			switch (t.id) {
			case "personal-type":
				type = "Personal";
				break;
			case "family-type":
				type = "Family";
				break;
			case "work-type":
				type = "Work";
				break;
			default:
				type = "Not Chosen";
			}
		}
	});

	return type;
}

createTaskButton.addEventListener("click", function (e) {
	localStorage.setItem(`Task ${localStorage.length + 1}`, 
		JSON.stringify(new Task(taskNameInput.value, taskType())));

});

// Load Tasks

let tasksList = document.getElementsByClassName("tasks-list")[0];

window.onload = function () {
	for (let i = 0; i < localStorage.length; i++) {
		// Create Parent Task Div
		let task = document.createElement("div");
		task.classList.add("task", "pending");

		// Create Task Info Div (Name + Type)
		let taskInfo = document.createElement("div");
		taskInfo.className = "task-info";
		let taskName = document.createElement("h2");
		taskName.textContent = JSON.parse(localStorage.getItem(localStorage.key(i))).name;
		taskInfo.append(taskName);
		let span1 = document.createElement("span");
		span1.textContent = "Type : "
		taskInfo.append(span1);
		let taskTypeSpan = document.createElement("span");
		taskTypeSpan.textContent = JSON.parse(localStorage.getItem(localStorage.key(i))).type;
		span1.append(taskTypeSpan);

		// Create Status Sign
		let taskStatus = document.createElement("span");
		taskStatus.className = "task-status";

		// Create The Full Task
		task.append(taskInfo);
		task.append(taskStatus);

		// Append The Task To The List
		tasksList.append(task);
	}
};

