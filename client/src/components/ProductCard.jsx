import React from "react";

/**
 * ProductCard
 * props:
 *  - product: { id, name, shortDescription, price, image }
 */
export default function ProductCard({ product }) {
  return (
    <article
      className="rounded-2xl overflow-hidden shadow-sm flex flex-col"
      style={{ background: "var(--surface)" }}
    >
      <div className="h-44 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {/* Use the uploaded local file path as demo image */}
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full w-full"
          style={{ maxHeight: "220px" }}
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg" style={{ color: "var(--primary-900)" }}>
            {product.name}
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-semibold">₹{product.price}</div>
          <button
            className="px-3 py-2 rounded-xl text-sm"
            style={{
              background: "transparent",
              border: "1px solid var(--accent-200)",
              color: "var(--primary-800)",
            }}
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
