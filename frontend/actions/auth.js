import { logoutUser } from "../services/passport";

export const startLogin = () => {
  return () => {
    window.location.href = "/api/auth/spotify";
  };
};

export const login = (uid, access_token) => ({
  type: "LOGIN",
  uid,
  access_token
});

export const logout = () => {
  logoutUser();
  return {
    type: "LOGOUT"
  };
};
