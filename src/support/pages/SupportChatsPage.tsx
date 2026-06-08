// src\support\pages\SupportChatsPage.tsx
import { useState } from "react";
import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaPaperPlane,
  FaCheck,
  FaCheckDouble,
  FaTimes,
  FaTrash,
  FaUserCircle,
  FaCircle,
  FaEllipsisV,
  FaChevronDown,
  FaPhone,
  FaSmile,
  FaPaperclip,
  FaMicrophone,
  FaCommentDots,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
interface Message {
  id: number;
  text: string;
  timestamp: string;
  isFromSupport: boolean;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: number;
  conversationName: string;
  studentEmail: string;
  studentPhone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  typing: boolean;
  messages: Message[];
  category?: string;
  solved?: boolean;
  date?: string;
}

const sampleConversations: Conversation[] = [
  {
    id: 1,
    conversationName: "المحادثة - 1",
    studentEmail: "ahmed@example.com",
    studentPhone: "+966 55 123 4567",
    lastMessage: "شكراً لك، تم حل المشكلة بنجاح",
    timestamp: "10:30 ص",
    unread: 2,
    online: true,
    typing: false,
    category: "دعم فني",
    solved: true,
    date: "today",
    messages: [
      {
        id: 1,
        text: "مرحباً، أواجه مشكلة في تسجيل الدخول",
        timestamp: "10:00 ص",
        isFromSupport: false,
        status: "read",
      },
      {
        id: 2,
        text: "مرحباً، يمكنني مساعدتك. ما هي المشكلة بالضبط؟",
        timestamp: "10:02 ص",
        isFromSupport: true,
        status: "read",
      },
      {
        id: 3,
        text: "كلمة المرور لا تعمل رغم أنني متأكد من صحتها",
        timestamp: "10:05 ص",
        isFromSupport: false,
        status: "read",
      },
      {
        id: 4,
        text: "سأقوم بفحص حسابك الآن. هل يمكنك تأكيد بريدك الإلكتروني؟",
        timestamp: "10:07 ص",
        isFromSupport: true,
        status: "read",
      },
      {
        id: 5,
        text: "ahmed@example.com",
        timestamp: "10:08 ص",
        isFromSupport: false,
        status: "read",
      },
      {
        id: 6,
        text: "تم العثور على المشكلة. سنقوم بإعادة تعيين كلمة المرور لك",
        timestamp: "10:15 ص",
        isFromSupport: true,
        status: "read",
      },
      {
        id: 7,
        text: "شكراً لك، تم حل المشكلة بنجاح",
        timestamp: "10:30 ص",
        isFromSupport: false,
        status: "delivered",
      },
    ],
  },
  {
    id: 2,
    conversationName: "المحادثة - 2",
    studentEmail: "sara@example.com",
    studentPhone: "+966 50 987 6543",
    lastMessage: "هل يمكنك مساعدتي في الدفع؟",
    timestamp: "9:45 ص",
    unread: 0,
    online: false,
    typing: false,
    category: "الفواتير",
    solved: false,
    date: "today",
    messages: [
      {
        id: 1,
        text: "مرحباً",
        timestamp: "9:00 ص",
        isFromSupport: false,
        status: "read",
      },
      {
        id: 2,
        text: "مرحباً، كيف يمكنني مساعدتك؟",
        timestamp: "9:05 ص",
        isFromSupport: true,
        status: "read",
      },
      {
        id: 3,
        text: "هل يمكنك مساعدتي في الدفع؟",
        timestamp: "9:45 ص",
        isFromSupport: false,
        status: "read",
      },
    ],
  },
  {
    id: 3,
    conversationName: "المحادثة - 3",
    studentEmail: "khaled@example.com",
    studentPhone: "+966 55 456 7890",
    lastMessage: "جيد، سأجرب الآن",
    timestamp: "أمس",
    unread: 0,
    online: true,
    typing: false,
    category: "الدورات",
    solved: true,
    date: "yesterday",
    messages: [
      {
        id: 1,
        text: "أريد معرفة المزيد عن курса التصميم",
        timestamp: "8:00 م",
        isFromSupport: false,
        status: "read",
      },
      {
        id: 2,
        text: "بالطبع! دورة التصميم الجرافيكي تتضمن...",
        timestamp: "8:05 م",
        isFromSupport: true,
        status: "read",
      },
      {
        id: 3,
        text: "جيد، سأجرب الآن",
        timestamp: "8:30 م",
        isFromSupport: false,
        status: "read",
      },
    ],
  },
  {
    id: 4,
    conversationName: "المحادثة - 4",
    studentEmail: "mona@example.com",
    studentPhone: "+966 53 321 0987",
    lastMessage: "الرجاء contacting الفني",
    timestamp: "أمس",
    unread: 1,
    online: false,
    typing: true,
    category: "الحساب",
    solved: false,
    date: "yesterday",
    messages: [
      {
        id: 1,
        text: "تم إلغاء حسابي بالخطأ",
        timestamp: "6:00 م",
        isFromSupport: false,
        status: "read",
      },
      {
        id: 2,
        text: "الرجاء contacting الفني",
        timestamp: "6:05 م",
        isFromSupport: false,
        status: "delivered",
      },
    ],
  },
  {
    id: 5,
    conversationName: "المحادثة - 5",
    studentEmail: "ali@example.com",
    studentPhone: "+966 56 789 0123",
    lastMessage: "شكراً على المساعدة",
    timestamp: "الأحد",
    unread: 0,
    online: false,
    typing: false,
    category: "دعم فني",
    solved: true,
    date: "older",
    messages: [
      {
        id: 1,
        text: "المشكلة لا تزال قائمة",
        timestamp: "3:00 م",
        isFromSupport: false,
        status: "read",
      },
      {
        id: 2,
        text: "سأقوم بتحديث التطبيق لك",
        timestamp: "3:05 م",
        isFromSupport: true,
        status: "read",
      },
      {
        id: 3,
        text: "شكراً على المساعدة",
        timestamp: "3:10 م",
        isFromSupport: false,
        status: "read",
      },
    ],
  },
];

const SupportChatsPage = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(sampleConversations);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showConversationList, setShowConversationList] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "solved" | "unsolved"
  >("all");

  const filteredConversations = conversations
    .filter((conv) => {
      if (selectedDate) {
        const convDate =
          conv.date === "today"
            ? new Date().toISOString().split("T")[0]
            : conv.date === "yesterday"
              ? new Date(Date.now() - 86400000).toISOString().split("T")[0]
              : conv.date === "older"
                ? "older"
                : conv.date;
        return (
          convDate === selectedDate ||
          (convDate === "older" &&
            new Date(selectedDate) < new Date(Date.now() - 172800000))
        );
      }
      return true;
    })
    .filter((conv) => {
      if (statusFilter === "solved") return conv.solved === true;
      if (statusFilter === "unsolved") return conv.solved === false;
      return true;
    })
    .filter((conv) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        conv.conversationName.toLowerCase().includes(term) ||
        conv.studentEmail.toLowerCase().includes(term) ||
        conv.lastMessage.toLowerCase().includes(term)
      );
    });

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c)),
    );
    setShowConversationList(false);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: selectedConversation.messages.length + 1,
      text: messageInput,
      timestamp: new Date().toLocaleTimeString("ar-SA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isFromSupport: true,
      status: "sent",
    };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: messageInput,
              timestamp: "الآن",
            }
          : conv,
      ),
    );

    setSelectedConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMessage] } : null,
    );

    setMessageInput("");

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                messages: conv.messages.map((m) =>
                  m.id === newMessage.id
                    ? { ...m, status: "delivered" as const }
                    : m,
                ),
              }
            : conv,
        ),
      );
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (timestamp === "الآن") return "الآن";
    return timestamp;
  };

  return (
    <div
      className="d-flex h-100"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Conversations List */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="d-flex flex-column"
        style={{
          width: showConversationList ? "500px" : "0",
          minWidth: showConversationList ? "500px" : "0",
          height: "calc(100vh - 70px)",
          backgroundColor: "var(--surface)",
          borderLeft: "1px solid var(--border)",
          transition: "width 0.3s ease, min-width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div
          className="p-3"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="position-relative ">
            <FaSearch
              className="position-absolute"
              style={{
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-light)",
                fontSize: "0.85rem",
              }}
            />

            <input
              type="text"
              css={css`
                &::placeholder {
                  color: var(--text);
                  font-weight: 300;
                }
              `}
              placeholder="بحث عن محادثة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{
                borderRadius: "20px",
                backgroundColor: "var(--surface-elevated)",
                border: "2px solid var(--border)",
                paddingRight: "40px",
                color: "var(--text)",
                fontSize: "0.85rem",
                height: "40px",
              }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex align-items-center gap-2">
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                التاريخ:
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-control"
                css={css`
                  appearance: none;
                  &::-webkit-calendar-picker-indicator {
                    background: none;
                    mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>');
                    mask-repeat: no-repeat;
                    mask-size: contain;
                    -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>');
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-size: contain;
                    background-color: var(--text);
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                  }
                `}
                style={{
                  width: "160px",
                  borderRadius: "8px",
                  backgroundColor: "var(--surface-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: "0.85rem",
                  padding: "6px 10px",
                }}
              />
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate("")}
                  className="btn btn-sm"
                  style={{
                    borderRadius: "8px",
                    padding: "6px 10px",
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text-light)",
                  }}
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="d-flex align-items-center gap-2">
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                الحالة:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="form-select"
                style={{
                  width: "140px",
                  borderRadius: "8px",
                  backgroundColor: "var(--surface-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: "0.85rem",
                  padding: "6px 10px",
                }}
              >
                <option value="all">الكل</option>
                <option value="solved">محسومة</option>
                <option value="unsolved">قيد الانتظار</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {filteredConversations.length === 0 ? (
            <div
              className="text-center p-5"
              style={{ color: "var(--text-light)" }}
            >
              <FaUserCircle size={48} className="mb-3 opacity-50" />
              <p>لا توجد محادثات</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ backgroundColor: "rgba(37, 211, 102, 0.08)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectConversation(conv)}
                className="p-3 cursor-pointer"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedConversation?.id === conv.id
                      ? "rgba(37, 211, 102, 0.12)"
                      : "transparent",
                  borderBottom: "1px solid var(--border)",
                  position: "relative",
                  transition: "background-color 0.2s ease",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "52px",
                        height: "52px",
                        backgroundColor: conv.online
                          ? "var(--primary)"
                          : "var(--secondary)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {conv.id}
                    </div>
                    {conv.online && (
                      <FaCircle
                        className="position-absolute"
                        style={{
                          fontSize: "0.6rem",
                          color: "var(--success)",
                          backgroundColor: "var(--surface)",
                          borderRadius: "50%",
                          bottom: "2px",
                          right: "2px",
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span
                        className="fw-bold"
                        style={{ color: "var(--text)", fontSize: "0.95rem" }}
                      >
                        {conv.conversationName}
                      </span>
                      <span
                        style={{
                          color: "var(--text-light)",
                          fontSize: "0.7rem",
                        }}
                      >
                        {formatTimestamp(conv.timestamp)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      {conv.typing ? (
                        <span
                          style={{
                            color: "var(--primary)",
                            fontSize: "0.8rem",
                          }}
                        >
                          يكتب...
                        </span>
                      ) : (
                        <p
                          className="mb-0"
                          style={{
                            color: "var(--text-light)",
                            fontSize: "0.8rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "180px",
                          }}
                        >
                          {conv.lastMessage}
                        </p>
                      )}
                      <div className="d-flex align-items-center gap-2">
                        {conv.solved ? (
                          <FaCheckCircle
                            style={{
                              color: "var(--success)",
                              fontSize: "0.9rem",
                            }}
                          />
                        ) : (
                          <FaTimesCircle
                            style={{
                              color: "var(--warning)",
                              fontSize: "0.9rem",
                            }}
                          />
                        )}
                        {conv.unread > 0 && (
                          <span
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              minWidth: "22px",
                              height: "22px",
                              backgroundColor: "var(--primary)",
                              color: "white",
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                              padding: "0 6px",
                            }}
                          >
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    {conv.category && (
                      <span
                        className="badge mt-1"
                        style={{
                          backgroundColor: "rgba(88, 204, 2, 0.1)",
                          color: "var(--primary)",
                          fontSize: "0.65rem",
                        }}
                      >
                        {conv.category}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Chat Area */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ height: "calc(100vh - 70px)" }}
      >
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="d-flex align-items-center justify-content-between p-3"
              style={{
                backgroundColor: "var(--surface)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => setShowConversationList(!showConversationList)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--surface-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                  }}
                >
                  ☰
                </button>
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: selectedConversation.online
                      ? "var(--primary)"
                      : "var(--secondary)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {selectedConversation.id}
                </div>
                <div>
                  <div
                    className="fw-bold"
                    style={{ color: "var(--text)", fontSize: "0.95rem" }}
                  >
                    {selectedConversation.conversationName}
                  </div>
                  <div
                    className="d-flex align-items-center gap-1"
                    style={{
                      color: selectedConversation.online
                        ? "var(--success)"
                        : "var(--text-light)",
                      fontSize: "0.75rem",
                    }}
                  >
                    <FaCircle
                      className={
                        selectedConversation.online ? "animate-pulse" : ""
                      }
                      style={{ fontSize: "0.5rem" }}
                    />
                    <span>
                      {selectedConversation.online ? "متصل الآن" : "غير متصل"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Messages Area */}
            <div
              className="flex-grow-1 p-4"
              style={{
                backgroundColor: "var(--background)",
                backgroundImage: "var(--chat-background-image)",
                overflowY: "auto",
              }}
            >
              {selectedConversation.messages.map((msg, index) => {
                const showDate =
                  index === 0 ||
                  selectedConversation.messages[index - 1]?.timestamp.split(
                    " ",
                  )[0] !== msg.timestamp.split(" ")[0];

                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div className="text-center my-3">
                        <span
                          className="px-3 py-1 rounded-pill"
                          style={{
                            backgroundColor: "var(--surface-elevated)",
                            color: "var(--text-light)",
                            fontSize: "0.75rem",
                            display: "inline-block",
                          }}
                        >
                          {msg.timestamp.split(" ")[0]}
                        </span>
                      </div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`d-flex ${msg.isFromSupport ? "justify-content-end" : "justify-content-start"} mb-2`}
                    >
                      <div
                        className="position-relative"
                        style={{
                          maxWidth: "65%",
                          padding: "12px 16px",
                          borderRadius: "16px",
                          backgroundColor: msg.isFromSupport
                            ? "var(--primary)"
                            : "var(--surface-elevated)",
                          boxShadow: "var(--message-shadow)",
                          direction: msg.isFromSupport ? "rtl" : "ltr",
                        }}
                      >
                        <p
                          className="mb-1"
                          style={{
                            color: msg.isFromSupport ? "white" : "var(--text)",
                            lineHeight: "1.5",
                            fontSize: "0.9rem",
                          }}
                        >
                          {msg.text}
                        </p>
                        <div
                          className="d-flex align-items-center justify-content-end gap-1"
                          style={{
                            fontSize: "0.65rem",
                            color: msg.isFromSupport
                              ? "rgba(255,255,255,0.7)"
                              : "var(--text-light)",
                          }}
                        >
                          <span>
                            {msg.timestamp.split(" ")[1] || msg.timestamp}
                          </span>
                          {msg.isFromSupport && (
                            <span style={{ color: "rgba(255,255,255,0.8)" }}>
                              {msg.status === "read" ? (
                                <FaCheckDouble />
                              ) : msg.status === "delivered" ? (
                                <FaCheckDouble />
                              ) : (
                                <FaCheck />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 d-flex align-items-end gap-3"
              style={{
                backgroundColor: "var(--surface)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <button
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--text-light)",
                }}
              >
                <FaSmile size={24} />
              </button>
              <button
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--text-light)",
                }}
              >
                <FaPaperclip size={24} />
              </button>
              <div className="flex-grow-1 position-relative">
                <textarea
                  id="chat-message-input"
                  placeholder="اكتب رسالة..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="form-control"
                  rows={1}
                  style={{
                    borderRadius: "24px",
                    backgroundColor: "var(--surface-elevated)",
                    border: "2px solid var(--border)",
                    padding: "12px 16px",
                    color: "var(--text)",
                    fontSize: "0.9rem",
                    resize: "none",
                    maxHeight: "120px",
                    overflowY: "auto",
                  }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="btn d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "var(--primary)",
                  border: "none",
                  color: "white",
                }}
              >
                <FaPaperPlane />
              </motion.button>
            </motion.div>
          </>
        ) : (
          <div
            className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mb-4"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "rgba(88, 204, 2, 0.1)",
              }}
            >
              <FaCommentDots size={48} style={{ color: "var(--primary)" }} />
            </div>
            <h3 className="fw-bold mb-2" style={{ color: "var(--text)" }}>
              مرحباً بك في دردشة الدعم
            </h3>
            <p
              style={{
                color: "var(--text-light)",
                fontSize: "0.95rem",
                textAlign: "center",
                maxWidth: "400px",
              }}
            >
              اختر محادثة من القائمة للبدء بالمحادثة
            </p>
          </div>
        )}
      </div>

      {/* Info Panel for selected conversation */}
      {selectedConversation && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="d-flex flex-column p-4"
          style={{
            width: "300px",
            minWidth: "300px",
            backgroundColor: "var(--surface)",
            borderLeft: "1px solid var(--border)",
          }}
        >
          <div className="text-center mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: selectedConversation.online
                  ? "var(--primary)"
                  : "var(--secondary)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {selectedConversation.id}
            </div>
            <h4 className="fw-bold mb-1" style={{ color: "var(--text)" }}>
              {selectedConversation.conversationName}
            </h4>
            <p
              className="mb-0"
              style={{ color: "var(--text-light)", fontSize: "0.85rem" }}
            >
              {selectedConversation.studentEmail}
            </p>
          </div>

          <div className="mb-4">
            <h6
              className="fw-bold mb-3"
              style={{ color: "var(--text)", fontSize: "0.85rem" }}
            >
              معلومات الاتصال
            </h6>
            <div className="d-flex flex-column gap-2">
              <div
                className="d-flex align-items-center gap-2 p-2 rounded"
                style={{ backgroundColor: "var(--surface-elevated)" }}
              >
                <FaPhone
                  style={{ color: "var(--text-light)", fontSize: "0.85rem" }}
                />
                <span style={{ color: "var(--text)", fontSize: "0.85rem" }}>
                  {selectedConversation.studentPhone}
                </span>
              </div>
              <div
                className="d-flex align-items-center gap-2 p-2 rounded"
                style={{ backgroundColor: "var(--surface-elevated)" }}
              >
                <FaCircle
                  style={{
                    fontSize: "0.5rem",
                    color: selectedConversation.online
                      ? "var(--success)"
                      : "var(--text-light)",
                  }}
                />
                <span style={{ color: "var(--text)", fontSize: "0.85rem" }}>
                  {selectedConversation.online ? "متصل" : "غير متصل"}
                </span>
              </div>
              {selectedConversation.category && (
                <div
                  className="d-flex align-items-center gap-2 p-2 rounded"
                  style={{ backgroundColor: "var(--surface-elevated)" }}
                >
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "rgba(0, 88, 133, 0.1)",
                      color: "var(--primary)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {selectedConversation.category}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h6
              className="fw-bold mb-3"
              style={{ color: "var(--text)", fontSize: "0.85rem" }}
            >
              إحصائيات المحادثة
            </h6>
            <div className="d-flex flex-column gap-2">
              <div
                className="d-flex justify-content-between p-2 rounded"
                style={{ backgroundColor: "var(--surface-elevated)" }}
              >
                <span
                  style={{ color: "var(--text-light)", fontSize: "0.85rem" }}
                >
                  الرسائل
                </span>
                <span
                  className="fw-bold"
                  style={{ color: "var(--text)", fontSize: "0.85rem" }}
                >
                  {selectedConversation.messages.length}
                </span>
              </div>
              <div
                className="d-flex justify-content-between p-2 rounded"
                style={{ backgroundColor: "var(--surface-elevated)" }}
              >
                <span
                  style={{ color: "var(--text-light)", fontSize: "0.85rem" }}
                >
                  غير مقروء
                </span>
                <span
                  className="fw-bold"
                  style={{
                    color:
                      selectedConversation.unread > 0
                        ? "#c62828"
                        : "var(--text)",
                    fontSize: "0.85rem",
                  }}
                >
                  {selectedConversation.unread}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            {selectedConversation.solved ? (
              <button
                onClick={() => {
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === selectedConversation.id
                        ? { ...c, solved: false }
                        : c,
                    ),
                  );
                  setSelectedConversation((prev) =>
                    prev ? { ...prev, solved: false } : null,
                  );
                }}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: "var(--surface-elevated)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <FaTimesCircle style={{ color: "var(--warning)" }} />
                إعادة فتح المحادثة
              </button>
            ) : (
              <button
                onClick={() => {
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === selectedConversation.id
                        ? { ...c, solved: true }
                        : c,
                    ),
                  );
                  setSelectedConversation((prev) =>
                    prev ? { ...prev, solved: true } : null,
                  );
                }}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: "rgba(88, 204, 2, 0.1)",
                  color: "var(--success)",
                  border: "1px solid var(--success)",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <FaCheckCircle />
                تحديد كمحسومة
              </button>
            )}
          </div>
          <div className="mt-2">
            <button
              className="btn w-100 d-flex align-items-center justify-content-center gap-2"
              style={{
                backgroundColor: "rgba(220, 53, 69, 0.1)",
                color: "var(--danger)",
                border: "1px solid var(--danger)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <FaTrash />
              حذف المحادثة
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SupportChatsPage;
