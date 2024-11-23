import { Square } from "./Square";

export function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {Array(3)
          .fill(null)
          .map((_, col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
            />
          ))}
      </div>
      {Array(2)
        .fill(null)
        .map((_, row) => (
          <div className="board-row" key={row + 1}>
            {Array(3)
              .fill(null)
              .map((_, col) => (
                <Square
                  key={row * 3 + col + 3}
                  value={squares[row * 3 + col + 3]}
                  onSquareClick={() => handleClick(row * 3 + col + 3)}
                />
              ))}
          </div>
        ))}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
