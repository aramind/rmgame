import React from "react";
import { Box, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";

const Board = ({
  board,
  onCellClick,
  disabled = false,
  currentPlayer,
  winningLine,
}) => {
  const isInMobile = useIsInMobile();

  const symbolFontSize = isInMobile ? "2.5rem" : "4rem";
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        width: 1,
        margin: "auto",
      }}
      p={2}
      // className="outlined"
    >
      {board.map((value, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const isEmpty = value === "";
        const isWinningCell = winningLine.includes(index);
        return (
          // <Box
          //   key={index}
          //   sx={{
          //     aspectRatio: "1",
          //     width: "100%",
          //     borderTop: row === 0 ? "none" : "1px solid #ccc",
          //     borderLeft: col === 0 ? "none" : "1px solid #ccc",
          //   }}
          // >
          //   <Button
          //     variant="text"
          //     fullWidth
          //     sx={{
          //       width: "100%",
          //       height: "100%",
          //     }}
          //     onClick={() => onCellClick(index)}
          //     disabled={disabled || value !== ""}
          //   >
          //     <Typography
          //       fontSize={{ xs: "4rem", md: "5rem" }}
          //       fontWeight="bold"
          //       color={value === "R" ? "primary" : "secondary"}
          //     >
          //       {value}
          //     </Typography>
          //   </Button>
          // </Box>
          <Box
            key={index}
            onClick={() => !disabled && isEmpty && onCellClick(index)}
            sx={{
              aspectRatio: "1",
              width: "100%",
              borderTop: row === 0 ? "none" : "1px solid #ccc",
              borderLeft: col === 0 ? "none" : "1px solid #ccc",
              position: "relative",
              cursor: isEmpty && !disabled ? "pointer" : "default",
              // pointerEvents: disabled ? "none" : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isWinningCell
                ? "rgba(25, 118, 210, 0.15)"
                : "transparent",
              "&:hover .hover-preview": {
                opacity: 0.1,
              },
            }}
          >
            {value ? (
              <Typography
                fontSize={symbolFontSize}
                fontWeight="bold"
                color={value === "R" ? "primary" : "secondary"}
              >
                {value}
              </Typography>
            ) : (
              <Typography
                className="hover-preview"
                fontSize={symbolFontSize}
                fontWeight="bold"
                color={currentPlayer === "R" ? "primary" : "secondary"}
                sx={{
                  position: "absolute",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  pointerEvents: "none",
                }}
              >
                {currentPlayer}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Board;
