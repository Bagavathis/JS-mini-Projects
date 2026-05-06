var modal = document.getElementById("myModal");
var openbutton = document.getElementById("openModal");
var closebutton = document.getElementById("closeBtn");

openbutton.onclick = function() {
    modal.style.display = "block";
}

closebutton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};