import Table from "react-bootstrap/Table";
import styles from "./css/Table.module.css";

const TableComponent = ({ txns }) => {
  return (
    <Table
      striped
      bordered
      hover
      className={styles?.txnsTableStyle}
      data-testid="table-component"
    >
      <thead>
        <tr>
          <th>Customer Id</th>
          <th>Transaction Amount</th>
          <th>Created</th>
          <th>Billed By</th>
          <th>Store</th>
        </tr>
      </thead>
      <tbody>
        {txns?.map((txn) => {
          return (
            <tr data-testid="table-component-rows">
              <td>{txn.customerId}</td>
              <td>{txn.transactionAmount}</td>
              <td>{txn.created}</td>
              <td>{txn.billedBy}</td>
              <td>{txn.store}</td>
            </tr>
          );
        })}
        {txns?.length === 0 && <>No transactions found</>}
      </tbody>
    </Table>
  );
};

export default TableComponent;
