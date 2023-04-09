import ListGroup from "react-bootstrap/ListGroup";
import styles from "./css/Common.module.css";

const DisplayUserInfo = ({ name, email, age, phone, customerId, address }) => {
  return (
    <ListGroup>
      <ListGroup.Item className={styles?.userInfoItem}>
        Name: <strong>{name}</strong>
      </ListGroup.Item>
      <ListGroup.Item className={styles?.userInfoItem}>
        email: <strong>{email}</strong>
      </ListGroup.Item>
      <ListGroup.Item className={styles?.userInfoItem}>
        age: <strong>{age}</strong>
      </ListGroup.Item>
      <ListGroup.Item className={styles?.userInfoItem}>
        phone: <strong>{phone}</strong>
      </ListGroup.Item>
      <ListGroup.Item className={styles?.userInfoItem}>
        customerId: <strong>{customerId} </strong>
      </ListGroup.Item>
      <ListGroup.Item className={styles?.userInfoItem}>
        address:{" "}
        <strong>
          {address?.street}, {address?.city}, {address?.state} {address?.zip}
        </strong>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default DisplayUserInfo;
