import React, { useState } from 'react';
import { Camera, BookOpen, User, Mail, Phone, Edit2 } from 'lucide-react';
import MainLayout from '../../sheard/layout/MainLayout';
import './Profile.css';

const ProfilePage = () => {
  // بيانات افتراضية (سيتم جلبها لاحقاً من الباك إند)
  const [userData, setUserData] = useState({
    name: "أحمد محمد علي",
    email: "ahmed.user@slacademy.ae",
    phone: "+971 50 123 4567",
    profilePic: "https://via.placeholder.com/150", // الصورة الافتراضية
    courses: [
      { id: 1, title: "دورة التصميم الجرافيكي الشاملة", progress: 75 },
      { id: 2, title: "أساسيات البرمجة بلغة جافا سكريبت", progress: 40 },
      { id: 3, title: "إدارة الأعمال والمشاريع الصغيرة", progress: 100 }
    ]
  });

  return (
    <MainLayout>
      <div className="profile-container">
        {/* Header Section */}
        <header className="profile-header">
          <div className="profile-card">
            <div className="avatar-wrapper">
              <img src={userData.profilePic} alt="Profile" className="profile-img" />
              <button className="edit-pic-btn" title="تعديل الصورة">
                <Edit2 size={16} />
              </button>
            </div>
            <h1 className="user-name">{userData.name}</h1>
            <p className="user-role">طالب في SL Academy</p>
          </div>
        </header>

        <main className="profile-content">
          {/* Information Section */}
          <section className="info-section">
            <h2 className="section-title"><User size={20} /> المعلومات الشخصية</h2>
            <div className="info-grid">
              <div className="info-item">
                <label><Mail size={16} /> البريد الإلكتروني</label>
                <span>{userData.email}</span>
              </div>
              <div className="info-item">
                <label><Phone size={16} /> رقم التواصل</label>
                <span>{userData.phone}</span>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="courses-section">
            <h2 className="section-title"><BookOpen size={20} /> الكورسات المسجلة</h2>
            <div className="courses-list">
              {userData.courses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <span className="progress-text">{course.progress}% مكتمل</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;