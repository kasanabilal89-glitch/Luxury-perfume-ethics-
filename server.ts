import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory persistent data stores for demonstration
const subscribers: Array<{ email: string; preference?: string; date: string }> = [
  { email: 'collector@ethicsfragrance.com', preference: 'all', date: new Date().toISOString() }
];

const inquiries: Array<{ name: string; email: string; fragrance?: string; message: string; date: string }> = [];

// API: Newsletter subscription with validation
app.post('/api/newsletter', (req: Request, res: Response) => {
  const { email, preference } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid luxury email address.' });
  }

  const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(200).json({
      success: true,
      message: 'Welcome back! You are already part of the private ETHICS Circle.',
      alreadySubscribed: true,
    });
  }

  subscribers.push({
    email,
    preference: preference || 'all',
    date: new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    message: 'Welcome to the ETHICS Circle. Your private invitation has been reserved.',
  });
});

// API: Concierge & Contact inquiries
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, fragrance, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }

  inquiries.push({
    name,
    email,
    fragrance,
    message,
    date: new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    message: `Thank you, ${name}. Your concierge request has been forwarded to our Master Parfumeur team.`,
  });
});

// API: Get Fragrances
app.get('/api/fragrances', (_req: Request, res: Response) => {
  res.json({
    brand: 'ETHICS',
    tagline: 'Pure Essence. Timeless Elegance.',
    fragrances: [
      {
        id: 'noir',
        name: 'NOIR',
        subtitle: 'Bold. Mysterious. Unforgettable.',
        pricePlaceholder: 'Price upon request / Boutique Exclusive',
        description:
          'A deep, sensual fragrance for those who leave a lasting impression. Noir is the essence of confidence and magnetic power.',
        concentration: 'Extrait de Parfum (28%)',
        sizes: ['50ml', '100ml', 'Discovery Vial 5ml'],
        notes: {
          top: ['Calabrian Bergamot', 'Madagascar Black Pepper', 'Pink Peppercorn'],
          heart: ['Tuscan Leather', 'Smoked Incense', 'Dark Orris'],
          base: ['Golden Amber Resin', 'Atlas Cedar', 'Smoked Vetiver'],
        },
        image: '/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png',
        accentColor: '#c9a568',
        liquidColor: '#17140f',
        accentGlow: 'rgba(201, 165, 104, 0.4)',
      },
      {
        id: 'velvet',
        name: 'VELVET',
        subtitle: 'Soft. Romantic. Elegant.',
        pricePlaceholder: 'Price upon request / Boutique Exclusive',
        description:
          'A delicate blend of floral and creamy notes, Velvet captures the beauty of grace and sophisticated intimacy in every drop.',
        concentration: 'Extrait de Parfum (25%)',
        sizes: ['50ml', '100ml', 'Discovery Vial 5ml'],
        notes: {
          top: ['Damask Rose Petals', 'Lychee', 'Sparkling Mandarin'],
          heart: ['Night-Blooming Jasmine', 'Cashmere Woods', 'Powdery Heliotrope'],
          base: ['Bourbon Vanilla', 'Silk Musk', 'Sandalwood Accord'],
        },
        image: '/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png',
        accentColor: '#e3a2a0',
        liquidColor: '#8a404f',
        accentGlow: 'rgba(227, 162, 160, 0.4)',
      },
      {
        id: 'oud',
        name: 'OUD',
        subtitle: 'Rich. Warm. Captivating.',
        pricePlaceholder: 'Price upon request / Boutique Exclusive',
        description:
          'An intense and luxurious fragrance crafted with aged artisanal oud, designed for those who seek depth, heritage, and distinction.',
        concentration: 'Extrait de Parfum (32%)',
        sizes: ['50ml', '100ml', 'Discovery Vial 5ml'],
        notes: {
          top: ['Persian Saffron', 'Cardamom Pod', 'Nutmeg Essence'],
          heart: ['Smoked Agarwood (Oud)', 'Taif Rose', 'Cistus Labdanum'],
          base: ['Warm Baltic Amber', 'Dark Patchouli', 'Benzoin Tears'],
        },
        image: '/assets/aistudio/file_00000000bb6c82089f433a20a0aa4a0c_07c59e31.png',
        accentColor: '#d6a855',
        liquidColor: '#844d18',
        accentGlow: 'rgba(214, 168, 85, 0.45)',
      },
    ],
  });
});

// Setup Vite middlewares for dev or static serving for prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ETHICS Luxury Server running on port ${PORT}`);
  });
}

startServer();
