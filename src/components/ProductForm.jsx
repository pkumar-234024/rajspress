import React, { useState, useEffect, useRef } from 'react';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ product, onClose }) => {
  const initialFormState = {
    productName: '',
    price: 0,
    description: '',
    imageName: '',
    imagePath: '',
    categoryId: 1,
    productRating: 0,
    numberOfReviews: 0,
    productFeatures: [],
    printType: '',
    paperQuality: '',
    turnaroudnTime: 1,
    minimumOrderQuantity: 1,
    designSupport: '',
    delivery: '',
    inStock: true
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [featuresInput, setFeaturesInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        productFeatures: Array.isArray(product.productFeatures) 
          ? product.productFeatures 
          : (product.productFeatures ? product.productFeatures.split(',') : [])
      });
      setFeaturesInput(Array.isArray(product.productFeatures) 
        ? product.productFeatures.join(', ') 
        : (product.productFeatures || ''));
      
      // Set preview URLs if product has images
      if (product.images && Array.isArray(product.images)) {
        setPreviewUrls(product.images);
      } else if (product.imagePath) {
        setPreviewUrls([product.imagePath]);
      }
    }
  }, [product]);
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      
      // Create preview URLs for the selected images
      const newPreviewUrls = [];
      
      files.forEach(file => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          newPreviewUrls.push(fileReader.result);
          if (newPreviewUrls.length === files.length) {
            setPreviewUrls(newPreviewUrls);
          }
        };
        fileReader.readAsDataURL(file);
      });
      
      // Set the first image name as the main image name
      setFormData({
        ...formData,
        imageName: files[0].name
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? Number(value) : value
    });
  };

  const handleFeaturesChange = (e) => {
    setFeaturesInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      
      // Process features from comma-separated string to array
      const productFeatures = featuresInput.split(',').map(feature => feature.trim()).filter(Boolean);
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'productFeatures') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add productFeatures as JSON string
      formDataToSend.append('productFeatures', JSON.stringify(productFeatures));
      
      // Add files if selected
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
          formDataToSend.append(`imageFiles`, file);
        });
      }
      
      let response;
      if (product) {
        // Update existing product
        response = await updateProduct(product.id, formDataToSend);
      } else {
        // Create new product
        response = await createProduct(formDataToSend);
      }
      
      if (response.isSuccess) {
        onClose();
      } else {
        setError('Failed to save product');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="m-0">{product ? 'Edit Product' : 'Add New Product'}</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="productName" className="form-label">Product Name*</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="price" className="form-label">Price*</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description*</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            ></textarea>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="imageFile" className="form-label">Product Images</label>
              <input
                type="file"
                className="form-control"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                multiple
              />
              {previewUrls.length > 0 && (
                <div className="mt-2 d-flex flex-wrap">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="me-2 mb-2" style={{ position: 'relative' }}>
                      <img 
                        src={url} 
                        alt={`Product preview ${index + 1}`} 
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                      />
                      <button 
                        type="button" 
                        className="btn btn-sm btn-danger position-absolute" 
                        style={{ top: '-8px', right: '-8px', borderRadius: '50%', padding: '0.2rem 0.5rem' }}
                        onClick={() => {
                          const newUrls = [...previewUrls];
                          newUrls.splice(index, 1);
                          setPreviewUrls(newUrls);
                          
                          const newFiles = [...selectedFiles];
                          newFiles.splice(index, 1);
                          setSelectedFiles(newFiles);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="categoryId" className="form-label">Category ID</label>
              <input
                type="number"
                className="form-control"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="productRating" className="form-label">Product Rating</label>
              <input
                type="number"
                className="form-control"
                id="productRating"
                name="productRating"
                value={formData.productRating}
                onChange={handleChange}
                min="0"
                max="5"
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="numberOfReviews" className="form-label">Number of Reviews</label>
              <input
                type="number"
                className="form-control"
                id="numberOfReviews"
                name="numberOfReviews"
                value={formData.numberOfReviews}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="productFeatures" className="form-label">Product Features (comma-separated)</label>
            <textarea
              className="form-control"
              id="productFeatures"
              name="productFeatures"
              value={featuresInput}
              onChange={handleFeaturesChange}
              rows="2"
            ></textarea>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="printType" className="form-label">Print Type</label>
              <input
                type="text"
                className="form-control"
                id="printType"
                name="printType"
                value={formData.printType}
                onChange={handleChange}
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="paperQuality" className="form-label">Paper Quality</label>
              <input
                type="text"
                className="form-control"
                id="paperQuality"
                name="paperQuality"
                value={formData.paperQuality}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="turnaroudnTime" className="form-label">Turnaround Time (days)</label>
              <input
                type="number"
                className="form-control"
                id="turnaroudnTime"
                name="turnaroudnTime"
                value={formData.turnaroudnTime}
                onChange={handleChange}
                min="1"
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="minimumOrderQuantity" className="form-label">Minimum Order Quantity</label>
              <input
                type="number"
                className="form-control"
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                value={formData.minimumOrderQuantity}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="designSupport" className="form-label">Design Support</label>
              <input
                type="text"
                className="form-control"
                id="designSupport"
                name="designSupport"
                value={formData.designSupport}
                onChange={handleChange}
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <label htmlFor="delivery" className="form-label">Delivery</label>
              <input
                type="text"
                className="form-control"
                id="delivery"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inStock">In Stock</label>
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;