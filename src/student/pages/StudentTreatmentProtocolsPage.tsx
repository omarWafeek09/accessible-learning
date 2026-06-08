import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaClock,
  FaFileMedical,
  FaUserInjured,
  FaGraduationCap,
  FaComments,
  FaEye,
  FaCheck,
  FaCalendarAlt,
  FaChartLine,
  FaHeart,
  FaTimes,
  FaFileAlt,
  FaThLarge,
} from "react-icons/fa";
import ui from "../layouts/student-ui.module.css";

interface TreatmentProtocol {
  id: string;
  name: string;
  description: string;
  targetDisability: string;
  category: string;
  duration: string;
  sessions: number;
  completedSessions: number;
  ageGroup: string;
  status: "active" | "pending";
  progress: number;
  steps: {
    id: string;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
  }[];
  nextSession?: string;
  assignedBy: string;
}

const assignedProtocols: TreatmentProtocol[] = [
  {
    id: "1",
    name: "بروتوكول تحسين النطق",
    description: "برنامج متكامل لتحسين مهارات النطق والكلام لدى الأطفال",
    targetDisability: "التوحد",
    category: "النطق والكلام",
    duration: "3 أشهر",
    sessions: 24,
    completedSessions: 8,
    ageGroup: "3-8 سنوات",
    status: "active",
    progress: 33,
    steps: [
      { id: "s1", title: "تقييم أولي", description: "تقييم مستوى النطق الحالي", duration: "60 دقيقة", completed: true },
      { id: "s2", title: "تمارين التنفس", description: "تمارين لتنظيم التنفس أثناء الكلام", duration: "20 دقيقة", completed: true },
      { id: "s3", title: "تمارين المفاصل", description: "تمارين لتحريك عضلات الفم", duration: "15 دقيقة", completed: false },
      { id: "s4", title: "تمارين الأصوات", description: "تدريب على نطق الحروف", duration: "30 دقيقة", completed: false },
    ],
    nextSession: "غداً - 10:00 صباحاً",
    assignedBy: "د. أحمد محمد",
  },
  {
    id: "2",
    name: "بروتوكول العلاج الحسي",
    description: "برنامج لتنمية المعالجة الحسية لدى الأطفال",
    targetDisability: "اضطراب المعالجة الحسية",
    category: "الحواس",
    duration: "4 أشهر",
    sessions: 32,
    completedSessions: 12,
    ageGroup: "2-7 سنوات",
    status: "active",
    progress: 37,
    steps: [
      { id: "s1", title: "تقييم حسي", description: "تقييم الحساسية الحسية", duration: "90 دقيقة", completed: true },
      { id: "s2", title: "تمارين اللمس", description: "تمارين للتعامل مع الملمس", duration: "30 دقيقة", completed: true },
      { id: "s3", title: "تمارين التوازن", description: "تمارين تحسين التوازن", duration: "25 دقيقة", completed: false },
      { id: "s4", title: "تمارين بصرية", description: "تمارين لتنمية النظر", duration: "20 دقيقة", completed: false },
    ],
    nextSession: "بعد الغد - 4:00 مساءً",
    assignedBy: "د. سارة علي",
  },
  {
    id: "3",
    name: "بروتوكول صعوبات التعلم",
    description: "برنامج تحسين المهارات الأكاديمية",
    targetDisability: "صعوبات التعلم",
    category: "التعليم",
    duration: "8 أشهر",
    sessions: 64,
    completedSessions: 4,
    ageGroup: "6-14 سنة",
    status: "pending",
    progress: 6,
    steps: [
      { id: "s1", title: "تقييم أكاديمي", description: "تحديد نقاط الضعف", duration: "90 دقيقة", completed: true },
      { id: "s2", title: "تدريب القراءة", description: "تحسين مهارات القراءة", duration: "40 دقيقة", completed: false },
      { id: "s3", title: "تدريب الكتابة", description: "تنمية مهارات الكتابة", duration: "40 دقيقة", completed: false },
      { id: "s4", title: "تدريب الرياضيات", description: "فهم المفاهيم الرياضية", duration: "45 دقيقة", completed: false },
    ],
    nextSession: "الأسبوع القادم",
    assignedBy: "د. منى حسن",
  },
];

const categoryConfig: Record<string, { icon: JSX.Element; color: string }> = {
  "النطق والكلام": { icon: <FaComments />, color: "#8b5cf6" },
  "السلوك": { icon: <FaBrain />, color: "#ec4899" },
  "الحواس": { icon: <FaEye />, color: "#06b6d4" },
  "التعليم": { icon: <FaGraduationCap />, color: "#22c55e" },
  "الشامل": { icon: <FaHeart />, color: "#ef4444" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const ProtocolCard = ({
  protocol,
  onView,
}: {
  protocol: TreatmentProtocol;
  onView: () => void;
}) => {
  const category = categoryConfig[protocol.category] || categoryConfig["الشامل"];
  const isActive = protocol.status === "active";

  return (
    <motion.div
      variants={item}
      className={ui.card}
      style={{ height: "100%", overflow: "hidden", padding: 0 }}
    >
      <div
        style={{
          height: 4,
          backgroundColor: isActive ? category.color : "var(--warning)",
        }}
      />

      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center"
            style={{ width: 48, height: 48, backgroundColor: "var(--background)" }}
          >
            <span style={{ color: category.color, fontSize: "1.3rem" }}>{category.icon}</span>
          </div>
          <span
            className={ui.chip}
            style={{
              backgroundColor: isActive ? "var(--success)" : "var(--warning)",
              color: isActive ? "#fff" : "var(--text)",
              padding: "4px 10px",
            }}
          >
            {isActive ? "نشط" : "قيد المراجعة"}
          </span>
        </div>

        <h5 className="fw-bold mb-2" style={{ color: "var(--text)" }}>{protocol.name}</h5>
        <p className="mb-3" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
          {protocol.description}
        </p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <span
            className={ui.chip}
            style={{ backgroundColor: "var(--primary)", color: "#fff", padding: "4px 10px" }}
          >
            <FaUserInjured style={{ fontSize: "0.7rem" }} /> {protocol.targetDisability}
          </span>
          <span
            className={ui.chip}
            style={{ backgroundColor: "var(--secondary)", color: "#fff", padding: "4px 10px" }}
          >
            <FaCalendarAlt style={{ fontSize: "0.7rem" }} /> {protocol.ageGroup}
          </span>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>التقدم</span>
            <span className="fw-bold" style={{ color: category.color, fontSize: "0.85rem" }}>
              {protocol.progress}%
            </span>
          </div>
          <div className={ui.progressTrack}>
            <div
              style={{
                width: `${protocol.progress}%`,
                height: "100%",
                backgroundColor: category.color,
                borderRadius: 999,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        <div
          className="p-3 mb-3"
          style={{ backgroundColor: "var(--background)", borderRadius: 12, border: "1px solid var(--border)" }}
        >
          <div className="d-flex justify-content-between mb-2">
            <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>الجلسات المكتملة</span>
            <span className="fw-bold" style={{ color: "var(--text)" }}>{protocol.completedSessions}/{protocol.sessions}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>الجلسة القادمة</span>
            <span className="fw-bold" style={{ color: "var(--primary)", fontSize: "0.85rem" }}>{protocol.nextSession}</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 mb-3" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
          <FaBrain style={{ fontSize: "0.8rem", color: category.color }} />
          <span>الأخصائي: {protocol.assignedBy}</span>
        </div>

        <button
          onClick={onView}
          className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2"
          style={{
            backgroundColor: category.color,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            fontWeight: 700,
          }}
        >
          <FaEye style={{ fontSize: "0.9rem" }} />
          عرض التفاصيل
        </button>
      </div>
    </motion.div>
  );
};

const StudentTreatmentProtocolsPage = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<TreatmentProtocol | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const categories = [
    { id: "all", label: "الكل", icon: <FaThLarge />, color: "var(--text-light)" },
    { id: "النطق والكلام", label: "النطق والكلام", icon: <FaComments />, color: "#8b5cf6" },
    { id: "الحواس", label: "الحواس", icon: <FaEye />, color: "#06b6d4" },
    { id: "التعليم", label: "التعليم", icon: <FaGraduationCap />, color: "#22c55e" },
    { id: "الشامل", label: "الشامل", icon: <FaHeart />, color: "#ef4444" },
  ];

  const filteredProtocols = assignedProtocols.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const activeCount = assignedProtocols.filter((p) => p.status === "active").length;
  const totalProgress =
    assignedProtocols.reduce((sum, p) => sum + p.progress, 0) / assignedProtocols.length;
  const totalSessions = assignedProtocols.reduce((sum, p) => sum + p.completedSessions, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="mb-4">
        <h2 className={ui.pageTitle}>بروتوكولات العلاج</h2>
        <p className={ui.pageSub} style={{ marginBottom: 0 }}>بروتوكولاتك العلاجية ومتابعة تقدمك</p>
      </div>

      <motion.div variants={item} className="row g-3 mb-4">
        {[
          { icon: <FaFileMedical size={20} />, label: "البروتوكولات النشطة", value: activeCount, color: "var(--primary)" },
          { icon: <FaChartLine size={20} />, label: "متوسط التقدم", value: `${Math.round(totalProgress)}%`, color: "#8b5cf6" },
          { icon: <FaClock size={20} />, label: "الجلسات المكتملة", value: totalSessions, color: "var(--warning)" },
        ].map((s) => (
          <div className="col-md-4" key={s.label}>
            <div className={ui.card}>
              <div className="d-flex align-items-center gap-3">
                <div className={ui.iconCircle} style={{ backgroundColor: "var(--background)", color: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{s.label}</div>
                  <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.4rem" }}>{s.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="mb-3">
        <div className={ui.tabsBar} role="tablist" aria-label="تصنيف البروتوكولات">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            const count = cat.id === "all"
              ? assignedProtocols.length
              : assignedProtocols.filter((p) => p.category === cat.id).length;
            return (
              <motion.button
                key={cat.id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.97 }}
                className={`${ui.tab} ${active ? ui.tabActive : ""}`}
              >
                <span className={ui.tabIcon}>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={ui.tabCount}>{count}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-3">
        <select
          className="form-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            borderRadius: 12,
            backgroundColor: "var(--background)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            maxWidth: 250,
            padding: "0.55rem 0.9rem",
          }}
        >
          <option value="all">كل الحالات</option>
          <option value="active">نشط</option>
          <option value="pending">قيد المراجعة</option>
        </select>
      </motion.div>

      <motion.div variants={item} className="row g-3">
        {filteredProtocols.map((protocol) => (
          <div key={protocol.id} className="col-md-4">
            <ProtocolCard
              protocol={protocol}
              onView={() => setSelectedProtocol(protocol)}
            />
          </div>
        ))}
      </motion.div>

      {filteredProtocols.length === 0 && (
        <motion.div
          variants={item}
          className="text-center p-5"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
          }}
        >
          <FaFileAlt style={{ fontSize: "3rem", color: "var(--text-light)", marginBottom: 16 }} />
          <h5 style={{ color: "var(--text)" }}>لا توجد بروتوكولات</h5>
          <p style={{ color: "var(--text-light)" }}>لم يتم تعيين أي بروتوكولات علاجية لك حالياً</p>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProtocol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 9999,
            }}
            onClick={() => setSelectedProtocol(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="p-4"
              style={{
                borderRadius: 18,
                backgroundColor: "var(--surface)",
                width: "100%",
                maxWidth: 700,
                maxHeight: "90vh",
                overflowY: "auto",
                border: "1px solid var(--border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold" style={{ color: "var(--text)" }}>{selectedProtocol.name}</h3>
                <button
                  onClick={() => setSelectedProtocol(null)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <FaTimes style={{ color: "var(--text-light)" }} />
                </button>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-3">
                <span
                  className={ui.chip}
                  style={{
                    backgroundColor: selectedProtocol.status === "active" ? "var(--success)" : "var(--warning)",
                    color: selectedProtocol.status === "active" ? "#fff" : "var(--text)",
                    padding: "6px 12px",
                  }}
                >
                  <FaCheck style={{ fontSize: "0.7rem" }} />
                  {selectedProtocol.status === "active" ? "نشط" : "قيد المراجعة"}
                </span>
                <span
                  className={ui.chip}
                  style={{ backgroundColor: "var(--primary)", color: "#fff", padding: "6px 12px" }}
                >
                  <FaUserInjured style={{ fontSize: "0.7rem" }} /> {selectedProtocol.targetDisability}
                </span>
                <span
                  className={ui.chip}
                  style={{ backgroundColor: "var(--secondary)", color: "#fff", padding: "6px 12px" }}
                >
                  <FaGraduationCap style={{ fontSize: "0.7rem" }} /> {selectedProtocol.category}
                </span>
              </div>

              <p className="mb-3" style={{ color: "var(--text-light)" }}>{selectedProtocol.description}</p>

              <div className="row g-2 mb-3">
                {[
                  { icon: <FaClock />, label: "المدة", value: selectedProtocol.duration, color: categoryConfig[selectedProtocol.category]?.color || "var(--primary)" },
                  { icon: <FaFileMedical />, label: "الجلسات", value: `${selectedProtocol.completedSessions}/${selectedProtocol.sessions}`, color: "var(--secondary)" },
                  { icon: <FaBrain />, label: "الفئة العمرية", value: selectedProtocol.ageGroup, color: "#8b5cf6" },
                  { icon: <FaChartLine />, label: "التقدم", value: `${selectedProtocol.progress}%`, color: "var(--warning)" },
                ].map((s) => (
                  <div className="col-md-3" key={s.label}>
                    <div className="p-3 text-center" style={{ backgroundColor: "var(--background)", borderRadius: 12, border: "1px solid var(--border)" }}>
                      <div className="mb-2" style={{ color: s.color, fontSize: "1.2rem" }}>{s.icon}</div>
                      <div style={{ color: "var(--text)", fontWeight: 700 }}>{s.value}</div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedProtocol.nextSession && (
                <div
                  className="p-3 mb-3 d-flex align-items-center gap-3"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--primary)",
                    borderRadius: 12,
                  }}
                >
                  <FaCalendarAlt style={{ color: "var(--primary)" }} />
                  <div>
                    <div style={{ color: "var(--text)", fontWeight: 700 }}>الجلسة القادمة</div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{selectedProtocol.nextSession}</div>
                  </div>
                </div>
              )}

              {selectedProtocol.steps.length > 0 && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: "var(--text)" }}>خطوات البروتوكول</h5>
                  {selectedProtocol.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="mb-2 p-3"
                      style={{
                        backgroundColor: "var(--background)",
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        borderInlineStart: step.completed
                          ? "4px solid var(--success)"
                          : `4px solid ${categoryConfig[selectedProtocol.category]?.color || "var(--primary)"}`,
                        opacity: step.completed ? 0.75 : 1,
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: 24,
                              height: 24,
                              backgroundColor: step.completed ? "var(--success)" : "var(--border)",
                              color: step.completed ? "#fff" : "var(--text-light)",
                              fontSize: "0.75rem",
                            }}
                          >
                            {step.completed ? <FaCheck /> : index + 1}
                          </span>
                          <span className="fw-bold" style={{ color: "var(--text)" }}>{step.title}</span>
                        </div>
                        <span
                          className={ui.chip}
                          style={{ backgroundColor: "var(--primary)", color: "#fff", padding: "4px 10px" }}
                        >
                          {step.duration}
                        </span>
                      </div>
                      <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{step.description}</p>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="mt-3 p-3 d-flex align-items-center gap-3"
                style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", borderRadius: 12 }}
              >
                <div
                  className={ui.iconCircleSm}
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <FaBrain />
                </div>
                <div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>الأخصائي المسؤول</div>
                  <div style={{ color: "var(--text)", fontWeight: 600 }}>{selectedProtocol.assignedBy}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentTreatmentProtocolsPage;
