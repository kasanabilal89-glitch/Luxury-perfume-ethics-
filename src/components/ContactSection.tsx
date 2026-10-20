import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, ArrowRight, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { playCrystalChime } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fragrance: 'General Boutique Inquiry',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setStatus({ type: 'loading', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Your inquiry has been received by our Master Parfumeur team.',
        });
        setFormData({ name: '', email: '', fragrance: 'General Boutique Inquiry', message: '' });
        playCrystalChime(700);
      } else {
        setStatus({ type: 'error', message: data.message || 'Could not send message. Please retry.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network connection issue. Please check your connection.' });
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-[#090807]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Boutique Concierge Details & Salons */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.28em] text-[#c9a568] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRIVATE CLIENT CONCIERGE</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-[#fbf7ee] tracking-wide mb-6">
                SPEAK WITH <br />
                <span className="gold-gradient-text">OUR ATELIER</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[#9f9482] leading-relaxed mb-8">
                Whether you seek a bespoke monogram engraving on a flacon, a private appointment in our Grasse laboratory, or guidance on bespoke fragrance curation, our curators are at your disposal.
              </p>

              {/* Atelier Salons */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <MapPin className="w-5 h-5 text-[#c9a568] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-sm text-[#fbf7ee] tracking-wider">
                      Flagship Atelier — Grasse
                    </h4>
                    <p className="font-sans text-xs text-[#8c806f] mt-0.5">
                      14 Rue des Parfumeurs, 06130 Grasse, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <Mail className="w-5 h-5 text-[#c9a568] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-sm text-[#fbf7ee] tracking-wider">
                      Private Inquiries
                    </h4>
                    <p className="font-sans text-xs text-[#8c806f] mt-0.5">
                      concierge@ethicsfragrance.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <Clock className="w-5 h-5 text-[#c9a568] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-sm text-[#fbf7ee] tracking-wider">
                      Concierge Hours
                    </h4>
                    <p className="font-sans text-xs text-[#8c806f] mt-0.5">
                      Monday to Saturday • 09:00 — 19:00 CET
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#13110d] to-[#0a0807] border border-[#c9a568]/30 shadow-2xl">
            <h3 className="font-display text-2xl text-[#fbf7ee] tracking-wide mb-2">
              Send a Private Message
            </h3>
            <p className="font-sans text-xs text-[#8e816f] mb-8">
              All messages are answered directly by an ETHICS fragrance specialist within 24 business hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#938573] font-sans mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lorde Evelyn Wright"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-[#6f6353] focus:outline-none focus:border-[#c9a568]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#938573] font-sans mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="evelyn@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-[#6f6353] focus:outline-none focus:border-[#c9a568]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#938573] font-sans mb-2">
                  Fragrance of Interest
                </label>
                <select
                  value={formData.fragrance}
                  onChange={(e) => setFormData({ ...formData, fragrance: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#14120f] border border-white/10 text-xs text-[#d6cdbd] focus:outline-none focus:border-[#c9a568]"
                >
                  <option value="General Boutique Inquiry">General Boutique Inquiry</option>
                  <option value="NOIR — Extrait de Parfum">NOIR — Extrait de Parfum</option>
                  <option value="VELVET — Extrait de Parfum">VELVET — Extrait de Parfum</option>
                  <option value="OUD — Extrait de Parfum">OUD — Extrait de Parfum</option>
                  <option value="Bespoke Private Commission">Bespoke Private Commission</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#938573] font-sans mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Inquire about flacon reservations, bespoke sample vials, or private salon tasting..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-[#6f6353] focus:outline-none focus:border-[#c9a568] resize-none"
                />
              </div>

              {status.type === 'success' && (
                <div className="p-4 rounded-xl bg-[#c9a568]/10 border border-[#c9a568] text-xs text-[#f0d8a4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a568] flex-shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.type === 'error' && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs text-rose-300">
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full py-4 px-6 rounded-full bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-xl shadow-[#c9a568]/20 flex items-center justify-center gap-2"
              >
                {status.type === 'loading' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Transmit To Concierge</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
