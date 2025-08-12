import { Avatar, Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import TableCellContainer from "./TableCellContainer";

const LeaderBoardRow = ({ index, player, isInMobile }) => {
  return (
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
  );
};

export default LeaderBoardRow;
