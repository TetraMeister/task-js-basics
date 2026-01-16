function Calculator() {
    this.actions = {
        '+': this.add,
        '-': this.subtract,
        '*': this.multiply,
        '/': this.divide,
        '^': this.power
    };
    this.history = [];
};

Calculator.prototype.isCorrectAction = function (action) {
    return Object.keys(this.actions).includes(action);
};

Calculator.prototype.manageResult = function (result) {
    this.history.push(`${number1} ${action} ${number2} = ${result}`);
    return result
};

Calculator.prototype.isNumber = function (num1, num2) {
    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
        throw new Error('Zły format danych do stosowanych operacji');
    } else if (number1 === '' || number2 === '') {
        number1 = 0;
        number2 = 0;
    };
};

Calculator.prototype.getHistoryAsString = function () {
    return this.history.join('\n');
};

Calculator.prototype.add = function (num1, num2) {
    this.isNumber(num1, num2);
    const result = Number(num1) + Number(num2);
    this.manageResult(result);
};

Calculator.prototype.subtract = function (num1, num2) {
    this.isNumber(num1, num2);
    const result = Number(num1) - Number(num2);
    this.manageResult(result);
};

Calculator.prototype.multiply = function (num1, num2) {
    this.isNumber(num1, num2);
    const result = Number(num1) * Number(num2);
    this.manageResult(result);
};

Calculator.prototype.divide = function (num1, num2) {
    this.isNumber(num1, num2);
    if (Number(num2) === 0) {
        throw new Error('Nie można dzielić przez zero')
    } else {
        const result = Number(num1) / Number(num2);
        this.manageResult(result);
    }
};

Calculator.prototype.power = function (num1, num2) {
    this.isNumber(num1, num2);
    let result = 1;

    if (+num1 === 0) {
        result = 0;
    } else {
        for (let i = 0; i < num2; i++) {
            result *= num1;
        };
    };
    this.manageResult(result);
};

const calc = new Calculator();
let action, promptContent, isCorrectAction, number1, number2;
do {
    promptContent = 'Podaj jaką operację chcesz wykonać (+, -, *, /, ^) i potwierdź. \n'; // \n - znak nowej linii
    promptContent += 'Jeśli chcesz zrezygnować wciśnij Anuluj. \n';
    promptContent += 'Lista poprzednich operacji: \n' + calc.getHistoryAsString();

    action = prompt(promptContent);
    isCorrectAction = calc.isCorrectAction(action);
    actionFunc = calc.actions[action]

    if (isCorrectAction) {
        number1 = prompt('Podaj liczbę nr 1');
        number2 = prompt('Podaj liczbę nr 2');

        try {
            actionFunc.bind(calc)(number1, number2);
        } catch (error) {
            alert(error.message);
        }
    }

} while (calc.isCorrectAction(action));