import urls from "../../../constants/urls";
import useRequest from "../useRequest";

const url = urls?.GAME;

const useGameReq = () => {
  const request = useRequest();

  const req = {
    add: async (data) => {
      return request({
        url: `${url}/add`,
        method: "POST",
        data,
      });
    },
  };

  return req;
};

export default useGameReq;
