import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
const useRequest = () => {
  const client = axiosBase;

  const request = async (options) => {
    try {
      const res = await client(options);
      return res?.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  };

  return request;
};

export default useRequest;
