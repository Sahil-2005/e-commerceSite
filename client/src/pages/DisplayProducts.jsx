import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import SearchButton from "../components/SearchButton";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

/**
 * DisplayProducts page
 * - Holds products data (mocked here; replace with API call to backend)
 * - Search + filter applied when user clicks SearchButton
 *
 * Note: the image URL for demo uses the uploaded file path:
 * /mnt/data/e7983348-efb7-48df-94c3-9a0cf665c463.png
 */
export default function DisplayProducts() {
  // ui state
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("none"); // 'none' | 'price-asc' | 'price-desc'
  const [loading, setLoading] = useState(false);

  // mock product list - replace with fetched data from backend (API -> MongoDB)
  const PRODUCTS = [
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
    {
      id: "p3",
      name: "Wooden Tray",
      shortDescription: "Sustainably sourced beechwood",
      price: 1299,
      image: "/mnt/data/e7983348-efb7-48df-94c3-9a0cf665c463.png",
    },
    {
      id: "p4",
      name: "Classic Ceramic Bowl",
      shortDescription: "Hand-thrown, food-safe glaze",
      price: 699,
      image: "/mnt/data/e7983348-efb7-48df-94c3-9a0cf665c463.png",
    },
  ];

  // products shown after last search
  const [results, setResults] = useState(PRODUCTS);

  function applySearchAndFilter() {
    setLoading(true);

    // emulate async fetch/processing
    setTimeout(() => {
      // filter by query (case-insensitive substring match on name)
      const q = query.trim().toLowerCase();
      let out = PRODUCTS.filter((p) => (q === "" ? true : p.name.toLowerCase().includes(q)));

      // apply sort
      if (filter === "price-asc") {
        out = out.slice().sort((a, b) => a.price - b.price);
      } else if (filter === "price-desc") {
        out = out.slice().sort((a, b) => b.price - a.price);
      }

      setResults(out);
      setLoading(false);
    }, 350); // short delay to show loading state
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
        <h1 className="text-3xl font-semibold mb-6 pt-[3%]" style={{ color: "var(--primary-900)" }}>
          Browse Products
        </h1>

        {/* Controls row */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="flex-1">
            <SearchBar value={query} onChange={(v) => setQuery(v)} placeholder="Search product name..." />
          </div>

          <div className="w-full md:w-60">
            <Filter value={filter} onChange={(v) => setFilter(v)} />
          </div>

          <div>
            <SearchButton onClick={applySearchAndFilter} loading={loading} />
          </div>
        </div>

        {/* Results */}
        <div>
          {loading ? (
            <div className="text-sm" style={{ color: "var(--muted)" }}>Searching...</div>
          ) : results.length === 0 ? (
            <div className="text-sm" style={{ color: "var(--muted)" }}>No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
