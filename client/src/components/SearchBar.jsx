import React from "react";

/**
 * SearchBar
 * props:
 *  - value: string
 *  - onChange: function(newValue)
 *  - placeholder: string (optional)
 *  - onClear: function (optional)
 */
export default function SearchBar({ value, onChange, placeholder = "Search...", onClear }) {
  return (
    <div className="relative">
      <label className="sr-only">Search products</label>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
        style={{
          borderColor: "var(--accent-200)",
          background: "var(--surface)",
          color: "var(--primary-900)",
          boxShadow: "0 1px 4px rgba(16,24,40,0.06)",
          paddingRight: value ? "2.75rem" : "1rem",
        }}
        aria-label="Search products"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            onClear && onClear();
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Clear search"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

