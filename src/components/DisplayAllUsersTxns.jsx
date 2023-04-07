import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import TableComponent from "../common/TableComponent";

import DisplayCustomersTable from "../common/DisplayCustomersTable";
import { noOfDaysRewards } from "../utils/constants";
import DaysPicker from "../common/DaysPicker";
import useGetAllCutomersDetailsTxns from "../hooks/useGetAllCutomersDetailsTxns";

// Display all users data
const DisplayAllUsersTxns = () => {
  const [days, setDays] = useState(noOfDaysRewards[0]);

  // Get all customers details and reward points
  const {
    allTransactions,
    loading,
    allTxnsError,
    allCustomersData,
    loadingCustomer,
  } = useGetAllCutomersDetailsTxns(days);

  const onDaysSelect = (e) => {
    setDays(e);
  };

  return (
    <div className="display-transactions">
      <div>
        <DaysPicker days={days} onDaysSelect={onDaysSelect} />
      </div>
      <div className="customers-rewards-center">
        {loadingCustomer && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <div>
          <h4>All rewards by customers</h4>
        </div>
        {!loadingCustomer && (
          <DisplayCustomersTable customers={allCustomersData} days={days} />
        )}
      </div>
      <h5>Transactions of all customers</h5>
      {!loading && <TableComponent txns={allTransactions} />}
      {allTxnsError && <>Error Loading Data</>}
    </div>
  );
};

export default DisplayAllUsersTxns;
