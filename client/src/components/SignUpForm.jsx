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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <form onSubmit={onSubmit} className="space-y-5">

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2 animate-fadeIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-600 flex items-center gap-2 animate-fadeIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      )}

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
          className="mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
          style={{
            borderColor: fieldErrors.name ? "#ef4444" : "var(--accent-200)",
            background: "var(--surface)",
            color: "var(--primary-900)",
          }}
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
          className="mt-1 w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
          style={{
            borderColor: fieldErrors.email ? "#ef4444" : "var(--accent-200)",
            background: "var(--surface)",
            color: "var(--primary-900)",
          }}
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
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
            style={{
              borderColor: fieldErrors.password ? "#ef4444" : "var(--accent-200)",
              background: "var(--surface)",
              color: "var(--primary-900)",
            }}
            placeholder="At least 6 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--muted)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--muted)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>
          Confirm password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirm}
            name="confirm"
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="mt-1 w-full px-4 py-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
            style={{
              borderColor: error && password !== confirm ? "#ef4444" : "var(--accent-200)",
              background: "var(--surface)",
              color: "var(--primary-900)",
            }}
            placeholder="Re-type password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--muted)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--muted)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl font-medium transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: loading ? "var(--muted)" : "var(--accent)",
            color: "var(--accent-contrast)",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating account...
            </span>
          ) : (
            "Create account"
          )}
        </button>
      </div>
    </form>
  );
}
