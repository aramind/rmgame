import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const GameEndDialog = ({
  open = false,
  setOpen,
  title = "",
  maxWidth = "md",
  handleConfirm,
}) => {
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "95vw", md: "80vw" },
            height: { xs: "90vh", md: "80vh" },
            backgroundColor: (theme) => theme.palette.black.main,
            color: (theme) => theme.palette.white.dark,
            borderRadius: 2,
            p: 1,
          },
        },
      }}
      maxWidth={maxWidth}
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography>Play again?</Typography>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            width={{ xs: "250px", md: "300px" }}
            fullWidth
          >
            EXIT AND LOGOUT PLAYERS
          </Button>
          <Button variant="contained" onClick={handleConfirm} fullWidth>
            CONFIRM
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default GameEndDialog;
