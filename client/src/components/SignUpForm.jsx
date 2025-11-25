import React, { useState } from "react";
import axios from "axios";

/**
 * SignUpForm (axios version)
 * - Sends POST /api/auth/register with { name, email, password }
 * - Uses axios to handle network and server validation errors
 * - Redirects to /signin on success
 */

// If backend is on another port (e.g. 5000), change this:
const API_BASE = "http://localhost:5000";


export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFieldErrors({});

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/auth/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword: confirm,

      });

      // success
      setSuccess("Account created successfully! Redirecting to sign-in...");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 900);

    } catch (err) {
      // Extract backend error
      if (err.response?.data) {
        const data = err.response.data;
        setError(data.message || data.error || "Registration failed");
        setFieldErrors(data.errors || data.fieldErrors || {});
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
          Full name
        </label>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 rounded-xl border"
          style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }}
          placeholder="Jane Doe"
        />
        {fieldErrors.name && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>
        )}
      </div>

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
          placeholder="At least 6 characters"
        />
        {fieldErrors.password && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>
          Confirm password
        </label>
        <input
          type="password"
          value={confirm}
          name="confirm"
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 rounded-xl border"
          style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }}
          placeholder="Re-type password"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl font-medium"
          style={{
            background: "var(--accent)",
            color: "var(--accent-contrast)",
          }}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </div>
    </form>
  );
}
