import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaUserGraduate,
  FaBook,
  FaFileAlt,
  FaTrashAlt,
  FaRedo,
  FaPlus,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaHistory,
  FaEye,
  FaFilter,
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaAward,
  FaTrophy,
  FaPlay,
  FaPause,
  FaCheck,
  FaBan,
  FaMoneyBillWave,
  FaBell,
  FaCog,
  FaInfoCircle,
  FaChartBar,
  FaLevelUpAlt,
  FaFileDownload,
  FaVideo,
  FaTasks,
  FaComment,
  FaPaperPlane,
  FaSave,
  FaBellSlash,
  FaFileInvoice,
  FaCreditCard,
  FaRegListAlt,
  FaUserEdit,
  FaTrash,
  FaCertificate,
  FaChalkboardTeacher,
  FaTags,
  FaChartPie,
  FaCalendarCheck,
  FaUserClock,
  FaExchangeAlt,
  FaDownload,
  FaPrint,
  FaUndo,
  FaUserPlus,
  FaUserCheck,
  FaMapMarkedAlt,
  FaSchool,
  FaClipboardList,
  FaProjectDiagram,
  FaCheckSquare,
  FaSquare,
  FaSortNumericDown,
  FaStopwatch,
  FaBrain,
  FaFileContract,
  FaSpellCheck,
  FaBalanceScale,
  FaListOl,
  FaQuestion,
  FaExclamation,
  FaBalanceScaleLeft,
  FaUserTag,
  FaBirthdayCake,
  FaTransgender,
  FaWheelchair,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaLock,
  FaUnlock,
  FaUserSlash,
} from "react-icons/fa";

interface Course {
  id: number;
  name: string;
  progress: number;
  enrolledDate: string;
  lastActivity: string;
  instructor: string;
  status: "active" | "completed" | "paused";
  duration: string;
  lessonsCompleted: number;
  totalLessons: number;
}

interface ExamQuestion {
  id: number;
  question: string;
  questionType: "multiple_choice" | "true_false" | "short_answer" | "essay";
  studentAnswer: string;
  correctAnswer: string;
  points: number;
  earnedPoints: number;
  feedback?: string;
  timeSpent?: string;
}

interface ExamAttempt {
  id: number;
  attemptNumber: number;
  startedAt: string;
  completedAt: string | null;
  timeSpent: string;
  score: number;
  passed: boolean;
  answers: ExamQuestion[];
  gradedBy?: string;
  gradedAt?: string;
  notes?: string;
}

interface Exam {
  id: number;
  courseName: string;
  title: string;
  date: string;
  score: number;
  passed: boolean;
  attempts: number;
  maxAttempts: number;
  timeSpent: string;
  gradedAt: string | null;
  duration: number;
  totalPoints: number;
  passingScore: number;
  questionsCount: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedQuestions: number;
  lastAttempt?: ExamAttempt;
  allAttempts?: ExamAttempt[];
}

interface Subscription {
  plan: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  price: number;
  currency: string;
  features: string[];
}

interface Activity {
  id: number;
  type: "course_started" | "exam_passed" | "course_completed" | "lesson_completed" | "certificate_earned";
  title: string;
  date: string;
  details?: string;
}

interface Payment {
  id: number;
  amount: number;
  currency: string;
  date: string;
  status: "completed" | "pending" | "failed" | "refunded";
  method: string;
  invoiceNumber: string;
  description: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  date: string;
  read: boolean;
  actionUrl?: string;
}

interface Message {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
}

interface Certificate {
  id: number;
  courseName: string;
  issueDate: string;
  expiryDate: string | null;
  status: "active" | "expired" | "revoked";
  certificateNumber: string;
}

interface SessionLog {
  id: number;
  action: "login" | "logout" | "course_access" | "exam_start" | "video_watch";
  timestamp: string;
  details?: string;
  ipAddress?: string;
  device?: string;
}

interface LearningPath {
  id: number;
  title: string;
  courses: string[];
  progress: number;
  recommendedDate: string;
}

interface StudentTag {
  id: number;
  name: string;
  color: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  lastLogout?: string;
  status: "active" | "inactive" | "suspended";
  enrolledCourses: Course[];
  exams: Exam[];
  totalProgress: number;
  subscription: "free" | "premium" | "enterprise";
  subscriptionDetails?: Subscription;
  activities?: Activity[];
  payments?: Payment[];
  notifications?: Notification[];
  messages?: Message[];
  notes?: string;
  emergencyContact?: string;
  disabilityType?: string;
  certificates?: Certificate[];
  sessionLogs?: SessionLog[];
  learningPath?: LearningPath;
  tags?: StudentTag[];
  dateOfBirth?: string;
  gender?: string;
  country?: string;
  city?: string;
  parentName?: string;
  parentPhone?: string;
  averageSessionTime?: string;
  totalWatchTime?: string;
}

const sampleStudents: Student[] = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    phone: "+966 55 123 4567",
    avatar: "أ",
    joinDate: "2024-01-15",
    lastLogin: "2024-03-15 10:30",
    status: "active",
    totalProgress: 75,
    subscription: "premium",
    subscriptionDetails: {
      plan: "متميز",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      autoRenew: true,
      price: 199,
      currency: "SAR",
      features: ["جميع الدورات", "شهادات متعددة", "دعم priorty", "جلسات مباشرة"],
    },
    enrolledCourses: [
      { id: 1, name: "البرمجة بلغة بايثون", progress: 85, enrolledDate: "2024-01-20", lastActivity: "2024-03-15", instructor: "د. سارة", status: "active", duration: "20 ساعة", lessonsCompleted: 17, totalLessons: 20 },
      { id: 2, name: "تطوير الويب المتقدم", progress: 60, enrolledDate: "2024-02-01", lastActivity: "2024-03-14", instructor: "م. محمد", status: "active", duration: "30 ساعة", lessonsCompleted: 18, totalLessons: 30 },
      { id: 3, name: "أساسيات علم البيانات", progress: 80, enrolledDate: "2024-02-15", lastActivity: "2024-03-13", instructor: "د. علي", status: "completed", duration: "25 ساعة", lessonsCompleted: 25, totalLessons: 25 },
    ],
    exams: [
      { 
        id: 1, 
        courseName: "البرمجة بلغة بايثون", 
        title: "الاختبار النهائي - الوحدة الأولى", 
        date: "2024-03-10", 
        score: 92, 
        passed: true, 
        attempts: 1, 
        maxAttempts: 3, 
        timeSpent: "45 دقيقة", 
        gradedAt: "2024-03-10",
        duration: 60,
        totalPoints: 100,
        passingScore: 60,
        questionsCount: 20,
        correctAnswers: 18,
        wrongAnswers: 2,
        skippedQuestions: 0,
        lastAttempt: {
          id: 1,
          attemptNumber: 1,
          startedAt: "2024-03-10 14:00",
          completedAt: "2024-03-10 14:45",
          timeSpent: "45 دقيقة",
          score: 92,
          passed: true,
          answers: [
            { id: 1, question: "ما هو نوع البيانات المناسب للعدد الصحيح؟", questionType: "multiple_choice", studentAnswer: "int", correctAnswer: "int", points: 5, earnedPoints: 5 },
            { id: 2, question: "هل Python لغة مترجمة؟", questionType: "true_false", studentAnswer: "خطأ", correctAnswer: "خطأ", points: 5, earnedPoints: 5 },
            { id: 3, question: "اكتب دالة لحساب مجموع رقمين", questionType: "essay", studentAnswer: "def sum(a,b): return a+b", correctAnswer: "def sum(a, b): return a + b", points: 10, earnedPoints: 10, feedback: "إجابة ممتازة" },
            { id: 4, question: "ما هوامر الطباعة في بايثون؟", questionType: "multiple_choice", studentAnswer: "print()", correctAnswer: "print()", points: 5, earnedPoints: 5 },
            { id: 5, question: "هل القوائم قابلة للتغيير؟", questionType: "true_false", studentAnswer: "صحيح", correctAnswer: "صحيح", points: 5, earnedPoints: 5 },
          ],
          gradedBy: "د. سارة",
          gradedAt: "2024-03-10 15:30",
          notes: "أداء ممتاز في المفاهيم الأساسية"
        }
      },
      { 
        id: 2, 
        courseName: "تطوير الويب المتقدم", 
        title: "اختبار HTML و CSS", 
        date: "2024-03-08", 
        score: 78, 
        passed: true, 
        attempts: 2, 
        maxAttempts: 2, 
        timeSpent: "35 دقيقة", 
        gradedAt: "2024-03-08",
        duration: 45,
        totalPoints: 80,
        passingScore: 50,
        questionsCount: 16,
        correctAnswers: 12,
        wrongAnswers: 3,
        skippedQuestions: 1,
        lastAttempt: {
          id: 2,
          attemptNumber: 2,
          startedAt: "2024-03-08 10:00",
          completedAt: "2024-03-08 10:35",
          timeSpent: "35 دقيقة",
          score: 78,
          passed: true,
          answers: [],
          gradedBy: "م. محمد",
          gradedAt: "2024-03-08 11:00"
        }
      },
    ],
    activities: [
      { id: 1, type: "lesson_completed", title: "أكمل درس التحكم في التدفق", date: "2024-03-15 10:30", details: "البرمجة بلغة بايثون" },
      { id: 2, type: "exam_passed", title: "أجتاز الاختبار بنجاح", date: "2024-03-10 14:20", details: "درجة: 92%" },
      { id: 3, type: "course_completed", title: "أتم الدورة بنجاح", date: "2024-03-13 16:00", details: "أساسيات علم البيانات" },
    ],
    payments: [
      { id: 1, amount: 199, currency: "SAR", date: "2024-01-15", status: "completed", method: "بطاقة ائتمان", invoiceNumber: "INV-2024-001", description: "اشتراك متميز - سنة واحدة" },
      { id: 2, amount: 199, currency: "SAR", date: "2023-01-15", status: "completed", method: "بطاقة ائتمان", invoiceNumber: "INV-2023-001", description: "اشتراك متميز - سنة واحدة" },
    ],
    notifications: [
      { id: 1, title: "موعد نهائي للاختبار", message: "موعد اختبار البرمجة النهائية غداً", type: "warning", date: "2024-03-15 08:00", read: false },
      { id: 2, title: "شهادة جديدة", message: "تهانينا! لقد حصلت على شهادة جديدة", type: "success", date: "2024-03-13 16:00", read: true },
      { id: 3, title: "تذكير بالدورة", message: "لم تكمل درس اليوم في دورة بايثون", type: "info", date: "2024-03-14 10:00", read: false },
    ],
    messages: [
      { id: 1, from: "د. سارة", subject: "استفسار حول الدرس", preview: "أريد طرح سؤال حول...", date: "2024-03-15 09:30", read: false, starred: true },
      { id: 2, from: "م. محمد", subject: "موعد الجلسة المباشرة", preview: "سيكون هناك جلسة مباشرة...", date: "2024-03-14 14:00", read: true, starred: false },
    ],
    notes: "طالب متفاعل جداً. يفضل التعلم بالممارسة.",
    emergencyContact: "+966501234567 - أحمد محمد (أخ)",
    disabilityType: "صعوبة في القراءة - يستخدم قارئ الشاشة",
  },
  {
    id: 2,
    name: "سارة أحمد",
    email: "sara@example.com",
    phone: "+966 50 987 6543",
    avatar: "س",
    joinDate: "2024-02-01",
    lastLogin: "2024-03-12 14:20",
    status: "active",
    totalProgress: 45,
    subscription: "free",
    subscriptionDetails: {
      plan: "مجاني",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      autoRenew: false,
      price: 0,
      currency: "SAR",
      features: ["3 دورات مجانية", "شهادة أساسية"],
    },
    enrolledCourses: [
      { id: 1, name: "مقدمة في البرمجة", progress: 30, enrolledDate: "2024-02-05", lastActivity: "2024-03-12", instructor: "د. سارة", status: "active", duration: "10 ساعات", lessonsCompleted: 3, totalLessons: 10 },
      { id: 2, name: "البرمجة بلغة جافا سكريبت", progress: 15, enrolledDate: "2024-02-20", lastActivity: "2024-03-10", instructor: "م. Ahmed", status: "active", duration: "15 ساعة", lessonsCompleted: 4, totalLessons: 25 },
    ],
    exams: [
      { id: 1, courseName: "مقدمة في البرمجة", title: "اختبار المفاهيم الأساسية", date: "2024-03-05", score: 45, passed: false, attempts: 2, maxAttempts: 3, timeSpent: "60 دقيقة", gradedAt: "2024-03-05", duration: 60, totalPoints: 100, passingScore: 60, questionsCount: 20, correctAnswers: 9, wrongAnswers: 8, skippedQuestions: 3 },
    ],
    activities: [
      { id: 1, type: "lesson_completed", title: "أكمل درس المتغيرات", date: "2024-03-12 09:15", details: "مقدمة في البرمجة" },
      { id: 2, type: "exam_passed", title: "لم يجتز الاختبار", date: "2024-03-05 11:00", details: "درجة: 45% - يحتاج 60%" },
    ],
  },
  {
    id: 3,
    name: "خالد عمر",
    email: "khaled@example.com",
    phone: "+966 55 456 7890",
    avatar: "خ",
    joinDate: "2023-11-20",
    lastLogin: "2024-01-15 09:00",
    status: "inactive",
    totalProgress: 20,
    subscription: "enterprise",
    subscriptionDetails: {
      plan: "مؤسسي",
      startDate: "2023-11-20",
      endDate: "2024-11-20",
      autoRenew: true,
      price: 999,
      currency: "SAR",
      features: ["دورات غير محدودة", "تقرير تفصيلي", "مدير حساب مخصص", "تدريب داخلي"],
    },
    enrolledCourses: [
      { id: 1, name: "الذكاء الاصطناعي", progress: 20, enrolledDate: "2023-12-01", lastActivity: "2024-01-15", instructor: "د. محمد", status: "paused", duration: "40 ساعة", lessonsCompleted: 8, totalLessons: 40 },
    ],
    exams: [],
    activities: [],
  },
  {
    id: 4,
    name: "منى علي",
    email: "mona@example.com",
    phone: "+966 53 321 0987",
    avatar: "م",
    joinDate: "2024-03-01",
    lastLogin: "2024-03-14 16:45",
    status: "active",
    totalProgress: 55,
    subscription: "premium",
    subscriptionDetails: {
      plan: "متميز",
      startDate: "2024-03-01",
      endDate: "2025-03-01",
      autoRenew: true,
      price: 199,
      currency: "SAR",
      features: ["جميع الدورات", "شهادات متعددة", "دعم priorty", "جلسات مباشرة"],
    },
    enrolledCourses: [
      { id: 1, name: "تصميم واجهات المستخدم", progress: 55, enrolledDate: "2024-03-05", lastActivity: "2024-03-14", instructor: "م. لينا", status: "active", duration: "18 ساعة", lessonsCompleted: 10, totalLessons: 18 },
      { id: 2, name: "إدارة المشاريع", progress: 50, enrolledDate: "2024-03-10", lastActivity: "2024-03-13", instructor: "د. راشد", status: "active", duration: "12 ساعة", lessonsCompleted: 6, totalLessons: 12 },
    ],
    exams: [
      { id: 1, courseName: "تصميم واجهات المستخدم", title: "اختبار الألوان والخطيط", date: "2024-03-12", score: 88, passed: true, attempts: 1, maxAttempts: 2, timeSpent: "30 دقيقة", gradedAt: "2024-03-12", duration: 30, totalPoints: 50, passingScore: 60, questionsCount: 10, correctAnswers: 9, wrongAnswers: 1, skippedQuestions: 0 },
    ],
    activities: [
      { id: 1, type: "exam_passed", title: "أجتاز الاختبار بامتياز", date: "2024-03-12 15:30", details: "درجة: 88%" },
      { id: 2, type: "lesson_completed", title: "أكمل وحدة التصميم", date: "2024-03-14 11:00", details: "تصميم واجهات المستخدم" },
    ],
  },
  {
    id: 5,
    name: "علي حسن",
    email: "ali@example.com",
    phone: "+966 56 789 0123",
    avatar: "ع",
    joinDate: "2024-01-10",
    lastLogin: "2024-03-15 18:30",
    status: "active",
    totalProgress: 90,
    subscription: "premium",
    subscriptionDetails: {
      plan: "متميز",
      startDate: "2024-01-10",
      endDate: "2025-01-10",
      autoRenew: true,
      price: 199,
      currency: "SAR",
      features: ["جميع الدورات", "شهادات متعددة", "دعم priorty", "جلسات مباشرة"],
    },
    enrolledCourses: [
      { id: 1, name: "تعلم الآلة", progress: 95, enrolledDate: "2024-01-15", lastActivity: "2024-03-15", instructor: "د. أحمد", status: "active", duration: "35 ساعة", lessonsCompleted: 33, totalLessons: 35 },
      { id: 2, name: "البرمجة بلغة بايثون", progress: 85, enrolledDate: "2024-01-10", lastActivity: "2024-03-14", instructor: "د. سارة", status: "completed", duration: "20 ساعة", lessonsCompleted: 20, totalLessons: 20 },
    ],
    exams: [
      { id: 1, courseName: "تعلم الآلة", title: "اختبار التعلم العميق", date: "2024-03-14", score: 95, passed: true, attempts: 1, maxAttempts: 2, timeSpent: "55 دقيقة", gradedAt: "2024-03-14", duration: 60, totalPoints: 100, passingScore: 60, questionsCount: 20, correctAnswers: 19, wrongAnswers: 1, skippedQuestions: 0 },
    ],
    activities: [
      { id: 1, type: "certificate_earned", title: "حصل على شهادة", date: "2024-03-14 18:00", details: "البرمجة بلغة بايثون" },
      { id: 2, type: "exam_passed", title: "درجة كاملة", date: "2024-03-14 17:30", details: "درجة: 95%" },
    ],
  },
  {
    id: 6,
    name: "فاطمة محمد",
    email: "fatima@example.com",
    phone: "+966 57 234 5678",
    avatar: "ف",
    joinDate: "2024-02-15",
    lastLogin: "2024-03-01 11:00",
    status: "suspended",
    totalProgress: 30,
    subscription: "free",
    enrolledCourses: [
      { id: 1, name: "أساسيات التسويق", progress: 30, enrolledDate: "2024-02-20", lastActivity: "2024-03-01", instructor: "م. نورة", status: "paused", duration: "8 ساعات", lessonsCompleted: 2, totalLessons: 8 },
    ],
    exams: [],
    activities: [],
  },
  {
    id: 7,
    name: "عمر يوسف",
    email: "omar@example.com",
    phone: "+966 58 345 6789",
    avatar: "ع",
    joinDate: "2023-12-01",
    lastLogin: "2024-03-13 12:00",
    status: "active",
    totalProgress: 65,
    subscription: "enterprise",
    subscriptionDetails: {
      plan: "مؤسسي",
      startDate: "2023-12-01",
      endDate: "2024-12-01",
      autoRenew: true,
      price: 999,
      currency: "SAR",
      features: ["دورات غير محدودة", "تقرير تفصيلي", "مدير حساب مخصص", "تدريب داخلي"],
    },
    enrolledCourses: [
      { id: 1, name: "أمن المعلومات", progress: 70, enrolledDate: "2023-12-05", lastActivity: "2024-03-13", instructor: "د. خالد", status: "active", duration: "25 ساعة", lessonsCompleted: 17, totalLessons: 25 },
      { id: 2, name: "اختبار الاختراق", progress: 60, enrolledDate: "2024-01-10", lastActivity: "2024-03-12", instructor: "د. خالد", status: "active", duration: "30 ساعة", lessonsCompleted: 18, totalLessons: 30 },
    ],
    exams: [
      { id: 1, courseName: "أمن المعلومات", title: "اختبار أمن الشبكات", date: "2024-03-10", score: 82, passed: true, attempts: 1, maxAttempts: 2, timeSpent: "40 دقيقة", gradedAt: "2024-03-10", duration: 45, totalPoints: 100, passingScore: 60, questionsCount: 20, correctAnswers: 16, wrongAnswers: 4, skippedQuestions: 0 },
    ],
    activities: [
      { id: 1, type: "exam_passed", title: "أجتاز الاختبار", date: "2024-03-10 12:00", details: "درجة: 82%" },
    ],
  },
  {
    id: 8,
    name: "نورة Saleh",
    email: "noor@example.com",
    phone: "+966 59 456 7890",
    avatar: "ن",
    joinDate: "2024-03-05",
    lastLogin: "2024-03-14 09:00",
    status: "active",
    totalProgress: 15,
    subscription: "free",
    enrolledCourses: [
      { id: 1, name: "الكتابة الإبداعية", progress: 15, enrolledDate: "2024-03-10", lastActivity: "2024-03-14", instructor: "أ. هنا", status: "active", duration: "6 ساعات", lessonsCompleted: 1, totalLessons: 6 },
    ],
    exams: [],
    activities: [
      { id: 1, type: "course_started", title: "بدأ الدورة", date: "2024-03-10 09:00", details: "الكتابة الإبداعية" },
    ],
  },
];

const SupportStudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "suspended">("all");
  const [subscriptionFilter, setSubscriptionFilter] = useState<"all" | "free" | "premium" | "enterprise">("all");
  const [progressFilter, setProgressFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEditProgressModal, setShowEditProgressModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "exams" | "subscription" | "activity" | "communications" | "financial">("overview");
  const [showFilters, setShowFilters] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [studentNotes, setStudentNotes] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [showBulkActionsModal, setShowBulkActionsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showSessionLogsModal, setShowSessionLogsModal] = useState(false);
  const [showExamDetailsModal, setShowExamDetailsModal] = useState(false);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [activeAttempt, setActiveAttempt] = useState<ExamAttempt | null>(null);
  const [gradingNote, setGradingNote] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const filteredStudents = students
    .filter((student) => {
      if (statusFilter === "all") return true;
      return student.status === statusFilter;
    })
    .filter((student) => {
      if (subscriptionFilter === "all") return true;
      return student.subscription === subscriptionFilter;
    })
    .filter((student) => {
      if (progressFilter === "all") return true;
      if (progressFilter === "low") return student.totalProgress < 30;
      if (progressFilter === "medium") return student.totalProgress >= 30 && student.totalProgress < 70;
      if (progressFilter === "high") return student.totalProgress >= 70;
      return true;
    })
    .filter((student) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.phone.includes(term)
      );
    });

  const handleOpenStudentModal = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
    setActiveTab("overview");
  };

  const handleRemoveExam = (examId: number) => {
    if (!selectedStudent) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, exams: s.exams.filter((e) => e.id !== examId) }
          : s
      )
    );
    setSelectedStudent((prev) =>
      prev ? { ...prev, exams: prev.exams.filter((e) => e.id !== examId) } : null
    );
  };

  const handleResetExamAttempt = (examId: number) => {
    if (!selectedStudent) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              exams: s.exams.map((e) =>
                e.id === examId
                  ? { ...e, attempts: 0, score: 0, passed: false, gradedAt: null }
                  : e
              ),
            }
          : s
      )
    );
    setSelectedStudent((prev) =>
      prev
        ? {
            ...prev,
            exams: prev.exams.map((e) =>
              e.id === examId ? { ...e, attempts: 0, score: 0, passed: false, gradedAt: null } : e
            ),
          }
        : null
    );
  };

  const handleAddNewExam = (courseName: string, title: string, maxAttempts: number) => {
    if (!selectedStudent) return;
    const newExam: Exam = {
      id: Date.now(),
      courseName,
      title,
      date: new Date().toISOString().split("T")[0],
      score: 0,
      passed: false,
      attempts: 0,
      maxAttempts,
      timeSpent: "0 دقيقة",
      gradedAt: null,
      duration: 60,
      totalPoints: 100,
      passingScore: 60,
      questionsCount: 20,
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedQuestions: 0,
    };
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, exams: [...s.exams, newExam] }
          : s
      )
    );
    setSelectedStudent((prev) =>
      prev ? { ...prev, exams: [...prev.exams, newExam] } : null
    );
    setShowExamModal(false);
  };

  const handleUpdateCourseProgress = (courseId: number, progress: number) => {
    if (!selectedStudent) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              enrolledCourses: s.enrolledCourses.map((c) =>
                c.id === courseId ? { ...c, progress } : c
              ),
            }
          : s
      )
    );
    setSelectedStudent((prev) =>
      prev
        ? {
            ...prev,
            enrolledCourses: prev.enrolledCourses.map((c) =>
              c.id === courseId ? { ...c, progress } : c
            ),
          }
        : null
    );
  };

  const handleUpdateCourseStatus = (courseId: number, status: "active" | "completed" | "paused") => {
    if (!selectedStudent) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              enrolledCourses: s.enrolledCourses.map((c) =>
                c.id === courseId ? { ...c, status } : c
              ),
            }
          : s
      )
    );
    setSelectedStudent((prev) =>
      prev
        ? {
            ...prev,
            enrolledCourses: prev.enrolledCourses.map((c) =>
              c.id === courseId ? { ...c, status } : c
            ),
          }
        : null
    );
  };

  const handleToggleStudentStatus = (studentId: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              status: s.status === "active" ? "inactive" : "active",
            }
          : s
      )
    );
  };

  const handleSuspendStudent = (studentId: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, status: "suspended" as const }
          : s
      )
    );
    setShowSuspendModal(false);
  };

  const handleDeleteStudent = (studentId: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setShowStudentModal(false);
    setShowDeleteConfirmModal(false);
  };

  const handleUpdateStudentNotes = (studentId: number, notes: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, notes }
          : s
      )
    );
    setShowAddNoteModal(false);
  };

  const handleSendMessage = () => {
    if (!selectedStudent || !messageSubject.trim() || !messageBody.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      from: "فريق الدعم",
      subject: messageSubject,
      preview: messageBody.substring(0, 50) + "...",
      date: new Date().toISOString().split("T")[0],
      read: true,
      starred: false,
    };
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, messages: [newMessage, ...(s.messages || [])] }
          : s
      )
    );
    setMessageSubject("");
    setMessageBody("");
    setShowSendMessageModal(false);
  };

  const handleMarkNotificationRead = (studentId: number, notificationId: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              notifications: s.notifications?.map((n) =>
                n.id === notificationId ? { ...n, read: true } : n
              ),
            }
          : s
      )
    );
  };

  const handleMarkAllNotificationsRead = (studentId: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              notifications: s.notifications?.map((n) => ({ ...n, read: true })),
            }
          : s
      )
    );
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "multiple_choice": return <FaCheckSquare style={{ color: "#2196f3" }} />;
      case "true_false": return <FaBalanceScale style={{ color: "#9c27b0" }} />;
      case "short_answer": return <FaEdit style={{ color: "#ffc800" }} />;
      case "essay": return <FaFileContract style={{ color: "var(--primary)" }} />;
      default: return <FaQuestion style={{ color: "var(--text-light)" }} />;
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "multiple_choice": return "اختيار من متعدد";
      case "true_false": return "صح أو خطأ";
      case "short_answer": return "إجابة قصيرة";
      case "essay": return "موضوع تعبيري";
      default: return type;
    }
  };

  const getAnswerStatusColor = (studentAnswer: string, correctAnswer: string) => {
    if (studentAnswer === correctAnswer) return { bg: "rgba(88, 204, 2, 0.1)", color: "var(--success)", icon: <FaCheck /> };
    if (!studentAnswer || studentAnswer.trim() === "") return { bg: "rgba(158, 158, 158, 0.1)", color: "var(--text-light)", icon: <FaExclamation /> };
    return { bg: "rgba(220, 53, 69, 0.1)", color: "var(--danger)", icon: <FaTimes /> };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return { bg: "rgba(88, 204, 2, 0.1)", color: "var(--primary)" };
      case "inactive":
        return { bg: "rgba(158, 158, 158, 0.1)", color: "var(--text-light)" };
      case "suspended":
        return { bg: "rgba(220, 53, 69, 0.1)", color: "var(--danger)" };
      default:
        return { bg: "var(--surface-elevated)", color: "var(--text)" };
    }
  };

  const getSubscriptionBadge = (sub: string) => {
    switch (sub) {
      case "premium":
        return { bg: "rgba(156, 39, 176, 0.1)", color: "#9c27b0", label: "متميز" };
      case "enterprise":
        return { bg: "rgba(33, 150, 243, 0.1)", color: "#2196f3", label: "مؤسسي" };
      default:
        return { bg: "rgba(158, 158, 158, 0.1)", color: "var(--text-light)", label: "مجاني" };
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "var(--success)";
    if (progress >= 30) return "var(--warning)";
    return "var(--danger)";
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_started": return <FaPlay style={{ color: "var(--primary)" }} />;
      case "exam_passed": return <FaCheckCircle style={{ color: "var(--success)" }} />;
      case "course_completed": return <FaAward style={{ color: "#ffc800" }} />;
      case "lesson_completed": return <FaCheck style={{ color: "#2196f3" }} />;
      case "certificate_earned": return <FaTrophy style={{ color: "#9c27b0" }} />;
      default: return <FaHistory style={{ color: "var(--text-light)" }} />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed": return { bg: "rgba(88, 204, 2, 0.1)", color: "var(--success)", label: "مكتمل" };
      case "pending": return { bg: "rgba(255, 193, 7, 0.1)", color: "#ffc800", label: "قيد الانتظار" };
      case "failed": return { bg: "rgba(220, 53, 69, 0.1)", color: "var(--danger)", label: "فشل" };
      case "refunded": return { bg: "rgba(108, 117, 125, 0.1)", color: "#6c757d", label: "مسترد" };
      default: return { bg: "var(--surface-elevated)", color: "var(--text)", label: status };
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case "success": return <FaCheckCircle style={{ color: "var(--success)" }} />;
      case "warning": return <FaExclamationTriangle style={{ color: "#ffc800" }} />;
      case "error": return <FaTimesCircle style={{ color: "var(--danger)" }} />;
      default: return <FaInfoCircle style={{ color: "#2196f3" }} />;
    }
  };

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === "active").length,
    inactive: students.filter(s => s.status === "inactive").length,
    suspended: students.filter(s => s.status === "suspended").length,
    premium: students.filter(s => s.subscription === "premium").length,
    enterprise: students.filter(s => s.subscription === "enterprise").length,
  };

  const courseStats = selectedStudent ? {
    total: selectedStudent.enrolledCourses.length,
    active: selectedStudent.enrolledCourses.filter(c => c.status === "active").length,
    completed: selectedStudent.enrolledCourses.filter(c => c.status === "completed").length,
    paused: selectedStudent.enrolledCourses.filter(c => c.status === "paused").length,
  } : null;

  const examStats = selectedStudent ? {
    total: selectedStudent.exams.length,
    passed: selectedStudent.exams.filter(e => e.passed).length,
    failed: selectedStudent.exams.filter(e => !e.passed).length,
    avgScore: selectedStudent.exams.length > 0 
      ? Math.round(selectedStudent.exams.reduce((acc, e) => acc + e.score, 0) / selectedStudent.exams.length) 
      : 0,
  } : null;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const toggleSelectStudent = (id: number) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === currentStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(currentStudents.map(s => s.id));
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 70px)" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold" style={{ color: "var(--text)" }}>إدارة الطلاب</h4>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>إجمالي الطلاب: {filteredStudents.length}</p>
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={() => setShowAddStudentModal(true)}
            className="btn d-flex align-items-center gap-2"
            style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "10px 16px" }}
          >
            <FaUserPlus /> إضافة طالب
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="btn d-flex align-items-center gap-2"
            style={{ backgroundColor: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 16px" }}
          >
            <FaDownload /> تصدير
          </button>
          {selectedStudents.length > 0 && (
            <button
              onClick={() => setShowBulkActionsModal(true)}
              className="btn d-flex align-items-center gap-2"
              style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "8px", padding: "10px 16px" }}
            >
              <FaExchangeAlt /> إجراءات جماعية ({selectedStudents.length})
            </button>
          )}
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaUsers style={{ color: "var(--primary)", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>الإجمالي</span>
            </div>
            <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.5rem" }}>{stats.total}</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", border: "1px solid var(--primary)" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaCheckCircle style={{ color: "var(--primary)", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>نشط</span>
            </div>
            <div className="fw-bold" style={{ color: "var(--primary)", fontSize: "1.5rem" }}>{stats.active}</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", border: "1px solid #9c27b0" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaStar style={{ color: "#9c27b0", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>متميز</span>
            </div>
            <div className="fw-bold" style={{ color: "#9c27b0", fontSize: "1.5rem" }}>{stats.premium}</div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="p-3 rounded" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", border: "1px solid #2196f3" }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <FaChartLine style={{ color: "#2196f3", fontSize: "1rem" }} />
              <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>مؤسسي</span>
            </div>
            <div className="fw-bold" style={{ color: "#2196f3", fontSize: "1.5rem" }}>{stats.enterprise}</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded mb-4" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="d-flex gap-3 mb-3 flex-wrap align-items-center">
          <div className="position-relative flex-grow-1" style={{ maxWidth: "350px" }}>
            <FaSearch className="position-absolute" style={{ right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", fontSize: "0.85rem" }} />
            <input
              type="text"
              placeholder="بحث عن طالب..."
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
                  <div className="col-md-4">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>الحالة</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                      <option value="suspended">معلق</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>الاشتراك</label>
                    <select
                      value={subscriptionFilter}
                      onChange={(e) => setSubscriptionFilter(e.target.value as any)}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      <option value="free">مجاني</option>
                      <option value="premium">متميز</option>
                      <option value="enterprise">مؤسسي</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label style={{ color: "var(--text)", fontSize: "0.85rem", marginBottom: "8px", display: "block" }}>التقدم</label>
                    <select
                      value={progressFilter}
                      onChange={(e) => setProgressFilter(e.target.value as any)}
                      className="form-select"
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "var(--surface-elevated)",
                        border: "2px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <option value="all">الكل</option>
                      <option value="low">منخفض (0-30%)</option>
                      <option value="medium">متوسط (30-70%)</option>
                      <option value="high">عالي (70-100%)</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center gap-2 p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
          <input
            type="checkbox"
            checked={selectedStudents.length === currentStudents.length && currentStudents.length > 0}
            onChange={toggleSelectAll}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
            تحديد الكل ({currentStudents.length} من {filteredStudents.length})
          </span>
        </div>
        {currentStudents.map((student) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="p-4 rounded"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onClick={() => handleOpenStudentModal(student)}
          >
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSelectStudent(student.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "56px",
                    height: "56px",
                    backgroundColor: student.status === "active" ? "var(--primary)" : "var(--secondary)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {student.avatar}
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "var(--text)" }}>{student.name}</h5>
                  <div className="d-flex align-items-center gap-3" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                    <span className="d-flex align-items-center gap-1"><FaEnvelope /> {student.email}</span>
                    <span className="d-flex align-items-center gap-1"><FaPhone /> {student.phone}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="text-center">
                  <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.1rem" }}>{student.enrolledCourses.length}</div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>دورات</div>
                </div>
                <div className="text-center">
                  <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.1rem" }}>{student.exams.length}</div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>اختبارات</div>
                </div>
                <div style={{ width: "100px" }}>
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>التقدم</span>
                    <span style={{ color: getProgressColor(student.totalProgress), fontSize: "0.75rem", fontWeight: "bold" }}>{student.totalProgress}%</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "var(--border)", borderRadius: "3px" }}>
                    <div
                      style={{
                        width: `${student.totalProgress}%`,
                        height: "100%",
                        backgroundColor: getProgressColor(student.totalProgress),
                        borderRadius: "3px",
                      }}
                    />
                  </div>
                </div>
                <span
                  className="badge"
                  style={{
                    backgroundColor: getSubscriptionBadge(student.subscription).bg,
                    color: getSubscriptionBadge(student.subscription).color,
                    fontSize: "0.8rem",
                    padding: "8px 12px",
                  }}
                >
                  {getSubscriptionBadge(student.subscription).label}
                </span>
                <span
                  className="badge"
                  style={{
                    backgroundColor: getStatusColor(student.status).bg,
                    color: getStatusColor(student.status).color,
                    fontSize: "0.8rem",
                    padding: "8px 12px",
                  }}
                >
                  {student.status === "active" ? "نشط" : student.status === "inactive" ? "غير نشط" : "معلق"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenStudentModal(student);
                  }}
                  className="btn d-flex align-items-center gap-1"
                  style={{
                    backgroundColor: "rgba(33, 150, 243, 0.1)",
                    color: "#2196f3",
                    border: "1px solid #2196f3",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                  }}
                >
                  <FaEye /> عرض
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
            <FaUserGraduate size={48} className="mb-3 opacity-50" />
            <p>لا توجد طلاب مطابقة للفلاتر</p>
          </div>
        )}
      </div>

      {filteredStudents.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-4 p-3 rounded" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
          <div style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
            عرض {indexOfFirstStudent + 1} - {Math.min(indexOfLastStudent, filteredStudents.length)} من {filteredStudents.length} طالب
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="btn d-flex align-items-center gap-1"
              style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 12px", opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              <FaUndo style={{ fontSize: "0.8rem" }} /> السابق
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="btn"
                  style={{
                    backgroundColor: currentPage === page ? "var(--primary)" : "var(--surface-elevated)",
                    color: currentPage === page ? "white" : "var(--text)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    width: "36px",
                    height: "36px",
                    padding: 0,
                  }}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="btn d-flex align-items-center gap-1"
              style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 12px", opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              التالي <FaUndo style={{ fontSize: "0.8rem", transform: "scaleX(-1)" }} />
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showStudentModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 2000 }}
            onClick={() => setShowStudentModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded"
              style={{
                backgroundColor: "var(--surface)",
                width: "95%",
                maxWidth: "1000px",
                maxHeight: "90vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="d-flex justify-content-between align-items-center p-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      backgroundColor: selectedStudent.status === "active" ? "var(--primary)" : "var(--secondary)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1" style={{ color: "var(--text)" }}>{selectedStudent.name}</h4>
                    <div className="d-flex align-items-center gap-3" style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                      <span className="d-flex align-items-center gap-1"><FaEnvelope /> {selectedStudent.email}</span>
                      <span className="d-flex align-items-center gap-1"><FaPhone /> {selectedStudent.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => setShowEditStudentModal(true)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                      color: "#2196f3",
                      border: "1px solid #2196f3",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <FaUserEdit /> تعديل
                  </button>
                  <button
                    onClick={() => handleToggleStudentStatus(selectedStudent.id)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: selectedStudent.status === "active" ? "rgba(220, 53, 69, 0.1)" : "rgba(88, 204, 2, 0.1)",
                      color: selectedStudent.status === "active" ? "var(--danger)" : "var(--primary)",
                      border: `1px solid ${selectedStudent.status === "active" ? "var(--danger)" : "var(--primary)"}`,
                      borderRadius: "8px",
                      padding: "8px 14px",
                      fontSize: "0.85rem",
                    }}
                  >
                    {selectedStudent.status === "active" ? <><FaToggleOff /> تعطيل</> : <><FaToggleOn /> تفعيل</>}
                  </button>
                  <button
                    onClick={() => setShowSuspendModal(true)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: "rgba(255, 193, 7, 0.1)",
                      color: "#ffc800",
                      border: "1px solid #ffc800",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <FaBan /> تعليق
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirmModal(true)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: "rgba(220, 53, 69, 0.1)",
                      color: "var(--danger)",
                      border: "1px solid var(--danger)",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      fontSize: "0.85rem",
                    }}
                  >
                    <FaTrash /> حذف
                  </button>
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  >
                    <FaTimes style={{ color: "var(--text-light)" }} />
                  </button>
                </div>
              </div>

              <div className="d-flex gap-2 p-3 flex-wrap" style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--surface-elevated)" }}>
                {[
                  { key: "overview", label: "نظرة عامة", icon: <FaInfoCircle /> },
                  { key: "courses", label: "الدورات", icon: <FaBook /> },
                  { key: "exams", label: "الاختبارات", icon: <FaFileAlt /> },
                  { key: "subscription", label: "الاشتراك", icon: <FaStar /> },
                  { key: "activity", label: "النشاط", icon: <FaHistory /> },
                  { key: "communications", label: "التواصل", icon: <FaComment /> },
                  { key: "financial", label: "المالية", icon: <FaMoneyBillWave /> },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className="btn d-flex align-items-center gap-2"
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: activeTab === tab.key ? "var(--primary)" : "transparent",
                      color: activeTab === tab.key ? "white" : "var(--text)",
                      border: "1px solid var(--border)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
                {activeTab === "overview" && selectedStudent && (
                  <div className="d-flex flex-column gap-4">
                    <div className="row g-4">
                      <div className="col-md-3">
                        <div className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <FaCalendarAlt style={{ color: "var(--text-light)" }} />
                            <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>تاريخ الانضمام</span>
                          </div>
                          <div className="fw-bold" style={{ color: "var(--text)" }}>{selectedStudent.joinDate}</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <FaClock style={{ color: "var(--text-light)" }} />
                            <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>آخر تسجيل دخول</span>
                          </div>
                          <div className="fw-bold" style={{ color: "var(--text)" }}>{(selectedStudent as any).lastLogin || "غير محدد"}</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <FaBook style={{ color: "var(--text-light)" }} />
                            <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>الدورات المسجلة</span>
                          </div>
                          <div className="fw-bold" style={{ color: "var(--text)" }}>{selectedStudent.enrolledCourses.length}</div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <FaChartBar style={{ color: "var(--text-light)" }} />
                            <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>التقدم الكلي</span>
                          </div>
                          <div className="fw-bold" style={{ color: getProgressColor(selectedStudent.totalProgress) }}>{selectedStudent.totalProgress}%</div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-3 flex-wrap">
                      <button
                        onClick={() => setShowSendMessageModal(true)}
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "8px", padding: "10px 16px" }}
                      >
                        <FaEnvelope /> إرسال بريد
                      </button>
                      <button
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--primary)", border: "1px solid var(--primary)", borderRadius: "8px", padding: "10px 16px" }}
                      >
                        <FaVideo /> بدء جلسة
                      </button>
                      <button
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 16px" }}
                      >
                        <FaFileDownload /> تصدير البيانات
                      </button>
                    </div>

                    {courseStats && (
                      <div className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                        <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>إحصائيات الدورات</h6>
                        <div className="d-flex gap-4 flex-wrap">
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "var(--primary)", fontSize: "1.5rem" }}>{courseStats.total}</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>الإجمالي</div>
                          </div>
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "var(--success)", fontSize: "1.5rem" }}>{courseStats.active}</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>نشط</div>
                          </div>
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "#2196f3", fontSize: "1.5rem" }}>{courseStats.completed}</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>مكتمل</div>
                          </div>
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "var(--text-light)", fontSize: "1.5rem" }}>{courseStats.paused}</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>معلق</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {examStats && (
                      <div className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                        <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>إحصائيات الاختبارات</h6>
                        <div className="d-flex gap-4 flex-wrap">
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "var(--primary)", fontSize: "1.5rem" }}>{examStats.total}</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>الإجمالي</div>
                          </div>
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "var(--success)", fontSize: "1.5rem" }}>{examStats.passed}</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>ناجح</div>
                          </div>
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "var(--danger)", fontSize: "1.5rem" }}>{examStats.failed}</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>راسب</div>
                          </div>
                          <div className="text-center">
                            <div className="fw-bold" style={{ color: "#ffc800", fontSize: "1.5rem" }}>{examStats.avgScore}%</div>
                            <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>متوسط الدرجات</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "courses" && selectedStudent && (
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold" style={{ color: "var(--text)" }}>دورات الطالب</h5>
                      <button
                        onClick={() => setShowCourseModal(true)}
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "8px 14px" }}
                      >
                        <FaPlus /> إضافة دورة
                      </button>
                    </div>
                    {selectedStudent.enrolledCourses.map((course) => (
                      <div key={course.id} className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="flex-grow-1">
                            <h6 className="fw-bold mb-2" style={{ color: "var(--text)" }}>{course.name}</h6>
                            <div className="d-flex gap-4 flex-wrap" style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                              <span className="d-flex align-items-center gap-1"><FaUserGraduate /> المدرب: {course.instructor}</span>
                              <span className="d-flex align-items-center gap-1"><FaCalendarAlt /> التسجيل: {course.enrolledDate}</span>
                              <span className="d-flex align-items-center gap-1"><FaClock /> المدة: {course.duration}</span>
                              <span className="d-flex align-items-center gap-1"><FaPlay /> آخر نشاط: {course.lastActivity}</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              value={course.status}
                              onChange={(e) => handleUpdateCourseStatus(course.id, e.target.value as any)}
                              className="form-select"
                              style={{
                                width: "120px",
                                borderRadius: "8px",
                                backgroundColor: course.status === "active" ? "rgba(88, 204, 2, 0.1)" : course.status === "completed" ? "rgba(33, 150, 243, 0.1)" : "rgba(158, 158, 158, 0.1)",
                                border: "1px solid",
                                borderColor: course.status === "active" ? "var(--primary)" : course.status === "completed" ? "#2196f3" : "var(--text-light)",
                                color: course.status === "active" ? "var(--primary)" : course.status === "completed" ? "#2196f3" : "var(--text-light)",
                                fontSize: "0.8rem",
                              }}
                            >
                              <option value="active">نشط</option>
                              <option value="completed">مكتمل</option>
                              <option value="paused">معلق</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-1">
                            <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>التقدم</span>
                            <span style={{ color: getProgressColor(course.progress), fontSize: "0.85rem", fontWeight: "bold" }}>{course.progress}% ({course.lessonsCompleted}/{course.totalLessons} دروس)</span>
                          </div>
                          <div style={{ height: "10px", backgroundColor: "var(--border)", borderRadius: "5px" }}>
                            <div style={{ height: "100%", width: `${course.progress}%`, backgroundColor: getProgressColor(course.progress), borderRadius: "5px" }} />
                          </div>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowEditProgressModal(true);
                            }}
                            className="btn d-flex align-items-center gap-1"
                            style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "6px", padding: "6px 12px", fontSize: "0.8rem" }}
                          >
                            <FaEdit style={{ fontSize: "0.7rem" }} /> تعديل التقدم
                          </button>
                          <button
                            className="btn d-flex align-items-center gap-1"
                            style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--primary)", border: "1px solid var(--primary)", borderRadius: "6px", padding: "6px 12px", fontSize: "0.8rem" }}
                          >
                            <FaPlay style={{ fontSize: "0.7rem" }} /> فتح الدورة
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "exams" && selectedStudent && (
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold" style={{ color: "var(--text)" }}>اختبارات الطالب</h5>
                      <button
                        onClick={() => setShowExamModal(true)}
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "8px 14px" }}
                      >
                        <FaPlus /> إضافة اختبار
                      </button>
                    </div>
                    {selectedStudent.exams.length === 0 ? (
                      <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
                        <FaFileAlt size={48} className="mb-3 opacity-50" />
                        <p>لا توجد اختبارات</p>
                      </div>
                    ) : (
                      selectedStudent.exams.map((exam) => (
                        <div key={exam.id} className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-2" style={{ color: "var(--text)" }}>{exam.title}</h6>
                              <div className="d-flex gap-4 flex-wrap" style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                                <span className="d-flex align-items-center gap-1"><FaBook /> {exam.courseName}</span>
                                <span className="d-flex align-items-center gap-1"><FaCalendarAlt /> {exam.date}</span>
                                <span className="d-flex align-items-center gap-1"><FaStopwatch /> المدة: {exam.duration} دقيقة</span>
                                {exam.gradedAt && <span className="d-flex align-items-center gap-1"><FaCheck /> التصحيح: {exam.gradedAt}</span>}
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              {exam.passed ? (
                                <span className="badge" style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--success)", fontSize: "0.85rem", padding: "8px 16px" }}>
                                  <FaCheckCircle className="ms-1" /> ناجح
                                </span>
                              ) : (
                                <span className="badge" style={{ backgroundColor: "rgba(220, 53, 69, 0.1)", color: "var(--danger)", fontSize: "0.85rem", padding: "8px 16px" }}>
                                  <FaTimesCircle className="ms-1" /> راسب
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="row g-3 mb-3">
                            <div className="col-md-3 col-6">
                              <div className="p-2 rounded text-center" style={{ backgroundColor: "var(--background)" }}>
                                <div className="fw-bold" style={{ color: exam.passed ? "var(--success)" : "var(--danger)", fontSize: "1.3rem" }}>{exam.score}%</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.7rem" }}>الدرجة</div>
                              </div>
                            </div>
                            <div className="col-md-3 col-6">
                              <div className="p-2 rounded text-center" style={{ backgroundColor: "var(--background)" }}>
                                <div className="fw-bold" style={{ color: "var(--success)", fontSize: "1.3rem" }}>{exam.correctAnswers}</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.7rem" }}>صحيح</div>
                              </div>
                            </div>
                            <div className="col-md-3 col-6">
                              <div className="p-2 rounded text-center" style={{ backgroundColor: "var(--background)" }}>
                                <div className="fw-bold" style={{ color: "var(--danger)", fontSize: "1.3rem" }}>{exam.wrongAnswers}</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.7rem" }}>خطأ</div>
                              </div>
                            </div>
                            <div className="col-md-3 col-6">
                              <div className="p-2 rounded text-center" style={{ backgroundColor: "var(--background)" }}>
                                <div className="fw-bold" style={{ color: exam.attempts >= exam.maxAttempts ? "var(--danger)" : "var(--text)", fontSize: "1.3rem" }}>{exam.attempts}/{exam.maxAttempts}</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.7rem" }}>المحاولات</div>
                              </div>
                            </div>
                          </div>

                          {(exam as any).questionsCount && (
                            <div className="mb-3 p-2 rounded" style={{ backgroundColor: "var(--background)" }}>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>تفاصيل الأسئلة</span>
                                <span style={{ color: "var(--text)", fontSize: "0.85rem" }}>{exam.questionsCount} سؤال • {exam.totalPoints} نقطة • نسبة النجاح {exam.passingScore}%</span>
                              </div>
                              <div style={{ height: "8px", backgroundColor: "var(--border)", borderRadius: "4px" }}>
                                <div style={{ height: "100%", width: `${(exam.correctAnswers / exam.questionsCount) * 100}%`, backgroundColor: "var(--success)", borderRadius: "4px" }} />
                              </div>
                              <div className="d-flex justify-content-between mt-1" style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>
                                <span>الإجابات الصحيحة</span>
                                <span>{Math.round((exam.correctAnswers / exam.questionsCount) * 100)}%</span>
                              </div>
                            </div>
                          )}

                          {exam.lastAttempt?.gradedBy && (
                            <div className="mb-3 p-2 rounded d-flex gap-3" style={{ backgroundColor: "var(--background)", fontSize: "0.8rem" }}>
                              <span style={{ color: "var(--text-light)" }}>
                                <FaUserTag className="ms-1" /> المصحح: <span style={{ color: "var(--text)" }}>{exam.lastAttempt.gradedBy}</span>
                              </span>
                              <span style={{ color: "var(--text-light)" }}>
                                <FaClock className="ms-1" /> وقت الحل: <span style={{ color: "var(--text)" }}>{exam.lastAttempt.timeSpent}</span>
                              </span>
                              {exam.lastAttempt.notes && (
                                <span style={{ color: "var(--text-light)" }}>
                                  <FaInfoCircle className="ms-1" /> ملاحظة: <span style={{ color: "var(--primary)" }}>{exam.lastAttempt.notes}</span>
                                </span>
                              )}
                            </div>
                          )}

                          <div className="d-flex gap-2 flex-wrap">
                            <button
                              onClick={() => {
                                setSelectedExam(exam);
                                setActiveAttempt(exam.lastAttempt || null);
                                setShowExamDetailsModal(true);
                              }}
                              className="btn d-flex align-items-center gap-1"
                              style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "6px", padding: "6px 12px", fontSize: "0.8rem" }}
                            >
                              <FaEye style={{ fontSize: "0.7rem" }} /> عرض الإجابات
                            </button>
                            {exam.attempts < exam.maxAttempts && (
                              <button
                                className="btn d-flex align-items-center gap-1"
                                style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--primary)", border: "1px solid var(--primary)", borderRadius: "6px", padding: "6px 12px", fontSize: "0.8rem" }}
                              >
                                <FaPlay style={{ fontSize: "0.7rem" }} /> محاولة أخرى
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedExam(exam);
                                setActiveAttempt(exam.lastAttempt || null);
                                setShowGradingModal(true);
                              }}
                              className="btn d-flex align-items-center gap-1"
                              style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", color: "#9c27b0", border: "1px solid #9c27b0", borderRadius: "6px", padding: "6px 12px", fontSize: "0.8rem" }}
                            >
                              <FaEdit style={{ fontSize: "0.7rem" }} /> تصحيح
                            </button>
                            <button
                              onClick={() => handleResetExamAttempt(exam.id)}
                              className="btn d-flex align-items-center gap-1"
                              style={{ backgroundColor: "rgba(255, 193, 7, 0.1)", color: "#ffc800", border: "1px solid #ffc800", borderRadius: "6px", padding: "6px 12px", fontSize: "0.8rem" }}
                            >
                              <FaRedo style={{ fontSize: "0.7rem" }} /> إعادة تعيين
                            </button>
                            <button
                              onClick={() => handleRemoveExam(exam.id)}
                              className="btn d-flex align-items-center gap-1"
                              style={{ backgroundColor: "rgba(220, 53, 69, 0.1)", color: "var(--danger)", border: "1px solid var(--danger)", borderRadius: "6px", padding: "6px 12px", fontSize: "0.8rem" }}
                            >
                              <FaTrashAlt style={{ fontSize: "0.7rem" }} /> حذف
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "subscription" && selectedStudent && (
                  <div className="d-flex flex-column gap-4">
                    {selectedStudent.subscriptionDetails ? (
                      <>
                        <div className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                          <div className="d-flex justify-content-between align-items-start mb-4">
                            <div>
                              <h5 className="fw-bold mb-2" style={{ color: "var(--text)" }}>الاشتراك الحالي</h5>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: getSubscriptionBadge(selectedStudent.subscription).bg,
                                  color: getSubscriptionBadge(selectedStudent.subscription).color,
                                  fontSize: "0.9rem",
                                  padding: "10px 20px",
                                }}
                              >
                                {getSubscriptionBadge(selectedStudent.subscription).label}
                              </span>
                            </div>
                            <div className="text-end">
                              <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.5rem" }}>{selectedStudent.subscriptionDetails.price} {selectedStudent.subscriptionDetails.currency}</div>
                              <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>/ سنة</div>
                            </div>
                          </div>
                          
                          <div className="row g-3 mb-4">
                            <div className="col-md-4">
                              <div className="p-3 rounded" style={{ backgroundColor: "var(--background)" }}>
                                <FaCalendarAlt style={{ color: "var(--text-light)", marginBottom: "8px" }} />
                                <div className="fw-bold mb-1" style={{ color: "var(--text)", fontSize: "0.9rem" }}>تاريخ البداية</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{selectedStudent.subscriptionDetails.startDate}</div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="p-3 rounded" style={{ backgroundColor: "var(--background)" }}>
                                <FaClock style={{ color: "var(--text-light)", marginBottom: "8px" }} />
                                <div className="fw-bold mb-1" style={{ color: "var(--text)", fontSize: "0.9rem" }}>تاريخ الانتهاء</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{selectedStudent.subscriptionDetails.endDate}</div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="p-3 rounded" style={{ backgroundColor: "var(--background)" }}>
                                <FaRedo style={{ color: selectedStudent.subscriptionDetails.autoRenew ? "var(--success)" : "var(--text-light)", marginBottom: "8px" }} />
                                <div className="fw-bold mb-1" style={{ color: "var(--text)", fontSize: "0.9rem" }}>التجديد التلقائي</div>
                                <div style={{ color: selectedStudent.subscriptionDetails.autoRenew ? "var(--success)" : "var(--text-light)", fontSize: "0.85rem" }}>
                                  {selectedStudent.subscriptionDetails.autoRenew ? "مفعل" : "غير مفعل"}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>مميزات الاشتراك</h6>
                            <div className="d-flex flex-wrap gap-2">
                              {selectedStudent.subscriptionDetails.features.map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="badge"
                                  style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--primary)", fontSize: "0.8rem", padding: "8px 12px" }}
                                >
                                  <FaCheck className="ms-1" /> {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="d-flex gap-3">
                          <button className="btn d-flex align-items-center gap-2 flex-fill" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "12px" }}>
                            <FaLevelUpAlt /> ترقية الاشتراك
                          </button>
                          <button className="btn d-flex align-items-center gap-2 flex-fill" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "12px" }}>
                            <FaFileDownload /> عرض الفاتورة
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
                        <FaStar size={48} className="mb-3 opacity-50" />
                        <p>لا يوجد اشتراك مميز</p>
                        <button className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "10px 20px" }}>
                          الاشتراك الآن
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "activity" && selectedStudent && (
                  <div className="d-flex flex-column gap-3">
                    <h5 className="fw-bold" style={{ color: "var(--text)" }}>النشاط الأخير</h5>
                    {selectedStudent.activities && selectedStudent.activities.length > 0 ? (
                      <div className="d-flex flex-column gap-2">
                        {selectedStudent.activities.map((activity) => (
                          <div key={activity.id} className="p-3 rounded d-flex align-items-start gap-3" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: "40px", height: "40px", backgroundColor: "var(--background)", flexShrink: 0 }}
                            >
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-bold mb-1" style={{ color: "var(--text)" }}>{activity.title}</div>
                              {activity.details && <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{activity.details}</div>}
                              <div style={{ color: "var(--text-light)", fontSize: "0.75rem", marginTop: "4px" }}>{activity.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
                        <FaHistory size={48} className="mb-3 opacity-50" />
                        <p>لا يوجد نشاط حديث</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "communications" && selectedStudent && (
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold" style={{ color: "var(--text)" }}>التواصل والرسائل</h5>
                      <button
                        onClick={() => setShowSendMessageModal(true)}
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "8px 14px" }}
                      >
                        <FaPaperPlane /> إرسال رسالة
                      </button>
                    </div>

                    <div className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold" style={{ color: "var(--text)" }}>الإشعارات</h6>
                        {selectedStudent.notifications && selectedStudent.notifications.length > 0 && (
                          <button
                            onClick={() => handleMarkAllNotificationsRead(selectedStudent.id)}
                            className="btn"
                            style={{ color: "var(--primary)", fontSize: "0.8rem", padding: "4px 8px" }}
                          >
                            تحديد الكل كمقروء
                          </button>
                        )}
                      </div>
                      {selectedStudent.notifications && selectedStudent.notifications.length > 0 ? (
                        <div className="d-flex flex-column gap-2">
                          {selectedStudent.notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className="p-3 rounded d-flex align-items-start gap-3"
                              style={{ backgroundColor: notif.read ? "var(--background)" : "rgba(33, 150, 243, 0.05)", border: "1px solid var(--border)", cursor: "pointer" }}
                              onClick={() => {
                                handleMarkNotificationRead(selectedStudent.id, notif.id);
                                setSelectedNotification(notif);
                                setShowNotificationModal(true);
                              }}
                            >
                              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", backgroundColor: "var(--surface-elevated)", flexShrink: 0 }}>
                                {getNotificationTypeIcon(notif.type)}
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div className="fw-bold mb-1" style={{ color: "var(--text)", fontSize: "0.9rem" }}>{notif.title}</div>
                                  {!notif.read && <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--primary)" }} />}
                                </div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{notif.message}</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.75rem", marginTop: "4px" }}>{notif.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-4" style={{ color: "var(--text-light)" }}>
                          <FaBellSlash size={36} className="mb-2 opacity-50" />
                          <p>لا توجد إشعارات</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                      <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>الرسائل الواردة</h6>
                      {selectedStudent.messages && selectedStudent.messages.length > 0 ? (
                        <div className="d-flex flex-column gap-2">
                          {selectedStudent.messages.map((msg) => (
                            <div key={msg.id} className="p-3 rounded d-flex align-items-start gap-3" style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}>
                              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px", backgroundColor: "var(--primary)", color: "white", fontSize: "0.9rem" }}>
                                {msg.from.charAt(0)}
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div className="fw-bold" style={{ color: "var(--text)" }}>{msg.from}</div>
                                  {msg.starred && <FaStar style={{ color: "#ffc800", fontSize: "0.8rem" }} />}
                                </div>
                                <div className="fw-bold mb-1" style={{ color: "var(--text)", fontSize: "0.9rem" }}>{msg.subject}</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{msg.preview}</div>
                                <div style={{ color: "var(--text-light)", fontSize: "0.75rem", marginTop: "4px" }}>{msg.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-4" style={{ color: "var(--text-light)" }}>
                          <FaComment size={36} className="mb-2 opacity-50" />
                          <p>لا توجد رسائل</p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold" style={{ color: "var(--text)" }}>ملاحظات الطالب</h6>
                        <button
                          onClick={() => {
                            setStudentNotes(selectedStudent.notes || "");
                            setShowAddNoteModal(true);
                          }}
                          className="btn d-flex align-items-center gap-1"
                          style={{ color: "var(--primary)", fontSize: "0.85rem", padding: "4px 8px" }}
                        >
                          <FaEdit style={{ fontSize: "0.7rem" }} /> إضافة/تعديل
                        </button>
                      </div>
                      <div style={{ color: "var(--text-light)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                        {selectedStudent.notes || "لا توجد ملاحظات"}
                      </div>
                      {selectedStudent.emergencyContact && (
                        <div className="mt-3 pt-3 border-top" style={{ borderColor: "var(--border)" }}>
                          <div className="fw-bold mb-2" style={{ color: "var(--text)" }}>جهة اتصال الطوارئ</div>
                          <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{selectedStudent.emergencyContact}</div>
                        </div>
                      )}
                      {selectedStudent.disabilityType && (
                        <div className="mt-3 pt-3 border-top" style={{ borderColor: "var(--border)" }}>
                          <div className="fw-bold mb-2" style={{ color: "var(--text)" }}>نوع الإعاقة / احتياجات خاصة</div>
                          <div style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>{selectedStudent.disabilityType}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "financial" && selectedStudent && (
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold" style={{ color: "var(--text)" }}>المالية والمدفوعات</h5>
                    </div>

                    {selectedStudent.payments && selectedStudent.payments.length > 0 ? (
                      <>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className="p-3 rounded text-center" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                              <div className="fw-bold" style={{ color: "var(--primary)", fontSize: "1.5rem" }}>
                                {selectedStudent.payments.filter(p => p.status === "completed").reduce((acc, p) => acc + p.amount, 0)} {selectedStudent.payments[0]?.currency || "SAR"}
                              </div>
                              <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>إجمالي المدفوعات</div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3 rounded text-center" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                              <div className="fw-bold" style={{ color: "var(--success)", fontSize: "1.5rem" }}>{selectedStudent.payments.filter(p => p.status === "completed").length}</div>
                              <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>معاملات ناجحة</div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="p-3 rounded text-center" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                              <div className="fw-bold" style={{ color: "#ffc800", fontSize: "1.5rem" }}>{selectedStudent.subscriptionDetails?.price || 0} {selectedStudent.subscriptionDetails?.currency || "SAR"}</div>
                              <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>القيمة السنوية</div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                          <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>سجل المدفوعات</h6>
                          <div className="d-flex flex-column gap-3">
                            {selectedStudent.payments.map((payment) => (
                              <div key={payment.id} className="p-3 rounded d-flex align-items-center justify-content-between" style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}>
                                <div className="d-flex align-items-center gap-3">
                                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "44px", height: "44px", backgroundColor: getPaymentStatusColor(payment.status).bg }}>
                                    <FaCreditCard style={{ color: getPaymentStatusColor(payment.status).color }} />
                                  </div>
                                  <div>
                                    <div className="fw-bold" style={{ color: "var(--text)" }}>{payment.description}</div>
                                    <div className="d-flex gap-2" style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                                      <span>{payment.date}</span>
                                      <span>•</span>
                                      <span>{payment.method}</span>
                                      <span>•</span>
                                      <span style={{ fontFamily: "monospace" }}>{payment.invoiceNumber}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                  <div className="fw-bold" style={{ color: "var(--text)", fontSize: "1.1rem" }}>{payment.amount} {payment.currency}</div>
                                  <span className="badge" style={{ backgroundColor: getPaymentStatusColor(payment.status).bg, color: getPaymentStatusColor(payment.status).color, fontSize: "0.8rem", padding: "6px 12px" }}>
                                    {getPaymentStatusColor(payment.status).label}
                                  </span>
                                  <button className="btn d-flex align-items-center gap-1" style={{ color: "var(--primary)", fontSize: "0.8rem", padding: "4px 8px" }}>
                                    <FaFileDownload /> فاتورة
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-5" style={{ color: "var(--text-light)" }}>
                        <FaFileInvoice size={48} className="mb-3 opacity-50" />
                        <p>لا توجد مدفوعات مسجلة</p>
                      </div>
                    )}

                    {selectedStudent.subscriptionDetails && (
                      <div className="p-4 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                        <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>إدارة الاشتراك</h6>
                        <div className="d-flex gap-3 flex-wrap">
                          <button className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "8px", padding: "10px 16px" }}>
                            <FaLevelUpAlt /> ترقية الاشتراك
                          </button>
                          <button className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", color: "#9c27b0", border: "1px solid #9c27b0", borderRadius: "8px", padding: "10px 16px" }}>
                            <FaRegListAlt /> تغيير الخطة
                          </button>
                          <button className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "rgba(220, 53, 69, 0.1)", color: "var(--danger)", border: "1px solid var(--danger)", borderRadius: "8px", padding: "10px 16px" }}>
                            <FaBan /> إلغاء الاشتراك
                          </button>
                          <button className="btn d-flex align-items-center gap-2" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 16px" }}>
                            <FaFileDownload /> تحميل التقارير
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showExamModal && selectedStudent && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowExamModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "450px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>إضافة اختبار جديد</h5>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الدورة</label>
              <select className="form-control" id="exam-course-select" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}>
                {selectedStudent.enrolledCourses.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>عنوان الاختبار</label>
              <input type="text" id="exam-title-input" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="أدخل عنوان الاختبار" />
            </div>
            <div className="mb-4">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الحد الأقصى للمحاولات</label>
              <input type="number" id="exam-max-attempts" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} defaultValue={3} min={1} max={10} />
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowExamModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button onClick={() => {
                const courseSelect = document.getElementById("exam-course-select") as HTMLSelectElement;
                const titleInput = document.getElementById("exam-title-input") as HTMLInputElement;
                const maxAttemptsInput = document.getElementById("exam-max-attempts") as HTMLInputElement;
                handleAddNewExam(courseSelect.value, titleInput.value || "اختبار جديد", parseInt(maxAttemptsInput.value) || 3);
              }} className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                إضافة
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showCourseModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowCourseModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "450px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>إضافة دورة جديدة</h5>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>اسم الدورة</label>
              <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="أدخل اسم الدورة" />
            </div>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>المدرب</label>
              <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="أدخل اسم المدرب" />
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>المدة</label>
                <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="مثال: 20 ساعة" />
              </div>
              <div className="col-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>نسبة التقدم (%)</label>
                <input type="number" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} defaultValue={0} min={0} max={100} />
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowCourseModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                إضافة
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showEditProgressModal && selectedCourse && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowEditProgressModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "400px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>تعديل تقدم الدورة</h5>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الدورة</label>
              <div className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                {selectedCourse.name}
              </div>
            </div>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>نسبة التقدم (%)</label>
              <input
                type="number"
                id="edit-progress-input"
                className="form-control"
                style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                defaultValue={selectedCourse.progress}
                min={0}
                max={100}
              />
            </div>
            <div className="mb-4">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>عدد الدروس المكتملة</label>
              <input
                type="number"
                id="edit-lessons-input"
                className="form-control"
                style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                defaultValue={selectedCourse.lessonsCompleted}
                min={0}
                max={selectedCourse.totalLessons}
              />
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowEditProgressModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button onClick={() => {
                const progressInput = document.getElementById("edit-progress-input") as HTMLInputElement;
                const lessonsInput = document.getElementById("edit-lessons-input") as HTMLInputElement;
                const progress = parseInt(progressInput.value) || 0;
                handleUpdateCourseProgress(selectedCourse.id, progress);
                setShowEditProgressModal(false);
              }} className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                حفظ
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showSendMessageModal && selectedStudent && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowSendMessageModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "500px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>إرسال رسالة إلى {selectedStudent.name}</h5>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>العنوان</label>
              <input
                type="text"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                className="form-control"
                style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                placeholder="أدخل عنوان الرسالة"
              />
            </div>
            <div className="mb-4">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>محتوى الرسالة</label>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                className="form-control"
                rows={5}
                style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)", resize: "none" }}
                placeholder="أدخل محتوى الرسالة..."
              />
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowSendMessageModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageSubject.trim() || !messageBody.trim()}
                className="btn"
                style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", opacity: !messageSubject.trim() || !messageBody.trim() ? 0.6 : 1 }}
              >
                <FaPaperPlane className="ms-2" /> إرسال
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showAddNoteModal && selectedStudent && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowAddNoteModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "500px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>إضافة ملاحظات للطالب</h5>
            <div className="mb-4">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الملاحظات</label>
              <textarea
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                className="form-control"
                rows={5}
                style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)", resize: "none" }}
                placeholder="أدخل ملاحظات حول الطالب..."
              />
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowAddNoteModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button onClick={() => handleUpdateStudentNotes(selectedStudent.id, studentNotes)} className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                حفظ
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showSuspendModal && selectedStudent && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowSuspendModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "400px", maxWidth: "90%" }}>
            <div className="text-center mb-4">
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "64px", height: "64px", backgroundColor: "rgba(220, 53, 69, 0.1)" }}>
                <FaUserSlash style={{ color: "var(--danger)", fontSize: "1.5rem" }} />
              </div>
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>تعليق حساب الطالب</h5>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>هل أنت متأكد من تعليق حساب {selectedStudent.name}؟</p>
            </div>
            <p style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
              سيتم تعليق حساب الطالب ومنعه من تسجيل الدخول والدورات. يمكن إعادة تفعيل الحساب في أي وقت.
            </p>
            <div className="d-flex gap-2 justify-content-center mt-4">
              <button onClick={() => setShowSuspendModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 24px" }}>
                إلغاء
              </button>
              <button onClick={() => handleSuspendStudent(selectedStudent.id)} className="btn" style={{ backgroundColor: "var(--danger)", color: "white", borderRadius: "8px", padding: "10px 24px" }}>
                <FaBan className="ms-2" /> تعليق الحساب
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showDeleteConfirmModal && selectedStudent && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowDeleteConfirmModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "400px", maxWidth: "90%" }}>
            <div className="text-center mb-4">
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "64px", height: "64px", backgroundColor: "rgba(220, 53, 69, 0.1)" }}>
                <FaTrash style={{ color: "var(--danger)", fontSize: "1.5rem" }} />
              </div>
              <h5 className="fw-bold" style={{ color: "var(--text)" }}>حذف الطالب</h5>
              <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>هل أنت متأكد من حذف {selectedStudent.name}؟</p>
            </div>
            <p style={{ color: "var(--danger)", fontSize: "0.85rem" }}>
              ⚠️ هذا الإجراء لا رجعة فيه. سيتم حذف جميع بيانات الطالب بما في ذلك التقدم في الدورات والاختبارات والتسجيلات.
            </p>
            <div className="d-flex gap-2 justify-content-center mt-4">
              <button onClick={() => setShowDeleteConfirmModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 24px" }}>
                إلغاء
              </button>
              <button onClick={() => handleDeleteStudent(selectedStudent.id)} className="btn" style={{ backgroundColor: "var(--danger)", color: "white", borderRadius: "8px", padding: "10px 24px" }}>
                <FaTrash className="ms-2" /> حذف نهائي
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showNotificationModal && selectedNotification && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowNotificationModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "450px", maxWidth: "90%" }}>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", backgroundColor: "var(--surface-elevated)" }}>
                  {getNotificationTypeIcon(selectedNotification.type)}
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "var(--text)" }}>{selectedNotification.title}</h5>
                  <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>{selectedNotification.date}</div>
                </div>
              </div>
              <button onClick={() => setShowNotificationModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                <FaTimes style={{ color: "var(--text-light)", fontSize: "0.8rem" }} />
              </button>
            </div>
            <div className="p-3 rounded mb-4" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
              <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>{selectedNotification.message}</p>
            </div>
            {selectedNotification.actionUrl && (
              <div className="d-flex justify-content-end">
                <button className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px", padding: "8px 16px" }}>
                  عرض التفاصيل
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {showEditStudentModal && selectedStudent && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowEditStudentModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "500px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>تعديل بيانات الطالب</h5>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الاسم الكامل</label>
                <input type="text" defaultValue={selectedStudent.name} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>البريد الإلكتروني</label>
                <input type="email" defaultValue={selectedStudent.email} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>رقم الهاتف</label>
                <input type="tel" defaultValue={selectedStudent.phone} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>نوع الاشتراك</label>
                <select defaultValue={selectedStudent.subscription} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}>
                  <option value="free">مجاني</option>
                  <option value="premium">متميز</option>
                  <option value="enterprise">مؤسسي</option>
                </select>
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الحالة</label>
                <select defaultValue={selectedStudent.status} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="suspended">معلق</option>
                </select>
              </div>
              <div className="col-12">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>جهة اتصال الطوارئ</label>
                <input type="text" defaultValue={selectedStudent.emergencyContact || ""} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="اسم - رقم الهاتف" />
              </div>
              <div className="col-12">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>اسم ولي الأمر</label>
                <input type="text" defaultValue={selectedStudent.parentName || ""} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="أدخل اسم ولي الأمر" />
              </div>
              <div className="col-12">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>احتياجات خاصة / نوع الإعاقة</label>
                <input type="text" defaultValue={selectedStudent.disabilityType || ""} className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="أدخل أي احتياجات خاصة للطالب" />
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowEditStudentModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button onClick={() => setShowEditStudentModal(false)} className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                <FaSave className="ms-2" /> حفظ التغييرات
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showBulkActionsModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowBulkActionsModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "450px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>إجراءات جماعية</h5>
            <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "20px" }}>
              لقد اخترت <strong style={{ color: "var(--primary)" }}>{selectedStudents.length}</strong> طلاب. اختر الإجراء المطلوب:
            </p>
            <div className="d-flex flex-column gap-3">
              <button className="btn d-flex align-items-center gap-3 p-3" style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", color: "var(--primary)", border: "1px solid var(--primary)", borderRadius: "12px", textAlign: "right" }}>
                <FaUserCheck style={{ fontSize: "1.2rem" }} />
                <div>
                  <div className="fw-bold">تفعيل الحسابات</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>تفعيل جميع الحسابات المحددة</div>
                </div>
              </button>
              <button className="btn d-flex align-items-center gap-3 p-3" style={{ backgroundColor: "rgba(220, 53, 69, 0.1)", color: "var(--danger)", border: "1px solid var(--danger)", borderRadius: "12px", textAlign: "right" }}>
                <FaUserSlash style={{ fontSize: "1.2rem" }} />
                <div>
                  <div className="fw-bold">تعليق الحسابات</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>تعليق جميع الحسابات المحددة</div>
                </div>
              </button>
              <button className="btn d-flex align-items-center gap-3 p-3" style={{ backgroundColor: "rgba(156, 39, 176, 0.1)", color: "#9c27b0", border: "1px solid #9c27b0", borderRadius: "12px", textAlign: "right" }}>
                <FaEnvelope style={{ fontSize: "1.2rem" }} />
                <div>
                  <div className="fw-bold">إرسال رسالة جماعية</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>إرسال رسالة لجميع الطلاب المحددين</div>
                </div>
              </button>
              <button className="btn d-flex align-items-center gap-3 p-3" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", color: "#2196f3", border: "1px solid #2196f3", borderRadius: "12px", textAlign: "right" }}>
                <FaLevelUpAlt style={{ fontSize: "1.2rem" }} />
                <div>
                  <div className="fw-bold">ترقية الاشتراك</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>ترقية جميع الطلاب المحددين لمتميز</div>
                </div>
              </button>
              <button className="btn d-flex align-items-center gap-3 p-3" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text-light)", border: "1px solid var(--border)", borderRadius: "12px", textAlign: "right" }}>
                <FaDownload style={{ fontSize: "1.2rem" }} />
                <div>
                  <div className="fw-bold">تصدير البيانات</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>تصدير بيانات الطلاب المحددين</div>
                </div>
              </button>
            </div>
            <div className="d-flex gap-2 justify-content-end mt-4">
              <button onClick={() => setShowBulkActionsModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showExportModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowExportModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "400px", maxWidth: "90%" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>تصدير بيانات الطلاب</h5>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>تنسيق الملف</label>
              <select className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}>
                <option value="csv">CSV - Excel</option>
                <option value="xlsx">Excel (.xlsx)</option>
                <option value="pdf">PDF</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <div className="mb-3">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الحقول المراد تصديرها</label>
              <div className="d-flex flex-column gap-2">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exp-name" defaultChecked />
                  <label className="form-check-label" style={{ color: "var(--text)" }} htmlFor="exp-name">الاسم والبريد الإلكتروني</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exp-courses" defaultChecked />
                  <label className="form-check-label" style={{ color: "var(--text)" }} htmlFor="exp-courses">الدورات المسجلة</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exp-progress" defaultChecked />
                  <label className="form-check-label" style={{ color: "var(--text)" }} htmlFor="exp-progress">التقدم والنشاط</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exp-sub" />
                  <label className="form-check-label" style={{ color: "var(--text)" }} htmlFor="exp-sub">معلومات الاشتراك</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exp-exams" />
                  <label className="form-check-label" style={{ color: "var(--text)" }} htmlFor="exp-exams">نتائج الاختبارات</label>
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowExportModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                <FaDownload className="ms-2" /> تصدير
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showAddStudentModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowAddStudentModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "550px", maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>إضافة طالب جديد</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الاسم الكامل *</label>
                <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="أدخل الاسم" />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>البريد الإلكتروني *</label>
                <input type="email" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="example@email.com" />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>رقم الهاتف *</label>
                <input type="tel" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="+966..." />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>نوع الاشتراك</label>
                <select className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}>
                  <option value="free">مجاني</option>
                  <option value="premium">متميز</option>
                  <option value="enterprise">مؤسسي</option>
                </select>
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>تاريخ الميلاد</label>
                <input type="date" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الجنس</label>
                <select className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}>
                  <option value="">اختر...</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>الدولة</label>
                <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="المملكة العربية السعودية" />
              </div>
              <div className="col-md-6">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>المدينة</label>
                <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="الرياض" />
              </div>
              <div className="col-12">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>جهة اتصال الطوارئ</label>
                <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="اسم - رقم الهاتف" />
              </div>
              <div className="col-12">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>اسم ولي الأمر</label>
                <input type="text" className="form-control" style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }} placeholder="أدخل اسم ولي الأمر" />
              </div>
              <div className="col-12">
                <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>احتياجات خاصة / إعاقة</label>
                <textarea className="form-control" rows={2} style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)", resize: "none" }} placeholder="أدخل أي احتياجات خاصة..." />
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowAddStudentModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                <FaUserPlus className="ms-2" /> إضافة الطالب
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showExamDetailsModal && selectedExam && activeAttempt && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowExamDetailsModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "700px", maxWidth: "95%", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h5 className="fw-bold mb-2" style={{ color: "var(--text)" }}>{selectedExam.title}</h5>
                <div className="d-flex gap-3 flex-wrap" style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
                  <span><FaBook /> {selectedExam.courseName}</span>
                  <span><FaCalendarAlt /> {selectedExam.date}</span>
                  <span><FaStopwatch /> {activeAttempt.timeSpent}</span>
                  <span><FaUserTag /> المحاولة #{activeAttempt.attemptNumber}</span>
                </div>
              </div>
              <button onClick={() => setShowExamDetailsModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px", backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                <FaTimes style={{ color: "var(--text-light)" }} />
              </button>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-3 col-6">
                <div className="p-3 rounded text-center" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div className="fw-bold" style={{ color: selectedExam.passed ? "var(--success)" : "var(--danger)", fontSize: "1.5rem" }}>{selectedExam.score}%</div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>الدرجة النهائية</div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="p-3 rounded text-center" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div className="fw-bold" style={{ color: "var(--success)", fontSize: "1.5rem" }}>{selectedExam.correctAnswers}</div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>إجابات صحيحة</div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="p-3 rounded text-center" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div className="fw-bold" style={{ color: "var(--danger)", fontSize: "1.5rem" }}>{selectedExam.wrongAnswers}</div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>إجابات خاطئة</div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="p-3 rounded text-center" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                  <div className="fw-bold" style={{ color: "var(--text-light)", fontSize: "1.5rem" }}>{selectedExam.skippedQuestions}</div>
                  <div style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>متروكة</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>إجابات الطالب</h6>
              {activeAttempt.answers && activeAttempt.answers.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {activeAttempt.answers.map((answer, idx) => {
                    const status = getAnswerStatusColor(answer.studentAnswer, answer.correctAnswer);
                    return (
                      <div key={answer.id} className="p-3 rounded" style={{ backgroundColor: status.bg, border: "1px solid var(--border)" }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge" style={{ backgroundColor: "var(--surface)", color: "var(--text)", fontSize: "0.75rem" }}>#{idx + 1}</span>
                            {getQuestionTypeIcon(answer.questionType)}
                            <span style={{ color: "var(--text)", fontSize: "0.9rem", fontWeight: "bold" }}>{answer.question}</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span style={{ color: status.color, fontSize: "0.85rem" }}>{status.icon}</span>
                            <span style={{ color: "var(--text)", fontSize: "0.85rem" }}>{answer.earnedPoints}/{answer.points} نقطة</span>
                          </div>
                        </div>
                        <div className="row g-2 mt-2">
                          <div className="col-12 col-md-6">
                            <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "4px" }}>إجابة الطالب:</div>
                            <div style={{ color: answer.studentAnswer === answer.correctAnswer ? "var(--success)" : "var(--danger)", fontSize: "0.9rem", padding: "8px", backgroundColor: "var(--background)", borderRadius: "6px" }}>
                              {answer.studentAnswer || "لم ي-answer"}
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "4px" }}>الإجابة الصحيحة:</div>
                            <div style={{ color: "var(--success)", fontSize: "0.9rem", padding: "8px", backgroundColor: "var(--surface-elevated)", borderRadius: "6px" }}>
                              {answer.correctAnswer}
                            </div>
                          </div>
                        </div>
                        {answer.feedback && (
                          <div className="mt-2 p-2 rounded" style={{ backgroundColor: "var(--surface)", fontSize: "0.85rem" }}>
                            <FaInfoCircle className="ms-1" style={{ color: "var(--primary)" }} />
                            <span style={{ color: "var(--primary)" }}> ملاحظة المعلم: {answer.feedback}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-4" style={{ color: "var(--text-light)" }}>
                  <FaFileAlt size={36} className="mb-2 opacity-50" />
                  <p>لا تتوفر تفاصيل الإجابات لهذه المحاولة</p>
                </div>
              )}
            </div>

            {activeAttempt.notes && (
              <div className="p-3 rounded mb-4" style={{ backgroundColor: "rgba(33, 150, 243, 0.1)", border: "1px solid #2196f3" }}>
                <div className="fw-bold mb-1" style={{ color: "#2196f3" }}><FaInfoCircle className="ms-1" /> ملاحظات المصحح</div>
                <div style={{ color: "var(--text)", fontSize: "0.9rem" }}>{activeAttempt.notes}</div>
              </div>
            )}

            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowExamDetailsModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إغلاق
              </button>
              <button className="btn" style={{ backgroundColor: "var(--primary)", color: "white", borderRadius: "8px" }}>
                <FaDownload className="ms-2" /> تصدير كـ PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showGradingModal && selectedExam && activeAttempt && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000 }} onClick={() => setShowGradingModal(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="p-4 rounded" style={{ backgroundColor: "var(--surface)", width: "600px", maxWidth: "95%", maxHeight: "90vh", overflowY: "auto" }}>
            <h5 className="fw-bold mb-4" style={{ color: "var(--text)" }}>
              <FaEdit className="ms-2" /> تصحيح الاختبار: {selectedExam.title}
            </h5>

            <div className="mb-4">
              <h6 className="fw-bold mb-3" style={{ color: "var(--text)" }}>الأسئلة المطلوبة التصحيح</h6>
              {activeAttempt.answers && activeAttempt.answers.filter(a => a.questionType === "essay" || a.questionType === "short_answer").length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {activeAttempt.answers.filter(a => a.questionType === "essay" || a.questionType === "short_answer").map((answer, idx) => (
                    <div key={answer.id} className="p-3 rounded" style={{ backgroundColor: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge" style={{ backgroundColor: "var(--primary)", color: "white", fontSize: "0.75rem" }}>سؤال {idx + 1}</span>
                          <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>{getQuestionTypeLabel(answer.questionType)}</span>
                        </div>
                        <span className="badge" style={{ backgroundColor: "var(--surface)", color: "var(--text)", fontSize: "0.8rem" }}>{answer.points} نقطة</span>
                      </div>
                      <div className="mb-2" style={{ color: "var(--text)", fontWeight: "bold", fontSize: "0.95rem" }}>{answer.question}</div>
                      <div className="mb-2 p-2 rounded" style={{ backgroundColor: "var(--background)", fontSize: "0.85rem" }}>
                        <strong style={{ color: "var(--text-light)" }}>إجابة الطالب:</strong>
                        <div style={{ color: "var(--text)", marginTop: "4px" }}>{answer.studentAnswer || "لم ي-answer"}</div>
                      </div>
                      <div className="mb-2 p-2 rounded" style={{ backgroundColor: "rgba(88, 204, 2, 0.1)", fontSize: "0.85rem" }}>
                        <strong style={{ color: "var(--success)" }}>الإجابة الصحيحة:</strong>
                        <div style={{ color: "var(--text)", marginTop: "4px" }}>{answer.correctAnswer}</div>
                      </div>
                      <div className="d-flex align-items-center gap-3 mt-3">
                        <label style={{ color: "var(--text)", fontSize: "0.9rem" }}>الدرجة:</label>
                        <input
                          type="number"
                          defaultValue={answer.earnedPoints}
                          min={0}
                          max={answer.points}
                          className="form-control"
                          style={{ width: "80px", backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)" }}
                        />
                        <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>من {answer.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4" style={{ color: "var(--text-light)" }}>
                  <FaCheckCircle size={36} className="mb-2 opacity-50" />
                  <p>جميع الأسئلة مصححة تلقائياً</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label style={{ color: "var(--text)", fontSize: "0.9rem", marginBottom: "8px", display: "block" }}>ملاحظات للمstudent</label>
              <textarea
                value={gradingNote}
                onChange={(e) => setGradingNote(e.target.value)}
                className="form-control"
                rows={3}
                style={{ backgroundColor: "var(--surface-elevated)", border: "2px solid var(--border)", color: "var(--text)", resize: "none" }}
                placeholder="أدخل ملاحظات حول أداء الطالب في هذا الاختبار..."
              />
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button onClick={() => setShowGradingModal(false)} className="btn" style={{ backgroundColor: "var(--surface-elevated)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                إلغاء
              </button>
              <button onClick={() => setShowGradingModal(false)} className="btn" style={{ backgroundColor: "var(--success)", color: "white", borderRadius: "8px" }}>
                <FaSave className="ms-2" /> حفظ التصحيح
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SupportStudentsPage;