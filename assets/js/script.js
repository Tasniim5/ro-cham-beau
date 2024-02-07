const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
const lizard_div = document.getElementById("lizard");
const spock_div = document.getElementById("spock");

let resultMessage = document.getElementById("result-message");

const choices = ["rock", "paper", "scissors", "lizard", "spock"];

var userChoice = "";
var computerChoice = "";

var userWin = false;

// --------------------------------------------  Event listeners
rock_div.addEventListener("click", function () {
    getUserChoice("rock");
    getComputerChoice();
    gameLogic();
})

paper_div.addEventListener("click", function () {
    getUserChoice("paper");
    getComputerChoice();
    gameLogic();
})

scissors_div.addEventListener("click", function () {
    getUserChoice("scissors");
    getComputerChoice();
    gameLogic();
})

lizard_div.addEventListener("click", function () {
    getUserChoice("lizard");
    getComputerChoice();
    gameLogic();
})

spock_div.addEventListener("click", function () {
    getUserChoice("spock");
    getComputerChoice();
    gameLogic();
})


// -------------------------------------------- Choices
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


// --------------------------------------------  Game State
function iWin() {
    userWin = true;
    console.log("I won! ^-^");

    // Nicked this bit off Love Maths to increase score
    addUserScore();

    beatText(userChoice, computerChoice);

    document.getElementById("win-lose-message").innerHTML = "<strong>I won! ^-^</strong>";
}

function iLose() {
    userWin = false;
    console.log("I lost! >,<");

    addComputerScore();

    beatText(userChoice, computerChoice);

    document.getElementById("win-lose-message").innerHTML = "<strong>I lost! >,<</strong>";
}

function iDraw() {
    userWin = false;
    console.log("No winners...");
    
    document.getElementById("result-message").innerText = "";

    document.getElementById("win-lose-message").innerHTML = "<strong>No winners...</strong>";
}

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
}

// --------------------------------------------  Change text based off context
function beatText(userChoice, computerChoice) {
    let beatContext = "";
    // User wins
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



// --------------------------------------------  Score increase

/**
 * Gets current player score from DOM and adds 1,
 * storing back into DOM
 */
function addUserScore() {
    let oldScore = parseInt(document.getElementById("player-win").innerText);
    document.getElementById("player-win").innerText = ++oldScore;
}

/**
 * Gets current computer score from DOM and adds 1,
 * storing back into DOM
 */
function addComputerScore() {
    let oldScore = parseInt(document.getElementById("computer-win").innerText);
    document.getElementById("computer-win").innerText = ++oldScore;
}