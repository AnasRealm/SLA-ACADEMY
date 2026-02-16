import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Mail, Phone, Lock, LogOut } from 'lucide-react';
import MainLayout from '../../shared/layout/MainLayout';
import { logoutUser } from '../auth/services/authService';
import './Profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    name: "أحمد محمد علي",
    email: "ahmed.user@slacademy.ae",
    phone: "+971 50 123 4567",
    profilePic: "/imges/user-icon-profile.jpg", //  <- تم تغيير الصورة هنا
  });

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
    alert("تم تقديم طلب تغيير كلمة السر بنجاح (محاكاة)");
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({ ...prev, profilePic: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditPicClick = () => {
    fileInputRef.current.click();
  };

  return (
    <MainLayout>
      <div className="profile-container-new">
        <main className="profile-content-new">
          <section className="profile-section">
            <h3 className="section-title-new"><User /> المعلومات الشخصية</h3>
            <div className="personal-info-card">
              <div className="avatar-wrapper-new">
                <img src={userData.profilePic} alt="الصورة الشخصية" className="profile-img-new" />
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
                  <label htmlFor="name">الاسم</label>
                  <div className="input-readonly">{userData.name}</div>
                </div>
                <div className="info-field">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <div className="input-readonly">{userData.email}</div>
                </div>
                <div className="info-field">
                  <label htmlFor="phone">رقم الهاتف</label>
                  <div className="input-readonly">{userData.phone}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Change Password Section */}
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

          {/* Logout Section */}
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
