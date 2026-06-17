import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App shell", () => {
  it("renders the launch screen by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Launch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Launch" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders all top-level screen controls", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "Launch" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Docking" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Results" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tutorial" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Settings" }),
    ).toBeInTheDocument();
  });
});
