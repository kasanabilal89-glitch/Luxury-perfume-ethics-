import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { toggleLuxuryAtmosphere } from '../utils/audio';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenQuiz }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    toggleLuxuryAtmosphere((active) => {
      setIsAudioActive(active);
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'h-20 bg-[#070706]/85 backdrop-blur-md border-b border-[#c9a568]/20 shadow-2xl'
          : 'h-24 bg-gradient-to-b from-[#070706]/90 via-[#070706]/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <a href="#home" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#c9a568]/40 flex items-center justify-center text-[#f0d8a4] text-lg font-serif group-hover:border-[#c9a568] transition-colors">
            ♧
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl tracking-[0.25em] text-[#fbf7ee] group-hover:text-[#f0d8a4] transition-colors">
              ETH<span className="text-[#c9a568]">I</span>CS
            </span>
            <span className="text-[7.5px] uppercase tracking-[0.35em] text-[#b6afa2] -mt-1 font-sans">
              Haute Parfumerie
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-[#d6cdbd]">
          <a href="#home" className="hover:text-[#f0d8a4] transition-colors py-1">
            Home
          </a>
          <a href="#collection" className="hover:text-[#f0d8a4] transition-colors py-1">
            Collection
          </a>
          <a href="#showcase" className="hover:text-[#f0d8a4] transition-colors py-1">
            Essence
          </a>
          <a href="#story" className="hover:text-[#f0d8a4] transition-colors py-1">
            Our Story
          </a>
          <a href="#craft" className="hover:text-[#f0d8a4] transition-colors py-1">
            Craftsmanship
          </a>
          <a href="#testimonials" className="hover:text-[#f0d8a4] transition-colors py-1">
            Reviews
          </a>
          <a href="#contact" className="hover:text-[#f0d8a4] transition-colors py-1">
            Concierge
          </a>
        </nav>

        {/* Action Controls: Atmosphere Audio, Scent Finder Quiz, Cart */}
        <div className="flex items-center gap-4">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2.5 rounded-full border transition-all ${
              isAudioActive
                ? 'border-[#c9a568] bg-[#c9a568]/15 text-[#f0d8a4]'
                : 'border-white/10 text-[#a99e8d] hover:border-[#c9a568]/40 hover:text-white'
            }`}
            title={isAudioActive ? 'Mute luxury soundscape' : 'Play luxury ambient soundscape'}
            aria-label="Toggle ambient luxury sound"
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Scent Quiz CTA */}
          <button
            onClick={onOpenQuiz}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#c9a568]/40 text-[#f0d8a4] hover:bg-[#c9a568]/10 text-[10px] uppercase tracking-[0.16em] transition-all"
          >
            <Sparkles className="w-3 h-3 text-[#c9a568]" />
            <span>Scent Quiz</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full border border-[#c9a568]/30 hover:border-[#c9a568] text-[#fbf7ee] hover:text-[#f0d8a4] transition-all"
            aria-label="View reserved selections"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c9a568] text-black font-semibold text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-[#f0d8a4] border border-white/10 rounded-lg hover:border-[#c9a568]"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden bg-[#0a0907] border-b border-[#c9a568]/20 px-8 py-6 flex flex-col gap-5 text-xs uppercase tracking-[0.22em] text-[#d6cdbd]">
          <a
            href="#home"
            onClick={() => setIsMobileOpen(false)}
            className="hover:text-[#f0d8a4] transition-colors py-2 border-b border-white/5"
          >
            Home
          </a>
          <a
            href="#collection"
            onClick={() => setIsMobileOpen(false)}
            className="hover:text-[#f0d8a4] transition-colors py-2 border-b border-white/5"
          >
            The Collection
          </a>
          <a
            href="#showcase"
            onClick={() => setIsMobileOpen(false)}
            className="hover:text-[#f0d8a4] transition-colors py-2 border-b border-white/5"
          >
            Fragrance Essence
          </a>
          <a
            href="#story"
            onClick={() => setIsMobileOpen(false)}
            className="hover:text-[#f0d8a4] transition-colors py-2 border-b border-white/5"
          >
            Our Philosophy
          </a>
          <a
            href="#craft"
            onClick={() => setIsMobileOpen(false)}
            className="hover:text-[#f0d8a4] transition-colors py-2 border-b border-white/5"
          >
            Artisanal Craft
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsMobileOpen(false)}
            className="hover:text-[#f0d8a4] transition-colors py-2 border-b border-white/5"
          >
            Reviews & Press
          </a>
          <a
            href="#contact"
            onClick={() => setIsMobileOpen(false)}
            className="hover:text-[#f0d8a4] transition-colors py-2 border-b border-white/5"
          >
            Private Concierge
          </a>
          <button
            onClick={() => {
              setIsMobileOpen(false);
              onOpenQuiz();
            }}
            className="flex items-center justify-center gap-2 py-3 mt-2 rounded-full border border-[#c9a568] text-[#f0d8a4] bg-[#c9a568]/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c9a568]" />
            Find Your Signature Scent
          </button>
        </div>
      )}
    </header>
  );
};
