import React, { useContext } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';

const Profile = () => {
  const { user, logout } = useContext(AppContext);

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Profile</h2>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
