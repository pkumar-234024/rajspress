import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProductForm from '../components/ProductForm';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddNew = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await deleteProduct(id);
        if (response.isSuccess) {
          loadProducts();
        } else {
          setError('Failed to delete product');
        }
      } catch (err) {
        setError('Error deleting product');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    loadProducts();
  };

  if (loading && products.length === 0) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <button className="btn btn-primary" onClick={handleAddNew}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add New Product
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm ? (
        <ProductForm product={currentProduct} onClose={handleFormClose} />
      ) : (
        <div className="card shadow">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>In Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img 
                          src={product.imageName ? `https://placehold.co/50x50/007bff/white?text=${product.productName.charAt(0)}` : "https://placehold.co/50x50/007bff/white?text=N/A"} 
                          alt={product.productName}
                          className="img-thumbnail"
                          style={{ width: '50px', height: '50px' }}
                        />
                      </td>
                      <td>{product.productName}</td>
                      <td>₹{product.price}</td>
                      <td>{product.categoryId}</td>
                      <td>
                        {product.inStock ? 
                          <span className="badge bg-success"><FontAwesomeIcon icon={faCheck} /></span> : 
                          <span className="badge bg-danger"><FontAwesomeIcon icon={faTimes} /></span>
                        }
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2" 
                          onClick={() => handleEdit(product)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => handleDelete(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;