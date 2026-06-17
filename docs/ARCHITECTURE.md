# Architecture Notes

This document records architecture decisions that future tasks must preserve.

## Core Boundary

Game simulation must be completely separated from rendering.

Simulation code must:

- Run without React.
- Run without Phaser.
- Run without Three.js or React Three Fiber.
- Run without a browser DOM or Canvas.
- Be unit-testable in Vitest.

Rendering code must:

- Consume simulation state snapshots.
- Convert user input into simulation commands.
- Avoid owning authoritative gameplay rules.

## Planned Stack

- React for application shell, screen flow, settings, tutorial UI, and results UI.
- TypeScript with strict settings.
- Vite for build and dev server.
- Phaser for the 2D launch phase.
- Three.js and React Three Fiber for the 3D docking phase.
- Zustand or equivalent lightweight state management.
- `localStorage` for V1 persistence.
- Vitest for simulation and scoring tests.

## Planned App Flow

1. Start or tutorial screen.
2. Launch phase.
3. Orbit achievement transition.
4. Docking phase.
5. Results screen.
6. Retry, settings, tutorial, or restart.

## Planned Data Flow

1. UI or renderer captures input.
2. Input is converted to simulation commands.
3. Fixed-step simulation update produces new state and events.
4. Rendering consumes the new state.
5. Events update app flow, scoring, persistence, or tutorial progress.

## Planned Simulation Shape

Use simple shared interfaces similar to:

```ts
type SimulationStep<TState, TInput> = {
  state: TState;
  input: TInput;
  deltaSeconds: number;
};

type SimulationResult<TState, TEvent> = {
  state: TState;
  events: TEvent[];
};
```

These exact names may change during implementation, but the boundary must remain.

## Launch Simulation Scope

The launch phase should be game-like but believable. It does not need full orbital mechanics.

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

Include:

- Fuel burn.
- Simplified thrust.
- Simplified gravity.
- Simplified drag.
- Stage separation.
- Orbit achievement thresholds.
- Failure states.

## Docking Simulation Scope

The docking phase should support six-degree-of-freedom control.

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

Docking success must depend on:

- Distance/contact threshold.
- Relative velocity tolerance.
- Alignment tolerance.
- Orientation tolerance.
- Contact angle tolerance.

## Persistence Scope

V1 persistence is client-side only.

Persist:

- Settings.
- Tutorial progress.
- Best scores.
- Fastest docking times.
- Control preferences.

Use a versioned save schema so future migrations are possible.
