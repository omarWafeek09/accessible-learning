import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaCheck,
  FaTimes,
  FaStar,
  FaUsers,
  FaCalendarAlt,
  FaPercentage,
  FaHandHoldingUsd,
  FaArrowUp,
  FaCreditCard,
  FaHistory,
  FaInfoCircle,
} from "react-icons/fa";
import ui from "../layouts/student-ui.module.css";

interface Plan {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  hasCertificate: boolean;
  hasPrioritySupport: boolean;
  hasWeeklySession: boolean;
  hasParentDashboard: boolean;
  hasMonthlyReport: boolean;
  hasDirectSupport: boolean;
  color: string;
}

const plans: Plan[] = [
  {
    id: "1",
    name: "الأساسي",
    nameEn: "Basic",
    price: 0,
    period: "مجاني",
    description: "ابدأ رحلتك التعليمية مجاناً مع الوصول الأساسي",
    features: [
      "وصول إلى 10 دروس أساسية",
      "3 ألعاب تعليمية",
      "تتبع التقدم الأساسي",
      "دعم المجتمع",
    ],
    highlighted: false,
    hasCertificate: false,
    hasPrioritySupport: false,
    hasWeeklySession: false,
    hasParentDashboard: false,
    hasMonthlyReport: false,
    hasDirectSupport: false,
    color: "#64748b",
  },
  {
    id: "2",
    name: "الذهبي",
    nameEn: "Gold",
    price: 49,
    period: "ريال/شهر",
    description: "تجربة تعليمية متكاملة مع جميع المميزات",
    features: [
      "وصول غير محدود للدورات",
      "جميع الألعاب التعليمية",
      "تتبع التقدم المتقدم",
      "شهادات إتمام",
      "دعم أولوية",
      "جلسات أسبوعية مع متخصص",
    ],
    highlighted: true,
    hasCertificate: true,
    hasPrioritySupport: true,
    hasWeeklySession: true,
    hasParentDashboard: false,
    hasMonthlyReport: false,
    hasDirectSupport: false,
    color: "#f59e0b",
  },
  {
    id: "3",
    name: "العائلي",
    nameEn: "Family",
    price: 89,
    period: "ريال/شهر",
    description: "لأسر متعددة الأطفال مع لوحة تحكم للأهل",
    features: [
      "كل مميزات الخطة الذهبية",
      "5 حسابات أطفال",
      "لوحة تحكم للأهل",
      "تقارير تقدم شهرية",
      "استشارات عائلية مجانية",
      "دعم مباشر على مدار الساعة",
    ],
    highlighted: false,
    hasCertificate: true,
    hasPrioritySupport: true,
    hasWeeklySession: true,
    hasParentDashboard: true,
    hasMonthlyReport: true,
    hasDirectSupport: true,
    color: "#8b5cf6",
  },
];

const featureConfig: Record<string, { icon: JSX.Element; label: string }> = {
  hasCertificate: { icon: <FaCheck />, label: "شهادات إتمام" },
  hasPrioritySupport: { icon: <FaStar />, label: "دعم أولوية" },
  hasWeeklySession: { icon: <FaCalendarAlt />, label: "جلسات أسبوعية" },
  hasParentDashboard: { icon: <FaUsers />, label: "لوحة تحكم للأهل" },
  hasMonthlyReport: { icon: <FaPercentage />, label: "تقارير شهرية" },
  hasDirectSupport: { icon: <FaHandHoldingUsd />, label: "دعم مباشر 24/7" },
};

const currentSubscription = {
  planId: "2",
  startDate: "2024-01-15",
  nextBilling: "2024-02-15",
  status: "active" as const,
};

const paymentHistory = [
  { id: 1, date: "2024-01-15", amount: 49, plan: "الذهبي", status: "paid" },
  { id: 2, date: "2023-12-15", amount: 49, plan: "الذهبي", status: "paid" },
  { id: 3, date: "2023-11-15", amount: 49, plan: "الذهبي", status: "paid" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const PlanCard = ({
  plan,
  isCurrent,
  onUpgrade,
}: {
  plan: Plan;
  isCurrent: boolean;
  onUpgrade: () => void;
}) => (
  <motion.div
    variants={item}
    className={ui.card}
    style={{
      height: "100%",
      border: plan.highlighted ? "2px solid var(--primary)" : "1px solid var(--border)",
      position: "relative",
    }}
  >
    {plan.highlighted && (
      <span
        className={ui.chip}
        style={{
          position: "absolute",
          top: 12,
          insetInlineStart: 12,
          backgroundColor: "var(--primary)",
          color: "#fff",
          padding: "4px 12px",
          fontSize: "0.75rem",
        }}
      >
        الأكثر شعبية
      </span>
    )}

    <div
      className="rounded-3 d-flex align-items-center justify-content-center mb-3"
      style={{
        width: 56,
        height: 56,
        backgroundColor: "var(--background)",
      }}
    >
      <FaCrown style={{ color: plan.color, fontSize: "1.4rem" }} />
    </div>

    <h4 className="fw-bold mb-2" style={{ color: "var(--text)" }}>{plan.name}</h4>
    <p className="mb-3" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
      {plan.description}
    </p>

    <div className="mb-3">
      {plan.price === 0 ? (
        <span className="fw-bold" style={{ color: plan.color, fontSize: "2rem" }}>مجاني</span>
      ) : (
        <>
          <span className="fw-bold" style={{ color: plan.color, fontSize: "2rem" }}>{plan.price}</span>
          <span style={{ color: "var(--text-light)" }}> /{plan.period}</span>
        </>
      )}
    </div>

    <div className="mb-3">
      {plan.features.map((feature, idx) => (
        <div key={idx} className="d-flex align-items-center gap-2 mb-2" style={{ color: "var(--text)" }}>
          <FaCheck style={{ color: "var(--success)", fontSize: "0.85rem" }} />
          <span style={{ fontSize: "0.9rem" }}>{feature}</span>
        </div>
      ))}
    </div>

    {isCurrent ? (
      <button
        className="btn w-100 py-2"
        disabled
        style={{
          backgroundColor: "var(--background)",
          color: "var(--primary)",
          border: "1px solid var(--primary)",
          borderRadius: 12,
          fontWeight: 700,
        }}
      >
        خطتك الحالية
      </button>
    ) : plan.price > 0 ? (
      <button
        onClick={onUpgrade}
        className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2"
        style={{
          backgroundColor: plan.color,
          color: "#fff",
          border: "none",
          borderRadius: 12,
          fontWeight: 700,
        }}
      >
        <FaArrowUp style={{ fontSize: "0.9rem" }} />
        الاشتراك الآن
      </button>
    ) : (
      <button
        className="btn w-100 py-2"
        disabled
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-light)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          fontWeight: 700,
        }}
      >
        مجاني
      </button>
    )}
  </motion.div>
);

const StudentPlansPage = () => {
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const currentPlan = plans.find((p) => p.id === currentSubscription.planId);

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="mb-4">
        <h2 className={ui.pageTitle}>اشتراكي</h2>
        <p className={ui.pageSub} style={{ marginBottom: 0 }}>إدارة خطتك الاشتراكية ومميزاتك الحالية</p>
      </div>

      <motion.div variants={item} className="row g-3 mb-4">
        {[
          { icon: <FaCrown size={20} />, label: "خطتك الحالية", value: currentPlan?.name || "", color: currentPlan?.color || "var(--primary)", bg: "var(--background)" },
          { icon: <FaCalendarAlt size={20} />, label: "تاريخ البدء", value: currentSubscription.startDate, color: "var(--primary)", bg: "var(--background)" },
          { icon: <FaCreditCard size={20} />, label: "التجديد القادم", value: currentSubscription.nextBilling, color: "#f59e0b", bg: "var(--background)" },
        ].map((s) => (
          <div className="col-md-4" key={s.label}>
            <div className={ui.card}>
              <div className="d-flex align-items-center gap-3">
                <div
                  className={ui.iconCircle}
                  style={{ backgroundColor: s.bg, color: s.color }}
                >
                  {s.icon}
                </div>
                <div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{s.label}</div>
                  <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.2rem" }}>{s.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {currentPlan && (
        <motion.div variants={item} className="mb-4">
          <div className={ui.card}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className={ui.iconCircle}
                  style={{ backgroundColor: "var(--background)", color: currentPlan.color }}
                >
                  <FaCrown size={20} />
                </div>
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "var(--text)" }}>مميزات خطتك {currentPlan.name}</h5>
                  <small style={{ color: "var(--text-light)" }}>اكتشف كل ما تتضمنه خطتك</small>
                </div>
              </div>
              <span className={ui.chip} style={{ backgroundColor: "var(--success)", color: "#fff", padding: "6px 12px" }}>
                نشط
              </span>
            </div>

            <div className="row g-2">
              {Object.entries(featureConfig).map(([key, config]) => {
                const hasFeature = currentPlan[key as keyof Plan] === true;
                return (
                  <div key={key} className="col-md-4">
                    <div
                      className="p-3 d-flex align-items-center gap-2"
                      style={{
                        backgroundColor: hasFeature ? "var(--background)" : "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                      }}
                    >
                      <div
                        style={{
                          color: hasFeature ? "var(--success)" : "var(--text-light)",
                          fontSize: "1.1rem",
                        }}
                      >
                        {hasFeature ? <FaCheck /> : <FaTimes />}
                      </div>
                      <span
                        style={{
                          color: hasFeature ? "var(--text)" : "var(--text-light)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div variants={item} className="mb-4">
        <h4 className="fw-bold mb-3" style={{ color: "var(--text)" }}>جميع الخطط المتاحة</h4>
        <div className="row g-3">
          {plans.map((plan) => (
            <div key={plan.id} className="col-md-4">
              <PlanCard
                plan={plan}
                isCurrent={plan.id === currentSubscription.planId}
                onUpgrade={() => setShowDetails(plan.id)}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="d-flex align-items-center gap-2 mb-3" style={{ color: "var(--text)" }}>
          <FaHistory style={{ color: "var(--primary)" }} />
          <h4 className="mb-0 fw-bold" style={{ color: "var(--text)" }}>سجل المدفوعات</h4>
        </div>
        <div
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border)" }}>
                  {["التاريخ", "الخطة", "المبلغ", "الحالة"].map((h) => (
                    <th key={h} style={{ color: "var(--text)", fontWeight: 600, padding: 16 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: 16, color: "var(--text)" }}>{payment.date}</td>
                    <td style={{ padding: 16, color: "var(--text)" }}>{payment.plan}</td>
                    <td style={{ padding: 16, color: "var(--text)", fontWeight: 600 }}>{payment.amount} ريال</td>
                    <td style={{ padding: 16 }}>
                      <span className={ui.chip} style={{ backgroundColor: "var(--success)", color: "#fff", padding: "4px 10px" }}>
                        مدفوع
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-4 p-3 d-flex align-items-start gap-3"
        style={{
          backgroundColor: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: 16,
        }}
      >
        <FaInfoCircle style={{ color: "var(--primary)", fontSize: "1.4rem", flexShrink: 0 }} />
        <div>
          <h6 className="mb-2" style={{ color: "var(--text)" }}>هل تحتاج مساعدة؟</h6>
          <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
            تواصل مع فريق الدعم للحصول على مساعدة في تغيير خطتك أو إلغاء اشتراكك. يمكنك أيضاً إدارة معلومات الدفع الخاصة بك.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentPlansPage;
