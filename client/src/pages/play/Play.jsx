import { Box, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import useIsInMobile from "../../hooks/useIsInMobile";
import Board from "./Board";
import Player from "./Player";
import PlayersInMobile from "./PlayersInMobile";
import { useNavigate } from "react-router-dom";
import GameEndActions from "./GameEndActions";
import GameStatus from "./GameStatus";
import useGameActions from "../../hooks/api/game/useGameActions";
import useApiGet from "../../hooks/api/useApiGet";
import usePlayerReq from "../../hooks/api/player/usePlayerReq";
import useLocalStorage from "../../hooks/useLocalStorage";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";
import prepareGamePayload from "../../utils/prepareGamePayload";
import updateGameBoard from "../../utils/updateGameBoard";
import Invitation from "./Invitation";
import useSound from "../../hooks/useSound";

import tap1 from "../../assets/sounds/tap1.wav";
import tap2 from "../../assets/sounds/tap2.wav";
import winner1 from "../../assets/sounds/winner1.wav";
import winner2 from "../../assets/sounds/winner2.wav";
import draw from "../../assets/sounds/draw.wav";
import { SoundOffIcon, SoundOnIcon } from "../../utils/muiIcons";

const Play = () => {
  const { sendAddGame } = useGameActions({ handleCloseDialog: {} });
  const { getById } = usePlayerReq();
  // const {
  //   dispatch,
  //   globalState: { players },
  // } = useGlobalState();
  const { value: playersInLocal } = useLocalStorage("players");
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
  const { isSoundOn, setIsSoundOn, playSound } = useSound();

  const idR = playersInLocal?.R?._id;
  const idM = playersInLocal?.M?._id;
  const {
    data: playerRData,
    isLoading: isLoadingInGetPlayerR,
    isError: isErrorInGetPlayerR,
  } = useApiGet(["playerR", idR], () => getById(idR), {
    enabled: !!idR,
  });
  const {
    data: playerMData,
    isLoading: isLoadingInGetPlayerM,
    isError: isErrorInGetPlayerM,
  } = useApiGet(["playerM", idM], () => getById(idM), { enabled: !!idM });

  const playerR = { ...playerRData?.data, name: playersInLocal?.R?.name };
  const playerM = { ...playerMData?.data, name: playersInLocal?.M?.name };

  const sendAddGameReq = async () => {
    const payload = prepareGamePayload({
      winPlayer,
      board,
      playerR,
      playerM,
    });

    try {
      const res = await sendAddGame(payload);
      return res;
    } catch (error) {
      console.error("Failed to add game:", error);
    }
  };
  const handleCellClick = (index) => {
    const result = updateGameBoard({ index, board, currentPlayer });
    if (!result) return;

    if (currentPlayer === "R") playSound(tap1);
    if (currentPlayer === "M") playSound(tap2);

    setBoard(result.board);
    setWinningLine(result.winningLine);
    setWinPlayer(result.winPlayer);

    setEnded(result.ended);

    if (!result.ended) {
      setCurrentPlayer(result.nextPlayer);
    } else {
      setTimeout(() => {
        if (result.winPlayer === "R") playSound(winner1);
        else if (result.winPlayer === "M") playSound(winner2);
        else playSound(draw);
      }, 400);
    }
  };

  const text = {
    none: `Draw`,
    R: `${playerR?.name || playerR?.username || "R"} wins!`,
    M: `${playerM?.name || playerM?.username || "M"} wins!`,
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

  if (isLoadingInGetPlayerM || isLoadingInGetPlayerR) {
    return <LoadingPage />;
  }
  if (isErrorInGetPlayerM || isErrorInGetPlayerR) {
    return <ErrorPage />;
  }

  return (
    <Box
      pt="80px"
      width={{ xs: "90vw", md: "80vw" }}
      marginX="auto"
      minHeight="100vh"
    >
      <NavBar />
      <Stack mt={4} height={1} className="centered">
        <Stack width={{ xs: "100%", md: "50%" }} direction="row">
          <Box flex={0.3} />
          <Box flex={1}>
            <GameStatus
              text={text[winPlayer] || `Current Turn: ${currentPlayer}`}
            />
          </Box>
          <Box flex={0.3}>
            <IconButton
              onClick={() => setIsSoundOn(!isSoundOn)}
              color="primary"
            >
              {isSoundOn ? <SoundOnIcon /> : <SoundOffIcon />}
            </IconButton>
          </Box>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={2}
          width={1}
          height={1}
          justifyContent="center"
        >
          {!isInMobile && (
            <Box flex={1}>
              <Player player={playerR} />
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
              <Player player={playerM} />
            </Box>
          )}
        </Stack>

        {ended && playersInLocal && (
          <GameEndActions onExit={onExit} onContinue={onContinue} />
        )}
        {!playersInLocal && <Invitation />}
        {isInMobile && <PlayersInMobile playerR={playerR} playerM={playerM} />}
      </Stack>
    </Box>
  );
};

export default Play;
