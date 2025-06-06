import React from "react";
import useApiSendAsync from "../../useApiSendAsync";
import usePlayerReq from "./usePlayerReq";
import useApiGet from "../useApiGet";

const usePlayerActions = ({ idR, idM }) => {
  const { getById } = usePlayerReq();

  const {
    data: playerRData,
    isLoading: isLoadingInGetPlayerR,
    isError: isErrorInGetPlayerR,
  } = useApiGet(["playerR", idR], () => getById(idR), { enabled: !!idR });

  const {
    data: playerMData,
    isLoading: isLoadingInGetPlayerM,
    isError: isErrorInGetPlayerM,
  } = useApiGet(["playerM", idM], () => getById(idM), { enabled: !!idM });

  const isLoading = isLoadingInGetPlayerR || isLoadingInGetPlayerM;
  const isError = isErrorInGetPlayerR || isErrorInGetPlayerM;
  return { playerRData, playerMData, isLoading, isError };
};

export default usePlayerActions;
