import { useState } from "react";
import { noOfDaysRewards } from "../utils/constants";
import TableComponent from "../common/TableComponent";
import UserHeaderArea from "./UserHeaderArea";
import useGetCustomerDetailsTxns from "../hooks/useGetCustomerDetailsTxns";
import CommonSpinner from "../common/CommonSpinner";

const DisplayTransactionsByUser = ({ allCustomers }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(
    Object.keys(allCustomers)?.[0]
  );
  const [days, setDays] = useState(noOfDaysRewards[0]);

  // custom hook useGetCustomerDetailsTxns to get all txns and details for specific user
  // Called on change of customer from dropdown/ days
  const { isLoading, error, customerDetails, customerTxns } =
    useGetCustomerDetailsTxns(selectedCustomer, days);

  const onCustomerSelect = (e) => {
    setSelectedCustomer(e);
  };

  const onDaysSelect = (e) => {
    setDays(e);
  };

  return (
    <div className="display-transactions">
      <UserHeaderArea
        allCustomers={allCustomers}
        customerDetails={customerDetails}
        days={days}
        onCustomerSelect={onCustomerSelect}
        onDaysSelect={onDaysSelect}
        selectedCustomer={selectedCustomer}
        isLoading={isLoading}
      />
      {isLoading && <CommonSpinner />}
      {!isLoading && <TableComponent txns={customerTxns} />}
      {error && <>Error loading details</>}
    </div>
  );
};

export default DisplayTransactionsByUser;
