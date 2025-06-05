import React from "react";
import { Box, Button, Grid, Stack } from "@mui/material";

const Board = ({ board, onCellClick, disabled = false }) => {
  return (
    <Grid container spacing={1} maxWidth={200} margin="auto">
      {board.map((value, index) => (
        <Grid item xs={4} key={index}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ height: 60, fontSize: 24 }}
            onClick={() => onCellClick(index)}
            disabled={disabled || value !== ""}
          >
            {value}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
