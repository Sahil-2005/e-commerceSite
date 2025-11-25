import React from "react";

/**
 * SearchButton
 * props:
 *  - onClick: () => void
 *  - loading: boolean
 *  - label: string (optional)
 */
export default function SearchButton({ onClick, loading = false, label = "Search" }) {
  return (
    <button
      onClick={() => !loading && onClick()}
      className="px-5 py-3 rounded-2xl font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      style={{
        background: "var(--accent)",
        color: "var(--accent-contrast)",
        minWidth: "110px",
      }}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? "Searching..." : label}
    </button>
  );
}
