import React, { useState, useContext } from 'react';
import '../Register/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';

const Register = () => {
  const { login, register } = useContext(AppContext); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    password: "",
    conpassword: ""
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

    if (!formData.fname.trim()) {
      validationErrors.fname = "Username is required";
    }

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

    if (!formData.conpassword.trim()) {
      validationErrors.conpassword = "Password confirmation is required";
    } else if (formData.conpassword !== formData.password) {
      validationErrors.conpassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Registered successfully");
      register({ fname: formData.fname, email: formData.email }); // Using `register` function from context
      login({ fname: formData.fname, email: formData.email }); // login the user after registration
      navigate('/'); // Redirect to login page after successful registration
    }
  };

  return (
    <Container className='reg_head'>
      <Row className="d-flex justify-content-center align-items-center mt-5 p-5">
        <Col md="4">
          <h2 className='reg_title'>Register Here</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicFname">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='fname'
                type="text"
                placeholder="Enter your Name"
                value={formData.fname}
                onChange={handleChange}
              />
              {errors.fname && <span className="text-danger">{errors.fname}</span>}
            </Form.Group>
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
            <Form.Group controlId="formBasicConPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name='conpassword'
                type="password"
                placeholder="Password"
                value={formData.conpassword}
                onChange={handleChange}
              />
              {errors.conpassword && <span className="text-danger">{errors.conpassword}</span>}
            </Form.Group>
            <Button className='reg_btn form-control' type="submit">Register</Button>
            <p className='d-flex justify-content-center align-items-center mt-1'>Have an account? <Link to='/'>Login</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
