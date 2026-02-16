import React from "react";
import { Link } from "react-router-dom";
import { useMostPopular } from "../hooks/useMostPopular";
import "./MostPopular.css";

// استيراد مكونات Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// استيراد الستايل
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MostPopular = () => {
  const { data: courses, isLoading, isError } = useMostPopular();

  const getImageUrl = (url) => {
    if (!url) return '/imges/coding.png';
    if (url.startsWith('http')) return url;
    return url; 
  };

  if (isLoading) {
    return <div className="text-center py-10">جاري تحميل الكورسات المميزة...</div>;
  }

  if (isError) {
    return null; 
  }

  return (
    <section id="courses" className="most-popular-section">
      <div className="container">
        <div className="section-header">
          <h2 className="most-popular-title">الأعلى مشاهدة :</h2>
          <p className="most-popular-description">اكتشف أشهر المجالات التعليمية المطلوبة في سوق العمل</p>
        </div>

        <div className="courses-slider-wrapper">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            // تفعيل الأسهم
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            dir="rtl"
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="mySwiper"
          >
            {courses?.map((course) => (
              <SwiperSlide key={course.id}>
                <Link to={`/course/${course.id}`} className="course-card">
                  <div className="course-image">
                    <img 
                      src={getImageUrl(course.thumbnail_url)} 
                      alt={course.title} 
                      onError={(e) => { e.target.src = '/imges/coding.png'; }}
                    />
                  </div>
                  <div className="course-content">
                    <h3>{course.title}</h3>
                    
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className="video-count">
                          <span>{course.videos_count || 0} فيديو</span>
                        </div>
                        <div className="price-tag" style={{fontWeight: 'bold', color: '#2C5282'}}>
                            {Number(course.price) === 0 ? 'مجاني' : `$${course.price}`}
                        </div>
                    </div>

                    <div style={{marginTop: '10px', fontSize: '0.9rem', color: '#718096'}}>
                        {course.category?.name} | {course.level}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MostPopular;