import { Box, Button, Stack } from "@mui/material";
import React from "react";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Stack width={1} height="80vh" className="outlined centered">
      <Title />
      <Stack width={{ xs: "80vw", md: "300px" }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1.5 }}
          size="large"
          onClick={() => navigate("/play")}
        >
          START NEW GAME
        </Button>
      </Stack>
    </Stack>
  );
};

export default HeroSection;
