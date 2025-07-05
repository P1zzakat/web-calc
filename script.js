const screen = document.querySelector('.screen');
const clearButton = document.querySelector('.clear'); 
const deleteButton = document.querySelector('.del');
const calcButton = document.querySelector('.calc-operator')
const textButtonsArray = [...document.querySelectorAll('.number'), ...document.querySelectorAll('.operator')]

const operators = ['/', '*', '-', '+'];
const nonStartingChars = ['.', ...operators];

let isNextCalc = false;

function add(a, b) {
    return a + b ? a + b : alert('Wrong Format! (Trying to add dots together?)');
}

function subtract(a, b) {
    return a - b ? a - b : alert('Wrong Format! (Trying to add dots together?)');
}

function multiply(a, b) {
    return a * b ? a * b : alert('Wrong Format! (Trying to add dots together?)');
}

function divide(a, b) {
    if (b === 0) {
        console.log(b);
        alert('Can\'t divide by 0!');
        return;
    }
    return a / b ? a / b : alert('Wrong Format! (Trying to add dots together?)');
}

function calc() {
    const text = screen.textContent;
    let result;
    if (text.includes('+')) {
        const splitText = text.split('+');
        a = Number(splitText[0]);
        b = Number(splitText[1]);
        if (!splitText[1]) {
            alert('Wrong Format!');
            return;
        }
        isNextCalc = true;
        result = add(a, b);
    } else if (text.includes('-')) {
        const splitText = text.split('-');
        a = Number(splitText[0]);
        b = Number(splitText[1]);
        if (!splitText[1]) {
            alert('Wrong Format!');
            return;
        }
        isNextCalc = true;
        result = subtract(a, b);
    } else if (text.includes('*')) {
        const splitText = text.split('*');
        a = Number(splitText[0]);
        b = Number(splitText[1]);
        if (!splitText[1]) {
            alert('Wrong Format!');
            return;
        }
        isNextCalc = true;
        result = multiply(a, b);
    } else if (text.includes('/')) {
        const splitText = text.split('/');
        a = Number(splitText[0]);
        b = Number(splitText[1]);
        if (!splitText[1]) {
            alert('Wrong Format!');
            return;
        }
        isNextCalc = true;
        result = divide(a, b);
    }
    screen.textContent = Number.isInteger(result) ? result : result.toFixed(3);
}

function setScreenText(str) {
    screen.textContent = str;
}

function clear() {
    screen.textContent = '';
}

function del() {
    screen.textContent = screen.textContent.slice(0, -1);
}

function handleTextButton(event) {
    if (isNextCalc) clear();
    isNextCalc = false;
    const str = event.target.textContent;
    const screenText = screen.textContent;
    if (!screenText && nonStartingChars.includes(str)) return;
    if (operators.includes(str) && operators.some(char => screenText.includes(char))) return;
    screen.textContent += str;
}

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
calcButton.addEventListener('click', calc);

for (textButton of textButtonsArray) {
    textButton.addEventListener('click', handleTextButton)
}


