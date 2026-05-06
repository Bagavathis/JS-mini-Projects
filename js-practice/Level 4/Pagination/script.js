var allUsers = [];
var container = document.getElementById("userContainer");
var paginationDiv = document.getElementById("pagination");

var currentPage = 1;
var usersPerPage = 3;

//loadusers
async function loadUsers() {
    try{
        var response = await fetch("https://jsonplaceholder.typicode.com/users");
        allUsers  = await response.json();

        displayUsers();
        setupPagination();
    }catch(error){
        container.innerHTML = "Error Loading Users"
        console.log(error);
    }   
}

//displayUsers
function displayUsers(){
    container.innerHTML = " ";
    
    var start = (currentPage - 1)*usersPerPage;
    var end = start + usersPerPage;
    var paginatedUsers = allUsers.slice(start,end);

    for(var i=1; i<paginatedUsers.length; i++){
        var user = paginatedUsers[i];
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = 
        "<h3>User Name:" + user.name + "</h3>"+
        "<p>Email:" + user.email + "</p>"+
        "<p>City:" + user.address.city + "</p>";

        container.appendChild(card);
    }

}

//setpagination
function setupPagination(){
    paginationDiv.innerHTML = " ";

    var pageCount = Math.ceil(allUsers.length / usersPerPage);
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
loadUsers();