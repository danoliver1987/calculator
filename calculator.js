// ===== BASIC MATH OPERATIONS =====
// Each function takes two numbers and returns the result of one operation.
 
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
    // Guard against dividing by zero, which would otherwise return Infinity
    // (not useful for a calculator) instead of crashing or breaking the app.
    if (b === 0) {
        return "What a plonker!" 
    }
    else { 
        return a / b;
}}
 
// ===== STATE VARIABLES =====
// These track everything the calculator needs to remember between clicks.
// num1/num2 are strings because we build them up character-by-character
// as the user clicks digit buttons (e.g. "1" then "2" becomes "12").
let num1 = "";
let num2 = "";
let operator; // undefined until the user picks +, -, *, or /
let hasBeenCalculated = false; // true right after "=" shows a result,
                                 // so the next digit click knows to start fresh
 
// ===== OPERATION DISPATCHER =====
// Takes the operator (as a string like "+") and two numbers, and calls
// the matching function above. Falls back to "ERROR" for anything unrecognised.
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
 
// ===== DIGIT BUTTONS (0-9) =====
const numberButtons = document.querySelectorAll(".num-btn");
 
numberButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        const btnListener = event.target.innerText; // the digit that was clicked, e.g. "7"
        const display = document.querySelector("input");
 
        // If a result was just displayed, treat this digit as the start of
        // a brand new calculation instead of appending to the old result.
        // hasBeenCalculated is a global variable (declared near the top of
        // the file as "let hasBeenCalculated = false;") that only becomes
        // true inside the sumButton handler, right after a result is shown.
        // Checking it here lets this completely separate function know
        // "a calculation just finished" and react by wiping the slate clean.
        if (hasBeenCalculated === true) {
            num1 = "";
            num2 = "";
            operator = undefined;
            hasBeenCalculated = false; // reset the flag so this block only
                                        // runs once, right after a result
         }
 
        // No operator chosen yet -> still building the first number.
        // Operator already chosen -> now building the second number.
        if (operator === undefined) {
            // .length checks how many characters num1 already has. Once it
            // reaches 8, this is false, so further digit clicks are simply
            // ignored - this stops the number overflowing the display.
            if (num1.length < 8) {
                num1 = num1 + btnListener;
                display.value = num1;
            }
        } else {
            if (num2.length < 8) {
                num2 = num2 + btnListener;
                display.value = num2;
            }
        }
    });
});
 
// ===== OPERATOR BUTTONS (+, -, *, /) =====
const operatorButtons = document.querySelectorAll(".opBtn");
 
operatorButtons.forEach(function(button2) {
    button2.addEventListener("click", function(event) {
        const btnListener = event.target.innerText; // the operator symbol clicked, e.g. "+"
        const display = document.querySelector("input"); // the calculator's screen
 
        // If num2 already has a value, a full pair (num1, operator, num2) is
        // waiting to be evaluated. This handles chained calculations like
        // 12 + 7 - 1, where pressing "-" should first resolve "12 + 7".
        if (num2 !== "") {
            // Calculate the pending result and store it back into num1.
            // Why num1? Because whatever this result is becomes the FIRST
            // number of the NEXT calculation. E.g. in 12 + 7 - 1: once "12 + 7"
            // is resolved to 19, that 19 becomes the new num1, ready to be
            // combined with whatever num2 comes next (here, "1").
            // parseFloat (not parseInt) is used here so decimals survive -
            // parseInt("2.5") would chop it down to just 2, losing the ".5".
            num1 = sumUp(parseFloat(num1), parseFloat(num2), operator);
 
            // If that calculation hit a divide-by-zero, num1 will now hold
            // the error message string instead of a number. Show it and
            // stop here (the "return" exits the whole click handler) so we
            // don't try to overwrite it with the newly clicked operator below.
            if (num1 === "What a plonker!") {
                return display.value = "What a plonker!";
        };
        
        num2 = ""; // clear num2 so the next number typed starts fresh
 
        }
        
        // Store whichever operator was just clicked (this also handles
        // pressing the same or a different operator repeatedly - it just
        // overwrites operator each time, without triggering a calculation).
        operator = btnListener;
        display.value = operator;
    });
});
 
// ===== EQUALS BUTTON =====
const sumButton = document.querySelector(".sumup");
 
sumButton.addEventListener("click", function(event) {
    const display = document.querySelector("input"); // the calculator's screen
 
    // Don't attempt a calculation unless num1, num2, AND operator are all filled in.
    if (num1 === "" || num2 === "" || operator === undefined) {
        return display.value = "Try again!";
    }
 
    // parseFloat converts the number-strings into actual numbers before maths happens.
    // parseFloat is used instead of parseInt so decimal values (like "2.5")
    // keep their decimal part instead of being truncated to whole numbers.
    const result = sumUp(parseFloat(num1), parseFloat(num2), operator);
 
    // Catch the divide-by-zero case before trying to round it (strings don't have .toFixed()).
    if (result === "What a plonker!") {
        return display.value = "What a plonker!"
    } 
        // Round to 4 decimal places, then parseFloat strips any unnecessary
        // trailing zeros (e.g. "8.0000" -> 8, but "3.1416" stays as is).
        let n = result.toFixed(4);
        n = parseFloat(n);
        display.value = n;
        hasBeenCalculated = true; // remember that a result is now on screen
});
 
// ===== CLEAR BUTTON =====
const clearBtn = document.querySelector(".clearBtn");
 
clearBtn.addEventListener("click", function(event) {
    const display = document.querySelector("input"); // the calculator's screen
    // Reset everything back to its starting state.
    num1 = "";
    num2 = "";
    operator = undefined;
    display.value = "";
});
 
// ===== DECIMAL POINT BUTTON =====
const decimalButton = document.querySelector(".decimalBtn");
 
decimalButton.addEventListener("click", function(event) {
    const btnListener = event.target.innerText; // always "."
    const display = document.querySelector("input"); // the calculator's screen
 
    // Same "which number am I editing" check as the digit buttons.
    if (operator === undefined) {
          // Only append the dot if num1 doesn't already contain one -
          // this stops the user typing something invalid like "1.2.5".
          if (!num1.includes(".")) {
            num1 = num1 + btnListener;
            display.value = num1;
        }} else {
          if (!num2.includes(".")) {
           num2 = num2 + btnListener;
           display.value = num2;
        } 
    }});
 
// ===== BACKSPACE BUTTON =====
const backspaceButton = document.querySelector(".backspaceBtn");
 
backspaceButton.addEventListener("click", function(event) {
    const display = document.querySelector("input"); // the calculator's screen
 
    // Same "which number am I editing" check again - remove the last
    // character from whichever number is currently being typed.
    // .slice(0, -1) returns the string minus its final character.
    if (operator === undefined) {
        num1 = num1.slice(0, -1) 
        display.value = num1;
    }   else {
        num2 = num2.slice(0, -1) 
        display.value = num2;
    } 
});