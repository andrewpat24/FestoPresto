import axios from "axios";

export const startLogin = () => {
  return () => {
    return (window.location.href = "/api/auth/spotify");
  };
};

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const logout = () => ({
  type: "LOGOUT"
});
