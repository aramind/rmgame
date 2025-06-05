import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useRef } from "react";

const AddPlayersDialog = ({
  open = false,
  setOpen,
  title = "",
  content = "",
  handleConfirm,
  maxWidth = "md",
}) => {
  const dialogRef = useRef(null);

  const handleClose = (e) => {
    e.stopPropagation();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          ref: dialogRef,
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
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row">
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            width={{ xs: "250px", md: "300px" }}
            fullWidth
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleConfirm();
              setOpen(false);
            }}
            fullWidth
          >
            {" "}
            PLAY
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlayersDialog;
