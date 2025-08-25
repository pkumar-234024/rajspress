import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! In a real application, this would send your message.');
  };

  return (
    <Container className="py-5 contact-decoration">
      <div className="decoration-dots-right"></div>
      
      <Row className="mb-5">
        <Col xs={12} className="text-center contact-header mb-5">
          <h1 className="mb-3">Contact Us</h1>
          <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco.</p>
        </Col>
      </Row>
      
      <Row>
        <Col lg={6} className="mb-5 mb-lg-0">
          <div className="contact-info">
            <h4 className="mb-4 fw-bold">Get In Touch</h4>
            
            <div className="d-flex align-items-center mb-4">
              <div className="contact-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="contact-text">
                <h5>Our Address</h5>
                <p className="mb-0">99 S.t Jomblo Park Pekanbaru 28292, Indonesia</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-4">
              <div className="contact-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="contact-text">
                <h5>Phone Number</h5>
                <p className="mb-0">(+62)81 414 257 9980</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-4">
              <div className="contact-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="contact-text">
                <h5>Email Address</h5>
                <p className="mb-0">info@yourdomain.com</p>
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-4">
              <div className="contact-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="contact-text">
                <h5>Working Hours</h5>
                <p className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </Col>
        
        <Col lg={6}>
          <div className="bg-white p-4 p-lg-5 rounded shadow-sm">
            <h4 className="mb-4 fw-bold">Send Us A Message</h4>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Control 
                  type="text" 
                  placeholder="Your Name" 
                  className="contact-input"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Control 
                  type="email" 
                  placeholder="Your Email" 
                  className="contact-input"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Control 
                  type="tel" 
                  placeholder="Your Phone" 
                  className="contact-input"
                />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  placeholder="Your Message" 
                  className="contact-input"
                  required
                />
              </Form.Group>
              
              <Button 
                variant="primary" 
                type="submit" 
                className="contact-submit-btn"
              >
                Send Message
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;