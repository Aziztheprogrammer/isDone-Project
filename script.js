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
popButton.addEventListener("click", function (e) {
	if (this.classList.contains("false")) {
		addTaskPopup.style.display = "flex";
		addTaskPopup.style.animationName = "popup-opacity-open";
		this.classList.replace("false", "true"); // Open Popup
	} else {
		addTaskPopup.style.animationName = "popup-opacity-close";
		setTimeout(function () {
			addTaskPopup.style.display = "none";
		}, 1000);
		this.classList.replace("true", "false"); // Close Popup
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


// Send Task Name And Type To LocalStorage
let tasks = [];

class Task {
	constructor(name, type) {
		this.name = name;
		this.type = type;
	}
}

createTaskButton.addEventListener("click", function (e) {
	tasks.unshift(new Task(taskNameInput.value, null));
	localStorage.setItem(`Tasks ${tasks.length}`, JSON.stringify(tasks[0]));

});

