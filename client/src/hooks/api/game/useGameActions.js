import React from "react";
import useGameReq from "./useGameReq";
import useApiSendAsync from "../../useApiSendAsync";
const useGameActions = ({ handleCloseDialog }) => {
  const { add } = useGameReq();

  const { send: sendAddGame, isLoadingInAdd } = useApiSendAsync(add, ["games"]);

  const isLoading = isLoadingInAdd;
  return { sendAddGame, isLoading };
};

export default useGameActions;
