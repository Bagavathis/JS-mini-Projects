var input = document.querySelector("#todoinput");
var list = document.querySelector("#todolist");

function addtodo(){
    var task = input.value;

    if (task==""){
        alert("Please enter  a task");
    }else{
        var li = document.createElement("li");

        //Task text
        var span = document.createElement("span");
        span.textContent = task;

        //Complete Toggle
        span.onclick = function(){
            span.classList.toggle("completed");
        };

        //Delete Button

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";

        deleteBtn.onclick = function(){
            list.removeChild(li);
        };
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        input.value= "";
    }
}