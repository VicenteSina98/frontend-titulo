import { useAuthStore } from "../store/Auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const getPredictionHistory = async (idUsuario) =>
  await axios.get(`${import.meta.env.VITE_API_URL}/prediccion/${idUsuario}`);

export const getUserFromToken = async () => {
  const token = Cookies.get("access_token");
  const user = jwt_decode(token) ?? null;
  if (user) {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/usuario/${user["username"]}`
    );
    console.log(data)
    if (data) return data.data;
  }
};

export const login = async (username, password) => {
  const input = { username, password };
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/token`,
      input,
      { "Access-Control-Allow-Origin": true }
    );
    if (status === 200) {
      setAuthUser(data.access, data.refresh);
    }
    return { data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error:
        error.response?.data?.detail ||
        "Lo sentimos, ha ocurrido un error en el inicio de sesión",
    };
  }
};

export const register = async (userData) => {
  console.log(userData);
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/register`,
    userData
  );
  if (status === 201)
    return {
      data: data,
      error: null,
    };
  return {
    data: null,
    error: data,
  };
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  useAuthStore.getState().setUser(null);
};

export const setUser = async () => {
  // ON PAGE LOAD
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  if (!accessToken || !refreshToken) {
    return;
  }
  if (isAccessTokenExpired(accessToken)) {
    const response = await getRefreshToken(refreshToken);
    setAuthUser(response.access, response.refresh);
  } else {
    setAuthUser(accessToken, refreshToken);
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    httpOnly: false,
    secure: false,
  });

  Cookies.set("refresh_token", refresh_token, {
    expires: 7,
    httpOnly: false,
    secure: false,
  });

  const user = jwt_decode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }
  useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
  const refresh_token = Cookies.get("refresh_token");
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/token/refresh`,
    {
      refresh: refresh_token,
    }
  );
  return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwt_decode(accessToken);
    return decodedToken.exp < Date.now() / 1000;
  } catch (err) {
    return true; // Token is invalid or expired
  }
};
