import { useState } from "react";
import { motion } from "framer-motion";
import { FaBell, FaVideo, FaBook, FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import ui from "../layouts/student-ui.module.css";

const notifications = [
  { id: 1, type: "session", title: "الجلسة تبدأ بعد 30 دقيقة", message: "تعلم الإنجليزية مع أحمد محمد", time: "منذ 30 دقيقة", read: false, icon: <FaVideo />, iconColor: "var(--success)" },
  { id: 2, type: "course", title: "تم إضافة درس جديد", message: "الوحدة الرابعة في دورة الرياضيات", time: "منذ ساعة", read: false, icon: <FaBook />, iconColor: "var(--primary)" },
  { id: 3, type: "success", title: "أنجزت هدفك اليوم!", message: "لقد أكملت درسين اليوم", time: "منذ 3 ساعات", read: true, icon: <FaCheckCircle />, iconColor: "var(--success)" },
  { id: 4, type: "warning", title: "موعد الاختبار قريب", message: "اختبار الرياضيات بعد يومين", time: "أمس", read: true, icon: <FaExclamationCircle />, iconColor: "var(--warning)" },
  { id: 5, type: "course", title: "تم منحك شهادة", message: "شهادة إتمام دورة التواصل", time: "منذ يومين", read: true, icon: <FaBook />, iconColor: "var(--secondary)" },
];

const StudentNotificationsPage = () => {
  const [notifs, setNotifs] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className={ui.pageTitle} style={{ marginBottom: 4 }}>الإشعارات</h2>
          <p style={{ color: "var(--text-light)", margin: 0 }}>اطلع على أحدث الإشعارات</p>
        </div>
        <span
          className={ui.chip}
          style={{ backgroundColor: "var(--danger)", color: "#fff", padding: "6px 14px", fontSize: "0.85rem" }}
        >
          {unreadCount} غير مقروء
        </span>
      </div>

      <div className="d-flex flex-column gap-3">
        {notifs.length > 0 ? (
          notifs.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 d-flex align-items-start gap-3"
              style={{
                backgroundColor: notif.read ? "var(--surface)" : "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: 14,
              }}
            >
              <div
                className={ui.iconCircleSm}
                style={{ backgroundColor: notif.iconColor, color: "#fff" }}
              >
                {notif.icon}
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <h6 style={{ color: "var(--text)", marginBottom: 4 }}>{notif.title}</h6>
                  <small style={{ color: "var(--text-light)" }}>{notif.time}</small>
                </div>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: 8 }}>{notif.message}</p>

                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="btn p-0"
                    style={{ color: "var(--primary)", fontSize: "0.85rem", fontWeight: 600 }}
                  >
                    تحديد كمقروء
                  </button>
                )}
              </div>

              <button
                onClick={() => deleteNotification(notif.id)}
                className="btn d-flex align-items-center justify-content-center"
                style={{ color: "var(--text-light)", width: 36, height: 36 }}
                aria-label="حذف"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
            <FaBell style={{ fontSize: "3rem", opacity: 0.5, marginBottom: 16 }} />
            <p>لا توجد إشعارات</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentNotificationsPage;
