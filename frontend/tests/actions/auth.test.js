import { login, startLogin, logout, startLogout } from "../../actions/auth";

test("Setup login", () => {
  const fakeUID = "sdfjw32erfdivj";
  const action = login(fakeUID);
  expect(action).toEqual({
    type: "LOGIN",
    uid: fakeUID
  });
});

test("setup logout", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT"
  });
});
