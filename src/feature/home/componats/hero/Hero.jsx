import React from "react";
import "./hero.css";

// Hero component for SL Academy

const Hero = () => {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />

      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="badge">مستقبلك يبدأ من هنا</div>
            <h1>
              ارتقِ بمهاراتك إلى <span className="highlight">آفاق عالمية</span>
            </h1>
            <p>
              منصة SL Academy توفر لك أحدث المناهج التعليمية بقيادة خبراء الصناعة،
              لتجربة تعلم تجمع بين النظرية والتطبيق الاحترافي.
            </p>
            <div className="hero-btns">
              <button className="primary-btn">ابدأ رحلتك الآن</button>
              <button className="secondary-btn">استكشف المناهج</button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <strong>+12k</strong>
                <span>خريج ناجح</span>
              </div>
              <div className="stat-line"></div>
              <div className="stat-item">
                <strong>+200</strong>
                <span>دورة احترافية</span>
              </div>
              <div className="stat-line"></div>
              <div className="stat-item">
                <strong>98%</strong>
                <span>معدل النجاح</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container">
              <img
                src="/imges/hero.png"
                alt="SL Academy - منصة التعلم الرقمي"
              />
              <div className="floating-card card-1">🏆 شهادات معتمدة دولياً</div>
              <div className="floating-card card-2">💬 مرشد شخصي متاح</div>
            </div>
          </div>
        </div>

        <i
          className="fas fa-angle-double-down fa-2x scroll-down-arrow"
          onClick={scrollToNext}
        ></i>
      </section>
    </>
  );
};

export default Hero;
