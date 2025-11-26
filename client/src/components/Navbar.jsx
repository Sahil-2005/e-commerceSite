import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getStoredToken, setAuthToken } from "../services/auth";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = getStoredToken();
      setIsAuthenticated(!!token);
    };

    // Check on mount and when location changes
    checkAuth();

    // Listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener("storage", checkAuth);
    
    // Custom event for login/logout in same tab
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    setAuthToken(null); // This removes token from localStorage and axios headers
    setIsAuthenticated(false);
    // Dispatch custom event for other components
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Don't show auth buttons on signin/signup pages
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  // Show auth buttons only if: not authenticated AND not on auth pages
  const showAuthButtons = !isAuthenticated && !isAuthPage;
  // Show logout only if: authenticated AND not on auth pages
  const showLogout = isAuthenticated && !isAuthPage;

  return (
    <header className="w-full py-4 md:py-6 border-b-2 border-gray-200 border-solid sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
          onClick={handleNavClick}
        >
          <img
            src="/shopping.png"
            alt="logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover"
          />
          <span
            className="text-lg md:text-xl font-bold hidden sm:block"
            style={{ color: "var(--primary-900)" }}
          >
            YourBrand
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-all duration-200 hover:opacity-70 relative group"
            style={{ color: "var(--primary-800)" }}
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-200 group-hover:w-full"></span>
          </Link>

          <Link
            to="/shop"
            className="text-sm font-medium transition-all duration-200 hover:opacity-70 relative group"
            style={{ color: "var(--primary-800)" }}
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-200 group-hover:w-full"></span>
          </Link>

          <a
            href="/#about"
            className="text-sm font-medium transition-all duration-200 hover:opacity-70 relative group"
            style={{ color: "var(--primary-800)" }}
            onClick={handleNavClick}
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-200 group-hover:w-full"></span>
          </a>

          {/* 🔥 AUTH SECTION */}
          {showAuthButtons && (
            /* Show LOGIN + SIGNUP */
            <div className="flex items-center gap-3 ml-4">
              <Link
                to="/signin"
                className="px-4 py-2 rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-105"
                style={{
                  borderColor: "var(--accent-200)",
                  color: "var(--primary-800)",
                }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-md hover:scale-105"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
          {showLogout && (
            /* Show LOGOUT */
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl font-medium ml-4 transition-all duration-200 hover:shadow-md hover:scale-105"
              style={{
                background: "var(--accent-300)",
                color: "var(--primary-900)",
              }}
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-200 hover:bg-gray-100"
          style={{ background: isMobileMenuOpen ? "var(--accent-300)" : "var(--accent-200)" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="var(--primary-900)"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="var(--primary-900)"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-slideDown">
          <nav className="flex flex-col py-4 px-4 space-y-3">
            <Link
              to="/"
              className="text-sm font-medium py-2 px-4 rounded-lg transition-colors hover:bg-gray-50"
              style={{ color: "var(--primary-800)" }}
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-sm font-medium py-2 px-4 rounded-lg transition-colors hover:bg-gray-50"
              style={{ color: "var(--primary-800)" }}
              onClick={handleNavClick}
            >
              Shop
            </Link>
            <a
              href="/#about"
              className="text-sm font-medium py-2 px-4 rounded-lg transition-colors hover:bg-gray-50"
              style={{ color: "var(--primary-800)" }}
              onClick={handleNavClick}
            >
              About
            </a>
            {showAuthButtons && (
              <>
                <Link
                  to="/signin"
                  className="text-sm font-medium py-2 px-4 rounded-lg border text-center transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "var(--accent-200)",
                    color: "var(--primary-800)",
                  }}
                  onClick={handleNavClick}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-contrast)",
                  }}
                  onClick={handleNavClick}
                >
                  Sign Up
                </Link>
              </>
            )}
            {showLogout && (
              <button
                onClick={handleLogout}
                className="text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
                style={{
                  background: "var(--accent-300)",
                  color: "var(--primary-900)",
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
