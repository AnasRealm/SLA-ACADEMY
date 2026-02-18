import apiClient from "../../../lib/api/apiClient";

// 1. Register: يحتاج first_name, last_name, phone, email, password, password_confirmation
export const registerUser = async (userData) => {
  // إرسال البيانات كـ JSON حسب الهيدر في apiClient
  const response = await apiClient.post('/auth/register', userData);
  
  if (!response.data.status) {
    throw new Error(response.data.message || 'فشل إنشاء الحساب');
  }
  return response.data;
};

// 2. Login: يحتاج email, password
export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);

  if (!response.data.status) {
    throw new Error(response.data.message || 'فشل تسجيل الدخول');
  }
  return response.data;
};

// 3. Logout
export const logoutUser = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

// 4. Forgot Password: يرسل إيميل
export const forgotPassword = async (email) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  
  if (!response.data.status) {
    throw new Error(response.data.message || 'فشل إرسال الرابط');
  }
  return response.data;
};

// 5. Reset Password: يحتاج token, email, password, password_confirmation
export const resetPassword = async (data) => {
  const response = await apiClient.post('/auth/reset-password', data);
  
  if (!response.data.status) {
    throw new Error(response.data.message || 'فشل إعادة تعيين كلمة المرور');
  }
  return response.data;
};

// 6. Verify Email: يتم استدعاؤه عند الضغط على الرابط في الإيميل (GET مع query params)
export const verifyEmail = async (queryParams) => {
  // queryParams should be a string like: ?id=...&hash=...
  const response = await apiClient.get(`/auth/verify-email${queryParams}`);
  
  if (!response.data.status) {
    throw new Error(response.data.message || 'فشل التحقق من البريد الإلكتروني');
  }
  return response.data;
};

// 7. Resend Verification
export const resendVerificationEmail = async () => {
  const response = await apiClient.post('/auth/resend-verification');
  return response.data;
};

// 8. Google Auth URL
export const getGoogleAuthUrl = async () => {
  const response = await apiClient.get('/auth/continue-with-google');
  return response.data; 
};

export const fetchUserProfile = async () => {
  const response = await apiClient.get('/user');
  return response.data.data.data; // لاحظ التداخل في الـ JSON: data -> data -> data (حسب ما أرسلت)
  // ملاحظة: تأكد من الباك إند، عادة تكون response.data.data فقط، لكن الـ JSON المرسل فيه data مرتين
};