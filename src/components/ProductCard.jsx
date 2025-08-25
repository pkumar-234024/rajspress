import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  // Render star ratings
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} className="text-warning" />);
    }

    return stars;
  };

  return (
    <div className="card h-100 product-card border-0 shadow-sm">
      <Link to={`/products/${product.id}`} className="text-decoration-none">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <div className="d-flex align-items-center mb-2">
            {renderRating(product.rating)}
            <span className="ms-2 text-muted">{product.rating} ({product.reviewCount})</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;