import { Stack } from "@mui/material";
import React from "react";
import TableCellContainer from "./TableCellContainer";
import { grey } from "@mui/material/colors";
import TableLabel from "../../components/TableLabel";
import useIsInMobile from "../../hooks/useIsInMobile";

const LeaderBoardHeader = () => {
  const isInMobile = useIsInMobile();
  return (
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
  );
};

export default LeaderBoardHeader;
