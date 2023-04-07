/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import DisplayAllUsersTxns from "../DisplayAllUsersTxns";
import getAllTxns from "../../services/getAllTxns";
import getAllCustomersDetailsRewards from "../../services/getAllCustomersDetailsRewards";

jest.mock("../../services/getAllTxns");
jest.mock("../../services/getAllCustomersDetailsRewards");

describe("DisplayAllUsersTxns", () => {
  const customers = [
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Jane",
    },
  ];
  const transactions = [
    {
      id: 1,
      customer: "John",
      amount: 100,
      date: "2022-01-01",
    },
    {
      id: 2,
      customer: "Jane",
      amount: 50,
      date: "2022-01-02",
    },
  ];
  it("displays a loading spinner while transactions are being fetched", async () => {
    getAllCustomersDetailsRewards.mockResolvedValue(customers);
    render(<DisplayAllUsersTxns />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("displays an error message if transactions cannot be fetched", async () => {
    getAllTxns.mockRejectedValue(new Error("Error fetching transactions"));
    getAllCustomersDetailsRewards.mockResolvedValue(customers);

    render(<DisplayAllUsersTxns />);

    const errorMessage = await screen.findByText("Error Loading Data");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays a table of all transactions when they are fetched", async () => {
    getAllTxns.mockResolvedValue(transactions);
    getAllCustomersDetailsRewards.mockResolvedValue(customers);
    render(<DisplayAllUsersTxns />);

    await waitFor(() => {
      expect(
        screen.getByText("Transactions of all customers")
      ).toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
    });
  });

  it("displays a loading spinner while customer data is being fetched", async () => {
    getAllCustomersDetailsRewards.mockResolvedValue(customers);
    render(<DisplayAllUsersTxns />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("displays an error message if customer data cannot be fetched", async () => {
    getAllCustomersDetailsRewards.mockRejectedValue(
      new Error("Error fetching customer data")
    );

    render(<DisplayAllUsersTxns />);

    const errorMessage = await screen.findByText("Error Loading Data");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays a table of all customers with their rewards when customer data is fetched", async () => {
    getAllCustomersDetailsRewards.mockResolvedValue(customers);

    render(<DisplayAllUsersTxns />);

    await waitFor(() => {
      expect(screen.getByText("All rewards by customers")).toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
    });
  });
});
