import React, { useState } from "react";

/**
 * SignInForm
 * - local validation
 * - calls mockSignIn to simulate backend call
 * Replace mockSignIn with real API call to your backend (POST /api/auth/signin)
 */

async function mockSignIn({ email, password }) {
  // emulate network + backend verification
  await new Promise((r) => setTimeout(r, 700));
  if (!email || !password) {
    throw new Error("Missing credentials");
  }
  // demo: accept any password >= 4 chars
  if (password.length < 4) {
    throw new Error("Invalid credentials");
  }
  return { token: "demo.token.value", user: { email } };
}

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await mockSignIn({ email: email.trim(), password });
      // store token -> in real app use secure storage
      localStorage.setItem("token", res.token);
      // redirect to home or dashboard
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 rounded-xl border"
          style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 rounded-xl border"
          style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }}
          placeholder="Enter your password"
        />
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
