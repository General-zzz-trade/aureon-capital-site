# Aureon Capital Limited Website

A marketing and insights site for **AUREON CAPITAL LIMITED**, built with Next.js 14 and Tailwind CSS. The design language has been
refreshed to mirror the editorial style of Bridgewater Associates—balancing institutional gravitas, research-first storytelling,
and high-contrast typography.

## Key Features
- **Hero narrative** highlighting Aureon Capital's strategic intelligence mandate.
- **Research-driven homepage** surfaces featured insights, engagement model, programmes, and ecosystem partnerships.
- **Structured service catalogue** outlining advisory pillars, acceleration layers, and engagement process.
- **Expanded insights library** with category tags, read-time metadata, and rich article layout.
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

## Content Management
- Palette and typography are centralised in `tailwind.config.js` and `app/globals.css`.
- Homepage content (programmes, ecosystem, differentiators) is defined in `app/page.js`.
- Service offerings and acceleration layers live in `app/services/page.js`.
- Company narrative, leadership structures, and milestones are located in `app/about/page.js`.
- Contact information, regional desks, and collaboration guidance are maintained in `app/contact/page.js`.
- Insight articles reside in `content/posts.js`. Duplicate the existing structure to add new posts; each entry accepts HTML strings for rich formatting.

## Deployment
The site is production-ready with static optimisation for content pages. Deploy via your preferred platform (e.g. Vercel,
Netlify) by running:
```bash
npm run build
```
and following the platform-specific deployment instructions.
