import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaChartLine,
  FaUsers,
  FaComments,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaDownload,
  FaCalendarAlt,
  FaFilter,
  FaEye,
  FaSmile,
  FaMeh,
  FaFrown,
  FaGlobe,
  FaMobileAlt,
  FaDesktop,
} from "react-icons/fa";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
}

interface ChartData {
  label: string;
  value: number;
}

const SupportAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("week");

  const stats: StatCard[] = [
    { title: "إجمالي المحادثات", value: 1247, change: "+12%", changeType: "positive", icon: <FaComments style={{ color: "#2196f3" }} /> },
    { title: "الطلاب المخدومين", value: 892, change: "+8%", changeType: "positive", icon: <FaUsers style={{ color: "var(--primary)" }} /> },
    { title: "متوسط وقت الاستجابة", value: "2.5 د", change: "-15%", changeType: "positive", icon: <FaClock style={{ color: "#ffc800" }} /> },
    { title: "نسبة الحل", value: "94%", change: "+3%", changeType: "positive", icon: <FaCheckCircle style={{ color: "var(--success)" }} /> },
  ];

  const satisfactionData = [
    { label: "راضٍ جداً", value: 45, icon: <FaSmile style={{ color: "var(--success)" }} /> },
    { label: "راضٍ", value: 32, icon: <FaMeh style={{ color: "#ffc800" }} /> },
    { label: "غير راضٍ", value: 15, icon: <FaFrown style={{ color: "var(--danger)" }} /> },
    { label: "محايد", value: 8, icon: <FaMeh style={{ color: "var(--text-light)" }} /> },
  ];

  const dailyData: ChartData[] = [
    { label: "الإثنين", value: 45 },
    { label: "الثلاثاء", value: 62 },
    { label: "الأربعاء", value: 58 },
    { label: "الخميس", value: 71 },
    { label: "الجمعة", value: 53 },
    { label: "السبت", value: 38 },
    { label: "الأحد", value: 42 },
  ];

  const topIssues = [
    { category: "مشاكل تقنية", count: 234, percentage: 28 },
    { category: "الدفع والفواتير", count: 187, percentage: 22 },
    { category: "الاشتراكات", count: 156, percentage: 18 },
    { category: "الشهادات", count: 134, percentage: 16 },
    { category: "محتوى الدورات", count: 98, percentage: 12 },
    { category: "أخرى", count: 46, percentage: 4 },
  ];

  const responseTimeData = [
    { label: "أقل من 5 د", value: 45 },
    { label: "5-15 د", value: 32 },
    { label: "15-30 د", value: 15 },
    { label: "أكثر من 30 د", value: 8 },
  ];

  return (
    <div className="p-4" style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 70px)" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold" style={{ color: "var(--text)" }}>إحصائيات الدعم</h4>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>تحليل أداء فريق الدعم</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select"
            style={{ width: "150px", borderRadius: "8px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          >
            <option value="day">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="year">هذا العام</option>
          </select>
          <button className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <FaDownload /> تصدير
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 col-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded"
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "44px", height: "44px", backgroundColor: "var(--surface-elevated)" }}>
                  {stat.icon}
                </div>
                <span
                  className="badge"
                  style={{
                    backgroundColor: stat.changeType === "positive" ? "rgba(88, 204, 2, 0.1)" : stat.changeType === "negative" ? "rgba(220, 53, 69, 0.1)" : "rgba(158, 158, 158, 0.1)",
                    color: stat.changeType === "positive" ? "var(--success)" : stat.changeType === "negative" ? "var(--danger)" : "var(--text-light)",
                    fontSize: "0.75rem",
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.8rem" }}>{stat.value}</div>
              <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{stat.title}</div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", height: "100%" }}>
            <h6 className="fw-bold mb-4" style={{ color: "var(--text)" }}>المحاولات اليومية</h6>
            <div className="d-flex align-items-end gap-2" style={{ height: "200px" }}>
              {dailyData.map((item, index) => (
                <div key={index} className="flex-grow-1 d-flex flex-column align-items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value * 2.5}px` }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded"
                    style={{ width: "100%", backgroundColor: "var(--primary)", minHeight: "20px" }}
                  />
                  <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", height: "100%" }}>
            <h6 className="fw-bold mb-4" style={{ color: "var(--text)" }}>رضا الطلاب</h6>
            <div className="d-flex flex-column gap-3">
              {satisfactionData.map((item, index) => (
                <div key={index} className="d-flex align-items-center gap-3">
                  {item.icon}
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>{item.label}</span>
                      <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{item.value}%</span>
                    </div>
                    <div style={{ height: "8px", backgroundColor: "var(--border)", borderRadius: "4px" }}>
                      <div style={{ height: "100%", width: `${item.value}%`, backgroundColor: "var(--primary)", borderRadius: "4px" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <h6 className="fw-bold mb-4" style={{ color: "var(--text)" }}>أكثر المشاكل شيوعاً</h6>
            <div className="d-flex flex-column gap-3">
              {topIssues.map((issue, index) => (
                <div key={index}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>{issue.category}</span>
                    <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{issue.count}</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "var(--border)", borderRadius: "3px" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${issue.percentage}%` }}
                      transition={{ delay: index * 0.1 }}
                      style={{ height: "100%", backgroundColor: "#2196f3", borderRadius: "3px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <h6 className="fw-bold mb-4" style={{ color: "var(--text)" }}>وقت الاستجابة</h6>
            <div className="d-flex flex-column gap-3">
              {responseTimeData.map((item, index) => (
                <div key={index} className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", backgroundColor: index === 0 ? "rgba(88, 204, 2, 0.1)" : index === 1 ? "rgba(33, 150, 243, 0.1)" : index === 2 ? "rgba(255, 193, 7, 0.1)" : "rgba(220, 53, 69, 0.1)", flexShrink: 0 }}>
                    <ClockIcon minutes={index} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>{item.label}</span>
                      <span style={{ color: "var(--primary)", fontWeight: "bold" }}>{item.value}%</span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "var(--border)", borderRadius: "3px" }}>
                      <div style={{ height: "100%", width: `${item.value}%`, backgroundColor: "var(--primary)", borderRadius: "3px" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <div className="p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "44px", height: "44px", backgroundColor: "rgba(33, 150, 243, 0.1)" }}>
                <FaGlobe style={{ color: "#2196f3" }} />
              </div>
              <div>
                <div className="fw-bold" style={{ color: "var(--text)" }}>المصدر</div>
                <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>أجهزة مختلفة</div>
              </div>
            </div>
            <div className="d-flex gap-4">
              <div className="text-center">
                <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.2rem" }}>45%</div>
                <div style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>جوال</div>
              </div>
              <div className="text-center">
                <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.2rem" }}>40%</div>
                <div style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>Desktop</div>
              </div>
              <div className="text-center">
                <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.2rem" }}>15%</div>
                <div style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>أخرى</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "44px", height: "44px", backgroundColor: "rgba(156, 39, 176, 0.1)" }}>
                <FaStar style={{ color: "#9c27b0" }} />
              </div>
              <div>
                <div className="fw-bold" style={{ color: "var(--text)" }}>التقييم</div>
                <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>متوسط التقييم</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold" style={{ color: "#ffc800", fontSize: "2rem" }}>4.5</span>
              <div className="d-flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} style={{ color: star <= 4 ? "#ffc800" : "var(--border)", fontSize: "1rem" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "44px", height: "44px", backgroundColor: "rgba(88, 204, 2, 0.1)" }}>
                <FaEye style={{ color: "var(--success)" }} />
              </div>
              <div>
                <div className="fw-bold" style={{ color: "var(--text)" }}>معدل الحل</div>
                <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>نسبة الحل من المحادثات</div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold" style={{ color: "var(--success)", fontSize: "2rem" }}>94%</span>
              <span style={{ color: "var(--success)", fontSize: "0.9rem" }}>(+3% من الشهر الماضي)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClockIcon = ({ minutes }: { minutes: number }) => {
  const colors = ["var(--success)", "#2196f3", "#ffc800", "var(--danger)"];
  return <FaClock style={{ color: colors[minutes], fontSize: "1rem" }} />;
};

export default SupportAnalyticsPage;