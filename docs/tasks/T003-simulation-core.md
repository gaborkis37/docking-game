# T003 Simulation Core

Status: `Not Started`

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

## Acceptance Criteria

- Simulation core can run in Vitest without browser rendering.
- Types and helpers are documented through clear names and focused tests.
- `docs/ARCHITECTURE.md` is updated if implementation differs from the planned shape.

## Required Tests

- Fixed-step helper advances expected time steps.
- Events can be returned without mutating renderer state.
- Core module imports remain independent from rendering libraries.

## Handoff Notes

After completion, T004 Launch Simulation and T006 Docking Simulation can proceed independently.
