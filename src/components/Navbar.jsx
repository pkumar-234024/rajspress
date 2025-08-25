import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4F46E5" />
            <path d="M2 17L12 22L22 17" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="fw-bold">RajShree Printing Press</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/contact-us">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/admin">Admin</Link>
            </li>
          </ul>
          {/* <Link to="/cart" className="btn btn-outline-primary">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;