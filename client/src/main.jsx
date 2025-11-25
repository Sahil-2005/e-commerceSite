// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { getStoredToken, setAuthToken } from "./services/auth";
import "./index.css"; 


// set header if token exists (page refresh case)
const token = getStoredToken();
if (token) setAuthToken(token);

createRoot(document.getElementById("root")).render(<App />);
