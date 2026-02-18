import apiClient from "../../../lib/api/apiClient";

// 1. تقديم طلب اشتراك جديد (POST /enrollments)
export const submitEnrollment = async (enrollmentData) => {
  // بما أننا نرفع ملف صورة، يجب استخدام FormData
  const formData = new FormData();
  
  formData.append('course_id', enrollmentData.courseId);
  formData.append('payment_method_id', enrollmentData.paymentMethodId);
  formData.append('payment_proof', enrollmentData.receiptFile); // تأكدنا من الاسم payment_proof من الـ JSON

  const response = await apiClient.post('/enrollments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // ضروري لرفع الملفات
    },
  });
  
  return response.data;
};

// 2. جلب الكورسات التي يملكها الطالب (لفتح الفيديوهات)
export const fetchStudentCourses = async () => {
  // نطلب عدد كبير لضمان فحص كل الكورسات، أو يمكن التعامل مع التصفح لاحقاً
  const response = await apiClient.get('/student/courses?per_page=100'); 
  return response.data.data.courses; 
};

// 3. جلب سجل الاشتراكات (لمعرفة حالة الطلبات قيد المراجعة)
export const fetchStudentEnrollments = async () => {
  const response = await apiClient.get('/student/enrollments');
  return response.data.data.enrollments;
};