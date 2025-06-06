import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import GameDetail from "./GameDetail";
import TableLabel from "../../components/TableLabel";
import useIsInMobile from "../../hooks/useIsInMobile";

const GameHistoryHeader = () => {
  const isInMobile = useIsInMobile();
  return (
    <Stack
      width={1}
      direction="row"
      alignItems="center"
      justifyContent="center"
      border="1px solid"
      borderColor={grey[800]}
      py={2}
    >
      {/* index */}
      <GameDetail flex="0.3" detail={<TableLabel label="#" />} />
      {/* date */}
      <GameDetail detail={<TableLabel label="date" />} />
      {/* player R */}
      {isInMobile ? (
        <GameDetail detail={<TableLabel label="Players" />} />
      ) : (
        <>
          <GameDetail detail={<TableLabel label="Player R" />} />
          <GameDetail detail={<TableLabel label="Player M" />} />
        </>
      )}

      {/* winner */}

      <GameDetail detail={<TableLabel label="Winner" />} />
      <GameDetail flex="0.3" detail={<TableLabel label="" />} />
    </Stack>
  );
};

export default GameHistoryHeader;
