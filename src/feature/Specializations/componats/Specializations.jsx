import React from 'react';
import './Specializations.css';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';

const Specializations = () => {
  const courses = [
    {
      id: 1,
      title: "تطوير تطبيقات الويب الكاملة",
      instructor: "د. أحمد سالم",
      description: "تعلم بناء مواقع احترافية من الصفر باستخدام أحدث التقنيات العالمية.",
      image: "/imges/porgraming.webp" // استبدلها بصورك
    },
    {
      id: 2,
      title: "التصميم الجرافيكي والبراندينج",
      instructor: "م. سارة علي",
      description: "اتقن فنون التصميم البصري وبناء الهوية التجارية للشركات الكبرى.",
      image: "/imges/desin.png"
    },
    {
      id: 3,
      title: "علوم البيانات والذكاء الاصطناعي",
      instructor: "م. خالد منصور",
      description: "استكشف عالم البيانات الضخمة وكيفية بناء نماذج ذكاء اصطناعي متطورة.",
      image: "/imges/english.png"
    }
  ];

  return (
    <section className="spec-section">
      <div className="spec-container">
        {/* العنوان */}
        <div className="spec-header">
          <span className="spec-subtitle">مساراتنا التعليمية</span>
          <h2 className="spec-title">تخصصاتنا</h2>
          <div className="spec-underline"></div>
        </div>

        {/* شبكة الكروت */}
        <div className="spec-grid">
          {courses.map((course) => (
            <div key={course.id} className="spec-card">
              <div className="spec-card-image">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="spec-card-content">
                <h3 className="course-name">{course.title}</h3>
                <p className="instructor-name">بإشراف: <span>{course.instructor}</span></p>
                <p className="course-desc">{course.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* قسم التواصل */}
        <div className="spec-contact-box">
          <h3>للتسجيل أو الاستفسار عن المزيد من المعلومات</h3>
          <p>يرجى التواصل معنا عبر القنوات التالية:</p>
          <div className="contact-actions">
            <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="contact-btn fb">
              <FaFacebookF /> فيسبوك
            </a>
            <a href="https://wa.me/yournumber" target="_blank" rel="noreferrer" className="contact-btn wa">
              <FaWhatsapp /> واتساب
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specializations;