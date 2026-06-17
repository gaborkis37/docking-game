import type { SimulationCommand, SimulationEvent } from "../core";

export type LaunchStatus =
  | "prelaunch"
  | "ascending"
  | "orbit-achieved"
  | "failed";

export type LaunchStage = Readonly<{
  id: string;
  dryMassKg: number;
  fuelKg: number;
  maxFuelKg: number;
  thrustNewtons: number;
  fuelBurnRateKgPerSecond: number;
}>;

export type LaunchEnvironment = Readonly<{
  gravityMetersPerSecondSquared: number;
  dragCoefficient: number;
  atmosphereHeightMeters: number;
  orbitAltitudeMeters: number;
  orbitHorizontalVelocityMetersPerSecond: number;
  maxSafePitchDegrees: number;
  groundImpactVelocityMetersPerSecond: number;
}>;

export type LaunchState = Readonly<{
  altitudeMeters: number;
  verticalVelocityMetersPerSecond: number;
  horizontalVelocityMetersPerSecond: number;
  pitchDegrees: number;
  throttle: number;
  activeStageIndex: number;
  stages: readonly LaunchStage[];
  payloadMassKg: number;
  missionTimeSeconds: number;
  status: LaunchStatus;
  environment: LaunchEnvironment;
}>;

export type SetThrottleCommand = SimulationCommand<
  "set-throttle",
  { throttle: number }
>;
export type SetPitchCommand = SimulationCommand<
  "set-pitch",
  { pitchDegrees: number }
>;
export type SeparateStageCommand = SimulationCommand<"separate-stage">;

export type LaunchCommand =
  | SetThrottleCommand
  | SetPitchCommand
  | SeparateStageCommand;

export type FuelExhaustedEvent = SimulationEvent<
  "fuel-exhausted",
  { stageIndex: number; stageId: string }
>;
export type StageSeparatedEvent = SimulationEvent<
  "stage-separated",
  { fromStageIndex: number; nextStageIndex: number | null }
>;
export type OrbitAchievedEvent = SimulationEvent<
  "orbit-achieved",
  { altitudeMeters: number; horizontalVelocityMetersPerSecond: number }
>;
export type LaunchFailedEvent = SimulationEvent<
  "launch-failed",
  { reason: LaunchFailureReason }
>;

export type LaunchFailureReason =
  | "ground-impact"
  | "unsafe-pitch"
  | "no-active-stage";

export type LaunchEvent =
  | FuelExhaustedEvent
  | StageSeparatedEvent
  | OrbitAchievedEvent
  | LaunchFailedEvent;
