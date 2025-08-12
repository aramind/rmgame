import React from "react";
import { Box, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";
import usePlayerReq from "../../hooks/api/player/usePlayerReq";
import useApiGet from "../../hooks/api/useApiGet";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import LeaderBoardHeader from "./LeaderBoardHeader";
import LeaderBoardRow from "./LeaderBoardRow";

const LeaderBoard = () => {
  const isInMobile = useIsInMobile();
  const { getTopWinRatePlayers } = usePlayerReq();

  const {
    data: topwins,
    isLoading: isLoadingInTopWins,
    isError: isErrorInTopWins,
  } = useApiGet(["topwins"], getTopWinRatePlayers);

  const topPlayers = topwins?.data;

  if (isLoadingInTopWins) {
    return <LoadingPage />;
  }

  if (isErrorInTopWins) {
    return <ErrorPage />;
  }
  return (
    <Box marginX="auto" width={{ xs: "90vw", md: "80vw" }}>
      <Box mb={2}>
        <Typography variant={isInMobile ? "h6" : "h4"} textAlign="center">
          🥳💪💯LEADERBOARD 💥⚡🚀
        </Typography>
      </Box>
      <LeaderBoardHeader />
      {topPlayers &&
        topPlayers.map((player, index) => (
          <LeaderBoardRow
            key={player._id}
            player={player}
            index={index}
            isInMobile={isInMobile}
          />
        ))}
    </Box>
  );
};

export default LeaderBoard;
