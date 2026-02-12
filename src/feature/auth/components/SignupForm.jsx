import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { getGoogleAuthUrl } from '../services/authService';
import { FaRegUser, FaPhone, FaRegEnvelope, FaLock } from 'react-icons/fa';

const schema = yup.object().shape({
  firstName: yup.string().required('الاسم الأول مطلوب').min(3, 'الاسم الأول يجب أن يكون 3 أحرف على الأقل'),
  lastName: yup.string().required('الاسم الثاني مطلوب').min(3, 'الاسم الثاني يجب أن يكون 3 أحرف على الأقل'),
  phone: yup.string().required('رقم الهاتف مطلوب').matches(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط").min(10, 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل'),
  email: yup.string().required('البريد الإلكتروني مطلوب').email('صيغة البريد الإلكتروني غير صالحة'),
  password: yup.string().required('كلمة المرور مطلوبة').min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'كلمات المرور غير متطابقة').required('تأكيد كلمة المرور مطلوب'),
});

const SignupForm = () => {
  const { register: authRegister, isRegisterPending, isRegisterError, registerError } = useAuth();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isRegisterError && registerError?.response?.data?.errors) {
      const apiErrors = registerError.response.data.errors;
      if (apiErrors.email) {
        setError('email', { type: 'manual', message: 'البريد الإلكتروني مستخدم بالفعل' });
      }
      if (apiErrors.phone) {
        setError('phone', { type: 'manual', message: 'رقم الهاتف مستخدم بالفعل' });
      }
    }
  }, [isRegisterError, registerError, setError]);

  const handleGoogleLogin = async () => {
    try {
      const response = await getGoogleAuthUrl();
      if (response?.data?.url || response?.url) {
        window.location.href = response.data?.url || response.url;
      }
    } catch (error) {
      console.error("Google Auth Error", error);
    }
  };

  const onSubmit = (data) => {
    const apiData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    };
    
    authRegister(apiData);
  };

  return (
    <>
      <div className="form-header">
        <h2>إنشاء حساب</h2>
      </div>

      {isRegisterError && !errors.email && !errors.phone && (
        <div className="error-message">
          {registerError?.message || 'فشل التسجيل، يرجى التحقق من البيانات'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row-double">
          <div className="input-group">
            <label className="input-label">الاسم الأول</label>
            <div className="input-wrapper">
                <input type="text" {...register('firstName')} className={`input-field input-with-icon ${errors.firstName ? 'is-invalid' : ''}`} placeholder="محمد" />
                <FaRegUser className="field-icon" />
            </div>
            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
          </div>
          <div className="input-group">
            <label className="input-label">الاسم الثاني</label>
            <div className="input-wrapper">
                <input type="text" {...register('lastName')} className={`input-field input-with-icon ${errors.lastName ? 'is-invalid' : ''}`} placeholder="شعبان" />
                <FaRegUser className="field-icon" />
            </div>
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">رقم الهاتف</label>
          <div className="input-wrapper">
            <input type="tel" {...register('phone')} className={`input-field input-with-icon ${errors.phone ? 'is-invalid' : ''}`} placeholder="+963..." />
            <FaPhone className="field-icon" />
          </div>
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>

        <div className="input-group">
          <label className="input-label">البريد الإلكتروني</label>
          <div className="input-wrapper">
            <input type="email" {...register('email')} className={`input-field input-with-icon ${errors.email ? 'is-invalid' : ''}`} placeholder="name@example.com" />
            <FaRegEnvelope className="field-icon" />
          </div>
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <label className="input-label">كلمة المرور</label>
          <div className="input-wrapper">
            <input type="password" {...register('password')} className={`input-field input-with-icon ${errors.password ? 'is-invalid' : ''}`} placeholder="********" />
            <FaLock className="field-icon" />
          </div>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="input-group">
          <label className="input-label">تأكيد كلمة المرور</label>
          <div className="input-wrapper">
            <input type="password" {...register('confirmPassword')} className={`input-field input-with-icon ${errors.confirmPassword ? 'is-invalid' : ''}`} placeholder="********" />
            <FaLock className="field-icon" />
          </div>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="submit-btn" disabled={isRegisterPending}>
          {isRegisterPending ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
        </button>

        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
           <img src="/imges/Icon-Google.png" alt="" />
            التسجيل بواسطة جوجل
        </button>
      </form>
      
      <div className="form-footer">
        <p>لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link></p>
      </div>
    </>
  );
};

export default SignupForm;