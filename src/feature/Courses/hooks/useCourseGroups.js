import { useQuery } from "@tanstack/react-query";
import { fetchCourseGroups } from "../services/courseGroupsService";

const COURSE_GROUPS_QUERY_KEY = ["course-groups"];

/**
 * هوك لجلب مجموعات الكورسات (للوحة الأدمن).
 * عند إضافة صفحة أدمن لـ "فتح كورسات إضافية للطالب"، استخدم هذا الهوك
 * ثم اختر مجموعة لتعيينها للطالب (بحسب الـ API الذي يوفره الباكند للتعيين).
 */
export const useCourseGroups = () => {
  return useQuery({
    queryKey: COURSE_GROUPS_QUERY_KEY,
    queryFn: fetchCourseGroups,
    retry: 1,
  });
};

export { COURSE_GROUPS_QUERY_KEY };
