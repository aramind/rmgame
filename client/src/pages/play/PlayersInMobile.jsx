import { Stack } from "@mui/material";
import React from "react";
import Player from "./Player";

const PlayersInMobile = ({ playerR, playerM }) => {
  return (
    <Stack direction="row" gap={1}>
      <Player player={playerR} />
      <Player player={playerM} />
    </Stack>
  );
};

export default PlayersInMobile;
