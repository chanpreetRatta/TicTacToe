const playBox = document.querySelectorAll(".play-box");

function thisFunction(e) {
  let array = [];
  e.target.textContent = "X";
}

playBox.forEach((item) => {
  item.addEventListener("click", thisFunction);
});
