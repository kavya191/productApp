import React, { useContext } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import { AppContext } from '../../Context/AppContext';
import { CiCircleRemove } from "react-icons/ci";
import '../Wishlist/Wishlist.css'
const Wishlist = () => {
  const {list, removeFromList, updateListItem}=useContext(AppContext)

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateListItem(productId, quantity);
    }
  };

  return (
    <Container className='list_page'>
    <h2 className='list_title' >Your Wishlist</h2>
    {list.length === 0 ? (
      <p>Your wishlist is empty</p>
    ) : (
      <Table striped bordered hove className='mt-5'>
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
          {list.map((item) => (
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
                <Button className='border-0' onClick={() => removeFromList(item.id)}>
                  <CiCircleRemove/>
                </Button>
             
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
 
  </Container>
  )
}

export default Wishlist