# Event Discovery Platform

A modern, SEO-optimized event discovery platform built with Next.js 14+, featuring bilingual support (English/Arabic), server-side rendering, and comprehensive booking functionality.

## Features

- **Server-Side Rendering**: Optimized for SEO with Next.js App Router and React Server Components
- **Bilingual Support**: Full internationalization with English and Arabic (RTL support)
- **Advanced Search & Filtering**: Filter events by category, location, date, and price
- **Dynamic SEO**: Automatic meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Built with TypeScript in strict mode
- **Mock API Layer**: Simulates real backend behavior for easy integration
- **Booking System**: Complete ticket booking flow with form validation
- **Print Support**: Print-friendly ticket views

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl
- **Form Handling**: React Hook Form + Zod validation
- **Date Management**: date-fns
- **State Management**: URL-based state for filters (shareable links)

## Project Structure

```
event-discovery-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── events/        # Event listing and details
│   │   │   ├── tickets/       # My tickets page
│   │   │   └── layout.tsx     # Locale-specific layout
│   │   ├── api/               # API route handlers
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── robots.ts          # Robots.txt config
│   ├── components/
│   │   ├── events/            # Event-specific components
│   │   ├── booking/           # Booking components
│   │   ├── layout/            # Header, Footer, etc.
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── api/               # API service layer
│   │   ├── utils/             # Utility functions
│   │   └── validations/       # Zod schemas
│   ├── types/                 # TypeScript type definitions
│   ├── data/                  # Mock event data
│   └── i18n/                  # Internationalization config
├── messages/                   # Translation files
│   ├── en.json
│   └── ar.json
└── middleware.ts              # Next.js middleware for i18n
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-discovery-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Implementation

### SEO Optimization

The platform implements comprehensive SEO best practices:

- **Dynamic Metadata**: Every page generates unique meta tags using Next.js Metadata API
- **Open Graph Tags**: Automatic social media previews with images and descriptions
- **JSON-LD Structured Data**: Schema.org Event markup for rich search results
- **Dynamic Sitemap**: Auto-generated sitemap.xml with all events and pages
- **Robots.txt**: Proper crawling rules for search engines
- **Semantic HTML**: Proper use of article, section, and header tags

### Internationalization

- English and Arabic language support
- RTL (Right-to-Left) layout for Arabic
- URL-based locale routing (`/en/events`, `/ar/events`)
- Locale-aware date and number formatting
- Font optimization (Inter for English, Cairo for Arabic)

### Performance

- Server Components by default (reduces JavaScript bundle)
- Optimized images with Next.js Image component
- Loading skeletons for better perceived performance
- Suspense boundaries for streaming
- Code splitting and lazy loading

## API Endpoints

### Mock API Routes

- `GET /api/events` - List all events with optional filters
- `GET /api/events/[slug]` - Get single event details
- `POST /api/bookings` - Create a new booking

### Query Parameters for Events

- `search` - Search in title, description, and tags
- `category` - Filter by event category
- `location` - Filter by city or country
- `startDate` - Filter events from this date
- `endDate` - Filter events until this date
- `priceRange` - Filter by price (free, paid, all)

## Mock Data

The application includes 30 diverse mock events with:
- Various categories (Technology, Music, Art, Sports, Business, Food)
- Locations across MENA region
- Mix of free and paid events
- Future dates for upcoming events
- Realistic event details and descriptions

## Deployment

### Environment Variables

Set these in your production environment:

```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Build and Deploy

```bash
npm run build
npm run start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- Unsplash for placeholder images
- DiceBear for avatar generation
