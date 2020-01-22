import { login, logout } from "../../actions/auth";

test("Setup login", () => {
  const fakeUID = "sdfjw32erfdivj";
  const fakeAccessToken = "kjfdgnkdfxvbjxckngsdfjknsdf";
  const action = login(fakeUID, fakeAccessToken);

  expect(action).toEqual({
    type: "LOGIN",
    uid: fakeUID,
    access_token: fakeAccessToken
  });
});

test("setup logout", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT",
    uid: "logged out",
    access_token: "no access token"
  });
});
