import ListGroup from "react-bootstrap/ListGroup";

const DisplayUserInfo = ({ name, email, age, phone, customerId, address }) => {
  return (
    <ListGroup>
      <ListGroup.Item className="user-info-item">
        Name: <strong>{name}</strong>
      </ListGroup.Item>
      <ListGroup.Item className="user-info-item">
        email: <strong>{email}</strong>
      </ListGroup.Item>
      <ListGroup.Item className="user-info-item">
        age: <strong>{age}</strong>
      </ListGroup.Item>
      <ListGroup.Item className="user-info-item">
        phone: <strong>{phone}</strong>
      </ListGroup.Item>
      <ListGroup.Item className="user-info-item">
        customerId: <strong>{customerId} </strong>
      </ListGroup.Item>
      <ListGroup.Item className="user-info-item">
        address:{" "}
        <strong>
          {address?.street}, {address?.city}, {address?.state} {address?.zip}
        </strong>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default DisplayUserInfo;
