import DisplayTransactionsByUser from "./DisplayTransactionsByUser";
import DisplayAllUsersTxns from "./DisplayAllUsersTxns";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import useGetAllCustomers from "../hooks/useGetAllCustomers";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

// Rewards Home page
// Start of flow
const RewardsHome = () => {
  // Get all customers data since its used in both tabs
  // One for dropdown and other for displaying data
  const { allCustomers, isAllCustomersLoading, isAllCustomersError } =
    useGetAllCustomers();

  return (
    <Container>
      <div data-testid="rewards-home" className="rewards-home">
        {isAllCustomersLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <>{isAllCustomersError && <>Error loading customers data</>}</>
        {!isAllCustomersLoading && (
          <Tabs
            defaultActiveKey="uniquecustomer"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="uniquecustomer" title="Users by CustomerId">
              <DisplayTransactionsByUser allCustomers={allCustomers} />
            </Tab>
            <Tab eventKey="allusers" title="All Users">
              <DisplayAllUsersTxns allCustomers={allCustomers} />
            </Tab>
          </Tabs>
        )}
      </div>
    </Container>
  );
};

export default RewardsHome;
