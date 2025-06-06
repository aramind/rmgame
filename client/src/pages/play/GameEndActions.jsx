import { Button, Stack, Typography } from "@mui/material";
const GameEndActions = ({ onExit, onContinue }) => {
  return (
    <Stack
      mt={2}
      direction="row"
      className="centered"
      gap={2}
      width={1}
      flex={1}
    >
      <Typography>Play again?</Typography>
      <Button variant="outlined" onClick={onExit}>
        No
      </Button>
      <Button variant="contained" onClick={onContinue}>
        Yes
      </Button>
    </Stack>
  );
};

export default GameEndActions;
