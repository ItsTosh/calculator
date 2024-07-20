const displayScreen = document.querySelector("#displayScreen");
const answerScreen = document.querySelector("#answerScreen");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operator");
const special = document.querySelectorAll(".special");
const dot = document.querySelector("#dot");
let num1 = "";
let num2 = "";
let operation = "";
let answer = null;
let hasDotAlready = false;

function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);  
}

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (isNaN(num1 / num2) || !isFinite(num1 / num2)) {
    return "Error";
  } 

  return num1 / num2;
}

function operate(num1, num2, operation) {
  switch (operation) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x": 
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}

numbers.forEach(number => {
  number.addEventListener("click", (e) => {
    const eventTarget = e.target.innerHTML;

    if (operation === "" && num2 === "") {
      
      if (eventTarget === "." && num1 === "") {
        num1 = 0;
        num1 += eventTarget;
        displayScreen.textContent = `${num1}`;
        console.log("hey I am playing")
      } else {
        num1 += eventTarget;
        displayScreen.textContent = `${num1}`;
      }

    } else {

      if (eventTarget === "." && num2 === "") {
        num2 = 0;
        num2 += eventTarget;
        displayScreen.textContent = `${num1} ${operation} ${num2}`;

      } else {
        num2 += eventTarget;
        displayScreen.textContent = `${num1} ${operation} ${num2}`;
      }

    }

    // If we click the dot, hasDotAlready = true; For num1
    if (operation === "" && num2 === "" && eventTarget === ".") {
      hasDotAlready = true;
    } else if (operation !== "" && eventTarget === ".") {
      hasDotAlready = true;
    } 

    // // If it has a dot already, then disable button
    if (hasDotAlready && eventTarget === ".") {
      number.setAttribute("disabled", "")
    } 

    // If I click a new number after having an equation already, num2 === new number
    if (answer !== null && operation !== "" && eventTarget !== ".") {
      num2 = "";
      num2 += eventTarget;
      answer = null;
      hasDotAlready = false;
      dot.removeAttribute("disabled", "");
      displayScreen.textContent = `${num1} ${operation} ${num2} =`; 
    }

  })
})

operators.forEach(operator => {
  operator.addEventListener("click", (e) => {
    const eventTarget = e.target.innerHTML;

    if (eventTarget !== "=") {
      operation = eventTarget;
      hasDotAlready = false;
      dot.removeAttribute("disabled", "")
      displayScreen.textContent = `${num1} ${operation}`;

    } else {
      answer = operate(num1, num2, operation);

      // if more than 21 digits, display in scientific notation
      if (eventTarget === "=" && String(answer).includes("e")) {
        answerScreen.textContent = answer; 
      }

      if (eventTarget === "=" && String(answer).includes(".") && !String(answer).includes("e")) {
        let countDecimals = String(answer).split(".");
  
        if (countDecimals[1].length >= 8) {
          countDecimals[1] = countDecimals[1].slice(0, 8);
          countDecimals = countDecimals.join(".");
          answer = countDecimals + "...";
          answerScreen.textContent = answer; 
        } 

      } else {
        answerScreen.textContent = answer; 
      }

    }

    // Feature: if they click "=" again after an equation, use the previous answer
    if (num1 !== "" && operation !== "" && num2 !== "" && eventTarget === "=") {
      displayScreen.textContent = `${num1} ${operation} ${num2} =`;
      num1 = String(answer) ;
      answer = operate(num1, num2, operation);
      answerScreen.textContent = num1;
    }

    // Feature: if I click another operator, use previous answer, new operator and my chosen num2 val
    if (eventTarget !== "=" && num2 !== "") {
      num2 = "";
      displayScreen.textContent = `${num1} ${operation}`;
    }

    if (operation !== "" && num1 === "") {
      num1 = 0;
      displayScreen.textContent = `${num1} ${operation}`;
    }

    if (operation !== "" && num1 !== "" && num2 === "" && eventTarget === "=") {
      num2 = num1;
      displayScreen.textContent = `${num1} ${operation} ${num2} =`;
      answerScreen.textContent = `${num1}`;
    }

    if (eventTarget === "=" && operation === "" && num2 === "") {
      displayScreen.textContent = `${num1} =`;
      answerScreen.textContent = `${num1}`;
    }

  })
})

special.forEach(spec => {
  spec.addEventListener("click", (e) => {
    const eventTarget = e.target.innerHTML;

    // All Clear
    if (eventTarget === "AC") {
      num1 = "";
      num2 = "";
      operation = "";
      answer = null;
      hasDotAlready = false;
      displayScreen.textContent = `${num1} ${operation} ${num2}`;
      answerScreen.textContent = answer;
    }

    // Delete button
    if (eventTarget === "Delete" && num1 !== "" && operation === "") {
      num1 = num1.slice(0, -1);
      displayScreen.textContent = `${num1} ${operation} ${num2}`;
    } else if (eventTarget === "Delete" && num2 !== "" && operation !== "") {
      num2 = num2.slice(0, -1);
      displayScreen.textContent = `${num1} ${operation} ${num2}`;
    } else if (eventTarget === "Delete" && num2 === "" && operation !== "") {
      operation = "";
      num2 = "";
      displayScreen.textContent = `${num1} ${operation} ${num2}`;
    }

    // Checks if we deleted the dot for num1
    if (eventTarget === "Delete" && num2 === "" && num1.slice(-1) === "." && !num1.slice(0, -1).includes(".")) {
      hasDotAlready = false;
      dot.removeAttribute("disabled", "")
      displayScreen.textContent = `${num1} ${operation} ${num2}`;
    }

    // Checks if we deleted the dot for num2
    if (eventTarget === "Delete" && num1 !== "" && num2.slice(-1) === "." && !num2.slice(0, -1).includes(".")) {
      hasDotAlready = false;
      dot.removeAttribute("disabled", "")
      displayScreen.textContent = `${num1} ${operation} ${num2}`;
    }

    // Checks if num1 OR num2 still has dots. Ensures that they're disabled
    if (num1.includes(".") || num2.includes(".")) {
      dot.setAttribute("disabled", "true");
    } else {
      dot.removeAttribute("disabled");
    }

    displayScreen.textContent = `${num1} ${operation} ${num2}`;
  })
})


console.log('updated')