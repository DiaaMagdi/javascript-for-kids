// Guess the word one letter at a time.
// Each player is only allowed to guess
// wrong three times.

//Global Variables
// Create another array to store good guesses
let secret;
// Create a variable to store the number of bad guesses
let strikes;
let word;

window.onload = function () {
    var textBox = document.getElementById("TextBox");

    textBox.focus();
    textBox.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("SubmitButton").click();
        }
   });

   initalizePage();
}

function initalizePage()
{
    var submitButton = document.getElementById("SubmitButton");
    submitButton.removeEventListener("click", try_this_letter);
    submitButton.addEventListener("click", make_word_secret);

    var textBox = document.getElementById("TextBox");
    textBox.value = "";
    textBox.placeholder = "Enter Your Secret Word";

    var showedText = document.getElementById("ShowedText");
    showedText.innerText = "***************"

    secret = [];
    strikes = 0;
    word = "";
}

function make_word_secret() {
    console.log("make_word_secret function");
    var submitButton = document.getElementById("SubmitButton");
    var showedText = document.getElementById("ShowedText");
    var textBox = document.getElementById("TextBox");
    word = textBox.value;

    textBox.value = "";
    textBox.placeholder = "Enter A Letter To Try";

    submitButton.removeEventListener("click", make_word_secret);
    submitButton.addEventListener("click", try_this_letter);


    // Filling the array with placeholders for guessing
    showedText.innerText = "";
    for (i = 0; i < word.length; i++) {
        secret.push("_");
    }
    showedText.innerText = secret;
}

function try_this_letter() {
    console.log("try this letter funcion");

    var textBox = document.getElementById("TextBox");
    var showedText = document.getElementById("ShowedText");

    // TODO case he enter multiple letters
    var letter = textBox.value;
    textBox.value = "";

    // If the letter does not exist in the word,
    // add it to the bad guesses.
    if (word.indexOf(letter) < 0) {
        // add a strike
        strikes++;
        //TODO change this alert
        alert("Bad guess!");

        // If the letter exists in the word, we need to
        // add it to the good guesses array
    } else {
        for (i = 0; i < word.length; i++) {
            // Each time the guess letter is found, we
            // add it as a good guess in the same spot
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
    if (strikes === 3) {
        alert("Sorry, please play again!");
    } else {
        alert("Congratulations on your win!");
    }
    
    alert("The secret word was " + word);

    initalizePage();
}

//TODO enter same correct letter multiple times