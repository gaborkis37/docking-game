import type { SimulationResult, SimulationStep } from "../core";
import type {
  LaunchCommand,
  LaunchEvent,
  LaunchFailureReason,
  LaunchStage,
  LaunchState,
} from "./types";

export function updateLaunchSimulation({
  state,
  commands,
  deltaSeconds,
}: SimulationStep<LaunchState, LaunchCommand>): SimulationResult<
  LaunchState,
  LaunchEvent
> {
  if (deltaSeconds < 0) {
    throw new Error("deltaSeconds must be greater than or equal to zero");
  }

  if (state.status === "orbit-achieved" || state.status === "failed") {
    return { state: { ...state }, events: [] };
  }

  const events: LaunchEvent[] = [];
  const commandedState = applyLaunchCommands(state, commands);
  const activeStage = commandedState.stages[commandedState.activeStageIndex];

  if (!activeStage) {
    return failLaunch(commandedState, "no-active-stage");
  }

  const fuelBeforeBurn = activeStage.fuelKg;
  const fuelBurnKg = Math.min(
    fuelBeforeBurn,
    activeStage.fuelBurnRateKgPerSecond *
      commandedState.throttle *
      deltaSeconds,
  );
  const burnedStage = replaceStage(
    commandedState.stages,
    commandedState.activeStageIndex,
    {
      ...activeStage,
      fuelKg: fuelBeforeBurn - fuelBurnKg,
    },
  );
  const stateAfterBurn = { ...commandedState, stages: burnedStage };

  if (fuelBeforeBurn > 0 && fuelBeforeBurn - fuelBurnKg === 0) {
    events.push({
      type: "fuel-exhausted",
      payload: {
        stageIndex: commandedState.activeStageIndex,
        stageId: activeStage.id,
      },
    });
  }

  const massKg = calculateLaunchMassKg(stateAfterBurn);
  const thrustAcceleration =
    massKg > 0
      ? (activeStage.thrustNewtons * stateAfterBurn.throttle) / massKg
      : 0;
  const pitchRadians = degreesToRadians(stateAfterBurn.pitchDegrees);
  const verticalThrustAcceleration =
    thrustAcceleration * Math.cos(pitchRadians);
  const horizontalThrustAcceleration =
    thrustAcceleration * Math.sin(pitchRadians);
  const atmosphereFactor = Math.max(
    0,
    1 -
      stateAfterBurn.altitudeMeters /
        stateAfterBurn.environment.atmosphereHeightMeters,
  );
  const verticalDrag =
    stateAfterBurn.verticalVelocityMetersPerSecond *
    Math.abs(stateAfterBurn.verticalVelocityMetersPerSecond) *
    stateAfterBurn.environment.dragCoefficient *
    atmosphereFactor;
  const horizontalDrag =
    stateAfterBurn.horizontalVelocityMetersPerSecond *
    Math.abs(stateAfterBurn.horizontalVelocityMetersPerSecond) *
    stateAfterBurn.environment.dragCoefficient *
    atmosphereFactor;

  const nextVerticalVelocity =
    stateAfterBurn.verticalVelocityMetersPerSecond +
    (verticalThrustAcceleration -
      stateAfterBurn.environment.gravityMetersPerSecondSquared -
      verticalDrag) *
      deltaSeconds;
  const nextHorizontalVelocity = Math.max(
    0,
    stateAfterBurn.horizontalVelocityMetersPerSecond +
      (horizontalThrustAcceleration - horizontalDrag) * deltaSeconds,
  );
  const nextAltitude = Math.max(
    0,
    stateAfterBurn.altitudeMeters + nextVerticalVelocity * deltaSeconds,
  );

  let nextState: LaunchState = {
    ...stateAfterBurn,
    altitudeMeters: nextAltitude,
    verticalVelocityMetersPerSecond: nextVerticalVelocity,
    horizontalVelocityMetersPerSecond: nextHorizontalVelocity,
    missionTimeSeconds: stateAfterBurn.missionTimeSeconds + deltaSeconds,
    status:
      stateAfterBurn.throttle > 0 || stateAfterBurn.missionTimeSeconds > 0
        ? "ascending"
        : "prelaunch",
  };

  if (shouldSeparateEmptyStage(nextState)) {
    const separated = separateActiveStage(nextState);
    nextState = separated.state;
    events.push(separated.event);
  }

  const failureReason = getLaunchFailureReason(nextState);
  if (failureReason) {
    const failed = failLaunch(nextState, failureReason);
    return { state: failed.state, events: [...events, ...failed.events] };
  }

  if (hasAchievedOrbit(nextState)) {
    nextState = { ...nextState, status: "orbit-achieved", throttle: 0 };
    events.push({
      type: "orbit-achieved",
      payload: {
        altitudeMeters: nextState.altitudeMeters,
        horizontalVelocityMetersPerSecond:
          nextState.horizontalVelocityMetersPerSecond,
      },
    });
  }

  return {
    state: nextState,
    events,
  };
}

export function calculateLaunchMassKg(state: LaunchState): number {
  return (
    state.payloadMassKg +
    state.stages
      .slice(state.activeStageIndex)
      .reduce((total, stage) => total + stage.dryMassKg + stage.fuelKg, 0)
  );
}

export function hasAchievedOrbit(state: LaunchState): boolean {
  return (
    state.altitudeMeters >= state.environment.orbitAltitudeMeters &&
    state.horizontalVelocityMetersPerSecond >=
      state.environment.orbitHorizontalVelocityMetersPerSecond
  );
}

function applyLaunchCommands(
  state: LaunchState,
  commands: readonly LaunchCommand[],
): LaunchState {
  return commands.reduce<LaunchState>((nextState, command) => {
    switch (command.type) {
      case "set-throttle":
        return {
          ...nextState,
          throttle: clamp(command.payload.throttle, 0, 1),
        };
      case "set-pitch":
        return {
          ...nextState,
          pitchDegrees: clamp(command.payload.pitchDegrees, 0, 90),
        };
      case "separate-stage":
        return canSeparateStage(nextState)
          ? separateActiveStage(nextState).state
          : nextState;
    }
  }, state);
}

function canSeparateStage(state: LaunchState): boolean {
  const activeStage = state.stages[state.activeStageIndex];

  return Boolean(
    activeStage &&
    activeStage.fuelKg <= 0 &&
    state.activeStageIndex < state.stages.length - 1,
  );
}

function shouldSeparateEmptyStage(state: LaunchState): boolean {
  return canSeparateStage(state);
}

function separateActiveStage(state: LaunchState): {
  state: LaunchState;
  event: LaunchEvent;
} {
  const nextStageIndex =
    state.activeStageIndex + 1 < state.stages.length
      ? state.activeStageIndex + 1
      : null;

  return {
    state: {
      ...state,
      activeStageIndex: nextStageIndex ?? state.activeStageIndex,
      throttle: nextStageIndex === null ? 0 : state.throttle,
    },
    event: {
      type: "stage-separated",
      payload: {
        fromStageIndex: state.activeStageIndex,
        nextStageIndex,
      },
    },
  };
}

function replaceStage(
  stages: readonly LaunchStage[],
  stageIndex: number,
  replacement: LaunchStage,
): readonly LaunchStage[] {
  return stages.map((stage, index) =>
    index === stageIndex ? replacement : stage,
  );
}

function getLaunchFailureReason(
  state: LaunchState,
): LaunchFailureReason | null {
  if (
    state.missionTimeSeconds > 0 &&
    state.altitudeMeters === 0 &&
    state.verticalVelocityMetersPerSecond <
      state.environment.groundImpactVelocityMetersPerSecond
  ) {
    return "ground-impact";
  }

  if (
    state.altitudeMeters < state.environment.atmosphereHeightMeters &&
    state.pitchDegrees > state.environment.maxSafePitchDegrees
  ) {
    return "unsafe-pitch";
  }

  return null;
}

function failLaunch(
  state: LaunchState,
  reason: LaunchFailureReason,
): SimulationResult<LaunchState, LaunchEvent> {
  return {
    state: {
      ...state,
      status: "failed",
      throttle: 0,
    },
    events: [
      {
        type: "launch-failed",
        payload: { reason },
      },
    ],
  };
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
