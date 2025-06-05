import React from "react";
import useAuthReq from "./useAuthReq";
import useConfirmActionDialog from "../../useConfirmActionDialog";
import useApiSendAsync from "../../useApiSendAsync";

const useAuthActions = ({ handleCloseDialog }) => {
  const { verify, register } = useAuthReq();

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
