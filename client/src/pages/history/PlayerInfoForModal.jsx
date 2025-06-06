import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const PlayerInfoForModal = ({ player, title }) => {
  if (!player) return;
  return (
    <Stack flex={1} direction="column" gap={1} className="centered ">
      <Typography fontSize={{ md: "1.5rem" }} color="primary">
        {title}
      </Typography>
      <Box className="centered">
        <Avatar
          src={player?.profileImage}
          alt={player?.username}
          sx={{ width: 50, height: 50 }}
        />
      </Box>

      <Typography>{player?.username}</Typography>
    </Stack>
  );
};

export default PlayerInfoForModal;
