import React, { useState } from 'react';
import { Fragrance } from '../types/fragrance';
import { X, Sparkles, SprayCan, Check, Shield, Clock, Wind, ArrowRight } from 'lucide-react';
import { playSpritzSound, playCrystalChime } from '../utils/audio';

interface ProductModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: string, price: string) => void;
  onViewIn3D: (id: Fragrance['id']) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
  onViewIn3D,
}) => {
  if (!fragrance) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // default 100ml
  const [spritzed, setSpritzed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const selectedSize = fragrance.sizes[selectedSizeIndex];

  const handleSpritz = () => {
    setSpritzed(true);
    playSpritzSound();
    setTimeout(() => setSpritzed(false), 2000);
  };

  const handleAdd = () => {
    onAddToCart(fragrance, selectedSize.size, selectedSize.priceLabel);
    playCrystalChime(700);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#14120f] to-[#0a0907] border border-[#c9a568]/40 rounded-3xl overflow-hidden shadow-2xl shadow-black my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/50 hover:bg-[#c9a568] text-[#e5dbcc] hover:text-black border border-white/20 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Showcase & Spritz Action */}
          <div className="md:col-span-5 relative bg-[#0b0a08] flex flex-col items-center justify-between p-8 border-b md:border-b-0 md:border-r border-white/10">
            <div className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest text-[#9e8f7a]">
              <span>Haute Parfumerie</span>
              <span>{fragrance.volume}</span>
            </div>

            {/* Product image representation */}
            <div className="relative my-6 w-full flex items-center justify-center">
              <div
                className="w-56 h-72 rounded-2xl overflow-hidden border border-[#c9a568]/30 shadow-2xl"
                style={{
                  boxShadow: `0 0 50px -15px ${fragrance.accentColor}44`,
                }}
              >
                <img
                  src="/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png"
                  alt={`ETHICS ${fragrance.name}`}
                  className={`w-full h-full object-cover ${
                    fragrance.id === 'noir' ? 'object-left' : fragrance.id === 'velvet' ? 'object-center' : 'object-right'
                  }`}
                />
              </div>

              {/* Spritz animation ring */}
              {spritzed && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-[#f0d8a4] animate-ping opacity-60" />
                </div>
              )}
            </div>

            {/* Interactive Actions under Image */}
            <div className="w-full flex flex-col gap-2.5">
              <button
                onClick={handleSpritz}
                className="w-full py-2.5 px-4 rounded-xl border border-[#c9a568]/40 bg-white/[0.04] hover:bg-[#c9a568]/15 text-[#f0d8a4] text-[11px] uppercase tracking-widest font-sans flex items-center justify-center gap-2 transition-all"
              >
                <SprayCan className="w-4 h-4 text-[#c9a568]" />
                <span>{spritzed ? 'Mist Spritzed (Web Audio)' : 'Test Scent Mist'}</span>
              </button>

              <button
                onClick={() => {
                  onViewIn3D(fragrance.id);
                  onClose();
                  const heroElem = document.getElementById('home');
                  heroElem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2 px-4 rounded-xl border border-white/10 hover:border-[#c9a568]/30 text-[#b6afa2] hover:text-white text-[10px] uppercase tracking-wider font-sans flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Rotate 3D Flacon on Stage</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c9a568]" />
              </button>
            </div>
          </div>

          {/* Right Column: Full Fragrance Narrative, Olfactory Pyramid & Purchasing */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c9a568] font-sans mb-1">
                  <span>{fragrance.category}</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl tracking-wide text-[#fbf7ee]">
                  {fragrance.name}
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#d9ccb9] mt-1">
                  {fragrance.tagline}
                </p>
              </div>

              {/* Story */}
              <p className="font-sans text-xs sm:text-sm text-[#b6afa2] leading-relaxed mb-8">
                {fragrance.fullStory}
              </p>

              {/* Olfactory Pyramid */}
              <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#c9a568] mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Olfactory Pyramid</span>
                </h4>

                <div className="space-y-3.5 text-xs font-sans">
                  <div className="flex items-start gap-3">
                    <span className="w-20 text-[10px] uppercase tracking-wider text-[#8b7e6c] pt-0.5">
                      Top Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {fragrance.notes.top.map((note) => (
                        <span key={note} className="px-2.5 py-0.5 bg-[#c9a568]/10 text-[#fbf7ee] rounded border border-[#c9a568]/20 text-[11px]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-20 text-[10px] uppercase tracking-wider text-[#8b7e6c] pt-0.5">
                      Heart Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {fragrance.notes.heart.map((note) => (
                        <span key={note} className="px-2.5 py-0.5 bg-white/5 text-[#fbf7ee] rounded border border-white/10 text-[11px]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-20 text-[10px] uppercase tracking-wider text-[#8b7e6c] pt-0.5">
                      Base Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {fragrance.notes.base.map((note) => (
                        <span key={note} className="px-2.5 py-0.5 bg-white/5 text-[#fbf7ee] rounded border border-white/10 text-[11px]">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sillage & Longevity Meters */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8e816f] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#c9a568]" />
                    <span>Longevity</span>
                  </div>
                  <span className="font-sans text-xs text-[#fbf7ee] font-medium">{fragrance.longevity}</span>
                </div>

                <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#8e816f] mb-1">
                    <Wind className="w-3.5 h-3.5 text-[#c9a568]" />
                    <span>Sillage</span>
                  </div>
                  <span className="font-sans text-xs text-[#fbf7ee] font-medium">{fragrance.sillage}</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <span className="block text-[10px] uppercase tracking-widest text-[#8b7e6c] mb-3 font-sans">
                  Select Flacon Edition
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {fragrance.sizes.map((s, idx) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedSizeIndex === idx
                          ? 'border-[#c9a568] bg-[#c9a568]/15 text-[#fbf7ee]'
                          : 'border-white/10 bg-white/[0.02] text-[#8e816f] hover:border-white/20'
                      }`}
                    >
                      <span className="block font-display text-xs tracking-wider">{s.size}</span>
                      <span className="block text-[11px] font-semibold text-[#f0d8a4] mt-0.5">{s.priceLabel}</span>
                      <span className="block text-[9px] text-[#baa891] mt-0.5">{s.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-widest text-[#857764]">Estimated Reservation</span>
                  <span className="font-display text-xl text-[#f0d8a4]">{selectedSize.priceLabel}</span>
                  <span className="block text-[9px] text-[#786c5c]">{selectedSize.size} • Includes complimentary 5ml discovery vial</span>
                </div>

                <button
                  onClick={handleAdd}
                  className="px-8 py-4 rounded-full bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#c9a568]/20 flex items-center gap-2"
                >
                  {addedNotice ? <Check className="w-4 h-4 text-black" /> : null}
                  <span>{addedNotice ? 'Reserved in Cart' : 'Reserve Flacon'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[9.5px] text-[#7e7261]">
                <Shield className="w-3.5 h-3.5 text-[#c9a568]" />
                <span>Boutique guarantee: Compliant with standard luxury concierge reservations. Non-binding until confirmed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
