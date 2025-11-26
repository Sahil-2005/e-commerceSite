import React from "react";

export default function HeroSection({ onShopClick }) {
  return (
    <section className="w-full flex items-center justify-center py-16 md:py-24 animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left animate-slideUp">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: "var(--primary-900)" }}
          >
            Thoughtfully made goods,
            <br /> delivered simply.
          </h1>

          <p
            className="mt-6 text-lg md:text-xl max-w-xl leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Minimal design, sustainable materials and transparent pricing — curated
            collections for modern living.
          </p>

          <div className="mt-10 flex items-center justify-center md:justify-start gap-4">
            <button
              onClick={onShopClick}
              className="px-8 py-4 rounded-2xl font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
              style={{
                background: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              Shop Collections
            </button>

            <a
              href="#about"
              className="px-6 py-4 rounded-2xl border-2 font-medium transition-all duration-200 hover:bg-gray-50 hover:shadow-md"
              style={{
                borderColor: "var(--accent-200)",
                color: "var(--primary-800)",
              }}
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Right Sample Product Section */}
        <div className="flex-1 w-full animate-slideUp" style={{ animationDelay: "0.2s" }}>
          <div
            className="mx-auto max-w-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ background: "var(--surface)" }}
          >
            <div
              className="h-64 w-full rounded-xl overflow-hidden flex items-center justify-center relative group"
              style={{
                background:
                  "linear-gradient(180deg, var(--accent-100), transparent)",
              }}
            >
              <div className="text-center z-10">
                <div className="text-2xl font-bold" style={{ color: "var(--primary-900)" }}>
                  Classic Ceramic Mug
                </div>
                <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  Handmade / Dishwasher safe
                </div>
                <div className="mt-4 text-2xl font-bold" style={{ color: "var(--primary-900)" }}>
                  ₹799
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
