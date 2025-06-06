import { Avatar, Box, Stack, Typography } from "@mui/material";

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
      <Typography>
        {(player?.name || player?.username)?.toUpperCase()}
      </Typography>
      <Stack>
        {player?._id ? (
          <Typography>
            W/L/D : {player?.stats?.wins}/{player?.stats?.losses}/
            {player?.stats?.draws}
          </Typography>
        ) : (
          <Stack gap={1}>
            <Typography textAlign="center">Anon games vanish.</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Player;
