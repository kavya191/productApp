import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, InputGroup, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';
import './Products.css';
import { AppContext } from '../../Context/AppContext';
import { FaStar, FaRegHeart } from "react-icons/fa";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const { addToCart,wishList,queryParams, updateQueryParams } = useContext(AppContext);

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

    axios.get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  useEffect(() => {
    const { category, sort, search } = queryParams;
    setLoading(true);

    let apiUrl = `https://fakestoreapi.com/products`;
    if (category) {
      apiUrl += `/category/${category}`;
    }

    axios.get(apiUrl)
      .then((response) => {
        let filteredProducts = response.data;

        if (search) {
          filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (sort) {
          filteredProducts = filteredProducts.sort((a, b) => {
            if (sort === 'price-asc') {
              return a.price - b.price;
            } else if (sort === 'price-desc') {
              return b.price - a.price;
            }
            return 0;
          });
        }

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setLoading(false);
      });
  }, [queryParams]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    updateQueryParams({ category });
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    updateQueryParams({ sort });
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    updateQueryParams({ search });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const search = queryParams.search || '';
    updateQueryParams({ search });
  };

  if (loading) {
    return <Spinner animation="border" />;
  }
  return (
    <Container>
      <Row className="mb-4">
        <Col md={6} className='pro_filter'>
          <Form.Select onChange={handleCategoryChange} value={queryParams.category || ''}>
            <option value=''>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select className='pro_filter' onChange={handleSortChange} value={queryParams.sort || ''}>
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
              value={queryParams.search || ''}
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
                <Card.Text className="pro_title">Rating: {product.rating.rate} <FaStar className='rating' /></Card.Text>
                <div className='btn_product'>
                  <Button className='add-to-cart' onClick={() => addToCart(product)}>Add to Cart <ShoppingCart /></Button>
                  <FaRegHeart className='wishlist' onClick={()=>wishList(product)} />
                  <Link to={`/viewproduct/${product.id}`}>
                    <Button className='single_view '>View Single</Button></Link>

                </div>
              </Card.Body>

            </Card>

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;