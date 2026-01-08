// =======================================
// Sudoku Generator — MVP
// Genera un Sudoku válido en memoria
// =======================================

export function generateSudoku({ clues = 40 } = {}) {
  const solution = generateSolution();
  const puzzle = makePuzzle(solution, clues);

  return {
    puzzle,
    solution
  };
}

// =======================================
// Generar solución completa
// =======================================

function generateSolution() {
  const grid = Array(81).fill(0);
  solveGrid(grid);
  return grid;
}

function solveGrid(grid) {
  const index = findEmptyCell(grid);
  if (index === -1) return true;

  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of numbers) {
    if (isSafe(grid, index, num)) {
      grid[index] = num;
      if (solveGrid(grid)) return true;
      grid[index] = 0;
    }
  }

  return false;
}

// =======================================
// Crear puzzle quitando números
// =======================================

function makePuzzle(solution, clues) {
  const puzzle = [...solution];
  const indices = shuffle([...Array(81).keys()]);

  let remaining = 81;

  for (const index of indices) {
    if (remaining <= clues) break;

    puzzle[index] = 0;
    remaining--;
  }

  return puzzle;
}

// =======================================
// Helpers Sudoku
// =======================================

function findEmptyCell(grid) {
  return grid.findIndex(v => v === 0);
}

function isSafe(grid, index, value) {
  const row = Math.floor(index / 9);
  const col = index % 9;

  // fila
  for (let c = 0; c < 9; c++) {
    if (grid[row * 9 + c] === value) return false;
  }

  // columna
  for (let r = 0; r < 9; r++) {
    if (grid[r * 9 + col] === value) return false;
  }

  // bloque 3x3
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[(boxRow + r) * 9 + (boxCol + c)] === value) {
        return false;
      }
    }
  }

  return true;
}

// =======================================
// Utilidad
// =======================================

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
