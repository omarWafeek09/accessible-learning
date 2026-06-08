// src\admin\pages\AdminCoursesPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaEye,
  FaBook, FaDownload, FaChevronLeft, FaChevronRight, FaTimes,
  FaFolder, FaLayerGroup, FaClock, FaUserGraduate, FaStar,
  FaPlay, FaPause, FaImage, FaVideo, FaFileAlt, FaList
} from 'react-icons/fa';
import CourseSections from './CourseSections';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  thumbnail: string;
  status: 'published' | 'draft' | 'archived';
  price: number;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  courseCount: number;
}

const mockCategories: Category[] = [
  { id: '1', name: 'التواصل AAC', icon: 'FaComments', color: '#8b5cf6', courseCount: 12 },
  { id: '2', name: 'العلاج الطبيعي', icon: 'FaUserDoctor', color: '#10b981', courseCount: 8 },
  { id: '3', name: 'التوحد', icon: 'FaBrain', color: '#f59e0b', courseCount: 15 },
  { id: '4', name: 'صعوبات التعلم', icon: 'FaBookOpen', color: '#3b82f6', courseCount: 10 },
  { id: '5', name: 'الإبصار', icon: 'FaEye', color: '#ec4899', courseCount: 6 },
  { id: '6', name: 'السمع', icon: 'FaEar', color: '#14b8a6', courseCount: 5 },
];

const mockCourses: Course[] = [
  { 
    id: '1', 
    title: 'مقدمة في التواصل باستخدام AAC', 
    description: 'تعلم اساسيات التواصل المدعوم بالحاسوب للاطفال ذوي اضطرابات التواصل',
    category: 'التواصل AAC',
    instructor: 'احمد محمد',
    thumbnail: '',
    status: 'published',
    price: 0,
    duration: '8 ساعات',
    lessons: 24,
    students: 1250,
    rating: 4.8,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10'
  },
  { 
    id: '2', 
    title: 'تمارين العلاج الطبيعي للاطفال', 
    description: 'مجموعة تمارين منزلية لتحسين الحركات للاطفال ذوي الاحتياجات الخاصة',
    category: 'العلاج الطبيعي',
    instructor: 'سارة علي',
    thumbnail: '',
    status: 'published',
    price: 99,
    duration: '12 ساعة',
    lessons: 36,
    students: 890,
    rating: 4.9,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-15'
  },
  { 
    id: '3', 
    title: 'التعامل مع اطفال التوحد', 
    description: 'دليل شامل لاولياء الامور والمعلمين في التعامل مع اطفال طيف التوحد',
    category: 'التوحد',
    instructor: 'خالد عمر',
    thumbnail: '',
    status: 'published',
    price: 149,
    duration: '16 ساعة',
    lessons: 48,
    students: 2100,
    rating: 5.0,
    createdAt: '2024-02-20',
    updatedAt: '2024-03-20'
  },
  { 
    id: '4', 
    title: 'اساليب تعليم القراءة', 
    description: 'طرق مبتكرة لتعليم القراءة للاطفال ذوي صعوبات التعلم',
    category: 'صعوبات التعلم',
    instructor: 'فاطمة يوسف',
    thumbnail: '',
    status: 'draft',
    price: 79,
    duration: '10 ساعات',
    lessons: 30,
    students: 0,
    rating: 0,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-25'
  },
  { 
    id: '5', 
    title: 'التواصل مع ضعاف السمع', 
    description: 'تقنيات للتواصل مع ذوي ضعف السمع باستخدام لغة الاشارة',
    category: 'السمع',
    instructor: 'علي حسن',
    thumbnail: '',
    status: 'published',
    price: 0,
    duration: '6 ساعات',
    lessons: 18,
    students: 456,
    rating: 4.7,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-28'
  },
  { 
    id: '6', 
    title: 'تمارين البصر للاطفال', 
    description: 'تمارين لتحسين البصر وتقوية العين للاطفال',
    category: 'الإبصار',
    instructor: 'منى عبدالله',
    thumbnail: '',
    status: 'archived',
    price: 49,
    duration: '4 ساعات',
    lessons: 12,
    students: 320,
    rating: 4.5,
    createdAt: '2023-12-01',
    updatedAt: '2024-01-15'
  },
  { 
    id: '7', 
    title: 'تطوير مهارات التواصل الاجتماعي', 
    description: 'مساعدة الاطفال على تطوير مهارات التواصل والتفاعل مع الاخرين',
    category: 'التواصل AAC',
    instructor: 'ياسر سعيد',
    thumbnail: '',
    status: 'published',
    price: 129,
    duration: '14 ساعة',
    lessons: 42,
    students: 780,
    rating: 4.6,
    createdAt: '2024-03-20',
    updatedAt: '2024-04-01'
  },
  { 
    id: '8', 
    title: 'برنامج تعليمي شامل للتوحد', 
    description: 'برنامج متكامل لتعليم اطفال التوحد المهارات الاساسية',
    category: 'التوحد',
    instructor: 'رانية إبراهيم',
    thumbnail: '',
    status: 'draft',
    price: 199,
    duration: '20 ساعة',
    lessons: 60,
    students: 0,
    rating: 0,
    createdAt: '2024-04-01',
    updatedAt: '2024-04-10'
  },
];

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    category: 'التواصل AAC',
    instructor: '',
    price: 0,
    duration: '',
    lessons: 0,
    status: 'draft'
  });
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3b82f6' });
  const itemsPerPage = 8;

  if (selectedCourse) {
    return <CourseSections courseId={selectedCourse.id} courseTitle={selectedCourse.title} onBack={() => setSelectedCourse(null)} />;
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published':
        return { backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)' };
      case 'draft':
        return { backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' };
      case 'archived':
        return { backgroundColor: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' };
      default:
        return {};
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'منشور';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#6b7280';
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCourses(paginatedCourses.map(c => c.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleAddCourse = () => {
    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title || '',
      description: newCourse.description || '',
      category: newCourse.category || 'التواصل AAC',
      instructor: newCourse.instructor || '',
      thumbnail: '',
      status: (newCourse.status as 'published' | 'draft' | 'archived') || 'draft',
      price: newCourse.price || 0,
      duration: newCourse.duration || '0 ساعات',
      lessons: newCourse.lessons || 0,
      students: 0,
      rating: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setCourses([course, ...courses]);
    setShowCourseModal(false);
    setNewCourse({
      title: '',
      description: '',
      category: 'التواصل AAC',
      instructor: '',
      price: 0,
      duration: '',
      lessons: 0,
      status: 'draft'
    });
  };

  const handleEditCourse = (course: Course) => {
    setCourses(courses.map(c => c.id === course.id ? course : c));
    setEditingCourse(null);
    setShowCourseModal(false);
  };

  const handleDeleteCourse = () => {
    if (courseToDelete) {
      setCourses(courses.filter(c => c.id !== courseToDelete.id));
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name.trim(),
        icon: 'FaFolder',
        color: newCategory.color,
        courseCount: 0
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', color: '#3b82f6' });
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'مجاني' : `${price} جنيه`;
  };

  const exportToCSV = () => {
    const headers = ['العنوان', 'الفئة', 'المعلم', 'الحالة', 'السعر', 'المدة', 'الدروس', 'الطلاب'];
    const rows = filteredCourses.map(c => [c.title, c.category, c.instructor, getStatusText(c.status), formatPrice(c.price), c.duration, c.lessons, c.students]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'courses.csv';
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: 'var(--text)' }}>إدارة الدورات</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            {filteredCourses.length} دورة | {courses.filter(c => c.status === 'published').length} منشورة | {courses.filter(c => c.status === 'draft').length} مسودة
          </p>
        </div>
        <div className="d-flex gap-2">
          <button 
            onClick={() => setShowCategoryModal(true)}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--text)',
              borderRadius: '10px',
              padding: '10px 20px',
              border: '1px solid var(--border)'
            }}
          >
            <FaFolder />
            إدارة الفئات
          </button>
          <button 
            onClick={() => { setEditingCourse(null); setShowCourseModal(true); }}
            className="btn d-flex align-items-center gap-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: '10px',
              padding: '10px 20px'
            }}
          >
            <FaPlus />
            إضافة دورة
          </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'var(--primary)' + '20' }}>
                  <FaBook style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>إجمالي الدورات</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{courses.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(88, 204, 2, 0.15)' }}>
                  <FaPlay style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>الدورات المنشورة</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{courses.filter(c => c.status === 'published').length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(251, 191, 36, 0.15)' }}>
                  <FaClock style={{ color: '#fbbf24', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>المسودات</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{courses.filter(c => c.status === 'draft').length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                  <FaUserGraduate style={{ color: '#3b82f6', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>إجمالي الطلاب</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{courses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-4">
              <div className="position-relative">
                <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="البحث بالعنوان أو المعلم..."
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
            <div className="col-md-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="form-select"
                style={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)'
                }}
              >
                <option value="all">كل الفئات</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
                style={{ 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)'
                }}
              >
                <option value="all">كل الحالات</option>
                <option value="published">منشور</option>
                <option value="draft">مسودة</option>
                <option value="archived">مؤرشف</option>
              </select>
            </div>
            <div className="col-md-2">
              <button 
                onClick={exportToCSV}
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  color: 'var(--text)',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid var(--border)'
                }}
              >
                <FaDownload />
                تصدير
              </button>
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
                  <th style={{ padding: '16px', width: '50px' }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedCourses.length === paginatedCourses.length && paginatedCourses.length > 0}
                      className="form-check-input"
                    />
                  </th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدورة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الفئة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المعلم</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>السعر</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الطلاب</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCourses.map(course => (
                  <tr key={course.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px' }}>
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleSelectCourse(course.id)}
                        className="form-check-input"
                      />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: getCategoryColor(course.category) + '20',
                            flexShrink: 0
                          }}
                        >
                          <FaBook style={{ color: getCategoryColor(course.category), fontSize: '1.2rem' }} />
                        </div>
                        <div>
                          <div className="fw-bold" style={{ color: 'var(--text)' }}>{course.title}</div>
                          <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{course.duration} • {course.lessons} درس</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span 
                        className="px-3 py-1 rounded-pill"
                        style={{ 
                          backgroundColor: getCategoryColor(course.category) + '20',
                          color: getCategoryColor(course.category),
                          fontSize: '0.8rem',
                          fontWeight: 500
                        }}
                      >
                        {course.category}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {course.instructor}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span 
                        className="px-3 py-1 rounded-pill"
                        style={{ 
                          ...getStatusStyle(course.status),
                          fontSize: '0.8rem',
                          fontWeight: 500
                        }}
                      >
                        {getStatusText(course.status)}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {formatPrice(course.price)}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {course.students.toLocaleString()}
                      {course.rating > 0 && (
                        <span className="ms-2" style={{ color: '#fbbf24' }}>
                          <FaStar style={{ fontSize: '0.7rem' }} /> {course.rating}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex gap-1">
                        <button 
                          onClick={() => setSelectedCourse(course)}
                          className="btn p-2" 
                          style={{ color: 'var(--primary)' }}
                          aria-label="الدروس والاختبارات"
                          title="الدروس والاختبارات"
                        >
                          <FaList />
                        </button>
                        <button 
                          onClick={() => {
                            setEditingCourse(course);
                            setShowCourseModal(true);
                          }}
                          className="btn p-2" 
                          style={{ color: 'var(--warning)' }}
                          aria-label="تعديل"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => {
                            setCourseToDelete(course);
                            setShowDeleteModal(true);
                          }}
                          className="btn p-2" 
                          style={{ color: 'var(--danger)' }}
                          aria-label="حذف"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedCourses.length === 0 && (
            <div className="text-center py-5">
              <p style={{ color: 'var(--text-light)' }}>لا توجد نتائج</p>
            </div>
          )}

          {paginatedCourses.length > 0 && (
            <div className="d-flex align-items-center justify-content-between p-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                عرض {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredCourses.length)} من {filteredCourses.length}
              </div>
              <div className="d-flex align-items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)'
                  }}
                >
                  <FaChevronRight />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                  Math.max(0, currentPage - 3),
                  Math.min(totalPages, currentPage + 2)
                ).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="btn d-flex align-items-center justify-content-center"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: currentPage === page ? 'var(--primary)' : 'var(--surface-elevated)',
                      border: '1px solid var(--border)',
                      color: currentPage === page ? 'white' : 'var(--text)'
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)'
                  }}
                >
                  <FaChevronLeft />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCourseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => { setShowCourseModal(false); setEditingCourse(null); }}
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
                <h3 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>
                  {editingCourse ? 'تعديل دورة' : 'إضافة دورة جديدة'}
                </h3>
                <button 
                  onClick={() => { setShowCourseModal(false); setEditingCourse(null); }}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>العنوان</label>
                  <input
                    type="text"
                    value={editingCourse ? editingCourse.title : newCourse.title}
                    onChange={(e) => editingCourse 
                      ? setEditingCourse({ ...editingCourse, title: e.target.value })
                      : setNewCourse({ ...newCourse, title: e.target.value })
                    }
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
                    value={editingCourse ? editingCourse.description : newCourse.description}
                    onChange={(e) => editingCourse 
                      ? setEditingCourse({ ...editingCourse, description: e.target.value })
                      : setNewCourse({ ...newCourse, description: e.target.value })
                    }
                    rows={3}
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الفئة</label>
                  <select
                    value={editingCourse ? editingCourse.category : newCourse.category}
                    onChange={(e) => editingCourse 
                      ? setEditingCourse({ ...editingCourse, category: e.target.value })
                      : setNewCourse({ ...newCourse, category: e.target.value })
                    }
                    className="form-select"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: 'var(--text)' }}>المعلم</label>
                  <input
                    type="text"
                    value={editingCourse ? editingCourse.instructor : newCourse.instructor}
                    onChange={(e) => editingCourse 
                      ? setEditingCourse({ ...editingCourse, instructor: e.target.value })
                      : setNewCourse({ ...newCourse, instructor: e.target.value })
                    }
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: 'var(--text)' }}>الحالة</label>
                  <select
                    value={editingCourse ? editingCourse.status : newCourse.status}
                    onChange={(e) => {
                      const value = e.target.value as 'published' | 'draft' | 'archived';
                      if (editingCourse) {
                        setEditingCourse({ ...editingCourse, status: value });
                      } else {
                        setNewCourse({ ...newCourse, status: value });
                      }
                    }}
                    className="form-select"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <option value="draft">مسودة</option>
                    <option value="published">منشور</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ color: 'var(--text)' }}>السعر (جنيه)</label>
                  <input
                    type="number"
                    value={editingCourse ? editingCourse.price : newCourse.price}
                    onChange={(e) => editingCourse 
                      ? setEditingCourse({ ...editingCourse, price: parseFloat(e.target.value) || 0 })
                      : setNewCourse({ ...newCourse, price: parseFloat(e.target.value) || 0 })
                    }
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ color: 'var(--text)' }}>المدة</label>
                  <input
                    type="text"
                    value={editingCourse ? editingCourse.duration : newCourse.duration}
                    onChange={(e) => editingCourse 
                      ? setEditingCourse({ ...editingCourse, duration: e.target.value })
                      : setNewCourse({ ...newCourse, duration: e.target.value })
                    }
                    placeholder="مثلا: 10 ساعات"
                    className="form-control"
                    style={{ 
                      borderRadius: '10px', 
                      backgroundColor: 'var(--surface-elevated)',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ color: 'var(--text)' }}>عدد الدروس</label>
                  <input
                    type="number"
                    value={editingCourse ? editingCourse.lessons : newCourse.lessons}
                    onChange={(e) => editingCourse 
                      ? setEditingCourse({ ...editingCourse, lessons: parseInt(e.target.value) || 0 })
                      : setNewCourse({ ...newCourse, lessons: parseInt(e.target.value) || 0 })
                    }
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
                  onClick={() => { setShowCourseModal(false); setEditingCourse(null); }}
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
                    if (editingCourse) {
                      handleEditCourse(editingCourse);
                    } else {
                      handleAddCourse();
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
                  {editingCourse ? 'حفظ' : 'إضافة'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCategoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowCategoryModal(false)}
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
                <h3 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>إدارة الفئات</h3>
                <button 
                  onClick={() => setShowCategoryModal(false)}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="d-flex flex-column gap-2 mb-4">
                {categories.map(category => (
                  <div 
                    key={category.id}
                    className="d-flex align-items-center justify-content-between p-3 rounded-3"
                    style={{ backgroundColor: 'var(--surface-elevated)' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: category.color }} />
                      <span style={{ color: 'var(--text)', fontWeight: 500 }}>{category.name}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="btn p-2"
                      style={{ color: 'var(--danger)' }}
                      aria-label="حذف الفئة"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  placeholder="اسم الفئة الجديدة..."
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="form-control flex-grow-1"
                  style={{ 
                    borderRadius: '10px', 
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)'
                  }}
                />
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="form-control"
                  style={{ 
                    width: '50px',
                    borderRadius: '10px', 
                    border: '1px solid var(--border)',
                    padding: '2px'
                  }}
                />
                <button 
                  onClick={handleAddCategory}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '10px 20px'
                  }}
                >
                  <FaPlus />
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
                <h3 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>حذف الدورة</h3>
                <p style={{ color: 'var(--text-light)' }}>
                  هل أنت متأكد من حذف الدورة "{courseToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.
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
                  onClick={handleDeleteCourse}
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
    </motion.div>
  );
};

export default AdminCoursesPage;