import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedWork = () => {
  // Sample featured projects - in a real app, these would come from an API
  const featuredProjects = [
    {
      id: 1,
      title: 'Corporate Brochures',
      image: 'https://placehold.co/300x200/e9ecef/495057?text=Brochure',
      category: 'Business'
    },
    {
      id: 2,
      title: 'Wedding Invitations',
      image: 'https://placehold.co/300x200/e9ecef/495057?text=Wedding',
      category: 'Personal'
    },
    {
      id: 3,
      title: 'Product Packaging',
      image: 'https://placehold.co/300x200/e9ecef/495057?text=Packaging',
      category: 'Retail'
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Featured Work</h2>
          <p className="text-muted">Discover our latest printing projects and designs</p>
        </div>
        
        <div className="row g-4">
          {featuredProjects.map(project => (
            <div key={project.id} className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <img 
                  src={project.image} 
                  className="card-img-top" 
                  alt={project.title}
                />
                <div className="card-body">
                  <span className="badge bg-primary mb-2">{project.category}</span>
                  <h5 className="card-title">{project.title}</h5>
                  <Link to={`/products/${project.id}`} className="btn btn-sm btn-outline-primary mt-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;