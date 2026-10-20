import React, { useState } from 'react';
import { SAMPLE_TESTIMONIALS } from '../data/fragrances';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? SAMPLE_TESTIMONIALS.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === SAMPLE_TESTIMONIALS.length - 1 ? 0 : c + 1));
  };

  const t = SAMPLE_TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-28 relative bg-[#070706] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Sample Content Disclosure Banner (Explicit requirement) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9.5px] uppercase font-sans tracking-widest text-[#9c8e7c] mb-6">
          <CheckCircle2 className="w-3 h-3 text-[#c9a568]" />
          <span>Curated Reviews & Press (Sample Connoisseur Content)</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#fbf7ee] tracking-wide mb-12">
          WORDS OF <span className="gold-gradient-text">DISTINCTION</span>
        </h2>

        {/* Carousel Card */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#13100c] to-[#0a0807] border border-[#c9a568]/30 shadow-2xl">
          <div className="w-12 h-12 rounded-full border border-[#c9a568]/40 flex items-center justify-center text-[#c9a568] mx-auto mb-6 bg-[#c9a568]/10">
            <Quote className="w-5 h-5" />
          </div>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-8">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#c9a568] text-[#c9a568]" />
            ))}
          </div>

          {/* Main Quote */}
          <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#eae0d1] leading-snug max-w-3xl mx-auto mb-8 min-h-[120px] flex items-center justify-center">
            {t.quote}
          </blockquote>

          {/* Author Details */}
          <div className="border-t border-white/10 pt-6 max-w-xs mx-auto">
            <span className="block font-display text-base tracking-wider text-[#fbf7ee]">
              {t.author}
            </span>
            <span className="block text-xs text-[#c9a568] font-sans tracking-wide mt-0.5">
              {t.title}
            </span>
            <span className="block text-[10px] text-[#857968] font-sans uppercase tracking-widest mt-1">
              {t.publicationOrCity} • Reviewed {t.featuredFragrance}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-white/10 hover:border-[#c9a568] text-[#baa891] hover:text-white transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {SAMPLE_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === i ? 'w-8 bg-[#c9a568]' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-white/10 hover:border-[#c9a568] text-[#baa891] hover:text-white transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
