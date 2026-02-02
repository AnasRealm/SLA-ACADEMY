import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, User, ChevronLeft, ShieldCheck } from 'lucide-react';
import MainLayout from '../../../sheard/layout/MainLayout';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  
  const courseData = {
    title: "دورة البرمجة الشاملة",
    image: "/imges/porgraming.webp",
    description: "انطلق في رحلة احترافية لتعلم البرمجة من الصفر. ستقوم ببناء تطبيقات حقيقية، وفهم الخوارزميات، وإتقان لغات العصر المطلوبة في سوق العمل العالمي.",
    price: "299",
    instructor: "أحمد محمد",
    rating: "4.8",
  };

  return (
    <MainLayout>
      <div className="course-premium-wrapper" data-course-id={id}>
        <div className="container content-grid">
          
          {/* الجانب الأيمن: النصوص والمعلومات */}
          <div className="course-content-block">
            <div className="badge-new">جديد ومحدث</div>
            <h1 className="course-main-title">{courseData.title}</h1>
            
            <p className="course-lead-text">
              {courseData.description}
            </p>

            <div className="meta-info-row">
              <div className="meta-pill">
                <div className="avatar-mini">{courseData.instructor[0]}</div>
                <span>المدرب: <strong>{courseData.instructor}</strong></span>
              </div>
              <div className="meta-pill rating-bg">
                <Star size={16} fill="#EAB308" color="#EAB308" />
                <span>{courseData.rating} تقييم عام</span>
              </div>
            </div>

            <div className="action-footer">
              <div className="price-container">
                <span className="currency">$</span>
                <span className="amount">{courseData.price}</span>
              </div>
              <button className="primary-cta-btn">
                 اشترك الآن
                <ChevronLeft size={20} />
              </button>
            </div>
            
           
          </div>

          {/* الجانب الأيسر: الصورة */}
          <div className="course-media-block">
            <div className="image-decorator">
              <div className="image-holder">
                <img src={courseData.image} alt={courseData.title} />
              </div>
              {/* عناصر ديكور خلف الصورة */}
              <div className="blob-1"></div>
              <div className="blob-2"></div>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDetails;