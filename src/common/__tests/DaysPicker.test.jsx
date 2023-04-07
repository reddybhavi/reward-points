import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DaysPicker from "../DaysPicker";

describe("DaysPicker", () => {
  const days = 7;
  const onDaysSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with the default props", () => {
    render(<DaysPicker onDaysSelect={onDaysSelect} days={days} />);

    expect(screen.getByText("Days data to display")).toBeInTheDocument();
    expect(screen.getByText(days)).toBeInTheDocument();
  });

  it("displays the dropdown menu when the user clicks the button", () => {
    render(<DaysPicker onDaysSelect={onDaysSelect} days={days} />);

    userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
  });

  it("calls the onDaysSelect function when the user selects a number of days", () => {
    render(<DaysPicker onDaysSelect={onDaysSelect} days={days} />);

    userEvent.click(screen.getByRole("button"));
    userEvent.click(screen.getByText("30"));

    expect(onDaysSelect).toHaveBeenCalledTimes(1);
    expect(onDaysSelect).toHaveBeenCalledWith("30", expect.anything());
  });
});
