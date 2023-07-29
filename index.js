const board = document.querySelectorAll(".play-box");

const player = (name, mark) => {
  return { name, mark };
};

// board argument is declared on the first line and passed it here.
const GamingBoard = ((board) => {
  let boardRecord = {
    X: "",
    0: "",
  };
  const player1 = player("Chanpeet", "X");
  const player2 = player("Singh", "0");
  let turn = currentPlayer();

  // boxNumbers are obtained from the onClick event, getBoardInput
  const renderOnTheDisplay = (boxNumber) => {
    const mark = turn().mark;
    board[boxNumber].appendChild(document.createTextNode(mark));
    boardRecord[mark] += boxNumber;
    winner();
  };

  // toggle between the current players
  function currentPlayer() {
    let current = player2;
    return function () {
      current = current === player2 ? player1 : player2;
      return current;
    };
  }

  function winner() {}

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
