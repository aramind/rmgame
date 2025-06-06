import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import useApiGet from "../../hooks/api/useApiGet";
import useGameReq from "../../hooks/api/game/useGameReq";
import { formatToMMDDYYYY } from "../../utils/date";
import SmallBoard from "./SmallBoard";
import formatBoard from "../../utils/formatBoard";
import useIsInMobile from "../../hooks/useIsInMobile";
import LoadingPage from "../../pages/LoadingPage";
import GameDetail from "./GameDetail";
import { grey } from "@mui/material/colors";
import { InfoIcon, InfoOutlined } from "../../utils/muiIcons";
import Pagination from "./Pagination";
import GameDetailModal from "./GameDetailModal";
import GameHistoryHeader from "./GameHistoryHeader";

const GameHistory = () => {
  const isInMobile = useIsInMobile();
  const [limit, setLimit] = useState("40");
  const [page, setPage] = useState("1");
  const [games, setGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [queryParams, setQueryParams] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [openGDModal, setOpenGDModal] = useState(false);
  const { get } = useGameReq();

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

      // If fewer items returned than limit, no more pages
      if (gamesData?.data.length < Number(limit)) {
        setHasMore(false);
      }
    }
  }, [gamesData?.data, limit]);

  //   for pagination
  const [displayPage, setDisplayPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (displayPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedGames = games.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    if (hasMore && !isLoadingInGetGames) {
      setPage((prev) => prev + 1);
    }
  };

  console.log(gamesData?.data?.length);

  if (isLoadingInGetGames) {
    return <LoadingPage />;
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
        {displayedGames.map((game, index) => (
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
            <GameDetail flex="0.3" detail={startIndex + index + 1} />
            {/* date */}
            <GameDetail detail={formatToMMDDYYYY(game?.createdAt)} />
            {/* player R */}
            {isInMobile ? (
              <Stack>
                <GameDetail
                  detail={
                    <Typography fontSize="0.8rem">
                      {game?.playerR?.username}
                    </Typography>
                  }
                />
                {/* player M */}
                <GameDetail
                  detail={
                    <Typography fontSize="0.8rem">
                      {game?.playerM?.username}
                    </Typography>
                  }
                />
              </Stack>
            ) : (
              <>
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
              </>
            )}

            {/* winner */}
            <GameDetail
              detail={
                game?.isDraw ? (
                  <Typography>DRAW</Typography>
                ) : (
                  <Stack direction="column" alignItems="center" gap={1}>
                    <Box className="centered">
                      <Avatar
                        src={game?.winner?.profileImage}
                        alt={game?.winner?.username}
                        sx={{ width: 20, height: 20 }}
                      />
                    </Box>
                    {isInMobile && (
                      <Typography fontSize="0.8rem">
                        {game?.winner?.username}
                      </Typography>
                    )}
                  </Stack>
                )
              }
            />
            <GameDetail
              flex="0.3"
              detail={
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setOpenGDModal(true);
                    setSelectedGame(game);
                  }}
                >
                  <InfoIcon color="secondary" />
                </IconButton>
              }
            />
          </Stack>
        ))}
        <Pagination
          displayPage={displayPage}
          setDisplayPage={setDisplayPage}
          endIndex={endIndex}
          totalItems={games.length}
          hasMore={hasMore}
        />
      </Box>

      {!isLoadingInGetGames && hasMore && (
        <Box className="centered" width={1} py={2}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
      {!hasMore && (
        <Typography my={1} color="textSecondary">
          No more games to load.
        </Typography>
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
