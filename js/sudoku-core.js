// Funciones puras de Sudoku (no tocan DOM)

export function getRow(index) {
  return Math.floor(index / 9);
}

export function getCol(index) {
  return index % 9;
}

export function getBlock(index) {
  const row = getRow(index);
  const col = getCol(index);
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

export function isValidPlacement(board, index, value) {
  if (value === 0) return true;

  const row = getRow(index);
  const col = getCol(index);
  const block = getBlock(index);

  for (let i = 0; i < 81; i++) {
    if (i === index) continue;

    if (
      board[i] === value &&
      (
        getRow(i) === row ||
        getCol(i) === col ||
        getBlock(i) === block
      )
    ) {
      return false;
    }
  }

  return true;
}

export function isComplete(board, solution) {
  for (let i = 0; i < 81; i++) {
    if (board[i] !== solution[i]) {
      return false;
    }
  }
  return true;
}
