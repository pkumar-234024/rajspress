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
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Sample products data for demonstration
  const sampleProducts = [
    {
      id: 1,
      name: 'Banner Printing',
      description: 'Large format banner printing for events and advertising',
      image: 'https://placehold.co/600x400/e9ecef/495057?text=Banner',
      price: 29.99,
      rating: 4.7,
      reviewCount: 50,
      category: 'Banners'
    },
    {
      id: 2,
      name: 'Brochure Design & Print',
      description: 'Custom brochure design and high-quality printing',
      image: 'https://placehold.co/600x400/e9ecef/495057?text=Brochure',
      price: 19.99,
      rating: 4.6,
      reviewCount: 73,
      category: 'Brochures'
    },
    {
      id: 3,
      name: 'Business Cards',
      description: 'Professional business cards with premium quality',
      image: 'https://placehold.co/600x400/e9ecef/495057?text=BusinessCards',
      price: 9.99,
      rating: 4.8,
      reviewCount: 89,
      category: 'Cards'
    },
    {
      id: 4,
      name: 'Letterhead Design',
      description: 'Professional letterhead design and printing',
      image: 'https://placehold.co/600x400/e9ecef/495057?text=Letterhead',
      price: 14.99,
      rating: 4.8,
      reviewCount: 31,
      category: 'Stationery'
    },
    {
      id: 5,
      name: 'Flyer Printing',
      description: 'High-quality flyer printing for promotions',
      image: 'https://placehold.co/600x400/e9ecef/495057?text=Flyer',
      price: 12.99,
      rating: 4.5,
      reviewCount: 45,
      category: 'Flyers'
    },
    {
      id: 6,
      name: 'Poster Design',
      description: 'Eye-catching poster design and printing',
      image: 'https://placehold.co/600x400/e9ecef/495057?text=Poster',
      price: 24.99,
      rating: 4.7,
      reviewCount: 62,
      category: 'Posters'
    }
  ];

  // Filter products based on search term and category
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'Price: Low to High') {
      return a.price - b.price;
    } else if (sortBy === 'Price: High to Low') {
      return b.price - a.price;
    } else if (sortBy === 'Rating') {
      return b.rating - a.rating;
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
              <option value="Banners">Banners</option>
              <option value="Brochures">Brochures</option>
              <option value="Cards">Cards</option>
              <option value="Stationery">Stationery</option>
              <option value="Flyers">Flyers</option>
              <option value="Posters">Posters</option>
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
        <p className="mb-0">Showing {sortedProducts.length} of {sampleProducts.length} products</p>
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