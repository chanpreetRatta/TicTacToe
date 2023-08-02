const board = document.querySelectorAll(".play-box");

const player = (name, mark) => {
  return { name, mark };
};

// board argument is declared on the first line and passed it here.
const GamingBoard = ((board) => {
  let boardRecord = {};
  const player1 = player("Chanpeet", "X");
  const player2 = player("Singh", "0");
  let turn = currentPlayer();

  // boxNumbers are obtained from the onClick event, getBoardInput
  //code below will get the appended data in the box and put it in the boardRecord.
  // board.forEach will erase the old data and insert the new entries in the boardRecord
  const renderOnTheDisplay = (boxNumber) => {
    boardRecord = {};
    const mark = turn().mark;
    board[boxNumber].appendChild(document.createTextNode(mark));
    board.forEach((box) => {
      if (!boardRecord[box.innerHTML]) boardRecord[box.innerHTML] = "";
      boardRecord[box.innerHTML] += box.dataset.box;
    });

    if (winner(mark)) {
      console.log(`Congratulation ${currentPlayer()().name} wins`);
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

    return (
      winningCombinations.includes(boardRecord[mark].slice(-3)) ||
      winningCombinations.includes(boardRecord[mark].slice(0, 3))
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
