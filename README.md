# Oordio Landing Page

A standalone marketing landing page for Oordio. Recreates the design and content from the reference site with improved animations, interactivity, and performance.

**Pricing and plans** — When you change plans or pricing in the main Oordio app, update `index.html` and `plans.json` accordingly.

## Features

- **Hero** — Gradient background, animated tagline, CTAs
- **Stats** — Animated counters (15K+, 5K+, 100%)
- **How It Works** — Tabbed interface (Portfolio Owners / Cleaning Professionals)
- **Advantages** — Feature grid with hover effects
- **Pricing** — Monthly/Yearly toggle, 3 plans
- **Testimonials** — Auto-rotating carousel
- **App Download** — App store badges
- **Responsive** — Mobile menu, stacked layouts

## Run Locally

```bash
# Option 1: npx serve (if you have Node installed)
npx serve .

# Option 2: Python
python -m http.server 8080
```

Then open `http://localhost:3000` (serve) or `http://localhost:8080` (Python).

## Deploy to Vercel

This repo is configured for Vercel. Connect it at [vercel.com](https://vercel.com) or run:

```bash
vercel
```

For custom domain: add `oordio.com` and `www.oordio.com` in Vercel project settings.

## Project Structure

```
├── index.html   # HTML structure
├── styles.css   # Design system, layout, animations
├── script.js    # Menu, tabs, pricing toggle, scroll effects
├── plans.json   # Plan data (mirrors subscription.ts — for reference/sync)
├── blog/        # Blog posts
│   ├── index.html
│   ├── automate-airbnb-turnaround.html
│   ├── backup-cleaner-strategy.html
│   ├── cleaning-professional-tips.html
│   └── scale-short-term-portfolio.html
├── assets/      # Logo and images (add logo.png, mockups for production)
└── README.md
```

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- No build step or dependencies
- Google Fonts: Outfit (headings), DM Sans (body)
