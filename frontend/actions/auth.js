import axios from "axios";

export const startLogin = () => {
  return () => {
    window.location.href = "/api/auth/spotify";
  };
};

export const fetchUser = () => {
  // return async dispatch => {
  //   const res = await axios.get("/api/auth/current_user");
  //   dispatch({
  //     type: "FETCH_USER",
  //     payload: res.data
  //   });
  // };
  return dispatch => {
    return dispatch({
      type: "fetch_user",
      payload: { thing: "thing" }
    });
  };
};

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const logout = () => ({
  type: "LOGOUT"
});
