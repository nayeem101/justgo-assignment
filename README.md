# Product Explorer Dashboard

A React application for exploring product data using the [DummyJSON API](https://dummyjson.com/).

## Tech Stack

- **React 19** + TypeScript + Vite 7
- **React Router 7** - Routing
- **TanStack Query 5** - Server state
- **Zustand 5** - Client state (persisted)
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client

## Features

- **Products Table** - Virtualized with infinite scroll, sorting, category filtering
- **Product Detail** - Image gallery, tabs (specs, reviews, shipping), currency conversion
- **Search** - Grid layout, bookmarkable URLs, active filter tags
- **Categories** - Grid/List toggle, persistent view preference
- **Settings** - Currency selection (USD/GBP/EUR)

## State Management

| State       | Solution               | Why                      |
| :---------- | :--------------------- | :----------------------- |
| Server data | React Query            | Caching, infinite scroll |
| Filters     | URL (React Router)     | Bookmarkable, shareable  |
| Preferences | Zustand + localStorage | Persistent               |

## Getting Started

```bash
npm install
npm run dev
```

## UI Mockup Design

Designed the UI mockup using Stitch with Google: [View Design](https://stitch.withgoogle.com/projects/2473793129951364176)

## Project Structure

```text
.
├── public/
│   └── ...
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   └── ...
│   ├── assets/
│   ├── components/
│   │   ├── category/
│   │   │   ├── CategoryCard.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── ...
│   │   ├── product/
│   │   │   ├── ProductTable.tsx
│   │   │   └── ...
│   │   ├── productDetails/
│   │   │   ├── ProductInfo.tsx
│   │   │   └── ...
│   │   ├── settings/
│   │   │   └── CurrencySelector.tsx
│   │   ├── table/
│   │   │   ├── Table.tsx
│   │   │   └── ...
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── ...
│   │   ├── EmptyState.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── queries/
│   │   │   ├── useProducts.ts
│   │   │   └── ...
│   │   ├── useProductFilters.ts
│   │   └── ...
│   ├── pages/
│   │   ├── ProductsPage.tsx
│   │   └── ...
│   ├── providers/
│   │   └── ...
│   ├── store/
│   │   └── ...
│   ├── types/
│   │   ├── product.ts
│   │   └── ...
│   ├── utils/
│   │   └── ...
│   ├── App.tsx
│   └── ...
├── package.json
└── ...
```

## Questions

### 1. Trade-offs due to time constraints?

- **Recent searches** - Not implemented; deferred for core features
- **Dark mode** - Removed to reduce complexity
- **Test coverage** - Minimal; would add Vitest for production
- **Server-side sorting** - Client-side only; API limitations
- **Image caching** - Basic implementation; images reload on virtualized scroll

### 2. What would you refactor first to scale?

- **Server-side filtering/sorting** - Move logic to backend for large datasets
- **Image caching** - Global cache for virtualized rows
- **Code splitting** - Lazy load routes
- **API abstraction** - Repository pattern for backend flexibility
- **Error boundaries** - Per-route error handling

### 3. Did you use AI tools?

Yes, Claude was used as a development assistant.

| Used For                  | Verification                        |
| :------------------------ | :---------------------------------- |
| Table virtualization hook | Performance testing with 1000+ rows |
| Sticky header bug fix     | Cross-browser testing               |
| TypeScript interfaces     | Compiler validation                 |
| Documentation             | Manual review                       |

All AI-generated code was reviewed, tested manually, and validated with TypeScript strict mode.
