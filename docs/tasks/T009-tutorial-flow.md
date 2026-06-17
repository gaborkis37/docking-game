# T009 Tutorial Flow

Status: `Not Started`

## Goal

Add concise in-game tutorial guidance for launch and docking.

## Context

Tutorial UI should feel like mission instrumentation, not a marketing page. It should teach the controls and objectives needed to complete V1.

## Dependencies

- T005 Launch Rendering.
- T007 Docking Rendering.
- T008 Scoring and Persistence.

## Implementation Notes

Teach launch concepts:

- Throttle.
- Pitch.
- Staging.
- Orbit target.

Teach docking concepts:

- Translation.
- Rotation.
- Relative velocity.
- Alignment.
- Safe contact.

Persist tutorial progress through the persistence layer from T008.

## Acceptance Criteria

- First-time player can learn the core controls in-game.
- Tutorial progress persists.
- Tutorial content is concise and integrated into the game UI.
- No marketing-style landing page is added.

## Required Tests

- Tutorial progress persists.
- Completed tutorial steps are not repeated unless reset.
- Tutorial state does not affect simulation correctness.

## Handoff Notes

After completion, T010 can focus on final visual direction and asset documentation.
