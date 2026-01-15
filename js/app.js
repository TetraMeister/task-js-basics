function Calculator() {
    this.actions = ['+', '-', '*', '/', '^'];
    this.history = [];
};

Calculator.prototype.isCorrectAction = function (action) {
    return this.actions.includes(action);
};

Calculator.prototype.manageResult = function (result) {
    this.history.push(result);
    return result
};

Calculator.prototype.isNumber = function (num1, num2) {
    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
        throw new Error('Zły format danych do stosowanych operacji');
    }
};

Calculator.prototype.getHistoryAsString = function () {
    return this.history.join('\n');
};

Calculator.prototype.add = function (num1, num2) {
    this.isNumber(num1, num2);
    const result = Number(num1) + Number(num2);
    this.manageResult(result);
};

Calculator.prototype.substract = function (num1, num2) {
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

    for (let i = 0; i < num2; i++) {
        result *= num1;
    }

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
    if (isCorrectAction) {
        number1 = prompt('Podaj liczbę nr 1');
        number2 = prompt('Podaj liczbę nr 2');

        try {
            switch (action) {
                case "+":
                    calc.add(number1, number2);
                    break
                case "-":
                    calc.substract(number1, number2);
                    break
                case "*":
                    calc.multiply(number1, number2);
                    break
                case "/":
                    calc.divide(number1, number2);
                    break
                case "^":
                    calc.power(number1, number2);
                    break
                default:
                    throw new Error('Operator nie istnieje!');
            }
        } catch (error) {
            alert(error.message);
        }
    }

} while (calc.isCorrectAction(action));