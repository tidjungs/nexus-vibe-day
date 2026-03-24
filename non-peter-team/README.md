# Investment Platform

A modern web application for viewing and managing investment assets. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Project Setup

This project has been bootstrapped according to the specifications in `CLAUDE.md`. The directory structure, components, types, and utilities are all configured per the guidelines.

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components following design patterns in `CLAUDE.md`
- **Validation**: Zod
- **State Management**: React Context / Zustand (when needed)

### Project Structure

```
src/
├── app/
│   ├── (auth)/                    # Authentication route group
│   │   ├── login/                 # Login page
│   │   └── register/              # Registration page
│   ├── (platform)/                # Authenticated app shell
│   │   ├── layout.tsx             # Sidebar + navigation
│   │   ├── dashboard/             # Dashboard page
│   │   ├── portfolio/             # Portfolio pages
│   │   │   └── [id]/              # Portfolio detail
│   │   └── assets/                # Assets page
│   └── api/                       # API route handlers (to be created)
├── components/
│   ├── ui/                        # Primitive components (MetricCard, etc.)
│   ├── charts/                    # Chart components (coming soon)
│   ├── portfolio/                 # Portfolio-specific components
│   └── assets/                    # Asset-specific components
├── lib/
│   ├── api/                       # API client functions
│   ├── types/                     # Domain types (Asset, Portfolio, etc.)
│   └── utils/
│       ├── format.ts              # Financial formatting utilities
│       └── cn.ts                  # Tailwind class utilities
└── globals.css                    # Global styles
```

## Getting Started

### Installation

Dependencies are already installed. To verify or reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:

```bash
npm run build
npm start
```

## Key Patterns

### Financial Data

All financial values are typed as `number` and formatted using `Intl.NumberFormat`:

```typescript
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const value = 1250000;
formatCurrency(value);  // "฿1,250,000.00"
formatPercent(13.64);   // "13.64%"
```

### Domain Types

Domain types are defined in `src/lib/types/index.ts` and should be used consistently:

```typescript
import { Portfolio, AssetHolding, Asset } from '@/lib/types';
```

### Server vs Client Components

- Default to Server Components
- Add `"use client"` only for interactivity
- Fetch data in Server Components or route handlers
- Pass data down as props from server boundaries

### API Client

The `src/lib/api/index.ts` module provides typed API functions:

```typescript
import { getPortfolios, getAsset } from '@/lib/api';

const portfolios = await getPortfolios();
const asset = await getAsset('AAPL');
```

### Styling

Use the `cn()` utility for conditional Tailwind classes:

```typescript
import { cn } from '@/lib/utils/cn';

<div className={cn('base-class', isActive && 'active-class')} />
```

## Design Philosophy

This is a **data-dense, trust-critical** interface. Every design choice should communicate clarity, precision, and reliability:

- Prioritize scannability over decoration
- Use color semantically (green for gains, red for losses)
- Always use `font-mono tabular-nums` for numerical data
- Never use animations that delay access to data
- Show loading skeletons, not spinners

## Next Steps

1. **Implement API routes** in `src/app/api/`
2. **Connect to backend** by updating `NEXT_PUBLIC_API_URL` in `.env`
3. **Build data-fetching components** for portfolios and assets
4. **Implement charts** using Recharts or Tremor
5. **Add authentication** (consider NextAuth.js)
6. **Create more UI components** following the patterns in CLAUDE.md

## References

See `CLAUDE.md` for comprehensive guidelines on:
- Architecture patterns
- Code style conventions
- UI/UX guidelines
- Financial data handling
- Accessibility requirements
