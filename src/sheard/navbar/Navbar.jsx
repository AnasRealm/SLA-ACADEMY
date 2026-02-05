import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../feature/auth/loginForm/LoginForm';
import Signup from '../../feature/auth/signupForm/Signup';
import './navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  // التعامل مع التمرير لتغيير لون الناف بار
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // دالة للتعامل مع أيقونة المستخدم
  const handleUserClick = () => {
    const isLoggedIn = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      setShowLoginModal(true);
    }
  };

  // دالة لإغلاق القائمة عند الضغط على رابط
  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    
    // إذا كنا في صفحة أخرى، انتقل للهوم أولاً
    if (window.location.pathname !== '/') {
      navigate('/');
      // انتظار قليل للانتقال ثم التمرير
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // إذا كنا في الهوم، تمرير مباشر
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          {/* 1. اللوجو (يمين الشاشة) */}
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src="/imges/logo.png" alt="SL Academy" />
          </div>

          {/* 2. روابط الديسكتوب (وسط الشاشة - تختفي بالموبايل) */}
          <ul className="nav-menu-desktop">
            <li onClick={() => handleLinkClick('home')}>الرئيسية</li>
            <li onClick={() => handleLinkClick('categories')}>الدورات</li>
            <li onClick={() => navigate('/Specializations')}>التخصصات</li>
            <li onClick={() => handleLinkClick('about')}>من نحن</li>
            <li onClick={() => navigate('/contact')}>تواصل معنا</li>
          </ul>

          {/* 3. الأزرار وأيقونة المستخدم (يسار الشاشة) */}
          <div className="nav-actions">
            <button className="icon-btn" title="الملف الشخصي" onClick={handleUserClick}>
              <i className="fas fa-user"></i>
            </button>
            <button className="login-btn-desktop" onClick={() => setShowLoginModal(true)}>تسجيل الدخول</button>
            
            {/* زر الهامبرغر (يظهر فقط بالموبايل) */}
            <div className="hamburger-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. قائمة الموبايل الجانبية (Sidebar) */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
           <img src="/imges/logo.png" alt="Logo" />
           <i className="fas fa-times close-sidebar" onClick={() => setIsMobileMenuOpen(false)}></i>
        </div>
        
        <ul className="mobile-menu-links">
          <li onClick={() => handleLinkClick('home')}>الرئيسية</li>
          <li onClick={() => handleLinkClick('categories')}>الدورات</li>
          <li onClick={() => navigate('/Specializations')}>التخصصات</li>
          <li onClick={() => handleLinkClick('about')}>من نحن</li>
          <li onClick={() => navigate('/contact')}>تواصل معنا</li>
        </ul>

        <div className="mobile-sidebar-footer">
          <button className="mobile-login-btn" onClick={() => setShowLoginModal(true)}>تسجيل الدخول</button>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginForm 
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <Signup 
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};

export default Navbar;