import React, { useState } from "react";
import { PlayCircle, Clock, Lock, X } from "lucide-react";
import { useCourseVideos } from "../hooks/useCourseVideos";
import { fetchVideoStreamUrl } from "../services/courseService";
import "./CourseDetails.css";

const CourseCurriculum = ({ courseId, isEnrolled }) => {
  const { data: videos, isLoading, isError } = useCourseVideos(courseId);

  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  // جلب بيانات المستخدم لعرضها كعلامة مائية (Security Layer)
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handlePlayClick = async (videoId) => {
    if (!isEnrolled) {
      alert("يجب عليك الاشتراك في الدورة لمشاهدة المحتوى");
      return;
    }

    setLoadingVideo(true);
    try {
      const data = await fetchVideoStreamUrl(videoId);
      setVideoUrl(data.stream_url);
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

  // ++ (جديد) جلب تفاصيل الفيديو المشتغل حالياً لعرض عنوانه
  const activeVideo = videos?.find((v) => v.id === playingVideo);

  if (isLoading)
    return <div className="loading-text">جارِ تحميل المنهج...</div>;
  if (isError) return null;
  if (!videos || videos.length === 0) {
    return <div className="no-data">لا يوجد محتوى مضاف لهذه الدورة بعد.</div>;
  }

  return (
    <>
      <div className="curriculum-container fade-in">
        <h3 className="curriculum-title">
          محتوى الدورة ({videos.length} دروس)
        </h3>

        <div className="video-list">
          {videos.map((video, index) => (
            <div key={video.id} className="video-item">
              <div className="video-info">
                <span className="video-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
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
                  className={`play-btn ${!isEnrolled ? "locked" : ""}`}
                  onClick={() => handlePlayClick(video.id)}
                  disabled={loadingVideo && playingVideo === video.id}
                >
                  {!isEnrolled ? (
                    <Lock size={20} />
                  ) : loadingVideo && playingVideo === video.id ? (
                    "..."
                  ) : (
                    <PlayCircle size={24} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- التعديل الجديد على نافذة تشغيل الفيديو --- */}
      {videoUrl && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ترويسة الفيديو (الهيدر) */}
            <div className="video-modal-header">
              <h4 className="video-playing-title">
                {activeVideo?.title || "جارِ التشغيل..."}
              </h4>
              <button
                className="close-video-btn"
                onClick={closeVideo}
                title="إغلاق"
              >
                <X size={22} />
              </button>
            </div>

            {/* حاوية الفيديو بالأبعاد الصحيحة */}
            {/* منع القائمة المنبثقة (Right Click) لمنع الحفظ السهل */}
            <div
              className="video-wrapper"
              onContextMenu={(e) => e.preventDefault()}
            >
              <video
                controls
                autoPlay
                className="main-video-player"
                controlsList="nodownload"
                style={{ width: "100%", height: "100%" }}
              >
                <source src={videoUrl} type="video/mp4" />
                المتصفح لا يدعم تشغيل الفيديو.
              </video>

              {/* --- طبقة الحماية: العلامة المائية --- */}
              {user && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "15%",
                      left: "10%",
                      opacity: 0.3,
                      pointerEvents: "none", // يسمح بالضغط من خلال النص
                      color: "#fff",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      zIndex: 10,
                      userSelect: "none",
                    }}
                  >
                    {user.email}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20%",
                      right: "10%",
                      opacity: 0.2,
                      pointerEvents: "none",
                      color: "#fff",
                      fontSize: "1rem",
                      zIndex: 10,
                      userSelect: "none",
                    }}
                  >
                    {user.phone || user.first_name} - SLA Academy
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCurriculum;
