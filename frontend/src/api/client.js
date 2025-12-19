import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Events API
export const fetchEvents = async (params = {}) => {
  const response = await api.get("/events", { params });
  return response.data;
};

export const fetchEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// Saved events API (user_id hardcoded for now)
const USER_ID = 1;

export const fetchSavedEvents = async () => {
  const response = await api.get(`/users/${USER_ID}/saved-events`);
  return response.data;
};

export const saveEvent = async (eventId) => {
  const response = await api.post(`/users/${USER_ID}/saved-events`, {
    user_id: USER_ID,
    event_id: eventId,
  });
  return response.data;
};
