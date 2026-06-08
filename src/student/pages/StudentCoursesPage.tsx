// src/student/pages/StudentCoursesPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlay,
  FaClock,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaBookmark,
  FaBook,
  FaArrowLeft,
  FaThLarge,
  FaUserGraduate,
  FaLightbulb,
} from "react-icons/fa";
import PageHero from "../layouts/PageHero";
import ui from "../layouts/student-ui.module.css";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  duration: string;
  lessons: number;
  thumbnail: string;
  level: string;
  price: number;
  paid: boolean;
  enrolled: boolean;
}

const courses: Course[] = [
  {
    id: "1",
    title: "تعلم اللغة الإنجليزية للمبتدئين",
    instructor: "أحمد محمد",
    category: "اللغات",
    progress: 65,
    duration: "20 ساعة",
    lessons: 15,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    level: "مبتدئ",
    price: 149,
    paid: true,
    enrolled: true,
  },
  {
    id: "2",
    title: "الرياضيات الأساسية للمرحلة الابتدائية",
    instructor: "سارة علي",
    category: "الرياضيات",
    progress: 40,
    duration: "15 ساعة",
    lessons: 12,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
    level: "مبتدئ",
    price: 99,
    paid: true,
    enrolled: true,
  },
  {
    id: "3",
    title: "مهارات التواصل والتعبير",
    instructor: "منى حسن",
    category: "المهارات",
    progress: 85,
    duration: "10 ساعات",
    lessons: 8,
    thumbnail: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=200&fit=crop",
    level: "متوسط",
    price: 199,
    paid: false,
    enrolled: true,
  },
  {
    id: "4",
    title: "العلوم الطبيعية والحياة",
    instructor: "خالد عمر",
    category: "العلوم",
    progress: 20,
    duration: "25 ساعة",
    lessons: 20,
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop",
    level: "متوسط",
    price: 129,
    paid: false,
    enrolled: true,
  },
  {
    id: "5",
    title: "فنون الرسم والتلوين",
    instructor: "ليلى محمد",
    category: "الفنون",
    progress: 0,
    duration: "12 ساعة",
    lessons: 10,
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=200&fit=crop",
    level: "مبتدئ",
    price: 79,
    paid: true,
    enrolled: false,
  },
];

const tabs = [
  { id: "all", label: "الكل", icon: <FaThLarge /> },
  { id: "my", label: "دوراتي", icon: <FaUserGraduate /> },
  { id: "suggest", label: "مقترحة لك", icon: <FaLightbulb /> },
];

interface StudentCoursesPageProps {
  onNavigate?: (path: string) => void;
}

const StudentCoursesPage = ({ onNavigate }: StudentCoursesPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "my" | "suggest">("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "my" && course.enrolled) ||
      (activeTab === "suggest" && !course.enrolled);
    return matchesSearch && matchesTab;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHero
        icon={<FaBook />}
        title="دوراتي"
        subtitle="تابع دوراتك التعليمية، أكمل دروسك وحقق أقصى استفادة من رحلة التعلم."
        accent="green"
        action={
          <button className={ui.btnPrimary}>
            <FaArrowLeft /> استكشف دورات جديدة
          </button>
        }
      />

      <div className="d-flex gap-3 mb-4 flex-wrap align-items-center">
        <div className={ui.searchWrap}>
          <FaSearch className={ui.searchIcon} />
          <input
            type="text"
            placeholder="ابحث عن دوراتك..."
            className={ui.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={ui.tabsBar} role="tablist" aria-label="تصنيف الدورات">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          const count = courses.filter((c) => {
            if (tab.id === "all") return true;
            if (tab.id === "my") return c.enrolled;
            return !c.enrolled;
          }).length;
          return (
            <motion.button
              key={tab.id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(tab.id as "all" | "my" | "suggest")}
              whileTap={{ scale: 0.97 }}
              className={`${ui.tab} ${active ? ui.tabActive : ""}`}
            >
              <span className={ui.tabIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={ui.tabCount}>{count}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="row g-4">
        {filteredCourses.length === 0 && (
          <div className="col-12">
            <div
              className="text-center p-5"
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: 18,
                border: "1px solid var(--border)",
                color: "var(--text-light)",
              }}
            >
              <FaBook style={{ fontSize: "2.5rem", marginBottom: 12, opacity: 0.5 }} />
              <p className="mb-0">لا توجد دورات مطابقة للبحث الحالي</p>
            </div>
          </div>
        )}
        {filteredCourses.map((course, index) => (
          <div key={course.id} className="col-md-6 col-lg-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="h-100"
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--border)",
                transition: "border-color 0.15s ease",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-100"
                  style={{ height: 180, objectFit: "cover", display: "block" }}
                />
                <span
                  className={`${ui.chip} ${course.paid ? ui.chipSuccess : ui.chipDanger}`}
                  style={{
                    position: "absolute",
                    top: 12,
                    insetInlineStart: 12,
                  }}
                >
                  {course.paid ? <FaCheckCircle /> : <FaTimesCircle />}
                  {course.paid ? "مفعلة" : "غير مفعلة"}
                </span>
              </div>

              <div className="p-4" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="d-flex flex-wrap gap-2">
                  <span className={ui.chip} style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
                    {course.category}
                  </span>
                  <span className={ui.chip} style={{ backgroundColor: "var(--secondary)", color: "#fff" }}>
                    {course.level}
                  </span>
                </div>

                <h3
                  style={{
                    color: "var(--text)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {course.title}
                </h3>

                <div
                  className="d-flex align-items-center flex-wrap gap-3"
                  style={{ color: "var(--text-light)", fontSize: "0.82rem" }}
                >
                  <span className="d-inline-flex align-items-center gap-1">
                    <FaUser style={{ fontSize: "0.85rem" }} />
                    {course.instructor}
                  </span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <FaClock style={{ fontSize: "0.85rem" }} />
                    {course.duration}
                  </span>
                  <span className="d-inline-flex align-items-center gap-1">
                    <FaBookmark style={{ fontSize: "0.85rem" }} />
                    {course.lessons} دروس
                  </span>
                </div>

                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ color: "var(--text)", fontWeight: 600, fontSize: "0.82rem" }}>
                      تقدمك
                    </span>
                    <span style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.82rem" }}>
                      {course.progress}%
                    </span>
                  </div>
                  <div className={ui.progressTrack}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className={ui.progressFill}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                  <div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.75rem", fontWeight: 600 }}>
                      السعر
                    </div>
                    <div
                      style={{
                        color: "var(--text)",
                        fontWeight: 800,
                        fontSize: "1.25rem",
                      }}
                    >
                      {course.price}
                      <span style={{ color: "var(--text-light)", fontWeight: 500, fontSize: "0.8rem", marginInlineStart: 4 }}>
                        ريال
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate(`/student/view-course/${course.id}`);
                      else window.location.href = `/course/${course.id}`;
                    }}
                    className={ui.btnPrimary}
                    style={{ backgroundColor: course.paid ? "var(--primary)" : "var(--secondary)" }}
                  >
                    <FaPlay size={10} />
                    {course.paid ? "ابدأ التعلم" : "اشتر الآن"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentCoursesPage;
