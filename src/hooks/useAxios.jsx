import axios from "axios";
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from "../helpers/auth";
import Cookies from "js-cookie";

const useAxios = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!isAccessTokenExpired(accessToken)) return req;

    const response = await getRefreshToken(refreshToken);

    setAuthUser(response.access, response.refresh);

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
