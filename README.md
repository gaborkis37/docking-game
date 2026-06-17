# Space Docking Game

A browser-based spaceflight and docking game prototype built with React, TypeScript, and Vite.

The project goal is to combine a simplified 2D launch-to-orbit sequence with a realistic-feeling first-person spacecraft docking simulation. Gameplay logic is intended to stay separate from rendering so the simulation can be tested independently.

## Planned Experience

- 2D rocket launch from Earth with throttle, pitch, fuel use, staging, and orbit achievement.
- Transition from orbit into a 3D first-person docking scenario.
- Docking controls for translation and rotation across six degrees of freedom.
- Docking success based on distance, alignment, orientation, relative velocity, and contact angle.
- Scoring, tutorial progress, settings, and control preferences saved locally.

## Tech Stack

- React
- TypeScript
- Vite
- Phaser for the 2D launch phase
- Three.js and React Three Fiber for the 3D docking phase
- Zustand for lightweight app state
- Vitest for tests
- localStorage for V1 persistence

## How To Run

Install dependencies:

```sh
npm install
```

Start the local dev server:

```sh
npm run dev
```

Run checks:

```sh
npm run typecheck
npm run test
npm run build
```

If your shell does not find `node` or `npm`, prepend the common macOS install paths:

```sh
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH npm run dev
```

## Project Docs

Planning and task tracking live in `docs/`:

- `docs/ROADMAP.md`
- `docs/AGENT_HANDOFF.md`
- `docs/ARCHITECTURE.md`
- `docs/tasks/`
