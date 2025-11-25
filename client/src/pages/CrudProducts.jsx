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

  // Fetch products from backend
  useEffect(() => {
    axios.get(API).then((res) => setProducts(res.data));
  }, []);

  // Add product (POST)
  async function handleAdd(product) {
    const res = await axios.post(API, product);
    setProducts((prev) => [res.data, ...prev]);
    setFormOpen(false);
    setEditingProduct(null);
  }

  // Update product (PUT)
  async function handleUpdate(product) {
    const res = await axios.put(`${API}/${product._id}`, product);
    setProducts((prev) =>
      prev.map((p) => (p._id === product._id ? res.data : p))
    );
    setFormOpen(false);
    setEditingProduct(null);
  }

  // Delete product (DELETE)
  async function handleDelete(id) {
    await axios.delete(`${API}/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  // Edit mode
  function openEdit(product) {
    setEditingProduct(product);
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen py-12">
      <Navbar showAuthButtons={false} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8 pt-[3%]">
          <h1 className="text-2xl font-semibold">Product Manager</h1>

          <AddProductButton
            onClick={() => {
              setEditingProduct(null);
              setFormOpen((s) => !s);
            }}
          />
        </div>

        {/* Add / Edit Form */}
        {formOpen && (
          <div className="mb-8">
            <AddProductForm
              initialData={editingProduct}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onCancel={() => {
                setFormOpen(false);
                setEditingProduct(null);
              }}
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
//       <Navbar showAuthButtons={false} />

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
