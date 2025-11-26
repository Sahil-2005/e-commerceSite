import React from "react";

/**
 * AddProductButton - toggles the add product form
 */
export default function AddProductButton({ onClick, isOpen = false }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-2xl font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
      style={{
        background: isOpen ? "var(--muted)" : "var(--accent)",
        color: "var(--accent-contrast)",
      }}
    >
      {isOpen ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Close Form
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </>
      )}
    </button>
  );
}

