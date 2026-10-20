import React from 'react';
import { ArrowUp, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050504] border-t border-[#292218] text-[#8e816f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#221c14]">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full border border-[#c9a568]/40 flex items-center justify-center text-[#f0d8a4] text-sm font-serif">
                ♧
              </span>
              <span className="font-display text-2xl tracking-[0.25em] text-[#fbf7ee]">
                ETH<span className="text-[#c9a568]">I</span>CS
              </span>
            </a>

            <p className="font-serif italic text-base text-[#d8cab7] mb-2">
              “Pure Essence. Timeless Elegance.”
            </p>

            <p className="font-sans text-xs text-[#7f7362] leading-relaxed max-w-sm mb-6">
              A private house of haute parfumerie. Distilling rare wild agarwood, Turkish roses, and golden amber into heirloom crystal flacons.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-[#c9a568] flex items-center justify-center text-[#aba090] hover:text-[#c9a568] transition-colors"
                aria-label="ETHICS Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-[#c9a568] flex items-center justify-center text-[#aba090] hover:text-[#c9a568] transition-colors"
                aria-label="ETHICS Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-[#c9a568] flex items-center justify-center text-[#aba090] hover:text-[#c9a568] transition-colors"
                aria-label="ETHICS Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-[#c9a568] mb-5">
              EXPLORE
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider uppercase text-[#b8aca0]">
              <li>
                <a href="#home" className="hover:text-[#f0d8a4] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#f0d8a4] transition-colors">
                  The Trilogy Collection
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#f0d8a4] transition-colors">
                  Essence & Mood
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#f0d8a4] transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-[#f0d8a4] transition-colors">
                  Artisanal Craftsmanship
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#f0d8a4] transition-colors">
                  Connoisseur Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Boutique Salons & Legal */}
          <div className="md:col-span-4">
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-[#c9a568] mb-5">
              PRIVATE SALONS
            </h4>
            <ul className="space-y-3 font-sans text-xs text-[#958877]">
              <li>
                <span className="text-[#fbf7ee] font-medium block">Grasse Flagship</span>
                14 Rue des Parfumeurs, 06130 Grasse, France
              </li>
              <li>
                <span className="text-[#fbf7ee] font-medium block">Paris Private Salon</span>
                28 Place Vendôme, 75001 Paris, France
              </li>
              <li>
                <span className="text-[#fbf7ee] font-medium block">London Mayfair</span>
                17 Old Bond Street, London W1S 4PF, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with mandatory exact credit: “Design by Asrar Rahim U Llah Kasana” */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#766b5c]">
          <div>
            <span>© {new Date().getFullYear()} ETHICS. All rights reserved.</span>
          </div>

          {/* Exact required designer credit */}
          <div className="text-center font-serif italic text-sm text-[#c9a568]">
            Design by Asrar Rahim U Llah Kasana
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#f0d8a4] transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
