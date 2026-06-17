# Space Docking Game Roadmap

This roadmap is the source of truth for V1 task progress. Work one task at a time, update the active task file, then update this file and `docs/AGENT_HANDOFF.md`.

## Status Values

- `Not Started`
- `In Progress`
- `Blocked`
- `Review Ready`
- `Done`

## Current State

- Project brief exists at `space-docking-game-project-brief-v2.md`.
- Git repository has been initialized.
- App scaffold files exist.
- Dependencies are installed and locked.
- T002 is done.
- T003 is done.
- Next tasks: T004 Launch Simulation and T006 Docking Simulation.

## V1 Task Index

| Task                                                                | Status       | Depends On       | Summary                                                                      |
| ------------------------------------------------------------------- | ------------ | ---------------- | ---------------------------------------------------------------------------- |
| [T001 Tracking Foundation](tasks/T001-tracking-foundation.md)       | Review Ready | None             | Create trackable docs and task files for multi-agent work.                   |
| [T002 Project Scaffold](tasks/T002-project-scaffold.md)             | Done         | T001             | Initialize React, TypeScript, Vite, tooling, and empty screen shells.        |
| [T003 Simulation Core](tasks/T003-simulation-core.md)               | Done         | T002             | Add browser-independent simulation types, update loop, commands, and events. |
| [T004 Launch Simulation](tasks/T004-launch-simulation.md)           | Not Started  | T003             | Implement simplified launch physics, fuel, staging, and orbit detection.     |
| [T005 Launch Rendering](tasks/T005-launch-rendering.md)             | Not Started  | T004             | Render playable 2D launch phase in Phaser.                                   |
| [T006 Docking Simulation](tasks/T006-docking-simulation.md)         | Not Started  | T003             | Implement six-degree-of-freedom docking rules and validation.                |
| [T007 Docking Rendering](tasks/T007-docking-rendering.md)           | Not Started  | T006             | Render first-person docking in React Three Fiber.                            |
| [T008 Scoring and Persistence](tasks/T008-scoring-persistence.md)   | Not Started  | T004, T006       | Add scoring and versioned localStorage persistence.                          |
| [T009 Tutorial Flow](tasks/T009-tutorial-flow.md)                   | Not Started  | T005, T007, T008 | Add guided launch and docking tutorial flow.                                 |
| [T010 Visual Assets and Polish](tasks/T010-visual-assets-polish.md) | Not Started  | T005, T007, T009 | Apply aerospace visual polish and document asset licenses.                   |

## Milestones

| Milestone           | Tasks     | Exit Criteria                                                                                     |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| Planning foundation | T001      | Agents can identify the next task, status, dependencies, and review criteria from repo docs.      |
| App foundation      | T002-T003 | App runs, tests run, strict TypeScript passes, and simulation code is independent from rendering. |
| Launch playable     | T004-T005 | Player can launch, stage, reach orbit, and transition to docking.                                 |
| Docking playable    | T006-T007 | Player can complete or fail a first-person docking attempt.                                       |
| V1 complete         | T008-T010 | Scoring, persistence, tutorial, documented assets, and visual direction are in place.             |

## Working Rules for Agents

- Read `docs/AGENT_HANDOFF.md` first.
- Work only on the next unblocked task unless the user explicitly changes priority.
- Keep gameplay logic out of React, Phaser, and React Three Fiber render layers.
- Update only the task file being worked on, this roadmap, and `docs/AGENT_HANDOFF.md` unless the task requires code or other docs.
- Mark a task `Review Ready` when implementation and verification are complete.
- Mark a task `Done` only after review or explicit user approval.
