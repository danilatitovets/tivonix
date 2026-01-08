// src/pages/LandingPage.tsx
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import WhyUs from "../components/landing/WhyUs";
import AppsOrbitBlock from "../components/landing/AppsOrbitBlock";
import Benefits from "../components/landing/Benefits";
import SaaSMap from "../components/landing/SaaSMap";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div id="top" />
      <Header />

      <main>
        <div id="hero">
          <Hero />
        </div>

        <div id="stack">
          <WhyUs />
        </div>
         <div id="admin">
            <AppsOrbitBlock />
          </div>


          <div id="benefits">
            <Benefits />
          </div>

          <div id="demo">
            <SaaSMap />
          </div>


        {/* ✅ ВАЖНО: НЕ оборачиваем в div id="faq", id уже есть внутри FAQ.tsx */}
        <FAQ />

        <div id="contact" />
      </main>

      <Footer />
    </div>
  );
}
