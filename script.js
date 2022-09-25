//class function
class Calculator {
    constructor(prevState, currState) {
        this.prevState = prevState;
        this.currState = currState;
        this.clearScreen();
    }

    clearScreen() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operator = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    operatorChoosed(operator) {
        if(this.currOperand === '') return;
        if(this.prevOperand !== '') {
            this.calculate();
        }

        this.operator = operator;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    calculate() {
        let calculation
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);

        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operator) {
            case '+':
                calculation = prev + curr;
                break;
            case '-':
                calculation= prev - curr;
                break;
            case '*':
                calculation= prev * curr;
                break;
            case '÷':
                calculation= prev / curr;
                break;
            default:
                return
        }

        this.currOperand = calculation;
        this.operator = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number) {
        const string = number.toString();
        const int = parseFloat(string.split('.')[0]);
        const decimal = string.split('.')[1];
        
        let intDisplay;

        if(isNaN(int)) {
            intDisplay = ''
        } else {
            intDisplay = int.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if(decimal != null) {
            return `${intDisplay}.${decimal}`
        } else {
            return intDisplay
        }
    }

    updateStateDisplay() {
        this.currState.innerText = this.getDisplayNumber(this.currOperand);

        if(this.operator != null) {
            this.prevState.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operator}`
        } else {
            this.prevState.innerText= '';
        }
    }
}

//selector
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const prevState = document.querySelector('[data-prev]');
const currState = document.querySelector('[data-curr]');


//define eventlistener
const calculator = new Calculator(prevState, currState);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateStateDisplay();
    })
})

operatorBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operatorChoosed(button.innerText);
        calculator.updateStateDisplay();
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateStateDisplay();
})

allClearBtn.addEventListener('click', button => {
    calculator.clearScreen();
    calculator.updateStateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateStateDisplay();
})