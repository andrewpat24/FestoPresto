import axios from "axios";

export const generatePlaylist = async (
  access_token,
  spotify_uid,
  artist_list,
  event_name
) => {
  return axios.post("/api/spotify/generate_playlist", {
    access_token,
    spotify_uid,
    artist_list,
    event_name
  });
};

export const getArtistsYouFollow = (identifiers = []) => {
  return axios.post("/api/spotify/get_matching_followed_artists", {
    identifiers
  });
};

export const refreshFollowedArtists = (spotify_uid, access_token) => {
  return axios.post("/api/spotify/refresh_followed_artists", {
    spotify_uid,
    access_token
  });
};

export const refreshAccessToken = spotify_uid => {
  return axios.post("/api/auth/refresh_access_token", {
    spotify_uid
  });
};
