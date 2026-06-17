import type { LaunchEnvironment, LaunchState } from "./types";

export const defaultLaunchEnvironment: LaunchEnvironment = {
  gravityMetersPerSecondSquared: 9.81,
  dragCoefficient: 0.000018,
  atmosphereHeightMeters: 100_000,
  orbitAltitudeMeters: 120_000,
  orbitHorizontalVelocityMetersPerSecond: 2_400,
  maxSafePitchDegrees: 88,
  groundImpactVelocityMetersPerSecond: -25,
};

export function createInitialLaunchState(): LaunchState {
  return {
    altitudeMeters: 0,
    verticalVelocityMetersPerSecond: 0,
    horizontalVelocityMetersPerSecond: 0,
    pitchDegrees: 0,
    throttle: 0,
    activeStageIndex: 0,
    stages: [
      {
        id: "first-stage",
        dryMassKg: 25_000,
        fuelKg: 140_000,
        maxFuelKg: 140_000,
        thrustNewtons: 3_200_000,
        fuelBurnRateKgPerSecond: 820,
      },
      {
        id: "second-stage",
        dryMassKg: 7_000,
        fuelKg: 36_000,
        maxFuelKg: 36_000,
        thrustNewtons: 950_000,
        fuelBurnRateKgPerSecond: 210,
      },
    ],
    payloadMassKg: 12_000,
    missionTimeSeconds: 0,
    status: "prelaunch",
    environment: defaultLaunchEnvironment,
  };
}
