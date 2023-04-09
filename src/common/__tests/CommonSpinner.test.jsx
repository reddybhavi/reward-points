import { render, screen } from "@testing-library/react";
import CommonSpinner from "../CommonSpinner";

describe("CommonSpinner component", () => {
  test("renders without crashing", () => {
    // Act
    render(<CommonSpinner />);
  });

  test("displays a spinner", () => {
    // Act
    render(<CommonSpinner />);

    // Assert
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("displays a visually hidden loading text", () => {
    // Act
    render(<CommonSpinner />);

    // Assert
    expect(screen.getByText("Loading...")).toHaveClass("visually-hidden");
  });

  test("applies the correct CSS class", () => {
    // Act
    render(<CommonSpinner />);

    // Assert
    expect(screen.getByTestId("spinner-container")).toHaveClass("spinner");
    expect(screen.getByTestId("spinner-container")).not.toHaveClass("foo");
  });
});
