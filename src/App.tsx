import React, { useState, useEffect } from 'react';
import { FRAGRANCES } from './data/fragrances';
import { Fragrance, FragranceId, CartItem } from './types/fragrance';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CollectionSection } from './components/CollectionSection';
import { ProductModal } from './components/ProductModal';
import { SignatureShowcase } from './components/SignatureShowcase';
import { BrandStorySection } from './components/BrandStorySection';
import { WhyEthicsGrid } from './components/WhyEthicsGrid';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ScentQuizModal } from './components/ScentQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { NewsletterSection } from './components/NewsletterSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentFragranceId, setCurrentFragranceId] = useState<FragranceId>('noir');
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial sample reserved item for instant tactile experience
    return [
      {
        id: 'initial-noir',
        fragranceId: 'noir',
        name: 'ETHICS NOIR',
        size: '100 ML',
        priceLabel: '$295 USD',
        quantity: 1,
        image: '/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png',
      },
    ];
  });

  // Handle adding a fragrance to cart
  const handleAddToCart = (fragrance: Fragrance, size: string, priceLabel: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.fragranceId === fragrance.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${fragrance.id}-${size}-${Date.now()}`,
          fragranceId: fragrance.id,
          name: `ETHICS ${fragrance.name}`,
          size,
          priceLabel,
          quantity: 1,
          image: '/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png',
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Keyboard accessibility: Escape closes any active modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFragrance(null);
        setIsQuizOpen(false);
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070706] text-[#fbf7ee] font-sans antialiased selection:bg-[#c9a568] selection:text-black">
      {/* Fixed Luxury Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main>
        {/* Full-Screen 3D Hero Section */}
        <HeroSection
          currentFragranceId={currentFragranceId}
          onSelectFragrance={(id) => setCurrentFragranceId(id)}
          onExploreCollection={() => {
            const col = document.getElementById('collection');
            col?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Haute Parfumerie Trilogy Collection */}
        <CollectionSection
          onOpenDetails={(fragrance) => setSelectedFragrance(fragrance)}
          onSelectFor3D={(id) => setCurrentFragranceId(id)}
          onAddToCart={handleAddToCart}
        />

        {/* Signature Showcase: "A Fragrance For Every Mood" */}
        <SignatureShowcase
          onSelectFragrance={(id) => setCurrentFragranceId(id)}
          onOpenDetails={(id) => {
            const frag = FRAGRANCES.find((f) => f.id === id);
            if (frag) setSelectedFragrance(frag);
          }}
        />

        {/* Editorial Brand Story: "More Than A Fragrance" */}
        <BrandStorySection
          onExploreCollection={() => {
            const col = document.getElementById('collection');
            col?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Why Choose ETHICS Feature Grid */}
        <WhyEthicsGrid />

        {/* Customer Testimonials & Reviews (Sample Connoisseur Content) */}
        <TestimonialsSection />

        {/* Inner Circle Newsletter Signup */}
        <NewsletterSection />

        {/* Private Client Concierge & Contact Form */}
        <ContactSection />
      </main>

      {/* Footer with mandatory credit */}
      <Footer />

      {/* Product Details Modal */}
      <ProductModal
        fragrance={selectedFragrance}
        onClose={() => setSelectedFragrance(null)}
        onAddToCart={handleAddToCart}
        onViewIn3D={(id) => setCurrentFragranceId(id)}
      />

      {/* Bespoke Scent Finder Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectResult={(fragrance) => setSelectedFragrance(fragrance)}
        onViewIn3D={(id) => setCurrentFragranceId(id)}
      />

      {/* Cart & Reservation Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
