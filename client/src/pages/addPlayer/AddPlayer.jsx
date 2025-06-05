import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import addPlayerSchema from "../../schemas/addPlayer";
import FormWrapper from "../../wrappers/FormWrapper";
import { Stack, Typography } from "@mui/material";
import PlayerBox from "./PlayerBox";

const AddPlayer = () => {
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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <FormWrapper formMethods={formMethods}>
      <Typography>ADD PLAYERS</Typography>
      <form noValidate>
        <Stack direction={{ xs: "column", md: "row" }} gap={2}>
          <PlayerBox fieldPrefix="playerR" />
          <PlayerBox fieldPrefix="playerM" />
        </Stack>
      </form>
    </FormWrapper>
  );
};

export default AddPlayer;
