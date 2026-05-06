const container = document.querySelector('. container');
function changecolor() {
    const randomcolor =getRandomColor();
    container.style.backgroundColor = randomcolor;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}