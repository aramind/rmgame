import { Stack, Typography } from "@mui/material";

const TextFieldError = ({ errorMessage }) => {
  return (
    <Stack sx={{ minHeight: "1.5rem" }} alignItems="flex-start" px={1}>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.6rem",
        }}
        width={1}
        textAlign="end"
        color="error"
      >
        {errorMessage || ""}
      </Typography>
    </Stack>
  );
};

export default TextFieldError;
