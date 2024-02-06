const board = document.querySelectorAll(".play-box");
const announceWinner = document.querySelector(".winners");
announceWinner.classList.add("winners");

const player = (name, mark) => {
  return { name, mark };
};

const player1 = player("Player One", "X");
const player2 = player("Player Two", "0");

// board argument is declared on the first line and passed it here.
const GamingBoard = ((board) => {
  let boardRecord = {};
  let turn = currentPlayer();

  // boxNumbers are obtained from the onClick event, getBoardInput
  //code below will get the appended data in the box and put it in the boardRecord.
  // board.forEach will erase the old data and insert the new entries in the boardRecord
  const renderOnTheDisplay = (boxNumber) => {
    boardRecord = {};
    const mark = turn().mark;
    ``;
    board[boxNumber].appendChild(document.createTextNode(mark));
    board.forEach((box) => {
      if (!boardRecord[box.innerHTML]) boardRecord[box.innerHTML] = "";
      boardRecord[box.innerHTML] += box.dataset.box;
    });

    if (winner(mark)) {
      //this line will reverse the winner so that when we declare the winner it does not reverse;
      turn();
      announceWinner.appendChild(
        document.createTextNode(`The winner is ${turn().name}`)
      );
    }
    // else will check if there is no empty box in the gaming board by
    // checking there is no value to [""] string in the object AND there is not winner
    else if (!boardRecord[""] && !winner(mark)) {
      console.log("It's a draw");
    }
  };

  // toggle between the current players
  function currentPlayer() {
    let current = player2;
    return function () {
      current = current === player2 ? player1 : player2;
      return current;
    };
  }

  function winner(mark) {
    let winningCombinations = [
      "036",
      "012",
      "048",
      "147",
      "246",
      "258",
      "345",
      "678",
    ];

    return winningCombinations.some((combination) =>
      combination
        .split("")
        .every((position) => boardRecord[mark].includes(position))
    );
  }

  return { renderOnTheDisplay, currentPlayer };
})(board);

// function to get the target box on the board through onClick event
function getBoardInput(event) {
  let targetBox = event.target.dataset.box;

  //make sure only one entry in one box
  if (board[targetBox].childNodes.length === 0) {
    GamingBoard.renderOnTheDisplay(targetBox);
  }
}

board.forEach((element) => element.addEventListener("click", getBoardInput));
