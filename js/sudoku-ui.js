document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const gameScreen = document.getElementById("game-screen");
  const startBtn = document.getElementById("start-btn");
  const board = document.getElementById("sudoku-board");

  startBtn.addEventListener("click", () => {
    introScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    renderEmptyBoard();
  });

  function renderEmptyBoard() {
    board.innerHTML = "";

    for (let i = 0; i < 81; i++) {
      const cell = document.createElement("div");
      cell.className =
        "aspect-square bg-white border-2 border-neutral-300 text-lg flex items-center justify-center cursor-pointer";
      board.appendChild(cell);
    }
  }
});


window.onerror = function (message, source, lineno, colno, error) {
  console.error("FALLTEM Sudoku error:", message, lineno);
};

