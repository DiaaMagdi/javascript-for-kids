let secret;
let strikes;
let word;

window.onload = function () {
    initalizePage();
}

function initalizePage() {
    var textBox = document.getElementById("TextBox");
    textBox.removeEventListener("keyup", retryFocus)
    textBox.addEventListener("keyup", submitFocus);

    textBox.value = "";
    textBox.placeholder = "Enter Your Secret Word";
    textBox.focus();

    var submitButton = document.getElementById("SubmitButton");
    submitButton.removeEventListener("click", try_this_letter);
    submitButton.addEventListener("click", make_word_secret);

    var showedText = document.getElementById("ShowedText");
    showedText.innerText = "********"

    var wrongGuessesTextBox = document.getElementById("WrongGuesses");
    wrongGuessesTextBox.innerText = "Wrong Guesses: ";

    secret = [];
    strikes = 0;
    word = "";
}

function submitFocus(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("SubmitButton").click();
    }
}

function retryFocus(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("Retrybutton").click();
    }
}

function make_word_secret() {
    var submitButton = document.getElementById("SubmitButton");
    var showedText = document.getElementById("ShowedText");
    var textBox = document.getElementById("TextBox");

    word = textBox.value;
    if (word.length == 0)
        make_word_secret();

    textBox.value = "";
    textBox.placeholder = "Enter A Letter To Try";

    submitButton.removeEventListener("click", make_word_secret);
    submitButton.addEventListener("click", try_this_letter);


    for (i = 0; i < word.length; i++) {
        secret.push("_");
    }
    showedText.innerText = secret;
}

function try_this_letter() {
    var textBox = document.getElementById("TextBox");
    var showedText = document.getElementById("ShowedText");

    var letter = textBox.value;
    textBox.value = "";

    if (letter.length != 1)
        try_this_letter();

    if (word.indexOf(letter) < 0) {
        var wrongGuessesTextBox = document.getElementById("WrongGuesses");
        wrongGuessesTextBox.innerText += "    " + letter;

        strikes++;
        if (strikes < 3) {
            var DivTag = document.getElementById("Div");

            DivTag.style.animation = "shake 0.5s, badGuess 0.5s";
            setTimeout(function () {
                DivTag.style.animation = "none";
                DivTag.style.animation = "";
            }, 500);
        }

    } else {
        for (i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                secret[i] = letter;
            }
        }
    }

    showedText.innerText = secret;

    if (strikes === 3 || secret.indexOf("_") < 0)
        gameOver();
}
function gameOver() {
    var showedText = document.getElementById("ShowedText");
    showedText.innerText = word;

    var wrongGuessesTextBox = document.getElementById("WrongGuesses");
    wrongGuessesTextBox.style.textAlign = "center";
    wrongGuessesTextBox.style.marginLeft = "0px";

    var DivTag = document.getElementById("Div");

    if (strikes === 3) {
        wrongGuessesTextBox.innerText = "Game Over";
        DivTag.style.animation = "shake 1s, badGuess 1s reverse";
        DivTag.style.backgroundColor = "red";
    } else {
        wrongGuessesTextBox.innerText = "Congratulations";
        DivTag.style.animation = "shake 1s";
    }

    var textBox = document.getElementById("TextBox");
    textBox.removeEventListener("keyup", submitFocus);
    textBox.addEventListener("keyup", retryFocus)
}