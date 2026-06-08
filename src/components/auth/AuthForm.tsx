// src\components\auth\AuthForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaUserShield } from 'react-icons/fa';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
  onSubmit?: (data: any) => void;
}

const AuthForm = ({ mode, onSwitchMode, onSubmit }: AuthFormProps) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    parentName: '',
    rememberMe: false,
    agreeTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="row g-0 min-vh-100">
      <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-lg-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-100"
          style={{ maxWidth: '480px' }}
        >
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
              style={{ 
                width: '64px', 
                height: '64px', 
                background: 'linear-gradient(135deg, #58cc02, #ce82ff)' 
              }}
            >
              <span style={{ fontSize: '1.75rem', color: 'white' }}>♿</span>
            </div>
            <h1 className="h3 fw-bold mb-2" style={{ color: 'var(--text)' }}>
              {mode === 'login' ? 'مرحباً بعودتك!' : 'إنشاء حساب جديد'}
            </h1>
            <p style={{ color: 'var(--text-light)' }}>
              {mode === 'login' 
                ? 'سجل دخولك للمتابعة في رحلتك التعليمية'
                : 'انضم إلى مجتمعنا وابدأ رحلتك التعليمية'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-4">
            {mode === 'register' && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                  الاسم الكامل
                </label>
                <div className="position-relative">
                  <FaUser className="position-absolute" style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    className="form-control p-3"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                    style={{ 
                      borderRadius: '12px', 
                      border: '2px solid var(--border)',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text)',
                      paddingRight: '44px'
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                البريد الإلكتروني
              </label>
              <div className="position-relative">
                <FaEnvelope className="position-absolute" style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="email"
                  className="form-control p-3"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  style={{ 
                    borderRadius: '12px', 
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text)',
                    paddingRight: '44px'
                  }}
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                  رقم الهاتف
                </label>
                <div className="position-relative">
                  <FaPhone className="position-absolute" style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="tel"
                    className="form-control p-3"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+966 55 123 4567"
                    style={{ 
                      borderRadius: '12px', 
                      border: '2px solid var(--border)',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text)',
                      paddingRight: '44px'
                    }}
                  />
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div className="mb-3">
                <label htmlFor="parentName" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                  اسم ولي الأمر
                </label>
                <div className="position-relative">
                  <FaUserShield className="position-absolute" style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    className="form-control p-3"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="أدخل اسم ولي الأمر"
                    style={{ 
                      borderRadius: '12px', 
                      border: '2px solid var(--border)',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text)',
                      paddingRight: '44px'
                    }}
                  />
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                كلمة المرور
              </label>
              <div className="position-relative">
                <FaLock className="position-absolute" style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control p-3"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="أدخل كلمة المرور"
                  required
                  style={{ 
                    borderRadius: '12px', 
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--text)',
                    paddingRight: '44px'
                  }}
                />
                <button
                  type="button"
                  className="btn position-absolute"
                  style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label fw-bold" style={{ color: 'var(--text)' }}>
                  تأكيد كلمة المرور
                </label>
                <div className="position-relative">
                  <FaLock className="position-absolute" style={{ right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control p-3"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="أعد إدخال كلمة المرور"
                    required
                    style={{ 
                      borderRadius: '12px', 
                      border: '2px solid var(--border)',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--text)',
                      paddingRight: '44px'
                    }}
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <label className="form-check-label" htmlFor="rememberMe" style={{ color: 'var(--text-light)' }}>
                    تذكرني
                  </label>
                </div>
                <a href="#forgot" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                  نسيت كلمة المرور؟
                </a>
              </div>
            )}

            {mode === 'register' && (
              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <label className="form-check-label" htmlFor="agreeTerms" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    أوافق على <a href="#" style={{ color: 'var(--primary)' }}>الشروط والأحكام</a> و<a href="#" style={{ color: 'var(--primary)' }}>سياسة الخصوصية</a>
                  </label>
                </div>
              </div>
            )}

            <Button variant="primary" size="large" fullWidth type="submit">
              {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </Button>
          </form>

          <div className="text-center mb-4">
            <span style={{ color: 'var(--text-light)' }}>أو</span>
          </div>

          <div className="d-flex gap-3 mb-4">
            <Button variant="secondary" fullWidth>
              <FaGoogle className="ms-2" />
              CONTINUE WITH GOOGLE
            </Button>
            <Button variant="secondary" fullWidth>
              <FaFacebook className="ms-2" />
              FACEBOOK
            </Button>
          </div>

          <p className="text-center mb-0" style={{ color: 'var(--text-light)' }}>
            {mode === 'login' ? (
              <>
                ليس لديك حساب؟{' '}
                <button 
                  onClick={() => onSwitchMode('register')}
                  style={{ 
                    color: 'var(--primary)', 
                    border: 'none', 
                    background: 'none', 
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  إنشاء حساب
                </button>
              </>
            ) : (
              <>
                لديك حساب بالفعل؟{' '}
                <button 
                  onClick={() => onSwitchMode('login')}
                  style={{ 
                    color: 'var(--primary)', 
                    border: 'none', 
                    background: 'none', 
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  تسجيل الدخول
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>

      <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
        <div className="position-absolute w-100 h-100" style={{ overflow: 'hidden' }}>
          <motion.div
            className="position-absolute rounded-circle"
            style={{
              width: '400px',
              height: '400px',
              background: 'linear-gradient(135deg, rgba(88, 204, 2, 0.3) 0%, rgba(88, 204, 2, 0.1) 100%)',
              top: '-100px',
              left: '-100px',
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="position-absolute rounded-circle"
            style={{
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, rgba(206, 130, 255, 0.3) 0%, rgba(206, 130, 255, 0.1) 100%)',
              bottom: '-50px',
              right: '-50px',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="position-absolute rounded-circle"
            style={{
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(255, 200, 0, 0.2) 0%, rgba(255, 200, 0, 0.05) 100%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              y: [-30, 30, -30],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="position-absolute w-100 h-100" style={{ background: 'radial-gradient(circle at center, transparent 0%, var(--background) 70%)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="position-relative text-center p-5"
        >
          <motion.div
            className="mx-auto mb-4 d-flex align-items-center justify-content-center"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #58cc02 0%, #ce82ff 100%)',
              boxShadow: '0 20px 60px rgba(88, 204, 2, 0.4)',
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span style={{ fontSize: '3.5rem' }}>♿</span>
          </motion.div>

          <h2 className="display-4 fw-bold mb-3" style={{ color: 'var(--text)' }}>خطوة همة</h2>
          <p className="lead mb-4" style={{ color: 'var(--text-light)', maxWidth: '400px' }}>
            منصتك التعليمية الشاملة للمتعلمين من جميع القدرات
          </p>

          <div className="d-flex justify-content-center gap-4 flex-wrap mb-4">
            <motion.div
              className="p-3 rounded-3"
              style={{ backgroundColor: 'var(--surface)', minWidth: '100px' }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="fs-4 fw-bold" style={{ color: 'var(--primary)' }}>12,500+</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>طالب نشط</div>
            </motion.div>
            <motion.div
              className="p-3 rounded-3"
              style={{ backgroundColor: 'var(--surface)', minWidth: '100px' }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="fs-4 fw-bold" style={{ color: 'var(--secondary)' }}>200+</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>دورة تعليمية</div>
            </motion.div>
            <motion.div
              className="p-3 rounded-3"
              style={{ backgroundColor: 'var(--surface)', minWidth: '100px' }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="fs-4 fw-bold" style={{ color: 'var(--warning)' }}>4.9</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>تقييم</div>
            </motion.div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            {[
              { icon: '🎓', label: 'تعليم شامل' },
              { icon: '♿', label: 'وصول متاح' },
              { icon: '🌟', label: 'جودة عالية' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                style={{ backgroundColor: 'var(--surface)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span>{item.icon}</span>
                <span className="fw-semibold" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;