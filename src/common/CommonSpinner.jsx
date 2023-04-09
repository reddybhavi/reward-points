import commonStyles from "./css/Spinner.module.css";
import Spinner from "react-bootstrap/Spinner";

// Spinner component to reuse.
const CommonSpinner = () => {
  return (
    <div className={commonStyles?.spinner} data-testid="spinner-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default CommonSpinner;
