const screen = document.querySelector(".screen");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".del");
const calcButton = document.querySelector(".calc-operator");
const numberButtonsArray = [...document.querySelectorAll(".number")];
const operatorButtonsArray = [...document.querySelectorAll(".operator")];

let curretNum;
let nextNum;
let operator;

const operators = ["/", "*", "-", "+"];
const nonStartingChars = [".", ...operators];

const operatorObject = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Can't divide by 0!");
        return;
    }
    return (a / b).toFixed(3);
}

function operate() {
    let nextNum = screen.textContent;
    let result = operatorObject[operator](Number(currentNum), Number(nextNum));
    setScreenText(result);
}

function setScreenText(str) {
    screen.textContent = str;
}

function addScreenText(str) {
    screen.textContent += str;
}

function clear() {
    screen.textContent = "";
}

function del() {
    screen.textContent = screen.textContent.slice(0, -1);
}

function handleNumberButton(event) {
    const str = event.target.textContent;
    const screenText = screen.textContent;
    if (!(str === "." && (screenText.includes(".") || !screenText)))
        addScreenText(str);
}

function handleOperatorButton(event) {
    if (!screen.textContent) return;
    currentNum = screen.textContent;
    operator = event.target.textContent;
    clear();
}

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", del);
calcButton.addEventListener("click", operate);

for (numberButton of numberButtonsArray) {
    numberButton.addEventListener("click", handleNumberButton);
}

for (operatorButton of operatorButtonsArray) {
    operatorButton.addEventListener("click", handleOperatorButton);
}
