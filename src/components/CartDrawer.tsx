import React, { useState } from 'react';
import { CartItem } from '../types/fragrance';
import { X, Trash2, ShieldCheck, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { playCrystalChime } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: 'United States',
    conciergeNote: '',
  });
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setFormError('Please enter your name and email address.');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        fragrance: items.map((i) => `${i.name} (${i.size} x${i.quantity})`).join(', '),
        message: `Concierge Reservation Request for: ${items
          .map((i) => `${i.name} [${i.size}] x${i.quantity} @ ${i.priceLabel}`)
          .join('; ')}. Delivery Destination: ${formData.country}. Note: ${formData.conciergeNote || 'None'}`,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const reservationCode = `ETH-${Math.floor(100000 + Math.random() * 900000)}`;
        setReservationSuccess(reservationCode);
        onClearCart();
        playCrystalChime(880);
      } else {
        setFormError(data.message || 'Unable to submit reservation. Please try again.');
      }
    } catch {
      setFormError('Network communication error. Please try again shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-[#0d0c0a] border-l border-[#c9a568]/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c9a568]" />
            <h3 className="font-display text-lg tracking-wider text-[#fbf7ee]">
              RESERVED SELECTIONS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-[#a69986] hover:text-white"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {reservationSuccess ? (
          <div className="my-auto text-center py-12">
            <div className="w-16 h-16 rounded-full border border-[#c9a568] flex items-center justify-center mx-auto mb-6 text-[#c9a568] bg-[#c9a568]/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#c9a568]">
              Concierge Confirmation
            </span>
            <h4 className="font-display text-2xl text-[#fbf7ee] tracking-wide mt-2 mb-3">
              Reservation Confirmed
            </h4>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 my-4 inline-block">
              <span className="block text-[9px] uppercase tracking-widest text-[#857764]">Reference Code</span>
              <span className="font-mono text-lg text-[#f0d8a4] font-semibold">{reservationSuccess}</span>
            </div>
            <p className="font-sans text-xs text-[#a89d8b] leading-relaxed max-w-xs mx-auto mb-6">
              Our Private Client Concierge has received your selection. An authentic allocation invoice with verified batch numbers and secure boutique checkout will be dispatched to your email.
            </p>
            <button
              onClick={() => {
                setReservationSuccess(null);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full border border-[#c9a568] text-[#f0d8a4] text-xs uppercase tracking-widest hover:bg-[#c9a568]/15 transition-all"
            >
              Return To Boutique
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="my-auto text-center py-16">
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#8f816f]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h4 className="font-display text-lg text-[#fbf7ee] tracking-wider mb-2">
              Your Flacon Tray is Empty
            </h4>
            <p className="font-sans text-xs text-[#8f816f] max-w-xs mx-auto mb-6">
              Explore our trilogy of pure extrait fragrances to reserve your signature bottle.
            </p>
            <a
              href="#collection"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#c9a568] text-black text-xs uppercase font-sans font-medium tracking-widest"
            >
              <span>Explore Trilogy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-display text-base tracking-wider text-[#fbf7ee]">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-[#8e816f] uppercase tracking-wider font-sans block">
                    {item.size} • Extrait de Parfum
                  </span>
                  <span className="text-xs font-semibold text-[#f0d8a4] font-sans mt-1 block">
                    {item.priceLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-white/15 rounded-lg overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2.5 py-1 text-xs hover:bg-white/10 text-[#d8cdbd]"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-mono text-[#fbf7ee]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2.5 py-1 text-xs hover:bg-white/10 text-[#d8cdbd]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-[#7a6f5e] hover:text-[#e3a2a0] transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Concierge Reservation Form */}
            <form onSubmit={handleSubmitReservation} className="pt-6 border-t border-white/10 space-y-3.5">
              <span className="block text-[10px] uppercase font-sans tracking-[0.22em] text-[#c9a568]">
                Concierge Allocation Details
              </span>

              {formError && (
                <div className="p-2.5 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/40 rounded-xl">
                  {formError}
                </div>
              )}

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#7d7161] focus:outline-none focus:border-[#c9a568]"
              />

              <input
                type="email"
                placeholder="Email Address for Allocation Documents"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#7d7161] focus:outline-none focus:border-[#c9a568]"
              />

              <input
                type="text"
                placeholder="Delivery Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#7d7161] focus:outline-none focus:border-[#c9a568]"
              />

              <textarea
                placeholder="Boutique Inscription / Special Gifting Notes (Optional)"
                rows={2}
                value={formData.conciergeNote}
                onChange={(e) => setFormData({ ...formData, conciergeNote: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-[#7d7161] focus:outline-none focus:border-[#c9a568] resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-[#c9a568] hover:bg-[#d6a855] text-black font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-xl shadow-[#c9a568]/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting to Concierge...</span>
                ) : (
                  <>
                    <span>Confirm Private Allocation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Footer Guarantee */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-[9.5px] text-[#7d705f]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c9a568] flex-shrink-0" />
          <span>Real-time dispatch via Express Concierge. Non-binding allocation.</span>
        </div>
      </div>
    </div>
  );
};
