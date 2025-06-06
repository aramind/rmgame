import { Alert, Snackbar } from "@mui/material";
import { useGlobalState } from "../../context/GlobalStateProvider";

function AckAlert() {
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch({
      type: "SHOW_ACK_ALERT",
      payload: { ...ackAlert, open: false },
    });
  };
  return (
    <Snackbar
      open={ackAlert.open}
      onClose={handleClose}
      autoHideDuration={ackAlert.autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: "999999" }}
    >
      <Alert
        severity={ackAlert.severity}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {ackAlert.message}
      </Alert>
    </Snackbar>
  );
}

export default AckAlert;
