import React, { useState } from "react";
import AddProductButton from "../components/AddProductButton";
import AddProductForm from "../components/AddProductForm";
import UpdateProduct from "../components/UpdateProduct";
import DeleteProduct from "../components/DeleteProduct";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DisplayProductSection from "../components/DisplayProductSection";

/**
 * CrudProducts page
 * - Holds product list (mocked)
 * - Exposes handlers for add / update / delete
 * - AddProductForm is used both to add and to update (prefilled)
 */
export default function CrudProducts() {
  // initial mock data
  const INIT = [
    {
      id: "p1",
      name: "Classic Ceramic Mug",
      shortDescription: "Handmade / Dishwasher safe",
      price: 799,
      image: "/mnt/data/e7983348-efb7-48df-94c3-9a0cf665c463.png",
    },
    {
      id: "p2",
      name: "Minimal Cotton Tee",
      shortDescription: "Soft organic cotton",
      price: 999,
      image: "/mnt/data/e7983348-efb7-48df-94c3-9a0cf665c463.png",
    },
  ];

  const [products, setProducts] = useState(INIT);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Add product
  function handleAdd(product) {
    setProducts((prev) => [{ ...product, id: "p" + Date.now() }, ...prev]);
    setFormOpen(false);
    setEditingProduct(null);
  }

  // Update product
  function handleUpdate(updated) {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setFormOpen(false);
    setEditingProduct(null);
  }

  // Delete product
  function handleDelete(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // Trigger edit (open form with product)
  function openEdit(product) {
    setEditingProduct(product);
    setFormOpen(true);
    // scroll into view
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="min-h-screen py-12"
      style={{
        "--primary-900": "#1f2937",
        "--primary-800": "#374151",
        "--muted": "#4b5563",
        "--accent": "#8ca9ff",
        "--accent-100": "#aac4f5",
        "--accent-200": "#fff8de",
        "--accent-300": "#fff2c6",
        "--accent-contrast": "#061028",
        "--surface": "#ffffff",
      }}
    >
      <Navbar showAuthButtons={false} />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 pt-[3%]">
          <h1 className="text-2xl font-semibold" style={{ color: "var(--primary-900)" }}>
            Product Manager
          </h1>

          <AddProductButton onClick={() => { setEditingProduct(null); setFormOpen((s) => !s); }} />
        </div>

        {/* Add / Edit Form */}
        {formOpen && (
          <div className="mb-8">
            <AddProductForm
              initialData={editingProduct}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onCancel={() => { setFormOpen(false); setEditingProduct(null); }}
            />
          </div>
        )}

        {/* Product management sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DisplayProductSection products={products} />
          </div>

          <aside className="space-y-6">
            <UpdateProduct products={products} onEdit={openEdit} />
            <DeleteProduct products={products} onDelete={handleDelete} />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
