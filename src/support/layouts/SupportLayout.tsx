import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHeadset,
  FaCommentDots,
  FaSignInAlt,
  FaBell,
  FaSun,
  FaMoon,
  FaUserCircle,
  FaCircle,
  FaUserGraduate,
  FaCog,
  FaChartBar,
  FaTicketAlt,
  FaChartLine,
  FaFileAlt,
  FaUsers,
  FaBook,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isFromSupport: boolean;
}

interface Conversation {
  id: number;
  conversationName: string;
  studentEmail: string;
  studentPhone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

interface SupportLayoutProps {
  children: React.ReactNode;
  conversations?: Conversation[];
  activeConversation?: Conversation | null;
  onSelectConversation?: (conv: Conversation) => void;
  onSendMessage?: (text: string) => void;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  onNavigate?: (path: string) => void;
}

const SupportLayout = ({ 
  children, 
  conversations = [],
  activeConversation,
  onSelectConversation,
  onSendMessage,
  activeSection: externalActiveSection,
  setActiveSection: externalSetActiveSection,
  onNavigate 
}: SupportLayoutProps) => {
  const [sidebarActiveSection, setSidebarActiveSection] = useState("chats");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();

  const activeSection = externalActiveSection || sidebarActiveSection;
  const setActiveSection = externalSetActiveSection || setSidebarActiveSection;

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/support/chats") || path === "/support" || path === "/support/") {
      setActiveSection("chats");
    } else if (path.includes("/support/students")) {
      setActiveSection("students");
    } else if (path.includes("/support/docs")) {
      setActiveSection("docs");
    } else if (path.includes("/support/settings")) {
      setActiveSection("settings");
    } else if (path.includes("/support/analytics")) {
      setActiveSection("analytics");
    } else {
      setActiveSection("chats");
    }
  }, []);

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  const handleSendMessage = () => {
    if (onSendMessage && activeConversation) {
      const input = document.getElementById("chat-message-input") as HTMLInputElement;
      if (input && input.value.trim()) {
        onSendMessage(input.value);
        input.value = "";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const menuSections = [
    {
      title: "المحادثات",
      items: [
        { id: "chats", icon: <FaCommentDots />, label: "المحادثات", path: "/support/chats" },
      ],
    },
    {
      title: "إدارة",
      items: [
        { id: "students", icon: <FaUserGraduate />, label: "الطلاب", path: "/support/students" },
        { id: "docs", icon: <FaBook />, label: "المقالات", path: "/support/docs" },
        { id: "analytics", icon: <FaChartBar />, label: "الإحصائيات", path: "/support/analytics" },
      ],
    },
    {
      title: "الإعدادات",
      items: [
        { id: "settings", icon: <FaCog />, label: "الإعدادات", path: "/support/settings" },
      ],
    },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="d-flex flex-column"
        style={{
          width: sidebarOpen ? "320px" : "100px",
          backgroundColor: "var(--surface)",
          borderRight: "1px solid var(--border)",
          position: "fixed",
          height: "100vh",
          transition: "width 0.3s ease",
          zIndex: 1000,
        }}
      >
        <div className="p-3 border-bottom" style={{ borderColor: "var(--border)" }}>
          <div className="d-flex align-items-center justify-content-between">
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
              >
                <FaHeadset />
              </div>
              {sidebarOpen && (
                <span className="fw-bold" style={{ color: "var(--text)" }}>
                  دردشة الدعم
                </span>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                fontSize: "0.9rem",
              }}
            >
              ☰
            </button>
          </div>
        </div>

        <nav className="flex-grow-1 p-2 sidebar-nav" style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`.sidebar-nav::-webkit-scrollbar { display: none; }`}</style>
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-3">
              {sidebarOpen && (
                <div className="px-3 mb-2" style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
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
                    backgroundColor: activeSection === item.id ? "#25D366" : "transparent",
                    color: activeSection === item.id ? "white" : "var(--text-light)",
                    border: "none",
                    cursor: "pointer",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    position: "relative",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                  {item.id === "chats" && conversations.filter(c => c.unread > 0).length > 0 && (
                    <span
                      className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        top: "8px",
                        left: sidebarOpen ? "auto" : "50%",
                        right: sidebarOpen ? "8px" : "auto",
                        transform: sidebarOpen ? "none" : "translateX(-50%)",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#c62828",
                        color: "white",
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                      }}
                    >
                      {conversations.filter(c => c.unread > 0).length}
                    </span>
                  )}
                  {(item as any).badge === "new" && sidebarOpen && (
                    <span
                      className="position-absolute"
                      style={{
                        left: "auto",
                        right: "8px",
                        backgroundColor: "var(--primary)",
                        color: "white",
                        fontSize: "0.6rem",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      جديد
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-2 border-top" style={{ borderColor: "var(--border)" }}>
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
          marginRight: sidebarOpen ? "320px" : "100px",
          transition: "margin-right 0.3s ease",
          display: "flex",
          height: "100vh",
        }}
      >
        <header
          className="d-flex align-items-center justify-content-between p-3"
          style={{
            backgroundColor: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            width: "100%",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
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
                5
              </span>
            </button>
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", backgroundColor: "var(--primary)", color: "white", fontWeight: "bold" }}>
              <FaUserCircle />
            </div>
          </div>

          {activeConversation && (
            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <div className="fw-bold" style={{ color: "var(--text)", fontSize: "0.95rem" }}>
                  {activeConversation.conversationName}
                </div>
                <div className="d-flex align-items-center gap-1" style={{ color: activeConversation.online ? "#2e7d32" : "var(--text-light)", fontSize: "0.75rem" }}>
                  <FaCircle className={activeConversation.online ? "animate-pulse" : ""} style={{ fontSize: "0.5rem" }} />
                  <span>{activeConversation.online ? "متصل" : "غير متصل"}</span>
                </div>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "44px", height: "44px", backgroundColor: "var(--primary)", color: "white", fontWeight: "bold", fontSize: "1rem" }}>
                {activeConversation.id}
              </div>
            </div>
          )}
        </header>

        <div className="flex-grow-1" style={{ overflow: "hidden" }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default SupportLayout;