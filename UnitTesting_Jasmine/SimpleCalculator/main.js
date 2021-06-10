function Calculate(inputValue) {
    const expression = /\+|\-|\*|\//;

    const str = inputValue.split(expression);

    const number1 = parseInt(str[0]);
    const number2 = parseInt(str[1]);

    const operation = inputValue.match(expression);

    if(Number.isNaN(number1) || Number.isNaN(number2) || operation === null) {
        updateResult("Expression not recognized");
        return;
    }

    const calculator = new Calculator();
    calculator.add(number1);

    let result;
    switch(operation[0]) {
        case "+":
            result = calculator.add(number2); 
            break;
        case "-":
            result = calculator.subtract(number2);
            break;
        case "*":
            result = calculator.multiply(number2);
            break;
        case "/":
            result = calculator.divide(number2);
            break;
    }
    updateResult(result)
}

function updateResult(result) {
    const element = document.getElementById("result");

    if(element) {
        element.innerHTML = result;
    }
}

function showVersion() {
    const calculator = new Calculator();
    const element = document.getElementById('version');
    // element.innerText = calculator.version;
    calculator.version.then(function(version) {
        element.innerText = version;
    })
}