import { Typography } from "@mui/material";
import React from "react";

const formatBoard = (board) => {
  return (
    <Typography>[{board?.map((item) => item || "_").join(",")}]</Typography>
  );
};

export default formatBoard;
