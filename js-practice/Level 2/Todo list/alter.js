var input = document.querySelector("#todoinput");
var list = document.querySelector("#todolist");

//windows loading
window.onload = function(){
    loadTodo();
    var today = new Date().toLocalDateString();
    document.getElementById("todayDate").textContent = "Today's Tasks: " + today;
}

function addtodo(){
    var task = input.value; 
    if(task===""){
        alert("Please enter a task");
    }else{
        createTodoElement(task);
        saveToLocalStorage(task);
        input.value="";
    }
}

//Create LI & deleteBtn

function createTodoElement(task){
    var li = document.createElement("li");

    //checkbox
    var checkbox= document.createElement("input");
    checkbox.type = "checkbox"; 


    //task text
    var span = document.createElement("span");
    span.textContent = task;

    checkbox.onchange = function(){
        if(checkbox.checked){
            span.classList.add("completed");
        }else{
            span.classList.remove("completed");
        }   
    }   
                
    //delete button
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent ="x";

    deleteBtn.onclick = function(){
        list.removeChild(li);
        removeFromLocalStorage(task);
    }
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
} 

//saveToLocalStorage

function saveToLocalStorage(task){
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(task);
    localStorage.setItem("todos",JSON.stringify(todos));
}

//load

function loadTodo(task){
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
    for(var i=0; i<todos.length; i++){
        createTodoElement(todos [i]);
    }
}

//removeFromLocalStorage

function removeFromLocalStorage(task){
    var todos = JSON.parse(localStorage.getItem("todos")) || [];
    var updatedTodo = [];
    for(var i=0; i<todos.length; i++){
        if(todos[i]!==task){
            updatedTodo.push(todos[i])
        }
    }
    localStorage.setItem("todos",JSON.stringify(updatedTodo))
}