import { SUDOKU_DATA } from "./sudoku-data.js";
import { isValidPlacement } from "./sudoku-core.js";

document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // Estado del juego
  // =====================
  const state = {
    puzzle: [...SUDOKU_DATA.puzzle],
    solution: [...SUDOKU_DATA.solution],
    current: [...SUDOKU_DATA.puzzle],
    given: SUDOKU_DATA.puzzle.map(v => v !== 0),
    selected: null,
    conflicts: new Set()
  };

  // =====================
  // Elementos base
  // =====================
  const btnComenzar = document.getElementById("btnComenzar");
  const intro = document.getElementById("intro");
  const juego = document.getElementById("juego");

  if (!btnComenzar || !intro || !juego) {
    console.error("FALLTEM Sudoku: elementos base no encontrados");
    return;
  }

  // =====================
  // Inicio del juego
  // =====================
  btnComenzar.addEventListener("click", () => {
    intro.hidden = true;
    juego.hidden = false;
    updateConflicts();
    render();
  });

  // =====================
  // Render principal
  // =====================
  function render() {
    juego.innerHTML = "";
    renderBoard();
    renderKeypad();
  }

  // =====================
  // Tablero
  // =====================
  function renderBoard() {
    const grid = document.createElement("div");
    grid.className = "sudoku-grid";

    state.current.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.className = "sudoku-cell";
      cell.dataset.index = index;

      if (state.given[index]) {
        cell.classList.add("given");
        cell.textContent = value;
      } else {
        cell.textContent = value === 0 ? "" : value;

        cell.addEventListener("click", () => {
          state.selected = index;
          render();
        });
      }

      if (state.selected === index) {
        cell.classList.add("selected");
      }

      if (state.conflicts.has(index)) {
        cell.classList.add("conflict");
      }

      grid.appendChild(cell);
    });

    juego.appendChild(grid);
  }

  // =====================
  // Keypad
  // =====================
  function renderKeypad() {
    const pad = document.createElement("div");
    pad.className = "sudoku-keypad";

    for (let n = 1; n <= 9; n++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = n;

      btn.addEventListener("click", () => {
        placeNumber(n);
      });

      pad.appendChild(btn);
    }

    const erase = document.createElement("button");
    erase.type = "button";
    erase.textContent = "⌫";

    erase.addEventListener("click", clearCell);
    pad.appendChild(erase);

    juego.appendChild(pad);
  }

  // =====================
  // Acciones
  // =====================
  function placeNumber(value) {
    if (state.selected === null) return;
    if (state.given[state.selected]) return;

    state.current[state.selected] = value;
    updateConflicts();
    render();
  }

  function clearCell() {
    if (state.selected === null) return;
    if (state.given[state.selected]) return;

    state.current[state.selected] = 0;
    updateConflicts();
    render();
  }

  // =====================
  // Conflictos suaves
  // =====================
  function updateConflicts() {
    state.conflicts.clear();

    state.current.forEach((value, index) => {
      if (value === 0) return;

      if (!isValidPlacement(state.current, index, value)) {
        state.conflicts.add(index);
      }
    });
  }

});


window.onerror = function (message, source, lineno, colno, error) {
  console.error("FALLTEM Sudoku error:", message, lineno);
};

