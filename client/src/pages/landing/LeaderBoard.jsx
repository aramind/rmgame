import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";
import usePlayerReq from "../../hooks/api/player/usePlayerReq";
import useApiGet from "../../hooks/api/useApiGet";
import { grey } from "@mui/material/colors";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import TableCellContainer from "./TableCellContainer";
import TableLabel from "../../components/TableLabel";

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
        <Typography variant={useIsInMobile ? "h5" : "h4"} textAlign="center">
          🥳💪💯LEADERBOARD 💥⚡🚀
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
        <TableCellContainer flex="0.5" detail={<TableLabel label="RANK" />} />
        <TableCellContainer detail={<TableLabel label="AVATAR" />} />
        <TableCellContainer detail={<TableLabel label="USERNAME" />} />
        <TableCellContainer detail={<TableLabel label="WIN RATE (%)" />} />
        <TableCellContainer detail={<TableLabel label="TOTAL GAMES" />} />
        <TableCellContainer detail={<TableLabel label="WINS" />} />
        {!isInMobile && (
          <>
            <TableCellContainer detail={<TableLabel label="LOSSES" />} />
            <TableCellContainer detail={<TableLabel label="DRAWS" />} />
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
            <TableCellContainer flex="0.5" detail={index + 1} />
            <TableCellContainer
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
            <TableCellContainer detail={player?.username} />
            <TableCellContainer
              flex="1"
              detail={`${(player?.winRatio * 100).toFixed(2)}%`}
            />
            <TableCellContainer detail={player?.totalGames} />
            <TableCellContainer detail={player?.wins} />
            {!isInMobile && (
              <>
                <TableCellContainer detail={player?.losses} />
                <TableCellContainer detail={player?.draws} />
              </>
            )}
          </Stack>
        ))}
    </Box>
  );
};

export default LeaderBoard;
