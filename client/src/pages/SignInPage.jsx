import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import Navbar from "../components/Navbar";

export default function SignInPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
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
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/log-in.png"
            alt="logo"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <div className="text-lg font-semibold" style={{ color: "var(--primary-900)" }}>
              YourBrand
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Welcome back — sign in to continue
            </div>
          </div>
        </div>

        <SignInForm />

        <div className="mt-6 text-sm text-center" style={{ color: "var(--muted)" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--accent)" }} className="font-medium hover:underline transition-all">
            Create one
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
