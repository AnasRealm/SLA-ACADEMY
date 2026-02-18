import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // استيراد useQuery
import { Camera, User, Mail, Phone, Lock, LogOut } from 'lucide-react';
import MainLayout from '../../shared/layout/MainLayout';
import { logoutUser, fetchUserProfile } from '../auth/services/authService'; // استيراد دالة الجلب
import './Profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 1. جلب بيانات المستخدم الحقيقية
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user-profile'],
    queryFn: fetchUserProfile,
    retry: 1,
  });

  // حالة لتغيير كلمة المرور (محلية)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password change submitted:", passwordData);
    // يمكنك هنا ربط دالة تغيير كلمة المرور من الـ API لاحقاً
    alert("سيتم تفعيل هذه الميزة قريباً");
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // في حال فشل الطلب، نحذف التوكن محلياً ونخرج المستخدم أيضاً
      localStorage.clear();
      navigate('/login');
    }
  };

  // معالجة تغيير الصورة (واجهة فقط حالياً)
  const handleEditPicClick = () => {
    fileInputRef.current.click();
  };
  
  const handleImageChange = (e) => {
    // يمكنك هنا إضافة كود لرفع الصورة للسيرفر
    if (e.target.files && e.target.files[0]) {
       alert("ميزة رفع الصورة تحتاج ربط API خاص بالصور");
    }
  };

  // معالجة عرض الصورة: إذا لم توجد صورة من السيرفر نستخدم صورة افتراضية
  const getUserImage = () => {
    if (user && user.avatar) {
        return user.avatar.startsWith('http') ? user.avatar : user.avatar;
    }
    return "/imges/user-icon-profile.jpg"; // صورة افتراضية
  };

  // عرض حالة التحميل
  if (isLoading) {
    return (
      <MainLayout>
        <div className="profile-container-new" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3>جاري تحميل البيانات...</h3>
        </div>
      </MainLayout>
    );
  }

  // عرض حالة الخطأ أو عدم وجود مستخدم
  if (isError || !user) {
    return (
      <MainLayout>
        <div className="profile-container-new" style={{ textAlign: 'center', padding: '50px' }}>
          <h3 style={{ color: 'red' }}>فشل تحميل بيانات المستخدم. يرجى تسجيل الدخول مجدداً.</h3>
          <button onClick={() => navigate('/login')} className="btn-logout" style={{ marginTop: '20px' }}>
             العودة لتسجيل الدخول
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="profile-container-new">
        <main className="profile-content-new">
          
          {/* قسم المعلومات الشخصية */}
          <section className="profile-section">
            <h3 className="section-title-new"><User /> المعلومات الشخصية</h3>
            <div className="personal-info-card">
              
              <div className="avatar-wrapper-new">
                <img src={getUserImage()} alt="الصورة الشخصية" className="profile-img-new" />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
                <button className="edit-pic-btn-new" title="تغيير الصورة" onClick={handleEditPicClick}>
                  <Camera size={18} />
                </button>
              </div>

              <div className="info-fields">
                <div className="info-field">
                  <label>الاسم الكامل</label>
                  {/* دمج الاسم الأول والثاني من الـ API */}
                  <div className="input-readonly">
                    {user.first_name} {user.last_name}
                  </div>
                </div>
                
                <div className="info-field">
                  <label>البريد الإلكتروني</label>
                  <div className="input-readonly">{user.email}</div>
                </div>
                
                <div className="info-field">
                  <label>رقم الهاتف</label>
                  <div className="input-readonly">
                    {user.phone ? user.phone : 'غير مضاف'}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* قسم تغيير كلمة المرور */}
          <section className="profile-section">
            <h3 className="section-title-new"><Lock /> تغيير كلمة السر</h3>
            <form className="password-form" onSubmit={handleChangePasswordSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="currentPassword">كلمة السر الحالية</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">كلمة السر الجديدة</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">تأكيد كلمة السر الجديدة</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-submit-password">حفظ التغييرات</button>
            </form>
          </section>

          {/* قسم تسجيل الخروج */}
          <section className="profile-section">
            <h3 className="section-title-new"><LogOut /> تسجيل الخروج</h3>
            <p>هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟</p>
            <button onClick={handleLogout} className="btn-logout">
              تسجيل الخروج
            </button>
          </section>

        </main>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;