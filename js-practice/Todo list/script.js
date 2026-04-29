var input = document.querySelector("#todoinput");
var list = document.querySelector("#todolist");

function addtodo(){
    var task = input.value;

    if (task==""){
        alert("Please enter  a task");
    }else{
        var li = document.createElement("li");
        li.textContent = task;

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";

        deleteBtn.onclick = function(){
            list.removeChild(li);
        };
        li.appendChild(deleteBtn);
        list.appendChild(li);

        input.value= "";
    }
}