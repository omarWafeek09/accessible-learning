// src/student/pages/StudentCommunityPage.tsx
import { motion } from "framer-motion";
import { FaUserPlus, FaComment, FaThumbsUp, FaShareAlt, FaHeart } from "react-icons/fa";
import ui from "../layouts/student-ui.module.css";

const posts = [
  {
    id: 1,
    author: "أحمد",
    avatar: "أ",
    content: "ممتاز! الدرس الأخير في اللغة الإنجليزية كان مفيد جداً. شكراً أستاذ أحمد",
    time: "منذ ساعة",
    likes: 12,
    comments: 3,
    tag: "اللغة الإنجليزية",
  },
  {
    id: 2,
    author: "سارة",
    avatar: "س",
    content: "هل يوجد أحد يدرس مادة الرياضيات معي؟ أريد أن نكون مجموعة دراسة",
    time: "منذ 3 ساعات",
    likes: 8,
    comments: 5,
    tag: "الرياضيات",
  },
  {
    id: 3,
    author: "خالد",
    avatar: "خ",
    content: "شاركت في جلسة اليوم وأحبتها كثيراً. شكراً على المجهود",
    time: "أمس",
    likes: 20,
    comments: 2,
    tag: "الجلسات المباشرة",
  },
];

const StudentCommunityPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className={ui.pageTitle} style={{ marginBottom: 4 }}>المجتمع</h2>
          <p style={{ color: "var(--text-light)", margin: 0 }}>تواصل مع طلاب آخرين وشارك الخبرات</p>
        </div>
        <button className={ui.btnPrimary}>
          <FaUserPlus /> إضافة منشور
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={ui.card}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className={ui.iconCircle}
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    {post.avatar}
                  </div>
                  <div>
                    <h6 style={{ color: "var(--text)", marginBottom: 2, fontWeight: 700 }}>{post.author}</h6>
                    <small style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{post.time}</small>
                  </div>
                  <span
                    className={ui.chip}
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "#fff",
                      marginInlineStart: "auto",
                      padding: "4px 10px",
                    }}
                  >
                    {post.tag}
                  </span>
                </div>

                <p style={{ color: "var(--text)", marginBottom: "1.25rem", lineHeight: 1.6 }}>{post.content}</p>

                <div
                  className="d-flex gap-2 pt-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <button className="btn d-flex align-items-center gap-2" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    <FaThumbsUp /> {post.likes}
                  </button>
                  <button className="btn d-flex align-items-center gap-2" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    <FaComment /> {post.comments}
                  </button>
                  <button className="btn d-flex align-items-center gap-2" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    <FaShareAlt /> مشاركة
                  </button>
                  <div className="d-flex align-items-center gap-2 ms-auto" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                    <FaHeart style={{ color: "var(--danger)" }} /> مفضلة
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className={ui.card} style={{ marginBottom: 16 }}>
            <h5 style={{ color: "var(--text)", marginBottom: "1.25rem", fontWeight: 700 }}>الموضوعات الشائعة</h5>
            <div className="d-flex flex-column gap-2">
              {["اللغة الإنجليزية", "الرياضيات", "الجلسات المباشرة", "نصائح التعلم"].map((tag) => (
                <span
                  key={tag}
                  className={ui.chip}
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                    padding: "6px 12px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className={ui.card}>
            <h5 style={{ color: "var(--text)", marginBottom: "1.25rem", fontWeight: 700 }}>إحصائيات المجتمع</h5>
            <div className="d-flex flex-column gap-3">
              {[
                { label: "الطلاب النشطون", value: "250" },
                { label: "المنشورات", value: "1,200" },
                { label: "المواضيع", value: "85" },
              ].map((s) => (
                <div key={s.label} className={ui.statRow}>
                  <span style={{ color: "var(--text-light)" }}>{s.label}</span>
                  <span style={{ color: "var(--primary)", fontWeight: 800, fontSize: "1.2rem" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentCommunityPage;
