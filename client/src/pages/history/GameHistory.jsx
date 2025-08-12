import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import useApiGet from "../../hooks/api/useApiGet";
import useGameReq from "../../hooks/api/game/useGameReq";

import useIsInMobile from "../../hooks/useIsInMobile";
import LoadingPage from "../../pages/LoadingPage";

import Pagination from "./Pagination";
import GameDetailModal from "./GameDetailModal";
import GameHistoryHeader from "./GameHistoryHeader";
import ErrorPage from "../../pages/ErrorPage";
import DisplayedGames from "./DisplayedGames";

const GameHistory = () => {
  const isInMobile = useIsInMobile();
  const { get } = useGameReq();

  const [games, setGames] = useState([]);
  const [limit] = useState(40);
  const [page, setPage] = useState(1);
  const [queryParams] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const [selectedGame, setSelectedGame] = useState(null);
  const [openGDModal, setOpenGDModal] = useState(false);
  // GD - game detail

  //   for pagination
  const [displayPage, setDisplayPage] = useState(1);
  const itemsPerPage = 20;

  const {
    data: gamesData,
    isLoading: isLoadingInGetGames,
    isError: isErrorInGetGames,
  } = useApiGet(["games", page, limit, queryParams], () =>
    get(`?page=${page}&limit=${limit}${queryParams}`)
  );

  useEffect(() => {
    if (gamesData?.data && Array.isArray(gamesData?.data)) {
      setGames((prev) => [...prev, ...gamesData?.data]);
      if (gamesData?.data.length < Number(limit)) {
        setHasMore(false);
      }
    }
  }, [gamesData?.data, limit]);

  const startIndex = (displayPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedGames = games.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    if (hasMore && !isLoadingInGetGames) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoadingInGetGames) {
    return <LoadingPage />;
  }

  if (isErrorInGetGames) {
    return <ErrorPage />;
  }
  return (
    <Box width={1} marginX="auto">
      <Box marginX="auto" width={{ xs: "90vw", md: "80vw" }}>
        <Box mb={2}>
          <Typography variant={isInMobile ? "h5" : "h4"} textAlign="center">
            GAME HISTORY
          </Typography>
        </Box>
        <GameHistoryHeader />
        {displayedGames && (
          <DisplayedGames
            displayedGames={displayedGames}
            startIndex={startIndex}
            setOpenGDModal={setOpenGDModal}
            setSelectedGame={setSelectedGame}
          />
        )}
        <Pagination
          displayPage={displayPage}
          setDisplayPage={setDisplayPage}
          endIndex={endIndex}
          totalItems={games.length}
          hasMore={hasMore}
        />
      </Box>

      {!isLoadingInGetGames && hasMore && (
        <Box className="centered" width={1} py={2} mb={10}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
      {!hasMore && (
        <Box className="centered" width={1} mt={2} mb={10}>
          <Typography textAlign="center" my={1} color="primary">
            No more games to load.
          </Typography>
        </Box>
      )}
      <GameDetailModal
        game={selectedGame}
        open={openGDModal}
        setOpen={setOpenGDModal}
      />
    </Box>
  );
};

export default GameHistory;
