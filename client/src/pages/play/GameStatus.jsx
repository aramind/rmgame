import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const GameStatus = ({ text }) => {
  return (
    <Stack className="centered " gap={{ xs: 1, md: 2 }} width={1}>
      <Box className="centered" flex={1}>
        <Typography variant="h5" gutterBottom>
          {text}
        </Typography>
      </Box>
    </Stack>
  );
};

export default GameStatus;
