import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login, isLoginPending, isLoginError, loginError } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <>
      <div className="form-header">
        <h2>تسجيل الدخول</h2>
        <p>ليس لديك حساب؟ <Link to="/signup">أنشئ حساباً جديداً</Link></p>
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
            name="email"
            className="input-field"
            value={credentials.email}
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

        <button type="submit" className="submit-btn" disabled={isLoginPending}>
          {isLoginPending ? 'جاري التحقق...' : 'تسجيل الدخول'}
        </button>

        {/* زر التسجيل بواسطة جوجل */}
        <button type="button" className="google-btn">
           <img src="/imges/Icon-Google.png" alt="" />
            تسجيل الدخول بواسطة جوجل
        </button>
      </form>
    </>
  );
};

export default LoginForm;