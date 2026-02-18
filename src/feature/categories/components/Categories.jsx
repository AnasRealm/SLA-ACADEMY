import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories'; // 1. استيراد الهوك
import './Categories.css';

const Categories = () => {
  // 2. استخدام الهوك لجلب البيانات وحالة التحميل
  const { data: categories, isLoading, error } = useCategories();

  // صورة احتياطية في حال كانت صورة الكاتيغوري null من الباك اند
  const placeholderImage = '/imges/coding.png'; 

  // عرض مؤشر تحميل بسيط أثناء جلب البيانات
  if (isLoading) {
    return (
      <section className="ml-categories-section">
        <div className="ml-container" style={{ textAlign: 'center' }}>
          <h3>جارِ تحميل التخصصات...</h3>
        </div>
      </section>
    );
  }

  // عرض رسالة خطأ في حال فشل الاتصال
  if (error) {
    return (
      <section className="ml-categories-section">
        <div className="ml-container" style={{ textAlign: 'center', color: 'red' }}>
          <h3>حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.</h3>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="ml-categories-section">
      <div className="ml-container">
        
        <div className="ml-header">
          <span className="ml-title">تخصصاتنا</span>
          <h2 className="ml-subtitle">استكشف المجالات التعليمية</h2>
        </div>

        <div className="ml-grid">
          {/* 3. التأكد من وجود بيانات قبل عمل map */}
          {categories && categories.length > 0 ? (
            categories.map(category => (
              <Link key={category.id} to={`/category/${category.id}`} className="ml-card-link">
                
                {/* الصندوق الأبيض */}
                <div className="ml-icon-box">
                  {/* 4. معالجة الصورة: استخدام الصورة من الرابط أو الصورة الاحتياطية */}
                  <img 
                    src={category.image ? category.image : placeholderImage} 
                    alt={category.name} 
                    className="ml-cat-img"
                    onError={(e) => { e.target.src = placeholderImage; }} // في حال كان الرابط مكسور
                  />
                </div>

                {/* البادج الملون */}
                <span className="ml-count-badge">
                  {/* 5. استخدام الاسم الصحيح للحقل من الـ API */}
                  {category.courses_count} course
                </span>

                {/* الاسم */}
                <h3 className="ml-cat-name">
                  {category.name}
                </h3>
                
              </Link>
            ))
          ) : (
            <div style={{ textAlign: 'center', width: '100%' }}>لا توجد تخصصات متاحة حالياً</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
