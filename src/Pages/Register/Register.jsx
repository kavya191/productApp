import React, { useState, useContext } from 'react';
import '../Register/Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';

const Register = () => {
    const { login } = useContext(AppContext);
    const [fname,setFname]=useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword,setConpassword]=useState('')
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      login({ fname,email });
      navigate('/login');
    };
  return (
    <Container  className='reg_head'>
    <Row className="f-flex justify-content-center align-item-center mt-5 p-5 ">
      <Col md="4">
        <h2 className='reg_title'>Register Here</h2>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFname">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group controlId="formBasicConPassword">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={ conpassword}
              onChange={(e) => setConpassword(e.target.value)}
            />
          </Form.Group>
          <Button className='reg_btn form-control' type="submit">Register</Button>
          <p className='d-flex justify-content-center align-items-center mt-1'>Have an account ?  <Link to='/'>Login</Link></p>
        </Form>
      
      </Col>
    </Row>
  </Container>
  )
}

export default Register