import React from "react";
import { Link } from "react-router-dom";
import "./MostPopular.css";

const MostPopular = () => {
  const courses = [
    {
      id: 1,
      title: "البرمجة وتطوير التطبيقات",
      image: "/imges/porgraming.webp",
      videoCount: 45
    },
    {
      id: 2,
      title: "  التصميم وصناعة المحتوى ",
      image: "/imges/desin.png",
      videoCount: 38
    },
    {
      id: 3,
      title: "ادارة الاعمال",
      image: "/imges/work.png",
      videoCount: 52
    },
    {
      id: 4,
      title: "اللغة الانكليزية  ",
      image: "/imges/english.png",
      videoCount: 29
    }
  ];

  return (
    <section id="courses" className="most-popular-section">
      <div className="container">
        <div className="section-header">
          <h2 className="most-popular-title">الأعلى مشاهدة :</h2>
          <p className="most-popular-description">اكتشف أشهر المجالات التعليمية المطلوبة في سوق العمل</p>
        </div>

        <div className="courses-grid">
          {courses.map(course => (
            <Link key={course.id} to={`/course/${course.id}`} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <div className="video-count">
                  <span>{course.videoCount} فيديو</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopular;