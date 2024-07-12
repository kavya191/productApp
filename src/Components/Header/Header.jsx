import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';
import { AppContext } from '../../Context/AppContext';

const Header = () => {
  const { cart } = useContext(AppContext);

  // Calculate cart item count
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <Link to="/cart">
            <Button className="text-white me-3" type="submit">
              <ShoppingCart />{" "}
              <b>{cartItemCount}</b>
            </Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
