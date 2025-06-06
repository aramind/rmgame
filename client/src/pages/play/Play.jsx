import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import useIsInMobile from "../../hooks/useIsInMobile";
import Board from "./Board";
import checkWinner from "../../utils/checkWinner";

const Play = () => {
  const isInMobile = useIsInMobile();

  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("R");

  const handleCellClick = (index) => {
    if (board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      alert(`${winner} wins!`);
    } else if (newBoard.every((cell) => cell !== "")) {
      alert("It's a draw!");
    } else {
      setCurrentPlayer(currentPlayer === "R" ? "M" : "R");
    }
  };

  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h5" gutterBottom>
        Current Player: {currentPlayer}
      </Typography>
      <Board
        board={board}
        onCellClick={handleCellClick}
        currentPlayer={currentPlayer}
      />
    </Box>
  );
};

export default Play;
