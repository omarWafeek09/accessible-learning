// src/student/pages/StudentSchedulePage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaVideo, FaBook, FaClock } from "react-icons/fa";
import ui from "../layouts/student-ui.module.css";

const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const scheduleData: { [key: string]: { time: string; title: string; type: string; instructor: string }[] } = {
  "الأحد": [
    { time: "09:00 - 10:30", title: "اللغة الإنجليزية", type: "course", instructor: "أحمد محمد" },
    { time: "11:00 - 12:00", title: "جلسة مباشرة", type: "live", instructor: "سارة علي" },
    { time: "14:00 - 15:30", title: "الرياضيات", type: "course", instructor: "خالد عمر" },
  ],
  "الاثنين": [
    { time: "10:00 - 11:30", title: "العلوم", type: "course", instructor: "منى حسن" },
    { time: "13:00 - 14:00", title: "جلسة تفاعلية", type: "live", instructor: "أحمد محمد" },
  ],
  "الثلاثاء": [
    { time: "08:00 - 09:30", title: "مهارات التواصل", type: "course", instructor: "سارة علي" },
    { time: "15:00 - 16:30", title: "اللغة العربية", type: "course", instructor: "ليلى محمد" },
  ],
  "الأربعاء": [
    { time: "09:00 - 10:00", title: "جلسة مراجعة", type: "live", instructor: "خالد عمر" },
    { time: "11:00 - 12:30", title: "الرياضيات", type: "course", instructor: "أحمد محمد" },
  ],
  "الخميس": [
    { time: "10:00 - 11:30", title: "فنون الرسم", type: "course", instructor: "منى حسن" },
    { time: "14:00 - 15:00", title: "اختبار أسبوعي", type: "exam", instructor: "-" },
  ],
};

const StudentSchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("الأحد");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth: Date[] = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysInMonth.push(new Date(year, month, i));
    }
    return daysInMonth;
  };

  const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

  const daysInMonth = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getTypeColor = (type: string) =>
    type === "live" ? "var(--success)" : type === "exam" ? "var(--warning)" : "var(--primary)";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-4">
        <h2 className={ui.pageTitle}>الجدول الأسبوعي</h2>
        <p className={ui.pageSub} style={{ marginBottom: 0 }}>اعرف مواعيد دروسك وجلساتك المباشرة</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className={ui.card}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button onClick={prevMonth} className="btn" style={{ color: "var(--text)" }} aria-label="الشهر السابق">
                <FaChevronLeft />
              </button>
              <h4 style={{ color: "var(--text)", margin: 0, fontWeight: 700 }}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h4>
              <button onClick={nextMonth} className="btn" style={{ color: "var(--text)" }} aria-label="الشهر التالي">
                <FaChevronRight />
              </button>
            </div>

            <div className="row g-2 mb-3">
              {days.map((day) => (
                <div key={day} className="col">
                  <button
                    onClick={() => setSelectedDay(day)}
                    className="btn w-100 py-2"
                    style={{
                      backgroundColor: selectedDay === day ? "var(--primary)" : "var(--background)",
                      color: selectedDay === day ? "#fff" : "var(--text)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontWeight: 600,
                    }}
                  >
                    {day}
                  </button>
                </div>
              ))}
            </div>

            <div className="d-flex flex-column gap-2">
              {scheduleData[selectedDay]?.length > 0 ? (
                scheduleData[selectedDay].map((item, index) => (
                  <div
                    key={index}
                    className="p-3 d-flex align-items-center gap-3"
                    style={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  >
                    <div
                      className={ui.iconCircleSm}
                      style={{ backgroundColor: getTypeColor(item.type) }}
                    >
                      {item.type === "live" ? <FaVideo /> : <FaBook />}
                    </div>
                    <div className="flex-grow-1">
                      <h6 style={{ color: "var(--text)", marginBottom: 4 }}>{item.title}</h6>
                      <div className="d-flex gap-3" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                        <span><FaClock className="ms-1" />{item.time}</span>
                        <span>{item.instructor}</span>
                      </div>
                    </div>
                    {item.type === "live" && (
                      <button className={ui.btnPrimary} style={{ backgroundColor: "var(--success)" }}>
                        انضم
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-4" style={{ color: "var(--text-light)" }}>
                  لا توجد مهام في هذا اليوم
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className={ui.card}>
            <h5 style={{ color: "var(--text)", marginBottom: 16, fontWeight: 700 }}>الإحصائيات</h5>
            <div className="d-flex flex-column gap-2">
              {[
                { label: "الدروس هذا الأسبوع", value: "8", color: "var(--primary)" },
                { label: "الجلسات المباشرة", value: "3", color: "var(--success)" },
                { label: "الاختبارات", value: "1", color: "var(--warning)" },
              ].map((s) => (
                <div key={s.label} className={ui.statRow}>
                  <span style={{ color: "var(--text-light)" }}>{s.label}</span>
                  <span style={{ color: s.color, fontWeight: 800, fontSize: "1.2rem" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={ui.card} style={{ marginTop: 16 }}>
            <h5 style={{ color: "var(--text)", marginBottom: 16, fontWeight: 700 }}>المهام القادمة</h5>
            <div className="d-flex flex-column gap-2">
              {[
                { day: "الخميس - 14:00", title: "اختبار أسبوعي", color: "var(--warning)" },
                { day: "الأربعاء - 09:00", title: "جلسة مراجعة", color: "var(--success)" },
              ].map((t) => (
                <div
                  key={t.title}
                  className="p-3"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    borderInlineStart: `4px solid ${t.color}`,
                  }}
                >
                  <small style={{ color: "var(--text-light)" }}>{t.day}</small>
                  <div style={{ color: "var(--text)", fontWeight: 600 }}>{t.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentSchedulePage;
