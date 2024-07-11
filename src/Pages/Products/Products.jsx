import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, InputGroup, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useSearchParams } from 'react-router-dom';

import './Products.css';
import { AppContext } from '../../Context/AppContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setLoading(false);
      });
    
    // Fetch categories
    axios.get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';
    setLoading(true);

    let apiUrl = `https://fakestoreapi.com/products`;
    if (category) {
      apiUrl += `/category/${category}`;
    }

    axios.get(apiUrl)
      .then((response) => {
        let sortedProducts = response.data;
        if (sort) {
          sortedProducts = sortedProducts.sort((a, b) => {
            if (sort === 'price-asc') {
              return a.price - b.price;
            } else if (sort === 'price-desc') {
              return b.price - a.price;
            }
            return 0;
          });
        }
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setLoading(false);
      });
  }, [searchParams]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSearchParams({ category, sort: searchParams.get('sort') || '' });
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSearchParams({ category: searchParams.get('category') || '', sort });
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchParams({ category: searchParams.get('category') || '', sort: searchParams.get('sort') || '', search });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const search = searchParams.get('search') || '';
    setSearchParams({ category: searchParams.get('category') || '', sort: searchParams.get('sort') || '', search });
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col md={6} className='pro_filter'>
          <Form.Select onChange={handleCategoryChange} value={searchParams.get('category') || ''}>
            <option value=''>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select className='pro_filter' onChange={handleSortChange} value={searchParams.get('sort') || ''}>
            <option value=''>Sort By</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchParams.get('search') || ''}
              onChange={handleSearchChange}
            />
            <Button variant="outline-secondary" onClick={handleSearchSubmit}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="pro_row">
        {products.map((product) => (
          <Col key={product.id} md={4} className="pro_col">
            <Card className="pro_card">
              <Card.Img className="pro_img" src={product.image} />
              <Card.Body className="pro_body">
                <Card.Title className="pro_title">{product.title}</Card.Title>
                <Card.Text className="pro_title">Price: ${product.price}</Card.Text>
                <Card.Text className="pro_title">Rating: {product.rating.rate}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;

