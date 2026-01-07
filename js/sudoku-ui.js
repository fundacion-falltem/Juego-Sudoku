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
    juego.querySelector(".sudoku-board").innerHTML = "";
    renderBoard();
  }

  // =====================
  // Tablero
  // =====================
  function renderBoard() {
    const board = document.getElementById("sudoku-board");

    state.current.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.className = "sudoku-cell";
      cell.dataset.index = index;

      if (state.given[index]) {
        cell.classList.add("is-fixed");
        cell.textContent = value;
      } else {
        cell.textContent = value === 0 ? "" : value;

        cell.addEventListener("click", () => {
          state.selected = index;
          render();
        });
      }

      if (state.selected === index) {
        cell.classList.add("is-selected");
      }

      if (state.conflicts.has(index)) {
        cell.classList.add("conflict");
      }

      board.appendChild(cell);
    });
  }

  // =====================
  // Keypad
  // =====================
  document.querySelectorAll(".sudoku-key").forEach(btn => {
    btn.addEventListener("click", () => {
      placeNumber(Number(btn.textContent));
    });
  });

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
