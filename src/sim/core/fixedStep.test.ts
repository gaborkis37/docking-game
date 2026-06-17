import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { runFixedSteps } from './fixedStep';
import type { SimulationCommand, SimulationEvent, SimulationUpdate } from './types';

type CounterState = Readonly<{
  elapsedSeconds: number;
  value: number;
}>;

type CounterCommand = SimulationCommand<'add', { value: number }>;
type CounterEvent = SimulationEvent<'advanced', { value: number }>;

const updateCounter: SimulationUpdate<CounterState, CounterCommand, CounterEvent> = ({
  state,
  commands,
  deltaSeconds
}) => {
  const commandTotal = commands.reduce((total, command) => total + command.payload.value, 0);
  const value = state.value + commandTotal + 1;

  return {
    state: {
      elapsedSeconds: state.elapsedSeconds + deltaSeconds,
      value
    },
    events: [
      {
        type: 'advanced',
        payload: { value }
      }
    ]
  };
};

describe('runFixedSteps', () => {
  it('advances expected fixed steps and preserves leftover accumulator time', () => {
    const result = runFixedSteps({
      state: { elapsedSeconds: 0, value: 0 },
      commands: [{ type: 'add', payload: { value: 2 } }],
      frameDeltaSeconds: 0.25,
      fixedDeltaSeconds: 0.1,
      update: updateCounter
    });

    expect(result.stepsRun).toBe(2);
    expect(result.state).toEqual({ elapsedSeconds: 0.2, value: 6 });
    expect(result.accumulatorSeconds).toBeCloseTo(0.05);
    expect(result.events).toEqual([
      { type: 'advanced', payload: { value: 3 } },
      { type: 'advanced', payload: { value: 6 } }
    ]);
  });

  it('returns events without mutating the source state snapshot', () => {
    const sourceState: CounterState = Object.freeze({ elapsedSeconds: 0, value: 10 });

    const result = runFixedSteps({
      state: sourceState,
      commands: [],
      frameDeltaSeconds: 0.1,
      fixedDeltaSeconds: 0.1,
      update: updateCounter
    });

    expect(sourceState).toEqual({ elapsedSeconds: 0, value: 10 });
    expect(result.state).toEqual({ elapsedSeconds: 0.1, value: 11 });
    expect(result.events).toEqual([{ type: 'advanced', payload: { value: 11 } }]);
  });

  it('does not import rendering libraries or browser-only APIs', () => {
    const coreFiles = ['types.ts', 'fixedStep.ts', 'index.ts'];
    const forbiddenPatterns = [
      /from ['"]react['"]/,
      /from ['"]phaser['"]/,
      /from ['"]three['"]/,
      /from ['"]@react-three\/fiber['"]/,
      /\bdocument\b/,
      /\bwindow\b/,
      /\bHTMLCanvasElement\b/
    ];

    for (const file of coreFiles) {
      const source = readFileSync(join(process.cwd(), 'src/sim/core', file), 'utf8');

      for (const pattern of forbiddenPatterns) {
        expect(source).not.toMatch(pattern);
      }
    }
  });
});
