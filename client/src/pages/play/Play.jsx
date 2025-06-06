import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import useIsInMobile from "../../hooks/useIsInMobile";
import Board from "./Board";
import checkWinner from "../../utils/checkWinner";

const Play = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [winningLine, setWinningLine] = useState([]);
  const [winner, setWinner] = useState("");
  const [ended, setEnded] = useState(false);

  const handleCellClick = (index) => {
    if (board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (newBoard.every((cell) => cell !== "") || result?.winner) {
      setEnded(true);
    }
    if (result?.winner) {
      setWinningLine(result?.winningLine);
      setWinner(result?.winner);
      // alert(`${result?.winner} wins!`);
    } else if (newBoard.every((cell) => cell !== "")) {
      // alert("It's a draw!");
      setWinningLine([]);
      setWinner(result?.winner);
    } else {
      setCurrentPlayer(currentPlayer === "R" ? "M" : "R");
      setWinningLine([]);
    }
  };

  return (
    <Box pt="80px">
      <NavBar />
      <Box mt={4} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Current Player: {currentPlayer}
        </Typography>
        <Board
          board={board}
          onCellClick={handleCellClick}
          currentPlayer={currentPlayer}
          winningLine={winningLine}
          disabled={ended}
        />
        {winner && <Typography>winner is {winner}</Typography>}
      </Box>
    </Box>
  );
};

export default Play;
