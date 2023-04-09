import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DisplayUserInfo from "./DisplayUserInfo";
import DaysPicker from "../common/DaysPicker";
import styles from "./css/Customer.module.css";
import CommonSpinner from "../common/CommonSpinner";

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
    <div className={styles?.rewardsHeaderArea}>
      <div className={styles?.headerLeftSection}>
        <div className={styles?.userSelection}>
          <label className={styles?.rewardsSectionLabel}>
            Select customer{" "}
          </label>
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
        <div className={styles?.rewardsSection}>
          Reward Points in last {days} days:{" "}
          <span className="reward-points-display">
            {isLoading && <>...</>}
            {!isLoading && <strong>{customerDetails?.partialRewards}</strong>}
          </span>
        </div>
        <div className={styles?.rewardsSection}>
          Total Reward Points:{" "}
          <span className="reward-points-display">
            {isLoading && <>...</>}
            {!isLoading && <strong>{customerDetails?.totalRewards}</strong>}
          </span>
        </div>
      </div>
      {isLoading && (
        <div className={styles?.spinnerArea}>
          <CommonSpinner />
        </div>
      )}
      {!isLoading && (
        <div className={styles?.userInfoArea}>
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
