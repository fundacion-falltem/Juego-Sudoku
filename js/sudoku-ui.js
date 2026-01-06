document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("sudoku-board");

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("div");
    cell.className =
      "aspect-square bg-white border-2 border-neutral-300 text-lg flex items-center justify-center cursor-pointer";
    cell.textContent = "";
    board.appendChild(cell);
  }
});
