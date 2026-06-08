import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaEnvelope, FaInbox, FaMailBulk, FaSearch, FaCheck, FaTrash, FaUser, FaClock, FaTag, 
  FaCheckCircle, FaExclamationCircle, FaPaperPlane, FaEnvelopeOpenText, FaPhone, FaCalendarAlt,
  FaChevronDown, FaChevronUp, FaFilter, FaSortAmountDown, FaEllipsisV
} from "react-icons/fa";
import { ContactMessage, getMessages, markMessageAsRead, deleteMessage } from "../../utils/messagesStore";

interface MessageItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  date: string;
  repliedAt?: string;
  source: "internal" | "contact";
}

const sampleContactMessages: MessageItem[] = [
  {
    id: 101,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+966 55 123 4567",
    subject: "support",
    message: "أريد الاستفسار عن курсات التعليم الخاصة بالأطفال ذوي الاحتياجات الخاصة. ما هي المتطلبات؟",
    status: "new",
    date: "2024-01-15",
    source: "contact",
  },
  {
    id: 102,
    name: "سارة علي",
    email: "sara@example.com",
    phone: "+966 50 987 6543",
    subject: "sales",
    message: "هل توجد خصومات للمؤسسات التعليمية؟ أريد شراكة مع مؤسستكم.",
    status: "replied",
    date: "2024-01-14",
    repliedAt: "2024-01-14",
    source: "contact",
  },
  {
    id: 103,
    name: "خالد عمر",
    email: "khaled@example.com",
    phone: "+966 55 456 7890",
    subject: "general",
    message: "أود الاستفادة من خدماتكم. ما هي الخطوات؟",
    status: "read",
    date: "2024-01-13",
    source: "contact",
  },
  {
    id: 104,
    name: "منى إبراهيم",
    email: "mona@example.com",
    phone: "+966 53 321 0987",
    subject: "partnership",
    message: "نحن مؤسسة تعليمية ونريد التعاون معكم. ما هي شروط الشراكة؟",
    status: "new",
    date: "2024-01-15",
    source: "contact",
  },
  {
    id: 105,
    name: "علي حسن",
    email: "ali@example.com",
    phone: "+966 56 789 0123",
    subject: "other",
    message: "لدي استفسار حول طريقة التسجيل في المنصة.",
    status: "new",
    date: "2024-01-15",
    source: "contact",
  },
];

const subjectConfig: Record<string, { label: string; bg: string; color: string }> = {
  general: { label: "استفسار عام", bg: "#e3f2fd", color: "#1565c0" },
  support: { label: "الدعم الفني", bg: "#fff3e0", color: "#ef6c00" },
  sales: { label: "المبيعات", bg: "#e8f5e9", color: "#2e7d32" },
  partnership: { label: "الشراكة", bg: "#f3e5f5", color: "#7b1fa2" },
  other: { label: "أخرى", bg: "#f5f5f5", color: "#616161" },
};

const statusConfig: Record<string, { label: string; bg: string; color: string; icon: React.ReactNode }> = {
  new: { label: "جديد", bg: "#ffebee", color: "#c62828", icon: <FaExclamationCircle size={10} /> },
  read: { label: "مقروء", bg: "#fff3e0", color: "#ef6c00", icon: <FaInbox size={10} /> },
  replied: { label: "تم الرد", bg: "#e8f5e9", color: "#2e7d32", icon: <FaCheckCircle size={10} /> },
};

const AdminMessagesPage = () => {
  const [internalMessages, setInternalMessages] = useState<ContactMessage[]>([]);
  const [contactMessages, setContactMessages] = useState<MessageItem[]>(sampleContactMessages);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "internal" | "contact">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [showFilters, setShowFilters] = useState(false);
  const [quickReplyId, setQuickReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    setInternalMessages(getMessages());
  }, []);

  const allMessages: MessageItem[] = [
    ...internalMessages.map((m) => ({ 
      ...m, 
      source: "internal" as const, 
      id: parseInt(m.id),
      status: m.read ? "read" as const : "new" as const,
      date: new Date(m.createdAt).toISOString().split("T")[0],
    })),
    ...contactMessages,
  ];

  const filteredMessages = allMessages
    .filter((msg) => {
      if (activeFilter !== "all" && msg.source !== activeFilter) return false;
      if (statusFilter !== "all" && msg.status !== statusFilter) return false;
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        msg.name.toLowerCase().includes(term) ||
        msg.email.toLowerCase().includes(term) ||
        msg.message.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      const aVal = sortBy === "date" ? a.date : a.name;
      const bVal = sortBy === "date" ? b.date : b.name;
      return bVal.localeCompare(aVal);
    });

  const stats = {
    total: allMessages.length,
    unread: allMessages.filter((m) => m.status === "new").length,
    internal: allMessages.filter((m) => m.source === "internal").length,
    contact: allMessages.filter((m) => m.source === "contact").length,
  };

  const handleSelect = (msg: MessageItem) => {
    setSelectedMessage(msg);
    if (msg.status === "new") {
      if (msg.source === "internal") {
        markMessageAsRead(msg.id.toString());
        setInternalMessages(getMessages());
      } else {
        setContactMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, status: "read" as const } : m))
        );
      }
    }
  };

  const handleDelete = (msg: MessageItem) => {
    if (confirm("هل أنت متأكد من حذف هذه الرسالة؟")) {
      if (msg.source === "internal") {
        deleteMessage(msg.id.toString());
        setInternalMessages(getMessages());
      } else {
        setContactMessages((prev) => prev.filter((m) => m.id !== msg.id));
      }
      setSelectedMessage(null);
    }
  };

  const handleReply = (msg: MessageItem) => {
    if (!replyText.trim()) return;
    setContactMessages((prev) =>
      prev.map((m) =>
        m.id === msg.id
          ? { ...m, status: "replied" as const, repliedAt: new Date().toISOString().split("T")[0] }
          : m
      )
    );
    setQuickReplyId(null);
    setReplyText("");
    alert("تم إرسال الرد!");
  };

  return (
    <div className="h-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "var(--primary)",
                color: "white",
              }}
            >
              <FaMailBulk size={22} />
            </div>
            <div>
              <h2 className="fw-bold mb-0" style={{ color: "var(--text)", fontSize: "1.5rem" }}>
                الرسائل
              </h2>
              <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                {stats.unread} رسالة غير مقروءة
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 flex-wrap">
          <motion.div whileHover={{ scale: 1.02 }} className="card border-0 px-4 py-3" style={{ borderRadius: "14px", backgroundColor: "var(--surface)", minWidth: "120px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>الكل</p>
                <h4 className="mb-0 fw-bold" style={{ color: "var(--text)" }}>{stats.total}</h4>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", backgroundColor: "var(--surface-elevated)", color: "var(--text-light)" }}>
                <FaInbox size={14} />
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="card border-0 px-4 py-3" style={{ borderRadius: "14px", backgroundColor: "var(--surface)", minWidth: "120px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>رسائل داخلية</p>
                <h4 className="mb-0 fw-bold" style={{ color: "var(--secondary)" }}>{stats.internal}</h4>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", backgroundColor: "rgba(100, 100, 100, 0.1)", color: "var(--text)" }}>
                <FaEnvelope size={14} />
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="card border-0 px-4 py-3" style={{ borderRadius: "14px", backgroundColor: "var(--surface)", minWidth: "120px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>تواصل</p>
                <h4 className="mb-0 fw-bold" style={{ color: "var(--primary)" }}>{stats.contact}</h4>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--primary)" }}>
                <FaMailBulk size={14} />
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="card border-0 px-4 py-3" style={{ borderRadius: "14px", backgroundColor: "var(--surface)", minWidth: "120px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>غير مقروءة</p>
                <h4 className="mb-0 fw-bold" style={{ color: "var(--danger)" }}>{stats.unread}</h4>
              </div>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", backgroundColor: "#ffebee", color: "var(--danger)" }}>
                <FaExclamationCircle size={14} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="row g-4">
        <div className="col-lg-5" style={{ overflowX: "hidden" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card border-0"
            style={{
              borderRadius: "16px",
              backgroundColor: "var(--surface)",
              maxHeight: "calc(100vh - 320px)",
              overflow: "hidden",
            }}
          >
            <div className="p-3" style={{ borderBottom: "2px solid var(--border)" }}>
              <div className="d-flex gap-2 mb-3">
                {[
                  { key: "all", label: "الكل" },
                  { key: "internal", label: "داخلية" },
                  { key: "contact", label: "تواصل" },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
                    className="btn btn-sm flex-grow-1"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: activeFilter === filter.key ? "var(--primary)" : "var(--surface-elevated)",
                      color: activeFilter === filter.key ? "white" : "var(--text)",
                      border: "1px solid var(--border)",
                      fontSize: "0.8rem",
                    }}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ right: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", fontSize: "0.9rem" }} />
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "var(--surface-elevated)",
                    border: "2px solid var(--border)",
                    paddingRight: "40px",
                    color: "var(--text)",
                    fontSize: "0.9rem",
                  }}
                />
              </div>
            </div>

            <div style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "calc(100vh - 420px)" }}>
              {filteredMessages.length === 0 ? (
                <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
                  <FaInbox size={40} className="mb-3 opacity-50" />
                  <p>لا توجد رسائل</p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => handleSelect(msg)}
                    className="p-3 border-bottom cursor-pointer"
                    style={{
                      cursor: "pointer",
                      backgroundColor: selectedMessage?.id === msg.id 
                        ? "var(--primary)" 
                        : msg.status === "new" 
                          ? "rgba(88, 204, 2, 0.06)" 
                          : "transparent",
                      borderColor: "var(--border)",
                      borderLeft: msg.status === "new" ? "4px solid var(--primary)" : "4px solid transparent",
                      transition: "background-color 0.15s ease, transform 0.15s ease",
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "44px",
                          height: "44px",
                          backgroundColor: msg.source === "contact" ? "var(--primary)" : "var(--secondary)",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {msg.name.charAt(0)}
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-bold" style={{ color: selectedMessage?.id === msg.id ? "white" : "var(--text)", fontWeight: msg.status === "new" ? 700 : 500 }}>
                            {msg.name}
                          </span>
                          <div className="d-flex align-items-center gap-2">
                            <span className="px-2 py-1 rounded" style={{ backgroundColor: msg.source === "contact" ? "rgba(88, 204, 2, 0.15)" : "rgba(100, 100, 100, 0.15)", color: selectedMessage?.id === msg.id ? "white" : msg.source === "contact" ? "var(--primary)" : "var(--text)", fontSize: "0.65rem" }}>
                              {msg.source === "contact" ? "تواصل" : "داخلي"}
                            </span>
                            <span style={{ color: selectedMessage?.id === msg.id ? "rgba(255,255,255,0.7)" : "var(--text-light)", fontSize: "0.7rem" }}>
                              {msg.date}
                            </span>
                          </div>
                        </div>
                        <p className="mb-0" style={{ color: selectedMessage?.id === msg.id ? "rgba(255,255,255,0.8)" : "var(--text-light)", fontSize: "0.8rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        <div className="col-lg-7" style={{ overflowX: "hidden" }}>
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card border-0 p-4 h-100"
              style={{
                borderRadius: "16px",
                backgroundColor: "var(--surface)",
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-4 pb-4" style={{ borderBottom: "2px solid var(--border)" }}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundColor: selectedMessage.source === "contact" ? "var(--primary)" : "var(--secondary)",
                      color: "white",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1" style={{ color: "var(--text)" }}>{selectedMessage.name}</h4>
                    <p className="mb-0" style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleSelect(selectedMessage)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      backgroundColor: "var(--surface-elevated)",
                      border: "2px solid var(--border)",
                      color: "var(--text)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <FaCheck size={12} />
                    قراءة
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(220, 53, 69, 0.1)",
                      border: "2px solid var(--danger)",
                      color: "var(--danger)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4 flex-wrap" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                <div className="d-flex align-items-center gap-2">
                  <FaUser size={12} />
                  <span>{selectedMessage.name}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaEnvelope size={12} />
                  <span>{selectedMessage.email}</span>
                </div>
                {selectedMessage.phone && (
                  <div className="d-flex align-items-center gap-2">
                    <FaPhone size={12} />
                    <span>{selectedMessage.phone}</span>
                  </div>
                )}
                <div className="d-flex align-items-center gap-2">
                  <FaCalendarAlt size={12} />
                  <span>{selectedMessage.date}</span>
                </div>
                <span className="px-2 py-1 rounded" style={{ backgroundColor: statusConfig[selectedMessage.status]?.bg, color: statusConfig[selectedMessage.status]?.color, fontSize: "0.75rem", fontWeight: 600 }}>
                  {statusConfig[selectedMessage.status]?.icon}
                  <span className="me-1">{statusConfig[selectedMessage.status]?.label}</span>
                </span>
              </div>

              <span className="d-inline-block px-3 py-1 rounded mb-4" style={{ backgroundColor: subjectConfig[selectedMessage.subject]?.bg, color: subjectConfig[selectedMessage.subject]?.color, fontSize: "0.8rem", fontWeight: 600 }}>
                <FaTag className="me-1" style={{ fontSize: "0.7rem" }} />
                {subjectConfig[selectedMessage.subject]?.label}
              </span>

              <div className="p-4" style={{ backgroundColor: "var(--surface-elevated)", borderRadius: "12px", border: "2px solid var(--border)" }}>
                <p className="mb-0" style={{ color: "var(--text)", lineHeight: "1.9", fontSize: "0.95rem" }}>
                  {selectedMessage.message}
                </p>
              </div>

              {selectedMessage.status === "replied" && (
                <div className="mt-4 p-4" style={{ backgroundColor: "rgba(88, 204, 2, 0.08)", borderRadius: "12px", border: "2px solid var(--success)" }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaCheckCircle style={{ color: "var(--success)", fontSize: "0.9rem" }} />
                    <span className="fw-bold" style={{ color: "var(--success)", fontSize: "0.9rem" }}>تم الرد</span>
                  </div>
                  <p className="mb-0" style={{ color: "var(--text)", fontSize: "0.9rem" }}>شكراً لتواصلكم معنا. تم الرد على استفساركم.</p>
                </div>
              )}

              {selectedMessage.source === "contact" && selectedMessage.status !== "replied" && (
                <div className="mt-4">
                  {quickReplyId === selectedMessage.id ? (
                    <div className="d-flex gap-2">
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="اكتب ردك..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "var(--input-bg)",
                          border: "2px solid var(--border)",
                          color: "var(--text)",
                          resize: "none",
                          fontSize: "0.9rem",
                        }}
                      />
                      <div className="d-flex flex-column gap-2">
                        <button
                          onClick={() => handleReply(selectedMessage)}
                          className="btn"
                          style={{ padding: "10px", borderRadius: "10px", backgroundColor: "var(--primary)", color: "white" }}
                        >
                          <FaPaperPlane size={14} />
                        </button>
                        <button
                          onClick={() => setQuickReplyId(null)}
                          className="btn"
                          style={{ padding: "10px", borderRadius: "10px", backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                        >
                          <FaChevronDown style={{ transform: "rotate(90deg)", fontSize: "0.8rem" }} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setQuickReplyId(selectedMessage.id)}
                      className="btn d-flex align-items-center gap-2"
                      style={{ padding: "12px 24px", borderRadius: "10px", backgroundColor: "var(--primary)", color: "white" }}
                    >
                      <FaPaperPlane />
                      رد
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="card border-0 d-flex align-items-center justify-content-center" style={{ borderRadius: "16px", backgroundColor: "var(--surface)", height: "calc(100vh - 320px)" }}>
              <div className="text-center" style={{ color: "var(--text-light)" }}>
                <FaEnvelope size={56} style={{ opacity: 0.2 }} />
                <p className="mt-3" style={{ fontSize: "1rem" }}>اختر رسالة لعرض محتواها</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessagesPage;