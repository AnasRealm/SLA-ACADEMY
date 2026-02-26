import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, Clock, BarChart } from 'lucide-react'; 
import MainLayout from '../../../shared/layout/MainLayout';
import { useCourseDetails } from '../hooks/useCourseDetails';
import { useCheckEnrollment } from '../hooks/useEnrollment'; // استيراد هوك التحقق
import PaymentModal from './PaymentModal';
import CourseCurriculum from './CourseCurriculum'; 
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  
  // 1. جلب بيانات الدورة
  const { data: course, isLoading, isError } = useCourseDetails(id);
  
  // 2. التحقق من اشتراك الطالب في هذه الدورة
  const { isEnrolled, isLoading: isEnrollmentLoading } = useCheckEnrollment(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return '/imges/porgraming.webp';
    if (url.startsWith('http')) return url;
    return url; 
  };

  if (isLoading) {
     return (
        <MainLayout>
            <div className="course-premium-wrapper" style={{display: 'flex', justifyContent: 'center'}}>
                <h3>جاري تحميل تفاصيل الدورة...</h3>
            </div>
        </MainLayout>
     );
  }

  if (isError || !course) {
    return (
        <MainLayout>
            <div className="course-premium-wrapper" style={{display: 'flex', justifyContent: 'center', color: 'red'}}>
                <h3>عذراً، لم يتم العثور على الدورة المطلوبة.</h3>
            </div>
        </MainLayout>
     );
  }

  // تحديد نوع الكورس
  const isTrainingOrPopular = 
      Number(course.price) === 0 || 
      course.category?.name?.includes('تدريب') || 
      course.category?.name?.includes('معسكر');

  return (
    <MainLayout>
      <div className="course-premium-wrapper">
        <div className="container content-grid">
          
          <div className="course-content-block">
            <div className="badge-new">{course.category?.name || 'دورة مميزة'}</div>
            
            <h1 className="course-main-title">{course.title}</h1>
            
            <p className="course-lead-text">
              {course.description}
            </p>

            <div className="meta-info-row">
              <div className="meta-pill">
                <div className="avatar-mini">S</div>
                <span>المدرب: <strong>SLA Team</strong></span>
              </div>
              <div className="meta-pill">
                <BarChart size={16} className="text-blue-500" />
                <span>المستوى: <strong>{course.level}</strong></span>
              </div>
               <div className="meta-pill">
                <Clock size={16} className="text-blue-500" />
                <span>{course.duration} ساعة</span>
              </div>
            </div>

            <div className="action-footer">
              <div className="price-container">
                <span className="currency">$</span>
                <span className="amount">{course.price}</span>
              </div>
              
              {/* تغيير الزر بناءً على حالة الاشتراك */}
              {isEnrolled ? (
                <button className="primary-cta-btn" style={{background: '#10b981', cursor: 'default'}}>
                   أنت مشترك بالفعل
                </button>
              ) : (
                <button className="primary-cta-btn" onClick={() => setIsModalOpen(true)}>
                   {isTrainingOrPopular ? 'احجز مقعدك الآن' : 'اشترك الآن'}
                   <ChevronLeft size={20} />
                </button>
              )}
            </div>
            
            <div className="trust-badges">
                <span>عدد المشتركين: {course.enrollments_count || 0}</span>
                <span>•</span>
                <span>تاريخ النشر: {new Date(course.created_at).toLocaleDateString('ar-EG')}</span>
            </div>
          </div>

          <div className="course-media-block">
            <div className="image-decorator">
              <div className="image-holder">
                <img 
                    src={getImageUrl(course.thumbnail_url)} 
                    alt={course.title} 
                    onError={(e) => { e.target.src = '/imges/porgraming.webp'; }}
                />
              </div>
              <div className="blob-1"></div>
              <div className="blob-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* قسم عرض الفيديوهات: نمرر isEnrolled لفتح القفل */}
      <div className="container curriculum-section">
         <CourseCurriculum courseId={id} isEnrolled={isEnrolled} />
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        courseId={course.id}       // <-- مهم جداً: تمرير الآيدي للدفع
        coursePrice={course.price}
        courseName={course.title}
        isTrainingCourse={isTrainingOrPopular} 
      />

    </MainLayout>
  );
};

export default CourseDetails;

// bla bla bla