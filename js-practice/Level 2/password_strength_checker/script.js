var passwordInput = document.querySelector("#passwordInput");
var strengthBox = document.querySelector("#strengthBox");

passwordInput.addEventListener("input",function(){

    var password = passwordInput.value;
    var strength = 0;

    if(password.length >= 8){
        strength++;
    }
    if(/[A-Z]/.test(password)){
        strength++;
    }
    if(/[a-z]/.test(password)){
        strength++;
    }
    if(/[0-9]/.test(password)){
        strength++;
    }
    if(/[^A-Za-z0-9]/.test(password)){
        strength++;
    }

    strength.className = "";

    if(strength <=2){
        strengthBox.textContent = "Weak";
        strengthBox.classList.add("weak");
    }
    else if(strength === 3 || strength === 4){
        strengthBox.textContent = "Medium";
        strengthBox.classList.add("medium");
    }
    else{
        strengthBox.textContent = "Strong";
        strengthBox.classList.add("strong");
    }
})