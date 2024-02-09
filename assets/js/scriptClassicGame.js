// -------------------------------------------------------------  Variables

// Buttons
const rock_but = document.getElementById("rock");
const paper_but = document.getElementById("paper");
const scissors_but = document.getElementById("scissors");
const lizard_but = document.getElementById("lizard");
const spock_but = document.getElementById("spock");

// Array for computer to choose from
const choices = ["rock", "paper", "scissors", "lizard", "spock"];

// Contains the divs that need to be added/removed by code
const toggleArea = document.getElementById("toggle-area-div");
const gameArea = document.getElementById("game-area");
const selectGameText = document.getElementById("select-game");
const tryAgain_div = document.getElementById("try-again-div");
const tryAgain_but = document.getElementById("try-again-button");

// Round progress
var userChoice = "";
var computerChoice = "";
var userWin = false;

// Round result
let resultMessage = document.getElementById("result-message");


// Ending game flags
var winCondition = 0;
var maxRounds = 0;
var bestOfRounds = 0;
var gameFinished = false;

// Match end message div
let vicDefMessage = document.getElementById("victory-defeat-message");


// -------------------------------------------------------------  Event listeners

// Adds event listener to each "best of" game mode button
const gameToggleButtons = document.getElementsByClassName('game-toggle');
for (let i = 0; i < gameToggleButtons.length; i++) {
    const button = gameToggleButtons[i].getElementsByTagName('button')[0];
    button.addEventListener('click', function () {
        const gameType = button.getAttribute('game-type');
        switch (gameType) {
            case 'of3':
                playBestOf(3);
                console.log("best of 3 chosen");
                break;
            case 'of5':
                playBestOf(5);
                console.log("best of 5 chosen");
                break;
            case 'of10':
                playBestOf(10);
                console.log("best of 10 chosen");
                break;
            default:
                console.error('Invalid game type');
        }
    });
}

// Sets event listener to each button -- needs rewrite similar to above ^^^
rock_but.addEventListener("click", function () {
    startGame("rock");
});

paper_but.addEventListener("click", function () {
    startGame("paper");
});

scissors_but.addEventListener("click", function () {
    startGame("scissors");
});


// Reset game to select
tryAgain_but.addEventListener("click", function () {
    tryAgain();
})


// -------------------------------------------------------------  Get choices

function getUserChoice(userClicked) {
    userChoice = userClicked;
    console.log("the user chose " + userChoice);
    document.getElementById("user-choice").innerText = `You chose ${userChoice}`;
}

function getComputerChoice() {
    randomNumber = Math.floor(Math.random() * 5);
    computerChoice = choices[randomNumber];
    console.log("the computer chose " + computerChoice);
    document.getElementById("computer-choice").innerText = `Computer chose ${computerChoice}`;
    return computerChoice;
}

function startGame(userClicked) {
    if (!gameFinished) {
        // tryAgain_div.classList.add("hidden");

        getUserChoice(userClicked);
        getComputerChoice();
        gameLogic();
    }
}


// -------------------------------------------------------------  Game logic

function gameLogic() {

    switch (userChoice + computerChoice) {
        // User wins
        case "rockscissors":
        case "rocklizard":
        case "paperrock":
        case "paperspock":
        case "scissorspaper":
        case "scissorslizard":
        case "lizardpaper":
        case "lizardspock":
        case "spockrock":
        case "spockscissors":
            iWin();
            break;
        // Draw state
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
        case "lizardlizard":
        case "spockspock":
            iDraw();
            break;
        // If not matching either that means PC wins
        default:
            iLose();
    }

    scoreCheck();
}


// -------------------------------  Round result

function iWin() {
    userWin = true;
    console.log("I won! ^-^");

    // Adds and removes visual feedback
    document.getElementById(userChoice).classList.add("btn-success");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("btn-success") }, 1000);

    addUserScore();

    beatText(userChoice, computerChoice);

    document.getElementById("win-lose-message").innerHTML = "<strong>You won! ^-^</strong>";
}

function iLose() {
    userWin = false;
    console.log("I lost! >,<");

    // Adds and removes visual feedback
    document.getElementById(userChoice).classList.add("btn-danger");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("btn-danger") }, 1000);

    addComputerScore();

    beatText(userChoice, computerChoice);

    document.getElementById("win-lose-message").innerHTML = "<strong>You lost! >,<</strong>";
}

function iDraw() {
    userWin = false;
    console.log("No winners...");

    // Adds and removes visual feedback
    document.getElementById(userChoice).classList.add("btn-info");
    setTimeout(function () { document.getElementById(userChoice).classList.remove("btn-info") }, 1000);


    document.getElementById("result-message").innerText = "Woops!";
    document.getElementById("win-lose-message").innerHTML = "<strong>No winners...</strong>";
}

function scoreCheck() {
    let userCheck = parseInt(document.getElementById("player-win").innerText);
    let computerCheck = parseInt(document.getElementById("computer-win").innerText);
    if (userCheck === winCondition) {
        endGame();
    }
    else if (computerCheck === winCondition) {
        endGame();
    }
}


// -------------------------------  Change text based off who won

function beatText(userChoice, computerChoice) {
    let beatContext = "";

    // User wins
    if (userWin) {
        if (userChoice === "rock") {
            beatContext = `Rock crushes ${computerChoice}`;
        }
        else if (userChoice === "paper" && computerChoice === "spock") {
            beatContext = "Paper disproves Spock";
        }
        else if (userChoice === "paper") {
            beatContext = "Paper covers Rock";
        }
        else if (userChoice === "scissors" && computerChoice === "paper") {
            beatContext = "Scissors cut Paper";
        }
        else if (userChoice === "scissors") {
            beatContext = "Scissors chop Lizard";
        }
        else if (userChoice === "lizard" && computerChoice === "paper") {
            beatContext = "Lizard eats Paper";
        }
        else if (userChoice === "lizard") {
            beatContext = "Lizard Poisons Spock";
        }
        else if (userChoice === "spock") {
            beatContext = `Spock vaporizes ${computerChoice}`;
        }
    }

    // Computer wins
    else if (!userWin) {
        if (userChoice === "rock" && computerChoice === "paper") {
            beatContext = "Rock is covered by Paper";
        }
        else if (userChoice === "rock") {
            beatContext = "Rock is vaporized by Spock";
        }
        else if (userChoice === "paper" && computerChoice === "lizard") {
            beatContext = "Paper is eaten by Lizard";
        }
        else if (userChoice === "paper") {
            beatContext = "Paper is cut by Scissors";
        }
        else if (userChoice === "scissors" && computerChoice === "rock") {
            beatContext = "Scissors are crushed by Rock";
        }
        else if (userChoice === "scissors") {
            beatContext = "Scissors are vaporized by Spock";
        }
        else if (userChoice === "lizard" && computerChoice === "rock") {
            beatContext = "Lizard is crushed by Rock";
        }
        else if (userChoice === "lizard") {
            beatContext = "Lizard is chopped by Scissors";
        }
        else if (userChoice === "spock" && computerChoice === "lizard") {
            beatContext = "Spock is poisoned by Lizard";
        }
        else if (userChoice === "spock") {
            beatContext = "Spock is disproved by paper";
        }
    }

    resultMessage.innerText = beatContext;
}


// -------------------------------------------------------------  Score increase

// Nicked this bit off Love Maths to adjust scores

function addUserScore() {
    let oldScore = parseInt(document.getElementById("player-win").innerText);
    document.getElementById("player-win").innerText = ++oldScore;
}

function addComputerScore() {
    let oldScore = parseInt(document.getElementById("computer-win").innerText);
    document.getElementById("computer-win").innerText = ++oldScore;
}


// -------------------------------------------------------------  Match data and Win condition

function playBestOf(maxRounds) {
    if (!toggleArea.classList.contains("hidden")) {
        toggleArea.classList.add("hidden");
    }
    gameArea.classList.remove("hidden");
    selectGameText.innerHTML = `<h5>You have selected best of ${maxRounds}</h5>`;

    // Sets game goal
    bestOfRounds = maxRounds;
    if (maxRounds === 3) {
        winCondition = 2;
    }
    else if (maxRounds === 5) {
        winCondition = 3;
    }
    else if (maxRounds === 10) {
        winCondition = 6;
    }
}

function endGame() {
    gameFinished = true;

    let playerScore = parseInt(document.getElementById("player-win").innerText);
    let computerScore = parseInt(document.getElementById("computer-win").innerText);

    // Match win logic
    if (playerScore > computerScore) {
        // alert(`Congratulations! You won the best of ${bestOfRounds}!`);
        vicDefMessage.innerHTML = `<h2>Congratulations! You won the best of ${bestOfRounds}!</h2>`;
        const innerVicDefText = vicDefMessage.querySelector("h2");
        innerVicDefText.style.color = "green";
    }

    else if (playerScore < computerScore) {
        // alert(`The computer won the best of ${bestOfRounds}. Better luck next time!`);
        vicDefMessage.innerHTML = `<h2>The computer won the best of ${bestOfRounds}. Better luck next time!</h2>`;
        const innerVicDefText = vicDefMessage.querySelector("h2");
        innerVicDefText.style.color = "red";
    } else {
        // alert("The game ended in a tie.");
        vicDefMessage.innerHTML = `<h2>Looks like you tied! No winners...</h2>`;
        const innerVicDefText = vicDefMessage.querySelector("h2");
        innerVicDefText.style.color = "blue";
    }

    // Display try again button
    tryAgain_div.classList.remove("hidden");
}


// -------------------------------------------------------------  Try again button

function tryAgain() {
    gameFinished = false;

    document.getElementById("player-win").innerText = 0;
    document.getElementById("computer-win").innerText = 0;

    gameArea.classList.add("hidden");

    tryAgain_div.classList.add("hidden");

    toggleArea.classList.remove("hidden");

    selectGameText.innerHTML = `<h1>Please select a game type to get started!</h1>`;
    vicDefMessage.innerText = "";
}