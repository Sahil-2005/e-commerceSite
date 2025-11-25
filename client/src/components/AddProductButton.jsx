import React from "react";

/**
 * AddProductButton - toggles the add product form
 */
export default function AddProductButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-2xl font-medium shadow-sm"
      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
    >
      + Add product
    </button>
  );
}

