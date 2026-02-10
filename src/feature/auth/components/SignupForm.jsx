import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// استيراد الأيقونات
import { FaRegUser, FaIdCard, FaRegEnvelope, FaLock, FaGoogle } from 'react-icons/fa';


const SignupForm = () => {
  // إضافة حقل idNumber للحالة
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', idNumber: '', email: '', password: '', confirmPassword: ''
    // ملاحظة: تم إزالة حقل الهاتف لأنه غير موجود في التصميم الجديد
  });
  const [passwordError, setPasswordError] = useState('');
  
  const { register, isRegisterPending, isRegisterError, registerError } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (passwordError) setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('كلمات المرور غير متطابقة');
      return;
    }

    // تجهيز البيانات للـ API
    const apiData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      national_id: formData.idNumber, // افتراض اسم الحقل في الباك اند
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword
      // تم إزالة الهاتف
    };
    
    // register(apiData); // تعليق مؤقت لحين جاهزية الباك اند
    console.log('Form Submitted:', apiData);
  };

  return (
    <>
      <div className="form-header">
        <h2>إنشاء حساب</h2>
        <p>لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link></p>
      </div>

      {(isRegisterError || passwordError) && (
        <div className="error-message">
          {passwordError || registerError?.message || 'حدث خطأ أثناء التسجيل'}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* صف مزدوج للاسم الأول والأخير */}
        <div className="form-row-double">
          <div className="input-group">
            <label className="input-label">الاسم الأول</label>
            <div className="input-wrapper">
                <input type="text" name="firstName" className="input-field input-with-icon" placeholder="محمد" onChange={handleChange} required />
                <FaRegUser className="field-icon" />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">الاسم الثاني</label>
            <div className="input-wrapper">
                <input type="text" name="lastName" className="input-field input-with-icon" placeholder="شعبان" onChange={handleChange} required />
                <FaRegUser className="field-icon" />
            </div>
          </div>
        </div>

        {/* حقل الرقم الشخصي الجديد */}
        <div className="input-group">
          <label className="input-label">الرقم الشخصي</label>
          <div className="input-wrapper">
            <input type="text" name="idNumber" className="input-field input-with-icon" placeholder="0953602162" onChange={handleChange} required />
            <FaIdCard className="field-icon" />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">البريد الإلكتروني</label>
          <div className="input-wrapper">
            <input type="email" name="email" className="input-field input-with-icon" placeholder="name@example.com" onChange={handleChange} required />
            <FaRegEnvelope className="field-icon" />
          </div>
        </div>

        {/* تم إزالة حقل الهاتف لعدم وجوده في التصميم */}

        <div className="input-group">
          <label className="input-label">كلمة المرور</label>
          <div className="input-wrapper">
            <input type="password" name="password" className="input-field input-with-icon" placeholder="********" onChange={handleChange} required />
            <FaLock className="field-icon" />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">تأكيد كلمة المرور</label>
          <div className="input-wrapper">
            <input type="password" name="confirmPassword" className="input-field input-with-icon" placeholder="********" onChange={handleChange} required />
            <FaLock className="field-icon" />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isRegisterPending}>
          {isRegisterPending ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
        </button>

        {/* زر التسجيل بواسطة جوجل */}
        <button type="button" className="google-btn">
           <img src="/imges/Icon-Google.png" alt="" />
            تسجيل الدخول بواسطة جوجل
        </button>
      </form>
      
      {/* تم نقل رابط تسجيل الدخول للأعلى داخل الهيدر حسب التصميم */}
    </>
  );
};

export default SignupForm;