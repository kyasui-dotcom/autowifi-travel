# Development Setup

## Prerequisites

- Node.js 20+
- npm

## Backend

```bash
cd backend
npm install
npm run dev          # Start development server
npm test             # Run tests
npm run build        # Build for production
```

### Environment

The backend runs on Cloudflare Workers with D1 SQLite database.

- **Deploy:** `npm run deploy:cloudflare`
- **Database migrations:** `npm run db:generate && npm run db:push`

### Seeding the Database

After deploying, send a POST request to `/api/seed` to populate the pattern database.

## Mobile

```bash
cd mobile
npm install
npm start            # Start Expo dev server
npm test             # Run tests
npm run android      # Run on Android
npm run ios          # Run on iOS
```

### Environment Variables

Copy `.env.example` to `.env` and customize:

```
EXPO_PUBLIC_API_BASE_URL=https://your-api-url.workers.dev
```

If not set, defaults to the production API URL.

### Running Tests

```bash
npm test             # Run all tests
npm run test:watch   # Watch mode
```

## Project Structure

```
autowifi-travel/
  backend/           # Next.js API (Cloudflare Workers)
    app/api/          # API routes
    lib/db/           # Database schema and connection
    data/             # Seed data (JSON)
    __tests__/        # Backend tests
  mobile/             # Expo React Native app
    app/              # Screens (Expo Router)
    services/         # Business logic services
    hooks/            # Custom React hooks
    lib/              # Types, config, state stores
    assets/           # Images, fonts, bundled data
    __tests__/        # Mobile tests
  docs/               # Documentation
  scripts/            # Data management scripts
```
