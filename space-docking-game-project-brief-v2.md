# Space Docking Game - Project Brief

## Vision

Create a browser-based spaceflight and docking game consisting of:

1. A 2D launch-to-orbit sequence with staging and recognizable Earth rocket concepts.
2. A realistic-feeling first-person docking simulation inspired by real ISS docking procedures.
3. A clean, maintainable, testable TypeScript codebase suitable for long-term expansion.

---

## Core Principles

### Engineering

- Write minimal, clean, testable code.
- Prefer simple solutions over complex abstractions.
- Avoid premature optimization.
- Avoid unnecessary dependencies.
- Use strict TypeScript settings.
- Follow SOLID principles where appropriate.
- All gameplay logic must be independently testable.

### Architecture

Game simulation MUST be completely separated from rendering.

The simulation engine should:

- Run independently from React.
- Be executable without a browser.
- Support unit testing without graphics.

Rendering layers consume simulation state but never contain game logic.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite

### 2D Launch Phase

Choose one:

- Phaser (preferred)
- PixiJS

### 3D Docking Phase

- Three.js
- React Three Fiber

### State Management

Keep simple:

- Zustand or equivalent lightweight solution

### Persistence

Client-side only:

- localStorage

Store:

- settings
- tutorial progress
- best scores
- fastest docking times
- control preferences

No backend in V1.

---

## Version 1 Scope

### Included

- Launch pad
- Rocket launch
- Staging
- Orbit achievement
- Transition to docking scenario
- 3D first-person docking
- Scoring
- Tutorial
- Local save data

### Excluded

- Accounts
- Login
- Multiplayer
- Backend services
- Cloud saves
- Payments
- Complex career mode

---

## Launch Phase

### Goals

Game-like but believable.

### Features

- Earth launch pad
- Atmospheric ascent
- Throttle control
- Pitch program
- Fuel consumption
- Stage separation
- Orbit achievement conditions

Physics may be simplified.

The objective is educational and fun rather than a full orbital simulator.

---

## Docking Phase

### Goals

Provide the feeling of a real spacecraft docking operation.

### Features

- First-person perspective
- Docking target visualization
- Relative velocity display
- Distance display
- Alignment indicators
- RCS translation controls
- Rotation controls

Six Degrees of Freedom:

Translation:

- Forward / backward
- Left / right
- Up / down

Rotation:

- Pitch
- Yaw
- Roll

### Docking Rules

Success depends on:

- Alignment
- Relative velocity
- Orientation
- Distance
- Contact angle

---

## Asset Strategy

### Requirement

The agent must either:

1. Obtain assets from approved public sources.

OR

2. Stop and provide exact instructions for obtaining missing assets.

Never invent asset sources.

### Preferred Sources

- NASA public-domain imagery
- ESA media resources
- Public-domain textures
- Openly licensed low-poly spacecraft models

### Development Priority

Gameplay first.

Do not spend significant effort creating custom art until gameplay is validated.

---

## Visual Design Direction

Avoid generic AI startup aesthetics.

Do NOT use:

- Purple gradients
- Neon cyberpunk themes
- Glassmorphism
- Floating SaaS cards
- ChatGPT-inspired layouts

### Inspiration

- NASA Mission Control
- Apollo-era interfaces
- ISS docking displays
- Aerospace instrumentation
- Flight simulators

### Color Palette

Primary:

- Charcoal
- Off-white

Secondary:

- Muted amber
- Muted cyan

Warnings:

- Muted red

Design should feel functional, aerospace-oriented, and trustworthy.

---

## Testing Requirements

Unit tests required for:

- Stage separation
- Fuel consumption
- Orbit achievement logic
- Relative velocity calculations
- Docking validation
- Scoring

Examples:

- Docking succeeds within tolerance
- Docking fails with excessive velocity
- Stage separates when fuel exhausted
- Orbit conditions correctly detected

---

## Analytics

Collect only minimal privacy-friendly metrics.

Recommended:

- Cloudflare Web Analytics

Track:

- Unique visitors
- Page views
- Referrers
- Countries
- Device types

Avoid:

- Heavy analytics platforms
- Excessive tracking
- User profiling

No account system required.

---

## SEO Requirements

The site should be discoverable through Google search.

### Technical SEO

Include:

- Sitemap
- robots.txt
- Canonical URLs
- Open Graph tags
- Twitter/X metadata
- Structured metadata where appropriate

### Performance

Target:

- Lighthouse 90+
- Fast loading
- Optimized assets
- Mobile-friendly layout

### Content

Prepare pages that can rank for searches such as:

- space docking simulator
- ISS docking game
- spacecraft docking trainer
- orbital rendezvous simulator
- learn spacecraft docking
- docking practice game

The homepage should clearly explain:

- What the game is
- How docking works
- Why it is educational and fun

---

## Deployment

### Requirements

Deploy as static assets.

Build command:

npm run build

No server required.

### Preferred Hosting

1. Vercel
2. Cloudflare Pages
3. Netlify

### Domain

Custom domain support required.

HTTPS required.

### Cost Goal

Initial operating cost:

- Hosting: $0
- Backend: $0
- Database: $0

Only domain registration should incur cost.

---

## Development Order

1. Project setup
2. Simulation engine
3. Launch prototype
4. Staging implementation
5. Orbit achievement logic
6. Docking sandbox
7. Mission flow integration
8. Tutorial
9. Scoring
10. Analytics
11. SEO optimization
12. Final polish

---

## Success Criteria

Version 1 is successful when a player can:

1. Launch a rocket.
2. Reach orbit.
3. Transition into a docking scenario.
4. Dock successfully using 6DOF controls.
5. Complete the experience entirely in the browser.
