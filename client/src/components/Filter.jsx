import React from "react";

/**
 * Filter
 * props:
 *  - value: 'none' | 'price-asc' | 'price-desc'
 *  - onChange: (newValue) => void
 */
export default function Filter({ value, onChange }) {
  return (
    <div>
      <label htmlFor="sort" className="sr-only">Sort products</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 rounded-2xl border bg-white"
        style={{
          borderColor: "var(--accent-200)",
          color: "var(--primary-900)",
          boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
        }}
        aria-label="Sort products"
      >
        <option value="none">Sort: none</option>
        <option value="price-asc">Price: low → high</option>
        <option value="price-desc">Price: high → low</option>
      </select>
    </div>
  );
}
