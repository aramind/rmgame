import checkWinner from "./checkWinner";

const updateGameBoard = ({ index, board, currentPlayer }) => {
  if (board[index] !== "") return null;

  const newBoard = [...board];
  newBoard[index] = currentPlayer;

  const result = checkWinner(newBoard);
  const allFilled = newBoard.every((cell) => cell !== "");
  const ended = allFilled || !!result?.winner;

  return {
    board: newBoard,
    nextPlayer: currentPlayer === "R" ? "M" : "R",
    winPlayer: result?.winner || (allFilled ? "none" : ""),
    winningLine: result?.winningLine || [],
    ended,
  };
};

export default updateGameBoard;
