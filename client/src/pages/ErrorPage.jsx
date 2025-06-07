import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Stack
      pt="80px"
      width={{ xs: "90vw", md: "80vw" }}
      marginX="auto"
      minHeight="100vh"
      className="centered"
    >
      <NavBar />
      <Typography textAlign="center">
        Oops! That wasn’t supposed to happen. 😅
      </Typography>
      <Typography textAlign="center">
        But don’t worry — it should work fine next time!
      </Typography>
      <br />
      <Button variant="contained" onClick={() => navigate(-1)}>
        RETURN
      </Button>
    </Stack>
  );
};

export default ErrorPage;
