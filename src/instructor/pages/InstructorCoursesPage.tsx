import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaPlus, FaEdit, FaTrash, FaTimes, FaChevronLeft, FaChevronRight,
  FaFolder, FaList, FaPlay, FaVideo, FaFileAlt, FaQuestion, FaClock,
  FaArrowUp, FaArrowDown, FaLock, FaUnlock, FaUserPlus, FaUsers, FaUserSlash
} from 'react-icons/fa';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledAt: string;
  progress: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'published' | 'draft';
  lessons: number;
  students: number;
  enrolledStudents?: Student[];
}

interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'quiz';
  duration: string;
  order: number;
  isFree: boolean;
  videoUrl: string;
}

interface Question {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  passingScore: number;
  questions: Question[];
  isPublished: boolean;
}

const mockCourses: Course[] = [
  { id: '1', title: 'مقدمة في التواصل AAC', description: 'تعلم اساسيات التواصل المدعوم للحاسوب', category: 'التواصل AAC', status: 'published', lessons: 24, students: 150, enrolledStudents: [
    { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', phone: '0551234567', enrolledAt: '2024-01-15', progress: 75 },
    { id: '2', name: 'سارة علي', email: 'sara@example.com', phone: '0551234568', enrolledAt: '2024-01-20', progress: 45 },
    { id: '3', name: 'خالد عمر', email: 'khaled@example.com', phone: '0551234569', enrolledAt: '2024-02-01', progress: 100 },
  ]},
  { id: '2', title: 'مهارات اجتماعية للمبتدئين', description: 'مهارات التواصل الاجتماعي للاطفال', category: 'التوحد', status: 'published', lessons: 15, students: 85, enrolledStudents: [
    { id: '4', name: 'فاطمة يوسف', email: 'fatima@example.com', phone: '0551234570', enrolledAt: '2024-01-10', progress: 30 },
  ]},
  { id: '3', title: 'التواصل مع الآخرين', description: 'برنامج تدريبي شامل', category: 'التواصل AAC', status: 'draft', lessons: 12, students: 0, enrolledStudents: [] },
];

const mockAvailableStudents: Student[] = [
  { id: '10', name: 'منى عبدالله', email: 'mona@example.com', phone: '0551234580', enrolledAt: '', progress: 0 },
  { id: '11', name: 'علي حسن', email: 'ali@example.com', phone: '0551234581', enrolledAt: '', progress: 0 },
  { id: '12', name: 'رانية إبراهيم', email: 'rania@example.com', phone: '0551234582', enrolledAt: '', progress: 0 },
  { id: '13', name: 'ياسر سعيد', email: 'yasser@example.com', phone: '0551234583', enrolledAt: '', progress: 0 },
  { id: '14', name: 'هدى محمد', email: 'huda@example.com', phone: '0551234584', enrolledAt: '', progress: 0 },
];

const mockSections: Record<string, Section[]> = {
  '1': [
    { id: '1', title: 'مقدمة في AAC', description: 'الأساسيات والمفاهيم الأولية', order: 1, isPublished: true },
    { id: '2', title: 'أنواع الأجهزة', description: 'استعراض الأجهزة المختلفة', order: 2, isPublished: true },
    { id: '3', title: 'جداول الرموز', description: 'جداول ورموز التواصل الأساسية', order: 3, isPublished: false },
  ],
  '2': [
    { id: '1', title: 'تمارين الإحماء', description: 'تمارين بسيطة للمبتدئين', order: 1, isPublished: true },
    { id: '2', title: 'تمارين التقوية', description: 'تمارين متقدمة', order: 2, isPublished: true },
  ],
};

const mockLessons: Record<string, Lesson[]> = {
  '1': [
    { id: '1', title: 'مقدمة في التواصل AAC', description: 'تعريف بالمفاهيم الأساسية', type: 'video', duration: '15:00', order: 1, isFree: true, videoUrl: '' },
    { id: '2', title: 'أنواع أجهزة التواصل', description: 'استعراض الأجهزة', type: 'video', duration: '20:00', order: 2, isFree: false, videoUrl: '' },
    { id: '3', title: 'جدول الرموز الأساسية', description: 'جدول الرموز الأساسي', type: 'document', duration: '10:00', order: 3, isFree: false, videoUrl: '' },
  ],
  '1-1': [
    { id: '1', title: 'ما هو AAC؟', description: 'مقدمة عن التواصل المدعوم', type: 'video', duration: '10:00', order: 1, isFree: true, videoUrl: '' },
  ],
};

const mockExams: Record<string, Exam[]> = {
  '1': [
    { id: '1', title: 'اختبار الفصل الأول', description: 'اختبار على المفاهيم الأساسية', duration: 10, passingScore: 70, isPublished: true, questions: [] },
  ],
};

type ViewMode = 'courses' | 'sections' | 'lessons';

const InstructorCoursesPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('courses');
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [sections, setSections] = useState<Section[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'lessons' | 'exams'>('lessons');
  
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [availableStudents] = useState<Student[]>(mockAvailableStudents);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; item: any } | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  
  const [newCourse, setNewCourse] = useState<Partial<Course>>({ title: '', description: '', category: 'التواصل AAC', status: 'draft' });
  const [newSection, setNewSection] = useState<Partial<Section>>({ title: '', description: '', isPublished: false });
  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({ title: '', description: '', type: 'video', duration: '', isFree: false, videoUrl: '' });
  const [newExam, setNewExam] = useState<Partial<Exam>>({ title: '', description: '', duration: 10, passingScore: 70, isPublished: false, questions: [] });
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({ question: '', options: [{ id: '1', text: '', isCorrect: false }, { id: '2', text: '', isCorrect: false }], explanation: '' });

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setSections(mockSections[course.id] || []);
    setViewMode('sections');
  };

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
    const sectionId = `${selectedCourse?.id}-${section.id}`;
    setLessons(mockLessons[sectionId] || mockLessons[section.id] || []);
    setExams(mockExams[sectionId] || mockExams[section.id] || []);
    setViewMode('lessons');
  };

  const getTypeIcon = (type: string) => {
    switch (type) { case 'video': return <FaVideo />; case 'document': return <FaFileAlt />; default: return <FaPlay />; }
  };

  const getTypeStyle = (type: string) => {
    switch (type) { case 'video': return { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }; case 'document': return { backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }; default: return {}; }
  };

  const getTypeText = (type: string) => {
    switch (type) { case 'video': return 'فيديو'; case 'document': return 'مستند'; case 'quiz': return 'اختبار'; default: return type; }
  };

  const handleAddCourse = () => {
    const course: Course = { id: Date.now().toString(), title: newCourse.title || '', description: newCourse.description || '', category: newCourse.category || 'التواصل AAC', status: (newCourse.status as 'published' | 'draft') || 'draft', lessons: 0, students: 0 };
    setCourses([...courses, course]);
    setShowCourseModal(false);
    setNewCourse({ title: '', description: '', category: 'التواصل AAC', status: 'draft' });
  };

  const handleAddSection = () => {
    const section: Section = { id: Date.now().toString(), title: newSection.title || '', description: newSection.description || '', order: sections.length + 1, isPublished: newSection.isPublished || false };
    setSections([...sections, section]);
    setShowSectionModal(false);
    setNewSection({ title: '', description: '', isPublished: false });
  };

  const handleAddLesson = () => {
    const lesson: Lesson = { id: Date.now().toString(), title: newLesson.title || '', description: newLesson.description || '', type: (newLesson.type as 'video' | 'document') || 'video', duration: newLesson.duration || '0:00', order: lessons.length + 1, isFree: newLesson.isFree || false, videoUrl: newLesson.videoUrl || '' };
    setLessons([...lessons, lesson]);
    setShowLessonModal(false);
    setNewLesson({ title: '', description: '', type: 'video', duration: '', isFree: false, videoUrl: '' });
  };

  const handleAddExam = () => {
    const exam: Exam = { id: Date.now().toString(), title: newExam.title || '', description: newExam.description || '', duration: newExam.duration || 10, passingScore: newExam.passingScore || 70, isPublished: false, questions: [] };
    setExams([...exams, exam]);
    setShowExamModal(false);
    setNewExam({ title: '', description: '', duration: 10, passingScore: 70, isPublished: false, questions: [] });
  };

  const handleAddQuestion = () => {
    if (selectedExam) {
      const question: Question = { id: Date.now().toString(), question: newQuestion.question || '', options: newQuestion.options || [], explanation: newQuestion.explanation || '' };
      setExams(exams.map(e => e.id === selectedExam.id ? { ...e, questions: [...e.questions, question] } : e));
      setShowQuestionModal(false);
      setNewQuestion({ question: '', options: [{ id: '1', text: '', isCorrect: false }, { id: '2', text: '', isCorrect: false }], explanation: '' });
    }
  };

  const handleDeleteSection = () => {
    if (itemToDelete?.type === 'section') {
      setSections(sections.filter(s => s.id !== itemToDelete.item.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteLesson = () => {
    if (itemToDelete?.type === 'lesson') {
      setLessons(lessons.filter(l => l.id !== itemToDelete.item.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteExam = () => {
    if (itemToDelete?.type === 'exam') {
      setExams(exams.filter(e => e.id !== itemToDelete.item.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handlePublishSection = (sectionId: string) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, isPublished: !s.isPublished } : s));
  };

  const handlePublishExam = (examId: string) => {
    setExams(exams.map(e => e.id === examId ? { ...e, isPublished: !e.isPublished } : e));
  };

  const addOption = () => {
    setNewQuestion({ ...newQuestion, options: [...(newQuestion.options || []), { id: Date.now().toString(), text: '', isCorrect: false }] });
  };

  const updateOption = (index: number, text: string) => {
    const options = [...(newQuestion.options || [])];
    options[index] = { ...options[index], text };
    setNewQuestion({ ...newQuestion, options });
  };

  const setCorrectOption = (index: number) => {
    const options = newQuestion.options?.map((opt, i) => ({ ...opt, isCorrect: i === index })) || [];
    setNewQuestion({ ...newQuestion, options });
  };

  const handleEnrollStudents = () => {
    if (selectedCourse) {
      const studentsToEnroll = availableStudents.filter(s => selectedStudents.includes(s.id));
      const newStudents: Student[] = studentsToEnroll.map(s => ({
        ...s,
        id: Date.now().toString() + Math.random(),
        enrolledAt: new Date().toISOString().split('T')[0],
        progress: 0
      }));
      const currentStudents = selectedCourse.enrolledStudents || [];
      setCourses(courses.map(c => c.id === selectedCourse.id ? { 
        ...c, 
        students: c.students + newStudents.length,
        enrolledStudents: [...currentStudents, ...newStudents]
      } : c));
      setSelectedCourse({ ...selectedCourse, students: selectedCourse.students + newStudents.length, enrolledStudents: [...currentStudents, ...newStudents] });
      setShowEnrollModal(false);
      setSelectedStudents([]);
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    if (selectedCourse) {
      const updatedStudents = (selectedCourse.enrolledStudents || []).filter(s => s.id !== studentId);
      setCourses(courses.map(c => c.id === selectedCourse.id ? { 
        ...c, 
        students: c.students - 1,
        enrolledStudents: updatedStudents
      } : c));
      setSelectedCourse({ ...selectedCourse, students: selectedCourse.students - 1, enrolledStudents: updatedStudents });
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  if (viewMode === 'sections' && selectedCourse) {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => { setViewMode('courses'); setSelectedCourse(null); }} className="btn d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
              <FaChevronRight />
            </button>
            <div>
              <h1 className="h4 fw-bold mb-1" style={{ color: 'var(--text)' }}>{selectedCourse.title}</h1>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{sections.length} قسم | {selectedCourse.students || 0} طالب</p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button onClick={() => setShowStudentsModal(true)} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '10px 20px', border: '1px solid var(--border)' }}>
              <FaUsers /> الطلاب ({selectedCourse.students || 0})
            </button>
            <button onClick={() => { setSelectedStudents([]); setShowEnrollModal(true); }} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '10px 20px' }}>
              <FaUserPlus /> تسجيل طالب
            </button>
            <button onClick={() => setShowSectionModal(true)} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '10px 20px', border: '1px solid var(--border)' }}>
              <FaPlus /> إضافة قسم
            </button>
          </div>
        </div>

        <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="card-body p-0">
            {sections.length > 0 ? (
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '50px' }}>#</th>
                      <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>اسم القسم</th>
                      <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الوصف</th>
                      <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                      <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '120px' }}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((section, index) => (
                      <tr key={section.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '16px', color: 'var(--text-light)' }}>{index + 1}</td>
                        <td style={{ padding: '16px' }}>
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                              <FaFolder />
                            </div>
                            <span className="fw-bold" style={{ color: 'var(--text)' }}>{section.title}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--text-light)' }}>{section.description}</td>
                        <td style={{ padding: '16px' }}>
                          <span className="px-3 py-1 rounded-pill" style={{ backgroundColor: section.isPublished ? 'rgba(88, 204, 2, 0.15)' : 'rgba(251, 191, 36, 0.15)', color: section.isPublished ? 'var(--primary)' : '#fbbf24', fontSize: '0.8rem' }}>
                            {section.isPublished ? 'منشور' : 'مسودة'}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <div className="d-flex gap-1">
                            <button onClick={() => handleSectionClick(section)} className="btn p-2" style={{ color: 'var(--primary)' }} title="الدروس والاختبارات"><FaList /></button>
                            <button onClick={() => handlePublishSection(section.id)} className="btn p-2" style={{ color: section.isPublished ? 'var(--warning)' : 'var(--primary)' }}>
                              {section.isPublished ? <FaLock /> : <FaUnlock />}
                            </button>
                            <button onClick={() => { setEditingItem(section); setNewSection(section); setShowSectionModal(true); }} className="btn p-2" style={{ color: 'var(--primary)' }}><FaEdit /></button>
                            <button onClick={() => { setItemToDelete({ type: 'section', item: section }); setShowDeleteModal(true); }} className="btn p-2" style={{ color: 'var(--danger)' }}><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <FaFolder style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-light)' }}>لا توجد أقسام</p>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showSectionModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => { setShowSectionModal(false); setEditingItem(null); }}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>{editingItem ? 'تعديل قسم' : 'إضافة قسم جديد'}</h2>
                  <button onClick={() => { setShowSectionModal(false); setEditingItem(null); }} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
                </div>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label" style={{ color: 'var(--text)' }}>اسم القسم</label>
                    <input type="text" value={newSection.title || ''} onChange={(e) => setNewSection({ ...newSection, title: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} />
                  </div>
                  <div className="col-12">
                    <label className="form-label" style={{ color: 'var(--text)' }}>الوصف</label>
                    <textarea value={newSection.description || ''} onChange={(e) => setNewSection({ ...newSection, description: e.target.value })} className="form-control" rows={2} style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input type="checkbox" checked={newSection.isPublished || false} onChange={(e) => setNewSection({ ...newSection, isPublished: e.target.checked })} className="form-check-input" id="isPublished" />
                      <label className="form-check-label" style={{ color: 'var(--text)' }} htmlFor="isPublished">نشر القسم</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button onClick={() => { setShowSectionModal(false); setEditingItem(null); }} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleAddSection} className="btn flex-grow-1" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>{editingItem ? 'حفظ' : 'إضافة'}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => setShowDeleteModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '400px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-4">
                  <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(220, 38, 38, 0.15)', color: 'var(--danger)' }}><FaTrash style={{ fontSize: '1.5rem' }} /></div>
                  <h2 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>حذف القسم</h2>
                  <p style={{ color: 'var(--text-light)' }}>هل أنت متأكد من حذف القسم "{itemToDelete?.item.title}"؟</p>
                </div>
                <div className="d-flex gap-2">
                  <button onClick={() => setShowDeleteModal(false)} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleDeleteSection} className="btn flex-grow-1" style={{ backgroundColor: 'var(--danger)', color: 'white', borderRadius: '10px', padding: '12px' }}>حذف</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEnrollModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => setShowEnrollModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>تسجيل طلاب في الدورة</h2>
                  <button onClick={() => setShowEnrollModal(false)} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
                </div>
                <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>اختر الطلاب لتسجيلهم في "{selectedCourse?.title}"</p>
                <div className="d-flex flex-column gap-2 mb-4" style={{ maxHeight: '300px', overflow: 'auto' }}>
                  {availableStudents.map(student => (
                    <div key={student.id} className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)', cursor: 'pointer' }} onClick={() => toggleStudentSelection(student.id)}>
                      <input type="checkbox" checked={selectedStudents.includes(student.id)} onChange={() => {}} className="form-check-input" />
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', color: 'white' }}>{student.name.charAt(0)}</div>
                      <div className="flex-grow-1">
                        <div className="fw-bold" style={{ color: 'var(--text)' }}>{student.name}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{student.email}</div>
                      </div>
                    </div>
                  ))}
                  {availableStudents.length === 0 && <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>لا يوجد طلاب متاحين</p>}
                </div>
                <div className="d-flex gap-2">
                  <button onClick={() => setShowEnrollModal(false)} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleEnrollStudents} disabled={selectedStudents.length === 0} className="btn flex-grow-1" style={{ backgroundColor: selectedStudents.length === 0 ? 'var(--border)' : 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>تسجيل ({selectedStudents.length})</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showStudentsModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => setShowStudentsModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>طلاب الدورة</h2>
                  <button onClick={() => setShowStudentsModal(false)} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
                </div>
                <div className="d-flex flex-column gap-3">
                  {(selectedCourse?.enrolledStudents || []).map(student => (
                    <div key={student.id} className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>{student.name.charAt(0)}</div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-bold" style={{ color: 'var(--text)' }}>{student.name}</span>
                          <span className="px-2 py-0.5 rounded-pill" style={{ backgroundColor: student.progress === 100 ? 'rgba(88, 204, 2, 0.15)' : student.progress > 0 ? 'rgba(251, 191, 36, 0.15)' : 'rgba(107, 114, 128, 0.15)', color: student.progress === 100 ? 'var(--primary)' : student.progress > 0 ? '#fbbf24' : '#6b7280', fontSize: '0.75rem' }}>
                            {student.progress === 100 ? 'مكتمل' : student.progress > 0 ? `${student.progress}%` : 'لم يبدأ'}
                          </span>
                        </div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{student.email}</div>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <div className="rounded-pill" style={{ width: '80px', height: '6px', backgroundColor: 'var(--border)' }}>
                            <div className="rounded-pill" style={{ width: `${student.progress}%`, height: '100%', backgroundColor: student.progress === 100 ? 'var(--primary)' : 'var(--warning)' }} />
                          </div>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{student.enrolledAt}</span>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveStudent(student.id)} className="btn p-2" style={{ color: 'var(--danger)' }} title="إزالة من الدورة"><FaUserSlash /></button>
                    </div>
                  ))}
                  {(selectedCourse?.enrolledStudents || []).length === 0 && <div className="text-center py-4"><FaUsers style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} /><p style={{ color: 'var(--text-light)' }}>لا يوجد طلاب مسجلين</p></div>}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (viewMode === 'lessons' && selectedSection) {
    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => { setViewMode('sections'); setSelectedSection(null); }} className="btn d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
              <FaChevronRight />
            </button>
            <div>
              <h1 className="h4 fw-bold mb-1" style={{ color: 'var(--text)' }}>{selectedSection.title} - {selectedCourse?.title}</h1>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{lessons.length} درس | {exams.length} اختبار</p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button onClick={() => setActiveTab(activeTab === 'lessons' ? 'exams' : 'lessons')} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '10px 20px', border: '1px solid var(--border)' }}>
              <FaList /> {activeTab === 'lessons' ? 'الاختبارات' : 'الدروس'}
            </button>
            <button onClick={() => { if (activeTab === 'lessons') setShowLessonModal(true); else { setSelectedExam(null); setShowExamModal(true); } }} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '10px 20px' }}>
              <FaPlus /> {activeTab === 'lessons' ? 'إضافة درس' : 'إضافة اختبار'}
            </button>
          </div>
        </div>

        <div className="d-flex gap-2 mb-4">
          <button onClick={() => setActiveTab('lessons')} className="btn px-4" style={{ borderRadius: '10px', backgroundColor: activeTab === 'lessons' ? 'var(--primary)' : 'var(--surface-elevated)', color: activeTab === 'lessons' ? 'white' : 'var(--text)', border: '1px solid var(--border)' }}>
            <FaPlay className="ms-2" /> الدروس ({lessons.length})
          </button>
          <button onClick={() => setActiveTab('exams')} className="btn px-4" style={{ borderRadius: '10px', backgroundColor: activeTab === 'exams' ? 'var(--primary)' : 'var(--surface-elevated)', color: activeTab === 'exams' ? 'white' : 'var(--text)', border: '1px solid var(--border)' }}>
            <FaQuestion className="ms-2" /> الاختبارات ({exams.length})
          </button>
        </div>

        {activeTab === 'lessons' && (
          <div className="d-flex flex-column gap-3">
            {lessons.map((lesson, index) => (
              <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex flex-column gap-1">
                      <button onClick={() => { const newLessons = [...lessons]; [newLessons[index - 1], newLessons[index]] = [newLessons[index], newLessons[index - 1]]; setLessons(newLessons.map((l, i) => ({ ...l, order: i + 1 }))); }} disabled={index === 0} className="btn p-1" style={{ color: 'var(--text-light)', opacity: index === 0 ? 0.3 : 1 }}><FaArrowUp style={{ fontSize: '0.8rem' }} /></button>
                      <button onClick={() => { const newLessons = [...lessons]; [newLessons[index], newLessons[index + 1]] = [newLessons[index + 1], newLessons[index]]; setLessons(newLessons.map((l, i) => ({ ...l, order: i + 1 }))); }} disabled={index === lessons.length - 1} className="btn p-1" style={{ color: 'var(--text-light)', opacity: index === lessons.length - 1 ? 0.3 : 1 }}><FaArrowDown style={{ fontSize: '0.8rem' }} /></button>
                    </div>
                    <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', ...getTypeStyle(lesson.type) }}>{getTypeIcon(lesson.type)}</div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{lesson.title}</span>
                        {lesson.isFree && <span className="px-2 py-0.5 rounded-pill" style={{ backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)', fontSize: '0.7rem' }}>مجاني</span>}
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{lesson.description}</div>
                      <div className="d-flex align-items-center gap-3 mt-2">
                        <span className="px-2 py-1 rounded-pill" style={{ ...getTypeStyle(lesson.type), fontSize: '0.75rem' }}>{getTypeText(lesson.type)}</span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}><FaClock className="ms-1" /> {lesson.duration}</span>
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <button onClick={() => { setEditingItem(lesson); setNewLesson(lesson); setShowLessonModal(true); }} className="btn p-2" style={{ color: 'var(--primary)' }}><FaEdit /></button>
                      <button onClick={() => { setItemToDelete({ type: 'lesson', item: lesson }); setShowDeleteModal(true); }} className="btn p-2" style={{ color: 'var(--danger)' }}><FaTrash /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {lessons.length === 0 && <div className="text-center py-5"><FaPlay style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} /><p style={{ color: 'var(--text-light)' }}>لا توجد دروس</p></div>}
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="d-flex flex-column gap-3">
            {exams.map(exam => (
              <motion.div key={exam.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}><FaQuestion /></div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{exam.title}</span>
                        <span className="px-2 py-0.5 rounded-pill" style={{ backgroundColor: exam.isPublished ? 'rgba(88, 204, 2, 0.15)' : 'rgba(251, 191, 36, 0.15)', color: exam.isPublished ? 'var(--primary)' : '#fbbf24', fontSize: '0.7rem' }}>{exam.isPublished ? 'منشور' : 'مسودة'}</span>
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{exam.description}</div>
                      <div className="d-flex align-items-center gap-3 mt-2">
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}><FaClock className="ms-1" /> {exam.duration} دقيقة</span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{exam.questions.length} سؤال</span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>درجة النجاح: {exam.passingScore}%</span>
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <button onClick={() => { setSelectedExam(exam); setShowQuestionModal(true); }} className="btn p-2" style={{ color: 'var(--primary)' }} title="إضافة سؤال"><FaPlus /></button>
                      <button onClick={() => handlePublishExam(exam.id)} className="btn p-2" style={{ color: exam.isPublished ? 'var(--warning)' : 'var(--primary)' }}>{exam.isPublished ? <FaLock /> : <FaUnlock />}</button>
                      <button onClick={() => { setEditingItem(exam); setNewExam(exam); setShowExamModal(true); }} className="btn p-2" style={{ color: 'var(--primary)' }}><FaEdit /></button>
                      <button onClick={() => { setItemToDelete({ type: 'exam', item: exam }); setShowDeleteModal(true); }} className="btn p-2" style={{ color: 'var(--danger)' }}><FaTrash /></button>
                    </div>
                  </div>
                  {exam.questions.length > 0 && (
                    <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="fw-bold mb-2" style={{ color: 'var(--text)' }}>الأسئلة:</div>
                      <div className="d-flex flex-column gap-2">
                        {exam.questions.map((q, i) => (
                          <div key={q.id} className="d-flex align-items-center justify-content-between p-2 rounded-2" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                            <span style={{ color: 'var(--text)' }}>{i + 1}. {q.question}</span>
                            <button onClick={() => setExams(exams.map(e => e.id === exam.id ? { ...e, questions: e.questions.filter(qu => qu.id !== q.id) } : e))} className="btn p-1" style={{ color: 'var(--danger)' }}><FaTrash style={{ fontSize: '0.8rem' }} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {exams.length === 0 && <div className="text-center py-5"><FaQuestion style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} /><p style={{ color: 'var(--text-light)' }}>لا توجد اختبارات</p></div>}
          </div>
        )}

        <AnimatePresence>
          {showLessonModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => { setShowLessonModal(false); setEditingItem(null); }}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>{editingItem ? 'تعديل درس' : 'إضافة درس جديد'}</h2>
                  <button onClick={() => { setShowLessonModal(false); setEditingItem(null); }} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
                </div>
                <div className="row g-3">
                  <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>عنوان الدرس</label><input type="text" value={newLesson.title || ''} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>الوصف</label><textarea value={newLesson.description || ''} onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })} className="form-control" rows={2} style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-md-4"><label className="form-label" style={{ color: 'var(--text)' }}>نوع المحتوى</label><select value={newLesson.type || 'video'} onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as 'video' | 'document' })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}><option value="video">فيديو</option><option value="document">مستند</option></select></div>
                  <div className="col-md-4"><label className="form-label" style={{ color: 'var(--text)' }}>المدة</label><input type="text" value={newLesson.duration || ''} onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })} placeholder="مثال: 15:00" className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-md-4"><label className="form-label" style={{ color: 'var(--text)' }}>رابط الفيديو</label><input type="text" value={newLesson.videoUrl || ''} onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })} placeholder="رابط الفيديو" className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-12"><div className="form-check"><input type="checkbox" checked={newLesson.isFree || false} onChange={(e) => setNewLesson({ ...newLesson, isFree: e.target.checked })} className="form-check-input" id="isFree" /><label className="form-check-label" style={{ color: 'var(--text)' }} htmlFor="isFree">درس مجاني (معاينة)</label></div></div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button onClick={() => { setShowLessonModal(false); setEditingItem(null); }} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleAddLesson} className="btn flex-grow-1" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>{editingItem ? 'حفظ' : 'إضافة'}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showExamModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => { setShowExamModal(false); setEditingItem(null); }}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>{editingItem ? 'تعديل اختبار' : 'إضافة اختبار جديد'}</h2>
                  <button onClick={() => { setShowExamModal(false); setEditingItem(null); }} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
                </div>
                <div className="row g-3">
                  <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>عنوان الاختبار</label><input type="text" value={newExam.title || ''} onChange={(e) => setNewExam({ ...newExam, title: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>الوصف</label><textarea value={newExam.description || ''} onChange={(e) => setNewExam({ ...newExam, description: e.target.value })} className="form-control" rows={2} style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-md-6"><label className="form-label" style={{ color: 'var(--text)' }}>المدة (دقيقة)</label><input type="number" value={newExam.duration || 10} onChange={(e) => setNewExam({ ...newExam, duration: Number(e.target.value) })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-md-6"><label className="form-label" style={{ color: 'var(--text)' }}>درجة النجاح (%)</label><input type="number" value={newExam.passingScore || 70} onChange={(e) => setNewExam({ ...newExam, passingScore: Number(e.target.value) })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button onClick={() => { setShowExamModal(false); setEditingItem(null); }} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleAddExam} className="btn flex-grow-1" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>{editingItem ? 'حفظ' : 'إضافة'}</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showQuestionModal && selectedExam && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => setShowQuestionModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '600px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>إضافة سؤال جديد</h2>
                  <button onClick={() => setShowQuestionModal(false)} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
                </div>
                <div className="row g-3">
                  <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>السؤال</label><textarea value={newQuestion.question || ''} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} className="form-control" rows={2} style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                  <div className="col-12">
                    <label className="form-label" style={{ color: 'var(--text)' }}>الخيارات (حدد الإجابة الصحيحة)</label>
                    <div className="d-flex flex-column gap-2">
                      {newQuestion.options?.map((opt, index) => (
                        <div key={opt.id} className="d-flex align-items-center gap-2">
                          <input type="radio" name="correctOption" checked={opt.isCorrect} onChange={() => setCorrectOption(index)} className="form-check-input" />
                          <input type="text" value={opt.text} onChange={(e) => updateOption(index, e.target.value)} placeholder={`الخيار ${index + 1}`} className="form-control flex-grow-1" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} />
                        </div>
                      ))}
                      <button onClick={addOption} className="btn w-100" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', border: '1px dashed var(--border)' }}><FaPlus className="ms-2" /> إضافة خيار</button>
                    </div>
                  </div>
                  <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>الشرح (بعد الإجابة)</label><textarea value={newQuestion.explanation || ''} onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })} className="form-control" rows={2} style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button onClick={() => setShowQuestionModal(false)} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleAddQuestion} className="btn flex-grow-1" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>إضافة سؤال</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => setShowDeleteModal(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '400px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-4">
                  <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(220, 38, 38, 0.15)', color: 'var(--danger)' }}><FaTrash style={{ fontSize: '1.5rem' }} /></div>
                  <h2 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>{itemToDelete?.type === 'lesson' ? 'حذف الدرس' : 'حذف الاختبار'}</h2>
                  <p style={{ color: 'var(--text-light)' }}>هل أنت متأكد من {itemToDelete?.type === 'lesson' ? 'حذف هذا الدرس' : 'حذف هذا الاختبار'}؟</p>
                </div>
                <div className="d-flex gap-2">
                  <button onClick={() => setShowDeleteModal(false)} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={() => { if (itemToDelete?.type === 'lesson') handleDeleteLesson(); else handleDeleteExam(); }} className="btn flex-grow-1" style={{ backgroundColor: 'var(--danger)', color: 'white', borderRadius: '10px', padding: '12px' }}>حذف</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: 'var(--text)' }}>دوراتي</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{courses.length} دورة</p>
        </div>
        <button onClick={() => setShowCourseModal(true)} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '10px 20px' }}>
          <FaPlus /> إضافة دورة
        </button>
      </div>

      <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-3">
          <div className="position-relative">
            <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input type="text" placeholder="البحث في الدورات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', paddingRight: '40px' }} />
          </div>
        </div>
      </div>

      <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدورة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الفئة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدروس</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الطلاب</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map(course => (
                  <tr key={course.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}><FaFolder /></div>
                        <div>
                          <div className="fw-bold" style={{ color: 'var(--text)' }}>{course.title}</div>
                          <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{course.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}><span className="px-3 py-1 rounded-pill" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontSize: '0.8rem' }}>{course.category}</span></td>
                    <td style={{ padding: '16px' }}><span className="px-3 py-1 rounded-pill" style={{ backgroundColor: course.status === 'published' ? 'rgba(88, 204, 2, 0.15)' : 'rgba(251, 191, 36, 0.15)', color: course.status === 'published' ? 'var(--primary)' : '#fbbf24', fontSize: '0.8rem' }}>{course.status === 'published' ? 'منشور' : 'مسودة'}</span></td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{course.lessons}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{course.students}</td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex gap-1">
                        <button onClick={() => handleCourseClick(course)} className="btn p-2" style={{ color: 'var(--primary)' }} title="الأقسام"><FaList /></button>
                        <button onClick={() => { setEditingItem(course); setNewCourse(course); setShowCourseModal(true); }} className="btn p-2" style={{ color: 'var(--primary)' }}><FaEdit /></button>
                        <button onClick={() => { setItemToDelete({ type: 'course', item: course }); setShowDeleteModal(true); }} className="btn p-2" style={{ color: 'var(--danger)' }}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCourseModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => { setShowCourseModal(false); setEditingItem(null); }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>{editingItem ? 'تعديل دورة' : 'إضافة دورة جديدة'}</h2>
                <button onClick={() => { setShowCourseModal(false); setEditingItem(null); }} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
              </div>
              <div className="row g-3">
                <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>العنوان</label><input type="text" value={newCourse.title || ''} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                <div className="col-12"><label className="form-label" style={{ color: 'var(--text)' }}>الوصف</label><textarea value={newCourse.description || ''} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} className="form-control" rows={3} style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }} /></div>
                <div className="col-md-6"><label className="form-label" style={{ color: 'var(--text)' }}>الفئة</label><select value={newCourse.category || 'التواصل AAC'} onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}><option>التواصل AAC</option><option>التوحد</option><option>العلاج الطبيعي</option><option>صعوبات التعلم</option></select></div>
                <div className="col-md-6"><label className="form-label" style={{ color: 'var(--text)' }}>الحالة</label><select value={newCourse.status || 'draft'} onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value as 'published' | 'draft' })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}><option value="draft">مسودة</option><option value="published">منشور</option></select></div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button onClick={() => { setShowCourseModal(false); setEditingItem(null); }} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                <button onClick={handleAddCourse} className="btn flex-grow-1" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>{editingItem ? 'حفظ' : 'إضافة'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }} onClick={() => setShowDeleteModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '400px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-4">
                <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(220, 38, 38, 0.15)', color: 'var(--danger)' }}><FaTrash style={{ fontSize: '1.5rem' }} /></div>
                <h2 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>حذف الدورة</h2>
                <p style={{ color: 'var(--text-light)' }}>هل أنت متأكد من حذف الدورة "{itemToDelete?.item.title}"؟</p>
              </div>
              <div className="d-flex gap-2">
                <button onClick={() => setShowDeleteModal(false)} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                <button onClick={() => { setCourses(courses.filter(c => c.id !== itemToDelete?.item.id)); setShowDeleteModal(false); setItemToDelete(null); }} className="btn flex-grow-1" style={{ backgroundColor: 'var(--danger)', color: 'white', borderRadius: '10px', padding: '12px' }}>حذف</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InstructorCoursesPage;