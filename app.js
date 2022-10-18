// Initialize the board and the players
let gameBoard;
const playerO = "O";
const playerX = "X";
let currentPlayer = playerX;
// Map the winning options
const winningOptions = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];


// Select all cells on the board
const cells = document.querySelectorAll(".cell");

startGame();

// function that starts the game, makes the cells empty if it is a restart, and removes the color of the winnning player
function startGame() {
  document.querySelector(".endgame").getElementsByClassName.display = "none";
  gameBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", whereClicked, false);
    document.querySelector(".endgame").style.display = "none";
  }
} 


// Function to check where the player clicked and make sure it was not already clicked
function whereClicked(square) {
  console.log(currentPlayer);
  if (typeof gameBoard[square.target.id] == "number") {
     turn(square.target.id, currentPlayer);
     currentPlayer = currentPlayer === playerX ? playerO : playerX;
     
  }
}


// Function to see which players turn it is and place his O/X in the cell. Also determine wether to continue playing
function turn(squareId, player) {
  gameBoard[squareId] = player;
  // console.log('1:', gameBoard)
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(gameBoard, player);
  !checkTie();
  if (gameWon) gameOver(gameWon);
}


// Check if the clicked box was already played
function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  // Loop that checks if the player played every possible winning option in the array to see if he won
  for (let [index, win] of winningOptions.entries()) {
    if (win.every(element => plays.indexOf(element) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

// Function to show the winning squares and also make sure players cannot click on any boxes once game is won.
function gameOver(gameWon) {
    for (let index of winningOptions[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == playerO ? "grey" : "lightGrey";
    }
    // Loop to make sure you cant click a cell already clicked
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', whereClicked, false)
    }
    declareWinner(gameWon.player == playerO ? "Player O Wins" : "Player X Wins")
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerText = who;

}

// Function that returns all the squares that have a number inside them, meaning they are empty
function emptySquares() {
    return gameBoard.filter(s => typeof s == 'number')
}

// Function that checks if its a draw (all the squares are occupied and no one won)
function checkTie() {
   console.log(emptySquares())
    if (emptySquares().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener('click', whereClicked, false);
            declareWinner("Tie Game")      
                
        }
        return true; 
    }  
    return false; 
}
