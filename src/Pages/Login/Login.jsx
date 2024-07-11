import React, { useState, useContext } from 'react';
import '../Login/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';

const Login = () => {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    login({ email });
    navigate('/products');
  };

  return (
    <Container className='log_head'>
      <Row className="d-flex justify-content-center align-item-center ">
        <Col md="4">
          <h2 className='log_title'>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className=' login_btn form-control'  type="submit">
              Submit
            </Button>
            <p className='d-flex justify-content-center align-items-center mt-1'>Don't have an account ? <Link to='/register'>Signup</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
