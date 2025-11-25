import React from "react";

/**
 * DeleteProduct
 * - Lists products with a Delete button that calls onDelete(id)
 * - Confirms deletion in browser confirm dialog (replace with better modal if needed)
 */
export default function DeleteProduct({ products = [], onDelete }) {
  function handleDelete(id, name) {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      onDelete(id);
    }
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <h3 className="font-semibold mb-3" style={{ color: "var(--primary-900)" }}>Delete product</h3>
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
                </div>
              </div>

              <div>
                <button onClick={() => handleDelete(p.id, p.name)} className="px-3 py-1 rounded-xl text-sm" style={{ background: "transparent", border: "1px solid #f87171", color: "#b91c1c" }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
