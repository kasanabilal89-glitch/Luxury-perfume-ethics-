import React, { useState } from 'react';
import { BRAND_VALUES } from '../data/fragrances';
import { ArrowUpRight, Sparkles, Feather, Shield, Droplets, Gem } from 'lucide-react';

interface BrandStorySectionProps {
  onExploreCollection: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onExploreCollection }) => {
  const [activeTab, setActiveTab] = useState<'craft' | 'notes' | 'flacon' | 'philosophy'>('craft');

  return (
    <section id="story" className="py-28 relative bg-[#070706] overflow-hidden">
      {/* Decorative fine borders and background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c9a568]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial Top Grid: Imagery + High Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          {/* Left: Atmospheric Still Life Photo with Gold Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#c9a568]/30 shadow-2xl p-2 bg-gradient-to-tr from-[#17130e] to-[#0a0907]">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85"
                  alt="ETHICS Haute Parfumerie Craftsmanship"
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Floating Quote Stamp */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/70 backdrop-blur-md border border-[#c9a568]/30">
                  <p className="font-serif italic text-sm text-[#f0d8a4]">
                    “A fragrance is invisible, yet it creates an entire sanctuary around the soul.”
                  </p>
                  <span className="block text-[9px] uppercase tracking-widest text-[#9e8f7a] mt-2 font-sans">
                    — Master Parfumeur, Grasse
                  </span>
                </div>
              </div>
            </div>

            {/* Accent gold badge */}
            <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0e0c0a] border border-[#c9a568] shadow-2xl">
              <span className="text-2xl font-serif text-[#c9a568]">180</span>
              <span className="text-[9px] uppercase tracking-widest text-[#dcd1be] leading-tight font-sans">
                Days Cold<br />Maceration
              </span>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#c9a568] font-sans mb-4">
              <Sparkles className="w-3 h-3" />
              <span>THE ART OF PERFUMERY</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-[#fbf7ee] leading-[1.05] mb-6">
              MORE THAN A <br />
              <span className="gold-gradient-text">FRAGRANCE</span>
            </h2>

            <p className="font-serif italic text-xl sm:text-2xl text-[#dcd0be] mb-6">
              “At ETHICS, we believe fragrance is not just a scent — it is a memory, an armor, and an intimate signature.”
            </p>

            <p className="font-sans text-sm text-[#a89d8b] leading-relaxed mb-6">
              Born from a refusal to compromise, ETHICS was founded to revive the lost grandeur of classical perfumery. We eschew synthetic accelerants and industrial shortcuts in favor of patience, pure botanical resins, and the sacred science of distillation.
            </p>

            <p className="font-sans text-sm text-[#a89d8b] leading-relaxed mb-8">
              Every drop that touches your skin has matured in dark glass vessels for months, allowing hundreds of delicate olfactory compounds to weave into a seamless, ever-evolving presence.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-medium text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#c9a568]/15"
              >
                <span>Discover The Trilogy</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* The 3 Pillars of ETHICS Craftsmanship */}
        <div id="craft" className="pt-10 pb-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a568] font-sans">
              MADE WITH UNWAVERING INTENTION
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#fbf7ee] tracking-wide mt-2">
              THE <span className="gold-gradient-text">ETHICS</span> STANDARD
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BRAND_VALUES.map((val) => (
              <div
                key={val.number}
                className="relative p-8 rounded-2xl bg-gradient-to-b from-[#14110d] to-[#0a0907] border border-[#3b3021]/60 hover:border-[#c9a568] transition-all duration-300 group hover:-translate-y-1.5"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-display text-4xl text-[#c9a568]/50 group-hover:text-[#c9a568] transition-colors">
                    {val.number}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#c9a568]">
                    {val.number === '01' ? (
                      <Droplets className="w-4 h-4" />
                    ) : val.number === '02' ? (
                      <Gem className="w-4 h-4" />
                    ) : (
                      <Feather className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <h4 className="font-display text-xl text-[#fbf7ee] tracking-wider mb-2">
                  {val.title}
                </h4>

                <span className="block text-[9px] uppercase tracking-[0.22em] text-[#c9a568] font-sans mb-4">
                  {val.subtitle}
                </span>

                <p className="font-sans text-xs sm:text-sm text-[#9c907e] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Pillars: Craftsmanship, Fragrance Notes, Packaging, Philosophy */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#0e0c09] border border-[#c9a568]/20">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6 mb-8">
            <button
              onClick={() => setActiveTab('craft')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-sans transition-all ${
                activeTab === 'craft'
                  ? 'bg-[#c9a568] text-black font-semibold'
                  : 'text-[#baa891] hover:text-white bg-white/5'
              }`}
            >
              Artisanal Distillation
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-sans transition-all ${
                activeTab === 'notes'
                  ? 'bg-[#c9a568] text-black font-semibold'
                  : 'text-[#baa891] hover:text-white bg-white/5'
              }`}
            >
              Rare Botanical Notes
            </button>
            <button
              onClick={() => setActiveTab('flacon')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-sans transition-all ${
                activeTab === 'flacon'
                  ? 'bg-[#c9a568] text-black font-semibold'
                  : 'text-[#baa891] hover:text-white bg-white/5'
              }`}
            >
              Heirloom French Flacon
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-sans transition-all ${
                activeTab === 'philosophy'
                  ? 'bg-[#c9a568] text-black font-semibold'
                  : 'text-[#baa891] hover:text-white bg-white/5'
              }`}
            >
              The Brand Philosophy
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {activeTab === 'craft' && (
              <>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#fbf7ee] tracking-wide mb-3">
                    Cold Fractional Distillation & 6-Month Maceration
                  </h4>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed mb-4">
                    In our Grasse atelier, heat is an enemy. We utilize low-temperature fractional distillation to safeguard fragile floral top notes that conventional industrial steaming destroys.
                  </p>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed">
                    Once combined, each batch rests in temperature-controlled dark vaults for 180 days. This slow maturation enables the precious agarwood, amber, and florals to cross-pollinate into an undivided harmony.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/40 border border-[#c9a568]/20 space-y-3 font-sans text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Maceration Duration</span>
                    <span className="text-[#f0d8a4] font-medium">180 – 220 Days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Distillation Temperature</span>
                    <span className="text-[#f0d8a4] font-medium">&lt; 38°C Cold Fraction</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Alcohol Base</span>
                    <span className="text-[#f0d8a4] font-medium">100% Organic French Beetroot Spirit</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8e816f]">Filtration</span>
                    <span className="text-[#f0d8a4] font-medium">Non-Chill Triple Silk Filtered</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'notes' && (
              <>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#fbf7ee] tracking-wide mb-3">
                    Ethical Foraging & Single-Estate Harvests
                  </h4>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed mb-4">
                    Our aged wild agarwood comes exclusively from sustainably certified family plantations in Assam where mature trees are harvested with zero habitat disruption.
                  </p>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed">
                    Our Damask roses are gathered before sunrise in Isparta, Turkey, capturing the delicate nectar when volatile monoterpenes are at their peak molecular density.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/40 border border-[#c9a568]/20 space-y-3 font-sans text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Assam Agarwood</span>
                    <span className="text-[#f0d8a4] font-medium">20-Year Naturally Resin-Aged</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Isparta Damask Rose</span>
                    <span className="text-[#f0d8a4] font-medium">Dawn Hand-Picked Absolute</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Calabrian Bergamot</span>
                    <span className="text-[#f0d8a4] font-medium">First-Cold-Press Artisan Peel</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8e816f]">Khorasan Saffron</span>
                    <span className="text-[#f0d8a4] font-medium">Super Negin Grade Stigmas</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'flacon' && (
              <>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#fbf7ee] tracking-wide mb-3">
                    Heavy French Crystal & Magnetic Gold Crown
                  </h4>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed mb-4">
                    The ETHICS flacon weighs over 450 grams in hand. Cast in ultra-dense French optical crystal with hand-beveled chamfers, it acts as a private prism for the amber and rose liquids within.
                  </p>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed">
                    Each cap features a precision magnetic locking mechanism that secures with an acoustically tuned, satisfying click, sealing the high-pressure fine mist atomiser.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/40 border border-[#c9a568]/20 space-y-3 font-sans text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Glass Composition</span>
                    <span className="text-[#f0d8a4] font-medium">French Optical Soda-Lime Crystal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Flacon Net Weight</span>
                    <span className="text-[#f0d8a4] font-medium">480 Grams (Substantial Presence)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Cap Closure</span>
                    <span className="text-[#f0d8a4] font-medium">Acoustic Neodymium Magnetic Lock</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8e816f]">Atomizer Micron Size</span>
                    <span className="text-[#f0d8a4] font-medium">45-Micron Micro-Aerosol Cloud</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'philosophy' && (
              <>
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-[#fbf7ee] tracking-wide mb-3">
                    Pure Essence. Timeless Elegance.
                  </h4>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed mb-4">
                    ETHICS rejects fleeting trends. We believe true elegance does not demand attention; it quietly commands it. Scent is the most primal of all senses, directly wired to memory and emotional resonance.
                  </p>
                  <p className="font-sans text-sm text-[#a59986] leading-relaxed">
                    When you wear ETHICS, you don’t wear a label — you project an atmosphere of discernment, poise, and sovereign confidence.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-black/40 border border-[#c9a568]/20 space-y-3 font-sans text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Cruelty Free</span>
                    <span className="text-[#f0d8a4] font-medium">100% Leaping Bunny Certified</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Packaging Sustainability</span>
                    <span className="text-[#f0d8a4] font-medium">FSC-Certified Black Velvet Board</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#8e816f]">Formulation Purity</span>
                    <span className="text-[#f0d8a4] font-medium">No Phthalates • No BHT • Clean Extrait</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8e816f]">Batch Numbering</span>
                    <span className="text-[#f0d8a4] font-medium">Limited To 800 Bottles Per Vintage</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
