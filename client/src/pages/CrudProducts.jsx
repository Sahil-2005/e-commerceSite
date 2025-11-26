import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProductButton from "../components/AddProductButton";
import AddProductForm from "../components/AddProductForm";
import UpdateProduct from "../components/UpdateProduct";
import DeleteProduct from "../components/DeleteProduct";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DisplayProductSection from "../components/DisplayProductSection";

const API = "http://localhost:5000/api/products";

export default function CrudProducts() {
  const [products, setProducts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification
  function showNotification(message, type = "success") {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  }

  // Helper function to ensure image URLs are properly formatted
  const processProductImages = (products) => {
    return products.map((p) => ({
      ...p,
      image: p.image
        ? p.image.startsWith("http://") || p.image.startsWith("https://")
          ? p.image
          : p.image.startsWith("/uploads")
          ? `http://localhost:5000${p.image}`
          : `http://localhost:5000/uploads/${p.image}`
        : "",
    }));
  };

  // Fetch products from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(API);
        // Handle both old format (array) and new format (object with products array)
        const productsData = res.data.products || res.data;
        const productsArray = Array.isArray(productsData) ? productsData : [];
        // Process image URLs to ensure they're absolute
        const processedProducts = processProductImages(productsArray);
        setProducts(processedProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please refresh the page.");
        showNotification("Failed to load products", "error");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Add product (POST)
  async function handleAdd(product) {
    try {
      setError("");
      
      // Use FormData if available, otherwise fallback to JSON
      const formData = product.formData || product;
      const isFormData = formData instanceof FormData;
      
      const res = await axios.post(API, formData, {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      });
      
      const newProduct = res.data.product || res.data;
      // Process image URL for new product
      const processedProduct = processProductImages([newProduct])[0];
      setProducts((prev) => [processedProduct, ...prev]);
      setFormOpen(false);
      setEditingProduct(null);
      showNotification("Product added successfully!", "success");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add product";
      const errors = err.response?.data?.errors || {};
      
      setError(errorMsg);
      showNotification(errorMsg, "error");
      
      // Log validation errors
      if (Object.keys(errors).length > 0) {
        console.error("Validation errors:", errors);
      }
    }
  }

  // Update product (PUT)
  async function handleUpdate(product) {
    try {
      setError("");
      
      // Use FormData if available, otherwise fallback to JSON
      const formData = product.formData || product;
      const isFormData = formData instanceof FormData;
      
      // If FormData, append the product ID to it
      if (isFormData && product._id) {
        // FormData already has the fields, just need to send it
      } else if (!isFormData && product._id) {
        // For JSON, use the product object directly
      }
      
      const productId = product._id || product.id;
      const res = await axios.put(`${API}/${productId}`, formData, {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      });
      
      const updatedProduct = res.data.product || res.data;
      // Process image URL for updated product
      const processedProduct = processProductImages([updatedProduct])[0];
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? processedProduct : p))
      );
      setFormOpen(false);
      setEditingProduct(null);
      showNotification("Product updated successfully!", "success");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update product";
      const errors = err.response?.data?.errors || {};
      
      setError(errorMsg);
      showNotification(errorMsg, "error");
      
      // Log validation errors
      if (Object.keys(errors).length > 0) {
        console.error("Validation errors:", errors);
      }
    }
  }

  // Delete product (DELETE)
  async function handleDelete(id) {
    try {
      setError("");
      await axios.delete(`${API}/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showNotification("Product deleted successfully!", "success");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete product";
      setError(errorMsg);
      showNotification(errorMsg, "error");
    }
  }

  // Edit mode
  function openEdit(product) {
    setEditingProduct(product);
    setFormOpen(true);
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
      <Navbar />

      {/* Notification Toast */}
      {notification.show && (
        <div
          className="fixed top-20 right-6 z-50 px-6 py-4 rounded-2xl shadow-lg animate-fadeIn flex items-center gap-3 max-w-md"
          style={{
            background: notification.type === "success" ? "#10b981" : "#ef4444",
            color: "white",
          }}
        >
          {notification.type === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pt-8 gap-4">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "var(--primary-900)" }}
            >
              Product Manager
            </h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Manage your product catalog
            </p>
          </div>

          <AddProductButton
            onClick={() => {
              setEditingProduct(null);
              setFormOpen((s) => !s);
            }}
            isOpen={formOpen}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 animate-fadeIn">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Add / Edit Form */}
        {formOpen && (
          <div className="mb-8 animate-slideDown">
            <AddProductForm
              initialData={editingProduct}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onCancel={() => {
                setFormOpen(false);
                setEditingProduct(null);
                setError("");
              }}
            />
          </div>
        )}

        {/* Product management sections */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Loading products...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DisplayProductSection products={products} />
            </div>

            <aside className="space-y-6">
              <UpdateProduct products={products} onEdit={openEdit} />
              <DeleteProduct products={products} onDelete={handleDelete} />
            </aside>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductButton from "../components/AddProductButton";
// import AddProductForm from "../components/AddProductForm";
// import UpdateProduct from "../components/UpdateProduct";
// import DeleteProduct from "../components/DeleteProduct";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import DisplayProductSection from "../components/DisplayProductSection";

// const API = "http://localhost:5000/api/products";

// export default function CrudProducts() {
//   const [products, setProducts] = useState([]);
//   const [formOpen, setFormOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Fetch products
//   useEffect(() => {
//     axios.get(API).then((res) => setProducts(res.data));
//   }, []);

//   // Convert product object to FormData
//   function productToFormData(product) {
//     const fd = new FormData();
//     fd.append("name", product.name);
//     fd.append("description", product.description);
//     fd.append("price", product.price);

//     // Only append image if file exists
//     if (product.imageFile) {
//       fd.append("image", product.imageFile); // multer field name = "image"
//     }

//     return fd;
//   }

//   // Add product (POST)
//   async function handleAdd(product) {
//     const fd = productToFormData(product);

//     const res = await axios.post(API, fd, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setProducts((prev) => [res.data, ...prev]);
//     setFormOpen(false);
//     setEditingProduct(null);
//   }

//   // Update product (PUT)
//   async function handleUpdate(product) {
//     const fd = productToFormData(product);

//     const res = await axios.put(`${API}/${product._id}`, fd, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setProducts((prev) =>
//       prev.map((p) => (p._id === product._id ? res.data : p))
//     );

//     setFormOpen(false);
//     setEditingProduct(null);
//   }

//   // Delete
//   async function handleDelete(id) {
//     await axios.delete(`${API}/${id}`);
//     setProducts((prev) => prev.filter((p) => p._id !== id));
//   }

//   // Edit mode
//   function openEdit(product) {
//     setEditingProduct(product);
//     setFormOpen(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   return (
//     <div className="min-h-screen py-12">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-6">
//         <div className="flex items-center justify-between mb-8 pt-[3%]">
//           <h1 className="text-2xl font-semibold">Product Manager</h1>

//           <AddProductButton
//             onClick={() => {
//               setEditingProduct(null);
//               setFormOpen((s) => !s);
//             }}
//           />
//         </div>

//         {/* Add / Edit Form */}
//         {formOpen && (
//           <div className="mb-8">
//             <AddProductForm
//               initialData={editingProduct}
//               onAdd={handleAdd}
//               onUpdate={handleUpdate}
//               onCancel={() => {
//                 setFormOpen(false);
//                 setEditingProduct(null);
//               }}
//             />
//           </div>
//         )}

//         {/* Product Sections */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <DisplayProductSection products={products} />
//           </div>

//           <aside className="space-y-6">
//             <UpdateProduct products={products} onEdit={openEdit} />
//             <DeleteProduct products={products} onDelete={handleDelete} />
//           </aside>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
