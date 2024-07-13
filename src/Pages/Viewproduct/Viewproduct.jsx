import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import '../Viewproduct/Viewproduct.css'
const Viewproduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get(`https://fakestoreapi.com/products/${id}`)//get single view of product
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product", error);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) {
      return <Spinner animation="border" />;
    }
  
  return (
    <Container>
    <Row className='single_row'>
      <Col md="6" className='single_col'>
        <Card className="pro_card">
          <Card.Img className="pro_img" src={product.image} />
          <Card.Body className="pro_body">
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Rating: {product.rating.rate}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>

  )
}

export default Viewproduct