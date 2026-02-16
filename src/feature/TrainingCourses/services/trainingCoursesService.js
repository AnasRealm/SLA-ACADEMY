import apiClient from "../../../lib/api/apiClient";

export const fetchTrainingCourses = async () => {
  // نطلب الصفحة الأولى، ويمكنك زيادة العدد في per_page حسب الحاجة
  const response = await apiClient.get("/training-courses?per_page=9");
  
  // حسب هيكلية الـ JSON الخاصة بك:
  // response.data -> البيانات القادمة من axios
  // response.data.data -> كائن البيانات من الـ API
  // response.data.data.training_courses -> المصفوفة التي تحتوي الكورسات
  return response.data.data.training_courses;
};