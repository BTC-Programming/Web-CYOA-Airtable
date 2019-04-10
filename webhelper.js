// webhelper.js
window.onload = start;
var options=[];
var buttonElement = document.getElementById("button1");
var currentStoryElement = document.getElementById("currentStory");
var dropdown = document.getElementById("choices");
var messages = [];
var choices;
var answer;
var textTimer;

function start() {
    getScene(OPENING_SCENE_ID);
}

function setup() {
    setOptions([{ choice: "No DB", target: "" }]);
    buttonElement.innerHTML = "What will you do?"; 
    buttonElement.setAttribute("onclick", "getScene(dropdown.value)");
}

function setOptions(options) {
    var dropdown = document.getElementById("choices");
    while (dropdown.options.length) {
        dropdown.remove(0);
    }
    for (var i = 0; i < options.length; i++) {
		// This is object-oriented JavaScript (hence capital letter)
        var option = new Option(options[i].choice, options[i].target);
        dropdown.options.add(option);
    }
}

function displayStory(text) {
    currentStoryElement.innerHTML = text;
}