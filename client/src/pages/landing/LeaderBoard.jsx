import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";
import usePlayerReq from "../../hooks/api/player/usePlayerReq";
import useApiGet from "../../hooks/api/useApiGet";
import GameDetail from "../history/GameDetail";
import { grey } from "@mui/material/colors";

const Label = ({ label }) => (
  <Typography
    fontWeight="bold"
    fontSize={{ xs: "0.7rem", md: "1.2rem" }}
    textAlign="center"
    color="primary"
  >
    {label.toUpperCase()}
  </Typography>
);
const LeaderBoard = () => {
  const isInMobile = useIsInMobile();
  const { getTopWinRatePlayers } = usePlayerReq();

  const {
    data: topwins,
    isLoading: isLoadingInTopWins,
    isError: isErrorInTopWins,
  } = useApiGet(["topwins"], getTopWinRatePlayers);

  const topPlayers = topwins?.data;

  return (
    <Box marginX="auto" width={{ xs: "90vw", md: "80vw" }} className="outined">
      <Box mb={2}>
        <Typography variant={useIsInMobile ? "h5" : "h4"} textAlign="center">
          LEADERBOARD
        </Typography>
      </Box>
      <Stack
        width={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        border="1px solid"
        borderColor={grey[800]}
        py={1.5}
      >
        {/* using the Game Detail comp temporarily */}
        {/* index */}
        <GameDetail flex="0.5" detail={<Label label="RANK" />} />
        <GameDetail detail={<Label label="AVATAR" />} />
        {/* username */}
        <GameDetail flex="1" detail={<Label label="USERNAME" />} />
        <GameDetail flex="1" detail={<Label label="WIN RATE (%)" />} />
        <GameDetail flex="1" detail={<Label label="TOTAL GAMES" />} />
        <GameDetail flex="1" detail={<Label label="WINS" />} />
        {!isInMobile && (
          <>
            <GameDetail flex="1" detail={<Label label="LOSSES" />} />
            <GameDetail flex="1" detail={<Label label="DRAWS" />} />
          </>
        )}
      </Stack>
      {topPlayers &&
        topPlayers.map((player, index) => (
          <Stack
            key={`${player?._id}${index}`}
            width={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor={grey[800]}
            py={1}
          >
            {/* using the Game Detail comp temporarily */}
            {/* index */}
            <GameDetail flex="0.5" detail={index + 1} />
            <GameDetail
              detail={
                <Box className="centered">
                  <Avatar
                    src={player?.profileImage}
                    alt={player?.username}
                    sx={{ width: 40, height: 40 }}
                  />
                </Box>
              }
            />
            {/* username */}
            <GameDetail flex="1" detail={player?.username} />
            <GameDetail flex="1" detail={`${player?.winRatio * 100}%`} />
            <GameDetail flex="1" detail={player?.totalGames} />
            <GameDetail flex="1" detail={player?.wins} />
            {!isInMobile && (
              <>
                <GameDetail flex="1" detail={player?.losses} />
                <GameDetail flex="1" detail={player?.draws} />
              </>
            )}
          </Stack>
        ))}
    </Box>
  );
};

export default LeaderBoard;
