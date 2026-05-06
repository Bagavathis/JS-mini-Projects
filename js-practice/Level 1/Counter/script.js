let count = 0;
const container= document.querySelector(".container");

function increase() {
  count = count + 2;
  document.getElementById("count").innerText = count;
  updateBackground();
}

function decrease() {
  count = count - 1;
  document.getElementById("count").innerText = count;
  updateBackground();
}

function reset(){
    count = 0;
    document.getElementById("count").innerText = count;
    updateBackground();
}
function updateBackground(){
    
    if(count > 0){
        container.style.backgroundColor = "green";
    } else if(count < 0){
        container.style.backgroundColor = "red";
    } else {
        container.style.backgroundColor = "white";
    }
    container.style.transition = "background-color 1s linear";
}