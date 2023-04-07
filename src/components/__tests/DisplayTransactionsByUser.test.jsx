/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from "@testing-library/react";
import DisplayTransactionsByUser from "../DisplayTransactionsByUser";

describe("DisplayTransactionsByUser", () => {
  const allCustomers = {
    1: {
      id: "1",
      name: "Customer 1",
    },
    2: {
      id: "2",
      name: "Customer 2",
    },
  };

  const mockCustomerDetails = {
    name: "Customer 1",
    partialRewards: 50,
    totalRewards: 100,
    email: "customer1@example.com",
    age: 30,
    phone: "1234567890",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
  };

  const mockCustomerTxns = [
    {
      id: "1",
      customerId: "1",
      transactionDate: "2022-04-01",
      transactionAmount: 100,
      rewardsEarned: 10,
    },
    {
      id: "2",
      customerId: "1",
      transactionDate: "2022-04-02",
      transactionAmount: 50,
      rewardsEarned: 5,
    },
  ];

  beforeAll(() => {
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.endsWith("customerDetailsRewards")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCustomerDetails),
        });
      }

      if (url.endsWith("transactionsByCustomerId")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCustomerTxns),
        });
      }

      return Promise.reject(new Error("Unknown endpoint"));
    });
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  it("should render customer dropdown and rewards table", async () => {
    render(<DisplayTransactionsByUser allCustomers={allCustomers} />);

    // Check rewards table
    await waitFor(() => {
      const rewardsTable = screen.getByRole("table");
      expect(rewardsTable).toBeInTheDocument();

      // Check table headers
      const headers = screen.getAllByRole("columnheader");
      expect(headers.length).toBe(5);
      expect(headers[0]).toHaveTextContent("Customer Id");
      expect(headers[1]).toHaveTextContent("Transaction Amount");
      expect(headers[2]).toHaveTextContent("Created");
      expect(headers[3]).toHaveTextContent("Billed By");

      // Check table rows
      const rows = screen.getAllByTestId("table-component-rows");

      expect(rows.length).toBe(3); // 2 rows of data
      expect(rows[0]).toHaveTextContent("11202023-02-01T08:00:00ZJohnStore A");
      expect(rows[1]).toHaveTextContent("1802023-03-15T10:30:00ZMaryStore B");
    });
  });
});
