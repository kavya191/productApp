import React, { useContext } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';


const Cart = () => {
  const { cart, removeFromCart, updateCartItem } = useContext(AppContext);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateCartItem(productId, quantity);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Row>
        <Col>
          <h3>Total: ${calculateTotal()}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
