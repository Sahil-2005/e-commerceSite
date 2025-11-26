import React, { useState } from "react";

/**
 * DisplayProductSection - shows all products in a grid
 */
export default function DisplayProductSection({ products = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = products
    .filter((p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price-asc") {
        return a.price - b.price;
      } else if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--primary-900)" }}
          >
            All Products
          </h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {products.length} {products.length === 1 ? "product" : "products"} total
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:flex-initial sm:w-64">
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

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
            style={{
              borderColor: "var(--accent-200)",
              background: "var(--surface)",
              color: "var(--primary-900)",
            }}
          >
            <option value="name">Sort: Name</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4"
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
          <p className="text-lg font-medium mb-2" style={{ color: "var(--primary-900)" }}>
            No products yet
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Add your first product to get started
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "var(--muted)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium mb-2" style={{ color: "var(--primary-900)" }}>
            No products found
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Try adjusting your search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <article
              key={p._id || p.id}
              className="p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              style={{ background: "var(--surface)" }}
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={p.image}
                  alt={p.name}
                  className="object-contain h-full w-full p-2"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='50' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3E?%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="font-bold text-lg mb-1 truncate"
                  style={{ color: "var(--primary-900)" }}
                >
                  {p.name}
                </div>
                <div
                  className="text-sm mb-3 line-clamp-2"
                  style={{ color: "var(--muted)" }}
                >
                  {p.shortDescription || "No description"}
                </div>
                <div className="text-xl font-bold" style={{ color: "var(--primary-900)" }}>
                  ₹{p.price}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
