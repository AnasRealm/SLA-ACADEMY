import React, { useState } from 'react';
import './navbar.css';
import LoginForm from '../../feature/auth/loginForm/LoginForm';
import Signup from '../../feature/auth/signupForm/Signup';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // حالة تسجيل الدخول
  const navigate = useNavigate();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    // إذا لم نكن في الصفحة الرئيسية، انتقل إليها أولاً
    if (window.location.pathname !== '/') {
      navigate('/');
      // انتظار قليل للانتقال ثم التمرير
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      openSignup();
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src="/imges/logo.png" alt="" />
          </div>

          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')}>الرئيسية</a></li>
            <li><a href="#courses" onClick={(e) => handleSmoothScroll(e, 'courses')}>الدورات</a></li>
            <li><a href="#categories" onClick={(e) => handleSmoothScroll(e, 'categories')}>التخصصات</a></li>
            <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')}>من نحن</a></li>
            <li><button className="nav-link-btn" onClick={() => navigate('/contact')}>تواصل معنا</button></li>
          </ul>

          <div className="nav-actions">
            <button className="user-icon-btn" onClick={handleUserIconClick} title={isLoggedIn ? "الملف الشخصي" : "تسجيل الدخول"}>
              <i className="fas fa-user"></i>
            </button>
            <button className="join-btn" onClick={openSignup}>تسجيل الدخول</button>
          </div>
        </div>
      </nav>

      {showLogin && (
        <LoginForm
          onClose={closeModals}
          onSwitchToSignup={openSignup}
        />
      )}

      {showSignup && (
        <Signup
          onClose={closeModals}
          onSwitchToLogin={openLogin}
        />
      )}
    </>
  );
};

export default Navbar;