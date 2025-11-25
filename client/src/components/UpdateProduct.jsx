import React from "react";

/**
 * UpdateProduct
 * - Lists products and exposes an Edit button that calls onEdit(product)
 */
export default function UpdateProduct({ products = [], onEdit }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <h3 className="font-semibold mb-3" style={{ color: "var(--primary-900)" }}>Edit product</h3>
      {products.length === 0 ? (
        <div className="text-sm" style={{ color: "var(--muted)" }}>No products.</div>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li key={p.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-md" />
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--primary-900)" }}>{p.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>₹{p.price}</div>
                </div>
              </div>

              <div>
                <button onClick={() => onEdit(p)} className="px-3 py-1 rounded-xl text-sm" style={{ border: "1px solid var(--accent-200)", color: "var(--primary-800)" }}>
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
