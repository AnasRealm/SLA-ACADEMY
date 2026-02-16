import React from 'react';
import { PlayCircle, Clock, Lock } from 'lucide-react';
import { useCourseVideos } from '../hooks/useCourseVideos';
import './CourseDetails.css'; // سنستخدم نفس ملف الستايل

const CourseCurriculum = ({ courseId, isEnrolled }) => {
  const { data: videos, isLoading, isError } = useCourseVideos(courseId);

  if (isLoading) return <div className="loading-text">جارِ تحميل المنهج...</div>;
  
  if (isError) return null; // في حال الخطأ نخفي القسم أو نعرض رسالة

  if (!videos || videos.length === 0) {
    return <div className="no-data">لا يوجد محتوى مضاف لهذه الدورة بعد.</div>;
  }

  return (
    <div className="curriculum-container fade-in">
      <h3 className="curriculum-title">محتوى الدورة ({videos.length} دروس)</h3>
      
      <div className="video-list">
        {videos.map((video, index) => (
          <div key={video.id} className="video-item">
            <div className="video-info">
              <span className="video-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="video-details">
                <h4 className="video-title">{video.title}</h4>
                <div className="video-meta">
                   {/* يمكنك هنا وضع وصف قصير إذا توفر */}
                </div>
              </div>
            </div>

            <div className="video-actions">
              <div className="video-duration">
                <span>{video.duration}</span>
                <Clock size={14} />
              </div>
              
              {/* هنا نتحقق: هل الطالب مشترك؟ نعرض زر تشغيل، وإلا نعرض قفل */}
              {/* ملاحظة: سنفترض أن isEnrolled تمرر كـ prop */}
              <button className={`play-btn ${!isEnrolled ? 'locked' : ''}`}>
                 {isEnrolled ? <PlayCircle size={24} /> : <Lock size={20} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCurriculum;