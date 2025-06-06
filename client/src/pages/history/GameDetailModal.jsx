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
          sx: {
            width: { xs: "100vw", md: "50vw", xl: "40vw" },
            // height: { xs: "90vh", md: "80vh" },
            backgroundColor: (theme) => theme.palette.black.main,
            color: (theme) => theme.palette.white.dark,
            borderRadius: 2,
            p: 1,
          },
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
          <Stack flex={1} direction="column" className="centered " gap={1}>
            <Typography fontSize={{ md: "1.5rem" }} color="primary">
              Player R
            </Typography>
            <Box className="centered">
              <Avatar
                src={game?.playerR?.profileImage}
                alt={game?.playerR?.username}
                sx={{ width: 50, height: 50 }}
              />
            </Box>

            <Typography>{game?.playerR?.username}</Typography>
          </Stack>
          <Box flex={1} width={1} className="centered ">
            <SmallBoard board={game?.board} />
          </Box>
          <Stack flex={1} direction="column" gap={1} className="centered ">
            <Typography fontSize={{ md: "1.5rem" }} color="primary">
              Player M
            </Typography>
            <Box className="centered">
              <Avatar
                src={game?.playerM?.profileImage}
                alt={game?.playerM?.username}
                sx={{ width: 50, height: 50 }}
              />
            </Box>

            <Typography>{game?.playerR?.username}</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default GameDetailModal;
