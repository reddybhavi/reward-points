import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { noOfDaysRewards } from "../utils/constants";
import styles from "./css/DaysPicker.module.css";

// Days picker component to reuse.
// Dropdown for picking the number of days to show.
const DaysPicker = ({ onDaysSelect, days }) => {
  return (
    <div className={styles?.daysSelection}>
      <label className={styles?.rewardsSectionLabel}>
        Days data to display{" "}
      </label>
      <DropdownButton
        as={ButtonGroup}
        variant="secondary"
        title={days}
        onSelect={onDaysSelect}
      >
        {noOfDaysRewards?.map((day) => (
          <Dropdown.Item eventKey={day}>{day}</Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default DaysPicker;
