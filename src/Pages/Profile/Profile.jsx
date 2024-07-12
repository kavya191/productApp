import React, { useContext } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AppContext);

  if (!user) {
    return <p>Please log in</p>;
  }

  return (
    <Container>
      <Row className='d-flex justify-content-center align-item-center mt-5'>
        <Col>
          <h2>Profile</h2>
          <p>Name:{user.fname}</p>
          <p>Email: {user.email}</p>
          <Link to='/'><button onClick={logout}>Logout</button></Link>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
