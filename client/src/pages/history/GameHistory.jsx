import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import useApiGet from "../../hooks/api/useApiGet";
import useGameReq from "../../hooks/api/game/useGameReq";
import { formatToMMDDYYYY } from "../../utils/date";
import SmallBoard from "./SmallBoard";
import formatBoard from "../../utils/formatBoard";

import GameDetail from "./GameDetail";
import { grey } from "@mui/material/colors";

const GameHistory = () => {
  const [limit, setLimit] = useState("50");
  const [page, setPage] = useState("1");
  const [games, setGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [queryParams, setQueryParams] = useState("");
  const { get } = useGameReq();

  const {
    data: gamesData,
    isLoading: isLoadingInGetGames,
    isError: isErrorInGetGames,
  } = useApiGet(["games"], () =>
    get(`?page=${page}&limit=${limit}${queryParams}`)
  );

  useEffect(() => {
    if (gamesData?.data && Array.isArray(gamesData?.data)) {
      setGames((prev) => [...prev, ...gamesData?.data]);

      // If fewer items returned than limit, no more pages
      if (gamesData?.data.length < Number(limit)) {
        setHasMore(false);
      }
    }
  }, [gamesData?.data, limit]);

  const handleLoadMore = () => {
    if (hasMore && !isLoadingInGetGames) {
      setPage((prev) => prev + 1);
    }
  };

  console.log(gamesData?.data?.[0]);
  return (
    <Box width={1}>
      <Typography>GAME HISTORY</Typography>
      <Box marginX="auto" width={{ xs: "90vw", md: "80vw" }}>
        {games.map((game, index) => (
          <Stack
            key={`${game?._id}${index}`}
            width={1}
            direction="row"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor={grey[800]}
          >
            {/* index */}
            <GameDetail flex="0.3" detail={index + 1} />
            {/* date */}
            <GameDetail detail={formatToMMDDYYYY(game?.createdAt)} />
            {/* player R */}
            <GameDetail
              detail={
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography>{game?.playerR?.username}</Typography>
                  <Box className="centered">
                    <Avatar
                      src={game?.playerR?.profileImage}
                      alt={game?.playerR?.username}
                      sx={{ width: 20, height: 20 }}
                    />
                  </Box>
                </Stack>
              }
            />
            {/* player M */}
            <GameDetail
              detail={
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography>{game?.playerM?.username}</Typography>
                  <Box className="centered">
                    <Avatar
                      src={game?.playerM?.profileImage}
                      alt={game?.playerM?.username}
                      sx={{ width: 20, height: 20 }}
                    />
                  </Box>
                </Stack>
              }
            />

            {/* winner */}
            <GameDetail
              detail={
                game?.isDraw ? (
                  <Typography>DRAW</Typography>
                ) : (
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box className="centered">
                      <Avatar
                        src={game?.winner?.profileImage}
                        alt={game?.winner?.username}
                        sx={{ width: 20, height: 20 }}
                      />
                    </Box>
                  </Stack>
                )
              }
            />
            <Box flex={1}>
              <Button variant="outlined">DETAILS</Button>
            </Box>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default GameHistory;
