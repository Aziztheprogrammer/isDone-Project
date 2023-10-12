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

// window.addEventListener("resize", function (e) {
// 	if (window.innerWidth <= 769) {
// 		links.style.display = "none";
// 	} else {
// 		links.style.display = "flex"
// 	}
// });

// Create New Task Popup
let popButton = document.querySelector("div.add-task");
let addTaskPopup = document.querySelector("div.task-pop");
popButton.addEventListener("click", function (e) {
	addTaskPopup.style.display = "flex";
	addTaskPopup.style.animationName = "popup-opacity";
}); // Open Popup

let closePopup = window.getComputedStyle(
    document.querySelector(".task-pop"), '::after'
);

closePopup.addEventListener("click", function (e) {
	addTaskPopup.style.display = "none";
});
