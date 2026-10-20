import React, { useState } from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { FragranceId } from '../types/fragrance';
import { Play, Sparkles, Volume2, Compass, ArrowRight } from 'lucide-react';
import { playCrystalChime, toggleLuxuryAtmosphere } from '../utils/audio';

interface SignatureShowcaseProps {
  onSelectFragrance: (id: FragranceId) => void;
  onOpenDetails: (id: FragranceId) => void;
}

export const SignatureShowcase: React.FC<SignatureShowcaseProps> = ({
  onSelectFragrance,
  onOpenDetails,
}) => {
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isAtmosphereOn, setIsAtmosphereOn] = useState(false);

  const moods = [
    {
      moodTitle: 'Twilight Elegance',
      fragranceId: 'noir' as FragranceId,
      quote: '“For evenings when mystery is the ultimate sophistication.”',
      time: '21:00 — Midnight',
      scentSignature: 'Smoked Amber & Italian Bergamot',
    },
    {
      moodTitle: 'Dawn Serenity',
      fragranceId: 'velvet' as FragranceId,
      quote: '“Whispered intimacy and morning dew on velvet petals.”',
      time: '07:00 — Golden Hour',
      scentSignature: 'Damask Rose & Bourbon Vanilla',
    },
    {
      moodTitle: 'Royal Ceremony',
      fragranceId: 'oud' as FragranceId,
      quote: '“Commanding presence rooted in ancient agarwood heritage.”',
      time: 'Formal Gala & Celebrations',
      scentSignature: 'Assam Wild Oud & Persian Saffron',
    },
  ];

  const currentMood = moods[activeMoodIndex];
  const currentFragrance = FRAGRANCES.find((f) => f.id === currentMood.fragranceId) || FRAGRANCES[0];

  const handleAtmosphere = () => {
    toggleLuxuryAtmosphere((playing) => {
      setIsAtmosphereOn(playing);
    });
  };

  return (
    <section id="showcase" className="py-28 relative bg-gradient-to-b from-[#090807] via-[#110e0b] to-[#070706] overflow-hidden">
      {/* Dynamic warm gold spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${currentFragrance.accentColor}25 0%, rgba(201, 165, 104, 0.08) 50%, transparent 75%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Glass Vitrine & Atmospheric Visual */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* The Floating Vitrine Box */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-[#c9a568]/40 via-white/5 to-[#c9a568]/20 shadow-2xl overflow-hidden backdrop-blur-xl">
              <div className="w-full h-full rounded-[22px] bg-[#0c0a08]/90 overflow-hidden relative flex flex-col items-center justify-center p-8">
                {/* Background visual artwork */}
                <img
                  src="/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png"
                  alt="ETHICS Signature Vitrine"
                  className={`absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 ${
                    currentMood.fragranceId === 'noir'
                      ? 'object-left'
                      : currentMood.fragranceId === 'velvet'
                      ? 'object-center'
                      : 'object-right'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/40 to-transparent" />

                {/* Floating Glass Spec Plaque */}
                <div className="relative z-10 text-center mt-auto mb-4 bg-black/60 backdrop-blur-md border border-[#c9a568]/30 px-6 py-4 rounded-2xl w-full">
                  <span className="block text-[9px] uppercase tracking-[0.25em] text-[#c9a568] font-sans">
                    {currentMood.time}
                  </span>
                  <h4 className="font-display text-2xl text-[#fbf7ee] tracking-wider mt-1">
                    {currentFragrance.name}
                  </h4>
                  <p className="font-serif italic text-xs text-[#ded1bc] mt-0.5">
                    {currentMood.scentSignature}
                  </p>
                </div>

                {/* Vitrine Corner Hardware */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#c9a568]/60" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#c9a568]/60" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#c9a568]/60" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#c9a568]/60" />
              </div>
            </div>

            {/* Atmosphere & Film CTA */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[#c9a568]/40 bg-white/[0.03] hover:bg-[#c9a568]/15 text-[#f0d8a4] text-xs uppercase tracking-widest transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-[#c9a568] text-[#c9a568]" />
                <span>Watch Brand Film</span>
              </button>

              <button
                onClick={handleAtmosphere}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs uppercase tracking-widest transition-all ${
                  isAtmosphereOn
                    ? 'border-[#c9a568] bg-[#c9a568]/20 text-[#f0d8a4]'
                    : 'border-white/10 text-[#a39682] hover:text-white hover:border-[#c9a568]/40'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-[#c9a568]" />
                <span>{isAtmosphereOn ? 'Soundscape Active' : 'Sound Atmosphere'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mood Selector & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#c9a568] font-sans mb-3">
              <Sparkles className="w-3 h-3" />
              <span>A FRAGRANCE FOR EVERY MOOD</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-[#fbf7ee] leading-[1.05] mb-6">
              THE ESSENCE <br />
              <span className="gold-gradient-text">OF LUXURY</span>
            </h2>

            <p className="font-serif italic text-xl text-[#e5dbcc] mb-6">
              {currentMood.quote}
            </p>

            <p className="font-sans text-sm text-[#a89d8b] leading-relaxed mb-8">
              From the rarest cold-pressed citrus blossoms to hand-aged wild agarwood, ETHICS crafts bespoke olfactive portraits. Every bottle is an invitation to inhabit a distinct state of grace.
            </p>

            {/* Interactive Mood Tabs */}
            <div className="space-y-3 mb-9">
              {moods.map((m, idx) => (
                <button
                  key={m.moodTitle}
                  onClick={() => {
                    setActiveMoodIndex(idx);
                    onSelectFragrance(m.fragranceId);
                    playCrystalChime(500 + idx * 80);
                  }}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between ${
                    activeMoodIndex === idx
                      ? 'border-[#c9a568] bg-[#c9a568]/10 text-white shadow-lg'
                      : 'border-white/10 bg-white/[0.02] text-[#8e816f] hover:border-white/20 hover:text-[#d4c7b5]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-xs text-[#c9a568] font-semibold">0{idx + 1}</span>
                    <div>
                      <span className="block font-display text-base tracking-wider text-[#fbf7ee]">
                        {m.moodTitle}
                      </span>
                      <span className="block text-[11px] text-[#9a8c79] font-sans mt-0.5">
                        {m.scentSignature}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-[#c9a568] font-sans">
                    Select ↗
                  </span>
                </button>
              ))}
            </div>

            {/* Explore This Fragrance CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenDetails(currentMood.fragranceId)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all"
              >
                <span>Explore {currentFragrance.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Film Modal */}
      {showVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#0e0c09] border border-[#c9a568]/40 rounded-3xl p-8 overflow-hidden shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full border border-[#c9a568] flex items-center justify-center mx-auto mb-6 text-[#c9a568] bg-[#c9a568]/10 animate-pulse">
              <Play className="w-7 h-7 fill-[#c9a568]" />
            </div>

            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#c9a568]">
              Cinematic Olfactory Journey
            </span>
            <h3 className="font-display text-3xl text-[#fbf7ee] tracking-wide mt-2 mb-4">
              ETHICS: The Genesis of Scent
            </h3>
            <p className="font-serif italic text-base text-[#ded2be] max-w-xl mx-auto mb-6">
              “Filmed across the high rose valleys of Isparta, the historic distilleries of Grasse, and the ancient agarwood forests of Assam.”
            </p>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black flex items-center justify-center">
              <img
                src="/assets/aistudio/file_00000000d4c0821182ca698d5b51b219_19bb7df2.png"
                alt="Cinematic Preview"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6">
                <span className="font-display text-xl text-[#f0d8a4] tracking-widest uppercase">
                  Pure Essence. Timeless Elegance.
                </span>
                <span className="text-xs text-[#baa891] mt-2">
                  Atmospheric Masterclass & Maceration Archive
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowVideoModal(false)}
              className="px-6 py-2.5 rounded-full border border-white/20 text-[#baa891] hover:text-white hover:border-[#c9a568] text-xs uppercase tracking-widest"
            >
              Close Experience
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
