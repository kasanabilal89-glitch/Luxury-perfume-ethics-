import React from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { Fragrance, FragranceId } from '../types/fragrance';
import { ArrowUpRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { playCrystalChime } from '../utils/audio';

interface CollectionSectionProps {
  onOpenDetails: (fragrance: Fragrance) => void;
  onSelectFor3D: (id: FragranceId) => void;
  onAddToCart: (fragrance: Fragrance, size: string, price: string) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onOpenDetails,
  onSelectFor3D,
  onAddToCart,
}) => {
  return (
    <section id="collection" className="py-28 relative bg-[#090807] overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c9a568]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#8a404f]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c9a568]/25 bg-[#c9a568]/5 mb-4">
            <Sparkles className="w-3 h-3 text-[#c9a568]" />
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#f0d8a4]">
              HAUTE PARFUMERIE TRILOGY
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-[#fbf7ee] mb-5">
            OUR <span className="gold-gradient-text">COLLECTION</span>
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-[#d4c8b6] mb-3">
            “Crafted for those who value true luxury.”
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#9f9482] leading-relaxed">
            Three distinct olfactive masterpieces. Slow-macerated in Grasse, poured in heavy hand-cut crystal flacons, and formulated at Extrait de Parfum strength.
          </p>
        </div>

        {/* 3-Card Grid for NOIR, VELVET, and OUD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {FRAGRANCES.map((item, index) => {
            // Compute image styling to focus on each corresponding bottle from user's attached triptych asset
            const cropPosition = index === 0 ? 'object-left' : index === 1 ? 'object-center' : 'object-right';

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between bg-gradient-to-b from-[#14120e] to-[#090807] border border-[#3d3224]/50 hover:border-[#c9a568] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#c9a568]/15"
              >
                {/* Visual Art Container */}
                <div className="relative h-[380px] w-full overflow-hidden bg-[#0d0b09]">
                  {/* High resolution product photo from user asset */}
                  <img
                    src="/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png"
                    alt={`ETHICS ${item.name} Luxury Perfume Flacon`}
                    className={`w-full h-full object-cover ${cropPosition} transition-transform duration-700 group-hover:scale-105`}
                    loading="lazy"
                  />

                  {/* Gradient vignetting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badge: Concentration */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest bg-black/70 backdrop-blur-md border border-[#c9a568]/40 text-[#f0d8a4] rounded-full">
                      {item.concentration.split(' ')[0]} {item.concentration.split(' ')[1]}
                    </span>
                  </div>

                  {/* Quick 3D Switch Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFor3D(item.id);
                      playCrystalChime(500);
                      // Scroll smoothly to hero 3D viewport
                      const heroElem = document.getElementById('home');
                      heroElem?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="absolute top-4 right-4 z-10 px-3 py-1 text-[9px] uppercase tracking-widest bg-black/70 hover:bg-[#c9a568] text-[#e5dbcc] hover:text-black border border-white/20 hover:border-[#c9a568] rounded-full backdrop-blur-md transition-all flex items-center gap-1.5"
                    title="View this bottle in interactive 3D hero"
                  >
                    <Layers className="w-3 h-3" />
                    <span>View 3D</span>
                  </button>

                  {/* Mood Tag at bottom of image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[10px] text-[#baa891] tracking-wider uppercase font-sans">
                    <span>{item.volume}</span>
                    <span className="italic font-serif normal-case text-[#f0d8a4]">{item.mood.split(',')[0]}</span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Fragrance Name & Subtitle */}
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-display text-3xl tracking-wider text-[#fbf7ee] group-hover:text-[#f0d8a4] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[10px] text-[#8e816f] uppercase tracking-widest font-sans">
                        No. 0{index + 1}
                      </span>
                    </div>

                    <p className="font-serif italic text-sm text-[#c9a568] mb-3">
                      {item.tagline}
                    </p>

                    <p className="font-sans text-xs text-[#a39683] leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Olfactory Notes Chips */}
                    <div className="mb-6">
                      <div className="text-[9.5px] uppercase tracking-[0.2em] text-[#857764] mb-2 font-sans flex items-center gap-1.5">
                        <span>Fragrance Notes</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.notes.top.slice(0, 1).concat(item.notes.heart.slice(0, 1), item.notes.base.slice(0, 2)).map((note) => (
                          <span
                            key={note}
                            className="px-2.5 py-1 text-[10px] bg-white/[0.04] border border-[#c9a568]/15 text-[#e2d8c7] rounded-md font-sans tracking-wide"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Field & Actions */}
                  <div className="pt-5 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="block text-[9px] uppercase tracking-widest text-[#7a6f5e]">Boutique Price</span>
                        <span className="font-sans text-xs font-semibold text-[#f0d8a4]">
                          {item.pricePlaceholder}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => onOpenDetails(item)}
                        className="w-full py-3 px-3 text-[10px] uppercase font-sans tracking-[0.16em] text-[#fbf7ee] hover:text-[#c9a568] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#c9a568]/40 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#c9a568]" />
                      </button>

                      <button
                        onClick={() => {
                          onAddToCart(item, item.sizes[1].size, item.sizes[1].priceLabel);
                          playCrystalChime(600);
                        }}
                        className="w-full py-3 px-3 text-[10px] uppercase font-sans tracking-[0.16em] text-black font-semibold bg-[#c9a568] hover:bg-[#d6a855] rounded-xl transition-all shadow-md shadow-[#c9a568]/10 flex items-center justify-center gap-1"
                      >
                        <span>Reserve</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complimentary Discovery Vial Guarantee */}
        <div className="mt-16 p-6 rounded-2xl border border-[#c9a568]/20 bg-gradient-to-r from-[#14120f] via-[#1a1712] to-[#14120f] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#c9a568]/40 flex items-center justify-center text-[#c9a568] bg-[#c9a568]/10 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-sm tracking-wider text-[#f0d8a4] uppercase">
                The ETHICS Olfactory Assurance
              </h4>
              <p className="font-sans text-xs text-[#a99d8b] max-w-xl">
                Every full-size flacon includes a complimentary 5ml discovery atomizer. Experience the fragrance on your skin first; if it does not resonate with you, the unopened 100ml flacon may be exchanged.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full border border-[#c9a568]/40 text-[#f0d8a4] hover:bg-[#c9a568]/10 text-xs uppercase tracking-widest whitespace-nowrap"
          >
            Inquire With Concierge
          </a>
        </div>
      </div>
    </section>
  );
};
