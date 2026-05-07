var cityInput = document.getElementById("cityInput");
var searchWeather = document.getElementById("searchBtn");
var weatherResult = document.getElementById("weatherResult");

//  Section Switch Function
function showSection(section) {

    document.getElementById("weatherSection").style.display = "none";
    document.getElementById("userSection").style.display = "none";
    document.getElementById("todoList").style.display = "none";
    document.getElementById("noteSection").style.display = "none";

    document.getElementById(section + "Section").style.display = "block";
}

// Weather Section //
searchWeather.addEventListener("click",getWeather);

async function getWeather(){
    var city = cityInput.value.trim();
    
    if(city===""){
        weatherResult.innerHTML="Enter a city name....";
        return;
    }
    try{
        var response = await fetch("https://wttr.in/" + city + "?format=j1");
        var data = await response.json();

        var temp = data.current_condition[0].temp_C;
        var desc = data.current_condition[0].weatherDesc[0].value;

        weatherResult.innerHTML =
        "<p>Temperature:" + temp + "°C</p>"+
        "<p>Description:"  +desc + "</p>"; 
        

        changeBackground(desc);
    }catch(error){
        weatherResult.innerHTML = "Error fetch weather";
        console.log(error);
    }
    
}

function changeBackground(condition){
    var weatherSection = document.body; // Change background of the entire body
    condition = condition.toLowerCase();


    if(condition.includes("sun")){
            weatherSection.style.backgroundImage = "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b')";
        }
        else if(condition.includes("cloud")){
            weatherSection.style.backgroundImage = "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')";
        }
        else if(condition.includes("rain")){
            weatherSection.style.backgroundImage = "url('https://images.unsplash.com/photo-1501696461415-6bd6660c6742')";
        }
        else if(condition.includes("smoke") || condition.includes("mist")){
            weatherSection.style.backgroundImage = "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc')";
        }
        else{
            weatherSection.style.backgroundImage = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')";
        }
        weatherSection.style.backgroundSize = "cover";
        weatherSection.style.backgroundPosition = "center";
}

// User Section //
var allUsers = [];
var userContainer = document.getElementById("userContainer");
var searchInput = document.getElementById("userInput");
var paginationDiv = document.getElementById("pagination");

var currentPage = 1;
var usersPerPage = 3;

//Fetch Users
 async function loadUsers() {
    userContainer.innerHTML = "Loading users...";
    try{
        var response = await fetch("https://jsonplaceholder.typicode.com/users");
        allUsers = await response.json();

        displayUsers();
        setupPagination();
    }catch(error){
        userContainer.innerHTML = "Error Load Users";
        console.log(error);
    }
}
//Display Users (with debounce)
 function displayUsers(filteredList){
    userContainer.innerHTML = "";

    var list = filteredList || allUsers;
   
    if(list.length === 0){
        userContainer.innerHTML = "No users found.";
        return;
    }

    var start = (currentPage - 1)*usersPerPage;
    var end = start + usersPerPage;
    var paginatedUsers = list.slice(start,end);

    for(let i=0; i<paginatedUsers.length; i++){
        let user = paginatedUsers[i];

        var card = document.createElement("div");
        card.className = "card";
        card.style.cursor = "pointer";

        card.innerHTML = 
        "<h4>UserName:" +user.name+ "</h4>"+
        "<p>Email:" +user.email+ "</p>"+
        "<p>City:" +user.address.city+ "</p>";
        
        card.addEventListener ("click",function(){
            openModal(user);
            
        });

        userContainer.appendChild(card);
    }
 }
//Pagination Button 
 function setupPagination(filteredList){
    paginationDiv.innerHTML = "";
    
    var list = filteredList || allUsers;
    var pageCount = Math.ceil(list.length / usersPerPage);

    for(var i=1; i<=pageCount; i++){
        var btn = document.createElement("button");
        btn.textContent = i;

        btn.onclick = function(e){
            currentPage = Number(e.target.textContent);
            displayUsers();
        };
        paginationDiv.appendChild(btn);
    }

 }
//Debounce
 function debounce(func,delay){
    var timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            func();
              
        },delay);
    };
 }
//Search with debounce
 var debouncedSearch = debounce (function(){
    var searchText = searchInput.value.toLowerCase();
    var filteredUser = allUsers.filter(function(singleUser){
        return singleUser.name.toLowerCase().includes(searchText);
    });
    currentPage = 1;
    displayUsers(filteredUser);
    setupPagination(filteredUser);
},500);

searchInput.addEventListener("input",debouncedSearch);
loadUsers();

//Modal pop-up
var modal = document.getElementById("modal");
var modalBody = document.getElementById("modalContent");
var closeModal = document.getElementById("closeBtn");

function openModal(user){
    modalBody.innerHTML = 
    '<h3>' + user.name + '</h3>'+
    '<p>Email:' + user.email + '</p>'+
    '<p>City:' + user.address.city + '</p>';
    
    modal.style.display="block";
}

closeModal.onclick = function(){
    modal.style.display= "none";
};

window.onclick = function(event){
    if(event.target===modal){
        modal.style.display = "none";
    }
};


//To-Do List
var todoInput = document.getElementById("todoInput");
var addTaskBtn = document.getElementById("addtaskBtn");
var todoList = document.getElementById("taskList");

var today = new Date().toLocaleDateString();
document.getElementById("todayDate").textContent = "Today's Tasks: " + today;

//add Task
addTaskBtn.onclick = function(){
    var task = todoInput.value.trim();  
    if(task===""){
        alert("Please enter a task");
        return;
    }   

    saveTask(task);
    loadTasks();
    todoInput.value = "";
}

//save Task
function saveTask(taskText){
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({text: taskText, completed: false, date: today});
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//load Task
function loadTasks(){
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    todoList.innerHTML = "";

    for(var i=0; i<tasks.length; i++){
        if(tasks[i].date === today){
            createTodoElement(tasks[i], i);
        }
    }
}

//create Task Element
function createTodoElement(taskObj, index){
    var li = document.createElement("li");
    
    //checkBox
    var checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = taskObj.completed;

    checkbox.onchange = function(){
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = checkbox.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        //Green color for completed task
        if(checkbox.checked){
            span.style.color = "green";
        }else{
            span.style.color = "black";
        }
    };

    //Task Text
    var span = document.createElement("span");
    span.textContent = " " + taskObj.text;

    //Delete Button
    var delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = function(){
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index,1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    todoList.appendChild(li);
    
}

//History Filter
function showHistory(type){
    var task = JSON.parse(localStorage.getItem("tasks")) || [];
    todoList.innerHTML = "";

    var now = new Date();

    tasks.forEach(function(task,index){
        var taskDate = new Date(task.Date);
        var diff = (now-taskDate) / (1000*60*60*24);

        if(type === "weekly" && diff <= 7){
            createTodoElement(task,index);
        }
        if(type === "monthly" && taskDate.getMonth() === now.getMonth()){
            createTodoElement(task,index);
        } 
    });
}

window.onload = function(){
    showSection("todo");
    loadTasks();
    loadNotes();
}

//Notes section
var notesInput = document.getElementById("noteInput");
var saveNotesBtn= document.getElementById("savenoteBtn");
var notesContainer = document.getElementById("notesContainer");

saveNotesBtn.onclick = function(){
    var note = notesInput.value.trim();
    if(note===""){
        alert("please give a notes");
        return;
    }else{
        addNotes(note);
        saveNotes(note);
        notesInput.value = "";
        }
}

function saveNotes(note){
    var notes = JSON.parse(localStorage.getItem("notes"))||[];
    notes.push(note);
    localStorage.setItem("notes",JSON.stringify(notes));
}

function addNotes(note){
    var div = document.createElement("div");
    div.className = "note";

    var text = document.createElement("span");
    div.textContent = note;

    var delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = function(){
        div.remove();
        removeNote(note);
    };

    div.appendChild(text);
    div.appendChild(delBtn);

    notesContainer.appendChild(div);
}

function removeNote(note){
    var notes = JSON.parse(localStorage.getItem("notes")) || [];

    var updated = notes.filter(function(n){
        return n !== note;
    });

    localStorage.setItem("notes", JSON.stringify(updated));
}

function loadNotes(){
    var notes = JSON.parse(localStorage.getItem("notes"))||[];
    notesContainer.innerHTML = "";
    for(var i=0; i<notes.length; i++){
        addNotes(notes[i]);
    }
}
loadNotes();

//Toggle theme
var toggleButton = document.getElementById("toggleThemeBtn");
toggleButton.onclick=function(){
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
}  
//load saved theme
var savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark"){
    document.body.classList.add("dark");
}


function showSection(section) {

    var sections = ["weather", "user", "todo", "note", "toggleTheme"];

    for (var i = 0; i < sections.length; i++) {
        var el= document.getElementById(sections[i] + "Section");
        if(el){
            el .style.display = "none";
        }
    }

    var active= document.getElementById(section + "Section")
    if(active){
        active.style.display = "block";
    }
 }
window.onload = function () {
    showSection("weather"); // default section
};