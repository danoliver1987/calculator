const add = function(a, b) {
    return a + b;
}
console.log(add);

const subtract = function(a, b) {
    return a - b;
}
console.log(subtract);

const multiply = function(a, b) {
    return a * b;
}
console.log(multiply);

const divide = function(a, b) {
    return a / b;
}
console.log(divide);

let num1;
let num2;
let operator;

const sumUp = function (a, b, operator) {
    if (operator === "+") {
        return add(a, b);
    }
    else if (operator === "-") {
        return subtract(a, b);
    }
    else if (operator === "*") {
        return multiply(a, b);
    }
    else if (operator === "/") {
        return divide(a, b);
    }
    else {
        return "ERROR";
    }
}
console.log(sumUp(5, 6, "+")); // 11
console.log(sumUp(100, 10, "-")); // 90
console.log(sumUp(3, 10, "*")); // 30
console.log(sumUp(24, 8, "/")); // 3
console.log(sumUp(3, 10, "%")); // "ERROR"