let playButton = document.querySelector(".play-btn");
let restartButton = document.querySelector(".restart-btn");

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  return rollDie() + rollDie();
}

function playGame() {
  let bank = document.querySelector(".bet-amount");
  let amountInBank = bank.value;
  let initialBet = bank.value;
  let betHistory = [];

  if (!amountInBank || amountInBank <= 0) {
    alert("You need to bet some money in order to play");
    return;
  }

  while (amountInBank > 0) {
    let diceTotal = rollDice();
    betHistory.push(amountInBank);
    if (diceTotal === 7) {
      amountInBank += 4;
    } else {
      amountInBank -= 1;
    }
  }

  if (amountInBank < 1) {
    let initialBetDisplay = document.getElementById("initial-bet");
    let rollsDisplay = document.getElementById("total-rolls");
    let resultsScreen = document.querySelector(".results-div");
    let highestDollarAmountDisplay = document.getElementById("max-bet");
    let shouldHaveQuitDisplay = document.getElementById("should-have-quit");
    let highestDollarAmount = findMax(betHistory);
    let rollYouShouldHaveQuitOn = findIndex(highestDollarAmount, betHistory);

    initialBetDisplay.innerText = "$" + initialBet;
    rollsDisplay.innerText = betHistory.length;
    highestDollarAmountDisplay.innerText = highestDollarAmount;
    shouldHaveQuitDisplay.innerText = rollYouShouldHaveQuitOn;
    playButton.style.display = "none";
    resultsScreen.style.display = "block";
  }
}

function findMax(someArray) {
  let maxValue = someArray[0];
  for (let i = 0; i <= someArray.length; i++) {
    maxValue = someArray[i] > maxValue ? someArray[i] : maxValue;
  }
  console.log(maxValue);
  return maxValue;
}

function findIndex(number, array) {
  for (let i = 0; i <= array.length; i++) {
    if (number === array[i]) {
      return i + 1;
    }
  }
}

function resetGame() {
  playButton.style.display = "block";
  document.querySelector(".results-div").style.display = "none";
  let placeBet = document.querySelector(".bet-amount");
  placeBet.value = "";
}

playButton.addEventListener("click", playGame);
restartButton.addEventListener("click", resetGame);
