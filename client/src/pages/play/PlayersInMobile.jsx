import { Stack } from "@mui/material";
import React from "react";
import Player from "./Player";

const PlayersInMobile = ({ players }) => {
  return (
    <Stack direction="row" gap={1}>
      <Player player={players?.playerR} />
      <Player player={players?.playerM} />
    </Stack>
  );
};

export default PlayersInMobile;
