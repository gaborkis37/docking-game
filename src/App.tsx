import { useGameShellStore, type GameScreen } from "./state/gameShellStore";
import { DockingScreen } from "./screens/DockingScreen";
import { LaunchScreen } from "./screens/LaunchScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { TutorialScreen } from "./screens/TutorialScreen";

const screens: Array<{ id: GameScreen; label: string }> = [
  { id: "launch", label: "Launch" },
  { id: "docking", label: "Docking" },
  { id: "results", label: "Results" },
  { id: "tutorial", label: "Tutorial" },
  { id: "settings", label: "Settings" },
];

export function App() {
  const activeScreen = useGameShellStore((state) => state.activeScreen);
  const setActiveScreen = useGameShellStore((state) => state.setActiveScreen);

  return (
    <main className="app-shell">
      <header className="mission-header">
        <div>
          <p className="mission-kicker">V1 scaffold</p>
          <h1>Space Docking Game</h1>
        </div>
        <nav className="screen-nav" aria-label="Game screens">
          {screens.map((screen) => (
            <button
              aria-current={activeScreen === screen.id ? "page" : undefined}
              className="nav-button"
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              type="button"
            >
              {screen.label}
            </button>
          ))}
        </nav>
      </header>
      <section className="screen-frame">{renderScreen(activeScreen)}</section>
    </main>
  );
}

function renderScreen(activeScreen: GameScreen) {
  switch (activeScreen) {
    case "launch":
      return <LaunchScreen />;
    case "docking":
      return <DockingScreen />;
    case "results":
      return <ResultsScreen />;
    case "tutorial":
      return <TutorialScreen />;
    case "settings":
      return <SettingsScreen />;
  }
}
