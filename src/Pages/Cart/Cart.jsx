import React, { useContext } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';
import '../Cart/Cart.css'
import { CiCircleRemove } from "react-icons/ci";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem } = useContext(AppContext);

  //update cart
  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateCartItem(productId, quantity);
    }
  };
  //calculate tolal
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };
  return (
    <Container className='cart_page'>
      <h2 className='cart_title' >Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <Table striped bordered hove
          className='mt-5'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
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
                <td className="border p-5"><img style={{ height: "70px" }} src={item?.image}></img>

                </td>
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
                  <Button className='border-0' onClick={() => removeFromCart(item.id)}>
                    <CiCircleRemove />
                  </Button>
                  <Button className='check_out' >
                    Check Out
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
