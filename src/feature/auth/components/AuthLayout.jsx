import React from 'react';
import { Link } from 'react-router-dom';
import './AuthLayout.css';
// استيراد صورة الشعار الذهبي (تأكد من المسار الصحيح)
import logoGold from '../../../../public/imges/gold-logo.png'; // افترضت أن الصورة بهذا الاسم وفي هذا المسار
// استيراد الأيقونات (تأكد من تثبيت react-icons)
import { FaGraduationCap, FaUserFriends } from 'react-icons/fa';


const AuthLayout = ({ children, title, subtitle }) => {
  // ملاحظة: الـ title و subtitle الممررة هنا سيتم تجاهلها لصالح النصوص الثابتة في التصميم الجديد
  // إلا إذا أردت جعلها ديناميكية. في هذا الكود سأجعلها ثابتة لتطابق الصورة تماماً.

  return (
    <div className="auth-container">
      <div className="auth-card-wrapper">
          
        {/* القسم الأيمن: المعلومات (سيظهر يميناً بسبب RTL) */}
        <div className="auth-info-section">
          <div className="auth-logo-container">
            <Link to="/">
              <img src={logoGold} alt="SLA Academy" className="auth-logo-img" />
            </Link>
          </div>
          
          <div className="auth-text-container">
            <h1 className="auth-title">
              التميز في التعليم<br />يبدأ من هنا.
            </h1>
            <p className="auth-subtitle">
              انضم إلى أكاديمية SL اليوم لفتح الموارد التعليمية المتميزة والمناهج التي يقودها الخبراء والمصممة لنجاحك.
            </p>
          </div>

          {/* قسم المميزات السفلي */}
          <div className="auth-features">
              <div className="feature-item">
                  <div className="feature-icon">
                      <FaGraduationCap />
                  </div>
                  <div className="feature-text">
                      <h4>دورات معتمدة</h4>
                      <p>شهادات معترف بها عالمياً</p>
                  </div>
              </div>
              <div className="feature-item">
                  <div className="feature-icon">
                      <FaUserFriends />
                  </div>
                  <div className="feature-text">
                      <h4>هيئة تدريس خبيرة</h4>
                      <p>تعلم من قادة الصناعة</p>
                  </div>
              </div>
          </div>
        </div>

        {/* القسم الأيسر: الفورم (سيظهر يساراً بسبب RTL) */}
        <div className="auth-form-section">
          <div className="form-wrapper">
            {children}
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default AuthLayout;