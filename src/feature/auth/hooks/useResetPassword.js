import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService';

/**
 * Custom hook for handling the password reset process.
 * It uses React Query's useMutation to call the resetPassword service.
 * On success, it navigates the user to the login page.
 *
 * @returns {{
 *   resetPassword: import('@tanstack/react-query').UseMutateFunction<
 *     import('../services/authService').ResetPasswordResponse,
 *     Error,
 *     import('../services/authService').ResetPasswordRequest,
 *     unknown
 *   >,
 *   isPending: boolean,
 *   isError: boolean,
 *   error: Error | null,
 *   isSuccess: boolean
 * }}
 */
export const useResetPassword = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      // On successful password reset, redirect to the login page
      navigate('/login');
    },
    onError: (error) => {
      // You can handle errors here, e.g., show a notification
      console.error("Password reset failed:", error);
    }
  });

  return {
    resetPassword: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
