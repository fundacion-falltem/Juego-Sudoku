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
  const board = document.getElementById("sudoku-board");
  const keypad = document.querySelector(".sudoku-keypad");

  if (!btnComenzar || !intro || !juego || !board || !keypad) {
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
    board.innerHTML = "";
    renderBoard();
  }

  // =====================
  // Tablero
  // =====================
  function renderBoard() {
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
          showKeypad();
          render();
        });
      }

      // celda seleccionada
      if (state.selected === index) {
        cell.classList.add("is-selected");
      }

      // conflicto directo
      if (state.conflicts.has(index)) {
        cell.classList.add("conflict");
      }

      // mismo número (feedback visual)
      if (
        state.selected !== null &&
        state.current[index] !== 0 &&
        state.current[index] === state.current[state.selected]
      ) {
        cell.classList.add("same-number");
      }

      board.appendChild(cell);
    });
  }

  // =====================
  // Keypad
  // =====================
  keypad.querySelectorAll(".sudoku-key").forEach(btn => {
    btn.addEventListener("click", () => {
      const value = Number(btn.textContent);
      placeNumber(value);
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
    hideKeypad();
    render();
  }

  // =====================
  // Conflictos
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

  // =====================
  // Keypad contextual
  // =====================
  function showKeypad() {
    keypad.classList.add("is-visible");
  }

  function hideKeypad() {
    keypad.classList.remove("is-visible");
  }

  // =====================
  // Click fuera → cerrar keypad (mobile)
  // =====================
  document.addEventListener("click", (e) => {
    if (
      state.selected !== null &&
      !e.target.closest(".sudoku-cell") &&
      !e.target.closest(".sudoku-keypad")
    ) {
      hideKeypad();
    }
  });

});
