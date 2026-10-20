export type FragranceId = 'noir' | 'velvet' | 'oud';

export interface FragranceNoteGroup {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Fragrance {
  id: FragranceId;
  name: string;
  tagline: string;
  subtitle: string;
  category: string;
  pricePlaceholder: string;
  description: string;
  fullStory: string;
  concentration: string;
  sillage: string;
  longevity: string;
  volume: string;
  sizes: { size: string; priceLabel: string; note: string }[];
  notes: FragranceNoteGroup;
  keyIngredients: { name: string; origin: string; role: string }[];
  imageCropX?: number; // percentage crop for specific bottle highlight from asset
  accentColor: string;
  accentGold: string;
  liquidColorHex: number;
  glassTintHex: number;
  capColorHex: number;
  mood: string;
  season: string;
  timeOfDay: string;
}

export interface CartItem {
  id: string;
  fragranceId: FragranceId;
  name: string;
  size: string;
  priceLabel: string;
  quantity: number;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  publicationOrCity: string;
  rating: number;
  featuredFragrance: string;
}
