# T007 Docking Rendering

Status: `Not Started`

## Goal

Render the first-person docking scenario in React Three Fiber.

## Context

React Three Fiber should render docking state and map input commands. Docking rules must remain in T006 simulation code.

## Dependencies

- T006 Docking Simulation.

## Implementation Notes

Add:

- First-person spacecraft or capsule viewpoint.
- Docking target visualization.
- Alignment guides.
- HUD for distance, relative velocity, orientation, translation, and rotation.
- Keyboard controls for RCS translation and rotation.

Use placeholder geometry unless a documented asset is already available in `docs/ASSETS.md`.

## Acceptance Criteria

- Docking is playable from initial approach to success or failure.
- React Three Fiber layer contains no authoritative gameplay rules.
- HUD reads from docking simulation state.
- Controls dispatch simulation commands.
- Scene is readable at desktop and mobile-sized viewport dimensions.

## Required Tests

- Prefer simulation tests from T006 for rule coverage.
- Add UI smoke tests if the scaffold supports them reliably.

## Handoff Notes

After completion, docking is playable but scoring and tutorial may still be absent.
