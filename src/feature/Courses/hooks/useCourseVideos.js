import { useQuery } from "@tanstack/react-query";
import { fetchCourseVideos } from "../services/courseService";

export const useCourseVideos = (courseId) => {
  return useQuery({
    queryKey: ["course-videos", courseId],
    queryFn: () => fetchCourseVideos(courseId),
    enabled: !!courseId, // لا يعمل إلا إذا كان رقم الدورة موجوداً
    retry: 1,
  });
};