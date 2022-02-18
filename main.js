const numberButtons = document.querySelectorAll('.buttons__num'),
    operatorButtons = document.querySelectorAll('.operator');

const display = document.querySelector('.calc__display-result'),
    clearButton = document.querySelector('.buttons__clear'),
    backspaceButton = document.querySelector('.buttons__backspace'),
    divideButton = document.querySelector('.buttons__divide'),
    multiplyButton = document.querySelector('.buttons__multiply'),
    minusButton = document.querySelector('.buttons__minus'),
    plusButton = document.querySelector('.buttons__plus'),
    equalButton = document.querySelector('.buttons__equal');

let firstNum = '',
    secondNum = '',
    mathSign = '',
    isCalculated = false;

function clearDisplay() {
    display.textContent = '';
    firstNum = '';
    secondNum = '';
    mathSign = '';
}

function calc(operator, a, b) {
    const operations = {
        '+': a + b,
        '×': a * b,
        '–': a - b,
        '÷': a / b,
    };

    return operations[operator];
}

function stringLimite() {
    if (display.textContent.length >= 6) {
        display.style.fontSize = '68px';

        if (display.textContent.length >= 8) {
            display.style.fontSize = '48px';

            if (display.textContent.length >= 11) {
                display.style.fontSize = '28px';
            }
        }
    } else {
        display.style.fontSize = '96px';
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (isCalculated && firstNum && !mathSign) {
            clearDisplay();
        }

        display.textContent += button.textContent;

        if (secondNum === '' && mathSign === '') {
            firstNum += button.textContent;
        }

        if (mathSign && firstNum) {
            secondNum += button.textContent;
        }

        if (firstNum[0] === '0' && firstNum.length > 1) {
            display.textContent = display.textContent.slice(1);
            firstNum = firstNum.slice(1);
        }

        if (secondNum[0] === '0' && secondNum.length >= 2) {
            secondNum = secondNum.slice(1);
            display.textContent = display.textContent.slice(0, display.textContent.length - 2) + secondNum;
        }

        isCalculated = false;
        stringLimite();
    });
});

operatorButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        if ('÷×–+'.includes(display.textContent[display.textContent.length - 1])) return;

        if (display.textContent !== '') {
            display.textContent += operator.textContent;
            mathSign = operator.textContent;
        }

        if (mathSign && firstNum && secondNum) {
            let result = calc(mathSign, +firstNum, +secondNum);

            if (!isFinite(result)) return;

            display.textContent = result + operator.textContent;
            firstNum = String(result);
            secondNum = '';
            mathSign = operator.textContent;
        }

        stringLimite();
    });
});

clearButton.addEventListener('click', () => {
    clearDisplay();
    stringLimite();
});

backspaceButton.addEventListener('click', () => {
    if (display.textContent.length <= 1) {
        clearDisplay();
    }

    if (firstNum && mathSign) {
        secondNum = secondNum.slice(0, secondNum.length - 1);
    }
    if (!secondNum && !mathSign) {
        firstNum = firstNum.slice(0, firstNum.length - 1);
    }
    if (!secondNum && '÷×–+'.includes(display.textContent[display.textContent.length - 1])) {
        mathSign = '';
    }

    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    stringLimite();
});

equalButton.addEventListener('click', () => {
    if (!mathSign || !firstNum || !secondNum) return;

    let result = calc(mathSign, +firstNum, +secondNum);

    if (!isFinite(result)) return;

    display.textContent = result;
    firstNum = String(result);
    secondNum = '';
    mathSign = '';
    stringLimite();
    isCalculated = true;
});
