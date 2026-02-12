import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { FaLock } from 'react-icons/fa';

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const { resetPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة");
      return;
    }

    resetPassword({
      email: email,
      token: token,
      password: formData.password,
      password_confirmation: formData.confirmPassword
    });
  };

  return (
    <>
      <div className="form-header">
        <h2>تعيين كلمة مرور جديدة</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">كلمة المرور الجديدة</label>
          <div className="input-wrapper">
             <input 
                type="password" 
                className="input-field input-with-icon" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
             />
             <FaLock className="field-icon" />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">تأكيد كلمة المرور</label>
          <div className="input-wrapper">
             <input 
                type="password" 
                className="input-field input-with-icon"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required 
             />
             <FaLock className="field-icon" />
          </div>
        </div>
        <button type="submit" className="submit-btn">تغيير كلمة المرور</button>
      </form>
    </>
  );
};

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPasswordPage;