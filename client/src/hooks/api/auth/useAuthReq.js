import urls from "../../../constants/urls";
import useRequest from "../useRequest";

const useAuthReq = () => {
  const request = useRequest();

  const req = {
    login: async ({ data }) => {
      return request({
        url: `${urls?.AUTH}/register`,
        method: "POST",
        data,
      });
    },
    signup: async ({ data }) => {
      return request({
        url: `${urls?.AUTH}/verify`,
        method: "POST",
        data,
      });
    },
  };

  return req;
};

export default useAuthReq;
