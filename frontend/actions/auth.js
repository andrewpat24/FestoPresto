import { logoutUser } from '../services/passport';

export const startLogin = () => {
  return () => {
    window.location.href = '/api/auth/spotify';
  };
};

export const login = (uid, access_token, email) => ({
  type: 'LOGIN',
  uid,
  email,
  access_token
});

export const logout = () => {
  logoutUser();
  return {
    type: 'LOGOUT',
    uid: 'logged out',
    email: 'logged out',
    access_token: 'no access token'
  };
};

// An access token will now always be returned with requests using an access token.
// if the access token used to initiate the request is expired, a new one is returned to replace it.
// Replace old access token in redux store with new access token.
export const updateAccessToken = newAccessToken => {
  return {
    type: 'UPDATE_ACCESS_TOKEN',
    access_token: newAccessToken
  };
};
