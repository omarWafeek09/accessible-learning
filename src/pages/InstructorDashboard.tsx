// src\pages\InstructorDashboard.tsx
import { useEffect, useState } from 'react';
import { InstructorLayout, InstructorHomePage, InstructorCoursesPage, InstructorStudentsPage, InstructorNotificationsPage, InstructorAnalyticsPage, LiveSessionsPage, InstructorSettingsPage, InstructorNotesPage, InstructorCalendarPage, InstructorSalaryPage } from '../instructor';

const InstructorDashboard = () => {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const path = window.location.pathname;
    if (path === '/instructor/courses') setActivePage('courses');
    else if (path === '/instructor/students') setActivePage('students');
    else if (path === '/instructor/notifications') setActivePage('notifications');
    else if (path === '/instructor/analytics') setActivePage('analytics');
    else if (path === '/instructor/live-sessions') setActivePage('live-sessions');
    else if (path === '/instructor/settings') setActivePage('settings');
    else if (path === '/instructor/notes') setActivePage('notes');
    else if (path === '/instructor/calendar') setActivePage('calendar');
    else if (path === '/instructor/salary') setActivePage('salary');
    else setActivePage('home');
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'courses':
        return <InstructorCoursesPage />;
      case 'students':
        return <InstructorStudentsPage />;
      case 'notifications':
        return <InstructorNotificationsPage />;
      case 'analytics':
        return <InstructorAnalyticsPage />;
      case 'live-sessions':
        return <LiveSessionsPage />;
      case 'settings':
        return <InstructorSettingsPage />;
      case 'notes':
        return <InstructorNotesPage />;
      case 'calendar':
        return <InstructorCalendarPage />;
      case 'salary':
        return <InstructorSalaryPage />;
      default:
        return <InstructorHomePage />;
    }
  };

  return (
    <InstructorLayout 
      activeSection={activePage}
      setActiveSection={setActivePage}
      onNavigate={(path) => {
        window.history.pushState(null, "", path);
        const page = path.replace("/instructor/", "") || "home";
        setActivePage(page);
      }}
    >
      {renderPage()}
    </InstructorLayout>
  );
};

export default InstructorDashboard;