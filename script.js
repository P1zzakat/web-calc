const screen = document.querySelector(".screen");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".del");
const calcButton = document.querySelector(".calc-operator");
const numberButtonsArray = [...document.querySelectorAll(".number")];
const operatorButtonsArray = [...document.querySelectorAll(".operator")];

let currentNum;
let nextNum;
let operator;
let fake = false;

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
        clear();
        return;
    }
    return (a / b).toFixed(3);
}

function setScreenText(str) {
    screen.textContent = str;
}

function addScreenText(str) {
    screen.textContent += str;
}

function clear() {
    currentNum = null;
    nextNum = null;
    screen.textContent = "";
}

function del() {
    screen.textContent = screen.textContent.slice(0, -1);
}

function operate() {
    if (!currentNum || !operator) return;
    fake = false;
    nextNum = screen.textContent;
    currentNum = operatorObject[operator](Number(currentNum), Number(nextNum));
    setScreenText(currentNum);
    currentNum = null;
}

function handleNumberButton(event) {
    if(fake) {
        fake = false;
        setScreenText('');
    }
    const str = event;
    const screenText = screen.textContent;
    if (!(str === "." && (screenText.includes(".") || !screenText)))
        addScreenText(str);
}

function handleOperatorButton(event) {
    if (operator && !screen.textContent) return;
    if (!screen.textContent) return;
    if (currentNum) {
        operate();
        fake = true
    }
    currentNum = screen.textContent;
    operator = event;
    if (!fake) setScreenText('');
}

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", del);
calcButton.addEventListener("click", operate);

for (numberButton of numberButtonsArray) {
    numberButton.addEventListener("click", (e) => handleNumberButton(e.target.textContent));
}

for (operatorButton of operatorButtonsArray) {
    operatorButton.addEventListener("click", (e) => handleOperatorButton(e.target.textContent));
}

// Keyboard support

document.addEventListener('keydown', (event) => {
    if (Number.isInteger(parseInt(event.key)) || event.key === '.') handleNumberButton(event.key);
    if (operators.includes(event.key)) handleOperatorButton(event.key);
    if (event.key === 'Backspace' && event.shiftKey) clear();
    if (event.key === 'Backspace') del();
    if (event.key === 'Enter') operate();
});
