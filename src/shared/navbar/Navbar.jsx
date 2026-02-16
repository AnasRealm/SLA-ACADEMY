import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../feature/auth/hooks/useAuth';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    const handleStorageChange = () => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle scroll to change navbar color
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };
  
  const handleLogout = () => {
    logout();
  }

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src="/imges/logo.png" alt="SL Academy" />
          </div>

          <ul className="nav-menu-desktop">
            <li onClick={() => handleLinkClick('home')}>الرئيسية</li>
            <li onClick={() => handleLinkClick('categories')}>الدورات</li>
            <li onClick={() => navigate('/TrainingCourses')}>التخصصات</li>
            <li onClick={() => handleLinkClick('about')}>من نحن</li>
            <li onClick={() => navigate('/contact')}>تواصل معنا</li>
          </ul>

          <div className="nav-actions">
            <button className="icon-btn" title="الملف الشخصي" onClick={handleUserClick}>
              <i className="fas fa-user"></i>
            </button>
            
            {isLoggedIn ? (
              <button className="login-btn-desktop" onClick={handleLogout}>تسجيل الخروج</button>
            ) : (
              <>
                <Link to="/login" className="login-btn-desktop">تسجيل الدخول</Link>
                {/* <Link to="/signup" className="signup-btn-desktop">إنشاء حساب</Link> */}
              </>
            )}

            <div className="hamburger-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
           <img src="/imges/logo.png" alt="Logo" />
           <i className="fas fa-times close-sidebar" onClick={() => setIsMobileMenuOpen(false)}></i>
        </div>
        
        <ul className="mobile-menu-links">
          <li onClick={() => handleLinkClick('home')}>الرئيسية</li>
          <li onClick={() => handleLinkClick('categories')}>الدورات</li>
          <li onClick={() => navigate('/TrainingCourses')}>التخصصات</li>
          <li onClick={() => handleLinkClick('about')}>من نحن</li>
          <li onClick={() => navigate('/contact')}>تواصل معنا</li>
        </ul>

        <div className="mobile-sidebar-footer">
          {isLoggedIn ? (
             <button className="mobile-login-btn" onClick={handleLogout}>تسجيل الخروج</button>
          ) : (
            <>
              <Link to="/login" className="mobile-login-btn" onClick={() => setIsMobileMenuOpen(false)}>تسجيل الدخول</Link>
              <Link to="/signup" className="mobile-signup-btn" onClick={() => setIsMobileMenuOpen(false)}>إنشاء حساب</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;