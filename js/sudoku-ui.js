document.addEventListener("DOMContentLoaded", () => {

  // Elementos
  const btnComenzar = document.getElementById("btnComenzar");
  const intro = document.getElementById("intro");
  const juego = document.getElementById("juego");

  // Seguridad básica
  if (!btnComenzar || !intro || !juego) {
    console.error("FALLTEM Sudoku: elementos base no encontrados");
    return;
  }

  // Click en Comenzar
  btnComenzar.addEventListener("click", () => {
    intro.hidden = true;
    juego.hidden = false;

    renderTableroVacio();
  });

  // Render tablero vacío (provisorio)
  function renderTableroVacio() {
    juego.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "sudoku-grid";

    for (let i = 0; i < 81; i++) {
      const cell = document.createElement("div");
      cell.className = "sudoku-cell";
      grid.appendChild(cell);
    }

    juego.appendChild(grid);
  }

});



window.onerror = function (message, source, lineno, colno, error) {
  console.error("FALLTEM Sudoku error:", message, lineno);
};

