import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../lib/api/apiClient";

// 1. دالة الجلب
const fetchPaymentMethods = async () => {
  const response = await apiClient.get("/payment-methods"); // تأكد من أن هذا هو الرابط الصحيح في الباك إند
  return response.data.data; // نرجع المصفوفة الموجودة داخل data
};

// 2. الهوك
export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: fetchPaymentMethods,
    staleTime: 1000 * 60 * 60, // نحتفظ بالبيانات ساعة لأن طرق الدفع لا تتغير كثيراً
  });
};