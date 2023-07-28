const board = document.querySelectorAll(".play-box");

const player = (name, mark) => {
  return { name, mark };
};

const GamingBoard = (() => {
  const player1 = player("Chanpeet", "X");
  const player2 = player("Singh", "0");
  let turn = currentPlayer();

  const renderOnTheDisplay = (boxNumber) => {
    board[boxNumber].appendChild(document.createTextNode(turn().mark));
  };

  // toggle between the current players
  function currentPlayer() {
    let current = player2;
    return function () {
      current = current === player2 ? player1 : player2;
      return current;
    };
  }
  return { renderOnTheDisplay, currentPlayer };
})();

// function to get the target box on the board through onClick event
function getBoardInput(event) {
  let targetBox = event.target.dataset.box;

  //make sure only one entry in one box
  if (board[targetBox].childNodes.length === 0) {
    GamingBoard.renderOnTheDisplay(targetBox);
  }
}

board.forEach((element) => element.addEventListener("click", getBoardInput));
