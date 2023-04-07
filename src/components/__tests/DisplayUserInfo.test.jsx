import { render, screen } from "@testing-library/react";
import DisplayUserInfo from "../DisplayUserInfo";

describe("DisplayUserInfo", () => {
  const name = "John Doe";
  const email = "johndoe@example.com";
  const age = 30;
  const phone = "123-456-7890";
  const customerId = 12345;
  const address = {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  };

  test("renders user info correctly", () => {
    render(
      <DisplayUserInfo
        name={name}
        email={email}
        age={age}
        phone={phone}
        customerId={customerId}
        address={address}
      />
    );

    const nameElement = screen.getByText(/Name:/);
    const emailElement = screen.getByText(/email:/);
    const ageElement = screen.getByText(/age:/);
    const phoneElement = screen.getByText(/phone:/);
    const customerIdElement = screen.getByText(/customerId:/);
    const addressElement = screen.getByText(/address:/);

    expect(nameElement).toHaveTextContent("Name: John Doe");
    expect(emailElement).toHaveTextContent("email: johndoe@example.com");
    expect(ageElement).toHaveTextContent("age: 30");
    expect(phoneElement).toHaveTextContent("phone: 123-456-7890");
    expect(customerIdElement).toHaveTextContent("customerId: 12345");
    expect(addressElement).toHaveTextContent(
      "address: 123 Main St, Anytown, CA 12345"
    );
  });

  test("renders unknown address if address is not provided", () => {
    render(
      <DisplayUserInfo
        name={name}
        email={email}
        age={age}
        phone={phone}
        customerId={customerId}
      />
    );

    const addressElement = screen.getByText(/address:/);

    expect(addressElement).toHaveTextContent("address: , ,");
  });
});
