import { Box } from "@mui/material";
import React from "react";
import NavBar from "../../components/navbar/NavBar";
import GameHistory from "./GameHistory";

const History = () => {
  return (
    <Box
      pt="80px"
      width={{ xs: "90vw", md: "80vw" }}
      marginX="auto"
      minHeight="100vh"
    >
      <NavBar />
      <GameHistory />
    </Box>
  );
};

export default History;
