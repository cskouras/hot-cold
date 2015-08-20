
$(document).ready(function(){
    newGame();

    /*--- Display information modal box ---*/
    $(".what").click(function(){
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
        $(".overlay").fadeOut(1000);
    });

    $("a.new").click(function() {
        newGame();
    });

    $("#guessButton").click(function(event) {
        event.preventDefault();
        guess();
    });
});

var randomNumber;
var feedback;
var userGuess;
var guessCount;
var guessList;

function newGame() {
    disableInput(false);
    randomNumber = createRandomNumber();
    feedback = "Make your Guess!";
    userGuess = "";
    guessCount = 0;
    guessList = [];
    updateDisplay();
}

function guess() {
    var guess = $("#userGuess").val();
    if(!isValidGuess(guess)){
        userGuess = "";
        updateDisplay();
        return;
    }
    feedback = getFeedback(guess);
    guessCount++;
    guessList.push(guess);
    userGuess = "";
    updateDisplay();
}

function updateDisplay() {
    $("#feedback").text(feedback);
    $("#userGuess").val(userGuess);
    $("#count").text(guessCount);
    $("#guessList").empty();
    if(guessList.length > 0) {
        for(var i = 0; i < guessList.length; i++) {
            var listItem = "<li>" + guessList[i] + "</li>";
            $("#guessList").append(listItem);
        }
    }
    $("#userGuess").focus();
}

/* Guess temperature */
function getFeedback(guess) {
   
    if(guess == randomNumber) {
        disableInput(true);
        return "Congrats! You guessed correctly!";
    }

    if(guess <= randomNumber + 5 && guess >= randomNumber - 5){
        return "You're boiling hot!";
    }

    if(guess <=randomNumber + 10 && guess >= randomNumber - 10){
    	return "You're hot!";
    }
    if (guess <=randomNumber + 20 && guess >= randomNumber - 20) {
    	return "You're lukewarm";
    }
    if(guess <= randomNumber + 30 && guess >= randomNumber - 30){
        return "You are cold";
    }
    if(guess <= randomNumber + 50 && guess >= randomNumber -50){
    	return "You are freezing cold!"
    }

    
}
/* Makes sure rules are being followed*/
function isValidGuess(guess) {
    if(guess === NaN|| guess === undefined || guess.trim().length === 0 ||
        !isWholeNumber(guess) || guess < 1 || guess > 100) {
        alert("Sorry, only enter numbers between 1 and 100; no decimals!");
        return false;
    }


    return true;
}

	/* Create random number */
function createRandomNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

function disableInput(disabled) {
    $("#userGuess").prop("disabled", disabled);
    $("#guessButton").prop("disabled", disabled);
}

function isWholeNumber(input) {
    var value = +input;
    if(isNaN(input)){
        return false;
    }
    if(input % 1 !== 0){
        return false;
    }
    return true;
}