# Aureon Capital Limited Website

A marketing and insights site for **AUREON CAPITAL LIMITED**, built with Next.js 14 and Tailwind CSS. The design language has been
refreshed to mirror the editorial style of Bridgewater Associates—balancing institutional gravitas, research-first storytelling,
and high-contrast typography.

## Key Features
- **Hero narrative** highlighting Aureon Capital's strategic intelligence mandate.
- **Research-driven homepage** surfaces featured insights, engagement model, and leadership perspectives.
- **Structured service catalogue** outlining advisory pillars, engagement process, and value outcomes.
- **Updated insights library** with category tags, read-time metadata, and rich article layout.
- **Responsive navigation and footer** echoing Bridgewater's compositional rhythm with disciplined typography and spacing.

## Tech Stack
- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for Inter & Playfair Display

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.
3. **Lint the project**
   ```bash
   npm run lint
   ```

## Project Structure
```
app/            # App Router pages and layouts
components/     # Shared UI components (navigation, footer)
content/        # Structured content for insights
public/         # Static assets (if required)
```

## Customisation Notes
- Palette and typography are centralised in `tailwind.config.js` and `app/globals.css`.
- Content for the Insights section lives in `content/posts.js` and can be expanded with new entries.
- The homepage pulls the first three posts as featured research items—update ordering to highlight specific insights.
- For visual parity with Bridgewater's site, maintain the use of serif headings (Playfair Display) and uppercase eyebrow labels.

## Deployment
The site is production-ready with static optimisation for content pages. Deploy via your preferred platform (e.g. Vercel,
Netlify) by running:
```bash
npm run build
```
and following the platform-specific deployment instructions.
