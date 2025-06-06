import { Typography } from "@mui/material";
import React from "react";

const TableLabel = ({ label }) => (
  <Typography
    fontWeight="bold"
    fontSize={{ xs: "0.7rem", md: "1.2rem" }}
    textAlign="center"
    color="primary"
  >
    {label.toUpperCase()}
  </Typography>
);

export default TableLabel;
