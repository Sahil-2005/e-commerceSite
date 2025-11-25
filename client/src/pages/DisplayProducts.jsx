import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import SearchButton from "../components/SearchButton";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

// Backend URL
const API = "http://localhost:5000/api/products";

export default function DisplayProducts() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("none");
  const [loading, setLoading] = useState(false);

  const [allProducts, setAllProducts] = useState([]); // full list from backend
  const [results, setResults] = useState([]); // filtered list

  // Fetch products from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await axios.get(API);
        setAllProducts(res.data);
        setResults(res.data); // initial display
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Search + filter logic
  function applySearchAndFilter() {
    setLoading(true);

    setTimeout(() => {
      let out = [...allProducts];

      // Search (case-insensitive)
      const q = query.trim().toLowerCase();
      if (q !== "") {
        out = out.filter((p) => p.name.toLowerCase().includes(q));
      }

      // Sorting
      if (filter === "price-asc") {
        out.sort((a, b) => a.price - b.price);
      } else if (filter === "price-desc") {
        out.sort((a, b) => b.price - a.price);
      }

      setResults(out);
      setLoading(false);
    }, 200);
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
        <h1
          className="text-3xl font-semibold mb-6 pt-[3%]"
          style={{ color: "var(--primary-900)" }}
        >
          Browse Products
        </h1>

        {/* Controls row */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              value={query}
              onChange={(v) => setQuery(v)}
              placeholder="Search product name..."
            />
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
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Loading...
            </div>
          ) : results.length === 0 ? (
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
