// sudoku-feedback.js
// Feedback emocional y acciones finales del Sudoku

export function createSudokuFeedback() {
  const feedbackEl = document.getElementById("sudoku-feedback");
  const actionsEl = document.getElementById("sudoku-actions");

  if (!feedbackEl) {
    console.warn("Sudoku feedback element not found");
    return {
      update: () => {},
      reset: () => {}
    };
  }

  let showedAlmost = false;
  let showedSolved = false;

  function showMessage(msg) {
    feedbackEl.innerHTML = msg;
    feedbackEl.hidden = false;
  }

  function hideMessage() {
    feedbackEl.innerHTML = "";
    feedbackEl.hidden = true;
  }

  function showActions() {
    if (actionsEl) actionsEl.hidden = false;
  }

  function hideActions() {
    if (actionsEl) actionsEl.hidden = true;
  }

  return {
    reset() {
      showedAlmost = false;
      showedSolved = false;
      hideMessage();
      hideActions();
    },

    update({ conflicts, emptyCells, solved }) {
      // 1️⃣ Error
      if (conflicts > 0) {
        showMessage("🙂 Ups, probá con otro número.");
        hideActions();
        return;
      }

      // Limpiar mensaje de error
      hideMessage();

      // 2️⃣ Cerca del final (una sola vez)
      if (!showedAlmost && emptyCells <= 5 && emptyCells > 0) {
        showMessage("🙂 ¡Genial! Ya estás cerca.");
        showedAlmost = true;
        return;
      }

      // 3️⃣ Final
      if (!showedSolved && solved) {
        showMessage("🥳 Woow!! ¡Excelente trabajo! 🥳<br><small>Completaste el Sudoku.</small>");
        showedSolved = true;
        showActions();
      }
    }
  };
}
