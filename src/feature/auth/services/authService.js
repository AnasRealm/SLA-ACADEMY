import apiClient from "../../../lib/api/apiClient";

export const loginUser = async (credentials) => {
  const formData = new FormData();
  formData.append('email', credentials.email);
  formData.append('password', credentials.password);

  const response = await apiClient.post('/auth/login', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // التحقق من status في حال كان الرد 200 ولكن العملية فشلت منطقياً
  if (!response.data.status) {
    throw new Error(response.data.message || 'فشل تسجيل الدخول');
  }

  return response.data;
};

export const registerUser = async (userData) => {
  const data = new FormData();
  // تحويل الكائن إلى FormData
  Object.keys(userData).forEach(key => data.append(key, userData[key]));

  const response = await apiClient.post('/auth/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (!response.data.status) {
    throw new Error(response.data.message || 'فشل إنشاء الحساب');
  }

  return response.data;
};