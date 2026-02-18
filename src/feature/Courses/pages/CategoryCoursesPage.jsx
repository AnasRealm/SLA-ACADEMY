import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '../../../shared/layout/MainLayout';
import { fetchCoursesByCategory } from '../services/courseService';
// سنستخدم نفس ستايل الكروت الموجود في MostPopular لتوفير الوقت وتوحيد التصميم
import '../../MostPopular/components/MostPopular.css'; 

const CategoryCoursesPage = () => {
  const { id } = useParams(); // هذا هو الـ id الخاص بالفئة (category)

  const { data: courses, isLoading, isError } = useQuery({
    queryKey: ['courses-by-category', id],
    queryFn: () => fetchCoursesByCategory(id),
  });

  const getImageUrl = (url) => {
    if (!url) return '/imges/coding.png';
    if (url.startsWith('http')) return url;
    return url; 
  };

  return (
    <MainLayout>
      <div className="most-popular-section" style={{ minHeight: '80vh', background: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="most-popular-title">كورسات التخصص</h2>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center' }}>جاري تحميل الكورسات...</div>
          ) : isError ? (
            <div style={{ textAlign: 'center', color: 'red' }}>حدث خطأ أو لا توجد كورسات في هذا القسم حالياً</div>
          ) : (
            <div className="spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  /* هنا يتم الربط الصحيح: عند الضغط على الكورس نذهب لتفاصيله */
                  <Link to={`/course/${course.id}`} className="course-card" key={course.id} style={{ display: 'block', textDecoration: 'none' }}>
                    <div className="course-image">
                      <img 
                        src={getImageUrl(course.thumbnail_url)} 
                        alt={course.title} 
                        onError={(e) => { e.target.src = '/imges/coding.png'; }}
                      />
                    </div>
                    <div className="course-content">
                      <h3>{course.title}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="video-count">{course.videos_count || 0} فيديو</span>
                        <span style={{ fontWeight: 'bold', color: '#2C5282' }}>
                          {Number(course.price) === 0 ? 'مجاني' : `$${course.price}`}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center' }}>لا توجد دورات متاحة في هذا القسم بعد.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoryCoursesPage;