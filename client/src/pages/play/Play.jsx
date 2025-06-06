import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import useIsInMobile from "../../hooks/useIsInMobile";
import Board from "./Board";
import checkWinner from "../../utils/checkWinner";
import { useGlobalState } from "../../context/GlobalStateProvider";
import Player from "./Player";
import PlayersInMobile from "./PlayersInMobile";
import { useNavigate } from "react-router-dom";
import GameEndActions from "./GameEndActions";
import GameStatus from "./GameStatus";
import useGameActions from "../../hooks/api/game/useGameActions";

const Play = () => {
  const {
    globalState: { players },
    dispatch,
  } = useGlobalState();
  const { sendAddGame } = useGameActions({ handleCloseDialog: {} });
  // states
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState(
    Math.random() < 0.5 ? "R" : "M"
  );
  const [winningLine, setWinningLine] = useState([]);
  const [winPlayer, setWinPlayer] = useState("");
  const [ended, setEnded] = useState(false);
  const isInMobile = useIsInMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      dispatch({
        type: "SET_PLAYERS",
        payload: JSON.parse(storedPlayers),
      });
    }
  }, [dispatch]);

  const sendAddGameReq = () => {
    const isDraw = winPlayer === "none";
    const winner =
      winPlayer === "none"
        ? null
        : winPlayer === "R"
        ? players?.playerR?._id
        : players?.playerM?._id;
    const loser =
      winPlayer === "none"
        ? null
        : winPlayer === "R"
        ? players?.playerM?._id
        : players?.playerR?._id;

    const payload = {
      playerR: players?.playerR?._id,
      playerM: players?.playerM?._id,
      displayNames: {
        R: players?.playerR?.name || players?.playerR?.username,
        M: players?.playerM?.name || players?.playerM?.username,
      },
      board: board,
      winner: winner,
      loser: loser,
      isDraw: isDraw,
    };

    console.log(payload);
    const res = sendAddGame(payload);
    console.log("AFTER ADDING", res);
  };
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
      setWinPlayer(result?.winner);
    } else if (newBoard.every((cell) => cell !== "")) {
      setWinningLine([]);
      setWinPlayer("none");
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

  // handlers
  const onContinue = () => {
    sendAddGameReq();
    setBoard(Array(9).fill(""));
    if (!winPlayer || winPlayer === "none") {
      const random = Math.random() < 0.5 ? "R" : "M";
      setCurrentPlayer(random);
    } else {
      setCurrentPlayer(winPlayer === "R" ? "M" : "R");
    }
    setWinningLine([]);
    setWinPlayer("");
    setEnded(false);
  };

  const onExit = () => {
    sendAddGameReq();
    localStorage.removeItem("players");
    navigate("/");
  };
  return (
    <Box
      pt="80px"
      width={{ xs: "90vw", md: "80vw" }}
      marginX="auto"
      minHeight="100vh"
    >
      <NavBar />
      <Stack mt={4} height={1} className="centered">
        <GameStatus
          text={text[winPlayer] || `Current Turn: ${currentPlayer}`}
        />
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={2}
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
        </Stack>

        {ended && <GameEndActions onExit={onExit} onContinue={onContinue} />}
        {isInMobile && <PlayersInMobile players={players} />}
      </Stack>
    </Box>
  );
};

export default Play;
