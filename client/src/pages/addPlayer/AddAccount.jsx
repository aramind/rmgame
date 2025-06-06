import { Box, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const AddAccount = () => {
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
          //   onClick={() => setOpenDialog(true)}
        >
          Create an account?
        </Typography>
      </Stack>
    </>
  );
};

export default AddAccount;
