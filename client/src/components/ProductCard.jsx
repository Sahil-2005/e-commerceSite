import React, { useState } from "react";

/**
 * ProductCard
 * props:
 *  - product: { id, name, shortDescription, price, image }
 */
export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className="rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
      style={{ background: "var(--surface)" }}
    >
      <div className="h-44 w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden relative">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Image not available</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className={`object-contain h-full w-full transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110 transition-transform duration-300`}
            style={{ maxHeight: "220px" }}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="font-semibold text-lg line-clamp-2 group-hover:text-opacity-80 transition-colors"
            style={{ color: "var(--primary-900)" }}
          >
            {product.name}
          </h3>
          <p
            className="mt-2 text-sm line-clamp-2"
            style={{ color: "var(--muted)" }}
          >
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold" style={{ color: "var(--primary-900)" }}>
            ₹{product.price}
          </div>
          <button
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "transparent",
              border: "1px solid var(--accent-200)",
              color: "var(--primary-800)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--accent)";
              e.target.style.color = "var(--accent-contrast)";
              e.target.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "var(--primary-800)";
              e.target.style.borderColor = "var(--accent-200)";
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
