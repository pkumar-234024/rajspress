import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faFilter } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Name');
  const [category, setCategory] = useState('All');
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProducts();
        // Ensure we're getting an array of products
        const productsArray = Array.isArray(response) ? response : 
                            Array.isArray(response?.value) ? response.value :
                            Array.isArray(response?.data) ? response.data : 
                            Array.isArray(response?.products) ? response.products : [];
        //console.log('Products Array:', productsArray); // Debug log
        setProducts(productsArray);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.categoryId?.toString() === category;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Name') {
      const nameA = (a?.productName || '').toLowerCase();
      const nameB = (b?.productName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    } else if (sortBy === 'Price: Low to High') {
      return (a?.price || 0) - (b?.price || 0);
    } else if (sortBy === 'Price: High to Low') {
      return (b?.price || 0) - (a?.price || 0);
    } else if (sortBy === 'Rating') {
      return (b?.productRating || 0) - (a?.productRating || 0);
    }
    return 0;
  });

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
    <div className="container py-4">
      {/* Search and Filter Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <div className="me-3">
            <select 
              className="form-select" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
              <option value="4">Category 4</option>
              <option value="5">Category 5</option>
            </select>
          </div>
          <div className="me-3">
            <select 
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Sort by Name</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary">
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
        </div>
      </div>

      {/* Products Count and Cart */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="mb-0">Showing {sortedProducts.length} of {products.length} products</p>
        <div className="cart-icon">
          <Link to="/cart" className="text-decoration-none">
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            <span>{cartItems} items in cart</span>
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="row g-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Loading and Error States */}
      {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Products;