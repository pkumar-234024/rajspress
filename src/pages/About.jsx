import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMapMarkerAlt, faPhone, faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container py-5">
      <div className="about-header mb-5">
        <h1 className="text-center mb-2">About Us / हमारे बारे में</h1>
      </div>
      
      <div className="row mb-5">
        <div className="col-lg-7">
          <p className="mb-4">
            At RajShree Printing Press, we believe that print is a reflection of your story. From marketing materials to business cards, we help you tell your personal and business narrative, one printing order at a time — with quality, precision, and care.
          </p>
          <p className="mb-4 hindi-text">
            हमें अपनी उत्पादों और सेवा प्रदान करने का अनुभव है। हमारे पास आधुनिक प्रिंटिंग मशीनें हैं जो आपके प्रिंटिंग को उच्च गुणवत्ता के साथ पूरा करती हैं।
          </p>
          <p className="mb-4">
            We combine traditional craftsmanship with modern technology to deliver print products that stand out in quality and design.
          </p>
          <p className="mb-4 hindi-text">
            हम आधुनिक प्रिंट उत्पादों के निर्माण के लिए पारंपरिक कौशल और आधुनिक तकनीक का उपयोग करते हैं जो गुणवत्ता और डिजाइन में अलग दिखते हैं।
          </p>
        </div>
        <div className="col-lg-5">
          <div className="about-image-main mb-4">
            <img 
              src="https://placehold.co/600x400/e9ecef/495057?text=Team+Image" 
              alt="Our Team" 
              className="img-fluid rounded shadow-sm" 
            />
          </div>
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-lg-4 mb-4">
          <div className="about-image-secondary">
            <img 
              src="https://placehold.co/600x400/e9ecef/495057?text=Team+Member+1" 
              alt="Team Member" 
              className="img-fluid rounded shadow-sm" 
            />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="about-image-secondary">
            <img 
              src="https://placehold.co/600x400/e9ecef/495057?text=Team+Member+2" 
              alt="Team Member" 
              className="img-fluid rounded shadow-sm" 
            />
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="about-image-secondary">
            <img 
              src="https://placehold.co/600x400/e9ecef/495057?text=Team+Member+3" 
              alt="Team Member" 
              className="img-fluid rounded shadow-sm" 
            />
          </div>
        </div>
      </div>
      
      <div className="why-choose-us mb-5">
        <h2 className="mb-4">Why Choose Us? / हमें क्यों चुनें?</h2>
        
        <div className="feature-item mb-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faCheck} className="text-success me-3" />
            <div>
              <h5 className="mb-1">Quality Materials / उच्च गुणवत्ता वाली सामग्री</h5>
              <p className="text-muted mb-0">We use premium papers and inks for all our prints</p>
            </div>
          </div>
        </div>
        
        <div className="feature-item mb-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faCheck} className="text-success me-3" />
            <div>
              <h5 className="mb-1">Unique & Elegant Designs / अद्वितीय और सुंदर डिज़ाइन</h5>
              <p className="text-muted mb-0">Custom designs that make your brand stand out</p>
            </div>
          </div>
        </div>
        
        <div className="feature-item mb-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faCheck} className="text-success me-3" />
            <div>
              <h5 className="mb-1">Affordable Pricing / किफायती मूल्य निर्धारण</h5>
              <p className="text-muted mb-0">Competitive rates without compromising on quality</p>
            </div>
          </div>
        </div>
        
        <div className="feature-item mb-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faCheck} className="text-success me-3" />
            <div>
              <h5 className="mb-1">Fast Turnaround Time / तेज़ी से डिलीवरी का समय</h5>
              <p className="text-muted mb-0">Quick delivery to meet your deadlines</p>
            </div>
          </div>
        </div>
        
        <div className="feature-item mb-3">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faCheck} className="text-success me-3" />
            <div>
              <h5 className="mb-1">Personalized Support / हर चरण पर मिलने वाला व्यक्तिगत सहयोग</h5>
              <p className="text-muted mb-0">We're here to help you at every step of the process</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-info mb-5">
        <h5 className="mb-3">Contact Us / संपर्क करें</h5>
        <p className="mb-4">
          Need a design or need to know help choosing the right print for your event? We're here to help — we're always happy to help!
        </p>
        <p className="mb-4 hindi-text">
          हम आपके हर प्रिंट जरूरत के लिए तैयार हैं। आपके किसी भी प्रश्न के लिए हमसे संपर्क करें — हम हर समय आपकी सहायता के लिए तत्पर हैं।
        </p>
        
        <div className="contact-details">
          <div className="contact-item mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
            <span className="fw-bold">Address: </span>
            <span>123 Main Street, Anywhere, USA</span>
          </div>
          
          <div className="contact-item mb-2">
            <FontAwesomeIcon icon={faPhone} className="me-2" />
            <span className="fw-bold">Phone/WhatsApp: </span>
            <span>+91 9823457421</span>
          </div>
          
          <div className="contact-item mb-2">
            <FontAwesomeIcon icon={faGlobe} className="me-2" />
            <span className="fw-bold">Website: </span>
            <span>www.rajshreeprintingpress.com</span>
          </div>
          
          <div className="contact-item mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            <span className="fw-bold">Email: </span>
            <span>info@rajshreeprintingpress.com</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Link to="/contact" className="btn btn-primary">Contact Us Now</Link>
        </div>
      </div>
    </div>
  );
};

export default About;