import React from 'react';
import { Navbar, Nav, Container, Button, Row, Col, Form } from 'react-bootstrap';
import { FaWrench, FaCarCrash, FaTachometerAlt, FaTools } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand href="#">Car Berz</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#">Service</Nav.Link>
              <Nav.Link href="#">Maintenance</Nav.Link>
              <Nav.Link href="#">Repairs</Nav.Link>
              <Nav.Link href="#">Diagnostics</Nav.Link>
              <Button variant="primary" href="#booking">Book Now</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero d-flex align-items-center text-center">
        <Container>
          <h1>Premium Car Service</h1>
          <p>Exclusive Services for Mercedes Owners</p>
          <Button variant="primary" href="#booking">Schedule Service</Button>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services py-5">
        <Container>
          <h2 className="text-center mb-4">Our Services</h2>
          <Row className="text-center">
            <Col md={3}>
              <FaWrench size={50} />
              <h3>Maintenance</h3>
              <p>Top quality maintenance for your Mercedes</p>
            </Col>
            <Col md={3}>
              <FaCarCrash size={50} />
              <h3>Repairs</h3>
              <p>Accurate and safe repairs for your vehicle</p>
            </Col>
            <Col md={3}>
              <FaTachometerAlt size={50} />
              <h3>Diagnostics</h3>
              <p>Advanced diagnostics to prevent issues</p>
            </Col>
            <Col md={3}>
              <FaTools size={50} />
              <h3>Custom Care</h3>
              <p>Personalized care and custom modifications</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Booking Form */}
      <section id="booking" className="booking py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Book Your Service</h2>
          <Form className="booking-form">
            <Row>
              <Col md={6}>
                <Form.Group controlId="formServiceType">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Control as="select">
                    <option>Choose...</option>
                    <option>Maintenance</option>
                    <option>Repairs</option>
                    <option>Diagnostics</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDate">
                  <Form.Label>Preferred Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-4">
        <Container className="text-center">
          <p>&copy; 2024 Car Berz - Mercedes Premium Service. All Rights Reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
