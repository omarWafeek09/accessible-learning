// src\admin\layouts\AdminLayout.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaBook,
  FaGamepad,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignInAlt,
  FaSearch,
  FaBell,
  FaMoneyBill,
  FaEnvelope,
  FaBell as FaBellAlt,
  FaFileMedical,
  FaCalendarAlt,
  FaDollarSign,
  FaListAlt,
  FaUserPlus,
  FaHandshake,
  FaStickyNote,
  FaUserClock,
  FaVideo,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import { useTheme } from "../../context/ThemeContext";


interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  onNavigate?: (path: string) => void;
}

const menuSections = [
  {
    title: "الرئيسية",
    items: [
      { id: "home", icon: <FaHome />, label: "الرئيسية", path: "/admin/" },
    ],
  },
  {
    title: "المحتوى",
    items: [
      { id: "courses", icon: <FaBook />, label: "الدورات", path: "/admin/courses" },
      { id: "games", icon: <FaGamepad />, label: "الألعاب", path: "/admin/games" },
      { id: "treatment", icon: <FaFileMedical />, label: "بروتوكولات العلاج", path: "/admin/treatment" },
      { id: "live-sessions", icon: <FaVideo />, label: "الجلسات المباشرة", path: "/admin/live-sessions" }
    ],
  },
  {
    title: "إدارة المستخدمين",
    items: [
      { id: "users", icon: <FaUser />, label: "المستخدمين", path: "/admin/users" },
      { id: "attendance", icon: <FaUserClock />, label: "الحضور والانصراف", path: "/admin/attendance" },
      { id: "partners", icon: <FaHandshake />, label: "المؤسسات", path: "/admin/partners" },
      { id: "community", icon: <FaUsers />, label: "المجتمع", path: "/admin/community" },
    ],
  },
  {
    title: "المالية",
    items: [
      { id: "plans", icon: <FaListAlt />, label: "الخطط", path: "/admin/plans" },
      { id: "expenses", icon: <FaMoneyBill />, label: "المصروفات", path: "/admin/expenses" },
      { id: "salary", icon: <FaDollarSign />, label: "الرواتب", path: "/admin/salary" },
    ],
  },
  {
    title: "الأدوات",
    items: [
      { id: "messages", icon: <FaEnvelope />, label: "الرسائل", path: "/admin/messages" },
      { id: "hiring", icon: <FaUserPlus />, label: "التوظيف", path: "/admin/hiring" },
      { id: "notes", icon: <FaStickyNote />, label: "الملاحظات", path: "/admin/notes" },
      { id: "analytics", icon: <FaChartBar />, label: "التحليلات", path: "/admin/analytics" },
      { id: "schedule", icon: <FaCalendarAlt />, label: "الجدول", path: "/admin/schedule" }
    ],
  },
  {
    title: "الإعدادات",
    items: [
      { id: "notifications", icon: <FaBellAlt />, label: "الإشعارات", path: "/admin/notifications" },
      { id: "settings", icon: <FaCog />, label: "الإعدادات", path: "/admin/settings" }
    ],
  },
];

const AdminLayout = ({ children, activeSection: externalActiveSection, setActiveSection: externalSetActiveSection, onNavigate }: AdminLayoutProps) => {
  const [sidebarActiveSection, setSidebarActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const activeSection = externalActiveSection || sidebarActiveSection;
  const setActiveSection = externalSetActiveSection || setSidebarActiveSection;

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/admin" || path === "/admin/") {
      setActiveSection("home");
    } else if (path.includes("/admin/schedule")) {
      setActiveSection("schedule");
    } else if (path.includes("/admin/salary")) {
      setActiveSection("salary");
    } else if (path.includes("/admin/partners")) {
      setActiveSection("partners");
    } else if (path.includes("/admin/notes")) {
      setActiveSection("notes");
    } else if (path.includes("/admin/plans")) {
      setActiveSection("plans");
    } else if (path.includes("/admin/hiring")) {
      setActiveSection("hiring");
    } else if (path.includes("/admin/messages")) {
      setActiveSection("messages");
    } else if (path.includes("/admin/notifications")) {
      setActiveSection("notifications");
    } else if (path.includes("/admin/treatment")) {
      setActiveSection("treatment");
    } else if (path.includes("/admin/users")) {
      setActiveSection("users");
    } else if (path.includes("/admin/attendance")) {
      setActiveSection("attendance");
    } else if (path.includes("/admin/courses")) {
      setActiveSection("courses");
    } else if (path.includes("/admin/games")) {
      setActiveSection("games");
    } else if (path.includes("/admin/community")) {
      setActiveSection("community");
    } else if (path.includes("/admin/analytics")) {
      setActiveSection("analytics");
    } else if (path.includes("/admin/live-sessions")) {
      setActiveSection("live-sessions");
    } else if (path.includes("/admin/settings")) {
      setActiveSection("settings");
    } else if (path.includes("/admin/expenses")) {
      setActiveSection("expenses");
    } else {
      setActiveSection("home");
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
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}
    >
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="d-flex flex-column"
        style={{
          width: sidebarOpen ? "260px" : "80px",
          backgroundColor: "var(--surface)",
          borderRight: "1px solid var(--border)",
          position: "fixed",
          height: "100vh",
          transition: "width 0.3s ease",
          zIndex: 1000,
        }}
      >
        <div
          className="p-3 border-bottom"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--primary)",
                color: "white",
                fontWeight: "bold",
              }}
            ></div>
            {sidebarOpen && (
              <span className="fw-bold" style={{ color: "var(--text)" }}>
                لوحة التحكم
              </span>
            )}
          </div>
        </div>

<nav
            className="flex-grow-1 p-2 sidebar-nav"
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style>{`.sidebar-nav::-webkit-scrollbar { display: none; }`}</style>
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-3">
                {sidebarOpen && (
                  <div
                    className="px-3 mb-2"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-light)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {section.title}
                  </div>
                )}
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.path)}
                    className="w-100 d-flex align-items-center gap-3 mb-1"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      backgroundColor:
                        activeSection === item.id ? "var(--primary)" : "transparent",
                      color:
                        activeSection === item.id ? "white" : "var(--text-light)",
                      border: "none",
                      cursor: "pointer",
                      justifyContent: sidebarOpen ? "flex-start" : "center",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    {sidebarOpen && <span>{item.label}</span>}
                  </button>
                ))}
              </div>
            ))}
          </nav>

        <div
          className="p-2 border-top"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={() => (window.location.href = "/")}
            className="w-100 d-flex align-items-center gap-3"
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: "transparent",
              color: "var(--danger)",
              border: "none",
              cursor: "pointer",
              justifyContent: sidebarOpen ? "flex-start" : "center",
            }}
          >
            <FaSignInAlt style={{ transform: "rotate(180deg)" }} />
            {sidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </motion.aside>

      <main
        className="flex-grow-1"
        style={{
          marginRight: sidebarOpen ? "260px" : "80px",
          transition: "margin-right 0.3s ease",
        }}
      >
        <header
          className="d-flex align-items-center justify-content-between p-4"
          style={{
            backgroundColor: "var(--surface)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
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
                width: "40px",
                height: "40px",
                backgroundColor: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
              }}
              aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            >
              {theme === 'dark' ? <FaSun style={{ color: '#ffc800' }} /> : <FaMoon style={{ color: '#9c27b0' }} />}
            </button>
            <button
              className="btn d-flex align-items-center justify-content-center position-relative"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
              }}
            >
              <FaBell style={{ color: "var(--text-light)" }} />
              <span
                className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  top: "-4px",
                  right: "-4px",
                  width: "18px",
                  height: "18px",
                  backgroundColor: "var(--danger)",
                  color: "white",
                  fontSize: "0.7rem",
                }}
              >
                3
              </span>
            </button>

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--secondary)",
                color: "white",
                fontWeight: "bold",
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

export default AdminLayout;
