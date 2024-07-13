import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Container, Row, Col, Table } from 'react-bootstrap';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // Fetch data from fake API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setFilteredResults(data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = results.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Form onSubmit={handleSearch} inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map(result => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.title}</td>
                  <td>{result.body}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
