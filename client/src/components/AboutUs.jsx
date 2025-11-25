import React from "react";

export default function AboutUs() {
  return (
    <section id="about" className="w-full py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2
          className="text-3xl font-semibold"
          style={{ color: "var(--primary-900)" }}
        >
          About Us
        </h2>

        <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          We’re a small team building elevated everyday products — designed with
          care and produced responsibly. Our mission is to make good design
          accessible and be transparent about where and how things are made.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-xl shadow-sm"
            style={{ background: "var(--surface)" }}
          >
            <h3 className="font-semibold">Sustainability</h3>
            <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
              Materials chosen to last and ship responsibly.
            </p>
          </div>

          <div
            className="p-6 rounded-xl shadow-sm"
            style={{ background: "var(--surface)" }}
          >
            <h3 className="font-semibold">Transparency</h3>
            <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
              Clear pricing and origin information on every product page.
            </p>
          </div>

          <div
            className="p-6 rounded-xl shadow-sm"
            style={{ background: "var(--surface)" }}
          >
            <h3 className="font-semibold">Quality</h3>
            <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
              Built for everyday use — tested and loved by customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
