// src/student/pages/StudentProgressPage.tsx
import { motion } from "framer-motion";
import { FaChartLine, FaTrophy, FaStar } from "react-icons/fa";
import ui from "../layouts/student-ui.module.css";

const achievements = [
  { id: 1, title: "أول خطوة", description: "إكمال أول درس", icon: "🎯", date: "منذ أسبوع" },
  { id: 2, title: "متعلم نشط", description: "5 أيام متتالية", icon: "🔥", date: "منذ 3 أيام" },
  { id: 3, title: "متفوق", description: "أول درجة كاملة", icon: "⭐", date: "منذ يوم" },
  { id: 4, title: "بطل الاستمرارية", description: "أسبوع كامل", icon: "🏆", date: "أمس" },
];

const weeklyProgress = [
  { day: "السبت", hours: 2, color: "var(--primary)" },
  { day: "الأحد", hours: 1.5, color: "var(--success)" },
  { day: "الاثنين", hours: 3, color: "var(--warning)" },
  { day: "الثلاثاء", hours: 2.5, color: "var(--primary)" },
  { day: "الأربعاء", hours: 1, color: "var(--secondary)" },
  { day: "الخميس", hours: 2, color: "var(--primary)" },
  { day: "الجمعة", hours: 0, color: "var(--border)" },
];

const skills = [
  { name: "اللغة الإنجليزية", level: 65, color: "#1cb0f6" },
  { name: "الرياضيات", level: 40, color: "#58cc02" },
  { name: "التواصل", level: 85, color: "#ffc800" },
  { name: "العلوم", level: 20, color: "#ce82ff" },
];

const StudentProgressPage = () => {
  const maxHours = Math.max(...weeklyProgress.map((d) => d.hours));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-4">
        <h2 className={ui.pageTitle}>تقدمك</h2>
        <p className={ui.pageSub} style={{ marginBottom: 0 }}>تتبع تقدمك وتحقق أهدافك التعليمية</p>
      </div>

      <div className="row g-4 mb-4">
        {[
          { emoji: "📊", value: "65%", label: "متوسط التقدم", color: "var(--primary)" },
          { emoji: "⏱️", value: "12س", label: "ساعات التعلم", color: "var(--success)" },
          { emoji: "🎯", value: "4", label: "أهداف مكتملة", color: "var(--warning)" },
          { emoji: "🔥", value: "5", label: "أيام متتالية", color: "var(--danger)" },
        ].map((s) => (
          <div className="col-md-3" key={s.label}>
            <div className={ui.card} style={{ textAlign: "center" }}>
              <div className="mb-2" style={{ fontSize: "2.2rem" }}>{s.emoji}</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ color: "var(--text-light)", fontSize: "0.95rem", marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className={ui.card}>
            <h5 style={{ color: "var(--text)", marginBottom: "1.25rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
              <FaChartLine /> التقدم الأسبوعي
            </h5>
            <div className="d-flex justify-content-between align-items-end gap-2" style={{ height: 180 }}>
              {weeklyProgress.map((day) => (
                <div key={day.day} className="flex-grow-1 d-flex flex-column align-items-center">
                  <div
                    className="w-100 rounded-top"
                    style={{
                      height: `${(day.hours / maxHours) * 100}px`,
                      backgroundColor: day.hours > 0 ? day.color : "var(--border)",
                      minHeight: day.hours > 0 ? "20px" : "4px",
                      transition: "height 0.3s ease",
                    }}
                  />
                  <div className="mt-2" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                    {day.day}
                  </div>
                  <div style={{ color: "var(--text)", fontSize: "0.8rem", fontWeight: 600 }}>
                    {day.hours}س
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={ui.card} style={{ marginTop: 16 }}>
            <h5 style={{ color: "var(--text)", marginBottom: "1.25rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
              <FaStar /> مهاراتك
            </h5>
            <div className="d-flex flex-column gap-3">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: "var(--text)", fontSize: "0.95rem" }}>{skill.name}</span>
                    <span style={{ color: skill.color, fontWeight: 700 }}>{skill.level}%</span>
                  </div>
                  <div className={ui.progressTrack}>
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: "100%",
                        backgroundColor: skill.color,
                        borderRadius: 999,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className={ui.card}>
            <h5 style={{ color: "var(--text)", marginBottom: "1.25rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
              <FaTrophy /> الإنجازات
            </h5>
            <div className="d-flex flex-column gap-2">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  style={{
                    backgroundColor: "var(--background)",
                    borderRadius: 12,
                    padding: "0.85rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ fontSize: "1.5rem" }}>{a.icon}</div>
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700, fontSize: "0.95rem" }}>{a.title}</div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.82rem", lineHeight: 1.4 }}>
                      {a.description}
                    </div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.72rem" }}>{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentProgressPage;
