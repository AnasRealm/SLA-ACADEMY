import React from 'react';
import './About.css';
import { Target, Award, Users } from 'lucide-react';
import aboutImg from '/imges/about.png';

const About = () => {
  return (
    <section id="about" className="sla-about">
      <div className="sla-container">
        <div className="about-wrapper">
          
          {/* الجانب الأيمن: المحتوى النصي */}
          <div className="about-content">
            <span className="about-badge">من نحن</span>
            <h2 className="about-title">بوابة المستقبل <br/> <span>للتمكن الرقمي</span></h2>
            <p className="about-description">
              في <strong>SL Academy</strong>، لا نقدم مجرد دورات تدريبية، بل نصنع مسارات مهنية احترافية. نحن نجمع بين التقنيات الحديثة وأرقى معايير التعليم لتمكين جيل جديد من المبدعين في مجالات البرمجة والذكاء الاصطناعي.
            </p>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon"><Target size={24} /></div>
                <div>
                  <h4>رؤية واضحة</h4>
                  <p>تأهيل الكوادر لسوق العمل العالمي بأحدث الأدوات.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Award size={24} /></div>
                <div>
                  <h4>جودة معتمدة</h4>
                  <p>مناهج تعليمية صممت لتواكب التطورات المتسارعة.</p>
                </div>
              </div>
            </div>

            <button className="about-btn">اكتشف مسارك الآن</button>
          </div>

          {/* الجانب الأيسر: الصورة */}
          <div className="about-image-container">
            <div className="image-glow"></div>
            <img src={aboutImg} alt="SL Academy Concept" className="about-main-img" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;