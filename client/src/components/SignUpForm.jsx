import React, { useState } from "react";

/**
 * SignUpForm
 * - simple client-side validation (password match, length)
 * - uses mockSignUp for demo
 * Replace mockSignUp with real POST /api/auth/signup
 */

async function mockSignUp({ name, email, password }) {
  await new Promise((r) => setTimeout(r, 900));
  if (!name || !email || !password) throw new Error("Missing fields");
  if (password.length < 6) throw new Error("Password must be at least 6 characters");
  // demo: pretend registration succeeded
  return { id: "user_demo_123", name, email };
}

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await mockSignUp({ name: name.trim(), email: email.trim(), password });
      setSuccess("Account created. Redirecting to sign-in...");
      setTimeout(() => (window.location.href = "/signin"), 900);
    } catch (err) {
      setError(err.message || "Sign up failed");
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
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full px-4 py-3 rounded-xl border"
          style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }}
          placeholder="Jane Doe"
        />
      </div>

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
          placeholder="At least 6 characters"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>
          Confirm password
        </label>
        <input
          type="password"
          value={confirm}
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
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </div>
    </form>
  );
}
