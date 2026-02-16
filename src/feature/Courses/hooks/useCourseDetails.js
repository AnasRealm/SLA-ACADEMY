import { useQuery } from "@tanstack/react-query";
import { fetchCourseDetails } from "../services/courseService";

export const useCourseDetails = (id) => {
  return useQuery({
    queryKey: ["course-details", id],
    queryFn: () => fetchCourseDetails(id),
    enabled: !!id, // لا تقم بالطلب إلا إذا كان الـ id موجوداً
    retry: 1,
  });
};