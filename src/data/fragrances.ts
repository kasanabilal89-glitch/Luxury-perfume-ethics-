import { Fragrance, Testimonial } from '../types/fragrance';

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'noir',
    name: 'NOIR',
    tagline: 'Bold. Mysterious. Unforgettable.',
    subtitle: 'Eau De Parfum 100 ML',
    category: 'Smoky Amber & Dark Woods',
    pricePlaceholder: '$295 USD (Editable placeholder — Boutique Exclusive)',
    description:
      'A deep, sensual fragrance for those who leave an indelible impression. Noir is the pure essence of quiet confidence, magnetic warmth, and nighttime intrigue.',
    fullStory:
      'Formulated in Grasse and perfected over three years of maceration, NOIR balances the crisp luminescence of cold-pressed Calabrian bergamot with smoked agarwood and black pepper. As the hours unfold, a supple heart of Tuscan bridle leather settles into an intoxicating base of dark amber and cedar.',
    concentration: 'Extrait de Parfum (28% Concentration)',
    sillage: 'Strong & Enveloping',
    longevity: '14+ Hours on Skin',
    volume: '100 ML / 3.4 FL. OZ.',
    sizes: [
      { size: '50 ML', priceLabel: '$195 USD', note: 'Travel Flacon' },
      { size: '100 ML', priceLabel: '$295 USD', note: 'Signature Flacon' },
      { size: 'Extrait 100 ML', priceLabel: '$385 USD', note: 'Numbered Reserve Edition' },
    ],
    notes: {
      top: ['Calabrian Bergamot', 'Madagascar Black Pepper', 'Pink Peppercorn'],
      heart: ['Tuscan Leather', 'Smoked Frankincense', 'Dark Florentine Orris'],
      base: ['Golden Amber Resin', 'Atlas Cedarwood', 'Smoked Haitian Vetiver'],
    },
    keyIngredients: [
      { name: 'Calabrian Bergamot', origin: 'Reggio Calabria, Italy', role: 'Cold-pressed luminous opening' },
      { name: 'Black Pepper', origin: 'Madagascar Highlands', role: 'Spiced aromatic warmth' },
      { name: 'Tuscan Leather', origin: 'Florence, Italy', role: 'Velvety artisanal texture' },
      { name: 'Golden Amber Resin', origin: 'Baltic Coast', role: 'Hypnotic, long-lingering trail' },
    ],
    accentColor: '#c9a568',
    accentGold: '#d6a855',
    liquidColorHex: 0x14100c,
    glassTintHex: 0x181410,
    capColorHex: 0x12100e, // Obsidian faceted cap with gold collar
    mood: 'Enigmatic, Powerful, Velvet Twilight',
    season: 'Autumn / Winter / Evening',
    timeOfDay: 'Dusk to Dawn',
  },
  {
    id: 'velvet',
    name: 'VELVET',
    tagline: 'Soft. Romantic. Elegant.',
    subtitle: 'Eau De Parfum 100 ML',
    category: 'Luminous Floral & Cashmere Musk',
    pricePlaceholder: '$285 USD (Editable placeholder — Boutique Exclusive)',
    description:
      'A delicate yet hypnotic blend of Turkish rose petals and creamy vanilla, Velvet captures the quiet grace of romantic luxury and skin-close warmth.',
    fullStory:
      'VELVET captures the touch of whispered silk and morning dew. Harvested at dawn before the sun warms the valley, petals of rare Damask rose are gently distilled to preserve their purest crystalline essence. Grounded with Madagascar bourbon vanilla and cashmere musk, it wraps the wearer in an intoxicating aura.',
    concentration: 'Extrait de Parfum (26% Concentration)',
    sillage: 'Moderate & Intimate',
    longevity: '12+ Hours on Skin',
    volume: '100 ML / 3.4 FL. OZ.',
    sizes: [
      { size: '50 ML', priceLabel: '$185 USD', note: 'Travel Flacon' },
      { size: '100 ML', priceLabel: '$285 USD', note: 'Signature Flacon' },
      { size: 'Extrait 100 ML', priceLabel: '$375 USD', note: 'Numbered Reserve Edition' },
    ],
    notes: {
      top: ['Damask Rose Petals', 'Lychee Water', 'Italian Mandarin'],
      heart: ['Night-Blooming Jasmine', 'Cashmere Woods', 'Powdery Heliotrope'],
      base: ['Bourbon Vanilla Bean', 'Silk White Musk', 'Mysore Sandalwood'],
    },
    keyIngredients: [
      { name: 'Damask Rose Petals', origin: 'Isparta, Turkey', role: 'Hand-picked dawn distillation' },
      { name: 'Night Jasmine', origin: 'Grasse, France', role: 'Sensual floral heart' },
      { name: 'Bourbon Vanilla', origin: 'Sava Region, Madagascar', role: 'Warm gourmand sophistication' },
      { name: 'White Silk Musk', origin: 'Synthesized Artisanal Accord', role: 'Second-skin softness' },
    ],
    accentColor: '#e3a2a0',
    accentGold: '#f0d8a4',
    liquidColorHex: 0x5a2332,
    glassTintHex: 0x823b49,
    capColorHex: 0xb45b66, // Rose cut crystal cap
    mood: 'Romantic, Radiant, Effortless Grace',
    season: 'Spring / Summer / Golden Hour',
    timeOfDay: 'Day to Evening',
  },
  {
    id: 'oud',
    name: 'OUD',
    tagline: 'Rich. Warm. Captivating.',
    subtitle: 'Eau De Parfum 100 ML',
    category: 'Rare Agarwood & Smoked Saffron',
    pricePlaceholder: '$340 USD (Editable placeholder — Boutique Exclusive)',
    description:
      'An intense, opulent creation centered on 20-year aged wild agarwood. Crafted for connoisseurs who seek sovereign depth, royal heritage, and distinction.',
    fullStory:
      'OUD pays tribute to ancient olfactory traditions of royal courts. Centered on ethically harvested wild agarwood from Assam, it is complemented by crimson Persian saffron and benzoin tears. Warming upon contact with the pulse points, it radiates ancient warmth and modern regal sophistication.',
    concentration: 'Extrait de Parfum (32% Concentration)',
    sillage: 'Commanding & Royal',
    longevity: '18+ Hours on Skin',
    volume: '100 ML / 3.4 FL. OZ.',
    sizes: [
      { size: '50 ML', priceLabel: '$220 USD', note: 'Travel Flacon' },
      { size: '100 ML', priceLabel: '$340 USD', note: 'Signature Flacon' },
      { size: 'Extrait 100 ML', priceLabel: '$460 USD', note: 'Numbered Reserve Edition' },
    ],
    notes: {
      top: ['Persian Saffron', 'Wild Cardamom Pods', 'Nutmeg Essence'],
      heart: ['Aged Assam Agarwood', 'Taif Rose Absolute', 'Cistus Labdanum'],
      base: ['Warm Baltic Amber', 'Indonesian Patchouli', 'Siam Benzoin Resin'],
    },
    keyIngredients: [
      { name: 'Wild Agarwood (Oud)', origin: 'Assam Valley, India', role: '20-year aged sovereign heart' },
      { name: 'Persian Saffron', origin: 'Khorasan, Iran', role: 'Crimson golden spice aura' },
      { name: 'Taif Rose', origin: 'Al-Hada Highlands, Saudi Arabia', role: 'Noble velvety contrast' },
      { name: 'Dark Patchouli', origin: 'Sumatra, Indonesia', role: 'Earthy, aristocratic grounding' },
    ],
    accentColor: '#c08b45',
    accentGold: '#d6a855',
    liquidColorHex: 0x50280b,
    glassTintHex: 0x6e3b12,
    capColorHex: 0x9b7032, // Imperial textured gold cap
    mood: 'Regal, Sovereign, Magnetic Warmth',
    season: 'All Seasons / Grand Evenings',
    timeOfDay: 'Evening & Special Ceremonies',
  },
];

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote:
      '“NOIR is unlike anything in contemporary perfumery. The leather and amber dry down clings to wool and cashmere for days with an aristocratic whisper.”',
    author: 'Julian Vance',
    title: 'Fragrance Critic & Olfactory Historian',
    publicationOrCity: 'Sample Editorial Review — Paris',
    rating: 5,
    featuredFragrance: 'NOIR',
  },
  {
    id: 't-2',
    quote:
      '“VELVET feels like stepping into a sunlit conservatory of Turkish roses wrapped in whipped bourbon vanilla. Intimate, breathless, and utterly refined.”',
    author: 'Elena Rossi-Chau',
    title: 'Senior Lifestyle Editor',
    publicationOrCity: 'Sample Connoisseur Review — Milan',
    rating: 5,
    featuredFragrance: 'VELVET',
  },
  {
    id: 't-3',
    quote:
      '“The Assam oud in ETHICS is authentic, multidimensional, and miraculously smooth. It possesses the gravity of royal vintage flacons without ever overwhelming.”',
    author: 'Kareem Al-Mansoor',
    title: 'Master Collector & Niche Fragrance Juror',
    publicationOrCity: 'Sample Collector Review — Dubai',
    rating: 5,
    featuredFragrance: 'OUD',
  },
];

export const BRAND_VALUES = [
  {
    number: '01',
    title: 'Pure Botanical Extraction',
    subtitle: 'NATURE’S FINEST, IN EVERY DROP',
    description:
      'We harvest rare botanicals strictly during their peak aromatic hours — dawn-gathered Damask rose and sustainably aged wild agarwood distilled with centuries-old precision.',
    icon: 'Sparkles',
  },
  {
    number: '02',
    title: 'Artisanal Craftsmanship',
    subtitle: 'SLOW-MACERATED PERFECTION',
    description:
      'Every flacon undergoes a minimum of 180 days of slow cold maceration in Grasse, France. This allows complex accords to harmonize into an effortless, seamless composition.',
    icon: 'Gem',
  },
  {
    number: '03',
    title: 'Timeless Elegance',
    subtitle: 'FOR THOSE WHO LEAVE A LASTING LEGACY',
    description:
      'Heavy French crystalline flacons with hand-polished bevels, magnetic gold closures, and etched insignia designed as heirloom vanity objects for generations.',
    icon: 'Crown',
  },
];
