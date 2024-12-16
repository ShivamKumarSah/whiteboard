import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <SignupForm onToggleForm={toggleForm} />
      )}
    </div>
  );
};