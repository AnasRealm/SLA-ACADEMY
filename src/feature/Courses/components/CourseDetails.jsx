import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, Clock, BarChart } from 'lucide-react'; 
import MainLayout from '../../../shared/layout/MainLayout';
import { useCourseDetails } from '../hooks/useCourseDetails';
import PaymentModal from './PaymentModal';
import CourseCurriculum from './CourseCurriculum'; // 👈 1. تم إضافة استيراد مكون المنهج
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  
  // استدعاء الهوك لجلب بيانات الدورة
  const { data: course, isLoading, isError } = useCourseDetails(id);
  
  // حالة فتح وإغلاق مودال الدفع
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دالة معالجة الصور
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

  // شرط تحديد نوع الكورس (هل هو تدريب/معسكر أم كورس أونلاين عادي)
  const isTrainingOrPopular = 
      Number(course.price) === 0 || 
      course.category?.name?.includes('تدريب') || 
      course.category?.name?.includes('معسكر');

  // 👇 حالة مؤقتة: هل المستخدم مشترك؟ (يمكنك لاحقاً جلبها من الـ API)
  const isUserEnrolled = false; 

  return (
    <MainLayout>
      <div className="course-premium-wrapper">
        <div className="container content-grid">
          
          {/* الجانب الأيمن: النصوص والمعلومات */}
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
              
              <button className="primary-cta-btn" onClick={() => setIsModalOpen(true)}>
                 {isTrainingOrPopular ? 'احجز مقعدك الآن' : 'اشترك الآن'}
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="trust-badges">
                <span>عدد المشتركين: {course.enrollments_count}</span>
                <span>•</span>
                <span>تاريخ النشر: {new Date(course.created_at).toLocaleDateString('ar-EG')}</span>
            </div>
          </div>

          {/* الجانب الأيسر: الصورة */}
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

      {/* 👇 2. قسم عرض الفيديوهات (المنهاج) تم إضافته هنا */}
      <div className="container" style={{ marginBottom: '80px', position: 'relative', zIndex: 10 }}>
         {/* تمرير معرف الدورة وحالة الاشتراك للمكون */}
         <CourseCurriculum courseId={id} isEnrolled={isUserEnrolled} />
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        coursePrice={course.price}
        courseName={course.title}
        isTrainingCourse={isTrainingOrPopular} 
      />

    </MainLayout>
  );
};

export default CourseDetails;