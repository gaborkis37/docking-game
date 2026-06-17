# T002 Project Scaffold

Status: `Review Ready`

## Goal

Initialize the React, TypeScript, and Vite application with baseline tooling and empty screen shells.

## Context

This is the first code-producing task. The project currently has documentation only. Keep the scaffold minimal and avoid implementing gameplay rules.

## Dependencies

- T001 Tracking Foundation.

## Implementation Notes

Create a Vite React TypeScript app in the repo root.

Add or configure:

- Strict TypeScript settings.
- Vitest for tests.
- React Testing Library if useful for app shell tests.
- Phaser.
- Three.js.
- React Three Fiber.
- Zustand or an equivalent lightweight state library.

Add empty app screens or routes for:

- Launch.
- Docking.
- Results.
- Tutorial.
- Settings.

Implemented so far:

- Initialized a git repository.
- Added Vite-style React TypeScript scaffold files.
- Added strict TypeScript config.
- Added Vitest config and app shell smoke tests.
- Added required dependencies to `package.json`.
- Added empty screen shells for launch, docking, results, tutorial, and settings.
- Added a minimal Zustand app-shell store for screen selection.

Node and npm are available via `/usr/local/bin`. The command sandbox did not include that directory on PATH by default, so verification commands were run with `/usr/local/bin` prepended to PATH.

## Acceptance Criteria

- App starts locally.
- Test command runs.
- TypeScript check passes.
- Empty screen shells render.
- No gameplay rules are implemented.
- No launch or docking simulation code is implemented.

## Required Tests

- Add only minimal smoke tests if the scaffold supports them.
- Do not add gameplay tests in this task.

## Verification

Passed:

```sh
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm install --cache /private/tmp/docking-game-npm-cache
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run typecheck
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run test
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run build
```

Notes:

- npm reports 5 dependency audit vulnerabilities in the installed dependency tree. No forced audit fix was applied because it may introduce breaking dependency changes and is outside this scaffold task.

## Handoff Notes

T002 is ready for review. The next task will be T003 Simulation Core after review.
