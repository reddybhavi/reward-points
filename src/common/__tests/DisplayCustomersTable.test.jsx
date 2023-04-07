import { render, screen } from "@testing-library/react";
import DisplayCustomersTable from "../DisplayCustomersTable";

describe("DisplayCustomersTable", () => {
  test("renders table with customer data", () => {
    // Arrange
    const customers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        partialRewards: 50,
        totalRewards: 200,
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        partialRewards: 20,
        totalRewards: 100,
      },
    ];
    const days = 30;
    // Act
    render(<DisplayCustomersTable customers={customers} days={days} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(customers.length + 1);

    const headerRow = rows[0];
    // Assert
    expect(headerRow).toHaveTextContent("CustomerId");
    expect(headerRow).toHaveTextContent("Customer Name");
    expect(headerRow).toHaveTextContent("Email");
    expect(headerRow).toHaveTextContent(`Rewards in last ${days} days`);
    expect(headerRow).toHaveTextContent("Total Rewards");

    const customerRows = rows.slice(1);
    customerRows.forEach((row, index) => {
      const customer = customers[index];

      // Assert
      expect(row).toHaveTextContent(`${customer.id}`);
      expect(row).toHaveTextContent(`${customer.name}`);
      expect(row).toHaveTextContent(`${customer.email}`);
      expect(row).toHaveTextContent(`${customer.partialRewards}`);
      expect(row).toHaveTextContent(`${customer.totalRewards}`);
    });
  });

  test("renders 'No Customers found' message if customers array is empty", () => {
    const customers = [];
    const days = 30;

    render(<DisplayCustomersTable customers={customers} days={days} />);

    const noCustomersMessage = screen.getByText("No Customers found");
    expect(noCustomersMessage).toBeInTheDocument();
  });
});
