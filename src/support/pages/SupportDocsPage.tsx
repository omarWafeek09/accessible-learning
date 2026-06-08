import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaFileUpload,
  FaFolder,
  FaFolderOpen,
  FaTags,
  FaClock,
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaDraftingCompass,
  FaBook,
  FaQuestionCircle,
  FaShieldAlt,
  FaGraduationCap,
  FaVideo,
  FaImage,
  FaLink,
  FaPaperclip,
  FaSave,
  FaTimes,
  FaCalendarAlt,
  FaChartBar,
  FaStar,
  FaShareAlt,
  FaCopy,
  FaExternalLinkAlt,
  FaSortAmountDown,
  FaFilter,
  FaPlay,
  FaPause,
  FaToggleOn,
  FaToggleOff,
  FaCheck,
  FaBan,
  FaArchive,
  FaUsers,
  FaChalkboardTeacher,
  FaHeadset,
  FaCog,
} from "react-icons/fa";

interface DocAttachment {
  id: number;
  name: string;
  type: "image" | "video" | "document" | "link";
  url: string;
  size?: string;
}

interface DocCategory {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

interface DocRole {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface DocTopic {
  id: number;
  name: string;
  color: string;
}

interface DocArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  role: string;
  topic: string;
  status: "draft" | "published" | "archived";
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  views: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  attachments: DocAttachment[];
  relatedArticles?: number[];
  order: number;
  featured: boolean;
}

const sampleCategories: DocCategory[] = [
  { id: 1, name: "الأسئلة الشائعة", icon: <FaQuestionCircle />, color: "#2196f3", count: 12 },
  { id: 2, name: "أدلة المستخدم", icon: <FaBook />, color: "#9c27b0", count: 8 },
  { id: 3, name: "برامج تعليمية", icon: <FaGraduationCap />, color: "#ffc800", count: 15 },
  { id: 4, name: "السياسات والشروط", icon: <FaShieldAlt />, color: "#4caf50", count: 5 },
  { id: 5, name: "المدونات", icon: <FaFileAlt />, color: "#ff5722", count: 20 },
  { id: 6, name: "التحديثات", icon: <FaClock />, color: "#00bcd4", count: 7 },
];

const sampleRoles: DocRole[] = [
  { id: 1, name: "طالب", icon: <FaUser />, color: "#2196f3" },
  { id: 2, name: "معلم", icon: <FaChalkboardTeacher />, color: "#9c27b0" },
  { id: 3, name: "مدير", icon: <FaCog />, color: "#ffc800" },
  { id: 4, name: "دعم فني", icon: <FaHeadset />, color: "#4caf50" },
  { id: 5, name: "جميع الأدوار", icon: <FaUsers />, color: "#ff5722" },
];

const sampleTopics: DocTopic[] = [
  { id: 1, name: "تسجيل الدخول والحساب", color: "#2196f3" },
  { id: 2, name: "الدورات والتعلم", color: "#9c27b0" },
  { id: 3, name: "الاختبارات والتقييم", color: "#ffc800" },
  { id: 4, name: "الاشتراكات والدفع", color: "#4caf50" },
  { id: 5, name: "الشهادات", color: "#ff5722" },
  { id: 6, name: "التقارير والإحصائيات", color: "#00bcd4" },
  { id: 7, name: "الإعدادات والخصوصية", color: "#795548" },
  { id: 8, name: "المشاكل التقنية", color: "#f44336" },
];

const sampleArticles: DocArticle[] = [
  {
    id: 1,
    title: "كيف أبدأ استخدام المنصة؟",
    content: "مرحباً بك في منصة التعلمaccessible! هذا الدليل سيوضح لك كيفية البدء...",
    excerpt: "دليل شامل untuk memulai استخدام المنصة untuk المبتدئين",
    category: "الأسئلة الشائعة",
    role: "طالب",
    topic: "تسجيل الدخول والحساب",
    status: "published",
    author: "أحمد محمد",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
    publishedAt: "2024-01-15",
    views: 1250,
    rating: 4.8,
    ratingCount: 45,
    tags: ["مبتدئ", "بداية", "أساسيات"],
    attachments: [],
    order: 1,
    featured: true,
  },
  {
    id: 2,
    title: "دليل تفعيل الاشتراك المتميز",
    content: "يشرح هذا الدليل خطوات تفعيل الاشتراك المتميز والميزاتincluded...",
    excerpt: "Learn how to activate your premium subscription",
    category: "أدلة المستخدم",
    role: "طالب",
    topic: "الاشتراكات والدفع",
    status: "published",
    author: "سارة أحمد",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-05",
    publishedAt: "2024-02-01",
    views: 890,
    rating: 4.5,
    ratingCount: 32,
    tags: ["اشتراك", "متميز", "تفعيل"],
    attachments: [
      { id: 1, name: "guide.pdf", type: "document", url: "#", size: "2.5 MB" },
    ],
    order: 2,
    featured: true,
  },
  {
    id: 3,
    title: "كيفية حل مشاكل تسجيل الدخول",
    content: "إذا كنت تواجه مشاكل في تسجيل الدخول، اتبع هذه الخطوات...",
    excerpt: "Troubleshoot login issues with this guide",
    category: "الأسئلة الشائعة",
    role: "جميع الأدوار",
    topic: "تسجيل الدخول والحساب",
    status: "published",
    author: "أحمد محمد",
    createdAt: "2024-01-20",
    updatedAt: "2024-02-28",
    publishedAt: "2024-01-20",
    views: 2100,
    rating: 4.9,
    ratingCount: 78,
    tags: ["تسجيل دخول", "مشاكل", "حلول"],
    attachments: [],
    order: 3,
    featured: false,
  },
  {
    id: 4,
    title: "شرح لوحة التحكم للمعلمين",
    content: "مقال شامل عن كيفية استخدام لوحة التحكم للمعلمين...",
    excerpt: "Complete guide to instructor dashboard",
    category: "برامج تعليمية",
    role: "معلم",
    topic: "الدورات والتعلم",
    status: "published",
    author: "خالد عمر",
    createdAt: "2024-02-10",
    updatedAt: "2024-03-01",
    publishedAt: "2024-02-10",
    views: 560,
    rating: 4.3,
    ratingCount: 18,
    tags: ["معلم", "لوحة التحكم", "شرح"],
    attachments: [
      { id: 1, name: "dashboard.png", type: "image", url: "#", size: "1.2 MB" },
    ],
    order: 4,
    featured: false,
  },
  {
    id: 5,
    title: "سياسة الخصوصية",
    content: "سياسة الخصوصية الكاملة لمنصة accessible learning...",
    excerpt: "Complete privacy policy document",
    category: "السياسات والشروط",
    role: "جميع الأدوار",
    topic: "الإعدادات والخصوصية",
    status: "published",
    author: "فريق الدعم",
    createdAt: "2023-12-01",
    updatedAt: "2024-01-15",
    publishedAt: "2023-12-01",
    views: 320,
    rating: 4.0,
    ratingCount: 5,
    tags: ["خصوصية", "سياسة", "legal"],
    attachments: [],
    order: 5,
    featured: false,
  },
  {
    id: 6,
    title: "أفضل الممارسات في التعلم الإلكتروني",
    content: "نصائح وإرشادات untuk getting the most out of online learning...",
    excerpt: "Tips and best practices for online learning success",
    category: "المدونات",
    role: "طالب",
    topic: "الدورات والتعلم",
    status: "published",
    author: "منى علي",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-15",
    publishedAt: "2024-03-01",
    views: 680,
    rating: 4.7,
    ratingCount: 25,
    tags: ["نصائح", "تعلم", "أفضل الممارسات"],
    attachments: [],
    order: 6,
    featured: true,
  },
  {
    id: 7,
    title: "تحديثات مارس 2024",
    content: "ما الجديد في تحديثات شهر مارس 2024...",
    excerpt: "What's new in March 2024 update",
    category: "التحديثات",
    role: "جميع الأدوار",
    topic: "الدورات والتعلم",
    status: "published",
    author: "فريق التطوير",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01",
    publishedAt: "2024-03-01",
    views: 420,
    rating: 4.2,
    ratingCount: 12,
    tags: ["تحديث", "مارس", "جديد"],
    attachments: [],
    order: 7,
    featured: false,
  },
  {
    id: 8,
    title: "دليل استخدام الفيديوهات التعليمية",
    content: "Learn how to effectively use educational videos...",
    excerpt: "Complete guide to using educational videos",
    category: "برامج تعليمية",
    role: "معلم",
    topic: "الدورات والتعلم",
    status: "draft",
    author: "أحمد محمد",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-15",
    views: 0,
    rating: 0,
    ratingCount: 0,
    tags: ["فيديو", "تعليم", "شرح"],
    attachments: [],
    order: 8,
    featured: false,
  },
  {
    id: 9,
    title: "شروط الاستخدام",
    content: "Terms and conditions for using the platform...",
    excerpt: "Terms and conditions document",
    category: "السياسات والشروط",
    role: "جميع الأدوار",
    topic: "الإعدادات والخصوصية",
    status: "archived",
    author: "فريق القانون",
    createdAt: "2023-06-01",
    updatedAt: "2023-12-01",
    publishedAt: "2023-06-01",
    views: 150,
    rating: 3.8,
    ratingCount: 3,
    tags: ["شروط", "استخدام", "legal"],
    attachments: [],
    order: 9,
    featured: false,
  },
  {
    id: 10,
    title: "دليل إدارة الطلاب للمعلمين",
    content: "Learn how to manage your students effectively...",
    excerpt: "Complete guide to student management",
    category: "أدلة المستخدم",
    role: "معلم",
    topic: "الدورات والتعلم",
    status: "published",
    author: "خالد عمر",
    createdAt: "2024-02-15",
    updatedAt: "2024-03-01",
    publishedAt: "2024-02-15",
    views: 340,
    rating: 4.6,
    ratingCount: 15,
    tags: ["إدارة طلاب", "معلم", "شرح"],
    attachments: [],
    order: 10,
    featured: false,
  },
  {
    id: 11,
    title: "كيفية إنشاء اختبار",
    content: "دليل شامل لإنشاء الاختبارات وتقييم الطلاب...",
    excerpt: "Guide to creating exams and assessments",
    category: "برامج تعليمية",
    role: "معلم",
    topic: "الاختبارات والتقييم",
    status: "published",
    author: "سارة أحمد",
    createdAt: "2024-02-20",
    updatedAt: "2024-03-05",
    publishedAt: "2024-02-20",
    views: 450,
    rating: 4.4,
    ratingCount: 20,
    tags: ["اختبار", "تقييم", "إنشاء"],
    attachments: [],
    order: 11,
    featured: false,
  },
  {
    id: 12,
    title: "تقارير أداء الطلاب للمعلمين",
    content: "كيفية استخدام تقارير الأداء لفهم تقدم طلابك...",
    excerpt: "Student performance reports guide",
    category: "برامج تعليمية",
    role: "معلم",
    topic: "التقارير والإحصائيات",
    status: "published",
    author: "أحمد محمد",
    createdAt: "2024-01-25",
    updatedAt: "2024-02-15",
    publishedAt: "2024-01-25",
    views: 280,
    rating: 4.1,
    ratingCount: 10,
    tags: ["تقارير", "أداء", "إحصائيات"],
    attachments: [],
    order: 12,
    featured: false,
  },
  {
    id: 13,
    title: "لوحة تحكم المدير - نظرة عامة",
    content: "شرح شامل للوحة تحكم المدير وإدارتها...",
    excerpt: "Admin dashboard overview and guide",
    category: "أدلة المستخدم",
    role: "مدير",
    topic: "التقارير والإحصائيات",
    status: "published",
    author: "فريق الدعم",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-01",
    publishedAt: "2024-01-10",
    views: 520,
    rating: 4.7,
    ratingCount: 22,
    tags: ["مدير", "لوحة التحكم", "إدارة"],
    attachments: [],
    order: 13,
    featured: true,
  },
  {
    id: 14,
    title: "إدارة المستخدمين والمpermissions",
    content: "كيفية إضافة المستخدمين وإدارة صلاحياتهم...",
    excerpt: "User management and permissions guide",
    category: "برامج تعليمية",
    role: "مدير",
    topic: "تسجيل الدخول والحساب",
    status: "published",
    author: "خالد عمر",
    createdAt: "2024-02-05",
    updatedAt: "2024-03-01",
    publishedAt: "2024-02-05",
    views: 380,
    rating: 4.5,
    ratingCount: 14,
    tags: ["مستخدمين", "صلاحيات", "إدارة"],
    attachments: [],
    order: 14,
    featured: false,
  },
  {
    id: 15,
    title: "كيفية حل المشاكل التقنية الشائعة",
    content: "دليل解决问题的 solution for common technical issues...",
    excerpt: "Troubleshooting guide for common issues",
    category: "الأسئلة الشائعة",
    role: "دعم فني",
    topic: "المشاكل التقنية",
    status: "published",
    author: "فريق الدعم",
    createdAt: "2024-01-05",
    updatedAt: "2024-03-10",
    publishedAt: "2024-01-05",
    views: 1800,
    rating: 4.9,
    ratingCount: 65,
    tags: ["مشاكل", "تقنية", "حلول"],
    attachments: [],
    order: 15,
    featured: false,
  },
];

const SupportDocsPage = () => {
  const [articles, setArticles] = useState<DocArticle[]>(sampleArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<boolean | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<DocArticle | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "views" | "title" | "rating">("date");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  const [newArticle, setNewArticle] = useState<Partial<DocArticle>>({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    role: "",
    topic: "",
    status: "draft",
    tags: [],
    attachments: [],
    featured: false,
  });

  const filteredArticles = articles
    .filter((article) => {
      if (categoryFilter !== "all" && article.category !== categoryFilter) return false;
      if (roleFilter !== "all" && article.role !== roleFilter) return false;
      if (topicFilter !== "all" && article.topic !== topicFilter) return false;
      if (statusFilter !== "all" && article.status !== statusFilter) return false;
      if (featuredFilter !== null && article.featured !== featuredFilter) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          article.title.toLowerCase().includes(term) ||
          article.content.toLowerCase().includes(term) ||
          article.tags.some((tag) => tag.toLowerCase().includes(term))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "views":
          return b.views - a.views;
        case "title":
          return a.title.localeCompare(b.title);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    drafts: articles.filter((a) => a.status === "draft").length,
    archived: articles.filter((a) => a.status === "archived").length,
    featured: articles.filter((a) => a.featured).length,
    totalViews: articles.reduce((acc, a) => acc + a.views, 0),
  };

  const handleSaveArticle = () => {
    if (!newArticle.title || !newArticle.category || !newArticle.role || !newArticle.topic) return;

    const now = new Date().toISOString().split("T")[0];
    const article: DocArticle = {
      id: Date.now(),
      title: newArticle.title,
      content: newArticle.content || "",
      excerpt: newArticle.excerpt || newArticle.content?.substring(0, 100) + "..." || "",
      category: newArticle.category,
      role: newArticle.role,
      topic: newArticle.topic,
      status: newArticle.status as "draft" | "published" | "archived" || "draft",
      author: "أحمد محمد",
      createdAt: now,
      updatedAt: now,
      publishedAt: newArticle.status === "published" ? now : undefined,
      views: 0,
      rating: 0,
      ratingCount: 0,
      tags: newArticle.tags || [],
      attachments: newArticle.attachments || [],
      order: articles.length + 1,
      featured: newArticle.featured || false,
    };

    setArticles([article, ...articles]);
    setShowArticleModal(false);
    setNewArticle({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      role: "",
      topic: "",
      status: "draft",
      tags: [],
      attachments: [],
      featured: false,
    });
  };

  const handleEditArticle = (article: DocArticle) => {
    setNewArticle(article);
    setShowArticleModal(true);
  };

  const handleUpdateArticle = () => {
    if (!newArticle.id || !newArticle.title) return;

    const now = new Date().toISOString().split("T")[0];
    setArticles((prev) =>
      prev.map((a) =>
        a.id === newArticle.id
          ? {
              ...a,
              ...newArticle,
              updatedAt: now,
              publishedAt: newArticle.status === "published" && !a.publishedAt ? now : a.publishedAt,
            }
          : a
      )
    );
    setShowArticleModal(false);
    setNewArticle({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      status: "draft",
      tags: [],
      attachments: [],
      featured: false,
    });
  };

  const handleDeleteArticle = (id: number) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setShowDeleteConfirm(false);
    setArticleToDelete(null);
  };

  const handleToggleFeatured = (id: number) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a))
    );
  };

  const handlePublishArticle = (id: number) => {
    const now = new Date().toISOString().split("T")[0];
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "published" as const, publishedAt: now, updatedAt: now }
          : a
      )
    );
  };

  const handleArchiveArticle = (id: number) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "archived" as const, updatedAt: new Date().toISOString().split("T")[0] }
          : a
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return { bg: "rgba(88, 204, 2, 0.1)", color: "var(--success)", label: "منشور" };
      case "draft":
        return { bg: "rgba(255, 193, 7, 0.1)", color: "#ffc800", label: "مسودة" };
      case "archived":
        return { bg: "rgba(158, 158, 158, 0.1)", color: "var(--text-light)", label: "مؤرشف" };
      default:
        return { bg: "var(--surface-elevated)", color: "var(--text)", label: status };
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = sampleCategories.find((c) => c.name === category);
    return cat?.color || "var(--primary)";
  };

  return (
    <div className="p-4" style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 70px)" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold" style={{ color: "var(--text)" }}>إدارة المقالات والوثائق</h4>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>إدارة قاعدة المعرفة والمقالات التعليمية</p>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="btn d-flex align-items-center gap-2"
            style={{ backgroundColor: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 16px" }}
          >
            {viewMode === "list" ? <FaFolder /> : <FaFileAlt />}
          </button>
          <button
            onClick={() => {
              setNewArticle({
                title: "",
                content: "",
                excerpt: "",
                category: "",
                status: "draft",
                tags: [],
                attachments: [],
                featured: false,
              });
              setShowArticleModal(true);
            }}
            className="btn d-flex align-items-center gap-2"
            style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "10px 16px" }}
          >
            <FaPlus /> إضافة مقال
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-2 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaFileAlt style={{ color: "var(--primary)", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>الإجمالي</span>
            </div>
            <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.5rem" }}>{stats.total}</div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", border: "1px solid var(--primary)" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaCheckCircle style={{ color: "var(--success)", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>منشور</span>
            </div>
            <div className="fw-bold" style={{ color: "var(--success)", fontSize: "1.5rem" }}>{stats.published}</div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(255, 193, 7, 0.1)", border: "1px solid #ffc800" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaDraftingCompass style={{ color: "#ffc800", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>مسودات</span>
            </div>
            <div className="fw-bold" style={{ color: "#ffc800", fontSize: "1.5rem" }}>{stats.drafts}</div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(158, 158, 158, 0.1)", border: "1px solid var(--text-light)" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaArchive style={{ color: "var(--text-light)", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>مؤرشف</span>
            </div>
            <div className="fw-bold" style={{ color: "var(--text-light)", fontSize: "1.5rem" }}>{stats.archived}</div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", border: "1px solid #9c27b0" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaStar style={{ color: "#9c27b0", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>مميز</span>
            </div>
            <div className="fw-bold" style={{ color: "#9c27b0", fontSize: "1.5rem" }}>{stats.featured}</div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", border: "1px solid #2196f3" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaEye style={{ color: "#2196f3", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>المشاهدات</span>
            </div>
            <div className="fw-bold" style={{ color: "#2196f3", fontSize: "1.5rem" }}>{stats.totalViews.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded mb-4" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="d-flex gap-3 mb-3 flex-wrap align-items-center">
          <div className="position-relative flex-grow-1" style={{ maxWidth: "400px" }}>
            <FaSearch className="position-absolute" style={{ right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", fontSize: "0.85rem" }} />
            <input
              type="text"
              placeholder="بحث في المقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{
                borderRadius: "20px",
                backgroundColor: "var(--surface-elevated)",
                border: "2px solid var(--border)",
                paddingRight: "40px",
                color: "var(--text)",
                fontSize: "0.9rem",
                height: "42px",
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: showFilters ? "var(--primary)" : "var(--surface-elevated)",
              color: showFilters ? "white" : "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "10px 20px",
            }}
          >
            <FaFilter /> فلترة
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="form-select"
            style={{
              width: "150px",
              borderRadius: "12px",
              backgroundColor: "var(--surface-elevated)",
              border: "2px solid var(--border)",
              color: "var(--text)",
            }}
          >
            <option value="date">الأحدث</option>
            <option value="views">الأكثر مشاهدة</option>
            <option value="title">الاسم</option>
            <option value="rating">التقييم</option>
          </select>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-top" style={{ borderColor: "var(--border)" }}>
                <div className="row g-3">
                  <div className="col-md-2">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>الدور</label>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      {sampleRoles.map((role) => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>الموضوع</label>
                    <select
                      value={topicFilter}
                      onChange={(e) => setTopicFilter(e.target.value)}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      {sampleTopics.map((topic) => (
                        <option key={topic.id} value={topic.name}>{topic.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>الفئة</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      {sampleCategories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>الحالة</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      <option value="published">منشور</option>
                      <option value="draft">مسودة</option>
                      <option value="archived">مؤرشف</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>مميز</label>
                    <select
                      value={featuredFilter === null ? "all" : featuredFilter ? "featured" : "notFeatured"}
                      onChange={(e) => setFeaturedFilter(e.target.value === "all" ? null : e.target.value === "featured")}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      <option value="featured">مميز فقط</option>
                      <option value="notFeatured">غير مميز</option>
                    </select>
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button
                      onClick={() => {
                        setRoleFilter("all");
                        setTopicFilter("all");
                        setCategoryFilter("all");
                        setStatusFilter("all");
                        setFeaturedFilter(null);
                        setSearchTerm("");
                      }}
                      className="btn w-100"
                      style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "12px" }}
                    >
                      إعادة تعيين
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {viewMode === "list" ? (
        <div className="d-flex flex-column gap-3">
          {filteredArticles.length === 0 ? (
            <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
              <FaFileAlt size={48} className="mb-3 opacity-50" />
              <p>لا توجد مقالات</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
                  <div className="d-flex align-items-start gap-3 flex-grow-1">
                    <div
                      className="rounded d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: `${getCategoryColor(article.category)}20`,
                        color: getCategoryColor(article.category),
                        flexShrink: 0,
                      }}
                    >
                      <FaFileAlt />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="fw-bold mb-0" style={{ color: "var(--text)" }}>{article.title}</h5>
                        {article.featured && (
                          <span className="badge" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", color: "#9c27b0", fontSize: "0.7rem" }}>
                            <FaStar className="ms-1" /> مميز
                          </span>
                        )}
                      </div>
                      <p className="mb-2" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{article.excerpt}</p>
                      <div className="d-flex align-items-center gap-3 flex-wrap">
                        <span
                          className="badge"
                          style={{ backgroundColor: `${getCategoryColor(article.category)}20`, color: getCategoryColor(article.category), fontSize: "0.75rem" }}
                        >
                          {article.category}
                        </span>
                        <span className="badge" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", fontSize: "0.7rem" }}>
                          {article.role}
                        </span>
                        <span className="badge" style={{ backgroundColor: "rgba(255, 152, 0, 0.1)", color: "#ff9800", fontSize: "0.7rem" }}>
                          {article.topic}
                        </span>
                        <span className="badge" style={{ backgroundColor: getStatusColor(article.status).bg, color: getStatusColor(article.status).color, fontSize: "0.75rem" }}>
                          {getStatusColor(article.status).label}
                        </span>
                        <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }} className="d-flex align-items-center gap-1">
                          <FaUser /> {article.author}
                        </span>
                        <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }} className="d-flex align-items-center gap-1">
                          <FaClock /> {article.updatedAt}
                        </span>
                        <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }} className="d-flex align-items-center gap-1">
                          <FaEye /> {article.views}
                        </span>
                        {article.rating > 0 && (
                          <span style={{ color: "#ffc800", fontSize: "0.75rem" }} className="d-flex align-items-center gap-1">
                            <FaStar /> {article.rating} ({article.ratingCount})
                          </span>
                        )}
                      </div>
                      {article.tags.length > 0 && (
                        <div className="mt-2 d-flex gap-1 flex-wrap">
                          {article.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="badge"
                              style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text-light)", fontSize: "0.65rem" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setShowPreviewModal(true);
                      }}
                      className="btn d-flex align-items-center gap-1"
                      style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 12px", fontSize: "0.8rem" }}
                    >
                      <FaEye /> عرض
                    </button>
                    <button
                      onClick={() => {
                        setNewArticle(article);
                        setShowArticleModal(true);
                      }}
                      className="btn d-flex align-items-center gap-1"
                      style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "8px", padding: "8px 12px", fontSize: "0.8rem" }}
                    >
                      <FaEdit /> تعديل
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(article.id)}
                      className="btn d-flex align-items-center justify-content-center"
                      style={{ width: "36px", height: "36px", backgroundColor: article.featured ? "rgba(156, 39, 176, 0.1)" : "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "8px" }}
                      title={article.featured ? "إلغاء التمييز" : "تمييز"}
                    >
                      <FaStar style={{ color: article.featured ? "#9c27b0" : "var(--text-light)" }} />
                    </button>
                    {article.status === "draft" && (
                      <button
                        onClick={() => handlePublishArticle(article.id)}
                        className="btn d-flex align-items-center gap-1"
                        style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--success)", border: "1px solid var(--success)", borderRadius: "8px", padding: "8px 12px", fontSize: "0.8rem" }}
                      >
                        <FaCheck /> نشر
                      </button>
                    )}
                    {article.status === "published" && (
                      <button
                        onClick={() => handleArchiveArticle(article.id)}
                        className="btn d-flex align-items-center gap-1"
                        style={{ backgroundColor: "rgba(158, 158, 158, 0.1)", color: "var(--text-light)", border: "1px solid var(--text-light)", borderRadius: "8px", padding: "8px 12px", fontSize: "0.8rem" }}
                      >
                        <FaArchive /> أرشفة
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setArticleToDelete(article.id);
                        setShowDeleteConfirm(true);
                      }}
                      className="btn d-flex align-items-center justify-content-center"
                      style={{ width: "36px", height: "36px", backgroundColor: "rgba(220, 53, 69, 0.1)", border: "1px solid var(--danger)", borderRadius: "8px" }}
                    >
                      <FaTrash style={{ color: "var(--danger)", fontSize: "0.8rem" }} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="row g-3">
          {filteredArticles.map((article) => (
            <div key={article.id} className="col-md-4 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded h-100"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedArticle(article);
                  setShowPreviewModal(true);
                }}
              >
                <div
                  className="rounded d-flex align-items-center justify-content-center mb-3"
                  style={{
                    height: "120px",
                    backgroundColor: `${getCategoryColor(article.category)}15`,
                    color: getCategoryColor(article.category),
                  }}
                >
                  <FaFileAlt size={40} />
                </div>
                <h6 className="fw-bold mb-2" style={{ color: "var(--text)" }}>{article.title}</h6>
                <p className="mb-2" style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>{article.excerpt.substring(0, 60)}...</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge" style={{ backgroundColor: getStatusColor(article.status).bg, color: getStatusColor(article.status).color, fontSize: "0.7rem" }}>
                    {getStatusColor(article.status).label}
                  </span>
                  <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }} className="d-flex align-items-center gap-1">
                    <FaEye /> {article.views}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showArticleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2000 }}
            onClick={() => setShowArticleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded p-4"
              style={{ backgroundColor: "var(--surface)", width: "90%", maxWidth: "700px", maxHeight: "90vh", overflow: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold" style={{ color: "var(--text)" }}>
                  {newArticle.id ? "تعديل المقال" : "إضافة مقال جديد"}
                </h4>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{ width: "36px", height: "36px", backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "8px" }}
                >
                  <FaTimes style={{ color: "var(--text-light)" }} />
                </button>
              </div>

              <div className="d-flex flex-column gap-3">
                <div>
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>العنوان *</label>
                  <input
                    type="text"
                    value={newArticle.title || ""}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="form-control"
                    placeholder="أدخل عنوان المقال"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الوصف المختصر</label>
                  <textarea
                    value={newArticle.excerpt || ""}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    className="form-control"
                    placeholder="أدخل وصفاً مختصراً للمقال"
                    rows={2}
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  />
                </div>

                <div>
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>المحتوى</label>
                  <textarea
                    value={newArticle.content || ""}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="form-control"
                    placeholder="أدخل محتوى المقال..."
                    rows={8}
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الدور *</label>
                    <select
                      value={newArticle.role || ""}
                      onChange={(e) => setNewArticle({ ...newArticle, role: e.target.value })}
                      className="form-select"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    >
                      <option value="">اختر الدور</option>
                      {sampleRoles.map((role) => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الموضوع *</label>
                    <select
                      value={newArticle.topic || ""}
                      onChange={(e) => setNewArticle({ ...newArticle, topic: e.target.value })}
                      className="form-select"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    >
                      <option value="">اختر الموضوع</option>
                      {sampleTopics.map((topic) => (
                        <option key={topic.id} value={topic.name}>{topic.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الفئة *</label>
                    <select
                      value={newArticle.category || ""}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                      className="form-select"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    >
                      <option value="">اختر الفئة</option>
                      {sampleCategories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الحالة</label>
                    <select
                      value={newArticle.status || "draft"}
                      onChange={(e) => setNewArticle({ ...newArticle, status: e.target.value as any })}
                      className="form-select"
                      style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                    >
                      <option value="draft">مسودة</option>
                      <option value="published">منشور</option>
                      <option value="archived">مؤرشف</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الوسوم (افصل بينها بفواصل)</label>
                  <input
                    type="text"
                    value={newArticle.tags?.join(", ") || ""}
                    onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                    className="form-control"
                    placeholder="مثال: تعليم, برمجة, فيديو"
                    style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                  />
                </div>

                <div className="d-flex align-items-center gap-2 p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={newArticle.featured || false}
                    onChange={(e) => setNewArticle({ ...newArticle, featured: e.target.checked })}
                    style={{ width: "18px", height: "18px" }}
                  />
                  <label htmlFor="featured-check" style={{ color: "var(--text)", cursor: "pointer" }}>تمييز هذا المقال</label>
                </div>

                <div className="d-flex gap-2 justify-content-end mt-3">
                  <button
                    onClick={() => setShowArticleModal(false)}
                    className="btn d-flex align-items-center gap-2"
                    style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 20px" }}
                  >
                    <FaTimes /> إلغاء
                  </button>
                  <button
                    onClick={newArticle.id ? handleUpdateArticle : handleSaveArticle}
                    className="btn d-flex align-items-center gap-2"
                    style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "10px 20px" }}
                  >
                    <FaSave /> {newArticle.id ? "حفظ التغييرات" : "إضافة المقال"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPreviewModal && selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2000 }}
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded p-4"
              style={{ backgroundColor: "var(--surface)", width: "90%", maxWidth: "800px", maxHeight: "90vh", overflow: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge" style={{ backgroundColor: `${getCategoryColor(selectedArticle.category)}20`, color: getCategoryColor(selectedArticle.category), fontSize: "0.8rem" }}>
                    {selectedArticle.category}
                  </span>
                  <span className="badge" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", fontSize: "0.8rem" }}>
                    {selectedArticle.role}
                  </span>
                  <span className="badge" style={{ backgroundColor: "rgba(255, 152, 0, 0.1)", color: "#ff9800", fontSize: "0.8rem" }}>
                    {selectedArticle.topic}
                  </span>
                  <span className="badge" style={{ backgroundColor: getStatusColor(selectedArticle.status).bg, color: getStatusColor(selectedArticle.status).color, fontSize: "0.8rem" }}>
                    {getStatusColor(selectedArticle.status).label}
                  </span>
                  {selectedArticle.featured && (
                    <span className="badge" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", color: "#9c27b0" }}>
                      <FaStar className="ms-1" /> مميز
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{ width: "36px", height: "36px", backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "8px" }}
                >
                  <FaTimes style={{ color: "var(--text-light)" }} />
                </button>
              </div>

              <h3 className="fw-bold mb-3" style={{ color: "var(--text)" }}>{selectedArticle.title}</h3>

              <div className="d-flex gap-4 mb-4 flex-wrap" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                <span className="d-flex align-items-center gap-2"><FaUser /> {selectedArticle.author}</span>
                <span className="d-flex align-items-center gap-2"><FaCalendarAlt /> {selectedArticle.createdAt}</span>
                <span className="d-flex align-items-center gap-2"><FaClock /> آخر تحديث: {selectedArticle.updatedAt}</span>
                <span className="d-flex align-items-center gap-2"><FaEye /> {selectedArticle.views} مشاهدة</span>
                {selectedArticle.rating > 0 && (
                  <span className="d-flex align-items-center gap-2" style={{ color: "#ffc800" }}>
                    <FaStar /> {selectedArticle.rating} ({selectedArticle.ratingCount} تقييم)
                  </span>
                )}
              </div>

              <div className="mb-4" style={{ color: "var(--text)", lineHeight: "1.8" }}>
                {selectedArticle.content || "لا يوجد محتوى"}
              </div>

              {selectedArticle.tags.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex gap-1 flex-wrap">
                    {selectedArticle.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="badge"
                        style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text-light)", fontSize: "0.75rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedArticle.attachments.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-2" style={{ color: "var(--text)" }}>المرفقات</h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {selectedArticle.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="d-flex align-items-center gap-2 p-2 rounded"
                        style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}
                      >
                        {att.type === "image" ? <FaImage style={{ color: "#2196f3" }} /> : 
                         att.type === "video" ? <FaVideo style={{ color: "#ef4444" }} /> : 
                         <FaFileAlt style={{ color: "var(--primary)" }} />}
                        <span style={{ color: "var(--text)", fontSize: "0.85rem" }}>{att.name}</span>
                        {att.size && <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>({att.size})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="d-flex gap-2 justify-content-end pt-3 border-top" style={{ borderColor: "var(--border)" }}>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    setNewArticle(selectedArticle);
                    setShowArticleModal(true);
                  }}
                  className="btn d-flex align-items-center gap-2"
                  style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "8px", padding: "10px 20px" }}
                >
                  <FaEdit /> تعديل
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2000 }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded p-4 text-center"
              style={{ backgroundColor: "var(--surface)", width: "90%", maxWidth: "400px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px", backgroundColor: "rgba(220, 53, 69, 0.1)" }}>
                <FaTrash style={{ color: "var(--danger)", fontSize: "1.5rem" }} />
              </div>
              <h5 className="fw-bold mb-2" style={{ color: "var(--text)" }}>حذف المقال</h5>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="d-flex gap-2 justify-content-center mt-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn d-flex align-items-center gap-2"
                  style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 20px" }}
                >
                  <FaTimes /> إلغاء
                </button>
                <button
                  onClick={() => articleToDelete && handleDeleteArticle(articleToDelete)}
                  className="btn d-flex align-items-center gap-2"
                  style={{ backgroundColor: "var(--danger)", color: "white", borderRadius: "8px", padding: "10px 20px" }}
                >
                  <FaTrash /> حذف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SupportDocsPage;