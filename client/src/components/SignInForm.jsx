import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFieldErrors({});

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email: email.trim(),
        password,
      });

      // success
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        window.location.href = "/shop";
      }, 700);

    } catch (err) {
      if (err.response?.data) {
        const data = err.response.data;
        setError(data.message || "Login failed");
        setFieldErrors(data.errors || {});
      } else {
        setError("Network error — could not reach server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-green-600">{success}</div>}

      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 rounded-xl border"
          style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }}
          placeholder="you@example.com"
        />
        {fieldErrors.email && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 rounded-xl border"
          style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }}
          placeholder="Enter your password"
        />
        {fieldErrors.password && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm" style={{ color: "var(--muted)" }}>
          <input type="checkbox" className="mr-2" /> Remember me
        </label>

        <a href="/forgot" className="text-sm" style={{ color: "var(--accent)" }}>
          Forgot?
        </a>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
