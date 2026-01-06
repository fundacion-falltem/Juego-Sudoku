document.addEventListener("DOMContentLoaded", () => {

  const btnComenzar = document.getElementById("btnComenzar");
  const intro = document.getElementById("intro");
  const juego = document.getElementById("juego");

  const aboutBtn = document.getElementById("aboutBtn");
  const aboutModal = document.getElementById("aboutModal");
  const modalClose = aboutModal?.querySelector(".modal-close");
  const modalOk = aboutModal?.querySelector(".modal-actions .btn");

  // Seguridad
  if (!btnComenzar || !intro || !juego) {
    console.error("FALLTEM Sudoku: elementos base no encontrados");
    return;
  }

  // --- Comenzar ---
  btnComenzar.addEventListener("click", () => {
    intro.hidden = true;
    juego.hidden = false;

    renderTableroVacio();
  });

  // --- Modal ? ---
  if (aboutBtn && aboutModal) {
    aboutBtn.addEventListener("click", () => {
      aboutModal.setAttribute("aria-hidden", "false");
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", cerrarModal);
  }

  if (modalOk) {
    modalOk.addEventListener("click", cerrarModal);
  }

  function cerrarModal() {
    aboutModal.setAttribute("aria-hidden", "true");
  }

  // --- Tablero provisorio ---
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

