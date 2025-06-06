import urls from "../../../constants/urls";
import useRequest from "../useRequest";

const url = urls?.PLAYER;

const usePlayerReq = () => {
  const request = useRequest();

  const req = {
    getById: async (id) => {
      return request({
        url: `${url}/${id}`,
        method: "GET",
      });
    },
    getTopWinRatePlayers: async () => {
      return request({
        url: `${url}/topwins`,
        method: "GET",
      });
    },
  };

  return req;
};

export default usePlayerReq;
