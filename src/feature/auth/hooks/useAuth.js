import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  forgotPassword, 
  resetPassword,
  verifyEmail 
} from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Helper function to save auth data
  const saveAuthData = (apiResponse) => {
    // Postman Structure: data: { user: {...}, access_token: "...", refresh_token: "..." }
    const { access_token, refresh_token, user } = apiResponse.data || {};

    if (access_token) localStorage.setItem('accessToken', access_token);
    if (refresh_token) localStorage.setItem('refreshToken', refresh_token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  };

  const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    queryClient.clear();
  };

  // --- Mutations ---

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveAuthData(data);
      navigate('/');
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      saveAuthData(data);
      // التوجيه يعتمد على هل الـ API يسجل دخول تلقائي أم يطلب تفعيل؟
      // Postman Response للتسجيل يحتوي على Tokens، لذا يتم الدخول مباشرة
      navigate('/'); 
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      clearAuthData();
      navigate('/login');
    }
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate('/login');
    }
  });

  const verifyEmailMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      // بعد التفعيل بنجاح، يمكن التوجيه للصفحة الرئيسية
      navigate('/');
    }
  });

  // Handle Google Manual Callback (Tokens passed directly)
  const handleGoogleCallback = (tokens) => {
    if (tokens.access_token) localStorage.setItem('accessToken', tokens.access_token);
    if (tokens.refresh_token) localStorage.setItem('refreshToken', tokens.refresh_token);
    if (tokens.user) localStorage.setItem('user', JSON.stringify(tokens.user));
    navigate('/', { replace: true });
  };

  return {
    // Login
    login: loginMutation.mutate,
    isLoginPending: loginMutation.isPending,
    isLoginError: loginMutation.isError,
    loginError: loginMutation.error,

    // Register
    register: registerMutation.mutate,
    isRegisterPending: registerMutation.isPending,
    isRegisterError: registerMutation.isError,
    registerError: registerMutation.error,

    // Logout
    logout: logoutMutation.mutate,

    // Password & Verification
    forgotPassword: forgotPasswordMutation.mutateAsync, // Async to await in UI
    resetPassword: resetPasswordMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    
    // Google
    handleGoogleCallback,
  };
};