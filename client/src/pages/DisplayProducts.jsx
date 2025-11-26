import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
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
        // Handle both old format (array) and new format (object with products array)
        const productsData = res.data.products || res.data;
        const products = Array.isArray(productsData) ? productsData : [];
        
        // Ensure image URLs are absolute
        const productsWithUrls = products.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : p.image?.startsWith("/")
            ? `http://localhost:5000${p.image}`
            : p.image,
        }));
        
        setAllProducts(productsWithUrls);
        setResults(productsWithUrls); // initial display
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Real-time search and filter effect
  useEffect(() => {
    if (allProducts.length === 0) return;

    const timeoutId = setTimeout(() => {
      let out = [...allProducts];

      // Search (case-insensitive)
      const q = query.trim().toLowerCase();
      if (q !== "") {
        out = out.filter((p) => 
          p.name.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
        );
      }

      // Sorting
      if (filter === "price-asc") {
        out.sort((a, b) => a.price - b.price);
      } else if (filter === "price-desc") {
        out.sort((a, b) => b.price - a.price);
      }

      setResults(out);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, filter, allProducts]);

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
              placeholder="Search products..."
              onClear={() => setQuery("")}
            />
          </div>

          <div className="w-full md:w-60">
            <Filter value={filter} onChange={(v) => setFilter(v)} />
          </div>
        </div>

        {/* Results */}
        <div>
          {loading && allProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Loading products...
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--muted)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium mb-2" style={{ color: "var(--primary-900)" }}>
                No products found
              </p>
              <p className="text-sm max-w-md" style={{ color: "var(--muted)" }}>
                {query.trim() 
                  ? `No products match "${query}". Try adjusting your search or filter.`
                  : "No products available at the moment. Check back later!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
