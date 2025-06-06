import React from "react";
import useGameReq from "./useGameReq";
import useApiSendAsync from "../../useApiSendAsync";
import useApiGet from "../../api/useApiGet.js";
const useGameActions = ({ handleCloseDialog }) => {
  const { add, get } = useGameReq();

  const { send: sendAddGame, isLoadingInAdd } = useApiSendAsync(add, ["games"]);

  // get

  const isLoading = isLoadingInAdd;
  return { sendAddGame, isLoading };
};

export default useGameActions;
