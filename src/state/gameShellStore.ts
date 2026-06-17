import { create } from "zustand";

export type GameScreen =
  | "launch"
  | "docking"
  | "results"
  | "tutorial"
  | "settings";

type GameShellState = {
  activeScreen: GameScreen;
  setActiveScreen: (screen: GameScreen) => void;
};

export const useGameShellStore = create<GameShellState>((set) => ({
  activeScreen: "launch",
  setActiveScreen: (screen) => set({ activeScreen: screen }),
}));
