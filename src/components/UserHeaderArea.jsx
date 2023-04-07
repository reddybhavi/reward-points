import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DisplayUserInfo from "./DisplayUserInfo";
import Spinner from "react-bootstrap/Spinner";
import DaysPicker from "../common/DaysPicker";

const UserHeaderArea = ({
  allCustomers,
  onCustomerSelect,
  selectedCustomer,
  onDaysSelect,
  days,
  customerDetails,
  isLoading,
}) => {
  return (
    <div className="rewards-header-area">
      <div className="header-left-section">
        <div className="user-selection">
          <label className="rewards-secton-label">Select customer </label>
          <DropdownButton
            as={ButtonGroup}
            variant="secondary"
            title={customerDetails?.name}
            onSelect={onCustomerSelect}
          >
            {Object.values(allCustomers)?.map((customer) => (
              <Dropdown.Item eventKey={customer?.id}>
                {customer?.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <DaysPicker days={days} onDaysSelect={onDaysSelect} />
        <div className="rewards-section">
          Reward Points in last {days} days:{" "}
          <span className="reward-points-display">
            {isLoading && <>...</>}
            {!isLoading && <strong>{customerDetails?.partialRewards}</strong>}
          </span>
        </div>
        <div className="rewards-section">
          Total Reward Points:{" "}
          <span className="reward-points-display">
            {isLoading && <>...</>}
            {!isLoading && <strong>{customerDetails?.totalRewards}</strong>}
          </span>
        </div>
      </div>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && (
        <div className="user-info-area">
          <DisplayUserInfo
            name={customerDetails?.name}
            email={customerDetails?.email}
            age={customerDetails?.age}
            phone={customerDetails?.phone}
            customerId={selectedCustomer}
            address={{
              street: customerDetails?.address?.street,
              city: customerDetails?.address?.city,
              state: customerDetails?.address?.state,
              zip: customerDetails?.address?.zip,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserHeaderArea;
