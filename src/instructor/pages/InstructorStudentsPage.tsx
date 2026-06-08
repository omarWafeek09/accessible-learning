import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaUserGraduate, FaBook, FaTrophy, FaClipboardCheck,
  FaClock, FaCheckCircle, FaTimesCircle, FaChartLine, FaChevronDown,
  FaEye, FaStar, FaMedal
} from 'react-icons/fa';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedAt: string;
}

interface CourseProgress {
  courseId: string;
  courseTitle: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccess: string;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface ExamResult {
  examId: string;
  examTitle: string;
  score: number;
  passingScore: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  timeSpent: number;
}

interface StudentData {
  student: Student;
  courses: CourseProgress[];
  totalPoints: number;
  exams: ExamResult[];
  rank: number;
}

const mockStudents: StudentData[] = [
  {
    student: { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', phone: '0551234567', joinedAt: '2024-01-15' },
    courses: [
      { courseId: '1', courseTitle: 'مقدمة في التواصل AAC', progress: 85, completedLessons: 20, totalLessons: 24, lastAccess: '2024-03-15', status: 'in_progress' },
      { courseId: '2', courseTitle: 'مهارات اجتماعية للمبتدئين', progress: 100, completedLessons: 15, totalLessons: 15, lastAccess: '2024-03-10', status: 'completed' },
    ],
    totalPoints: 1250,
    rank: 1,
    exams: [
      { examId: '1', examTitle: 'اختبار الفصل الأول', score: 90, passingScore: 70, totalQuestions: 10, correctAnswers: 9, completedAt: '2024-03-01', timeSpent: 8 },
      { examId: '2', examTitle: 'اختبار المهارات', score: 85, passingScore: 70, totalQuestions: 8, correctAnswers: 7, completedAt: '2024-03-10', timeSpent: 12 },
    ]
  },
  {
    student: { id: '2', name: 'سارة علي', email: 'sara@example.com', phone: '0551234568', joinedAt: '2024-01-20' },
    courses: [
      { courseId: '1', courseTitle: 'مقدمة في التواصل AAC', progress: 45, completedLessons: 11, totalLessons: 24, lastAccess: '2024-03-14', status: 'in_progress' },
    ],
    totalPoints: 480,
    rank: 3,
    exams: [
      { examId: '1', examTitle: 'اختبار الفصل الأول', score: 75, passingScore: 70, totalQuestions: 10, correctAnswers: 8, completedAt: '2024-03-05', timeSpent: 15 },
    ]
  },
  {
    student: { id: '3', name: 'خالد عمر', email: 'khaled@example.com', phone: '0551234569', joinedAt: '2024-02-01' },
    courses: [
      { courseId: '1', courseTitle: 'مقدمة في التواصل AAC', progress: 100, completedLessons: 24, totalLessons: 24, lastAccess: '2024-03-12', status: 'completed' },
      { courseId: '2', courseTitle: 'مهارات اجتماعية للمبتدئين', progress: 60, completedLessons: 9, totalLessons: 15, lastAccess: '2024-03-14', status: 'in_progress' },
    ],
    totalPoints: 980,
    rank: 2,
    exams: [
      { examId: '1', examTitle: 'اختبار الفصل الأول', score: 95, passingScore: 70, totalQuestions: 10, correctAnswers: 10, completedAt: '2024-02-20', timeSpent: 6 },
    ]
  },
  {
    student: { id: '4', name: 'فاطمة يوسف', email: 'fatima@example.com', phone: '0551234570', joinedAt: '2024-02-10' },
    courses: [
      { courseId: '2', courseTitle: 'مهارات اجتماعية للمبتدئين', progress: 30, completedLessons: 5, totalLessons: 15, lastAccess: '2024-03-13', status: 'in_progress' },
    ],
    totalPoints: 220,
    rank: 5,
    exams: []
  },
  {
    student: { id: '5', name: 'منى عبدالله', email: 'mona@example.com', phone: '0551234571', joinedAt: '2024-02-15' },
    courses: [
      { courseId: '1', courseTitle: 'مقدمة في التواصل AAC', progress: 15, completedLessons: 4, totalLessons: 24, lastAccess: '2024-03-11', status: 'in_progress' },
    ],
    totalPoints: 150,
    rank: 6,
    exams: []
  },
  {
    student: { id: '6', name: 'علي حسن', email: 'ali@example.com', phone: '0551234572', joinedAt: '2024-03-01' },
    courses: [
      { courseId: '1', courseTitle: 'مقدمة في التواصل AAC', progress: 55, completedLessons: 13, totalLessons: 24, lastAccess: '2024-03-15', status: 'in_progress' },
      { courseId: '2', courseTitle: 'مهارات اجتماعية للمبتدئين', progress: 40, completedLessons: 6, totalLessons: 15, lastAccess: '2024-03-14', status: 'in_progress' },
    ],
    totalPoints: 350,
    rank: 4,
    exams: [
      { examId: '1', examTitle: 'اختبار الفصل الأول', score: 65, passingScore: 70, totalQuestions: 10, correctAnswers: 7, completedAt: '2024-03-12', timeSpent: 20 },
    ]
  },
];

const mockCourses = [
  { id: '1', title: 'مقدمة في التواصل AAC' },
  { id: '2', title: 'مهارات اجتماعية للمبتدئين' },
];

const InstructorStudentsPage = () => {
  const [students, setStudents] = useState<StudentData[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || s.courses.some(c => c.courseId === courseFilter);
    return matchesSearch && matchesCourse;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return { bg: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)' };
      case 'in_progress': return { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' };
      default: return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in_progress': return 'قيد التعلم';
      default: return 'لم يبدأ';
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: <FaMedal style={{ color: '#ffd700' }} />, bg: 'rgba(255, 215, 0, 0.15)' };
    if (rank === 2) return { icon: <FaMedal style={{ color: '#c0c0c0' }} />, bg: 'rgba(192, 192, 192, 0.15)' };
    if (rank === 3) return { icon: <FaMedal style={{ color: '#cd7f32' }} />, bg: 'rgba(205, 127, 50, 0.15)' };
    return { icon: null, bg: 'transparent' };
  };

  const viewStudentDetails = (student: StudentData) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const getExamStatus = (score: number, passingScore: number) => {
    if (score >= passingScore) return { text: 'ناجح', color: 'var(--primary)', bg: 'rgba(88, 204, 2, 0.15)' };
    return { text: 'راسب', color: 'var(--danger)', bg: 'rgba(220, 38, 38, 0.15)' };
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: 'var(--text)' }}>طلاب</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            {students.length} طالب | الترتيب الأعلى: {students.reduce((a, b) => a.totalPoints > b.totalPoints ? a : b).student.name}
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                  <FaUserGraduate style={{ color: '#8b5cf6', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>إجمالي الطلاب</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{students.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(88, 204, 2, 0.15)' }}>
                  <FaTrophy style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>مجموع النقاط</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{students.reduce((a, b) => a + b.totalPoints, 0).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                  <FaClipboardCheck style={{ color: '#3b82f6', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>الاختبارات المكتملة</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{students.reduce((a, b) => a + b.exams.length, 0)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="البحث بالاسم أو البريد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', paddingRight: '40px' }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="form-select"
                style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
              >
                <option value="all">كل الدورات</option>
                {mockCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الطالب</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدورات</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التقدم</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>النقاط</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الترتيب</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(studentData => (
                  <tr key={studentData.student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
                          {studentData.student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold" style={{ color: 'var(--text)' }}>{studentData.student.name}</div>
                          <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{studentData.student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex flex-column gap-1">
                        {studentData.courses.slice(0, 2).map((course, i) => (
                          <span key={i} className="px-2 py-1 rounded-pill" style={{ backgroundColor: getStatusStyle(course.status).bg, color: getStatusStyle(course.status).color, fontSize: '0.75rem' }}>
                            {course.courseTitle.substring(0, 20)}...
                          </span>
                        ))}
                        {studentData.courses.length > 2 && <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>+{studentData.courses.length - 2} أخرى</span>}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-pill" style={{ width: '80px', height: '8px', backgroundColor: 'var(--border)' }}>
                          <div className="rounded-pill" style={{ width: `${Math.max(...studentData.courses.map(c => c.progress))}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                        </div>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{Math.max(...studentData.courses.map(c => c.progress))}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <FaStar style={{ color: '#fbbf24' }} />
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{studentData.totalPoints}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-2">
                        {getRankBadge(studentData.rank).icon && (
                          <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: getRankBadge(studentData.rank).bg, fontSize: '0.85rem' }}>
                            #{studentData.rank}
                          </span>
                        )}
                        {!getRankBadge(studentData.rank).icon && (
                          <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                            #{studentData.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button 
                        onClick={() => viewStudentDetails(studentData)}
                        className="btn d-flex align-items-center gap-2"
                        style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '8px 16px', border: '1px solid var(--border)' }}
                      >
                        <FaEye style={{ fontSize: '0.9rem' }} />
                        عرض
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStudents.length === 0 && (
            <div className="text-center py-5">
              <FaUserGraduate style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-light)' }}>لا توجد نتائج</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showDetailsModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '700px', width: '90%', maxHeight: '85vh', overflow: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {selectedStudent.student.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="h5 fw-bold mb-1" style={{ color: 'var(--text)' }}>{selectedStudent.student.name}</h2>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0 }}>{selectedStudent.student.email}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className="btn p-2" style={{ color: 'var(--text-light)' }}>✕</button>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', textAlign: 'center' }}>
                    <FaTrophy style={{ color: '#8b5cf6', fontSize: '1.5rem', marginBottom: '0.5rem' }} />
                    <div className="h4 fw-bold" style={{ color: 'var(--text)' }}>{selectedStudent.totalPoints}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>نقاط</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.15)', textAlign: 'center' }}>
                    <FaBook style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '0.5rem' }} />
                    <div className="h4 fw-bold" style={{ color: 'var(--text)' }}>{selectedStudent.courses.length}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>دورات</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', textAlign: 'center' }}>
                    <FaClipboardCheck style={{ color: '#3b82f6', fontSize: '1.5rem', marginBottom: '0.5rem' }} />
                    <div className="h4 fw-bold" style={{ color: 'var(--text)' }}>{selectedStudent.exams.length}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>اختبارات</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>
                  <FaBook className="ms-2" style={{ color: 'var(--primary)' }} />
                  تقدم الدورات
                </h3>
                <div className="d-flex flex-column gap-3">
                  {selectedStudent.courses.map((course, i) => (
                    <div key={i} className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{course.courseTitle}</span>
                        <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: getStatusStyle(course.status).bg, color: getStatusStyle(course.status).color, fontSize: '0.75rem' }}>
                          {getStatusText(course.status)}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-pill flex-grow-1" style={{ height: '8px', backgroundColor: 'var(--border)' }}>
                          <div className="rounded-pill" style={{ width: `${course.progress}%`, height: '100%', backgroundColor: course.status === 'completed' ? 'var(--primary)' : '#fbbf24' }} />
                        </div>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem', minWidth: '60px' }}>{course.completedLessons}/{course.totalLessons}</span>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <small style={{ color: 'var(--text-light)' }}>آخر وصول: {course.lastAccess}</small>
                        <small style={{ color: 'var(--text)' }}>{course.progress}%</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedStudent.exams.length > 0 && (
                <div>
                  <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>
                    <FaClipboardCheck className="ms-2" style={{ color: 'var(--primary)' }} />
                    نتائج الاختبارات
                  </h3>
                  <div className="d-flex flex-column gap-3">
                    {selectedStudent.exams.map((exam, i) => {
                      const status = getExamStatus(exam.score, exam.passingScore);
                      return (
                        <div key={i} className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold" style={{ color: 'var(--text)' }}>{exam.examTitle}</span>
                            <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: status.bg, color: status.color, fontSize: '0.75rem' }}>
                              {status.text}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-4">
                            <div className="d-flex align-items-center gap-2">
                              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: exam.score >= exam.passingScore ? 'rgba(88, 204, 2, 0.15)' : 'rgba(220, 38, 38, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="fw-bold" style={{ color: exam.score >= exam.passingScore ? 'var(--primary)' : 'var(--danger)', fontSize: '1.1rem' }}>{exam.score}%</span>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between mb-1">
                                <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>الإجابات الصحيحة</span>
                                <span style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{exam.correctAnswers}/{exam.totalQuestions}</span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>الوقت المستغرق</span>
                                <span style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{exam.timeSpent} دقيقة</span>
                              </div>
                            </div>
                          </div>
                          <small style={{ color: 'var(--text-light)' }}>تاريخ الإكمال: {exam.completedAt}</small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InstructorStudentsPage;