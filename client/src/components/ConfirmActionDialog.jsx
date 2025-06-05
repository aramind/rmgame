import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useRef } from "react";

const ConfirmActionDialog = ({
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
          <Button variant="outlined" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleConfirm();
              setOpen(false);
            }}
          >
            CONFIRM
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionDialog;
