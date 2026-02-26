import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  submitEnrollment,
  fetchStudentCourses,
  fetchStudentEnrollments,
  fetchStudentEnrollmentRequests,
} from "../services/enrollmentService";

export const useSubmitEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries(["student-enrollments"]);
      queryClient.invalidateQueries(["student-enrollment-requests"]);
      queryClient.invalidateQueries(["student-courses"]);
    },
  });
};

export const useStudentCourses = () => {
  return useQuery({
    queryKey: ["student-courses"],
    queryFn: fetchStudentCourses,
    retry: 1,
  });
};

export const useCheckEnrollment = (courseId) => {
  const { data: myCourses, isLoading } = useStudentCourses();
  const isEnrolled = myCourses?.some((c) => Number(c.id) === Number(courseId));
  return { isEnrolled: !!isEnrolled, isLoading };
};

/** سجل الاشتراكات (كل الحالات) مع تصفح وفلتر حسب الحالة — للبروفايل */
export const useStudentEnrollments = (params = {}) => {
  const { page = 1, per_page = 10, status = "all" } = params;
  return useQuery({
    queryKey: ["student-enrollments", page, per_page, status],
    queryFn: () => fetchStudentEnrollments({ page, per_page, status }),
    retry: 1,
  });
};

/** طلبات الاشتراك قيد المراجعة فقط — للبروفايل */
export const useStudentEnrollmentRequests = (params = {}) => {
  const { page = 1, per_page = 12 } = params;
  return useQuery({
    queryKey: ["student-enrollment-requests", page, per_page],
    queryFn: () => fetchStudentEnrollmentRequests({ page, per_page }),
    retry: 1,
  });
};