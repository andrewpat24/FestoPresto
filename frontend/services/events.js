import axios from 'axios';

export const findFestivals = async (filters = {}) => {
  return axios.post('/api/events/find_festivals', filters);
};

export const festivalDetails = async (
  festivalID,
  spotify_uid,
  access_token
) => {
  return axios.post('/api/events/festival_details', {
    festivalID,
    spotify_uid,
    access_token
  });
};

// export const getEventById = async (event_id = "0") => {
//   const event = await axios.post("/api/events/get_event_by_id", { event_id });
//   return event;
// };

// export const createEvent = async event_data => {
//   const event = await axios.post("/api/events/create_event", { ...event_data });
//   return event;
// };
