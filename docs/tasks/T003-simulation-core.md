# T003 Simulation Core

Status: `Done`

## Goal

Create browser-independent simulation foundations used by launch, docking, and scoring logic.

## Context

All gameplay logic must remain independent from rendering. This task defines the shared simulation shape before feature-specific simulation work begins.

## Dependencies

- T002 Project Scaffold.

## Implementation Notes

Add simulation core under a source structure chosen during T002, likely `src/sim`.

Include:

- Shared simulation step/result types.
- Fixed-step update helper.
- Input-command pattern.
- Event-output pattern.
- Test helpers for simulation modules if useful.

The simulation core must not import:

- React.
- Phaser.
- Three.js.
- React Three Fiber.
- Browser DOM APIs.

Implemented:

- Added shared simulation command, event, step, result, and update types in `src/sim/core`.
- Added a renderer-agnostic fixed-step runner.
- Added focused tests for fixed-step advancement, event output, source-state immutability, and forbidden rendering/browser imports.
- Added `@types/node` as a dev dependency for source-inspection tests.

## Acceptance Criteria

- Simulation core can run in Vitest without browser rendering.
- Types and helpers are documented through clear names and focused tests.
- `docs/ARCHITECTURE.md` is updated if implementation differs from the planned shape.

## Required Tests

- Fixed-step helper advances expected time steps.
- Events can be returned without mutating renderer state.
- Core module imports remain independent from rendering libraries.

## Verification

Passed:

```sh
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run typecheck
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run test
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run build
```

Notes:

- npm still reports 5 dependency audit vulnerabilities from the installed dependency tree. No forced audit fix was applied.

## Handoff Notes

T003 has been reviewed and marked done. T004 Launch Simulation and T006 Docking Simulation can proceed independently.
