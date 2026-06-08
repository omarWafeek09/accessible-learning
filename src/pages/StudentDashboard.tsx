// src\pages\StudentDashboard.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  StudentLayout,
  StudentCoursesPage,
  StudentSchedulePage,
  StudentProgressPage,
  StudentSettingsPage,
  StudentGamesPage,
  StudentLiveSessionsPage,
  StudentNotificationsPage,
  StudentPlansPage,
  StudentTreatmentProtocolsPage,
  StudentCommunityPage,
} from '../student';
import { FaArrowRight, FaClock, FaUsers, FaStar, FaPlay, FaBars, FaCheckCircle, FaLock, FaFileAlt, FaMedal, FaVolumeUp } from 'react-icons/fa';

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState('courses');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    window.history.pushState(null, "", path);
    if (path.startsWith('/student/view-course/')) {
      const courseId = path.split('/view-course/')[1];
      setSelectedCourseId(courseId);
      setActivePage('view-course');
    } else {
      const cleanPath = path.replace("/student", "").replace("/", "");
      setActivePage(cleanPath || "courses");
    }
  };

  const syncPageFromPath = (path: string) => {
    if (path === '/student' || path === '/student/') {
      setActivePage('courses');
    } else if (path.includes('/student/view-course/')) {
      const courseId = path.split('/view-course/')[1];
      setSelectedCourseId(courseId);
      setActivePage('view-course');
    } else if (path.includes('/student/courses')) {
      setActivePage('courses');
    } else if (path.includes('/student/live-sessions')) {
      setActivePage('live-sessions');
    } else if (path.includes('/student/games')) {
      setActivePage('games');
    } else if (path.includes('/student/schedule')) {
      setActivePage('schedule');
    } else if (path.includes('/student/progress')) {
      setActivePage('progress');
    } else if (path.includes('/student/community')) {
      setActivePage('community');
    } else if (path.includes('/student/notifications')) {
      setActivePage('notifications');
    } else if (path.includes('/student/settings')) {
      setActivePage('settings');
    } else if (path.includes('/student/plans')) {
      setActivePage('plans');
    } else if (path.includes('/student/protocols')) {
      setActivePage('protocols');
    } else if (path.includes('/student/treatment-protocols')) {
      handleNavigate('/student/protocols');
      return;
    } else {
      setActivePage('courses');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    syncPageFromPath(window.location.pathname);

    const handlePopState = () => {
      syncPageFromPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'view-course':
        return <CourseDetailView courseId={selectedCourseId} onBack={() => handleNavigate('/student/courses')} />;
      case 'courses':
        return <StudentCoursesPage onNavigate={handleNavigate} />;
      case 'live-sessions':
        return <StudentLiveSessionsPage />;
      case 'games':
        return <StudentGamesPage />;
      case 'schedule':
        return <StudentSchedulePage />;
      case 'progress':
        return <StudentProgressPage />;
      case 'community':
        return <StudentCommunityPage />;
      case 'notifications':
        return <StudentNotificationsPage />;
      case 'settings':
        return <StudentSettingsPage />;
      case 'plans':
        return <StudentPlansPage />;
      case 'protocols':
        return <StudentTreatmentProtocolsPage />;
      default:
        return <StudentCoursesPage onNavigate={handleNavigate} />;
    }
  };

  const sidebarSection = activePage === 'view-course' ? 'courses' : activePage;

  return (
    <StudentLayout 
      activeSection={sidebarSection}
      setActiveSection={setActivePage}
      onNavigate={handleNavigate}
    >
      {renderPage()}
    </StudentLayout>
  );
};

interface Course {
  id: string;
  thumbnail: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  duration: string;
  level: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
  };
  price: string;
  isFree: boolean;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: { title: string; lessons: { title: string; duration: string; type: string }[] }[];
  tags: string[];
  progress?: number;
}

const mockCourses: Course[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    title: 'تعلم اللغة الإنجليزية للمبتدئين',
    category: 'اللغات',
    description: 'تعلم أساسيات اللغة الإنجليزية من الصفر',
    longDescription: 'هذا الكورس مصمم للمبتدئين الذين يرغبون في تعلم اللغة الإنجليزية. يتضمن أساسيات النحو والمحادثة والقراءة.',
    duration: '20 ساعة',
    level: 'مبتدئ',
    lessons: 15,
    students: 1250,
    rating: 4.8,
    instructor: {
      name: 'أحمد محمد',
      title: 'مدرس لغة إنجليزية',
      bio: 'خبرة 10 سنوات في تدريس اللغة الإنجليزية.',
      avatar: ''
    },
    price: 'مجاني',
    isFree: true,
    whatYouWillLearn: [
      'أساسيات النحو الإنجليزي',
      'المحادثة اليومية',
      'مهارات القراءة',
      'الكتابة الأساسية',
      'الاستماع والفهم'
    ],
    requirements: [
      'لا يشترط خبرة سابقة',
      'الرغبة في التعلم',
      'الجهاز اللوحي أو الحاسوب'
    ],
    curriculum: [
      {
        title: 'الوحدة الأولى: الحروف والأصوات',
        lessons: [
          { title: 'الحروف الإنجليزية', duration: '15:00', type: 'video' },
          { title: 'الأصوات الأساسية', duration: '20:00', type: 'video' },
          { title: 'التدريب على النطق', duration: '10:00', type: 'video' }
        ]
      },
      {
        title: 'الوحدة الثانية: الكلمات الأساسية',
        lessons: [
          { title: 'الأفعال الشائعة', duration: '25:00', type: 'video' },
          { title: 'الأسماء والأوصاف', duration: '20:00', type: 'video' },
          { title: 'اختبار الوحدة', duration: '15:00', type: 'quiz' }
        ]
      },
      {
        title: 'الوحدة الثالثة: الجمل البسيطة',
        lessons: [
          { title: 'تركيب الجملة', duration: '30:00', type: 'video' },
          { title: 'أسئلة بسيطة', duration: '20:00', type: 'video' },
          { title: 'محادثة يومية', duration: '25:00', type: 'video' }
        ]
      }
    ],
    tags: ['إنجليزي', 'لغات', 'مبتدئ', 'أساسيات'],
    progress: 65
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
    title: 'الرياضيات الأساسية للمرحلة الابتدائية',
    category: 'الرياضيات',
    description: 'تعلم أساسيات الرياضيات للصفوف الأولى',
    longDescription: 'برنامج متكامل لتعليم الرياضيات للأطفال في المرحلة الابتدائية يشمل العد والجمع والطرح.',
    duration: '15 ساعة',
    level: 'مبتدئ',
    lessons: 12,
    students: 890,
    rating: 4.7,
    instructor: {
      name: 'سارة علي',
      title: 'معلمة رياضيات',
      bio: 'معلمة رياضيات بخبرة 8 سنوات.',
      avatar: ''
    },
    price: 'مجاني',
    isFree: true,
    whatYouWillLearn: [
      'الأرقام والعد',
      'الجمع والطرح',
      'الضرب والقسمة البسيطة',
      'الأشكال الهندسية',
      'القياس'
    ],
    requirements: [
      'عمر 6-10 سنوات',
      'معرفة الأرقام'
    ],
    curriculum: [
      {
        title: 'الأرقام والعد',
        lessons: [
          { title: 'الأرقام من 1-10', duration: '10:00', type: 'video' },
          { title: 'الأرقام من 11-20', duration: '10:00', type: 'video' }
        ]
      },
      {
        title: 'العمليات الأساسية',
        lessons: [
          { title: 'الجمع', duration: '15:00', type: 'video' },
          { title: 'الطرح', duration: '15:00', type: 'video' }
        ]
      }
    ],
    tags: ['رياضيات', 'مرحلة ابتدائية', 'أطفال'],
    progress: 40
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop',
    title: 'مهارات التواصل والتعبير',
    category: 'المهارات',
    description: 'تطوير مهارات التواصل الفعال',
    longDescription: 'كورس شامل لتطوير مهارات التواصل والتعبير عند الأطفال.',
    duration: '10 ساعات',
    level: 'متوسط',
    lessons: 8,
    students: 650,
    rating: 4.9,
    instructor: {
      name: 'منى حسن',
      title: 'أخصائية نطق وكلام',
      bio: 'دكتوراه في اضطرابات التواصل.',
      avatar: ''
    },
    price: '49 ريال',
    isFree: false,
    whatYouWillLearn: [
      'التعبير عن الاحتياجات',
      'الاستماع الفعال',
      'التواصل مع الآخرين',
      'حل المشكلات'
    ],
    requirements: [
      'عمر 5-12 سنة'
    ],
    curriculum: [
      {
        title: 'أساسيات التواصل',
        lessons: [
          { title: 'مقدمة في التواصل', duration: '20:00', type: 'video' },
          { title: 'أنواع التواصل', duration: '25:00', type: 'video' }
        ]
      }
    ],
    tags: ['تواصل', 'مهارات', 'تعبير'],
    progress: 85
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
    title: 'العلوم الطبيعية والحياة',
    category: 'العلوم',
    description: 'اكتشف عالم العلوم',
    longDescription: 'كورس تفاعلي لتعليم العلوم الطبيعية للأطفال.',
    duration: '25 ساعة',
    level: 'متوسط',
    lessons: 20,
    students: 420,
    rating: 4.6,
    instructor: {
      name: 'خالد عمر',
      title: 'معلم علوم',
      bio: 'معلم علوم بخبرة 12 سنة.',
      avatar: ''
    },
    price: '79 ريال',
    isFree: false,
    whatYouWillLearn: [
      'جسم الإنسان',
      'النباتات',
      'الحيوانات',
      'البيئة'
    ],
    requirements: [
      'عمر 7-12 سنة'
    ],
    curriculum: [
      {
        title: 'جسم الإنسان',
        lessons: [
          { title: 'الجهاز التنفسي', duration: '20:00', type: 'video' },
          { title: 'الجهاز الهضمي', duration: '25:00', type: 'video' }
        ]
      }
    ],
    tags: ['علوم', 'حياة', 'طبيعة'],
    progress: 20
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop',
    title: 'فنون الرسم والتلوين',
    category: 'الفنون',
    description: 'اكتشف عالم الفن والإبداع',
    longDescription: 'كورس ممتع لتعليم الرسم والتلوين للأطفال.',
    duration: '12 ساعة',
    level: 'مبتدئ',
    lessons: 10,
    students: 780,
    rating: 4.9,
    instructor: {
      name: 'ليلى محمد',
      title: 'فنانة ومعلمة فنون',
      bio: 'فنانة بتشكيل خبرة 15 سنة.',
      avatar: ''
    },
    price: 'مجاني',
    isFree: true,
    whatYouWillLearn: [
      'أساسيات الرسم',
      'الألوان والتلوين',
      'الرسم الإبداعي',
      'التعبير بالفن'
    ],
    requirements: [
      'لا يشترط خبرة',
      'أقلام ألوان وورق'
    ],
    curriculum: [
      {
        title: 'الوحدة الأولى',
        lessons: [
          { title: 'مقدمة في الرسم', duration: '15:00', type: 'video' }
        ]
      }
    ],
    tags: ['فن', 'رسم', 'إبداع', 'تلوين'],
    progress: 0
  }
];

const getLevelColor = (level: string) => {
  switch(level) {
    case 'مبتدئ': return 'var(--primary)';
    case 'متوسط': return 'var(--warning)';
    case 'متقدم': return 'var(--danger)';
    default: return 'var(--primary)';
  }
};

const CourseDetailView = ({ courseId, onBack }: { courseId: string | null; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];

  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const speakDescription = () => {
    if (!window.responsiveVoice) return;
    if (isSpeaking) {
      window.responsiveVoice.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    window.responsiveVoice.speak(
      `${course.title}. ${course.longDescription || course.description}`,
      'Arabic Female',
      { rate: 0.9, pitch: 1, onend: () => setIsSpeaking(false), onerror: () => setIsSpeaking(false) }
    );
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'curriculum', label: 'المنهج' },
    { id: 'instructor', label: 'المدرب' },
    { id: 'reviews', label: 'التقييمات' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-4">
        <button
          onClick={onBack}
          className="btn d-flex align-items-center gap-2 mb-3"
          style={{ color: 'var(--text-light)', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '12px', padding: '8px 16px' }}
        >
          <FaArrowRight style={{ transform: 'rotate(180deg)' }} />
          <span>العودة للدورات</span>
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="position-relative mb-4 rounded-4 overflow-hidden">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-100"
              style={{ height: '320px', objectFit: 'cover', borderRadius: '20px' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                 style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '20px' }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="btn rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--primary)',
                  border: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                }}
              >
                <FaPlay style={{ color: 'white', fontSize: '24px', marginInlineStart: '4px' }} />
              </motion.button>
            </div>
            <div className="position-absolute" style={{ bottom: '16px', right: '16px' }}>
              <span className="badge px-3 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.7)', fontSize: '0.9rem' }}>
                <FaClock className="ms-2" />
                {course.duration}
              </span>
            </div>
          </div>

          <nav className="d-flex gap-2 overflow-auto py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="btn px-4 py-2 rounded-pill fw-semibold"
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--surface-elevated)',
                  color: activeTab === tab.id ? 'white' : 'var(--text-light)',
                  border: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="col-lg-4">
          <div
            className="p-4 h-100"
            style={{ 
              borderRadius: '20px', 
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <span className="badge" style={{ backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)' }}>
                {course.category}
              </span>
              <span className="badge" style={{ backgroundColor: getLevelColor(course.level), color: 'white' }}>
                {course.level}
              </span>
            </div>

            <h3 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>{course.title}</h3>

            <div className="d-flex align-items-center gap-3 mb-3 flex-wrap" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              <span><FaStar style={{ color: 'var(--warning)' }} /> {course.rating}</span>
              <span><FaUsers /> {course.students}+</span>
              <span><FaPlay /> {course.lessons} درس</span>
            </div>

            <p className="mb-3" style={{ color: 'var(--text-light)', lineHeight: 1.8, fontSize: '0.9rem' }}>
              {course.description}
            </p>

            <div className="d-flex align-items-center gap-2 mb-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={speakDescription}
                className="btn d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--surface-elevated)',
                  border: '2px solid var(--border)',
                  color: 'var(--text)'
                }}
              >
                <FaVolumeUp />
              </motion.button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>استمع إلى الوصف</span>
            </div>

            <div className="mb-3 p-3" style={{ 
              backgroundColor: course.isFree ? 'rgba(88, 204, 2, 0.1)' : 'var(--surface-elevated)',
              borderRadius: '12px'
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>السعر</span>
                <span className="h4 fw-bold" style={{ color: course.isFree ? 'var(--primary)' : 'var(--secondary)' }}>
                  {course.price}
                </span>
              </div>
            </div>

            {course.progress !== undefined && (
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small style={{ color: 'var(--text-light)' }}>تقدمك</small>
                  <small style={{ color: 'var(--primary)' }}>{course.progress}%</small>
                </div>
                <div className="progress" style={{ height: '8px', backgroundColor: 'var(--border)' }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${course.progress}%`, backgroundColor: 'var(--primary)' }}
                  />
                </div>
              </div>
            )}

            <button
              className="btn w-100 py-2"
              style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '12px', fontWeight: 600 }}
            >
              <FaPlay className="ms-2" />
              {course.progress && course.progress > 0 ? 'متابعة التعلم' : 'ابدأ الآن'}
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-4"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <h3 className="fw-bold mb-4" style={{ color: 'var(--text)' }}>ماذا ستتعلم</h3>
              <div className="row g-3 mb-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="col-md-6">
                    <div className="d-flex align-items-start gap-3 p-3 rounded-3" style={{ 
                      backgroundColor: 'var(--surface-elevated)', 
                      height: '100%'
                    }}>
                      <FaCheckCircle className="flex-shrink-0" style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                      <span style={{ color: 'var(--text)' }}>{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>المتطلبات</h4>
              <ul className="list-unstyled mb-4">
                {course.requirements.map((req, index) => (
                  <li key={index} className="d-flex align-items-start gap-3 mb-3" style={{ color: 'var(--text-light)' }}>
                    <FaBars style={{ color: 'var(--primary)', marginTop: '4px' }} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <h4 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>الوصف</h4>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>{course.longDescription}</p>

              <div className="d-flex gap-2 flex-wrap">
                {course.tags.map((tag, index) => (
                  <span key={index} className="badge px-3 py-2" style={{ 
                    backgroundColor: 'var(--surface-elevated)', 
                    color: 'var(--text-light)',
                    fontSize: '0.85rem'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-4"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0" style={{ color: 'var(--text)' }}>منهج الكورس</h3>
                <span className="badge px-3 py-2" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                  {course.lessons} درس
                </span>
              </div>

              <div className="d-flex flex-column gap-3">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                    <button
                      onClick={() => toggleSection(section.title)}
                      className="w-100 p-3 d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: 'var(--surface-elevated)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                          {sectionIndex + 1}
                        </span>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{section.title}</span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                          {section.lessons.length} درس
                        </span>
                        <FaBars style={{ color: 'var(--text-light)' }} />
                      </div>
                    </button>
                    
                    {expandedSections.includes(section.title) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        className="border-top"
                      >
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="d-flex align-items-center justify-content-between p-3 border-bottom"
                            style={{ borderColor: 'var(--border)' }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              {lesson.type === 'video' ? (
                                <FaPlay style={{ color: 'var(--primary)' }} />
                              ) : lesson.type === 'document' ? (
                                <FaFileAlt style={{ color: 'var(--warning)' }} />
                              ) : (
                                <FaMedal style={{ color: 'var(--secondary)' }} />
                              )}
                              <span style={{ color: 'var(--text)' }}>{lesson.title}</span>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{lesson.duration}</span>
                              <FaLock style={{ color: 'var(--text-light)', fontSize: '0.8rem' }} />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'instructor' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-4"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <h3 className="fw-bold mb-4" style={{ color: 'var(--text)' }}>المدرب</h3>
              <div className="d-flex gap-4 align-items-start">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    fontSize: '2rem',
                    flexShrink: 0
                  }}
                >
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: 'var(--text)' }}>{course.instructor.name}</h4>
                  <p className="mb-2" style={{ color: 'var(--primary)' }}>{course.instructor.title}</p>
                  <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>{course.instructor.bio}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-4"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="d-flex align-items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="display-4 fw-bold" style={{ color: 'var(--text)' }}>{course.rating}</div>
                  <div className="d-flex gap-1 justify-content-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ color: i < Math.floor(course.rating) ? 'var(--warning)' : 'var(--border)', fontSize: '0.9rem' }} />
                    ))}
                  </div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{course.students} تقييم</span>
                </div>
                <div className="flex-grow-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="d-flex align-items-center gap-2 mb-2">
                      <div className="flex-grow-1" style={{ height: '8px', borderRadius: '4px', backgroundColor: 'var(--surface-elevated)' }}>
                        <div 
                          style={{ 
                            height: '100%', 
                            width: stars === 5 ? '70%' : stars === 4 ? '20%' : '10%', 
                            borderRadius: '4px',
                            backgroundColor: 'var(--warning)' 
                          }} 
                        />
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', width: '30px' }}>{stars} ★</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="fw-bold mb-4" style={{ color: 'var(--text)' }}>معلومات الكورس</h4>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>المدة</span>
                <span className="fw-bold" style={{ color: 'var(--text)' }}>{course.duration}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>عدد الدروس</span>
                <span className="fw-bold" style={{ color: 'var(--text)' }}>{course.lessons} درس</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>المستوى</span>
                <span className="fw-bold" style={{ color: 'var(--text)' }}>{course.level}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>عدد المسجلين</span>
                <span className="fw-bold" style={{ color: 'var(--text)' }}>{course.students}+</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>التقييم</span>
                <span className="fw-bold" style={{ color: 'var(--text)' }}>{course.rating}/5</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>اللغة</span>
                <span className="fw-bold" style={{ color: 'var(--text)' }}>العربية</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: 'var(--text-light)' }}>الشهادة</span>
                <span className="fw-bold" style={{ color: 'var(--primary)' }}>نعم</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h4 className="fw-bold mb-4" style={{ color: 'var(--text)' }}>كورسات مشابهة</h4>
            <div className="d-flex flex-column gap-3">
              {['تقنيات التكامل الحسي', 'بناء مهارات اجتماعية', 'العلاج بالفن'].map((title, index) => (
                <div key={index} className="d-flex gap-3 p-2" style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', cursor: 'pointer' }}>
                  <div 
                    className="rounded"
                    style={{ 
                      width: '80px', 
                      height: '60px', 
                      backgroundColor: 'var(--border)',
                      flexShrink: 0 
                    }} 
                  />
                  <div>
                    <p className="mb-1 fw-semibold" style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{title}</p>
                    <p className="mb-0" style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>مبتدئ • 45 دقيقة</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;