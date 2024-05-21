import axios from "axios";
import authHeader from "./authHeader";

const URL_API = `${import.meta.env.VITE_API_URL}/api/authorities/`;

interface Credentials {
  username: string;
  password: string;
}

const login = (credentials: Credentials) => {
  return axios.post(`${URL_API}login`, credentials, {
    headers: authHeader(),
  });
};

const register = (credentials: Credentials) => {
  return axios.post(`${URL_API}users/create`, credentials, {
    headers: authHeader(),
  });
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const authServices = {
  login,
  logout,
  register,
};

export default authServices;
