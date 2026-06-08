import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCog,
  FaBell,
  FaShieldAlt,
  FaUserShield,
  FaEnvelope,
  FaSms,
  FaLanguage,
  FaMoon,
  FaSun,
  FaDesktop,
  FaMobileAlt,
  FaPalette,
  FaFont,
  FaGlobe,
  FaClock,
  FaCalendarAlt,
  FaFlag,
  FaTag,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaSignOutAlt,
  FaTrashAlt,
  FaDownload,
  FaUpload,
  FaDatabase,
  FaServer,
  FaWifi,
  FaPlug,
  FaSave,
  FaUndo,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaQuestionCircle,
  FaRobot,
  FaHeadset,
  FaComments,
  FaTicketAlt,
  FaFileAlt,
  FaPaperclip,
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaPlus,
  FaMinus,
  FaTrash,
  FaEdit,
  FaCopy,
  FaShare,
  FaExternalLinkAlt,
  FaCheck,
  FaBan,
} from "react-icons/fa";

interface AutoResponse {
  id: number;
  trigger: string;
  response: string;
  enabled: boolean;
  priority: number;
}

interface CannedResponse {
  id: number;
  title: string;
  content: string;
  category: string;
  shortcut: string;
  usageCount: number;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  views: number;
}

interface SupportSettings {
  general: {
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: "12h" | "24h";
    weekStart: "sunday" | "monday";
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    soundEnabled: boolean;
    newMessageSound: boolean;
    newTicketSound: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "auto";
    fontSize: "small" | "medium" | "large";
    reducedMotion: boolean;
    highContrast: boolean;
  };
  chat: {
    autoAssign: boolean;
    showTypingIndicator: boolean;
    showReadReceipts: boolean;
    allowFileUpload: boolean;
    maxFileSize: number;
    autoResponseEnabled: boolean;
    workingHoursEnabled: boolean;
    workingHoursStart: string;
    workingHoursEnd: string;
    workingHoursDays: string[];
    maxConsecutiveMessages: number;
    chatTimeout: number;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    ipRestriction: boolean;
    allowedIPs: string[];
    loginAlerts: boolean;
    dataEncryption: boolean;
  };
  integrations: {
    emailForwarding: boolean;
    forwardEmail: string;
    webhookEnabled: boolean;
    webhookUrl: string;
    apiEnabled: boolean;
    apiKey: string;
  };
  data: {
    autoBackup: boolean;
    backupFrequency: "daily" | "weekly" | "monthly";
    dataRetention: number;
    exportFormat: "json" | "csv" | "pdf";
  };
}

const SupportSettingsPage = () => {
  const [settings, setSettings] = useState<SupportSettings>({
    general: {
      language: "ar",
      timezone: "Asia/Riyadh",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h",
      weekStart: "sunday",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      soundEnabled: true,
      newMessageSound: true,
      newTicketSound: true,
    },
    appearance: {
      theme: "dark",
      fontSize: "medium",
      reducedMotion: false,
      highContrast: false,
    },
    chat: {
      autoAssign: true,
      showTypingIndicator: true,
      showReadReceipts: true,
      allowFileUpload: true,
      maxFileSize: 10,
      autoResponseEnabled: true,
      workingHoursEnabled: true,
      workingHoursStart: "09:00",
      workingHoursEnd: "18:00",
      workingHoursDays: ["sunday", "monday", "tuesday", "wednesday", "thursday"],
      maxConsecutiveMessages: 10,
      chatTimeout: 30,
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 30,
      ipRestriction: false,
      allowedIPs: [],
      loginAlerts: true,
      dataEncryption: true,
    },
    integrations: {
      emailForwarding: false,
      forwardEmail: "",
      webhookEnabled: false,
      webhookUrl: "",
      apiEnabled: false,
      apiKey: "",
    },
    data: {
      autoBackup: true,
      backupFrequency: "daily",
      dataRetention: 365,
      exportFormat: "json",
    },
  });

  const [autoResponses, setAutoResponses] = useState<AutoResponse[]>([
    { id: 1, trigger: "مرحبا", response: "أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟", enabled: true, priority: 1 },
    { id: 2, trigger: "شكراً", response: "العفو! نحن هنا لمساعدتك في أي وقت.", enabled: true, priority: 2 },
    { id: 3, trigger: "بخصوص", response: "تفضلوا بشرح استفساركم وسأقوم بالرد بأسرع وقت ممكن.", enabled: false, priority: 3 },
  ]);

  const [cannedResponses, setCannedResponses] = useState<CannedResponse[]>([
    { id: 1, title: "تحية", content: "تحية طيبة وبعد،", category: "عام", shortcut: "/تحيه", usageCount: 45 },
    { id: 2, title: "شكراً", content: "شكراً لتواصلكم معنا. نحن نقدر اهتمامكم ونعمل على خدمتكم دائماً.", category: "عام", shortcut: "/شكر", usageCount: 32 },
    { id: 3, title: "انتظار", content: "يرجى الانتظار قليلاً ريثما أتحقق من المعلومات المطلوبة.", category: "معالجة", shortcut: "/انتظار", usageCount: 28 },
    { id: 4, title: "إعادة توجيه", content: "سأقوم بتحويلكم إلى القسم المختص لمعالجة طلبكم بأفضل طريقة.", category: "تحويل", shortcut: "/تحويل", usageCount: 15 },
  ]);

  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    { id: 1, question: "كيف أغير كلمة المرور؟", answer: "يمكن تغيير كلمة المرور من إعدادات الحساب > الأمان", category: "حساب", views: 125 },
    { id: 2, question: "كيف أتواصل مع الدعم؟", answer: "يمكنكم التواصل معنا عبر المحادثة المباشرة أو البريد الإلكتروني", category: "دعم", views: 98 },
    { id: 3, question: "ما هي ساعات العمل؟", answer: "نحن متاحون من الأحد إلى الخميس من 9 صباحاً إلى 6 مساءً", category: "عام", views: 76 },
  ]);

  const [activeSection, setActiveSection] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const updateSetting = (category: keyof SupportSettings, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: { ...(prev[category] as any), [key]: value },
    }));
  };

  const toggleAutoResponse = (id: number) => {
    setAutoResponses((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const sections = [
    { id: "general", label: "الإعدادات العامة", icon: <FaCog /> },
    { id: "notifications", label: "الإشعارات", icon: <FaBell /> },
    { id: "appearance", label: "المظهر", icon: <FaPalette /> },
    { id: "chat", label: "إعدادات الدردشة", icon: <FaComments /> },
    { id: "security", label: "الأمان والحماية", icon: <FaShieldAlt /> },
    { id: "integrations", title: "التكامل", icon: <FaPlug /> },
    { id: "data", title: "البيانات", icon: <FaDatabase /> },
    { id: "autoResponse", title: "الردود الآلية", icon: <FaRobot /> },
    { id: "cannedResponses", title: "الردود السريعة", icon: <FaFileAlt /> },
    { id: "faq", title: "الأسئلة الشائعة", icon: <FaQuestionCircle /> },
  ];

  return (
    <div className="p-4" style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 70px)" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold" style={{ color: "var(--text)" }}>إعدادات الدعم</h4>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>إدارة إعدادات منصة الدعم</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <FaUndo /> إعادة تعيين
          </button>
          <button className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
            <FaSave /> حفظ التغييرات
          </button>
        </div>
      </div>

      <div className="d-flex gap-4" style={{ minHeight: "calc(100vh - 200px)" }}>
        <div className="p-3 rounded" style={{ width: "250px", backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="position-relative mb-3">
            <FaSearch className="position-absolute" style={{ right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", fontSize: "0.85rem" }} />
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ borderRadius: "8px", backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)", paddingRight: "35px", color: "var(--text)", fontSize: "0.85rem" }}
            />
          </div>
          <div className="d-flex flex-column gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="d-flex align-items-center gap-3 p-2 rounded"
                style={{
                  backgroundColor: activeSection === section.id ? "var(--primary)" : "transparent",
                  color: activeSection === section.id ? "white" : "var(--text)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "right",
                  fontSize: "0.9rem",
                }}
              >
                {section.icon}
                <span>{section.title || section.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow-1 p-4 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
          {activeSection === "general" && (
            <div className="d-flex flex-column gap-4">
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>الإعدادات العامة</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>اللغة</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => updateSetting("general", "language", e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>المنطقة الزمنية</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting("general", "timezone", e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                    <option value="Asia/Dubai">دبي (GMT+4)</option>
                    <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>تنسيق التاريخ</label>
                  <select
                    value={settings.general.dateFormat}
                    onChange={(e) => updateSetting("general", "dateFormat", e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>تنسيق الوقت</label>
                  <select
                    value={settings.general.timeFormat}
                    onChange={(e) => updateSetting("general", "timeFormat", e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="12h">12 ساعة</option>
                    <option value="24h">24 ساعة</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="d-flex flex-column gap-4">
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>الإشعارات</h5>
              <div className="d-flex flex-column gap-3">
                {[
                  { key: "emailNotifications", label: "إشعارات البريد الإلكتروني", desc: "تلقي إشعارات عبر البريد الإلكتروني" },
                  { key: "smsNotifications", label: "إشعارات الرسائل النصية", desc: "تلقي إشعارات عبر الرسائل النصية" },
                  { key: "pushNotifications", label: "إشعارات الدفع", desc: "تلقي إشعارات فورية على المتصفح" },
                  { key: "soundEnabled", label: "تفعيل الأصوات", desc: "تشغيل أصوات للإشعارات" },
                  { key: "newMessageSound", label: "صوت رسائل جديدة", desc: "صوت عند وصول رسالة جديدة" },
                  { key: "newTicketSound", label: "صوت تذاكر جديدة", desc: "صوت عند وصول تذكرة جديدة" },
                ].map((item) => (
                  <div key={item.key} className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                    <div>
                      <div className="fw-bold" style={{ color: "var(--text)" }}>{item.label}</div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{item.desc}</div>
                    </div>
                    <button
                      onClick={() => updateSetting("notifications", item.key, !settings.notifications[item.key as keyof typeof settings.notifications])}
                      className="btn d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "26px",
                        borderRadius: "13px",
                        backgroundColor: settings.notifications[item.key as keyof typeof settings.notifications] ? "var(--primary)" : "var(--border)",
                        border: "none",
                        padding: 0,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: "white",
                          position: "absolute",
                          left: settings.notifications[item.key as keyof typeof settings.notifications] ? "calc(100% - 24px)" : "2px",
                          transition: "left 0.2s",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="d-flex flex-column gap-4">
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>المظهر</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>السمة</label>
                  <div className="d-flex gap-3">
                    {[
                      { value: "light", label: "فاتح", icon: <FaSun /> },
                      { value: "dark", label: "داكن", icon: <FaMoon /> },
                      { value: "auto", label: "تلقائي", icon: <FaDesktop /> },
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => updateSetting("appearance", "theme", theme.value)}
                        className="btn d-flex align-items-center gap-2 flex-fill justify-content-center p-3"
                        style={{
                          backgroundColor: settings.appearance.theme === theme.value ? "var(--primary)" : "var(--surface-elevated)",
                          color: settings.appearance.theme === theme.value ? "white" : "var(--text)",
                          border: `2px solid ${settings.appearance.theme === theme.value ? "var(--primary)" : "var(--border)"}`,
                          borderRadius: "12px",
                        }}
                      >
                        {theme.icon}
                        <span>{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>حجم الخط</label>
                  <select
                    value={settings.appearance.fontSize}
                    onChange={(e) => updateSetting("appearance", "fontSize", e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="small">صغير</option>
                    <option value="medium">متوسط</option>
                    <option value="large">كبير</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)", height: "100%" }}>
                    <div>
                      <div className="fw-bold" style={{ color: "var(--text)" }}>تقليل الحركة</div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>تقليل animations</div>
                    </div>
                    <button
                      onClick={() => updateSetting("appearance", "reducedMotion", !settings.appearance.reducedMotion)}
                      className="btn d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "26px",
                        borderRadius: "13px",
                        backgroundColor: settings.appearance.reducedMotion ? "var(--primary)" : "var(--border)",
                        border: "none",
                        padding: 0,
                      }}
                    >
                      <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.appearance.reducedMotion ? "calc(100% - 24px)" : "2px" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "chat" && (
            <div className="d-flex flex-column gap-4">
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>إعدادات الدردشة</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div>
                    <div className="fw-bold" style={{ color: "var(--text)" }}>التعيين التلقائي</div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>تعيين المحادثات الجديدة تلقائياً</div>
                  </div>
                  <button
                    onClick={() => updateSetting("chat", "autoAssign", !settings.chat.autoAssign)}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "26px", borderRadius: "13px", backgroundColor: settings.chat.autoAssign ? "var(--primary)" : "var(--border)", border: "none", padding: 0 }}
                  >
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.chat.autoAssign ? "calc(100% - 24px)" : "2px" }} />
                  </button>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div>
                    <div className="fw-bold" style={{ color: "var(--text)" }}>إظهار مؤشر الكتابة</div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>إظهار عندما يكتب الطالب</div>
                  </div>
                  <button
                    onClick={() => updateSetting("chat", "showTypingIndicator", !settings.chat.showTypingIndicator)}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "26px", borderRadius: "13px", backgroundColor: settings.chat.showTypingIndicator ? "var(--primary)" : "var(--border)", border: "none", padding: 0 }}
                  >
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.chat.showTypingIndicator ? "calc(100% - 24px)" : "2px" }} />
                  </button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الحد الأقصى لحجم الملف (MB)</label>
                    <input
                      type="number"
                      value={settings.chat.maxFileSize}
                      onChange={(e) => updateSetting("chat", "maxFileSize", parseInt(e.target.value))}
                      className="form-control"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>مهلة المحادثة (دقائق)</label>
                    <input
                      type="number"
                      value={settings.chat.chatTimeout}
                      onChange={(e) => updateSetting("chat", "chatTimeout", parseInt(e.target.value))}
                      className="form-control"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    />
                  </div>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", border: "1px solid #2196f3" }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaClock style={{ color: "#2196f3" }} />
                    <span className="fw-bold" style={{ color: "#2196f3" }}>ساعات العمل</span>
                  </div>
                  <div className="d-flex gap-3 flex-wrap">
                    <span style={{ color: "var(--text)" }}>من: <input type="time" value={settings.chat.workingHoursStart} onChange={(e) => updateSetting("chat", "workingHoursStart", e.target.value)} className="form-control" style={{ width: "100px", display: "inline-block", backgroundColor: "var(--surface)", color: "var(--text)" }} /></span>
                    <span style={{ color: "var(--text)" }}>إلى: <input type="time" value={settings.chat.workingHoursEnd} onChange={(e) => updateSetting("chat", "workingHoursEnd", e.target.value)} className="form-control" style={{ width: "100px", display: "inline-block", backgroundColor: "var(--surface)", color: "var(--text)" }} /></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="d-flex flex-column gap-4">
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>الأمان والحماية</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div>
                    <div className="fw-bold" style={{ color: "var(--text)" }}>المصادقة الثنائية</div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>تفعيل المصادقة بعاملين</div>
                  </div>
                  <button
                    onClick={() => updateSetting("security", "twoFactorEnabled", !settings.security.twoFactorEnabled)}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "26px", borderRadius: "13px", backgroundColor: settings.security.twoFactorEnabled ? "var(--primary)" : "var(--border)", border: "none", padding: 0 }}
                  >
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.security.twoFactorEnabled ? "calc(100% - 24px)" : "2px" }} />
                  </button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>مهلة الجلسة (دقائق)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting("security", "sessionTimeout", parseInt(e.target.value))}
                      className="form-control"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)", height: "100%" }}>
                      <div>
                        <div className="fw-bold" style={{ color: "var(--text)" }}>تنبيه تسجيل الدخول</div>
                        <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>إشعار عند تسجيل دخول جديد</div>
                      </div>
                      <button
                        onClick={() => updateSetting("security", "loginAlerts", !settings.security.loginAlerts)}
                        className="btn d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "26px", borderRadius: "13px", backgroundColor: settings.security.loginAlerts ? "var(--primary)" : "var(--border)", border: "none", padding: 0 }}
                      >
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.security.loginAlerts ? "calc(100% - 24px)" : "2px" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "integrations" && (
            <div className="d-flex flex-column gap-4">
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>التكامل</h5>
              <div className="row g-3">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                    <div>
                      <div className="fw-bold" style={{ color: "var(--text)" }}>توجيه البريد الإلكتروني</div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>إرسال نسخة من المحادثات للبريد الإلكتروني</div>
                    </div>
                    <button
                      onClick={() => updateSetting("integrations", "emailForwarding", !settings.integrations.emailForwarding)}
                      className="btn d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "26px", borderRadius: "13px", backgroundColor: settings.integrations.emailForwarding ? "var(--primary)" : "var(--border)", border: "none", padding: 0 }}
                    >
                      <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.integrations.emailForwarding ? "calc(100% - 24px)" : "2px" }} />
                    </button>
                  </div>
                </div>
                {settings.integrations.emailForwarding && (
                  <div className="col-12">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>البريد الإلكتروني للتوجيه</label>
                    <input
                      type="email"
                      value={settings.integrations.forwardEmail}
                      onChange={(e) => updateSetting("integrations", "forwardEmail", e.target.value)}
                      className="form-control"
                      placeholder="support@example.com"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    />
                  </div>
                )}
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                    <div>
                      <div className="fw-bold" style={{ color: "var(--text)" }}>تفعيل API</div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>السماح بالوصول عبر API</div>
                    </div>
                    <button
                      onClick={() => updateSetting("integrations", "apiEnabled", !settings.integrations.apiEnabled)}
                      className="btn d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "26px", borderRadius: "13px", backgroundColor: settings.integrations.apiEnabled ? "var(--primary)" : "var(--border)", border: "none", padding: 0 }}
                    >
                      <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.integrations.apiEnabled ? "calc(100% - 24px)" : "2px" }} />
                    </button>
                  </div>
                </div>
                {settings.integrations.apiEnabled && (
                  <div className="col-12">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>مفتاح API</label>
                    <div className="d-flex gap-2">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value={settings.integrations.apiKey}
                        onChange={(e) => updateSetting("integrations", "apiKey", e.target.value)}
                        className="form-control flex-grow-1"
                        placeholder="أدخل مفتاح API"
                        style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="btn d-flex align-items-center justify-content-center"
                        style={{ width: "46px", height: "46px", backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", borderRadius: "8px" }}
                      >
                        {showApiKey ? <FaEyeSlash style={{ color: "var(--text-light)" }} /> : <FaEye style={{ color: "var(--text-light)" }} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "data" && (
            <div className="d-flex flex-column gap-4">
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>إدارة البيانات</h5>
              <div className="row g-3">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                    <div>
                      <div className="fw-bold" style={{ color: "var(--text)" }}>النسخ الاحتياطي التلقائي</div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>نسخ احتياطي تلقائي للبيانات</div>
                    </div>
                    <button
                      onClick={() => updateSetting("data", "autoBackup", !settings.data.autoBackup)}
                      className="btn d-flex align-items-center justify-content-center"
                      style={{ width: "50px", height: "26px", borderRadius: "13px", backgroundColor: settings.data.autoBackup ? "var(--primary)" : "var(--border)", border: "none", padding: 0 }}
                    >
                      <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "white", position: "absolute", left: settings.data.autoBackup ? "calc(100% - 24px)" : "2px" }} />
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>تردد النسخ الاحتياطي</label>
                  <select
                    value={settings.data.backupFrequency}
                    onChange={(e) => updateSetting("data", "backupFrequency", e.target.value)}
                    className="form-control"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="daily">يومياً</option>
                    <option value="weekly">أسبوعياً</option>
                    <option value="monthly">شهرياً</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الاحتفاظ بالبيانات (أيام)</label>
                  <input
                    type="number"
                    value={settings.data.dataRetention}
                    onChange={(e) => updateSetting("data", "dataRetention", parseInt(e.target.value))}
                    className="form-control"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
                <div className="col-12">
                  <div className="d-flex gap-3 mt-3">
                    <button className="btn d-flex align-items-center gap-2 flex-fill justify-content-center" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "12px" }}>
                      <FaDownload /> تصدير البيانات
                    </button>
                    <button className="btn d-flex align-items-center gap-2 flex-fill justify-content-center" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px" }}>
                      <FaUpload /> استيراد البيانات
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "autoResponse" && (
            <div className="d-flex flex-column gap-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold" style={{ color: "var(--text)" }}>الردود الآلية</h5>
                <button onClick={() => setShowAddModal(true)} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "8px 14px" }}>
                  <FaPlus /> إضافة رد
                </button>
              </div>
              <div className="d-flex flex-column gap-3">
                {autoResponses.map((response) => (
                  <div key={response.id} className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          checked={response.enabled}
                          onChange={() => toggleAutoResponse(response.id)}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <span className="fw-bold" style={{ color: "var(--text)" }}>"{response.trigger}"</span>
                        <span className="badge" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", fontSize: "0.75rem" }}>الأولوية: {response.priority}</span>
                      </div>
                      <div className="d-flex gap-1">
                        <button className="btn d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px" }}>
                          <FaEdit style={{ fontSize: "0.8rem", color: "var(--text-light)" }} />
                        </button>
                        <button className="btn d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", backgroundColor: "rgba(220, 53, 69, 0.1)", border: "1px solid var(--danger)", borderRadius: "6px" }}>
                          <FaTrash style={{ fontSize: "0.8rem", color: "var(--danger)" }} />
                        </button>
                      </div>
                    </div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{response.response}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "cannedResponses" && (
            <div className="d-flex flex-column gap-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold" style={{ color: "var(--text)" }}>الردود السريعة</h5>
                <button onClick={() => setShowAddModal(true)} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "8px 14px" }}>
                  <FaPlus /> إضافة رد
                </button>
              </div>
              <div className="table-responsive">
                <table className="table" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      <th style={{ padding: "12px", textAlign: "right" }}>العنوان</th>
                      <th style={{ padding: "12px", textAlign: "right" }}>الاختصار</th>
                      <th style={{ padding: "12px", textAlign: "right" }}>الفئة</th>
                      <th style={{ padding: "12px", textAlign: "right" }}>الاستخدام</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cannedResponses.map((response) => (
                      <tr key={response.id} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px" }}>{response.title}</td>
                        <td style={{ padding: "12px" }}><code style={{ backgroundColor: "var(--background)", padding: "2px 6px", borderRadius: "4px" }}>{response.shortcut}</code></td>
                        <td style={{ padding: "12px" }}><span className="badge" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", color: "#9c27b0" }}>{response.category}</span></td>
                        <td style={{ padding: "12px" }}>{response.usageCount} مرة</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <button className="btn btn-sm" style={{ color: "var(--primary)", marginRight: "4px" }}><FaEdit /></button>
                          <button className="btn btn-sm" style={{ color: "var(--danger)" }}><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "faq" && (
            <div className="d-flex flex-column gap-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold" style={{ color: "var(--text)" }}>الأسئلة الشائعة</h5>
                <button onClick={() => setShowAddModal(true)} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "8px 14px" }}>
                  <FaPlus /> إضافة سؤال
                </button>
              </div>
              <div className="d-flex flex-column gap-3">
                {faqItems.map((faq) => (
                  <div key={faq.id} className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="fw-bold" style={{ color: "var(--text)" }}>{faq.question}</div>
                      <span className="badge" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3" }}>{faq.category}</span>
                    </div>
                    <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{faq.answer}</div>
                    <div className="mt-2" style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>
                      <FaEye className="ms-1" /> {faq.views} مشاهدة
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportSettingsPage;