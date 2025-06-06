import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const Player = ({ player }) => {
  console.log(player?.name);
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
        {player?.name ? (
          <Typography>
            W/L/D : {player?.stats?.wins}/{player?.stats?.losses}/
            {player?.stats?.draws}
          </Typography>
        ) : (
          <Stack gap={1}>
            <Typography textAlign="center">Anon games vanish.</Typography>
            <Box className="centered">
              <Button variant="outlined">Login</Button>
            </Box>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Player;
