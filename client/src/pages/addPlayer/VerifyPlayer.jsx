import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import playerSchema from "../../schemas/player";
import FormWrapper from "../../wrappers/FormWrapper";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import ControlledTextField from "../../components/controlled/ControlledTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import TextFieldError from "../../components/controlled/TextFieldError";

const VerifyPlayer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(playerSchema) });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormWrapper formMethods={formMethods}>
      <form noValidate>
        <Box
          width="100%"
          className="outlined"
          sx={{
            backgroundColor: (theme) => theme.palette.white.main,
            color: (theme) => theme.palette.white.dark,
            borderRadius: 2,
            p: 1,
          }}
        >
          <ControlledTextField name="username" label="username" />
          <Controller
            name="password"
            render={({ field }) => (
              <Stack>
                <TextField
                  {...field}
                  // value={field.value}
                  id="password"
                  label="Password"
                  // variant="outlined"
                  size="small"
                  fullWidth
                  error={!!errors?.password}
                  type={showPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextFieldError
                  errorMessage={errors?.password?.message || ""}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                >
                  VERIFY
                </Button>
              </Stack>
            )}
          />
        </Box>
      </form>
    </FormWrapper>
  );
};

export default VerifyPlayer;
