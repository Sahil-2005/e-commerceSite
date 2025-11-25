import React from "react";

/**
 * DisplayProductSection - shows all products in a grid
 */
export default function DisplayProductSection({ products = [] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--primary-900)" }}>All products</h2>

      {products.length === 0 ? (
        <div className="text-sm" style={{ color: "var(--muted)" }}>No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <article key={p.id} className="p-4 rounded-2xl shadow-sm flex items-center gap-4" style={{ background: "var(--surface)" }}>
              <div className="w-28 h-28 rounded-lg overflow-hidden bg-gray-100">
                <img src={p.image} alt={p.name} className="object-contain h-full w-full" />
              </div>

              <div className="flex-1">
                <div className="font-semibold" style={{ color: "var(--primary-900)" }}>{p.name}</div>
                <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>{p.shortDescription}</div>
                <div className="mt-3 font-semibold">₹{p.price}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
