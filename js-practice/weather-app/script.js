const input = document.getElementById("cityInput");
const button = document.getElementById("searchbtn");
const result = document.getElementById("weatherResult");

button.addEventListener("click",getWeather);

async function getWeather() {
    const city = input.value.trim();
    if(city===""){
        result.innerHTML = "Please enter a city name";
        return;
    }
    try{
        const response = await fetch(`https://wttr.in/${city}?format=j1`);

        const data = await response.json();

        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].weatherDesc[0].value;

        changeBackground(desc);

        result.innerHTML = `
                   <p>Temperature:${temp}°C</p>
                   <p>Description:${desc}</p>
                   `;
    }catch(error){
        result.innerHTML = "Something went wrong";
        console.log(error);
    }
    
}
function changeBackground(condition){
         
        const body = document.body;
        condition = condition.toLowerCase();

        if(condition.includes("sun")){
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b')";
        }
        else if(condition.includes("cloud")){
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')";
        }
        else if(condition.includes("rain")){
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501696461415-6bd6660c6742')";
        }
        else if(condition.includes("smoke") || condition.includes("mist")){
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc')";
        }
        else{
            body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')";
        }
        body.style.backgroundSize ="cover";
        body.style.backgroundPosition = "center";
        body.style.minHeight = "100vh";
    }