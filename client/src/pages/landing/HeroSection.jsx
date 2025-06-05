import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import AddPlayersDialog from "../../components/AddPlayersDialog";
import VerifyPlayer from "../addPlayer/VerifyPlayer";

const HeroSection = () => {
  const [openPlayersDialog, setOpenPlayersDialog] = useState(false);
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
          onClick={() => setOpenPlayersDialog((pv) => true)}
          //   onClick={() => navigate("/play")}
        >
          START NEW GAME
        </Button>
      </Stack>
      <AddPlayersDialog
        open={openPlayersDialog}
        setOpen={setOpenPlayersDialog}
        handleConfirm={() => {
          alert("PLAYERS ADDED");
          navigate("/play");
        }}
        content={<VerifyPlayer />}
      />
    </Stack>
  );
};

export default HeroSection;
