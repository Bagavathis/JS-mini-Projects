var input = document.querySelector("#todoinput");
var list = document.querySelector("#todolist");

//windows loading
window.onload = function(){
    loadTodo();
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
    li.textContent = task;

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent ="x";

    deleteBtn.onclick = function(){
        list.removeChild(li);
        removeFromLocalStorage(task);
    }
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