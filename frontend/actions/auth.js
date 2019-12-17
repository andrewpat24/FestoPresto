import { logoutUser } from "../services/passport";

export const startLogin = () => {
  return () => {
    window.location.href = "/api/auth/spotify";
  };
};

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const logout = () => {
  logoutUser();
  return {
    type: "LOGOUT"
  };
};
