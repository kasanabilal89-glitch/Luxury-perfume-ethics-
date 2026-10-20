import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { playCrystalChime } from '../utils/audio';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState('all');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus({ type: 'error', message: 'Please enter a valid luxury email address.' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preference }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'You are now entered into the private ETHICS Circle registry.',
        });
        setEmail('');
        playCrystalChime(750);
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Could not process subscription. Please check your address.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network connection unavailable. Please check your connectivity.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-24 relative bg-gradient-to-b from-[#070706] via-[#100d0a] to-[#070706] border-t border-b border-[#322719]">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.3em] text-[#c9a568] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN THE ETHICS FAMILY</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#fbf7ee] tracking-wide mb-4">
          ENTER THE <span className="gold-gradient-text">INNER CIRCLE</span>
        </h2>

        <p className="font-serif italic text-base sm:text-lg text-[#d8cbba] max-w-xl mx-auto mb-8">
          “Be the first to know about private vintage releases, olfactory journals, and bespoke private invitations.”
        </p>

        {/* Preference Selector */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Launches' },
            { id: 'noir', label: 'NOIR Nocturnal Editions' },
            { id: 'velvet', label: 'VELVET Florals' },
            { id: 'oud', label: 'OUD Sovereign Reserves' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPreference(p.id)}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-sans transition-all ${
                preference === p.id
                  ? 'bg-[#c9a568]/20 border border-[#c9a568] text-[#f0d8a4]'
                  : 'bg-white/[0.02] border border-white/10 text-[#857764] hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Form connected to real /api/newsletter */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="relative flex items-center border-b border-[#c9a568]/60 focus-within:border-[#c9a568] pb-1 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your private email address"
              aria-label="Your private email address"
              required
              disabled={loading}
              className="w-full bg-transparent border-0 outline-none px-2 py-3 text-sm text-[#fbf7ee] placeholder-[#7d705f] font-sans"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-semibold text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          {/* Real feedback states */}
          {status.type === 'success' && (
            <div className="flex items-center justify-center gap-2 text-xs text-[#c9a568] mt-4 font-sans animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#c9a568]" />
              <span>{status.message}</span>
            </div>
          )}

          {status.type === 'error' && (
            <div className="flex items-center justify-center gap-2 text-xs text-rose-300 mt-4 font-sans animate-in fade-in">
              <AlertCircle className="w-4 h-4" />
              <span>{status.message}</span>
            </div>
          )}
        </form>

        <span className="block text-[9px] uppercase tracking-widest text-[#695d4e] mt-6 font-sans">
          Strict confidentiality • Zero spam • Unsubscribe with one click
        </span>
      </div>
    </section>
  );
};
