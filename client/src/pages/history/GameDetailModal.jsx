import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import SmallBoard from "./SmallBoard";
import { CloseIcon } from "../../utils/muiIcons";
import PlayerInfoForModal from "./PlayerInfoForModal";

const GameDetailModal = ({ open = true, setOpen, game }) => {
  if (!game) return null;

  console.log(game);
  const handleClose = (e) => {
    e.stopPropagation();
  };

  console.log(game);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: localStyles?.paper,
        },
      }}
      maxWidth="xl"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle id="dialog-title">GAME DETAILS</DialogTitle>
        <IconButton onClick={() => setOpen(false)} size="large">
          <CloseIcon color="secondary" sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack direction="row" className="centered">
          <PlayerInfoForModal player={game?.playerR} title="Player R" />
          <Box flex={1} width={1} className="centered ">
            <SmallBoard board={game?.board} />
          </Box>
          <PlayerInfoForModal player={game?.playerM} title="Player M" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default GameDetailModal;

const localStyles = {
  paper: {
    width: { xs: "100vw", md: "50vw", xl: "40vw" },
    backgroundColor: (theme) => theme.palette.black.main,
    color: (theme) => theme.palette.white.dark,
    borderRadius: 2,
    p: 1,
  },
};
