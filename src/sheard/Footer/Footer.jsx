import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo">
            <img src="/imges/logo.png" alt="SL Academy Logo" />
            <p>أكاديمية متخصصة في التعليم التقني والبرمجة كاديمية متخصصة في التعليم التقني والبرمج كاديمية متخصصة في التعليم التقني والبرمج</p>
            
            {/* Social Media */}
            <div className="social-media">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <ul>
              <li><a href="#home">الرئيسية</a></li>
              <li><a href="#courses">الدورات</a></li>
              <li><a href="#about">من نحن</a></li>
              <li><a href="#contact">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="footer-section">
            <h4>الدورات</h4>
            <ul>
              <li><a href="#programming">البرمجة</a></li>
              <li><a href="#design">التصميم</a></li>
              <li><a href="#english">اللغة الإنجليزية</a></li>
              <li><a href="#work">العمل الحر</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>تواصل معنا</h4>
            <div className="contact-info">
              <p>📧 info@slacademy.com</p>
              <p>📱 +966 123 456 789</p>
              <p>📍 الرياض، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2024 SL Academy. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;