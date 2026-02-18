import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  submitEnrollment, 
  fetchStudentCourses, 
  fetchStudentEnrollments 
} from "../services/enrollmentService";

// هوك لتقديم طلب الاشتراك (لزر الدفع)
export const useSubmitEnrollment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submitEnrollment,
    onSuccess: () => {
      // تحديث البيانات بعد النجاح
      queryClient.invalidateQueries(['student-enrollments']);
      queryClient.invalidateQueries(['student-courses']);
    },
  });
};

// هوك لجلب كورسات الطالب (المقبولة فقط)
export const useStudentCourses = () => {
  return useQuery({
    queryKey: ['student-courses'],
    queryFn: fetchStudentCourses,
    retry: 1,
  });
};

// هوك ذكي: يفحص هل هذا الكورس مملوك للطالب؟
export const useCheckEnrollment = (courseId) => {
  const { data: myCourses, isLoading } = useStudentCourses();
  
  // نفحص المصفوفة لنرى هل الـ ID موجود فيها
  const isEnrolled = myCourses?.some(course => Number(course.id) === Number(courseId));

  return { isEnrolled: !!isEnrolled, isLoading };
};