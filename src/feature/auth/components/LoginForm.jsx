import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ForgotPasswordModal from './ForgotPasswordModal';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const { login, isLoginPending, isLoginError, loginError } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

// داخل LoginForm.jsx

const handleGoogleLogin = () => {

    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/continue-with-google`;
};

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="form-header">
        <h2>تسجيل الدخول</h2>
      </div>

      {isLoginError && (
        <div className="error-message">
          {loginError?.message || 'حدث خطأ أثناء تسجيل الدخول'}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">البريد الإلكتروني</label>
          <input
            type="email"
            name="login"
            className="input-field"
            value={credentials.login}
            onChange={handleChange}
            required
            placeholder="example@domain.com"
          />
        </div>

        <div className="input-group">
          <label className="input-label">كلمة المرور</label>
          <input
            type="password"
            name="password"
            className="input-field"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>

        <div className="forgot-password-link" onClick={openModal}>
          هل نسيت كلمة المرور؟
        </div>

        <button type="submit" className="submit-btn" disabled={isLoginPending}>
          {isLoginPending ? 'جاري التحقق...' : 'تسجيل الدخول'}
        </button>

        {/* زر التسجيل بواسطة جوجل - تم تفعيله */}
        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
           <img src="/imges/Icon-Google.png" alt="" />
            تسجيل الدخول بواسطة جوجل
        </button>
         <div className="form-header">
        <p>ليس لديك حساب؟ <Link to="/signup">أنشئ حساباً جديداً</Link></p>
      </div>
      </form>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default LoginForm;