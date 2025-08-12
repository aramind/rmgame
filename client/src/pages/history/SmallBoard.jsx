import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const SmallBoard = ({ board }) => {
  return (
    <Box sx={localStyles.outerBox}>
      {board.map((item, index) => (
        <Box key={index} sx={localStyles.innerBox}>
          <Typography fontSize={{ xs: "0.8rem", md: "1.6rem" }}>
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SmallBoard;

const localStyles = {
  outerBox: {
    width: { xs: 100, md: 200 },
    aspectRatio: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
  },
  innerBox: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    border: "1px solid",
    borderColor: grey[300],
  },
};
