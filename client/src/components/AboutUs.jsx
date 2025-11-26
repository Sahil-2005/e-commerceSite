import React from "react";

export default function AboutUs() {
  return (
    <section id="about" className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 animate-fadeIn"
          style={{ color: "var(--primary-900)" }}
        >
          About Us
        </h2>

        <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fadeIn" style={{ color: "var(--muted)" }}>
          We're a small team building elevated everyday products — designed with
          care and produced responsibly. Our mission is to make good design
          accessible and be transparent about where and how things are made.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div
            className="p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slideUp"
            style={{ background: "var(--surface)" }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--accent-200)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--accent)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--primary-900)" }}>Sustainability</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Materials chosen to last and ship responsibly.
            </p>
          </div>

          <div
            className="p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slideUp"
            style={{ background: "var(--surface)", animationDelay: "0.1s" }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--accent-200)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--accent)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--primary-900)" }}>Transparency</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Clear pricing and origin information on every product page.
            </p>
          </div>

          <div
            className="p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slideUp"
            style={{ background: "var(--surface)", animationDelay: "0.2s" }}
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--accent-200)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "var(--accent)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--primary-900)" }}>Quality</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Built for everyday use — tested and loved by customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
