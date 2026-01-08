// sudoku-feedback.js
// Maneja mensajes de feedback (errores, progreso, final)

export function createSudokuFeedback() {
  const el = document.getElementById("sudoku-feedback");
  if (!el) {
    console.warn("Sudoku feedback element not found");
    return {
      update: () => {},
      reset: () => {}
    };
  }

  let showedAlmost = false;
  let showedSolved = false;

  function show(msg) {
    el.textContent = msg;
    el.hidden = false;
  }

  function hide() {
    el.textContent = "";
    el.hidden = true;
  }

  return {
    reset() {
      showedAlmost = false;
      showedSolved = false;
      hide();
    },

    update({ conflicts, emptyCells, solved }) {
      // Prioridad 1: error
      if (conflicts > 0) {
        show("Ese número no cumple las reglas.");
        return;
      }

      // Si no hay conflictos, limpiamos error
      hide();

      // Prioridad 2: casi terminado (una sola vez)
      if (!showedAlmost && emptyCells <= 5 && emptyCells > 0) {
        show("Ya falta poco.");
        showedAlmost = true;
        return;
      }

      // Prioridad 3: final
      if (!showedSolved && solved) {
        show("¡Muy bien! Completaste el Sudoku.");
        showedSolved = true;
      }
    }
  };
}
