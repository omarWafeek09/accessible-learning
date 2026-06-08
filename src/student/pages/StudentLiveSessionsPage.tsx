import { motion } from "framer-motion";
import { FaVideo, FaCalendarAlt, FaClock, FaUser, FaPlay } from "react-icons/fa";
import ui from "../layouts/student-ui.module.css";

const sessions = [
  { id: 1, title: "تعلم الإنجليزية - المحادثة", instructor: "أحمد محمد", date: "اليوم", time: "مساء 6:00", duration: "60 دقيقة", status: "soon", students: 15 },
  { id: 2, title: "مراجعة الرياضيات", instructor: "سارة علي", date: "غداً", time: "صباح 10:00", duration: "45 دقيقة", status: "upcoming", students: 8 },
  { id: 3, title: "مهارات التواصل", instructor: "منى حسن", date: "بعد غد", time: "مساء 4:00", duration: "60 دقيقة", status: "upcoming", students: 20 },
  { id: 4, title: "حل التمارين", instructor: "خالد عمر", date: "الأحد", time: "صباح 9:00", duration: "30 دقيقة", status: "upcoming", students: 12 },
];

const pastSessions = [
  { id: 1, title: "الدرس الأول - الإنجليزية", instructor: "أحمد محمد", date: "أمس", duration: "60 دقيقة", watched: true },
  { id: 2, title: "اختبار الرياضيات", instructor: "سارة علي", date: "الجمعة", duration: "45 دقيقة", watched: false },
];

const StudentLiveSessionsPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-4">
        <h2 className={ui.pageTitle}>الجلسات المباشرة</h2>
        <p className={ui.pageSub} style={{ marginBottom: 0 }}>انضم لجلسات مباشرة مع المدرسين</p>
      </div>

      <div className="mb-4">
        <h5 style={{ color: "var(--text)", marginBottom: 16, fontWeight: 700 }}>الجلسات القادمة</h5>
        <div className="row g-4">
          {sessions.map((session, index) => {
            const isSoon = session.status === "soon";
            return (
              <div key={session.id} className="col-md-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={ui.card}
                  style={{ height: "100%" }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div
                      className={ui.iconCircle}
                      style={{ backgroundColor: isSoon ? "var(--success)" : "var(--primary)" }}
                    >
                      <FaVideo />
                    </div>
                    <span
                      className={`${ui.chip} ${isSoon ? ui.chipSuccess : ui.chipPrimary}`}
                    >
                      {isSoon ? "قريب" : "مجدول"}
                    </span>
                  </div>

                  <h5 style={{ color: "var(--text)", marginBottom: 8 }}>{session.title}</h5>
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: 12 }}>
                    <FaUser className="ms-1" /> {session.instructor}
                  </p>

                  <div className="d-flex gap-3 mb-3" style={{ color: "var(--text-light)", fontSize: "0.85rem", flexWrap: "wrap" }}>
                    <span><FaCalendarAlt className="ms-1" />{session.date}</span>
                    <span><FaClock className="ms-1" />{session.time}</span>
                    <span>{session.duration}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <small style={{ color: "var(--text-light)" }}>{session.students} طلاب مسجلين</small>
                    {isSoon ? (
                      <button className={ui.btnPrimary} style={{ backgroundColor: "var(--success)" }}>
                        <FaPlay style={{ fontSize: "0.8rem" }} /> انضم الآن
                      </button>
                    ) : (
                      <button className={ui.btnGhost}>إعدادات</button>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h5 style={{ color: "var(--text)", marginBottom: 16, fontWeight: 700 }}>الجلسات السابقة</h5>
        <div className="d-flex flex-column gap-3">
          {pastSessions.map((session) => (
            <div
              key={session.id}
              className="p-3 d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className={ui.iconCircleSm}
                  style={{
                    backgroundColor: session.watched ? "var(--success)" : "var(--background)",
                    color: session.watched ? "#fff" : "var(--text-light)",
                    border: session.watched ? "none" : "1px solid var(--border)",
                  }}
                >
                  {session.watched ? "✓" : <FaVideo />}
                </div>
                <div>
                  <h6 style={{ color: "var(--text)", marginBottom: 4 }}>{session.title}</h6>
                  <small style={{ color: "var(--text-light)" }}>
                    {session.instructor} • {session.date} • {session.duration}
                  </small>
                </div>
              </div>
              <button className={session.watched ? ui.btnGhost : ui.btnPrimary}>
                {session.watched ? "مشاهد" : "مشاهدة"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentLiveSessionsPage;
