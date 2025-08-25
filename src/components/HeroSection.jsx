import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const HeroSection = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold mb-3">
            Your Vision, <span className="text-primary">Perfectly Printed</span>
          </h1>
          <p className="lead text-muted mb-4">
            From elegant wedding invitations to professional business materials, we bring your
            ideas to life with precision and creativity.
          </p>
          
          <div className="d-flex justify-content-center justify-content-lg-start mb-5">
            <div className="me-5 text-center">
              <h2 className="text-primary fw-bold mb-0">500+</h2>
              <p className="small text-muted">Happy Customers</p>
            </div>
            <div className="me-5 text-center">
              <h2 className="text-primary fw-bold mb-0">1000+</h2>
              <p className="small text-muted">Projects Completed</p>
            </div>
            <div className="text-center">
              <h2 className="text-primary fw-bold mb-0">4.9</h2>
              <p className="small text-muted">⭐ Rating</p>
            </div>
          </div>
          
          <div className="d-flex flex-column flex-sm-row gap-3">
            <Link to="/products" className="btn btn-primary px-4 py-2 rounded-pill">
              Explore Products <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Link>
            <Link to="/contact" className="btn btn-outline-primary px-4 py-2 rounded-pill">
              Get Quote
            </Link>
          </div>
        </div>
        
        <div className="col-lg-5 d-none d-lg-block">
          {/* This would be replaced with an actual image in a real implementation */}
          <div className="position-relative">
            <div className="bg-light rounded-3 p-5 mt-4" style={{ height: '400px' }}>
              {/* Placeholder for hero image */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;