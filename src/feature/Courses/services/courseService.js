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

// أضف هذه الدالة في نهاية الملف أو مع بقية الدوال
export const fetchCoursesByCategory = async (categoryId) => {
  const response = await apiClient.get(`/courses?category_id=${categoryId}`); 
  
  return response.data.data.courses; 
};

export const fetchVideoStreamUrl = async (videoId) => {
  const response = await apiClient.get(`/videos/${videoId}/url`);
  // حسب الـ JSON الذي أرسلته، الرابط موجود هنا:
  return response.data.data; 
};