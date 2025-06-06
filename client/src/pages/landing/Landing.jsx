import { Stack } from "@mui/material";
import React from "react";
import HeroSection from "./HeroSection";
import LeaderBoard from "./LeaderBoard";

const Landing = () => {
  return (
    <Stack mb={4}>
      <HeroSection />
      <LeaderBoard />
    </Stack>
  );
};

export default Landing;
