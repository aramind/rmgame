import { Box, Typography } from "@mui/material";
import React from "react";
import AnimatedLoader from "../components/AnimatedLoader";

const LoadingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      width="100%"
      flexDirection="column"
    >
      <AnimatedLoader />
      <Typography variant="h6" mt={4}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
