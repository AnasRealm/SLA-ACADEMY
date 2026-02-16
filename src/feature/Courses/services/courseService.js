import apiClient from "../../../lib/api/apiClient";

export const fetchCourseDetails = async (id) => {
  const response = await apiClient.get(`/courses/${id}`);
  // البيانات موجودة داخل data.data حسب ملف JSON الذي أرسلته
  return response.data.data;
};

export const fetchCourseVideos = async (courseId) => {
  // نستخدم الرابط كما هو في البوست مان
  const response = await apiClient.get(`/videos?course_id=${courseId}`);
  // البيانات موجودة داخل response.data.data وهي مصفوفة
  return response.data.data;
};