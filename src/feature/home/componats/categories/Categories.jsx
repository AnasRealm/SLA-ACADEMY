import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Programming', courseCount: 7720, image: '/imges/coding.png' },
    { id: 2, name: 'Graphic Design', courseCount: 1044, image: '/imges/web-design.png' },
    { id: 3, name: 'Marketing', courseCount: 317, image: '/imges/sales.png' },
    { id: 4, name: 'Medical', courseCount: 1473, image: '/imges/stethoscope.png' },
    { id: 5, name: 'Business', courseCount: 495, image: '/imges/briefcase.png' },
    { id: 6, name: 'Science', courseCount: 619, image: '/imges/shield.png' },
    { id: 7, name: 'Languages', courseCount: 552, image: '/imges/abc-block.png' },
    { id: 8, name: 'Engineering', courseCount: 986, image: '/imges/artificial-intelligence.png' },
    { id: 9, name: 'Data Science', courseCount: 1213, image: '/imges/database.png' },
    { id: 10, name: 'Mobile Dev', courseCount: 271, image: '/imges/smartphone.png' },
    { id: 11, name: 'Photography', courseCount: 212, image: '/imges/photography.png' },
    { id: 12, name: 'Music', courseCount: 389, image: '/imges/music-note.png' },
    { id: 13, name: 'Fitness', courseCount: 120, image: '/imges/dumbbell.png' },
    { id: 14, name: 'Programming', courseCount: 7720, image: '/imges/coding.png' },
    { id: 15, name: 'Graphic Design', courseCount: 1044, image: '/imges/web-design.png' },
    { id: 16, name: 'Marketing', courseCount: 317, image: '/imges/sales.png' },
    { id: 17, name: 'Medical', courseCount: 1473, image: '/imges/stethoscope.png' },
    { id: 18, name: 'Business', courseCount: 495, image: '/imges/briefcase.png' }
  ];

  return (
    <section id="categories" className="ml-categories-section">
      <div className="ml-container">
        
        <div className="ml-header">
          {/* تم تبديل الكلاسات لتتناسب مع التصميم الجديد */}
          <span className="ml-title">تخصصاتنا</span>
          <h2 className="ml-subtitle">استكشف المجالات التعليمية</h2>
        </div>

        <div className="ml-grid">
          {categories.map(category => (
            <Link key={category.id} to={`/course/${category.id}`} className="ml-card-link">
              
              {/* الصندوق الأبيض */}
              <div className="ml-icon-box">
                <img src={category.image} alt={category.name} className="ml-cat-img" />
              </div>

              {/* البادج الملون */}
              <span className="ml-count-badge">
                {category.courseCount} course
              </span>

              {/* الاسم */}
              <h3 className="ml-cat-name">
                {category.name}
              </h3>
              
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;