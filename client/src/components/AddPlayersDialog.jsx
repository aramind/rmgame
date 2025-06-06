import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
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
  handleConfirmPlay,
}) => {
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

  const sendPlayRequest = (formData) => {
    const data = {
      playerR: {
        name: formData.playerRname,
        username: formData.playerRusername,
        password: formData.playerRpassword,
      },
      playerM: {
        name: formData.playerMname,
        username: formData.playerMusername,
        password: formData.playerMpassword,
      },
    };
    console.log(data);
    handleConfirmPlay(data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "95vw", md: "80vw" },
            // height: { xs: "90vh", md: "80vh" },
            backgroundColor: (theme) => theme.palette.black.main,
            color: (theme) => theme.palette.white.dark,
            borderRadius: 2,
            p: 1,
          },
        },
      }}
      maxWidth={maxWidth}
    >
      <DialogTitle id="dialog-title">
        <Box width={1} className="centered">
          <Typography variant={{ xs: "h5", md: "h4" }} textAlign="center">
            ADD PLAYERS
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormWrapper formMethods={formMethods}>
          <form noValidate>
            <Stack direction={{ xs: "column", md: "row" }} gap={4}>
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
            onClick={handleSubmit(sendPlayRequest)}
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
