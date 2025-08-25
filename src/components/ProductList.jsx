import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        if (response.isSuccess) {
          setProducts(response.value);
        } else {
          setError('Failed to fetch products');
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <div className="card h-100 shadow-sm">
            <img 
              src={product.imageName ? `https://placehold.co/400x300/007bff/white?text=${product.productName}` : "https://placehold.co/400x300/007bff/white?text=No+Image"} 
              className="card-img-top" 
              alt={product.productName} 
            />
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text text-truncate">{product.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-primary rounded-pill">₹{product.price} per piece</span>
                <div>
                  <span className="me-2">
                    <FontAwesomeIcon icon={faStar} className="text-warning" /> {product.productRating}
                  </span>
                  <span>({product.numberOfReviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white border-top-0">
              <Link to={`/products/${product.id}`} className="btn btn-outline-primary w-100">
                <FontAwesomeIcon icon={faInfoCircle} className="me-1" /> View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;