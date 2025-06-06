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
import usePlayerActions from "../../hooks/api/player/usePlayerActions";
import useApiGet from "../../hooks/api/useApiGet";
import usePlayerReq from "../../hooks/api/player/usePlayerReq";

const Play = () => {
  const { sendAddGame } = useGameActions({ handleCloseDialog: {} });
  const { getById } = usePlayerReq();
  // states
  const [playersInLocal, setPlayersInLocal] = useState({});
  const [playerIds, setPlayerIds] = useState({ idR: null, idM: null });
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
    const players = localStorage.getItem("players");
    if (players) {
      const storedPlayers = JSON.parse(players);
      setPlayerIds({ idR: storedPlayers?.R, idM: storedPlayers?.M });
      setPlayersInLocal(storedPlayers);
    }
  }, []);

  const { idR, idM } = playerIds;

  console.log("IDS", playerIds);

  const {
    data: playerRData,
    isLoading: isLoadingInGetPlayerR,
    isError: isErrorInGetPlayerR,
  } = useApiGet(["playerR", idR], () => getById(idR), { enabled: !!idR });
  const {
    data: playerMData,
    isLoading: isLoadingInGetPlayerM,
    isError: isErrorInGetPlayerM,
  } = useApiGet(["playerM", idM], () => getById(idM), { enabled: !!idM });

  const sendAddGameReq = () => {
    const isDraw = winPlayer === "none";
    const winner =
      winPlayer === "none"
        ? null
        : winPlayer === "R"
        ? playerRData?.data?._id
        : playerMData?.data?._id;
    const loser =
      winPlayer === "none"
        ? null
        : winPlayer === "R"
        ? playerMData?.data?._id
        : playerRData?.data?._id;

    const payload = {
      playerR: playerRData?.data?._id,
      playerM: playerMData?.data?._id,
      displayNames: {
        R: playersInLocal?.gameName?.R || playerRData?.data?.username,
        M: playersInLocal?.gameName?.M || playerMData?.data?.username,
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
    R: `Winner is R (${
      playersInLocal?.gameName?.R || playerRData?.data?.username
    })`,
    M: `Winner is M (${
      playersInLocal?.gameName?.M || playerMData?.data?.username
    })`,
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
              <Player player={playerRData?.data} />
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
              <Player player={playerMData?.data} />
            </Box>
          )}
        </Stack>

        {ended && <GameEndActions onExit={onExit} onContinue={onContinue} />}
        {isInMobile && (
          <PlayersInMobile
            playerR={playerRData?.data}
            playerM={playerRData?.data}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Play;
