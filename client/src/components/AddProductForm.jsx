import React, { useEffect, useState } from "react";

/**
 * AddProductForm
 * - initialData: optional product to prefill (for update)
 * - onAdd: called with product for new products
 * - onUpdate: called with updated product when editing
 * - onCancel: close form
 *
 * NOTE: For production, replace the local image-preview flow with upload to storage/backend.
 */
export default function AddProductForm({ initialData = null, onAdd, onUpdate, onCancel }) {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null); // file object
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setShortDescription(initialData.shortDescription || "");
      setPrice(initialData.price ?? "");
      // Set preview to existing image URL (from server)
      if (initialData.image) {
        // If image is a full URL or starts with /uploads, use it directly
        const imageUrl = initialData.image.startsWith("http")
          ? initialData.image
          : `http://localhost:5000${initialData.image}`;
        setImagePreview(imageUrl);
      } else {
        setImagePreview("");
      }
      setImageFile(null); // Reset file when editing
    } else {
      // reset if adding new
      setName("");
      setShortDescription("");
      setPrice("");
      setImageFile(null);
      setImagePreview("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // handle file selection and preview
  function onFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setImageFile(f);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(f);
  }

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!price || Number(price) <= 0) newErrors.price = "Price must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setErrors({});

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("shortDescription", shortDescription.trim());
      formData.append("price", Number(price));

      // Handle image file
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (!initialData) {
        // New product must have an image
        setErrors({ image: "Please upload an image file" });
        setSaving(false);
        return;
      }
      // If editing without new file, image won't be updated (backend handles this)

      // Create payload object for parent component
      const payload = {
        id: initialData?.id || undefined,
        _id: initialData?._id || undefined,
        name: name.trim(),
        shortDescription: shortDescription.trim(),
        price: Number(price),
        image: imagePreview, // Keep for preview purposes
        formData: formData, // Pass FormData to parent
      };

      if (initialData) {
        onUpdate && (await onUpdate(payload));
      } else {
        onAdd && (await onAdd(payload));
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setErrors({ submit: err.message || "Failed to save product" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "var(--primary-900)" }}>
          {initialData ? "Edit Product" : "Add New Product"}
        </h2>
        {initialData && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            Editing
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--primary-900)" }}>
            Product Image
          </label>
          <div className="relative">
            <div className="h-48 w-full rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed transition-colors hover:border-solid" style={{ 
              background: "var(--accent-100)",
              borderColor: errors.image ? "#ef4444" : "var(--accent-200)"
            }}>
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="object-contain h-full w-full p-2" />
              ) : (
                <div className="text-center p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: "var(--muted)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>No image</p>
                </div>
              )}
            </div>
            <label className="mt-3 block">
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
              <div className="px-4 py-2 rounded-xl border text-center cursor-pointer transition-all hover:bg-gray-50 font-medium text-sm" style={{ 
                borderColor: "var(--accent-200)",
                color: "var(--primary-800)"
              }}>
                {imageFile ? "Change Image" : "Upload Image"}
              </div>
            </label>
            {imageFile && (
              <p className="text-xs mt-2 text-green-600 flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {imageFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--primary-900)" }}>
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
              style={{
                borderColor: errors.name ? "#ef4444" : "var(--accent-200)",
                background: "var(--surface)",
                color: "var(--primary-900)",
              }}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--primary-900)" }}>
              Short Description
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none"
              style={{
                borderColor: "var(--accent-200)",
                background: "var(--surface)",
                color: "var(--primary-900)",
              }}
              placeholder="Brief description of the product..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--primary-900)" }}>
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-medium" style={{ color: "var(--muted)" }}>₹</span>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) setErrors({ ...errors, price: "" });
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
                style={{
                  borderColor: errors.price ? "#ef4444" : "var(--accent-200)",
                  background: "var(--surface)",
                  color: "var(--primary-900)",
                }}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.price}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-2xl font-semibold transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
              style={{
                background: saving ? "var(--muted)" : "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : initialData ? (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Product
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Product
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-2xl border font-medium transition-all duration-200 hover:bg-gray-50"
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
    </form>
  );
}
