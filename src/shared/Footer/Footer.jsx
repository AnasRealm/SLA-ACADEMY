import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo">
            <img src="/imges/logo.png" alt="SL Academy Logo" loading="lazy" />
            <p>
              أكاديمية متخصصة في التعليم التقني والبرمجة متخصصة في التطوير
              التقني
            </p>

            {/* Social Media */}
            <div className="social-media">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <ul>
              <li>
                <a href="#home" onClick={(e) => handleSectionClick(e, "home")}>
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#categories" onClick={(e) => handleSectionClick(e, "categories")}>
                  الدورات
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleSectionClick(e, "about")}>
                  من نحن
                </a>
              </li>
              <li>
                <Link to="/contact">تواصل معنا</Link>
              </li>
            </ul>
          </div>

          {/* Courses / دوراتنا */}
          <div className="footer-section">
            <h4>دوراتنا</h4>
            <ul>
              <li>
                <a href="#courses" onClick={(e) => handleSectionClick(e, "courses")}>
                  البرمجة
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSectionClick(e, "courses")}>
                  التصميم
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSectionClick(e, "courses")}>
                  اللغة الإنجليزية
                </a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleSectionClick(e, "courses")}>
                  العمل الحر
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>تواصل معنا</h4>
            <div className="contact-info">
              <p>📧 ramaalbanialmorahli@gmail.com</p>
              <p>📱 +963 968 364 986</p>
              <p>📍 دمشق , بجانب كلية الاقتصاد </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; 2026 SL Academy. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
