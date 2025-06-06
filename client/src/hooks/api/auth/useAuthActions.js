import React from "react";
import useAuthReq from "./useAuthReq";
import useConfirmActionDialog from "../../useConfirmActionDialog";
import useApiSendAsync from "../../useApiSendAsync";
import { useGlobalState } from "../../../context/GlobalStateProvider";

const useAuthActions = ({ handleCloseDialog }) => {
  const { verify, register } = useAuthReq();
  const { dispatch } = useGlobalState();

  //   const sendWithSuccessDialogClose = async (sendFn, args) => {
  //     try {
  //       const res = await sendFn(...args);
  //       if (res?.success) {
  //         handleCloseDialog();
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const { send: sendPlay, isLoadingInPlay } = useApiSendAsync(verify, [
    "players",
  ]);

  const handleConfirmPlay = (data) => {
    handleConfirm("Confirm Play", "Are the details correct?", async () => {
      try {
        const res = await sendPlay(data, { showFeedbackMsg: true });
        if (res?.success) {
          console.log(res?.data);
          dispatch({
            type: "SET_PLAYERS",
            payload: res?.data?.players,
          });
          localStorage.setItem("players", JSON.stringify(res?.data?.players));
          handleCloseDialog();
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const isLoading = isLoadingInPlay;
  return { handleConfirmPlay, renderConfirmActionDialog, isLoading };
};

export default useAuthActions;
