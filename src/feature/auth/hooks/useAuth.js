import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();

  const saveUserData = (data) => {
    // تأكد من هيكلية البيانات القادمة من الباك إند
    const { access_token, refresh_token, user } = data.data; 
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveUserData(data);
      navigate('/'); // التوجيه للرئيسية
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      saveUserData(data);
      navigate('/');
    },
  });

  return {
    login: loginMutation.mutate,
    isLoginPending: loginMutation.isPending,
    isLoginError: loginMutation.isError,
    loginError: loginMutation.error,

    register: registerMutation.mutate,
    isRegisterPending: registerMutation.isPending,
    isRegisterError: registerMutation.isError,
    registerError: registerMutation.error,
  };
};