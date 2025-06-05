import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import addPlayerSchema from "../schemas/addPlayer";
import FormWrapper from "../wrappers/FormWrapper";
import PlayerBox from "../pages/addPlayer/PlayerBox";

const AddPlayersDialog = ({
  open = false,
  setOpen,
  title = "",
  maxWidth = "md",
}) => {
  const dialogRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addPlayerSchema),
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

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
      <DialogContent>
        <FormWrapper formMethods={formMethods}>
          <Typography>ADD PLAYERS</Typography>
          <form noValidate>
            <Stack direction={{ xs: "column", md: "row" }} gap={2}>
              <PlayerBox fieldPrefix="playerR" />
              <PlayerBox fieldPrefix="playerM" />
            </Stack>
          </form>
        </FormWrapper>
      </DialogContent>
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
            onClick={handleSubmit((data) => {
              console.log("Form data submitted:", data);
              setOpen(false); // optionally close dialog on success
            })}
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
