/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollageSection from './components/CollageSection';
import Manifesto from './components/Manifesto';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import OrderCalculator from './components/OrderCalculator';
import TestimonialFaq from './components/TestimonialFaq';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

export default function App() {
  // Smooth scroll handler for quick navigation anchors
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // Find offset to adjust for the sticky/floating header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="text-text-dark font-body min-h-screen antialiased selection:bg-black-dark selection:text-white bg-page-bg">
      {/* Floating navigation bar */}
      <Navbar onScrollToSection={handleScrollToSection} />

      <main>
        {/* Hero Banner & Trust Strip Marquee */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Floating Collage & Bento Grid Process Section */}
        <CollageSection />

        {/* Elegant typography Manifesto Section */}
        <Manifesto />

        {/* Brand OS, Advantages, and Interactive Chat simulation Section */}
        <Features />

        {/* Filterable Portfolio grid catalog and detail dialogs */}
        <Portfolio />

        {/* Budget Estimator & WhatsApp direct briefing generator wizard */}
        <OrderCalculator />

        {/* Testimonials carousel & expandable FAQ Accordions */}
        <TestimonialFaq />

        {/* Expandable blog cards & side panel reader */}
        <BlogSection />
      </main>

      {/* Footer & Final Call to action area */}
      <Footer />
    </div>
  );
}
