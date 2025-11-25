import React from "react";

export default function HeroSection({ onShopClick }) {
  return (
    <section className="w-full flex items-center justify-center py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1
            className="text-4xl md:text-5xl font-semibold leading-tight"
            style={{ color: "var(--primary-900)" }}
          >
            Thoughtfully made goods,
            <br /> delivered simply.
          </h1>

          <p
            className="mt-4 text-lg md:text-xl max-w-xl"
            style={{ color: "var(--muted)" }}
          >
            Minimal design, sustainable materials and transparent pricing — curated
            collections for modern living.
          </p>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
            <button
              onClick={onShopClick}
              className="px-6 py-3 rounded-2xl font-medium shadow-sm transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              Shop Collections
            </button>

            <a
              href="#about"
              className="px-4 py-3 rounded-2xl border font-medium"
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
        <div className="flex-1 w-full">
          <div
            className="mx-auto max-w-sm rounded-2xl p-6 shadow-md"
            style={{ background: "var(--surface)" }}
          >
            <div
              className="h-56 w-full rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(180deg, var(--accent-100), transparent)",
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-semibold">
                  Classic Ceramic Mug
                </div>
                <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  Handmade / Dishwasher safe
                </div>
                <div className="mt-4 text-lg font-medium">₹799</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
