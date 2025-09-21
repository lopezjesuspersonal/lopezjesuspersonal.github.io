// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Global variables
let randomNumber;
let attempts = 0;
let wins =  0;
let losses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    // hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    // unhide Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    // adding focus to textbox
    document.querySelector("#playerGuess").focus();

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // adding focus to textbox
    playerGuess.value = ""; // clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; // clearing the feedback

    let attemptsRemaining = document.querySelector("#attemptsRemaining");
    attemptsRemaining.textContent = 7 - attempts;

    // clearing previous guesses
    document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    let attemptsRemaining = document.querySelector("#attemptsRemaining");
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost! Number: " + randomNumber;
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
            attemptsRemaining.textContent = 7 - attempts;

        } else {
            feedback.textContent = "Guess was low";
            attemptsRemaining.textContent = 7 - attempts;
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; // hides Guess button
    resetBtn.style.display = "inline"; // displays Reset button

    let win = document.querySelector("#winsID");
    win.textContent = wins;
    win.style.color = "green";

    let loss = document.querySelector("#lossesID");
    loss.textContent = losses;
    loss.style.color = "red";
}