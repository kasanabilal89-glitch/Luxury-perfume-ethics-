import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { FragranceId } from '../types/fragrance';
import { ThreeBottleCanvas } from './ThreeBottleCanvas';

interface HeroSectionProps {
  currentFragranceId: FragranceId;
  onSelectFragrance: (id: FragranceId) => void;
  onExploreCollection: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentFragranceId,
  onSelectFragrance,
  onExploreCollection,
  onOpenQuiz,
}) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Cinematic Ambient Background Gradients */}
      <div className="absolute inset-0 bg-radial-gradient from-[#22180d]/40 via-[#0a0907]/90 to-[#070706] -z-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#c9a568]/5 rounded-full blur-[140px] pointer-events-none -z-20 animate-pulse" />

      {/* Subtle fine geometric grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Brand Typography & Call to Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 pt-4 lg:pt-0">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c9a568]/30 bg-[#c9a568]/5 w-fit mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a568]" />
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#f0d8a4]">
              MORE THAN A FRAGRANCE
            </span>
          </div>

          {/* Master Title */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-[0.06em] text-[#fbf7ee] leading-[0.92] mb-6">
            ETH<span className="gold-gradient-text">I</span>CS
          </h1>

          {/* Luxury Tagline */}
          <p className="font-serif italic text-2xl sm:text-3xl text-[#e8dac1] font-normal tracking-wide mb-6">
            “Pure Essence. Timeless Elegance.”
          </p>

          {/* Editorial Paragraph */}
          <p className="font-sans text-sm sm:text-base text-[#b6afa2] font-light leading-relaxed max-w-lg mb-9">
            An olfactory dialogue between rare botanicals, aged agarwood, and bespoke crystal flacons. Designed to awaken memory and leave an indelible royal aura.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreCollection}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#c9a568]/15 hover:shadow-[#c9a568]/30 hover:scale-[1.02]"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[#c9a568]/30 hover:border-[#c9a568] bg-white/[0.03] hover:bg-white/[0.08] text-[#f0d8a4] text-xs uppercase tracking-[0.18em] transition-all"
            >
              <Compass className="w-4 h-4 text-[#c9a568]" />
              <span>Scent Matchmaker</span>
            </button>
          </div>

          {/* Quick Specs / Features micro-strip */}
          <div className="grid grid-cols-3 gap-4 pt-12 mt-12 border-t border-white/10 max-w-lg">
            <div>
              <span className="block font-display text-sm tracking-wider text-[#f0d8a4]">Extrait 28-32%</span>
              <span className="text-[10px] text-[#918776] uppercase tracking-wider">Concentration</span>
            </div>
            <div>
              <span className="block font-display text-sm tracking-wider text-[#f0d8a4]">180+ Days</span>
              <span className="text-[10px] text-[#918776] uppercase tracking-wider">Cold Macerated</span>
            </div>
            <div>
              <span className="block font-display text-sm tracking-wider text-[#f0d8a4]">French Crystal</span>
              <span className="text-[10px] text-[#918776] uppercase tracking-wider">Hand-Polished</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Perfume Bottle Canvas */}
        <div className="lg:col-span-6 h-[480px] sm:h-[580px] lg:h-[660px] relative order-1 lg:order-2 flex items-center justify-center">
          {/* Subtle gold ring / halo decorative orbit */}
          <div className="absolute w-[340px] sm:w-[440px] aspect-square rounded-full border border-[#c9a568]/20 pointer-events-none -z-10 animate-spin" style={{ animationDuration: '45s' }}>
            <div className="w-3 h-3 rounded-full bg-[#c9a568] absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-lg shadow-[#c9a568]" />
          </div>

          <ThreeBottleCanvas
            currentFragranceId={currentFragranceId}
            onSelectFragrance={onSelectFragrance}
            className="w-full h-full"
            showControls={true}
          />
        </div>
      </div>

      {/* Scroll indicator with subtle bouncing animation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#baa891] font-sans">
          Scroll To Unveil
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#c9a568] animate-bounce" />
      </div>
    </section>
  );
};
