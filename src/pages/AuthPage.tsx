import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleSwitchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
  };

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert(mode === 'login' ? 'تم تسجيل الدخول بنجاح!' : 'تم إنشاء الحساب بنجاح!');
  };

  return (
    <AuthForm mode={mode} onSwitchMode={handleSwitchMode} onSubmit={handleSubmit} />
  );
};

export default AuthPage;