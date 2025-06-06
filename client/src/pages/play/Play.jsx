import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import useIsInMobile from "../../hooks/useIsInMobile";
import Board from "./Board";
import checkWinner from "../../utils/checkWinner";
import { useGlobalState } from "../../context/GlobalStateProvider";
import Player from "./Player";
import PlayersInMobile from "./PlayersInMobile";

const Play = () => {
  const {
    globalState: { players },
    dispatch,
  } = useGlobalState();
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("R");
  const [winningLine, setWinningLine] = useState([]);
  const [winner, setWinner] = useState("");
  const [ended, setEnded] = useState(false);
  const isInMobile = useIsInMobile();

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      dispatch({
        type: "SET_PLAYERS",
        payload: JSON.parse(storedPlayers),
      });
    }
  }, [dispatch]);

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
      setWinner("none");
    } else {
      setCurrentPlayer(currentPlayer === "R" ? "M" : "R");
      setWinningLine([]);
    }
  };

  const text = {
    none: `Draw`,
    R: `Winner is R (${players?.playerR?.name})`,
    M: `Winner is M (${players?.playerM?.name})`,
  };

  return (
    <Box
      pt="80px"
      width={{ xs: "90vw", md: "80vw" }}
      marginX="auto"
      minHeight="100vh"
    >
      <NavBar />
      <Box mt={4} textAlign="center" height={1}>
        <Typography variant="h5" gutterBottom>
          {text[winner] || `Current Turn: ${currentPlayer}`}
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={2}
          className="outlined2"
          width={1}
          height={1}
          justifyContent="center"
        >
          {!isInMobile && (
            <Box flex={1}>
              <Player player={players?.playerR} />
            </Box>
          )}
          <Box flex={1}>
            <Board
              board={board}
              onCellClick={handleCellClick}
              currentPlayer={currentPlayer}
              winningLine={winningLine}
              disabled={ended}
            />
          </Box>
          {!isInMobile && (
            <Box flex={1}>
              <Player player={players?.playerM} />
            </Box>
          )}
          {isInMobile && <PlayersInMobile players={players} />}
        </Stack>
      </Box>
    </Box>
  );
};

export default Play;
