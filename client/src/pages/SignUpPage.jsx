import React from "react";
import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{
        "--primary-900": "#1f2937",
        "--primary-800": "#374151",
        "--muted": "#4b5563",
        "--accent": "#8ca9ff",
        "--accent-100": "#aac4f5",
        "--accent-200": "#fff8de",
        "--accent-300": "#fff2c6",
        "--accent-contrast": "#061028",
        "--surface": "#ffffff",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/user.png"
            alt="logo"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <div className="text-lg font-semibold" style={{ color: "var(--primary-900)" }}>
              Create account
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Join us — quick & easy
            </div>
          </div>
        </div>

        <SignUpForm />

        <div className="mt-6 text-sm text-center" style={{ color: "var(--muted)" }}>
          Already have an account?{" "}
          <a href="/signin" style={{ color: "var(--accent)" }} className="font-medium">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
