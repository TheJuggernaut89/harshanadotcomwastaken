# Portfolio: film-led revision, 2 October 2026

The owner requested the original terminal intro, the previous résumé's dark colours shared by both disciplines, retained media, a video-led hero, more storytelling and distinctive typography. This supersedes the first light editorial draft.

## Implemented

- Original terminal animation restored from its source, with the two current discipline choices, a visible skip control, once-per-session playback and a replay option. Reduced motion goes straight to selection. The original theatrical boot copy remains inside the labelled interactive intro.
- Shared charcoal, teal, cream and warm orange palette. Self-hosted Barlow Condensed headlines, Space Grotesk body and IBM Plex Mono labels.
- Twelve-second triptych reel for larger screens and a portrait edit for phones, made from the existing footage. Muted playback, pause/play, off-screen pausing and reduced-motion support.
- All 20 original videos and 50 raster images preserved in an on-demand collection with filters and full-size playback.
- Section reveals, title entrances and reading progress. Native scrolling; no forced scroll or locked story stops. Motion can be disabled in the footer.
- Expanded experience in marketing, nature tourism, customer service, security and Axiom Labs; education, tools, project responsibilities and honest status labels retained.
- Résumé links continue to request a copy by email. Employment dates remain omitted because the earlier versions conflict.
- Separate Digital Marketing and AI & Automation URLs, common identity, Axiom Labs external business link and prepared-answer guide retained.

## Verification

Build, active UI lint and eight regression tests pass. The tests cover guide validation, résumé contact, metadata, project assets, intro script syntax and routing, complete video inventory and dark-palette text contrast. The two hero encodes each stay below 6 MB. The archive is about 87 MB in total and does not download upfront.

Phone/desktop rendering, keyboard behaviour and animation smoothness are not visually verified. Browser access was rejected by automatic approval review for an account usage limit, followed by rejection of a retry. No browser bypass was attempted for this revision. Production remains unchanged pending visual review.

The portfolio checkout is independent of the Axiom Labs website. No Axiom site files were changed.

## Selected films update

The owner supplied four films and requested two social edits first, followed by Hogan CKB and July CKB. The marketing view now leads with three screening cards: one for each social edit, then a paired CKB feature. Original square and portrait framing is retained. Muted eight-second previews load near the viewport; full films with sound load on opening the screening dialog. Original case studies remain available in an expandable section. Optimised supplied media lives in public/selected-films; large supplied source copies are local review material and are not committed. Build, lint and the existing regression suite passed. Browser visual verification remains pending.

## 5 October: 21st.dev background integration

Resumed the interrupted Background Paths adaptation from Kokonut UI by Dorian Baffier, discovered on 21st.dev. The upstream MIT licence is included in the deployed /licenses/kokonut-ui.txt. Shared dark teal and warm orange contours, edge masking, a fine grain layer and page rules replace the flat background. Text-heavy sections retain dark backings. Phone layouts use fewer paths; motion stops when disabled, during the intro and in hidden browser tabs. No new runtime dependency was required. The user previously authorised replacing the live portfolio and subsequent updates have been published there. Visual browser verification remains unavailable under the earlier approval block.

## 5 October: Axiom CTA and GSAP revision

Replaced the oversized arrow-only Axiom feature with a direct Explore Axiom Labs link and a separate role/approach button. The live website and concept-stage catalogue are distinguished in visible copy. Headings and project entrances now use GSAP with ScrollTrigger and context cleanup. Background drift, drawn contours and ornamental frame corners were removed to reduce competing effects. Motion-off keeps text visible. Build, lint and eight regression checks passed; browser visual verification remains blocked as recorded above.

## 5 October: visual storytelling

Rebuilt the opening around the supplied portrait and a clear professional introduction. Three visual chapters connect experience with people, creative production and automation, using existing nature imagery, the film reel and an explicitly illustrative workflow. GSAP drives chapter entrances and reading lines without forcing scroll position. Chapter links and hiring shortcuts remain available; mobile scenes stack naturally. Selected projects, media, experience, education and contacts are preserved. Build, lint and regression checks are used; browser visual verification remains pending.
