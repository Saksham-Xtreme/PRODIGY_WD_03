const cells = document.querySelectorAll('.cell');
const winLine = document.getElementById('win-line');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diags
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;
    if (!board[index] && !gameOver) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      if (checkWin()) {
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });
});

restartBtn.addEventListener('click', () => {
  board.fill(null);
  cells.forEach(cell => cell.textContent = '');
  winLine.style.width = 0;
  gameOver = false;
  currentPlayer = 'X';
});

function checkWin() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      drawLine(a, c);
      return true;
    }
  }
  return false;
}

function drawLine(fromIdx, toIdx) {
  const boardEl = document.getElementById('board');
  const fromCell = cells[fromIdx];
  const toCell = cells[toIdx];
  const boardRect = boardEl.getBoundingClientRect();
  const fromRect = fromCell.getBoundingClientRect();
  const toRect = toCell.getBoundingClientRect();

  const x1 = fromRect.left + fromRect.width / 2 - boardRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - boardRect.top;
  const x2 = toRect.left + toRect.width / 2 - boardRect.left;
  const y2 = toRect.top + toRect.height / 2 - boardRect.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  winLine.style.left = `${x1}px`;
  winLine.style.top = `${y1}px`;
  winLine.style.width = `${length}px`;
  winLine.style.transform = `rotate(${angle}deg)`;
}
