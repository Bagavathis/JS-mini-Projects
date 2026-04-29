const timeElement = document.querySelector("#time");

function formatTime(value){
    if(value < 10){
        return "0" + value;
    }else{
        return + value;
    }   
}
    

function updateTime(){
    let now = new Date();

    let hours = formatTime(now.getHours());
    let minutes = formatTime(now.getMinutes());
    let seconds = formatTime(now.getSeconds());

    let ampm;

    if (hours>=12){
        ampm ="PM";
    }else{
        ampm ="AM";
    }

    if (hours>12){
        hours = hours-12;
    }

    if (hours===0){
        hours = "12";
    }

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    
}

setInterval(updateTime,1000);
updateTime();



