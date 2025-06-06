import React from "react";
import useAuthReq from "./useAuthReq";
import useConfirmActionDialog from "../../useConfirmActionDialog";
import useApiSendAsync from "../../useApiSendAsync";
import { useGlobalState } from "../../../context/GlobalStateProvider";

const useAuthActions = ({ handleCloseDialog, handleCloseRegDialog }) => {
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

  const { send: sendRegister, isLoadingInReg } = useApiSendAsync(register, [
    "players",
  ]);

  const handleConfirmRegister = (data) => {
    handleConfirm("", "Confirm Registering Account", async () => {
      try {
        const res = await sendRegister(data, { showFeedbackMsg: true });
        if (res?.success) {
          handleCloseRegDialog();
        }
      } catch (error) {
        console.error(error);
      }
    });
  };
  const handleConfirmPlay = (data) => {
    handleConfirm("Confirm Play", "Are the details correct?", async () => {
      try {
        const res = await sendPlay(data, { showFeedbackMsg: true });

        const playerData = res?.data?.players;
        const players = {
          R: {
            _id: playerData?.playerR?._id,
            gameName: playerData?.playerR.name || playerData?.playerR.username,
          },
          M: {
            _id: playerData?.playerM?._id,
            gameName: playerData?.playerM.name || playerData?.playerM.username,
          },
        };
        localStorage.setItem("players", JSON.stringify(players));
        handleCloseDialog();
      } catch (error) {
        console.error(error);
      }
    });
  };

  const isLoading = isLoadingInPlay || isLoadingInReg;
  return {
    handleConfirmPlay,
    handleConfirmRegister,
    renderConfirmActionDialog,
    isLoading,
  };
};

export default useAuthActions;
