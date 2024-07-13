import React, { useContext, useState } from 'react';
import { Navbar, Container, Button, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Heart } from 'react-feather';
import { LinkContainer } from 'react-router-bootstrap';
import { AppContext } from '../../Context/AppContext';


const Header = () => {
  const { cart, list } = useContext(AppContext);
 
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
              <LinkContainer to="/profile">
              <Nav.Link className="text-white">
                <User size={20} className="me-2"  />
              </Nav.Link>
              </LinkContainer>
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
     
    </>
  );
};

export default Header;
