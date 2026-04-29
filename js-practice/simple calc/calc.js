const display = document.querySelector("#display");

function appendNumber(number){
    if (operator === ""){
         firstNumber += number;
         display.value = firstNumber;
    }else{
        secondNumber += number;
        display.value = secondNumber;
    }   
}

function setOperator(op){
    if(firstNumber === "")return;
    operator = op;
}

function calculate(){
    let result;

    const num1 = firstNumber;
    const num2 = secondNumber;

    if(operator === '+'){
        result = num1 + num2;
    }else if(operator === '-'){
        result = num1 - num2;
    }else if(operator === '*'){
        result = num1 * num2;
    }else if(operator === '/'){
        result = num1 / num2;
    }

    display.value = result;
}

function cleardisplay(){
    firstNumber ="";
    secondNumber ="";
    operator ="";
    display.value = "";
}