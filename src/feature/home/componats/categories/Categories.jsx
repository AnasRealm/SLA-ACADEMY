import React from 'react';
import './Categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'تطوير الويب', courseCount: 25, icon: 'code-square' },
    { id: 2, name: 'تصميم الجرافيك', courseCount: 18, icon: 'palette' },
    { id: 3, name: 'التسويق الرقمي', courseCount: 22, icon: 'graph-up-arrow' },
    { id: 4, name: 'الذكاء الاصطناعي', courseCount: 15, icon: 'cpu' },
    { id: 5, name: 'الأمن السيبراني', courseCount: 12, icon: 'shield' },
    { id: 6, name: 'تطوير الألعاب', courseCount: 20, icon: 'gamepad' },
    { id: 7, name: 'علوم البيانات', courseCount: 16, icon: 'database' },
    { id: 8, name: 'تطوير الموبايل', courseCount: 14, icon: 'mobile' },
    { id: 9, name: 'الحوسبة السحابية', courseCount: 18, icon: 'cloud' },
    { id: 10, name: 'إنترنت الأشياء', courseCount: 11, icon: 'network' }
  ];

  return (
    <section id="categories" className="sla-categories">
      <div className="sla-container">
        <div className="sla-header">
          <span className="sla-badge">تخصصاتنا</span>
          <h2 className="sla-title">استكشف المجالات التعليمية</h2>
          <div className="sla-line"></div>
        </div>
        
        <div className="sla-grid">
          {categories.map(category => (
            <div key={category.id} className="sla-card">
              <div className="sla-card-inner">
                <div className="sla-icon-box">
                  <span className="sla-icon-main">
                    {category.id === 1 && <i className="fa-solid fa-code"></i>}
                    {category.id === 2 && <i className="fa-solid fa-palette"></i>}
                    {category.id === 3 && <i className="fa-regular fa-chart-bar"></i>}
                    {category.id === 4 && <i className="fa-solid fa-brain"></i>}
                    {category.id === 5 && <i className="fa-solid fa-shield-halved"></i>}
                    {category.id === 6 && <i className="fa-solid fa-gamepad"></i>}
                    {category.id === 7 && <i className="fa-solid fa-database"></i>}
                    {category.id === 8 && <i className="fa-solid fa-mobile-screen"></i>}
                    {category.id === 9 && <i className="fa-solid fa-cloud"></i>}
                    {category.id === 10 && <i className="fa-solid fa-network-wired"></i>}
                  </span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.courseCount} دورة تدريبية</p>
                <div className="sla-card-footer">
                  <span>عرض التفاصيل</span>
                  <i className="arrow-icon">←</i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;