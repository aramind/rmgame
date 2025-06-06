import { Box, Typography } from "@mui/material";
import React from "react";

const GameDetail = ({ detail, isText = true, flex = "1", width = "100%" }) => {
  return (
    <Box flex={flex} width={width} className="centered ">
      {isText ? (
        <Typography fontSize={{ xs: "0.8rem", md: "1rem" }}>
          {detail}
        </Typography>
      ) : (
        { detail }
      )}
    </Box>
  );
};

export default GameDetail;
