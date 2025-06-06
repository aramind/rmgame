import { Box, Stack } from "@mui/material";
import React from "react";
import HeroSection from "./HeroSection";
import GameHistory from "../history/GameHistory";

const Landing = () => {
  return (
    <Stack>
      <HeroSection />
      <GameHistory />
    </Stack>
  );
};

export default Landing;
