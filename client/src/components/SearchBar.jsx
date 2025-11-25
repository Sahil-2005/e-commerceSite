import React from "react";

/**
 * SearchBar
 * props:
 *  - value: string
 *  - onChange: function(newValue)
 *  - placeholder: string (optional)
 */
export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div>
      <label className="sr-only">Search products</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-opacity-50"
        style={{
          borderColor: "var(--accent-200)",
          background: "var(--surface)",
          color: "var(--primary-900)",
          boxShadow: "0 1px 4px rgba(16,24,40,0.06)",
        }}
        aria-label="Search products"
      />
    </div>
  );
}
