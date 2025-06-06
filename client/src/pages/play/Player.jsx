import { Avatar, Box, Stack, Typography } from "@mui/material";
import getWinRate from "../../utils/getWinRate";
const Player = ({ player }) => {
  return (
    <Stack width={1} p={2} gap={1} height={1} className="centered">
      <Box className="centered">
        <Avatar
          src={player?.profileImage}
          alt={player?.name}
          sx={{ width: 50, height: 50 }}
        />
      </Box>
      <Typography
        fontSize={{ xs: "1rem", md: "1.5rem" }}
        color="primary"
        fontWeight="bold"
      >
        {(player?.name || player?.username)?.toUpperCase()}
      </Typography>
      <Stack className="centered ">
        {player?._id ? (
          <Stack>
            <Typography
              fontSize={{ xs: "1rem", md: "1.2rem" }}
              textAlign="center"
            >
              W : {player?.stats?.wins}
            </Typography>
            <Typography
              fontSize={{ xs: "1rem", md: "1.2rem" }}
              textAlign="center"
            >
              L : {player?.stats?.losses}
            </Typography>
            <Typography
              fontSize={{ xs: "1rem", md: "1.2rem" }}
              textAlign="center"
            >
              D :{player?.stats?.draws}
            </Typography>
            <Typography
              fontSize={{ xs: "1rem", md: "1.2rem" }}
              textAlign="center"
              color="secondary"
            >
              Win Rate : {getWinRate(player?.stats)}
            </Typography>
          </Stack>
        ) : (
          <Stack gap={1}>
            <Typography textAlign="center">No login? No footprints.</Typography>
            <Typography textAlign="center">
              Sign in to leave your mark.
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Player;
