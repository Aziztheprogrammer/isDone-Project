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
		createTaskButton.setAttribute("clickable", "");
		createTaskButton.removeAttribute("not-clickable");
		createTaskButton.addEventListener("click", function activateButton(e) {
			closePopup(e.target);
			window.location.reload();
		});
	} else {
		createTaskButton.removeAttribute("clickable");
		createTaskButton.setAttribute("not-clickable");
		createTaskButton.addEventListener("click", function desactivateButton(e) {
			e.preventDefault();
		});
	}
});

// Send Task Name And Type To LocalStorage
class Task {
	constructor(name, type = "Not Chosen", status) {
		this.name = name;
		this.type = type;
		this.status = status;
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
			}
		}
	});

	return type;
}

createTaskButton.addEventListener("click", function (e) {
	if (this.getAttribute("clickable") == "") {
		localStorage.setItem(`Task ${localStorage.length + 1}`, 
			JSON.stringify(new Task(taskNameInput.value, taskType(), "pending")));
	}
});

// Load Tasks

let tasksList = document.getElementsByClassName("tasks-list")[0];

window.onload = function () {
	for (let i = 0; i < localStorage.length; i++) {
		// Create Parent Task Div
		let task = document.createElement("div");
		task.setAttribute("taskname", `Task ${i + 1}`);
		task.classList.add("task", JSON.parse(localStorage.getItem(task.getAttribute("taskname"))).status);

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

		// Create Finish Task Icon
		let finishTask = document.createElement("i");
		finishTask.classList.add("fa-solid", "fa-circle");

		if (task.classList.contains("pending")) {
			finishTask.style.cssText = `
				color: #FFFFFF;
				border: #FF914D 2px solid;
				border-radius: 50%;
				cursor: pointer;
			`;

			// Finish A Pending Task
			finishTask.addEventListener("click", function (e) {
				window.location.reload();
				setTimeout(function () {
					e.target.parentElement.classList.replace("pending", "finished");
					this.style.cssText = `
						border: none;
						color: var(--main-color);
					`;
				}, 1000);
				localStorage.setItem(e.target.parentElement.getAttribute("taskname"), 
				JSON.stringify(new Task(JSON.parse(localStorage.getItem(e.target.parentElement.getAttribute("taskname"))).name, 
					JSON.parse(localStorage.getItem(e.target.parentElement.getAttribute("taskname"))).type, "finished")));
			});

			// Create Cancel Button For Pending Tasks
			var cancelTask = document.createElement("i");
			cancelTask.classList.add("fa-solid", "fa-ban");
			cancelTask.style.cssText = `
				font-size: 18px;
				color: #FF3131;
				position: absolute;
				right: 50px;
				top: 50%;
				transform: translateY(-50%);
			`;

			// Cancel A Pending Task
			cancelTask.addEventListener("click", function (e) {
				window.location.reload();
				setTimeout(function () {
					e.target.parentElement.classList.replace("pending", "canceled");
					this.style.cssText = `
						border: none;
						color: #FF3131;
					`;
				}, 1000);

				localStorage.setItem(e.target.parentElement.getAttribute("taskname"), 
				JSON.stringify(new Task(JSON.parse(localStorage.getItem(e.target.parentElement.getAttribute("taskname"))).name, 
					JSON.parse(localStorage.getItem(e.target.parentElement.getAttribute("taskname"))).type, "canceled")));
			});

			task.append(cancelTask);

		} else if (task.classList.contains("finished")) {
			finishTask.style.cssText = `
				border-radius: 50%;
				cursor: default;
				border: none;
				color: var(--main-color);
			`;
		} else if (task.classList.contains("canceled")) {
			finishTask.style.cssText = `
				border-radius: 50%;
				cursor: default;
				border: none;
				color: #FF3131;
			`;
		}

		// Create The Full Task
		task.append(taskInfo);
		task.append(finishTask);

		// Append The Task To The List
		tasksList.append(task);
	}
};

// Create Focus Effect On Tasks 
let pendingTasks = document.getElementsByClassName("pending");
let finishedTasks = document.getElementsByClassName("finished");
let canceledTasks = document.getElementsByClassName("canceled");

console.log(pendingTasks);

Array.from(pendingTasks).forEach(function (task) {
	console.log(task.nodeName);
});



