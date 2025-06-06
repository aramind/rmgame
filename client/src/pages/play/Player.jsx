import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Player = ({ player }) => {
  return (
    <Stack width={1} p={2} gap={1} height={1} className="centered">
      <Box className="centered">
        <Avatar
          src={player?.profileImage}
          alt={player?.name}
          sx={{ width: 50, height: 50 }}
        />
      </Box>
      <Typography>
        {(player?.name || player?.username)?.toUpperCase()}
      </Typography>
      <Stack>
        <Typography>
          W/L/D : {player?.stats?.wins}/{player?.stats?.losses}/
          {player?.stats?.draws}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Player;
