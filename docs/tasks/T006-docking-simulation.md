# T006 Docking Simulation

Status: `Not Started`

## Goal

Implement first-person docking rules and six-degree-of-freedom motion.

## Context

The docking simulation must be independently testable and must not depend on React Three Fiber or Three.js rendering.

## Dependencies

- T003 Simulation Core.

## Implementation Notes

Track at minimum:

- Relative position.
- Relative velocity.
- Orientation.
- Angular velocity.
- Target docking orientation.
- Distance.
- Alignment error.
- Contact angle.
- Elapsed time.

Support controls for:

- Translate forward/back.
- Translate left/right.
- Translate up/down.
- Rotate pitch.
- Rotate yaw.
- Rotate roll.

Docking validation must account for:

- Distance/contact threshold.
- Relative velocity tolerance.
- Alignment tolerance.
- Orientation tolerance.
- Contact angle tolerance.

## Acceptance Criteria

- Docking simulation runs without rendering.
- Six-degree-of-freedom commands affect state predictably.
- Docking success and failure are explicit events or states.
- Tolerances are centralized and easy to test.

## Required Tests

- Relative velocity is calculated correctly.
- Docking succeeds within tolerance.
- Docking fails with excessive velocity.
- Docking fails with excessive alignment error.
- Docking fails with invalid orientation or contact angle.
- RCS input changes translation and rotation predictably.

## Handoff Notes

After completion, T007 Docking Rendering can consume this simulation state.
