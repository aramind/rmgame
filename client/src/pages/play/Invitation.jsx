import React, { useState } from "react";
import AddPlayersDialog from "../../components/AddPlayersDialog";
import { useNavigate } from "react-router-dom";
import useAuthActions from "../../hooks/api/auth/useAuthActions";
import { Button, Stack, Typography } from "@mui/material";
import LoadingPage from "../LoadingPage";

const Invitation = () => {
  const [openPlayersDialog, setOpenPlayersDialog] = useState(false);
  const navigate = useNavigate();

  const handleGoToPlay = () => {
    navigate("/play");
    setOpenPlayersDialog(false);
    window.location.reload();
  };
  const { handleConfirmPlay, renderConfirmActionDialog, isLoading } =
    useAuthActions({ handleCloseDialog: handleGoToPlay });

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Stack
        mt={2}
        direction="row"
        className="centered"
        gap={2}
        width={1}
        flex={1}
      >
        <Typography>
          Let us know you two so we can track your battles?
        </Typography>
        <Button variant="outlined" onClick={() => setOpenPlayersDialog(true)}>
          OK
        </Button>
        <Button variant="outlined" onClick={() => window.location.reload()}>
          Nope
        </Button>
      </Stack>
      <AddPlayersDialog
        open={openPlayersDialog}
        setOpen={setOpenPlayersDialog}
        f
        handleConfirmPlay={handleConfirmPlay}
      />
      {renderConfirmActionDialog()}
    </>
  );
};

export default Invitation;
