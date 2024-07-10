let num1;
let num2;
let operator;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if ( isNaN(num1 / num2) || !isFinite(num1 / num2) ) {
    return "Error";
  } 
  return num1 / num2
}

