import React from "react";

export default function Footer() {
  return (
    <footer
      className="w-full py-8 border-t"
      style={{ borderColor: "var(--accent-200)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div
            className="text-lg font-semibold"
            style={{ color: "var(--primary-900)" }}
          >
            YourBrand
          </div>
          <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Made with care • Small-batch goods
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="/terms"
            className="text-sm"
            style={{ color: "var(--primary-800)" }}
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="text-sm"
            style={{ color: "var(--primary-800)" }}
          >
            Privacy
          </a>
          <a
            href="mailto:hello@yourbrand.com"
            className="text-sm"
            style={{ color: "var(--primary-800)" }}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
