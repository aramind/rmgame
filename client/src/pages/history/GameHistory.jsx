import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import useApiGet from "../../hooks/api/useApiGet";
import useGameReq from "../../hooks/api/game/useGameReq";

const GameHistory = () => {
  const [limit, setLimit] = useState("50");
  const [page, setPage] = useState("1");
  const [queryParams, setQueryParams] = useState("");
  const { get } = useGameReq();

  const {
    data: gamesData,
    isLoading: isLoadingInGetGames,
    isError: isErrorInGetGames,
  } = useApiGet(["games"], () =>
    get(`?page=${page}&limit=${limit}${queryParams}`)
  );

  console.log(gamesData);
  return (
    <Box>
      <Typography>GAME HISTORY</Typography>
    </Box>
  );
};

export default GameHistory;
