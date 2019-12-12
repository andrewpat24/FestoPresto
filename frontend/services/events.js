import axios from "axios";

export const getEvents = async (filters = {}) => {
  return axios.post("api/events/get_events", filters);
};
