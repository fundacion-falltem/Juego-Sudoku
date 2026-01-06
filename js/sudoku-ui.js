document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("sudoku-board");

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = "";
    board.appendChild(cell);
  }
});
