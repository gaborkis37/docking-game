# T005 Launch Rendering

Status: `Not Started`

## Goal

Render the playable 2D launch phase in Phaser.

## Context

Phaser should handle display, scene lifecycle, animation, and input mapping only. Authoritative launch rules must remain in the launch simulation from T004.

## Dependencies

- T004 Launch Simulation.

## Implementation Notes

Add:

- Launch pad view.
- Rocket ascent visualization.
- Stage separation feedback.
- Atmosphere-to-space visual transition.
- HUD for altitude, velocity, throttle, fuel, stage, and pitch.
- Transition to docking when launch simulation emits orbit achieved.

Use placeholder geometry unless a documented asset is already available in `docs/ASSETS.md`.

## Acceptance Criteria

- Launch can be played from pad to orbit.
- Phaser scene does not contain authoritative gameplay rules.
- HUD values come from launch simulation state.
- Orbit achievement transitions to docking mode.

## Required Tests

- Prefer simulation tests over Phaser tests.
- Add a lightweight UI or integration smoke test only if the scaffold supports it reliably.

## Handoff Notes

After completion, launch is playable but scoring and tutorial may still be absent.
