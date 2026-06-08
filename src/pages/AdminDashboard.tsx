// src\pages\AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { AdminLayout, AdminHomePage, AdminAnalyticsPage, AdminUsersPage, AdminCoursesPage, AdminSettingsPage, AdminCommunityPage, AdminGamesPage, AdminExpensesPage, AdminMessagesPage, AdminNotificationsPage, AdminTreatmentProtocolsPage, AdminSchedulePage, AdminSalaryPage, AdminPartnersPage, AdminNotesPage, AdminPlansPage, AdminHiringPage, AdminAttendancePage, AdminLiveSessionsPage } from '../admin';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const path = window.location.pathname;
    if (path === '/admin/schedule') setActivePage('schedule');
    else if (path === '/admin/salary') setActivePage('salary');
    else if (path === '/admin/partners') setActivePage('partners');
    else if (path === '/admin/notes') setActivePage('notes');
    else if (path === '/admin/plans') setActivePage('plans');
    else if (path === '/admin/hiring') setActivePage('hiring');
    else if (path === '/admin/messages') setActivePage('messages');
    else if (path === '/admin/notifications') setActivePage('notifications');
    else if (path === '/admin/treatment') setActivePage('treatment');
    else if (path === '/admin/attendance') setActivePage('attendance');
    else if (path === '/admin/users') setActivePage('users');
    else if (path === '/admin/courses') setActivePage('courses');
    else if (path === '/admin/games') setActivePage('games');
    else if (path === '/admin/community') setActivePage('community');
    else if (path === '/admin/analytics') setActivePage('analytics');
    else if (path === '/admin/expenses') setActivePage('expenses');
    else if (path === '/admin/live-sessions') setActivePage('live-sessions');
    else if (path === '/admin/settings') setActivePage('settings');
    else setActivePage('home');
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'schedule':
        return <AdminSchedulePage />;
      case 'salary':
        return <AdminSalaryPage />;
      case 'partners':
        return <AdminPartnersPage />;
      case 'notes':
        return <AdminNotesPage />;
      case 'plans':
        return <AdminPlansPage />;
      case 'hiring':
        return <AdminHiringPage />;
      case 'messages':
        return <AdminMessagesPage />;
      case 'notifications':
        return <AdminNotificationsPage />;
      case 'treatment':
        return <AdminTreatmentProtocolsPage />;
      case 'users':
        return <AdminUsersPage />;
      case 'attendance':
        return <AdminAttendancePage />;
      case 'courses':
        return <AdminCoursesPage />;
      case 'games':
        return <AdminGamesPage />;
      case 'analytics':
        return <AdminAnalyticsPage />;
      case 'settings':
        return <AdminSettingsPage />;
      case 'community':
        return <AdminCommunityPage />;
      case 'expenses':
        return <AdminExpensesPage />;
      case 'live-sessions':
        return <AdminLiveSessionsPage />;
      default:
        return <AdminHomePage />;
    }
  };

  return (
    <AdminLayout 
      activeSection={activePage}
      setActiveSection={setActivePage}
      onNavigate={(path) => {
        window.history.pushState(null, "", path);
        const page = path.replace("/admin/", "") || "home";
        setActivePage(page);
      }}
    >
      {renderPage()}
    </AdminLayout>
  );
};

export default AdminDashboard;