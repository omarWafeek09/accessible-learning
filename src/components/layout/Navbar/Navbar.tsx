// src\components\layout\Navbar\Navbar.tsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAccessibleIcon,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import Button from "../../ui/Button";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "المميزات", href: "#features" },
  { label: "الدورات", href: "#courses" },
  { label: "الألعاب", href: "#games" },
  { label: "المجتمع", href: "#community" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgressVisible, setIsProgressVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setIsScrolled(scrollTop > 20);
      const isVisible = scrollTop >= 30;
      setIsProgressVisible(isVisible);
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
      if (progressContainerRef.current) {
        progressContainerRef.current.style.display = isVisible
          ? "block"
          : "none";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top  ${isScrolled ? "shadow-lg" : ""}`}
      style={{
        backgroundColor: isProgressVisible ? "var(--nav-bg)" : "transparent",
        height: "75px",
      }}
      aria-label="التنقل الرئيسي"
    >
      <div className="container">
        <a
          href="#home"
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4"
          onClick={(e) => handleNavClick(e, "#home")}
          style={{ color: "var(--text)" }}
        >
          <FaAccessibleIcon style={{ color: "#58cc02" }} />
          <span>خطوة همة</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isMobileMenuOpen}
          style={{ color: "var(--text)" }}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""} gap-2`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <a
                  href={link.href}
                  className="nav-link fw-semibold"
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{ color: "var(--text-light)" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="btn d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
                color: "var(--text)",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={
                theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"
              }
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaSun style={{ color: "#ffc800" }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaMoon style={{ color: "#9c27b0" }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <Button
              variant="primary"
              size="small"
              onClick={() => (window.location.href = "/auth")}
            >
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="position-absolute w-100 shadow-lg"
            style={{
              top: "100%",
              zIndex: 999,
              backgroundColor: "var(--surface)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="container py-3 d-flex flex-column gap-2"
              style={{ height: "70px" }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link fw-semibold py-2"
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{ color: "var(--text)" }}
                >
                  {link.label}
                </a>
              ))}
              <div className="d-flex align-items-center gap-2 mt-2">
                <motion.button
                  onClick={toggleTheme}
                  className="btn d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--background)",
                    border: "2px solid var(--border)",
                    color: "var(--text)",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={
                    theme === "dark"
                      ? "تفعيل الوضع الفاتح"
                      : "تفعيل الوضع الداكن"
                  }
                >
                  {theme === "dark" ? (
                    <FaSun style={{ color: "#ffc800" }} />
                  ) : (
                    <FaMoon style={{ color: "#9c27b0" }} />
                  )}
                </motion.button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => (window.location.href = "auth")}
                >
                  تسجيل الدخول
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        ref={progressContainerRef}
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          width: "100%",
          height: "7px",
          backgroundColor: "var(--nav-bg)",
          borderBottom: "2px solid var(--border)",
          display: "none",
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: "0%",
            height: "100%",
            backgroundColor: "#58cc02",
          }}
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="تقدم الصفحة"
        />
      </div>
    </nav>
  );
};

export default Navbar;
