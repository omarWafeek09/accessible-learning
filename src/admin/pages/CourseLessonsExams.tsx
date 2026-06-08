import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaPlus, FaEdit, FaTrash, FaTimes, FaChevronLeft, FaChevronRight,
  FaPlay, FaVideo, FaFileAlt, FaQuestion, FaCheck, FaClock, FaList,
  FaArrowUp, FaArrowDown, FaEye, FaLock, FaUnlock
} from 'react-icons/fa';

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'quiz';
  duration: string;
  order: number;
  isFree: boolean;
  content: string;
  videoUrl?: string;
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

interface Course {
  id: string;
  title: string;
  category: string;
}

const mockLessons: Record<string, Lesson[]> = {
  '1': [
    { id: '1', title: 'مقدمة في التواصل AAC', description: 'تعريف的概念 الأساسية للتواصل المدعوم بالحاسوب', type: 'video', duration: '15:00', order: 1, isFree: true, content: '', videoUrl: '' },
    { id: '2', title: 'أنواع أجهزة التواصل', description: 'استعراض الأجهزة المختلفة', type: 'video', duration: '20:00', order: 2, isFree: false, content: '', videoUrl: '' },
    { id: '3', title: 'جدول الرموز الأساسية', description: 'جدول رموز التواصل الأساسي', type: 'document', duration: '10:00', order: 3, isFree: false, content: '' },
    { id: '4', title: 'اختبار الفصل الأول', description: 'اختبار على المفاهيم الأساسية', type: 'quiz', duration: '10:00', order: 4, isFree: false, content: '' },
  ],
  '2': [
    { id: '1', title: 'تمارين الإحماء', description: 'مجموعة تمارين إحماء بسيطة', type: 'video', duration: '10:00', order: 1, isFree: true, content: '', videoUrl: '' },
    { id: '2', title: 'تمارين التقوية', description: 'تمارين لتقوية العضلات', type: 'video', duration: '25:00', order: 2, isFree: false, content: '', videoUrl: '' },
  ],
  '1-1': [
    { id: '1', title: 'ما هو AAC؟', description: 'مقدمة عن التواصل المدعوم', type: 'video', duration: '10:00', order: 1, isFree: true, content: '', videoUrl: '' },
    { id: '2', title: 'فوائد AAC', description: 'لماذا نستخدم AAC', type: 'video', duration: '15:00', order: 2, isFree: false, content: '', videoUrl: '' },
  ],
};

const mockExams: Record<string, Exam[]> = {
  '1': [
    { 
      id: '1', 
      title: 'اختبار الفصل الأول', 
      description: 'اختبار على المفاهيم الأساسية للتواصل AAC',
      duration: 10,
      passingScore: 70,
      isPublished: true,
      questions: [
        {
          id: '1',
          question: 'ما هو التواصل المدعوم بالحاسوب (AAC)?',
          options: [
            { id: '1', text: 'طريقة للتواصل باستخدام التكنولوجيا', isCorrect: true },
            { id: '2', text: 'نوع من لغات البرمجة', isCorrect: false },
            { id: '3', text: 'برنامج كمبيوتر', isCorrect: false },
          ],
          explanation: 'AAC هو اختصار لـ Augmentative and Alternative Communication'
        },
        {
          id: '2',
          question: 'ما هي الفائدة الرئيسية لاستخدام AAC?',
          options: [
            { id: '1', text: 'تساعد الأطفال على التواصل', isCorrect: true },
            { id: '2', text: 'تعلم البرمجة', isCorrect: false },
          ],
          explanation: 'AAC يساعد على تحسين مهارات التواصل'
        }
      ]
    },
  ],
  '1-1': [
    { 
      id: '1', 
      title: 'اختبار المقدمة', 
      description: 'اختبار على مفاهيم AAC الأساسية',
      duration: 5,
      passingScore: 60,
      isPublished: true,
      questions: [
        {
          id: '1',
          question: 'ماذا يعني اختصار AAC؟',
          options: [
            { id: '1', text: 'Alternative and Augmentative Communication', isCorrect: true },
            { id: '2', text: 'Automatic Audio Control', isCorrect: false },
          ],
          explanation: 'AAC تعني Alternative and Augmentative Communication'
        }
      ]
    },
  ],
};

interface CourseLessonsExamsProps {
  courseId: string;
  courseTitle: string;
  sectionId?: string;
  sectionTitle?: string;
  onBack: () => void;
}

const CourseLessonsExams = ({ courseId, courseTitle, sectionId, sectionTitle, onBack }: CourseLessonsExamsProps) => {
  const effectiveSectionId = sectionId || courseId;
  const [activeTab, setActiveTab] = useState<'lessons' | 'exams'>('lessons');
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons[effectiveSectionId] || []);
  const [exams, setExams] = useState<Exam[]>(mockExams[effectiveSectionId] || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; item: Lesson | Exam | Question } | null>(null);
  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: '',
    description: '',
    type: 'video',
    duration: '',
    isFree: false,
    content: '',
    videoUrl: ''
  });
  const [newExam, setNewExam] = useState<Partial<Exam>>({
    title: '',
    description: '',
    duration: 10,
    passingScore: 70,
    isPublished: false,
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    question: '',
    options: [
      { id: '1', text: '', isCorrect: false },
      { id: '2', text: '', isCorrect: false }
    ],
    explanation: ''
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <FaVideo />;
      case 'document': return <FaFileAlt />;
      case 'quiz': return <FaQuestion />;
      default: return <FaPlay />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'video': return { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      case 'document': return { backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' };
      case 'quiz': return { backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' };
      default: return {};
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'video': return 'فيديو';
      case 'document': return 'مستند';
      case 'quiz': return 'اختبار';
      default: return type;
    }
  };

  const filteredLessons = lessons.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExams = exams.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddLesson = () => {
    const lesson: Lesson = {
      id: Date.now().toString(),
      title: newLesson.title || '',
      description: newLesson.description || '',
      type: (newLesson.type as 'video' | 'document' | 'quiz') || 'video',
      duration: newLesson.duration || '0:00',
      order: lessons.length + 1,
      isFree: newLesson.isFree || false,
      content: newLesson.content || '',
      videoUrl: newLesson.videoUrl || ''
    };
    setLessons([...lessons, lesson]);
    setShowLessonModal(false);
    setNewLesson({
      title: '',
      description: '',
      type: 'video',
      duration: '',
      isFree: false,
      content: '',
      videoUrl: ''
    });
  };

  const handleEditLesson = (lesson: Lesson) => {
    setLessons(lessons.map(l => l.id === lesson.id ? lesson : l));
    setEditingLesson(null);
    setShowLessonModal(false);
  };

  const handleDeleteLesson = () => {
    if (itemToDelete && itemToDelete.type === 'lesson') {
      setLessons(lessons.filter(l => l.id !== itemToDelete.item.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleMoveLesson = (lessonId: string, direction: 'up' | 'down') => {
    const index = lessons.findIndex(l => l.id === lessonId);
    if (direction === 'up' && index > 0) {
      const newLessons = [...lessons];
      [newLessons[index - 1], newLessons[index]] = [newLessons[index], newLessons[index - 1]];
      setLessons(newLessons.map((l, i) => ({ ...l, order: i + 1 })));
    } else if (direction === 'down' && index < lessons.length - 1) {
      const newLessons = [...lessons];
      [newLessons[index], newLessons[index + 1]] = [newLessons[index + 1], newLessons[index]];
      setLessons(newLessons.map((l, i) => ({ ...l, order: i + 1 })));
    }
  };

  const handleAddExam = () => {
    const exam: Exam = {
      id: Date.now().toString(),
      title: newExam.title || '',
      description: newExam.description || '',
      duration: newExam.duration || 10,
      passingScore: newExam.passingScore || 70,
      isPublished: false,
      questions: []
    };
    setExams([...exams, exam]);
    setShowExamModal(false);
    setNewExam({
      title: '',
      description: '',
      duration: 10,
      passingScore: 70,
      isPublished: false,
      questions: []
    });
  };

  const handleEditExam = (exam: Exam) => {
    setExams(exams.map(e => e.id === exam.id ? exam : e));
    setEditingExam(null);
    setShowExamModal(false);
  };

  const handleDeleteExam = () => {
    if (itemToDelete && itemToDelete.type === 'exam') {
      setExams(exams.filter(e => e.id !== itemToDelete.item.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handlePublishExam = (examId: string) => {
    setExams(exams.map(e => 
      e.id === examId ? { ...e, isPublished: !e.isPublished } : e
    ));
  };

  const handleAddQuestion = () => {
    if (selectedExam) {
      const question: Question = {
        id: Date.now().toString(),
        question: newQuestion.question || '',
        options: newQuestion.options || [],
        explanation: newQuestion.explanation || ''
      };
      setExams(exams.map(e => 
        e.id === selectedExam.id 
          ? { ...e, questions: [...e.questions, question] }
          : e
      ));
      setShowQuestionModal(false);
      setNewQuestion({
        question: '',
        options: [
          { id: '1', text: '', isCorrect: false },
          { id: '2', text: '', isCorrect: false }
        ],
        explanation: ''
      });
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (selectedExam) {
      setExams(exams.map(e => 
        e.id === selectedExam.id 
          ? { ...e, questions: e.questions.filter(q => q.id !== questionId) }
          : e
      ));
    }
  };

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [
        ...(newQuestion.options || []),
        { id: Date.now().toString(), text: '', isCorrect: false }
      ]
    });
  };

  const updateOption = (index: number, text: string) => {
    const options = [...(newQuestion.options || [])];
    options[index] = { ...options[index], text };
    setNewQuestion({ ...newQuestion, options });
  };

  const setCorrectOption = (index: number) => {
    const options = newQuestion.options?.map((opt, i) => ({
      ...opt,
      isCorrect: i === index
    })) || [];
    setNewQuestion({ ...newQuestion, options });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <button 
            onClick={onBack}
            className="btn d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)'
            }}
          >
            <FaChevronRight />
          </button>
          <div>
            <h1 className="h4 fw-bold mb-1" style={{ color: 'var(--text)' }}>
              {sectionTitle ? `${sectionTitle} - ${courseTitle}` : courseTitle}
            </h1>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              {lessons.length} درس | {exams.length} اختبار
            </p>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button 
            onClick={() => setActiveTab(activeTab === 'lessons' ? 'exams' : 'lessons')}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--text)',
              borderRadius: '10px',
              padding: '10px 20px',
              border: '1px solid var(--border)'
            }}
          >
            <FaList />
            {activeTab === 'lessons' ? 'الاختبارات' : 'الدروس'}
          </button>
          <button 
            onClick={() => {
              if (activeTab === 'lessons') {
                setShowLessonModal(true);
              } else {
                setSelectedExam(null);
                setShowExamModal(true);
              }
            }}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: '10px',
              padding: '10px 20px'
            }}
          >
            <FaPlus />
            {activeTab === 'lessons' ? 'إضافة درس' : 'إضافة اختبار'}
          </button>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('lessons')}
          className="btn px-4"
          style={{
            borderRadius: '10px',
            backgroundColor: activeTab === 'lessons' ? 'var(--primary)' : 'var(--surface-elevated)',
            color: activeTab === 'lessons' ? 'white' : 'var(--text)',
            border: '1px solid var(--border)'
          }}
        >
          <FaPlay className="ms-2" />
          الدروس ({lessons.length})
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className="btn px-4"
          style={{
            borderRadius: '10px',
            backgroundColor: activeTab === 'exams' ? 'var(--primary)' : 'var(--surface-elevated)',
            color: activeTab === 'exams' ? 'white' : 'var(--text)',
            border: '1px solid var(--border)'
          }}
        >
          <FaQuestion className="ms-2" />
          الاختبارات ({exams.length})
        </button>
      </div>

      {activeTab === 'lessons' && (
        <>
          <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="البحث في الدروس..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ 
                    borderRadius: '10px', 
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    paddingRight: '40px'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-3">
            {filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card border-0"
                style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex flex-column gap-1">
                      <button 
                        onClick={() => handleMoveLesson(lesson.id, 'up')}
                        disabled={index === 0}
                        className="btn p-1"
                        style={{ color: 'var(--text-light)', opacity: index === 0 ? 0.3 : 1 }}
                      >
                        <FaArrowUp style={{ fontSize: '0.8rem' }} />
                      </button>
                      <button 
                        onClick={() => handleMoveLesson(lesson.id, 'down')}
                        disabled={index === lessons.length - 1}
                        className="btn p-1"
                        style={{ color: 'var(--text-light)', opacity: index === lessons.length - 1 ? 0.3 : 1 }}
                      >
                        <FaArrowDown style={{ fontSize: '0.8rem' }} />
                      </button>
                    </div>
                    
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '48px',
                        height: '48px',
                        ...getTypeStyle(lesson.type)
                      }}
                    >
                      {getTypeIcon(lesson.type)}
                    </div>
                    
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{lesson.title}</span>
                        {lesson.isFree && (
                          <span 
                            className="px-2 py-0.5 rounded-pill"
                            style={{ backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)', fontSize: '0.7rem' }}
                          >
                            مجاني
                          </span>
                        )}
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{lesson.description}</div>
                      <div className="d-flex align-items-center gap-3 mt-2">
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ 
                            ...getTypeStyle(lesson.type),
                            fontSize: '0.75rem'
                          }}
                        >
                          {getTypeText(lesson.type)}
                        </span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                          <FaClock className="ms-1" /> {lesson.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-1">
                      <button 
                        onClick={() => {
                          setEditingLesson(lesson);
                          setNewLesson(lesson);
                          setShowLessonModal(true);
                        }}
                        className="btn p-2" 
                        style={{ color: 'var(--primary)' }}
                        aria-label="تعديل"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => {
                          setItemToDelete({ type: 'lesson', item: lesson });
                          setShowDeleteModal(true);
                        }}
                        className="btn p-2" 
                        style={{ color: 'var(--danger)' }}
                        aria-label="حذف"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredLessons.length === 0 && (
              <div className="text-center py-5">
                <FaPlay style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-light)' }}>لا توجد دروس</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'exams' && (
        <>
          <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="البحث في الاختبارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                  style={{ 
                    borderRadius: '10px', 
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    paddingRight: '40px'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-3">
            {filteredExams.map(exam => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card border-0"
                style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'rgba(168, 85, 247, 0.15)',
                        color: '#a855f7'
                      }}
                    >
                      <FaQuestion />
                    </div>
                    
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{exam.title}</span>
                        <span 
                          className="px-2 py-0.5 rounded-pill"
                          style={{ 
                            backgroundColor: exam.isPublished ? 'rgba(88, 204, 2, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                            color: exam.isPublished ? 'var(--primary)' : '#fbbf24',
                            fontSize: '0.7rem'
                          }}
                        >
                          {exam.isPublished ? 'منشور' : 'مسودة'}
                        </span>
                      </div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{exam.description}</div>
                      <div className="d-flex align-items-center gap-3 mt-2">
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                          <FaClock className="ms-1" /> {exam.duration} دقيقة
                        </span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                          {exam.questions.length} سؤال
                        </span>
                        <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                          درجة النجاح: {exam.passingScore}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="d-flex gap-1">
                      <button 
                        onClick={() => {
                          setSelectedExam(exam);
                          setShowQuestionModal(true);
                        }}
                        className="btn p-2" 
                        style={{ color: 'var(--primary)' }}
                        aria-label="إضافة سؤال"
                        title="إضافة سؤال"
                      >
                        <FaPlus />
                      </button>
                      <button 
                        onClick={() => handlePublishExam(exam.id)}
                        className="btn p-2" 
                        style={{ color: exam.isPublished ? 'var(--warning)' : 'var(--primary)' }}
                        aria-label={exam.isPublished ? 'إلغاء النشر' : 'نشر'}
                      >
                        {exam.isPublished ? <FaLock /> : <FaUnlock />}
                      </button>
                      <button 
                        onClick={() => {
                          setEditingExam(exam);
                          setNewExam(exam);
                          setShowExamModal(true);
                        }}
                        className="btn p-2" 
                        style={{ color: 'var(--primary)' }}
                        aria-label="تعديل"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => {
                          setItemToDelete({ type: 'exam', item: exam });
                          setShowDeleteModal(true);
                        }}
                        className="btn p-2" 
                        style={{ color: 'var(--danger)' }}
                        aria-label="حذف"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {exam.questions.length > 0 && (
                    <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="fw-bold mb-2" style={{ color: 'var(--text)' }}>الأسئلة:</div>
                      <div className="d-flex flex-column gap-2">
                        {exam.questions.map((q, i) => (
                          <div key={q.id} className="d-flex align-items-center justify-content-between p-2 rounded-2" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                            <span style={{ color: 'var(--text)' }}>{i + 1}. {q.question}</span>
                            <button 
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="btn p-1" 
                              style={{ color: 'var(--danger)' }}
                              aria-label="حذف"
                            >
                              <FaTrash style={{ fontSize: '0.8rem' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {filteredExams.length === 0 && (
              <div className="text-center py-5">
                <FaQuestion style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-light)' }}>لا توجد اختبارات</p>
              </div>
            )}
          </div>
        </>
      )}

      <AnimatePresence>
        {showLessonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => { setShowLessonModal(false); setEditingLesson(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '500px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>
                  {editingLesson ? 'تعديل درس' : 'إضافة درس جديد'}
                </h2>
                <button 
                  onClick={() => { setShowLessonModal(false); setEditingLesson(null); }}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>عنوان الدرس</label>
                  <input
                    type="text"
                    value={newLesson.title || ''}
                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الوصف</label>
                  <textarea
                    value={newLesson.description || ''}
                    onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                    className="form-control"
                    rows={2}
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ color: 'var(--text)' }}>نوع المحتوى</label>
                  <select
                    value={newLesson.type || 'video'}
                    onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value as 'video' | 'document' | 'quiz' })}
                    className="form-select"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <option value="video">فيديو</option>
                    <option value="document">مستند</option>
                    <option value="quiz">اختبار</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ color: 'var(--text)' }}>المدة</label>
                  <input
                    type="text"
                    value={newLesson.duration || ''}
                    onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                    placeholder="مثال: 15:00"
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ color: 'var(--text)' }}>محتوى URL</label>
                  <input
                    type="text"
                    value={newLesson.videoUrl || ''}
                    onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                    placeholder="رابط الفيديو"
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      checked={newLesson.isFree || false}
                      onChange={(e) => setNewLesson({ ...newLesson, isFree: e.target.checked })}
                      className="form-check-input"
                      id="isFree"
                    />
                    <label className="form-check-label" style={{ color: 'var(--text)' }} htmlFor="isFree">
                      درس مجاني (معاينة)
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button 
                  onClick={() => { setShowLessonModal(false); setEditingLesson(null); }}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={() => {
                    if (editingLesson) {
                      handleEditLesson({ ...editingLesson, ...newLesson } as Lesson);
                    } else {
                      handleAddLesson();
                    }
                  }}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  {editingLesson ? 'حفظ' : 'إضافة'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExamModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => { setShowExamModal(false); setEditingExam(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '500px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>
                  {editingExam ? 'تعديل اختبار' : 'إضافة اختبار جديد'}
                </h2>
                <button 
                  onClick={() => { setShowExamModal(false); setEditingExam(null); }}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>عنوان الاختبار</label>
                  <input
                    type="text"
                    value={newExam.title || ''}
                    onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الوصف</label>
                  <textarea
                    value={newExam.description || ''}
                    onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                    className="form-control"
                    rows={2}
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: 'var(--text)' }}>المدة (دقيقة)</label>
                  <input
                    type="number"
                    value={newExam.duration || 10}
                    onChange={(e) => setNewExam({ ...newExam, duration: Number(e.target.value) })}
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: 'var(--text)' }}>درجة النجاح (%)</label>
                  <input
                    type="number"
                    value={newExam.passingScore || 70}
                    onChange={(e) => setNewExam({ ...newExam, passingScore: Number(e.target.value) })}
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button 
                  onClick={() => { setShowExamModal(false); setEditingExam(null); }}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={() => {
                    if (editingExam) {
                      handleEditExam({ ...editingExam, ...newExam } as Exam);
                    } else {
                      handleAddExam();
                    }
                  }}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  {editingExam ? 'حفظ' : 'إضافة'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQuestionModal && selectedExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowQuestionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '600px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>إضافة سؤال جديد</h2>
                <button 
                  onClick={() => setShowQuestionModal(false)}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>السؤال</label>
                  <textarea
                    value={newQuestion.question || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="form-control"
                    rows={2}
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الخيارات (حدد الإجابة الصحيحة)</label>
                  <div className="d-flex flex-column gap-2">
                    {newQuestion.options?.map((opt, index) => (
                      <div key={opt.id} className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="correctOption"
                          checked={opt.isCorrect}
                          onChange={() => setCorrectOption(index)}
                          className="form-check-input"
                        />
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`الخيار ${index + 1}`}
                          className="form-control flex-grow-1"
                          style={{ 
                            borderRadius: '10px', 
                            backgroundColor: 'var(--surface-elevated)',
                            border: '1px solid var(--border)'
                          }}
                        />
                      </div>
                    ))}
                    <button 
                      onClick={addOption}
                      className="btn w-100"
                      style={{
                        backgroundColor: 'var(--surface-elevated)',
                        color: 'var(--text)',
                        borderRadius: '10px',
                        border: '1px dashed var(--border)'
                      }}
                    >
                      <FaPlus className="ms-2" /> إضافة خيار
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الشرح (بعد الإجابة)</label>
                  <textarea
                    value={newQuestion.explanation || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                    className="form-control"
                    rows={2}
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button 
                  onClick={() => setShowQuestionModal(false)}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleAddQuestion}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إضافة سؤال
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)', 
                maxWidth: '400px',
                width: '90%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: '60px', height: '60px', backgroundColor: 'rgba(220, 38, 38, 0.15)', color: 'var(--danger)' }}
                >
                  <FaTrash style={{ fontSize: '1.5rem' }} />
                </div>
                <h2 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>
                  {itemToDelete?.type === 'lesson' ? 'حذف الدرس' : 'حذف الاختبار'}
                </h2>
                <p style={{ color: 'var(--text-light)' }}>
                  هل أنت متأكد من {itemToDelete?.type === 'lesson' ? 'حذف هذا الدرس' : 'حذف هذا الاختبار'}؟
                </p>
              </div>
              <div className="d-flex gap-2">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={() => {
                    if (itemToDelete?.type === 'lesson') {
                      handleDeleteLesson();
                    } else {
                      handleDeleteExam();
                    }
                  }}
                  className="btn flex-grow-1"
                  style={{
                    backgroundColor: 'var(--danger)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  حذف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourseLessonsExams;