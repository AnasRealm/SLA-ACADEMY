import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    console.log('Signup:', formData);
    // هنا يمكن إضافة منطق التسجيل
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="auth-header">
          <h2>إنشاء حساب جديد</h2>
          <p>انضم إلى مجتمع SL Academy</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>الاسم الأول</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="الاسم الأول"
                required
              />
            </div>
            <div className="form-group">
              <label>الاسم الأخير</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="الاسم الأخير"
                required
              />
            </div>
          </div>

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
            <label>رقم الهاتف</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0953602163"
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

          <div className="form-group">
            <label>تأكيد كلمة المرور</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="أعد إدخال كلمة المرور"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            إنشاء الحساب
          </button>

          <div className="divider">
            <span>أو</span>
          </div>

          <button type="button" className="google-btn">
            <img src="/imges/Icon-Google.png" alt="Google" className="google-icon" />
            التسجيل باستخدام Google
          </button>
        </form>

        <div className="auth-footer">
          <p>لديك حساب بالفعل؟ <span onClick={onSwitchToLogin}>تسجيل الدخول</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;