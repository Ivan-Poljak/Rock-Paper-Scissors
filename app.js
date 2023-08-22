//Variables
let userScore = 0;
let computerScore = 0;
let currentRound = 0;
let draws = 0;

const message = document.querySelector(".message > p");
const messageSpan = document.createElement("span");

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const resetBttn = document.querySelector("button");

const round = document.querySelector(".round-child > p > span");
const userScoreElement = document.querySelector(".user-score");
const computerScoreElement = document.querySelector(".computer-score");

//Modal Variables
const modalContainer = document.querySelector(".modal-container");
const roundsSpan = document.querySelector(".rounds");
const winsSpan = document.querySelector(".wins");
const lossesSpan = document.querySelector(".losses");
const drawsSpan = document.querySelector(".draws");

const closeBtn = document.querySelector(".close-btn");

//Functions
// Randomly chooses between rock, paper or scissors
function computerChoice() {
  const choicesArr = ["rock", "paper", "scissors"];
  let randomNumber = Math.floor(Math.random() * choicesArr.length);

  return choicesArr[randomNumber];
}

//increases the number of rounds when the game starts
function roundIncrement() {
  currentRound++;
  round.innerHTML = currentRound;
}

//Adds text and a class to the span element. Appends span to the .message > p element
function changeSpanClass(text, className) {
  messageSpan.innerHTML = text;
  messageSpan.classList.add(className);
  message.appendChild(messageSpan);
}

//Checks for the class. Removes the class if true
function removeSpanClass() {
  if (messageSpan.classList) {
    messageSpan.classList.remove(messageSpan.classList[0]);
  }
}

//Compares user and computer choices
function win(userChoice, computerChoice) {
  userScore++;
  userScoreElement.innerText = userScore;
  computerScoreElement.innerText = computerScore;

  message.innerHTML = `${
    userChoice[0].toUpperCase() + userChoice.slice(1, userChoice.length)
  } beats ${
    computerChoice[0].toUpperCase() +
    computerChoice.slice(1, computerChoice.length)
  }. `;
}

//Compares user and computer choices
function lose(userChoice, computerChoice) {
  computerScore++;
  computerScoreElement.innerText = computerScore;
  userScoreElement.innerText = userScore;

  message.innerText = `${
    userChoice[0].toUpperCase() + userChoice.slice(1, userChoice.length)
  } loses to ${
    computerChoice[0].toUpperCase() +
    computerChoice.slice(1, computerChoice.length)
  }. `;
}

//Compares user and computer choices
function draw(userChoice, computerChoice) {
  draws++;
  message.innerHTML = `${
    userChoice[0].toUpperCase() + userChoice.slice(1, userChoice.length)
  } equals
    ${
      computerChoice[0].toUpperCase() +
      computerChoice.slice(1, computerChoice.length)
    }. `;
}

function decisionBetweenWinner(userChoice) {
  const getCumputerChoice = computerChoice();

  if (
    (userChoice === "rock" && getCumputerChoice === "scissors") ||
    (userChoice === "paper" && getCumputerChoice === "rock") ||
    (userChoice === "scissors" && getCumputerChoice === "paper")
  ) {
    removeSpanClass();
    win(userChoice, getCumputerChoice);
    changeSpanClass("You won!", "win");
  } else if (
    (userChoice === "rock" && getCumputerChoice === "paper") ||
    (userChoice === "paper" && getCumputerChoice === "scissors") ||
    (userChoice === "scissors" && getCumputerChoice === "rock")
  ) {
    removeSpanClass();
    lose(userChoice, getCumputerChoice);
    changeSpanClass("You lose!", "lose");
  } else {
    removeSpanClass();
    draw(userChoice, getCumputerChoice);
    changeSpanClass("It's draw!", "draw");
  }
}

//Current winner gets background color (user = green, computer = red)
function whoIsWinning() {
  const userDiv = document.querySelector(".user");
  const computerDiv = document.querySelector(".computer");
  if (userScore > computerScore) {
    userDiv.style.backgroundColor = "#1da05a";
  } else if (userScore < computerScore) {
    computerDiv.style.backgroundColor = "#e23535";
  } else {
    computerDiv.style.backgroundColor = "white";
    userDiv.style.backgroundColor = "white";
  }
}

//Event Listeners
rock.addEventListener("click", function () {
  roundIncrement();
  decisionBetweenWinner("rock");
  whoIsWinning();
});

paper.addEventListener("click", function () {
  roundIncrement();
  decisionBetweenWinner("paper");
  whoIsWinning();
});

scissors.addEventListener("click", function () {
  roundIncrement();
  decisionBetweenWinner("scissors");
  whoIsWinning();
});

resetBttn.addEventListener("click", function () {
  modalContainer.style.display = "flex";
  roundsSpan.innerText = currentRound;
  winsSpan.innerText = userScore;
  lossesSpan.innerText = computerScore;
  drawsSpan.innerText = draws;

  // alert(
  //   `Final score!\nRounds: ${currentRound}\nWins: ${userScore} \nLosses: ${computerScore}\nDraws: ${draws}`
  // );
  userScore = 0;
  computerScore = 0;
  currentRound = 0;
  draws = 0;

  whoIsWinning();

  round.innerHTML = "0";
  userScoreElement.innerHTML = "0";
  computerScoreElement.innerHTML = "0";

  message.innerHTML = "Choose between rock, paper or scissors.";
  closeBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
  modalContainer.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
});
