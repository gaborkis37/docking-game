# T004 Launch Simulation

Status: `Not Started`

## Goal

Implement simplified but believable launch physics, staging, and orbit achievement logic.

## Context

The launch simulation must be independently testable and must not depend on Phaser or React.

## Dependencies

- T003 Simulation Core.

## Implementation Notes

Track at minimum:

- Altitude.
- Vertical velocity.
- Horizontal velocity.
- Pitch angle.
- Throttle.
- Mass.
- Active stage.
- Fuel per stage.
- Mission time.

Implement:

- Throttle input.
- Pitch input or guided pitch profile.
- Fuel burn based on throttle.
- Simplified thrust.
- Simplified gravity.
- Simplified atmospheric drag.
- Stage separation.
- Orbit achievement thresholds.
- Launch failure states.

Emit events for:

- Fuel exhausted.
- Stage separated.
- Orbit achieved.
- Launch failed.

## Acceptance Criteria

- Launch simulation runs without rendering.
- Stage separation changes active stage and mass.
- Orbit detection uses altitude and velocity thresholds.
- Failure states are explicit and testable.

## Required Tests

- Fuel decreases while throttle is above zero.
- Fuel does not decrease at zero throttle.
- Stage separates when fuel is exhausted or a valid separation command is issued.
- Orbit is achieved only when altitude and velocity thresholds are met.
- Launch failure conditions are detected.

## Handoff Notes

After completion, T005 Launch Rendering can consume this simulation state.
