import React from 'react';
import './About.css';
import { Target, Award, Users, ArrowLeft } from 'lucide-react'; // تأكد من استيراد الايقونات
import aboutImg from '/imges/about.png';

const About = () => {
  return (
    <section id="about" className="sla-about">
      {/* عناصر زخرفية في الخلفية */}
      <div className="decorative-shape shape-1"></div>
      <div className="decorative-shape shape-2"></div>

      <div className="sla-container">
        <div className="about-wrapper">
          
          {/* الجانب الأيمن: المحتوى النصي */}
          <div className="about-content">
            <div className="badge-container">
              <span className="about-badge">من نحن</span>
              <span className="badge-line"></span>
            </div>
            
            <h2 className="about-title">
              بوابة المستقبل <br/> 
              <span className="highlight-text">للتمكن الرقمي</span>
            </h2>
            
            <p className="about-description">
              في <strong>SL Academy</strong>، لا نقدم مجرد دورات تدريبية، بل نصنع مسارات مهنية احترافية. ندمج بين التقنيات الحديثة وأرقى معايير التعليم لتمكين جيل جديد من المبدعين.
            </p>

            <div className="about-features">
              {/* Feature 1 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <Target size={24} />
                </div>
                <div className="feature-text">
                  <h4>رؤية عالمية</h4>
                  <p>تأهيل الكوادر لسوق العمل بأحدث الأدوات التقنية.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-card">
                <div className="feature-icon-box">
                  <Award size={24} />
                </div>
                <div className="feature-text">
                  <h4>جودة معتمدة</h4>
                  <p>مناهج تعليمية صممت لتواكب التطورات المتسارعة.</p>
                </div>
              </div>
            </div>

            <button className="about-btn">
              <span>اكتشف مسارك الآن</span>
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* الجانب الأيسر: الصورة */}
          <div className="about-image-container">
            <div className="image-backdrop"></div>
            <img src={aboutImg} alt="SL Academy Concept" className="about-main-img" />
            
        
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;