import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders RewardsHome component", () => {
    render(<App />);
    const rewardsHomeComponent = screen.getByTestId("rewards-home");
    expect(rewardsHomeComponent).toBeInTheDocument();
  });
});
