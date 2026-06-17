# T010 Visual Assets and Polish

Status: `Not Started`

## Goal

Apply aerospace-oriented visual polish and document any non-placeholder assets.

## Context

Gameplay must remain the priority. Do not spend significant effort on custom art until launch and docking are playable.

## Dependencies

- T005 Launch Rendering.
- T007 Docking Rendering.
- T009 Tutorial Flow.

## Implementation Notes

Use the visual direction from the brief:

- Charcoal.
- Off-white.
- Muted amber.
- Muted cyan.
- Muted red for warnings.

Avoid:

- Purple gradients.
- Neon cyberpunk themes.
- Glassmorphism.
- Floating SaaS cards.
- ChatGPT-inspired layouts.

Prefer:

- NASA Mission Control.
- Apollo-era interfaces.
- ISS docking displays.
- Aerospace instrumentation.
- Flight simulators.

Document every non-placeholder asset in `docs/ASSETS.md` with source URL, license, author or credit, usage, and notes.

## Acceptance Criteria

- UI feels functional, aerospace-oriented, and trustworthy.
- Text and controls remain readable.
- All non-placeholder assets have documented source and license.
- Gameplay remains clear on desktop and mobile-sized viewports.

## Required Tests

- Run the normal app verification from prior tasks.
- Manually inspect launch, docking, tutorial, settings, and results views.
- Verify `docs/ASSETS.md` is complete for all non-placeholder assets.

## Handoff Notes

This is the final planned V1 task. Any new scope should be added as a new task after T010 rather than expanding this one indefinitely.
