import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from './Button';
import AuthModal from './AuthForm';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('signin'); // 'signin' | 'signup'

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const openLogin = () => {
    closeMobileMenu();
    setModalMode('signin');
    setModalOpen(true);
  };

  const openSignUp = () => {
    closeMobileMenu();
    setModalMode('signup');
    setModalOpen(true);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', showButton);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Travelog <sup>□</sup>
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-links" onClick={closeMobileMenu}>
                Products
              </Link>
            </li>

            {/* Mobile buttons — now trigger modal instead of routing */}
            <li className="nav-item">
              <span className="nav-links-mobile" onClick={openSignUp}>
                Sign Up
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-links-mobile" onClick={openLogin}>
                Log In
              </span>
            </li>
          </ul>

          {button && (
            <div className="navbar-buttons">
              <Button buttonStyle="btn--outline" buttonSize="btn--medium" onClick={openSignUp}>
                SIGN UP
              </Button>
              <Button buttonStyle="btn--primary" buttonSize="btn--medium" onClick={openLogin}>
                LOG IN
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal — controlled by Navbar */}
      <AuthModal
        isOpen={modalOpen}
        initialMode={modalMode}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default Navbar;