import axios from "axios";

export const getUserID = () => {
  return axios.get("/api/auth/current_user").then(res => {
    return res.data.user;
  });
};

export const logoutUser = () => {
  return axios.get("/api/auth/logout");
};
