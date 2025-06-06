import { Box, Stack } from "@mui/material";
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

    setBoard(result.board);
    setWinningLine(result.winningLine);
    setWinPlayer(result.winPlayer);
    setEnded(result.ended);
    if (!result.ended) {
      setCurrentPlayer(result.nextPlayer);
    }
  };

  const text = {
    none: `Draw`,
    R: `Winner is R (${playerR?.name || playerR?.username})`,
    M: `Winner is M (${playerM?.name || playerM?.username})`,
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

        {ended && <GameEndActions onExit={onExit} onContinue={onContinue} />}
        {isInMobile && <PlayersInMobile playerR={playerR} playerM={playerM} />}
      </Stack>
    </Box>
  );
};

export default Play;
