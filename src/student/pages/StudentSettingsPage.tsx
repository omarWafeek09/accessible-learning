// src/student/pages/StudentSettingsPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaBell, FaPalette, FaLanguage, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import ui from "../layouts/student-ui.module.css";

const StudentSettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [language, setLanguage] = useState("العربية");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-4">
        <h2 className={ui.pageTitle}>الإعدادات</h2>
        <p className={ui.pageSub} style={{ marginBottom: 0 }}>خصص تجربتك التعليمية</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className={ui.card}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className={ui.iconCircle} style={{ backgroundColor: "var(--primary)" }}>
                <FaUser />
              </div>
              <div>
                <h5 style={{ color: "var(--text)", marginBottom: 4 }}>الملف الشخصي</h5>
                <small style={{ color: "var(--text-light)" }}>معلومات حسابك</small>
              </div>
            </div>

            {[
              { label: "الاسم", value: "أحمد محمد" },
              { label: "البريد الإلكتروني", value: "ahmed@example.com" },
              { label: "رقم الهاتف", value: "+966 55 123 4567" },
            ].map((f) => (
              <div className="mb-3" key={f.label}>
                <label style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{f.label}</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={f.value}
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    borderRadius: 12,
                    padding: "0.6rem 0.9rem",
                  }}
                />
              </div>
            ))}
            <button className={ui.btnPrimary}>حفظ التغييرات</button>
          </div>

          <div className={ui.card} style={{ marginTop: 16 }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className={ui.iconCircle} style={{ backgroundColor: "var(--warning)" }}>
                <FaLock />
              </div>
              <div>
                <h5 style={{ color: "var(--text)", marginBottom: 4 }}>الأمان</h5>
                <small style={{ color: "var(--text-light)" }}>إعدادات كلمة المرور</small>
              </div>
            </div>

            {["كلمة المرور الحالية", "كلمة المرور الجديدة"].map((label) => (
              <div className="mb-3" key={label}>
                <label style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{label}</label>
                <input
                  type="password"
                  className="form-control"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    borderRadius: 12,
                    padding: "0.6rem 0.9rem",
                  }}
                />
              </div>
            ))}
            <button className={ui.btnPrimary}>تحديث كلمة المرور</button>
          </div>
        </div>

        <div className="col-lg-6">
          <div className={ui.card}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className={ui.iconCircle} style={{ backgroundColor: "var(--primary)" }}>
                <FaPalette />
              </div>
              <div>
                <h5 style={{ color: "var(--text)", marginBottom: 4 }}>المظهر</h5>
                <small style={{ color: "var(--text-light)" }}>تخصيص الواجهة</small>
              </div>
            </div>

            <div className={ui.statRow}>
              <div className="d-flex align-items-center gap-3">
                {theme === "dark" ? <FaMoon style={{ color: "var(--text-light)" }} /> : <FaSun style={{ color: "var(--warning)" }} />}
                <span style={{ color: "var(--text)" }}>الوضع</span>
              </div>
              <button onClick={toggleTheme} className={ui.btnGhost}>
                {theme === "dark" ? "داكن" : "فاتح"}
              </button>
            </div>
          </div>

          <div className={ui.card} style={{ marginTop: 16 }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className={ui.iconCircle} style={{ backgroundColor: "var(--success)" }}>
                <FaBell />
              </div>
              <div>
                <h5 style={{ color: "var(--text)", marginBottom: 4 }}>الإشعارات</h5>
                <small style={{ color: "var(--text-light)" }}>تحكم في الإشعارات</small>
              </div>
            </div>

            {[
              { label: "الإشعارات push", on: notifications, setOn: setNotifications },
              { label: "الصوت", on: soundEffects, setOn: setSoundEffects },
            ].map((t) => (
              <div key={t.label} className={ui.statRow} style={{ marginBottom: 8 }}>
                <span style={{ color: "var(--text)" }}>{t.label}</span>
                <button
                  onClick={() => t.setOn(!t.on)}
                  className="btn p-0"
                  style={{
                    width: 50,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: t.on ? "var(--primary)" : "var(--border)",
                    transition: "background-color 0.2s",
                    border: "none",
                  }}
                  aria-label={t.label}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      transform: t.on ? "translateX(-24px)" : "translateX(0)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className={ui.card} style={{ marginTop: 16 }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className={ui.iconCircle} style={{ backgroundColor: "var(--secondary)" }}>
                <FaLanguage />
              </div>
              <div>
                <h5 style={{ color: "var(--text)", marginBottom: 4 }}>اللغة</h5>
                <small style={{ color: "var(--text-light)" }}>اختر اللغة المفضلة</small>
              </div>
            </div>

            <select
              className="form-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                borderRadius: 12,
                padding: "0.6rem 0.9rem",
              }}
            >
              <option value="العربية">العربية</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentSettingsPage;
