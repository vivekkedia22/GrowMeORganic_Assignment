# Artwork Gallery Assignment

A React application for browsing and selecting artworks from the Art Institute of Chicago API.

## Features

- Browse artwork collection with pagination
- Select multiple artworks across pages
- Filter artwork titles (removes "Untitled" prefix)
- Responsive data table with hover effects
- Custom paginator with styled navigation

## Tech Stack

- React 18 with TypeScript
- PrimeReact UI components
- Tailwind CSS for styling
- Axios for API calls

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── component/          # Reusable components
│   ├── ArtworkTable.tsx
│   ├── CustomPaginator.tsx
│   ├── TitleHeader.tsx
│   └── types.ts
├── pages/             # Page components
│   └── AssignmentPage.tsx
└── apis/              # API utilities
    └── index.ts
```

## API

Uses the Art Institute of Chicago API:
- Base URL: `https://api.artic.edu/api/v1/artworks`
- Supports pagination with 12 items per page