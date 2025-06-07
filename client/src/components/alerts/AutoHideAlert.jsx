import React from "react";
import { useGlobalState } from "../../context/GlobalStateProvider";
import { Alert, Snackbar } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";

const AutoHideAlert = () => {
  const isInMobile = useIsInMobile();
  const {
    globalState: { alert },
    dispatch,
  } = useGlobalState();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch({
      type: "SHOW_MINOR_ALERT",
      payload: { ...alert, open: false },
    });
  };

  return (
    <Snackbar
      open={alert.open}
      onClose={handleClose}
      autoHideDuration={alert.autoHideDuration}
      anchorOrigin={{
        vertical: isInMobile ? "top" : "bottom",
        horizontal: isInMobile ? "center" : "left",
      }}
      sx={{ zIndex: "999999" }}
    >
      <Alert
        severity={alert.severity}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: { xs: "0.7rem", md: "0.9rem" },
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AutoHideAlert;
