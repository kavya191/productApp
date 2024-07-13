import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Footer/footer.css'
const Footer = () => {
  return (
    <footer className=" footer_head  w-100" >
      <Container fluid className="py-3">
        <Row>
          <Col md={4} className="text-center text-md-start">
            <h5>My App</h5>
            <p>© 2024 My App. All rights reserved.</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-white text-decoration-none ">Products</a></li>
              <li><a href="/profile" className="text-white text-decoration-none ">Profile</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">Cart</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <h5>Contact</h5>
            <p>Email: info@myapp.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
