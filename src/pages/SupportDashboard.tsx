// src\pages\SupportDashboard.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaCommentDots, FaSignInAlt, FaUserCircle, FaCircle, FaSun, FaMoon, FaBell, FaUserGraduate, FaCog, FaChartBar, FaChartLine, FaFileAlt, FaBook } from 'react-icons/fa';
import { SupportChatsPage, SupportStudentsPage, SupportSettingsPage, SupportAnalyticsPage, SupportDocsPage } from '../support';
import { useTheme } from '../context/ThemeContext';

const SupportDashboard = () => {
  const [activePage, setActivePage] = useState('chats');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const path = window.location.pathname;
    if (path === '/support' || path === '/support/' || path === '/support/chats') setActivePage('chats');
    else if (path === '/support/students') setActivePage('students');
    else if (path === '/support/docs') setActivePage('docs');
    else if (path === '/support/settings') setActivePage('settings');
    else if (path === '/support/analytics') setActivePage('analytics');
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState(null, "", path);
    const page = path.replace("/support/", "") || "chats";
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'chats': return <SupportChatsPage />;
      case 'students': return <SupportStudentsPage />;
      case 'docs': return <SupportDocsPage />;
      case 'settings': return <SupportSettingsPage />;
      case 'analytics': return <SupportAnalyticsPage />;
      default: return <SupportChatsPage />;
    }
  };

  const menuItems = [
    { id: 'chats', icon: <FaCommentDots />, label: 'المحادثات', path: '/support/chats' },
    { id: 'students', icon: <FaUserGraduate />, label: 'الطلاب', path: '/support/students' },
    { id: 'docs', icon: <FaBook />, label: 'المقالات', path: '/support/docs' },
    { id: 'analytics', icon: <FaChartBar />, label: 'الإحصائيات', path: '/support/analytics' },
    { id: 'settings', icon: <FaCog />, label: 'الإعدادات', path: '/support/settings' },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="d-flex flex-column"
        style={{
          width: sidebarOpen ? '300px' : '100px',
          minWidth: sidebarOpen ? '300px' : '100px',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          position: 'fixed',
          height: '100vh',
          transition: 'width 0.3s ease, min-width 0.3s ease',
          zIndex: 1000,
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div className="p-3 border-bottom" style={{ borderColor: 'var(--border)' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', color: 'white' }}>
                <FaHeadset />
              </div>
              {sidebarOpen && <span className="fw-bold" style={{ color: 'var(--text)' }}>دردشة الدعم</span>}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn" style={{ width: '36px', height: '36px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '10px' }}>
              ☰
            </button>
          </div>
          
        </div>

        {/* Navigation */}
        <nav className="flex-grow-1 p-2" style={{ overflowY: 'auto' }}>
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => handleNavigate(item.path)} className="w-100 d-flex align-items-center gap-3 mb-1" style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: activePage === item.id ? '#25D366' : 'transparent', color: activePage === item.id ? 'white' : 'var(--text-light)', border: 'none', cursor: 'pointer', justifyContent: sidebarOpen ? 'flex-start' : 'center', transition: 'background-color 0.2s ease' }}>
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-top" style={{ borderColor: 'var(--border)' }}>
          <button onClick={() => window.location.href = '/'} className="w-100 d-flex align-items-center gap-3" style={{ padding: '12px 16px', borderRadius: '12px', backgroundColor: 'transparent', color: 'var(--danger)', border: 'none', cursor: 'pointer', justifyContent: sidebarOpen ? 'flex-start' : 'center' }}>
            <FaSignInAlt style={{ transform: 'rotate(180deg)' }} />
            {sidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginRight: sidebarOpen ? '300px' : '100px', transition: 'margin-right 0.3s ease', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Bar */}
        <header className="d-flex align-items-center justify-content-end p-3" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div className="d-flex align-items-center gap-2">
            <button onClick={toggleTheme} className="btn d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '10px' }} aria-label="تبديل السمة">
              {theme === 'dark' ? <FaSun style={{ color: '#ffc800' }} /> : <FaMoon style={{ color: '#9c27b0' }} />}
            </button>
            <button className="btn d-flex align-items-center justify-content-center position-relative" style={{ width: '40px', height: '40px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '10px' }}>
              <FaBell style={{ color: 'var(--text-light)' }} />
              <span className="position-absolute rounded-circle d-flex align-items-center justify-content-center" style={{ top: '-4px', right: '-4px', width: '18px', height: '18px', backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.7rem' }}>5</span>
            </button>
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
              <FaUserCircle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default SupportDashboard;