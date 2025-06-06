import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import GameDetail from "./GameDetail";
import { grey } from "@mui/material/colors";
import { formatToMMDDYYYY } from "../../utils/date";
import useIsInMobile from "../../hooks/useIsInMobile";
import { InfoIcon } from "../../utils/muiIcons";

const DisplayedGames = ({
  displayedGames,
  startIndex,
  setOpenGDModal,
  setSelectedGame,
}) => {
  const isInMobile = useIsInMobile();
  return (
    <>
      {displayedGames &&
        displayedGames.map((game, index) => (
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
    </>
  );
};

export default DisplayedGames;
