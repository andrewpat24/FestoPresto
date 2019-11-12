import authReducer from "../../reducers/auth";

test("Should set uid for login", () => {
  const uid = "Lcsdf34dfsc";
  const action = {
    type: "LOGIN",
    uid
  };
  const reducer = authReducer({}, action);
  expect(reducer).toEqual({
    uid
  });
});

test("Should clear uid for logout", () => {
  const uid = "Lcsdf34dfsc";
  const action = {
    type: "LOGOUT",
    uid
  };
  const reducer = authReducer({ uid: "Thingefdcvx" }, action);
  expect(reducer).toEqual({});
});
