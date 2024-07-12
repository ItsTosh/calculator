const displayScreen = document.querySelector("#displayScreen");
const answerScreen = document.querySelector("#answerScreen");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operator")
let num1 = "";
let num2 = "";
let operator = "";
let answer;

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

function operate(num1, num2, operator) {
  console.log(`
    num1: ${num1}
    num2: ${num2};
    operator: ${operator};  
  `)

  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "x") {
    return multiply(num1, num2)
  } else if (operator === "÷") {
    return divide(num1, num2)
  }
}
  
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    const eventTarget = event.target.innerHTML

    if (operator === "") {
      num1 = Number(eventTarget);
      displayScreen.textContent = num1;
      console.log(num1);
    } else {
      num2 = Number(eventTarget);
      displayScreen.textContent = `${num1} ${operator} ${num2} =  `
      console.log(num2);
    }

    console.log(`num1: ${num1}, num2: ${num2}`)
  })
})

operators.forEach((op) => {
  op.addEventListener("click", (event) => {
    const eventTarget = event.target.innerHTML;

    if (eventTarget !== "=") {
      operator = eventTarget;
      displayScreen.textContent = `${num1} ${operator}`
      console.log(operator)
    } else {
      num1 = num1;
      num2 = num2;  
      answer = operate(num1, num2, operator);
      answerScreen.textContent = answer;
      console.log(`answer: ${answer}`)
      // num1 = "";
      // num2 = ""; 
      // operator = "";
    }

    if (eventTarget === "=" && num2 === "" && operator !== "") {
      num1 = Number(num1)
      num2 = Number(num1); 
      answer = operate(num1, num2, operator);
      displayScreen.textContent = `${num1} ${operator} ${num2} =  `
      answerScreen.textContent = answer;
      console.log(`num1: ${(typeof num1)} num2: ${typeof num2}`)
      // num1 = "";
      // num2 = "";
      // operator = "";
    }

    if (eventTarget === "=" && operator === "" && num2 === "") {
      displayScreen.textContent = `${num1} =`;
      answerScreen.textContent = `${num1}`
    }

    if (operator !== "" && num2 !== "" && num1 === "") {
      num1 = 0;
      displayScreen.textContent = `${num1} ${operator} ${num2} =`;
      console.log('its me')
    }
 
    // if (eventTarget === "Delete" && operator === "") {
    //   num1 = num1.slice(0, -1);
    //   displayScreen.textContent = `${num1}`
    // } else if (eventTarget === "Delete" && operator !== "") {
    //   num2 = num2.slice(0, -1) 
    //   displayScreen.textContent = `${num1} ${operator} ${num2} =`;
    // }
  })
})
