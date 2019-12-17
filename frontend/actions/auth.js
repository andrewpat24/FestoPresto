import { logoutUser } from "../services/passport";

export const startLogin = () => {
  return () => {
    window.location.href = "/api/auth/spotify";
  };
};

// export const login = () => {
//   const uid = (async () => {
//     const res = await axios.get("/api/auth/current_user");
//     return res.data.user;
//   })();

//   return {
//     type: "LOGIN",
//     uid
//   };
// };

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
