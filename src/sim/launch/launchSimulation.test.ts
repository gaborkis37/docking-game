import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createInitialLaunchState } from './defaults';
import {
  calculateLaunchMassKg,
  hasAchievedOrbit,
  updateLaunchSimulation
} from './launchSimulation';
import type { LaunchState } from './types';

describe('updateLaunchSimulation', () => {
  it('burns fuel while throttle is above zero', () => {
    const state = createInitialLaunchState();

    const result = updateLaunchSimulation({
      state,
      commands: [{ type: 'set-throttle', payload: { throttle: 1 } }],
      deltaSeconds: 1
    });

    expect(result.state.stages[0].fuelKg).toBeLessThan(state.stages[0].fuelKg);
    expect(result.state.throttle).toBe(1);
    expect(result.state.status).toBe('ascending');
  });

  it('does not burn fuel when throttle is zero', () => {
    const state = createInitialLaunchState();

    const result = updateLaunchSimulation({
      state,
      commands: [{ type: 'set-throttle', payload: { throttle: 0 } }],
      deltaSeconds: 1
    });

    expect(result.state.stages[0].fuelKg).toBe(state.stages[0].fuelKg);
    expect(result.state.status).toBe('prelaunch');
  });

  it('separates an empty stage and reduces launch mass', () => {
    const state = withStageFuel(createInitialLaunchState(), 0, 10);
    const massBefore = calculateLaunchMassKg(state);

    const result = updateLaunchSimulation({
      state,
      commands: [{ type: 'set-throttle', payload: { throttle: 1 } }],
      deltaSeconds: 1
    });

    expect(result.state.activeStageIndex).toBe(1);
    expect(calculateLaunchMassKg(result.state)).toBeLessThan(massBefore);
    expect(result.events).toContainEqual({
      type: 'fuel-exhausted',
      payload: { stageIndex: 0, stageId: 'first-stage' }
    });
    expect(result.events).toContainEqual({
      type: 'stage-separated',
      payload: { fromStageIndex: 0, nextStageIndex: 1 }
    });
  });

  it('supports a valid manual stage separation command', () => {
    const state = withStageFuel(createInitialLaunchState(), 0, 0);

    const result = updateLaunchSimulation({
      state,
      commands: [{ type: 'separate-stage' }],
      deltaSeconds: 0
    });

    expect(result.state.activeStageIndex).toBe(1);
  });

  it('detects orbit only when altitude and horizontal velocity thresholds are met', () => {
    const belowOrbit = createInitialLaunchState();
    const orbitalState: LaunchState = {
      ...belowOrbit,
      altitudeMeters: belowOrbit.environment.orbitAltitudeMeters,
      horizontalVelocityMetersPerSecond: belowOrbit.environment.orbitHorizontalVelocityMetersPerSecond
    };

    expect(hasAchievedOrbit(belowOrbit)).toBe(false);
    expect(hasAchievedOrbit({ ...orbitalState, horizontalVelocityMetersPerSecond: 10 })).toBe(false);
    expect(hasAchievedOrbit(orbitalState)).toBe(true);

    const result = updateLaunchSimulation({
      state: orbitalState,
      commands: [],
      deltaSeconds: 0
    });

    expect(result.state.status).toBe('orbit-achieved');
    expect(result.events).toEqual([
      {
        type: 'orbit-achieved',
        payload: {
          altitudeMeters: orbitalState.altitudeMeters,
          horizontalVelocityMetersPerSecond: orbitalState.horizontalVelocityMetersPerSecond
        }
      }
    ]);
  });

  it('detects launch failure on unsafe pitch in atmosphere', () => {
    const state: LaunchState = {
      ...createInitialLaunchState(),
      altitudeMeters: 1_000,
      missionTimeSeconds: 5
    };

    const result = updateLaunchSimulation({
      state,
      commands: [{ type: 'set-pitch', payload: { pitchDegrees: 90 } }],
      deltaSeconds: 0.1
    });

    expect(result.state.status).toBe('failed');
    expect(result.events).toContainEqual({
      type: 'launch-failed',
      payload: { reason: 'unsafe-pitch' }
    });
  });

  it('does not import rendering libraries or browser-only APIs', () => {
    const launchFiles = ['types.ts', 'defaults.ts', 'launchSimulation.ts', 'index.ts'];
    const forbiddenPatterns = [
      /from ['"]react['"]/,
      /from ['"]phaser['"]/,
      /from ['"]three['"]/,
      /from ['"]@react-three\/fiber['"]/,
      /\bdocument\b/,
      /\bwindow\b/,
      /\bHTMLCanvasElement\b/
    ];

    for (const file of launchFiles) {
      const source = readFileSync(join(process.cwd(), 'src/sim/launch', file), 'utf8');

      for (const pattern of forbiddenPatterns) {
        expect(source).not.toMatch(pattern);
      }
    }
  });
});

function withStageFuel(state: LaunchState, stageIndex: number, fuelKg: number): LaunchState {
  return {
    ...state,
    stages: state.stages.map((stage, index) => (index === stageIndex ? { ...stage, fuelKg } : stage))
  };
}
