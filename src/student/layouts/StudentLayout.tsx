// src/student/layouts/StudentLayout.tsx
import { useState, useEffect } from "react";
import {
  FaBell,
  FaSun,
  FaMoon,
  FaBook,
  FaBrain,
  FaVideo,
  FaGamepad,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaGraduationCap,
  FaSearch,
  FaSignOutAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import styles from "./StudentLayout.module.css";

interface MenuItem {
  id: string;
  icon: JSX.Element;
  label: string;
  path: string;
  badge?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "التعلّم",
    items: [
      { id: "courses", icon: <FaBook />, label: "دوراتي", path: "/student/courses" },
      { id: "games", icon: <FaGamepad />, label: "الألعاب", path: "/student/games" },
      { id: "live-sessions", icon: <FaVideo />, label: "جلسات", path: "/student/live-sessions" },
      { id: "protocols", icon: <FaBrain />, label: "خطط", path: "/student/protocols" },
    ],
  },
  {
    title: "المتابعة",
    items: [
      { id: "schedule", icon: <FaCalendarAlt />, label: "الجدول", path: "/student/schedule" },
      { id: "progress", icon: <FaChartLine />, label: "تقدمي", path: "/student/progress" },
      { id: "community", icon: <FaUsers />, label: "مجتمع", path: "/student/community" },
    ],
  },
  {
    title: "الحساب",
    items: [
      { id: "notifications", icon: <FaBell />, label: "إشعارات", path: "/student/notifications", badge: 3 },
      { id: "plans", icon: <FaStar />, label: "الخطط", path: "/student/plans" },
      { id: "settings", icon: <FaCog />, label: "الإعدادات", path: "/student/settings" },
    ],
  },
];

const student = {
  name: "أحمد",
};

const StudentLayout = ({
  children,
  activeSection: externalActiveSection,
  onNavigate,
}: {
  children: React.ReactNode;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  onNavigate?: (path: string) => void;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleRouteChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [currentPath]);

  const getActiveSection = () => {
    const path = currentPath;
    if (path === "/student" || path === "/student/") return "courses";
    for (const section of menuSections) {
      const item = section.items.find((i) => path.includes(i.path.split("/")[2]));
      if (item) return item.id;
    }
    return "courses";
  };

  const activeSection = externalActiveSection || getActiveSection();
  const activeItem = menuSections
    .flatMap((s) => s.items)
    .find((i) => i.id === activeSection);
  const activeSectionTitle = menuSections.find((s) =>
    s.items.some((i) => i.id === activeSection)
  )?.title;

  const handleNavigate = (path: string) => {
    if (onNavigate) onNavigate(path);
    else window.location.href = path;
  };

  return (
    <div className={styles.shell}>
      <div
        className={`${styles.scrim} ${mobileOpen ? styles.scrimVisible : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button
            className={`${styles.iconBtn} ${styles.mobileToggle}`}
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
          >
            <FaGraduationCap />
          </button>

          <button
            className={styles.brand}
            onClick={() => handleNavigate("/student")}
            aria-label="الصفحة الرئيسية"
          >
            <div className={styles.brandMark}>ع</div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>خطوة همة</span>
              <span className={styles.brandSub}>لوحة الطالب</span>
            </div>
          </button>

          <div className={styles.topSpacer} />

          <button
            className={`${styles.iconBtn} ${styles.searchToggle} ${searchOpen ? styles.searchToggleHidden : ""}`}
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="بحث"
            aria-expanded={searchOpen}
          >
            <FaSearch />
          </button>

          <div className={`${styles.searchWrap} ${searchOpen ? styles.searchOpen : ""}`}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="search"
              className={styles.searchInput}
              placeholder="ابحث في دوراتك وألعابك..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="بحث"
              autoFocus={searchOpen}
            />
            {searchOpen && (
              <button
                className={styles.searchClose}
                onClick={() => setSearchOpen(false)}
                aria-label="إغلاق البحث"
              >
                ×
              </button>
            )}
          </div>

          <button
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
            title={theme === "dark" ? "وضع فاتح" : "وضع داكن"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          

          <button
            className={styles.avatar}
            aria-label="الحساب"
            onClick={() => handleNavigate("/student/settings")}
            title={student.name}
          >
            {student.name.charAt(0)}
          </button>
        </div>

        <nav className={styles.nav} aria-label="التنقل الرئيسي">
          <div className={styles.navInner}>
            {menuSections.map((section, sectionIdx) => (
              <div key={section.title} className={styles.navGroup}>
                {sectionIdx > 0 && <span className={styles.navDivider} aria-hidden="true" />}
                <div className={styles.navGroupItems}>
                  {section.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.path)}
                        className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                        aria-current={isActive ? "page" : undefined}
                        title={item.label}
                      >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>{item.label}</span>
                        {item.badge != null && (
                          <span className={styles.navBadge}>{item.badge}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </header>

      <div className={styles.crumbs}>
        <span className={styles.crumbsLabel}>في قسم:</span>
        <span className={styles.crumbsSection}>{activeSectionTitle}</span>
        <span className={styles.crumbsSep}>›</span>
        <span className={styles.crumbsCurrent}>{activeItem?.label}</span>
      </div>

      <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ""}`}>
        <div className={styles.mobileHeader}>
          <button
            className={styles.brand}
            onClick={() => handleNavigate("/student")}
          >
            <div className={styles.brandMark}>ع</div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>خطوة همة</span>
              <span className={styles.brandSub}>لوحة الطالب</span>
            </div>
          </button>
        </div>
        <div className={styles.mobileList}>
          {menuSections.map((section) => (
            <div key={section.title} className={styles.mobileSection}>
              <div className={styles.mobileSectionTitle}>{section.title}</div>
              {section.items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.path)}
                    className={`${styles.mobileItem} ${isActive ? styles.mobileItemActive : ""}`}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge != null && <span className={styles.navBadge}>{item.badge}</span>}
                  </button>
                );
              })}
            </div>
          ))}
          <button
            onClick={() => (window.location.href = "/")}
            className={styles.mobileLogout}
          >
            <FaSignOutAlt />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default StudentLayout;
