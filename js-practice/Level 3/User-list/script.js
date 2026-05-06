var container = document.getElementById("usercontainer");

async function getUser(){
    try{
        var response = await fetch("https://jsonplaceholder.typicode.com/users");
        var users = await response.json();
        
        container.innerHTML = "";
        
        for(var i=0; i<users.length; i++){
            var user = users[i];
            var card = document.createElement("div");
            
            card.className = "card";
            card.innerHTML = 
            "<h3>User Name:" +user.name+ "<h3>"+
            "<p>Email:" +user.email+ "</p>"+
            "<p>City:" +user.address.city+ "</p>";

            container.appendChild(card);
        }
    }catch(error){
        container.innerHTML = "Error Loading";
        console.log("error");
    }
    
}