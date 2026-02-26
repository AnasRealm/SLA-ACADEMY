import apiClient from "../../../lib/api/apiClient";

/**
 * جلب مجموعات الكورسات (للاستخدام في لوحة الأدمن لفتح كورسات إضافية للطالب).
 * الـ API يرجع مجموعات، كل مجموعة تحتوي على كورسات يمكن للأدمن منحها للطالب.
 *
 * Response shape من الباكند:
 * { status, message, data: [ { group_id, courses: [{ id, title, link_id }], total_courses } ], errors }
 */
export const fetchCourseGroups = async () => {
  const response = await apiClient.get("/course-groups");
  const raw = response.data;
  if (!raw.status || !raw.data) {
    throw new Error(raw.message || "فشل جلب مجموعات الكورسات");
  }
  return raw.data;
};
