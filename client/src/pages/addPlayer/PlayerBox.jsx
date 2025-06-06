import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";
import { grey, red } from "@mui/material/colors";
import AddAccount from "./AddAccount";

const PlayerBox = ({ fieldPrefix }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { control, errors } = useFormContext();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Box
      width="100%"
      sx={(theme) => ({
        backgroundColor: theme.palette.white.main,
        color: theme.palette.white.dark,
        borderRadius: 2,
        p: 1,
      })}
    >
      <Box width={1} mb={2}>
        <Typography
          color={grey[800]}
          textAlign="center"
        >{`PLAYER ${fieldPrefix.slice(-1)}`}</Typography>
      </Box>
      <ControlledTextField name={`${fieldPrefix}name`} label="In Game Name" />
      <ControlledTextField name={`${fieldPrefix}username`} label="Username" />
      <Controller
        name={`${fieldPrefix}password`}
        control={control}
        render={({ field }) => (
          <Stack>
            <TextField
              {...field}
              id={`${fieldPrefix}password`}
              label="Password"
              size="small"
              fullWidth
              error={!!errors?.[`${fieldPrefix}password`]}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextFieldError
              errorMessage={errors?.[`${fieldPrefix}password`]?.message || ""}
            />
          </Stack>
        )}
      />
      <AddAccount />
    </Box>
  );
};

export default PlayerBox;
