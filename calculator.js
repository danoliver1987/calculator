const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    if (b === 0) {
        return "What a plonker!" 
    }
    else { 
        return a / b;
}}

let num1 = "";
let num2 = "";
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

const numberButtons = document.querySelectorAll(".num-btn");

numberButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        const btnListener = event.target.innerText;
        const display = document.querySelector("input");

        if (operator === undefined) {
            num1 = num1 + btnListener;
            display.value = num1;
        } else {
            num2 = num2 + btnListener;
            display.value = num2;
        }
    });
});

const operatorButtons = document.querySelectorAll(".opBtn");

operatorButtons.forEach(function(button2) {
    button2.addEventListener("click", function(event) {
        const btnListener = event.target.innerText;
        const display = document.querySelector("input");

        if (num2 !== "") {
            num1 = sumUp(parseInt(num1), parseInt(num2), operator);
            if (num1 === "What a plonker!") {
                return display.value = "What a plonker!";
        };
        
        num2 = "";
        
        }
        
        operator = btnListener;
        display.value = operator;
    });
});

const sumButton = document.querySelector(".sumup");

sumButton.addEventListener("click", function(event) {
    const display = document.querySelector("input");

    if (num1 === "" || num2 === "" || operator === undefined) {
        return display.value = "Try again!";
    }

    const result = sumUp(parseInt(num1), parseInt(num2), operator);

    if (result === "What a plonker!") {
        return display.value = "What a plonker!"
    } 
        let n = result.toFixed(4);
        n = parseFloat(n);
        display.value = n;
});

const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", function(event) {
    const display = document.querySelector("input");
    num1 = "";
    num2 = "";
    operator = undefined;
    display.value = "";
});
