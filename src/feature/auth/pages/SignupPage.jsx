import React from 'react';
import AuthLayout from '../components/AuthLayout';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <AuthLayout>
      {/* تمت إزالة العناوين الممررة لأنها أصبحت ثابتة داخل AuthLayout */}
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;