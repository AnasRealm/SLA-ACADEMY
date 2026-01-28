import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    // هنا يمكن إضافة منطق تسجيل الدخول
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="auth-header">
          <h2>تسجيل الدخول</h2>
          <p>مرحباً بعودتك إلى SL Academy</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            تسجيل الدخول
          </button>

          <div className="divider">
            <span>أو</span>
          </div>

          <button type="button" className="google-btn">
            <img src="/imges/Icon-Google.png" alt="Google" className="google-icon" />
            تسجيل الدخول باستخدام Google
          </button>
        </form>

        <div className="auth-footer">
          <p>ليس لديك حساب؟ <span onClick={onSwitchToSignup}>إنشاء حساب جديد</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;