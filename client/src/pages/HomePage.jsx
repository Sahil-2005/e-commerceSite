import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();

  function handleShopClick() {
    navigate("/shop");
  }

  return (
    <div
      className="min-h-screen flex flex-col"
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
      <main className="flex-1">
        <Navbar />

        <HeroSection onShopClick={handleShopClick} />

        <AboutUs />
      </main>

      <Footer />
    </div>
  );
}
