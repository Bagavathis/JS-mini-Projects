const display = document.querySelector("#display");

function appendvalue(value){
    display.value += value;
}

function cleardisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    }catch{
        display.value = "Error";
    }
}