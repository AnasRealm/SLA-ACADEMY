import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import GoogleCallbackPage from '../pages/GoogleCallbackPage';
import VerifyEmailPage from '../pages/VerifyEmailPage'; // تأكد من إنشاء الملف
import ResetPasswordPage from '../pages/ResetPasswordPage'; // تأكد من إنشاء الملف

export const authRoutes = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/auth/google/redirect',
    element: <GoogleCallbackPage />
  },
  {
    path: '/auth/verify-email', // المسار الذي سيحول عليه الباك اند بعد الضغط على الايميل
    element: <VerifyEmailPage />
  },
  {
    path: '/password/reset', // أو حسب الرابط الذي يصل للإيميل
    element: <ResetPasswordPage />
  }
];