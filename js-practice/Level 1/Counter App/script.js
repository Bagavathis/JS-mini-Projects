const countElement = document.querySelector("#count");
let count = 0;

function increase(){
    count ++;
    countElement.textContent = count;
}
function decrease(){
    count --;
    countElement.textContent = count;
}
function reset(){
    count=0;
    countElement.textContent = count;
}