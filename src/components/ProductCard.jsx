import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const API_URL = import.meta.env.VITE_API_URL;
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
          src={`${API_URL}/uploadimage/image/${product.imageName}`}
          className="card-img-top"
          alt={product.productName}
        />
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <div className="d-flex align-items-center mb-2">
            {renderRating(product.productRating)}
            <span className="ms-2 text-muted">{product.productRating} ({product.numberOfReviews} reviews)</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;