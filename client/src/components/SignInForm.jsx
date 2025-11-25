// src/components/SignInForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../services/auth";

const API_BASE = "http://localhost:5000"; // same origin or "http://localhost:5000"

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email: email.trim(),
        password,
      });

      // assume res.data contains token (e.g., { token, user })
      const token = res.data.token || res.data.accessToken;
      if (!token) throw new Error("No token returned by server");

      // set axios default header and store token in localStorage
      setAuthToken(token);

      // redirect to protected page (e.g. shop)
      window.location.href = "/shop";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded"
        />
      </div>

      <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-500 text-white">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
