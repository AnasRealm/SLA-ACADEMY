import apiClient from "../../../lib/api/apiClient";

// جلب الكورسات الأكثر شيوعاً
export const fetchPopularCourses = async () => {
  const response = await apiClient.get("/courses/popular");
  // حسب البوست مان، البيانات تأتي مباشرة داخل data.data وهي مصفوفة
  return response.data.data;
};