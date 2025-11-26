import React, { useState } from "react";

/**
 * UpdateProduct
 * - Lists products and exposes an Edit button that calls onEdit(product)
 */
export default function UpdateProduct({ products = [], onEdit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg" style={{ color: "var(--primary-900)" }}>
          Edit Products
        </h3>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          {products.length}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "var(--muted)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            No products to edit
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                style={{
                  borderColor: "var(--accent-200)",
                  background: "var(--surface)",
                  color: "var(--primary-900)",
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
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
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-6 text-sm" style={{ color: "var(--muted)" }}>
                No products match "{searchQuery}"
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div
                  key={p._id || p.id}
                  className="flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    borderColor: "var(--accent-200)",
                    background: "var(--surface)",
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="object-contain h-full w-full"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='50' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3E?%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-semibold truncate"
                        style={{ color: "var(--primary-900)" }}
                      >
                        {p.name}
                      </div>
                      <div className="text-xs font-medium mt-1" style={{ color: "var(--muted)" }}>
                        ₹{p.price}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onEdit(p)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ml-3 flex-shrink-0"
                    style={{
                      background: "var(--accent)",
                      color: "var(--accent-contrast)",
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
