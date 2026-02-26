import apiClient from "../../../lib/api/apiClient";
import { fetchCourseGroups } from "./courseGroupsService";

// 1. تقديم طلب اشتراك جديد (POST /enrollments)
export const submitEnrollment = async (enrollmentData) => {
  const formData = new FormData();
  formData.append("course_id", enrollmentData.courseId);
  formData.append("payment_method_id", enrollmentData.paymentMethodId);
  formData.append("payment_proof", enrollmentData.receiptFile);

  const response = await apiClient.post("/enrollments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 2. جلب الكورسات من الـ API فقط (بدون دمج المجموعات)
export const fetchStudentCoursesRaw = async () => {
  const response = await apiClient.get("/student/courses?per_page=100");
  return response.data.data.courses;
};

/**
 * 3. جلب الكورسات التي يملكها الطالب + كورسات المجموعات المشتركة.
 * بمجرد ما الطالب يكون مشترك في كورس واحد من مجموعة، باقي كورسات نفس المجموعة تظهر له (كورسات مشتركة).
 */
export const fetchStudentCourses = async () => {
  const enrolled = await fetchStudentCoursesRaw();
  const enrolledIds = new Set((enrolled || []).map((c) => Number(c.id)));
  let groups = [];
  try {
    groups = await fetchCourseGroups();
  } catch (_) {
    return enrolled || [];
  }
  if (!Array.isArray(groups) || groups.length === 0) return enrolled || [];

  const unlockedByGroup = new Map(); // id -> { id, title, ... } من مجموعة
  for (const group of groups) {
    const courses = group.courses || [];
    const ids = courses.map((c) => Number(c.id));
    const hasEnrolled = ids.some((id) => enrolledIds.has(id));
    if (!hasEnrolled) continue;
    for (const c of courses) {
      const id = Number(c.id);
      if (enrolledIds.has(id)) continue;
      if (!unlockedByGroup.has(id)) {
        unlockedByGroup.set(id, {
          id: c.id,
          title: c.title,
          thumbnail_url: null,
          duration: null,
          videos_count: null,
          description: null,
          created_at: null,
        });
      }
    }
  }

  const merged = [...(enrolled || [])];
  for (const [, obj] of unlockedByGroup) {
    merged.push(obj);
  }
  return merged;
};

// 3. جلب سجل الاشتراكات مع دعم التصفح والفلتر (لبروفايل الطالب)
// params: { page, per_page, status } — status: approved | rejected | pending | cancelled
export const fetchStudentEnrollments = async (params = {}) => {
  const { page, per_page = 10, status } = params;
  const query = new URLSearchParams();
  if (page != null) query.set("page", page);
  if (per_page != null) query.set("per_page", per_page);
  if (status && status !== "all") query.set("status", status);
  const response = await apiClient.get(`/student/enrollments?${query.toString()}`);
  const d = response.data?.data;
  return { enrollments: d?.enrollments ?? [], pagination: d?.pagination ?? null, filters: d?.filters ?? null };
};

// 4. طلبات الاشتراك قيد المراجعة فقط (لبروفايل الطالب)
export const fetchStudentEnrollmentRequests = async (params = {}) => {
  const { page, per_page = 12 } = params;
  const query = new URLSearchParams();
  if (page != null) query.set("page", page);
  if (per_page != null) query.set("per_page", per_page);
  const response = await apiClient.get(`/student/enrollment-requests?${query.toString()}`);
  const d = response.data?.data;
  return { enrollments: d?.enrollments ?? [], pagination: d?.pagination ?? null };
};