// src/utils/auth.js
import axios from "axios";

const API_BASE = ""; // set e.g. "http://localhost:5000" if backend on different origin

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
}

export function getStoredToken() {
  return localStorage.getItem("token");
}

// Optionally create an API instance:
// export const api = axios.create({ baseURL: API_BASE });
