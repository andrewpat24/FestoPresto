import axios from "axios";

export const getEvents = async (filters = {}) => {
  return axios.post("api/events/get_events", filters);
};

export const getEventById = async (event_id = "0") => {
  const event = await axios.post("/api/events/get_event_by_id", { event_id });
  return event;
};
