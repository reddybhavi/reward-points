import Table from "react-bootstrap/Table";
import styles from "./css/Table.module.css";

const DisplayCustomersTable = ({ customers, days }) => {
  return (
    <Table striped bordered hover className={styles?.txnsTableStyle}>
      <thead>
        <tr>
          <th>CustomerId</th>
          <th>Customer Name</th>
          <th>Email</th>
          <th>Rewards in last {days} days</th>
          <th>Total Rewards</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((customer) => {
          return (
            <>
              <tr>
                <td>{customer?.id}</td>
                <td>{customer?.name}</td>
                <td>{customer?.email}</td>
                <td>{customer?.partialRewards}</td>
                <td>{customer?.totalRewards}</td>
              </tr>
            </>
          );
        })}
        {customers?.length === 0 && <>No Customers found</>}
      </tbody>
    </Table>
  );
};

export default DisplayCustomersTable;
