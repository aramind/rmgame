const prepareGamePayload = ({ winPlayer, board, playerR, playerM }) => {
  const isDraw = winPlayer === "none";
  const winner =
    winPlayer === "R" ? playerR?._id : winPlayer === "M" ? playerM?._id : null;
  const loser =
    winPlayer === "R" ? playerM?._id : winPlayer === "M" ? playerR?._id : null;

  return {
    playerR: playerR?._id,
    playerM: playerM?._id,
    displayNames: {
      R: playerR?.name || playerR?.username,
      M: playerM?.name || playerM?.username,
    },
    board,
    winner,
    loser,
    isDraw,
  };
};

export default prepareGamePayload;
