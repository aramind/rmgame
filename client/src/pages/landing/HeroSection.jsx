import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import AddPlayersDialog from "../../components/AddPlayersDialog";
import useAuthActions from "../../hooks/api/auth/useAuthActions";

const HeroSection = () => {
  const [openPlayersDialog, setOpenPlayersDialog] = useState(false);
  const navigate = useNavigate();

  const handleGoToPlay = () => {
    navigate("/play");
    setOpenPlayersDialog(false);
  };
  const { handleConfirmPlay, renderConfirmActionDialog, isLoading } =
    useAuthActions({ handleCloseDialog: handleGoToPlay });
  return (
    <>
      <Stack width={1} height="80vh" className="centered">
        <Title />
        <Stack width={{ xs: "80vw", md: "300px" }} gap={2}>
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
          <Button variant="outlined" onClick={() => navigate("/history")}>
            View All Matches
          </Button>
        </Stack>

        <AddPlayersDialog
          open={openPlayersDialog}
          setOpen={setOpenPlayersDialog}
          handleConfirmPlay={handleConfirmPlay}
        />
      </Stack>
      {renderConfirmActionDialog()}
    </>
  );
};

export default HeroSection;
