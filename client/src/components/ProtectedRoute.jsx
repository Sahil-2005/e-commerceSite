// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { getStoredToken, setAuthToken } from "../services/auth";

const API_BASE = ""; // set if backend on differen origin

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState({ loading: true, authed: false });

  useEffect(() => {
    let mounted = true;

    async function verify() {
      // If token in localStorage, set header for axios
      const token = getStoredToken();
      if (!token) {
        if (mounted) setStatus({ loading: false, authed: false });
        return;
      }
      setAuthToken(token); // ensures axios header set

      try {
        // Call a protected endpoint that uses your authMiddleware
        await axios.get(`${API_BASE}/api/auth/me`);
        if (mounted) setStatus({ loading: false, authed: true });
      } catch (err) {
        console.warn("ProtectedRoute: token invalid or /me failed", err?.response?.data || err.message);
        // remove token if invalid
        setAuthToken(null);
        if (mounted) setStatus({ loading: false, authed: false });
      }
    }

    verify();
    return () => {
      mounted = false;
    };
  }, []);

  if (status.loading) {
    // Return a loader or null while verifying
    return <div className="p-8 text-center">Checking authentication…</div>;
  }

  if (!status.authed) {
    // Not authed — redirect to signin (you can pass state to come back)
    return <Navigate to="/signin" replace />;
  }

  // Render protected children
  return children;
}
