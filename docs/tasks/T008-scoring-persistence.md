# T008 Scoring and Persistence

Status: `Not Started`

## Goal

Add scoring and local save data for V1.

## Context

Persistence is client-side only. No backend, accounts, cloud saves, payments, or multiplayer should be introduced.

## Dependencies

- T004 Launch Simulation.
- T006 Docking Simulation.

## Implementation Notes

Scoring should consider:

- Docking success or failure.
- Docking time.
- Relative velocity at contact.
- Alignment accuracy.
- Orientation accuracy.
- RCS or fuel usage if implemented by earlier tasks.

Persist:

- Settings.
- Tutorial progress.
- Best scores.
- Fastest docking times.
- Control preferences.

Use a versioned localStorage schema and safe fallback behavior for invalid or corrupt data.

## Acceptance Criteria

- Scoring is deterministic and testable.
- Best score updates only when better.
- Fastest docking time updates only after successful docking.
- Invalid save data falls back safely.
- No backend is added.

## Required Tests

- Better docking produces a better score.
- Unsafe docking fails or receives a penalty.
- Best score updates only when better.
- Fastest time updates only after successful docking.
- Invalid localStorage data falls back safely.

## Handoff Notes

After completion, T009 Tutorial Flow can persist tutorial progress.
