# CyberXP Website

The official website for [CyberXP](https://www.cyberxp.be/) — cybersecurity awareness events for SMEs. Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Internationalization:** next-intl (EN, NL, FR)
- **Content Pipeline:** Excel → Python script → `content.json`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Management

Site content (sponsors, quotes, resources, FAQs) is managed via an Excel spreadsheet in `data/content-management.xlsx`. After editing:

```bash
pip install pandas openpyxl
python scripts/generate-content.py
```

This regenerates `src/data/content.json`, which is consumed by the components.

## Project Structure

```
src/
├── app/[locale]/          # Pages (home, faq, team, resources, book-your-event, etc.)
├── components/            # Shared components (navbar, footer, cookie-consent, analytics)
├── data/                  # Generated content.json
├── i18n/                  # Routing and request config for next-intl
messages/                  # Translation files (en.json, nl.json, fr.json)
data/                      # Content Management Excel (private, not served)
scripts/                   # Content generation script
public/                    # Static assets (images, logos)
```

## Features

- Fully responsive design matching the original CyberXP site
- Three-language support (English, Dutch, French) with persistent cookie
- Cookie consent banner with Google Analytics GA4 + Consent Mode v2
- Event booking form with webhook integration and email fallback
- Resource cards with external link confirmation popup
- Testimonials carousel
- Infinite-scrolling partner logos
- Photo gallery with CTA section
- Many other things

## Deployment

```bash
npm run build
npm start
```

## License

All rights reserved — CSC ASBL/VZW.
