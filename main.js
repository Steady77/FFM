import { UI_ELEMS } from './view.js';

let firstOperand = '',
    secondOperand = '',
    mathSign = '',
    isCalculated = false;

function clearDisplay() {
    UI_ELEMS.DISPLAY.textContent = '';
    firstOperand = '';
    secondOperand = '';
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

function fontSizeLimite() {
    const fontSizes = {
        6: '68px',
        8: '48px',
        11: '28px',
    };

    if (!fontSizes[UI_ELEMS.DISPLAY.textContent.length]) {
        return;
    }

    UI_ELEMS.DISPLAY.style.fontSize = fontSizes[UI_ELEMS.DISPLAY.textContent.length];
}

function formatZeroDisplay() {
    if (firstOperand[0] === '0' && firstOperand.length > 1) {
        UI_ELEMS.DISPLAY.textContent = UI_ELEMS.DISPLAY.textContent.slice(1);
        firstOperand = firstOperand.slice(1);
    }

    if (secondOperand[0] === '0' && secondOperand.length >= 2) {
        secondOperand = secondOperand.slice(1);
        UI_ELEMS.DISPLAY.textContent =
            UI_ELEMS.DISPLAY.textContent.slice(0, UI_ELEMS.DISPLAY.textContent.length - 2) + secondOperand;
    }
}

function getLastChar() {
    return UI_ELEMS.DISPLAY.textContent[UI_ELEMS.DISPLAY.textContent.length - 1];
}

UI_ELEMS.NUMBERS.forEach(button => {
    button.addEventListener('click', () => {
        if (isCalculated && firstOperand && !mathSign) {
            clearDisplay();
        }

        UI_ELEMS.DISPLAY.textContent += button.textContent;

        if (secondOperand === '' && mathSign === '') {
            firstOperand += button.textContent;
        }

        if (mathSign && firstOperand) {
            secondOperand += button.textContent;
        }

        formatZeroDisplay();
        fontSizeLimite();

        isCalculated = false;
    });
});

UI_ELEMS.OPERATORS.forEach(operator => {
    operator.addEventListener('click', () => {
        if ('÷×–+'.includes(getLastChar())) return;

        if (UI_ELEMS.DISPLAY.textContent !== '') {
            UI_ELEMS.DISPLAY.textContent += operator.textContent;
            mathSign = operator.textContent;
        }

        if (mathSign && firstOperand && secondOperand) {
            let result = calc(mathSign, +firstOperand, +secondOperand);

            if (!isFinite(result)) return;

            UI_ELEMS.DISPLAY.textContent = result + operator.textContent;
            firstOperand = String(result);
            secondOperand = '';
            mathSign = operator.textContent;
        }

        fontSizeLimite();
    });
});

UI_ELEMS.CLEAR_BUTTON.addEventListener('click', () => {
    clearDisplay();
    fontSizeLimite();
});

UI_ELEMS.BACKSPACE_BUTTON.addEventListener('click', () => {
    if (UI_ELEMS.DISPLAY.textContent.length <= 1) {
        clearDisplay();
    }

    if (firstOperand && mathSign) {
        secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    }

    if (!secondOperand && !mathSign) {
        firstOperand = firstOperand.slice(0, firstOperand.length - 1);
    }

    if (!secondOperand && '÷×–+'.includes(getLastChar())) {
        mathSign = '';
    }

    UI_ELEMS.DISPLAY.textContent = UI_ELEMS.DISPLAY.textContent.slice(0, UI_ELEMS.DISPLAY.textContent.length - 1);
    fontSizeLimite();
});

UI_ELEMS.EQUAL_BUTTON.addEventListener('click', () => {
    if (!mathSign || !firstOperand || !secondOperand) return;

    let result = calc(mathSign, +firstOperand, +secondOperand);

    if (!isFinite(result)) return;

    UI_ELEMS.DISPLAY.textContent = result;
    firstOperand = String(result);
    secondOperand = '';
    mathSign = '';

    fontSizeLimite();

    isCalculated = true;
});
