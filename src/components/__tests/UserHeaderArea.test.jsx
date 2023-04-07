import React from "react";
import { render, screen } from "@testing-library/react";
import UserHeaderArea from "../UserHeaderArea";

const allCustomers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];
const customerDetails = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
  phone: "123-456-7890",
  partialRewards: 100,
  totalRewards: 500,
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
};

describe("UserHeaderArea", () => {
  it("renders the selected customer's name in the dropdown button title", () => {
    render(
      <UserHeaderArea
        allCustomers={allCustomers}
        onCustomerSelect={() => {}}
        selectedCustomer={customerDetails.id}
        onDaysSelect={() => {}}
        days={7}
        customerDetails={customerDetails}
        isLoading={false}
      />
    );
    const dropdownButton = screen.getByRole("button", {
      name: customerDetails.name,
    });
    expect(dropdownButton).toBeInTheDocument();
  });

  it("renders the reward points for the selected customer", () => {
    render(
      <UserHeaderArea
        allCustomers={allCustomers}
        onCustomerSelect={() => {}}
        selectedCustomer={customerDetails.id}
        onDaysSelect={() => {}}
        days={7}
        customerDetails={customerDetails}
        isLoading={false}
      />
    );
    const partialRewardPoints = screen.getByText(/Reward Points in last/i);
    const totalRewardPoints = screen.getByText(/Total Reward Points/i);

    expect(partialRewardPoints).toBeInTheDocument();
    expect(totalRewardPoints).toBeInTheDocument();
  });

  test("renders customer details correctly when customerDetails prop is provided", () => {
    const allCustomers = {
      1: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        age: 30,
        phone: "123-456-7890",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        },
        partialRewards: 100,
        totalRewards: 500,
      },
    };
    const selectedCustomer = "1";
    const onCustomerSelect = jest.fn();
    const onDaysSelect = jest.fn();
    const days = 30;
    const isLoading = false;
    const customerDetails = allCustomers[selectedCustomer];
    render(
      <UserHeaderArea
        allCustomers={allCustomers}
        selectedCustomer={selectedCustomer}
        onCustomerSelect={onCustomerSelect}
        onDaysSelect={onDaysSelect}
        days={days}
        customerDetails={customerDetails}
        isLoading={isLoading}
      />
    );
    const rewardPointsDisplay1 = screen.getByText(
      "Reward Points in last 30 days:"
    );
    expect(rewardPointsDisplay1).toBeInTheDocument();
    const partialRewardsDisplay = screen.getByText("100");
    expect(partialRewardsDisplay).toBeInTheDocument();
    const rewardPointsDisplay2 = screen.getByText("Total Reward Points:");
    expect(rewardPointsDisplay2).toBeInTheDocument();
    const totalRewardsDisplay = screen.getByText("500");
    expect(totalRewardsDisplay).toBeInTheDocument();
  });

  test("renders spinner correctly when isLoading prop is true", () => {
    const allCustomers = {
      1: {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        age: 30,
        phone: "123-456-7890",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        },
        partialRewards: 100,
        totalRewards: 500,
      },
    };
    const selectedCustomer = "1";
    const onCustomerSelect = jest.fn();
    const onDaysSelect = jest.fn();
    const days = 30;
    const isLoading = true;
    const customerDetails = allCustomers[selectedCustomer];
    render(
      <UserHeaderArea
        allCustomers={allCustomers}
        selectedCustomer={selectedCustomer}
        onCustomerSelect={onCustomerSelect}
        onDaysSelect={onDaysSelect}
        days={days}
        customerDetails={customerDetails}
        isLoading={isLoading}
      />
    );
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
