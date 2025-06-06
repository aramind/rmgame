import { Box, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";
import React from "react";

const Title = () => {
  const isInMobile = useIsInMobile();
  return (
    <Box marginBottom={1} marginX="auto">
      <Typography
        variant="h1"
        textAlign="center"
        fontSize={isInMobile ? "4rem" : null}
        sx={{ fontFamily: (theme) => theme.typography.poppins }}
        fontWeight="bold"
        color="primary"
      >
        RM GAME
      </Typography>
    </Box>
  );
};

export default Title;
