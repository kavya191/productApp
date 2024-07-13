import React, { useContext, useState } from 'react';
import { Navbar, Container, Button, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Heart } from 'react-feather';
import { LinkContainer } from 'react-router-bootstrap';
import { AppContext } from '../../Context/AppContext';
import Modal from 'react-bootstrap/Modal';

const Header = () => {
  const { cart, list } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user, logout } = useContext(AppContext);

  if (!user) {
    return <h1 className='d-flex justify-content-center align-items-center fw-bold mt-5'>Please log in</h1>;
  }

  // Calculate cart item count
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  //calculate wishlist count
   const wishlistCount = list.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">My Product-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/wish">
                <Nav.Link className="text-white">
                  <Heart size={20} className="me-2" />
                   <b className="ms-1">{wishlistCount}</b> 
                </Nav.Link>
              </LinkContainer>

              <Nav.Link className="text-white">
                <User size={20} className="me-2" onClick={handleShow} />
              </Nav.Link>

              <LinkContainer to="/cart">
                <Button className="text-white bg-dark border-0" type="submit">
                  <ShoppingCart size={20} />
                  <b className="ms-1">{cartItemCount}</b>
                </Button>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <Container>
            <Row className='d-flex justify-content-center align-item-center mt-5'>
              <Col >
                <img className='d-flex justify-content-center align-items-center' src='https://i.postimg.cc/ZRZd9vpQ/images.png'></img>

                <p>Email: {user.email}</p>


              </Col>
              <Col className='d-flex justify-content-center align-items-center' >
                <Link to='/'><button onClick={logout}>Logout</button></Link>
              </Col>

            </Row>
          </Container>


        </Modal.Body>

      </Modal>
    </>
  );
};

export default Header;
