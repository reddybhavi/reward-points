import React from "react";
import { render, screen } from "@testing-library/react";
import TableComponent from "../TableComponent";

const txns = [
  {
    id: 1,
    customerId: 123,
    transactionAmount: 20.0,
    created: "2023-04-01",
    billedBy: "John",
    store: "Walmart",
  },
  {
    id: 2,
    customerId: 456,
    transactionAmount: 50.0,
    created: "2023-04-02",
    billedBy: "Mary",
    store: "Target",
  },
];

describe("TableComponent", () => {
  it("renders table headers correctly", () => {
    render(<TableComponent txns={txns} />);
    expect(screen.getByText("Customer Id")).toBeInTheDocument();
    expect(screen.getByText("Transaction Amount")).toBeInTheDocument();
    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(screen.getByText("Billed By")).toBeInTheDocument();
    expect(screen.getByText("Store")).toBeInTheDocument();
  });

  it("renders table rows correctly", () => {
    render(<TableComponent txns={txns} />);
    const tableRows = screen.getAllByTestId("table-component-rows");
    expect(tableRows).toHaveLength(2);
    expect(tableRows[0]).toHaveTextContent("123");
    expect(tableRows[0]).toHaveTextContent("2023-04-01");
    expect(tableRows[0]).toHaveTextContent("John");
    expect(tableRows[0]).toHaveTextContent("Walmart");
    expect(tableRows[1]).toHaveTextContent("456");
    expect(tableRows[1]).toHaveTextContent("2023-04-02");
    expect(tableRows[1]).toHaveTextContent("Mary");
    expect(tableRows[1]).toHaveTextContent("Target");
  });

  it("renders no transactions message when there are no transactions", () => {
    render(<TableComponent txns={[]} />);
    expect(screen.getByText("No transactions found")).toBeInTheDocument();
  });
});
