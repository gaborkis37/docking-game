# T004 Launch Simulation

Status: `Done`

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

Implemented:

- Added `src/sim/launch` with launch state, stage, environment, command, and event types.
- Added default two-stage launch state and environment thresholds.
- Added `updateLaunchSimulation` with throttle, pitch, fuel burn, simplified thrust, gravity, drag, staging, orbit detection, and failure detection.
- Added helpers for launch mass and orbit-threshold checks.
- Added tests for fuel burn, zero-throttle behavior, staging, orbit detection, failure states, and rendering/browser import boundaries.

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

## Verification

Passed:

```sh
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run typecheck
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run test
PATH=/usr/local/bin:/opt/homebrew/bin:$PATH /usr/local/bin/npm run build
```

Notes:

- No rendering code was added.
- npm still reports dependency audit vulnerabilities from the installed dependency tree. No forced audit fix was applied.

## Handoff Notes

T004 has been reviewed and marked done. T005 Launch Rendering can consume this simulation state.
