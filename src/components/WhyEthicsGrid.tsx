import React from 'react';
import { Sparkles, Clock, Package, Globe, ShieldCheck } from 'lucide-react';

export const WhyEthicsGrid: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Ingredients',
      description: 'Single-harvest botanicals, aged wild agarwood, and pure botanical absolutes ethically sourced from historic terroirs.',
    },
    {
      icon: Clock,
      title: 'Long Lasting Fragrance',
      description: 'Formulated at Extrait de Parfum concentration (25-32%) to deliver 12 to 18 hours of continuous, evolving projection.',
    },
    {
      icon: Package,
      title: 'Elegant Packaging',
      description: 'Hand-polished French crystal flacons accompanied by magnetic gold closures and velvet-lined keepsake presentation cases.',
    },
    {
      icon: Globe,
      title: 'Global Shipping',
      description: 'White-glove temperature-controlled insured express dispatch to over 140 countries with discrete luxury packaging.',
    },
  ];

  return (
    <section className="py-20 relative bg-[#0b0a08] border-t border-b border-[#3b3123]/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-sans tracking-[0.28em] text-[#c9a568]">
            THE DISTINCTION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#fbf7ee] tracking-wide mt-2">
            WHY CHOOSE <span className="gold-gradient-text">ETHICS</span>?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-white/[0.02] border border-[#c9a568]/15 hover:border-[#c9a568]/50 transition-all duration-300 text-center flex flex-col items-center group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full border border-[#c9a568]/30 flex items-center justify-center text-[#c9a568] bg-[#c9a568]/5 group-hover:bg-[#c9a568] group-hover:text-black transition-all duration-300 mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display text-lg text-[#fbf7ee] tracking-wider mb-2.5">
                  {f.title}
                </h3>

                <p className="font-sans text-xs text-[#9d9282] leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
