import React, { useState, useContext } from 'react';
import '../Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validation
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
    
      const user = { email: formData.email }; 

      login(user); // Store user data in AppContext
      localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage

      navigate('/products'); // Redirect to product page
    }
  };

  return (
    <>
      <Container className='log_head'>
        <Row className="d-flex justify-content-center align-items-center">
          <h1 className='d-flex justify-content-center align-items-center mt-5 mb-5'>Please Login Here</h1>
          <Col md="4">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name='email'
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="text-danger">{errors.email}</span>}
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type="password"
                  placeholder="*******"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <span className="text-danger">{errors.password}</span>}
              </Form.Group>
              <Button className='login_btn form-control' type="submit">
                Submit
              </Button>
              <p className='d-flex justify-content-center align-items-center mt-1'>Don't have an account? <Link to='/register'>Signup</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
