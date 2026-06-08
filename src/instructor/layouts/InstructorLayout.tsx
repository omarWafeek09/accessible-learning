// src\instructor\layouts\InstructorLayout.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, FaSignInAlt, FaBell, FaChalkboardTeacher, FaBook, FaUsers, FaEnvelope, FaChartLine, FaVideo, FaCalendarAlt, FaCog, FaStickyNote, FaCalendar, FaMoneyBillWave, FaSun, FaMoon
} from 'react-icons/fa';

import { useTheme } from '../../context/ThemeContext';


interface InstructorLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  onNavigate?: (path: string) => void;
}

const menuSections = [
  {
    title: 'الرئيسية',
    items: [
      { id: 'home', icon: <FaHome />, label: 'الرئيسية', path: '/instructor' },
      { id: 'analytics', icon: <FaChartLine />, label: 'التحليلات', path: '/instructor/analytics' },
    ]
  },
  {
    title: 'الدورات',
    items: [
      { id: 'courses', icon: <FaBook />, label: 'دوراتي', path: '/instructor/courses' },
    ]
  },
  {
    title: 'الطلاب',
    items: [
      { id: 'students', icon: <FaUsers />, label: 'طلاب', path: '/instructor/students' },
    ]
  },
  {
    title: 'الإشعارات',
    items: [
      { id: 'notifications', icon: <FaEnvelope />, label: 'الإشعارات', path: '/instructor/notifications' },
    ]
  },
  {
    title: 'البث المباشر',
    items: [
      { id: 'live-sessions', icon: <FaVideo />, label: 'الجلسات والبث', path: '/instructor/live-sessions' },
    ]
  },
  {
    title: 'الإعدادات',
    items: [
      { id: 'settings', icon: <FaCog />, label: 'الإعدادات', path: '/instructor/settings' },
    ]
  },
  {
    title: 'أخرى',
    items: [
      { id: 'notes', icon: <FaStickyNote />, label: 'الملاحظات', path: '/instructor/notes' },
      { id: 'calendar', icon: <FaCalendar />, label: 'الجدول', path: '/instructor/calendar' },
      { id: 'salary', icon: <FaMoneyBillWave />, label: 'الرواتب', path: '/instructor/salary' },
    ]
  }
];

const InstructorLayout = ({ children, activeSection: externalActiveSection, setActiveSection: externalSetActiveSection, onNavigate }: InstructorLayoutProps) => {
  const [sidebarActiveSection, setSidebarActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const activeSection = externalActiveSection || sidebarActiveSection;
  const setActiveSection = externalSetActiveSection || setSidebarActiveSection;

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/instructor' || path === '/instructor/') {
      setActiveSection('home');
    } else if (path.includes('/instructor/analytics')) {
      setActiveSection('analytics');
    } else if (path.includes('/instructor/courses')) {
      setActiveSection('courses');
    } else if (path.includes('/instructor/students')) {
      setActiveSection('students');
    } else if (path.includes('/instructor/notifications')) {
      setActiveSection('notifications');
    } else if (path.includes('/instructor/live-sessions')) {
      setActiveSection('live-sessions');
    } else if (path.includes('/instructor/settings')) {
      setActiveSection('settings');
    } else if (path.includes('/instructor/notes')) {
      setActiveSection('notes');
    } else if (path.includes('/instructor/calendar')) {
      setActiveSection('calendar');
    } else if (path.includes('/instructor/salary')) {
      setActiveSection('salary');
    } else {
      setActiveSection('home');
    }
  }, []);

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="d-flex flex-column"
        style={{
          width: sidebarOpen ? '260px' : '80px',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          position: 'fixed',
          height: '100vh',
          transition: 'width 0.3s ease',
          zIndex: 1000,
        }}
      >
        <div className="p-3 border-bottom" style={{ borderColor: 'var(--border)' }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--success)',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              <FaChalkboardTeacher />
            </div>
            {sidebarOpen && (
              <span className="fw-bold" style={{ color: 'var(--text)' }}>
                لوحة المدرب
              </span>
            )}
          </div>
        </div>

        <nav
          className="flex-grow-1 p-2 sidebar-nav"
          style={{
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`.sidebar-nav::-webkit-scrollbar { display: none; }`}</style>
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="w-100 d-flex align-items-center gap-3 mb-1"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor:
                      activeSection === item.id ? 'var(--success)' : 'transparent',
                    color:
                      activeSection === item.id ? 'white' : 'var(--text-light)',
                    border: 'none',
                    cursor: 'pointer',
                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-2 border-top" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => (window.location.href = '/')}
            className="w-100 d-flex align-items-center gap-3"
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              backgroundColor: 'transparent',
              color: 'var(--danger)',
              border: 'none',
              cursor: 'pointer',
              justifyContent: sidebarOpen ? 'flex-start' : 'center',
            }}
          >
            <FaSignInAlt style={{ transform: 'rotate(180deg)' }} />
            {sidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </motion.aside>

      <main
        className="flex-grow-1"
        style={{
          marginRight: sidebarOpen ? '260px' : '80px',
          transition: 'margin-right 0.3s ease',
        }}
      >
        <header
          className="d-flex align-items-center justify-content-between p-4"
          style={{
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
              }}
            >
              ☰
            </button>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
              }}
              aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            >
              {theme === 'dark' ? <FaSun style={{ color: '#ffc800' }} /> : <FaMoon style={{ color: '#9c27b0' }} />}
            </button>
            <button
              className="btn d-flex align-items-center justify-content-center position-relative"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
              }}
            >
              <FaBell style={{ color: 'var(--text-light)' }} />
              <span
                className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  top: '-4px',
                  right: '-4px',
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'var(--danger)',
                  color: 'white',
                  fontSize: '0.7rem',
                }}
              >
                2
              </span>
            </button>

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--success)',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              م
            </div>
          </div>
        </header>

        <div className="p-4">{children}</div>
      </main>
    </div>
  );
};

export default InstructorLayout;