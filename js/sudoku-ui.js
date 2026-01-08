import { SUDOKU_DATA } from "./sudoku-data.js";
import { isValidPlacement } from "./sudoku-core.js";
import { createSudokuFeedback } from "./sudoku-feedback.js";
import { generateSudoku } from "./sudoku-generator.js";


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
  const btnNuevo = document.getElementById("btnNuevoSudoku");

  if (!btnComenzar || !intro || !juego || !board || !keypad) {
    console.error("FALLTEM Sudoku: elementos base no encontrados");
    return;
  }

  // =====================
  // Feedback
  // =====================
  const feedback = createSudokuFeedback();

  // =====================
  // Inicio del juego
  // =====================
  btnComenzar.addEventListener("click", () => {
    intro.hidden = true;
    juego.hidden = false;

    // 🔄 Generar nuevo Sudoku
    const { puzzle, solution } = generateSudoku({ clues: 40 });

    state.puzzle = puzzle;
    state.solution = solution;
    state.current = [...puzzle];
    state.given = puzzle.map(v => v !== 0);
    state.selected = null;
    state.conflicts.clear();

    updateConflicts();
    feedback.reset();
    render();
    updateFeedback();
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

      // Celda seleccionada
      if (state.selected === index) {
        cell.classList.add("is-selected");
      }

      // Conflicto
      if (state.conflicts.has(index)) {
        cell.classList.add("conflict");
      }

      // Mismo número (ayuda visual)
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
    updateFeedback();
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
  // Feedback
  // =====================
  function updateFeedback() {
    const emptyCells = state.current.filter(v => v === 0).length;
    const solved = emptyCells === 0 && state.conflicts.size === 0;

    feedback.update({
      conflicts: state.conflicts.size,
      emptyCells,
      solved
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
      !e.target.closest(".sudoku-keypad") &&
      !e.target.closest(".sudoku-game")
    ) {
      hideKeypad();
    }
  });

  // =====================
  // Botón "Nuevo Sudoku"
  // =====================
  if (btnNuevo) {
    btnNuevo.addEventListener("click", () => {
      btnComenzar.click();
    });
  }

  // =====================
  // DEBUG (solo desarrollo)
  // =====================
  //window.__SUDOKU_DEBUG__ = {
  //  getState: () => state
  //};

});
