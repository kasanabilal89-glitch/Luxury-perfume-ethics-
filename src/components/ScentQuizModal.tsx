import React, { useState } from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { Fragrance, FragranceId } from '../types/fragrance';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { playCrystalChime } from '../utils/audio';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (fragrance: Fragrance) => void;
  onViewIn3D: (id: FragranceId) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  onViewIn3D,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    occasion: '',
    profile: '',
    aura: '',
  });

  const questions = [
    {
      title: 'When will you wear your signature scent?',
      key: 'occasion',
      options: [
        { label: 'Moonlit Evenings & Nighttime Intrigue', target: 'noir' },
        { label: 'Intimate Days & Romantic Sunsets', target: 'velvet' },
        { label: 'Royal Ceremonies & Grand Galas', target: 'oud' },
      ],
    },
    {
      title: 'Which olfactory accord speaks to your character?',
      key: 'profile',
      options: [
        { label: 'Smoky Tuscan Leather, Amber & Bergamot', target: 'noir' },
        { label: 'Dewy Damask Rose, Bourbon Vanilla & Silk Musk', target: 'velvet' },
        { label: 'Aged Wild Agarwood, Persian Saffron & Patchouli', target: 'oud' },
      ],
    },
    {
      title: 'What aura do you wish to project into the room?',
      key: 'aura',
      options: [
        { label: 'Quiet Magnetic Confidence', target: 'noir' },
        { label: 'Soft Luminous Grace', target: 'velvet' },
        { label: 'Commanding Sovereign Distinction', target: 'oud' },
      ],
    },
  ];

  const handleSelectOption = (key: string, targetId: string) => {
    setAnswers((prev) => ({ ...prev, [key]: targetId }));
    playCrystalChime(450 + step * 100);

    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Result step
    }
  };

  // Calculate winner based on majority target
  const getWinner = (): Fragrance => {
    const counts: Record<string, number> = { noir: 0, velvet: 0, oud: 0 };
    Object.values(answers).forEach((val) => {
      if (counts[val] !== undefined) counts[val]++;
    });

    let maxKey: FragranceId = 'noir';
    let maxCount = -1;
    (Object.keys(counts) as FragranceId[]).forEach((k) => {
      if (counts[k] > maxCount) {
        maxCount = counts[k];
        maxKey = k;
      }
    });

    return FRAGRANCES.find((f) => f.id === maxKey) || FRAGRANCES[0];
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ occasion: '', profile: '', aura: '' });
  };

  const winner = getWinner();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-[#14120e] to-[#090807] border border-[#c9a568]/40 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-[#c9a568] text-[#e5dbcc] hover:text-black border border-white/10 transition-all"
          aria-label="Close scent quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {step <= 3 ? (
          <div>
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#c9a568]">
                Bespoke Scent Consultation
              </span>
              <span className="text-xs font-display text-[#baa891]">Step 0{step} / 03</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-[#c9a568] transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {/* Question */}
            <h3 className="font-display text-2xl sm:text-3xl text-[#fbf7ee] tracking-wide mb-8">
              {questions[step - 1].title}
            </h3>

            {/* Options */}
            <div className="space-y-3.5 mb-8">
              {questions[step - 1].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption(questions[step - 1].key, opt.target)}
                  className="w-full p-4 rounded-xl border border-white/10 hover:border-[#c9a568] bg-white/[0.02] hover:bg-[#c9a568]/10 text-left font-sans text-xs sm:text-sm text-[#e0d6c5] hover:text-white transition-all flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#c9a568] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            <div className="text-center text-[10px] text-[#7d705f] uppercase tracking-widest font-sans">
              Handcrafted in Grasse, France
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c9a568]/40 bg-[#c9a568]/10 text-[10px] uppercase font-sans tracking-widest text-[#f0d8a4] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a568]" />
              <span>Your Olfactory Signature Match</span>
            </div>

            <h3 className="font-display text-4xl text-[#fbf7ee] tracking-wide mb-2">
              ETHICS <span className="gold-gradient-text">{winner.name}</span>
            </h3>

            <p className="font-serif italic text-lg text-[#ded3c2] mb-6">
              “{winner.tagline}”
            </p>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left mb-6">
              <p className="font-sans text-xs text-[#b6afa2] leading-relaxed mb-4">
                {winner.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {winner.notes.top.slice(0, 1).concat(winner.notes.heart.slice(0, 1), winner.notes.base.slice(0, 2)).map((n) => (
                  <span key={n} className="px-2.5 py-1 text-[10px] bg-[#c9a568]/15 border border-[#c9a568]/20 text-[#fbf7ee] rounded-md font-sans">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => {
                  onSelectResult(winner);
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-semibold text-xs uppercase tracking-widest transition-all"
              >
                View Full Details
              </button>

              <button
                onClick={() => {
                  onViewIn3D(winner.id);
                  onClose();
                  const heroElem = document.getElementById('home');
                  heroElem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-4 rounded-xl border border-white/20 hover:border-[#c9a568] text-[#fbf7ee] text-xs uppercase tracking-widest font-sans transition-all"
              >
                Inspect in 3D
              </button>
            </div>

            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#938573] hover:text-[#c9a568] uppercase tracking-wider font-sans"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Consultation</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
