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
  const [imagePreview, setImagePreview] = useState(initialData?.image || "/mnt/data/e7983348-efb7-48df-94c3-9a0cf665c463.png");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setShortDescription(initialData.shortDescription || "");
      setPrice(initialData.price ?? "");
      setImagePreview(initialData.image || imagePreview);
    } else {
      // reset if adding new
      setName("");
      setShortDescription("");
      setPrice("");
      setImageFile(null);
      setImagePreview("/mnt/data/e7983348-efb7-48df-94c3-9a0cf665c463.png");
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

  async function submit(e) {
    e.preventDefault();
    setSaving(true);

    // Simulate upload delay. In real app:
    // 1) Upload imageFile to storage (S3/GCS/backend) -> get image URL
    // 2) send product payload to backend -> backend persists to MongoDB
    setTimeout(() => {
      const payload = {
        id: initialData?.id || undefined,
        name: name.trim(),
        shortDescription: shortDescription.trim(),
        price: Number(price),
        image: imagePreview, // in real flow this would be uploaded URL
      };

      if (initialData) {
        onUpdate && onUpdate({ ...initialData, ...payload });
      } else {
        onAdd && onAdd(payload);
      }
      setSaving(false);
    }, 700);
  }

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <div className="h-40 w-full rounded-lg overflow-hidden flex items-center justify-center" style={{ background: "var(--accent-100)" }}>
            <img src={imagePreview} alt="preview" className="object-contain h-full w-full" />
          </div>

          <label className="mt-3 block text-sm" style={{ color: "var(--muted)" }}>
            Product image
          </label>
          <input type="file" accept="image/*" onChange={onFileChange} className="mt-2" />
          <div className="text-xs mt-2" style={{ color: "var(--muted)" }}>
            Upload JPG/PNG. Demo uses preview data URL (client-only).
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border" style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }} />
          </div>

          <div>
            <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>Short description</label>
            <input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl border" style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }} />
          </div>

          <div>
            <label className="block text-sm font-medium" style={{ color: "var(--primary-900)" }}>Price (₹)</label>
            <input required type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-40 px-4 py-3 rounded-xl border" style={{ borderColor: "var(--accent-200)", background: "var(--surface)" }} />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <button type="submit" disabled={saving} className="px-4 py-2 rounded-2xl font-medium" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
              {saving ? "Saving..." : initialData ? "Update product" : "Add product"}
            </button>

            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-2xl border" style={{ borderColor: "var(--accent-200)", color: "var(--primary-800)" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
