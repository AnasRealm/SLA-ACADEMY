import React from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout 
      title="بوابة المستقبل"
      subtitle="سجل دخولك الآن للوصول إلى أحدث الدورات والمحتوى التعليمي المميز."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;