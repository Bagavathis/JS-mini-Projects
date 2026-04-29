var allUsers = [];
var container = document.getElementById("userContainer");
var searchInput = document.getElementById("searchInput");

//loadusers
async function loadUsers(){
    try{
        var response = await fetch("https://jsonplaceholder.typicode.com/users");
        allUsers = await response.json();

        displayUsers(allUsers);
    }catch(error){
        container.innerHTML = "Error Loading Users";
        console.log(error);
    }    
}

//Display Users
function displayUsers(userList){
    container.innerHTML = " ";
    for(var i=0; i<userList.length; i++){
        var singleUser = userList[i];
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = 
        "<h2>User Name:" +singleUser.name+ "</h2>"+ 
        "<p>Email:" +singleUser.email+ "</p>"+ 
        "<p>City:" +singleUser.address.city+ "</p>";
        container.appendChild(card);
    }
}

//Debounce
function debounce(func,delay){
    var timer;
    return function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
            func();
        }, delay);
    };
}

//Search and filter with debounce
var debouncedSerach = debounce (function(){
    var searchText = searchInput.value.toLowerCase();
    var filteredUser = allUsers.filter(function(singleUser){
        return singleUser.name.toLowerCase().includes(searchText);
    });
    displayUsers(filteredUser);
},500);

//addeventListener
searchInput.addEventListener("input",debouncedSerach);

//load
loadUsers();