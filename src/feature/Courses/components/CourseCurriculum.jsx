import React, { useState } from 'react';
import { PlayCircle, Clock, Lock, X } from 'lucide-react'; // تأكد من استيراد X للإغلاق
import { useCourseVideos } from '../hooks/useCourseVideos';
import { fetchVideoStreamUrl } from '../services/courseService'; // استيراد الدالة الجديدة
import './CourseDetails.css';

const CourseCurriculum = ({ courseId, isEnrolled }) => {
  const { data: videos, isLoading, isError } = useCourseVideos(courseId);
  
  // حالات لتشغيل الفيديو
  const [playingVideo, setPlayingVideo] = useState(null); // لتخزين الفيديو الحالي
  const [videoUrl, setVideoUrl] = useState(null); // لتخزين رابط البث
  const [loadingVideo, setLoadingVideo] = useState(false);

  // دالة التعامل مع ضغط زر التشغيل
  const handlePlayClick = async (videoId) => {
    if (!isEnrolled) {
      alert("يجب عليك الاشتراك في الدورة لمشاهدة المحتوى");
      return;
    }

    setLoadingVideo(true);
    try {
      const data = await fetchVideoStreamUrl(videoId);
      setVideoUrl(data.stream_url); // تخزين الرابط القادم من الـ API
      setPlayingVideo(videoId);
    } catch (error) {
      console.error("Failed to fetch video url", error);
      alert("عذراً، حدث خطأ أثناء تحميل الفيديو");
    } finally {
      setLoadingVideo(false);
    }
  };

  const closeVideo = () => {
    setPlayingVideo(null);
    setVideoUrl(null);
  };

  if (isLoading) return <div className="loading-text">جارِ تحميل المنهج...</div>;
  if (isError) return null;
  if (!videos || videos.length === 0) {
    return <div className="no-data">لا يوجد محتوى مضاف لهذه الدورة بعد.</div>;
  }

  return (
    <>
      <div className="curriculum-container fade-in">
        <h3 className="curriculum-title">محتوى الدورة ({videos.length} دروس)</h3>
        
        <div className="video-list">
          {videos.map((video, index) => (
            <div key={video.id} className="video-item">
              <div className="video-info">
                <span className="video-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="video-details">
                  <h4 className="video-title">{video.title}</h4>
                </div>
              </div>

              <div className="video-actions">
                <div className="video-duration">
                  <span>{video.duration}</span>
                  <Clock size={14} />
                </div>
                
                <button 
                  className={`play-btn ${!isEnrolled ? 'locked' : ''}`}
                  onClick={() => handlePlayClick(video.id)}
                  disabled={loadingVideo && playingVideo === video.id} // تعطيل الزر أثناء التحميل
                >
                   {!isEnrolled ? <Lock size={20} /> : (
                     loadingVideo && playingVideo === video.id ? '...' : <PlayCircle size={24} />
                   )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* نافذة تشغيل الفيديو (Video Modal) */}
      {videoUrl && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-video-btn" onClick={closeVideo}>
                <X size={24} color="white" />
            </button>
            <video controls autoPlay className="main-video-player">
              <source src={videoUrl} type="video/mp4" />
              المتصفح لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCurriculum;