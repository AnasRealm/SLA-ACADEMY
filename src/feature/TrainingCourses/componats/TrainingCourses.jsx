import React from 'react';
import { useTrainingCourses } from '../hooks/useTrainingCourses';
import './TrainingCourses.css';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';

const TrainingCourses = () => {
  // 1. استدعاء الهوك
  const { data: courses, isLoading, isError } = useTrainingCourses();

  // 2. دالة مساعدة لجلب صورة الكورس
  const getCourseImage = (images) => {
    // إذا كانت هناك صور، نأخذ رابط الصورة الأولى، وإلا نضع صورة افتراضية
    if (images && images.length > 0 && images[0].url) {
      return images[0].url;
    }
    return "/imges/porgraming.webp"; // صورة افتراضية في حال عدم وجود صورة
  };

  // 3. حالة التحميل
  if (isLoading) {
    return (
      <section className="spec-section">
        <div className="spec-container" style={{ textAlign: 'center', minHeight: '300px' }}>
          <h3>جارِ تحميل المعسكرات التدريبية...</h3>
        </div>
      </section>
    );
  }

  // 4. حالة الخطأ
  if (isError) {
    return (
      <section className="spec-section">
        <div className="spec-container" style={{ textAlign: 'center', color: 'red', minHeight: '300px' }}>
          <h3>حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="spec-section">
      <div className="spec-container">
        {/* العنوان */}
        <div className="spec-header">
          <span className="spec-subtitle">مساراتنا التعليمية</span>
          <h2 className="spec-title">معسكرتنا التدريبية</h2>
          <div className="spec-underline"></div>
        </div>

        {/* شبكة الكروت */}
        <div className="spec-grid">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="spec-card">
                <div className="spec-card-image">
                  {/* استخدام الدالة المساعدة لجلب الصورة */}
                  <img 
                    src={getCourseImage(course.images)} 
                    alt={course.title} 
                    onError={(e) => { e.target.src = "/imges/porgraming.webp"; }} // في حال كسر الرابط
                  />
                </div>
                <div className="spec-card-content">
                  <h3 className="course-name">{course.title}</h3>
                  
                  {/* ربط اسم المدرب من الـ API */}
                  <p className="instructor-name">
                    بإشراف: <span>{course.instructor_name || 'نخبة من المدربين'}</span>
                  </p>
                  
                  {/* الوصف */}
                  <p className="course-desc">
                    {course.description.length > 100 
                      ? course.description.substring(0, 100) + "..." 
                      : course.description}
                  </p>
                  
                  {/* يمكنك إضافة السعر أو المدة هنا إذا أردت لأنها متوفرة في الـ API */}
                  <div style={{marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 'bold'}}>
                     <span>{course.duration_hours} ساعة تدريبية</span>
                     <span>{Number(course.price) === 0 ? 'مجاني' : `$${course.price}`}</span>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1' }}>
              لا توجد معسكرات تدريبية متاحة حالياً.
            </div>
          )}
        </div>

        {/* قسم التواصل (ثابت كما هو) */}
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

export default TrainingCourses;