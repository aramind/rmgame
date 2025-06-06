import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const Pagination = ({
  displayPage,
  setDisplayPage,
  endIndex,
  totalItems,
  hasMore,
}) => {
  const handlePrev = () => {
    if (displayPage > 1) {
      setDisplayPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (endIndex < totalItems || hasMore) {
      setDisplayPage((prev) => prev + 1);
    }
  };

  console.log(totalItems);
  return (
    <Stack
      mt={1}
      width={1}
      gap={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
      //   className="outlined"
    >
      <Button disabled={displayPage === 1} onClick={handlePrev}>
        Prev
      </Button>
      <Typography>Page {displayPage}</Typography>
      <Button disabled={endIndex >= totalItems} onClick={handleNext}>
        Next
      </Button>
    </Stack>
  );
};

export default Pagination;
