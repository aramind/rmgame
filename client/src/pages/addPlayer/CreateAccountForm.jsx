import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Controller, useFormContext } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";

const CreateAccountForm = () => {
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
        p: 2,
      })}
    >
      <ControlledTextField name={`username`} label="username" />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Stack>
            <TextField
              {...field}
              id="create-account-password"
              label="Password"
              size="small"
              fullWidth
              error={!!errors?.password}
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
            <TextFieldError errorMessage={errors?.password?.message || ""} />
          </Stack>
        )}
      />
      {/* Confirm Password Field */}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Stack>
            <TextField
              {...field}
              id="create-account-password"
              label="confirm password"
              size="small"
              fullWidth
              error={!!errors?.confirmPassword}
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
              errorMessage={errors?.confirmPassword?.message || ""}
            />
          </Stack>
        )}
      />
    </Box>
  );
};

export default CreateAccountForm;
