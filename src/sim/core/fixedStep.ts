import type { SimulationResult, SimulationUpdate } from "./types";

export type FixedStepOptions<TState, TCommand, TEvent> = Readonly<{
  state: TState;
  commands: readonly TCommand[];
  frameDeltaSeconds: number;
  fixedDeltaSeconds: number;
  update: SimulationUpdate<TState, TCommand, TEvent>;
  accumulatorSeconds?: number;
  maxSteps?: number;
}>;

export type FixedStepResult<TState, TEvent> = SimulationResult<TState, TEvent> &
  Readonly<{
    accumulatorSeconds: number;
    stepsRun: number;
  }>;

const DEFAULT_MAX_STEPS = 5;

export function runFixedSteps<TState, TCommand, TEvent>({
  state,
  commands,
  frameDeltaSeconds,
  fixedDeltaSeconds,
  update,
  accumulatorSeconds = 0,
  maxSteps = DEFAULT_MAX_STEPS,
}: FixedStepOptions<TState, TCommand, TEvent>): FixedStepResult<
  TState,
  TEvent
> {
  if (fixedDeltaSeconds <= 0) {
    throw new Error("fixedDeltaSeconds must be greater than zero");
  }

  if (frameDeltaSeconds < 0) {
    throw new Error("frameDeltaSeconds must be greater than or equal to zero");
  }

  if (accumulatorSeconds < 0) {
    throw new Error("accumulatorSeconds must be greater than or equal to zero");
  }

  if (maxSteps < 1) {
    throw new Error("maxSteps must be at least one");
  }

  let nextState = state;
  let nextAccumulator = accumulatorSeconds + frameDeltaSeconds;
  let stepsRun = 0;
  const events: TEvent[] = [];

  while (nextAccumulator >= fixedDeltaSeconds && stepsRun < maxSteps) {
    const result = update({
      state: nextState,
      commands,
      deltaSeconds: fixedDeltaSeconds,
    });

    nextState = result.state;
    events.push(...result.events);
    nextAccumulator -= fixedDeltaSeconds;
    stepsRun += 1;
  }

  return {
    state: nextState,
    events,
    accumulatorSeconds: nextAccumulator,
    stepsRun,
  };
}
