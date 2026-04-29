const container = document.querySelector(".container");
let isDark = false;

function toggleTheme(){
    if(isDark){
        container.classList.remove("dark");
        container.classList.add("light");
    }   else{
        container.classList.remove("light");
        container.classList.add("dark");
    }
    isDark = !isDark;
}