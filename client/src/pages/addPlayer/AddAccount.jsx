import { Box, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import AddAccountDialog from "./AddAccountDialog";
import useAuthActions from "../../hooks/api/auth/useAuthActions";

const AddAccount = () => {
  const [openCreateAccountDialog, setOpenCreateAccountDialog] = useState(false);

  const handleCloseCreateAccountDialog = () => {
    setOpenCreateAccountDialog(false);
  };

  const { handleConfirmRegister, renderConfirmActionDialog } = useAuthActions({
    handleCloseRegDialog: handleCloseCreateAccountDialog,
  });

  return (
    <>
      <Stack width={1} direction="row" px={1} mb={2}>
        <Box flex={1} width={1} />
        <Typography
          variant="body2"
          sx={{
            color: red[900],
            cursor: "pointer",
            // textDecoration: "underline",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => setOpenCreateAccountDialog(true)}
        >
          Create an account?
        </Typography>
      </Stack>
      <AddAccountDialog
        open={openCreateAccountDialog}
        setOpen={setOpenCreateAccountDialog}
        handleConfirm={handleConfirmRegister}
      />
      {renderConfirmActionDialog()}
    </>
  );
};

export default AddAccount;
