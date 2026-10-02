# Harshana Jothi portfolio

Two connected views of one portfolio:
- `/`: Digital Marketing
- `/ai/`: AI & Automation, with an external link to Axiom Labs

The active UI lives in `src/portfolio/`. Older components, static modes and original media remain in the repository for reference but are not part of the current build.

## Run

Node 24 is used for the function tests.

```sh
npm ci
npm run build
npm run lint:portfolio
npm test
npx netlify dev --no-open
```

`netlify dev` serves the UI and the prepared-answer guide at `/api/portfolio-guide`. The guide is explicitly not a generative AI service. It needs no API credentials, does not log messages and does not send questions to an AI provider.

## Build and media

`prepare-media.mjs` converts a small explicit selection of existing work to responsive WebP images and web-encoded MP4 videos. Original media stays under `public/`; Vite deliberately uses `portfolio-public/`, so the raw media, old pages and private notes are not published. The short hero edit plays muted when in view, with a pause control and reduced-motion support. Archive videos load only when opened. `prepare-story.mjs` preserves the original video and raster-image collection, builds portrait and triptych reels, and restores the original terminal intro with the two current discipline choices. The two views share a dark palette and self-hosted typography.

`post-build.js` produces the second entry page, canonical and sharing metadata, robots.txt, sitemap.xml and a useful 404 page. Both views share one JS/CSS asset set. Netlify redirects the old creative, professional and brutal routes.

## Content rules

- Project statuses must reflect the evidence available.
- No invented figures, clients, screenshots or testimonials.
- Campaign selections are labelled DEMO; exploratory visuals CONCEPT.
- Axiom's site is live, but its catalogue jobs remain CONCEPT until built.
- OBITER is PILOT and the front-desk workflow PROTOTYPE, matching Axiom Labs.
- The old 70-to-300 follower calculation corresponds to about 329% growth, not 429%. Headline performance claims were removed pending primary evidence.
- Employment dates conflicted between the earlier views. They are omitted pending an approved résumé.
- At the owner's request, résumé links open an email request. No PDF is fabricated.

## Deployment

Existing Netlify project: `harshanajothidotcomwastaken`
Site ID: `53b5f20b-0866-4af9-a389-742f9a64f8bc`

```sh
npm run build
npx netlify deploy --dir=dist --functions=netlify/functions --no-build
```

This makes a draft. Production uses `--prod` only after visual review. Only `dist/` and the one guide function are deployed. Axiom Labs is a separate website and is not changed by this build.
