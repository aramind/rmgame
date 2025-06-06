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
import CreateAccountForm from "./CreateAccountForm";
import FormWrapper from "../../wrappers/FormWrapper";
import registerSchema from "../../schemas/register";

const AddAccountDialog = ({
  open = false,
  setOpen,
  title = "",
  maxWidth = "",
  handleConfirm,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerSchema),
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
      <DialogTitle id="dialog-title">
        <Box width={1} className="centered">
          <Typography variant={{ xs: "h5", md: "h4" }} textAlign="center">
            CREATE AN ACCOUNT
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormWrapper formMethods={formMethods}>
          <form noValidate>
            <CreateAccountForm />
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
            onClick={handleSubmit((formData) => {
              handleConfirm(formData);
            })}
            fullWidth
          >
            {" "}
            SEND
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddAccountDialog;
