import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);



  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await getProductById(id);
        console.log(response.value)
        setProduct(response.value);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error || 'Product not found'}</div>
        <Link to="/products" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  // Render star ratings
  const renderRating = (rating = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} className="text-warning" />);
      } else {
        stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} className="text-muted" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="container py-4">
      {/* Back to Products Link */}
      <Link to="/products" className="d-flex align-items-center text-decoration-none mb-4 back-link">
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        <span>Back to Products</span>
      </Link>
      
      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6 mb-4">
          <div className="product-gallery">
            <div className="main-image mb-3">
              <img 
                src={'https://allinone.runasp.net/uploadimage/image/' + product.imageName || 'https://placehold.co/600x400'} 
                className="img-fluid rounded shadow-sm" 
                alt={product.productName || 'Product Image'} 
              />
            </div>
            <div className="d-flex thumbnail-container">
              {product.images?.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail me-2 ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image || 'https://placehold.co/100x100'} 
                    className="img-fluid rounded" 
                    alt={`${product.productName || 'Thumbnail'} ${index + 1}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Information */}
        <div className="col-lg-6">
          <div className="product-info bg-white p-4 rounded shadow-sm">
            <h1 className="product-title mb-2">{product.productName || 'Product Name'}</h1>
            
            <div className="d-flex align-items-center mb-2">
              <div className="me-2">
                {renderRating(product.productRating)}
              </div>
              <span className="text-muted">{product.productRating || 0} ({product.numberOfReviews || 0} reviews)</span>
            </div>
            
            <p className="product-description text-muted mb-4">{product.description || 'No description available'}</p>
            
            <div className="price-container d-flex justify-content-between align-items-center mb-4">
              <h2 className="price mb-0">₹{product.price || 0}</h2>
              <span className={`stock-status ${product.inStock ? 'text-success' : 'text-danger'}` || 'text-muted'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="key-features bg-white p-4 rounded shadow-sm mt-4">
            <h3 className="mb-3">Key Features</h3>
            <div className="row">
              {(product.productFeatures || []).map((feature, index) => (
                <div key={index} className="col-md-6 mb-2">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                    <span>{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Specifications */}
          <div className="specifications bg-white p-4 rounded shadow-sm mt-4">
            <h3 className="mb-3">Specifications</h3>
            <table className="table table-borderless">
              <tbody>
                {Object.entries(product.specifications || {}).map(([key, value], index) => (
                  <tr key={index}>
                    <td className="text-muted" style={{ width: '40%' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;