import React, { useState } from "react";

/**
 * DeleteProduct
 * - Lists products with a Delete button that calls onDelete(id)
 * - Custom confirmation modal
 */
export default function DeleteProduct({ products = [], onDelete }) {
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, product: null });

  function handleDeleteClick(product) {
    setDeleteConfirm({ show: true, product });
  }

  function confirmDelete() {
    if (deleteConfirm.product) {
      onDelete(deleteConfirm.product._id || deleteConfirm.product.id);
      setDeleteConfirm({ show: false, product: null });
    }
  }

  function cancelDelete() {
    setDeleteConfirm({ show: false, product: null });
  }

  return (
    <>
      <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg" style={{ color: "var(--primary-900)" }}>
            Delete Products
          </h3>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              No products to delete
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto space-y-2">
            {products.map((p) => (
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
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteClick(p)}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ml-3 flex-shrink-0 flex items-center gap-1"
                  style={{
                    background: "transparent",
                    border: "1px solid #ef4444",
                    color: "#dc2626",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#ef4444";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#dc2626";
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slideUp">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold" style={{ color: "var(--primary-900)" }}>
                    Delete Product?
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-3">
                  {deleteConfirm.product?.image && (
                    <img
                      src={deleteConfirm.product.image}
                      alt={deleteConfirm.product.name}
                      className="w-16 h-16 object-contain rounded-lg bg-white"
                    />
                  )}
                  <div>
                    <p className="font-semibold" style={{ color: "var(--primary-900)" }}>
                      {deleteConfirm.product?.name}
                    </p>
                    {deleteConfirm.product?.price && (
                      <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
                        ₹{deleteConfirm.product.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                  style={{
                    background: "#ef4444",
                    color: "white",
                  }}
                >
                  Delete Product
                </button>
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-3 rounded-xl font-medium border transition-all duration-200 hover:bg-gray-50"
                  style={{
                    borderColor: "var(--accent-200)",
                    color: "var(--primary-800)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
