import React from "react";

export default function Navbar({ showAuthButtons = false }) {
  return (
    <header className="w-full py-6 border-b-2 border-gray-400 border-solid">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Brand Logo */}
        <div
          className="text-xl font-semibold"
          style={{ color: "var(--primary-900)" }}
        >
          YourBrand
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--primary-800)" }}
          >
            Home
          </a>

          <a
            href="/shop"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--primary-800)" }}
          >
            Shop
          </a>

          <a
            href="#about"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--primary-800)" }}
          >
            About
          </a>

          <a
            href="/contact"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--primary-800)" }}
          >
            Contact
          </a>

          {/* 🔥 AUTH SECTION */}
          {showAuthButtons ? (
            /* Show LOGIN + SIGNUP */
            <div className="flex items-center gap-3 ml-4">
              <a
                href="/signin"
                className="px-4 py-2 rounded-xl border"
                style={{
                  borderColor: "var(--accent-200)",
                  color: "var(--primary-800)",
                }}
              >
                Login
              </a>

              <a
                href="/signup"
                className="px-4 py-2 rounded-xl font-medium"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                Sign Up
              </a>
            </div>
          ) : (
            /* Show LOGOUT */
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="px-4 py-2 rounded-xl font-medium ml-4"
              style={{
                background: "var(--accent-300)",
                color: "var(--primary-900)",
              }}
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg"
          style={{ background: "var(--accent-300)" }}
          onClick={() => alert("Mobile menu not implemented yet")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="var(--primary-900)"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
