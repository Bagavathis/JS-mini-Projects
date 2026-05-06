var textInput = document.querySelector("#textinput");
var CharCount = document.querySelector("#CharCount");
var WordCount = document.querySelector("#WordCount");

textInput.addEventListener("input", function(){

    var text = textInput.value;

    //character count
    CharCount.textContent = text.length;

    //words Count
    var trimmedText = text.trim();
    if(trimmedText === ""){
        word.textContent = 0;
    }else{
        var word = trimmedText.split(/\s+/);
        WordCount.textContent = word.length;
    }

});