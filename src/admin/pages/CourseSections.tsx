import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaChevronLeft, FaChevronRight,
  FaFolder, FaList, FaCheck, FaLock, FaUnlock
} from 'react-icons/fa';
import CourseLessonsExams from './CourseLessonsExams';

interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
}

interface SectionCourse {
  id: string;
  title: string;
}

interface CourseSectionsProps {
  courseId: string;
  courseTitle: string;
  onBack: () => void;
}

const mockSections: Record<string, Section[]> = {
  '1': [
    { id: '1', title: 'مقدمة في AAC', description: 'الأساسيات والمفاهيم الأولية', order: 1, isPublished: true },
    { id: '2', title: 'أنواع الأجهزة', description: 'استعراض الأجهزة المختلفة للتواصل', order: 2, isPublished: true },
    { id: '3', title: 'جداول الرموز', description: 'جداول ورموز التواصل الأساسية', order: 3, isPublished: false },
  ],
  '2': [
    { id: '1', title: 'تمارين الإحماء', description: 'تمارين بسيطة للمبتدئين', order: 1, isPublished: true },
    { id: '2', title: 'تمارين التقوية', description: 'تمارين متقدمة لتقوية العضلات', order: 2, isPublished: true },
  ],
};

const CourseSections = ({ courseId, courseTitle, onBack }: CourseSectionsProps) => {
  const [sections, setSections] = useState<Section[]>(mockSections[courseId] || []);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [sectionToDelete, setSectionToDelete] = useState<Section | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [newSection, setNewSection] = useState<Partial<Section>>({
    title: '',
    description: '',
    isPublished: false
  });

  const handleAddSection = () => {
    const section: Section = {
      id: Date.now().toString(),
      title: newSection.title || '',
      description: newSection.description || '',
      order: sections.length + 1,
      isPublished: newSection.isPublished || false
    };
    setSections([...sections, section]);
    setShowSectionModal(false);
    setNewSection({ title: '', description: '', isPublished: false });
  };

  const handleEditSection = (section: Section) => {
    setSections(sections.map(s => s.id === section.id ? section : s));
    setEditingSection(null);
    setShowSectionModal(false);
  };

  const handleDeleteSection = () => {
    if (sectionToDelete) {
      setSections(sections.filter(s => s.id !== sectionToDelete.id));
      setShowDeleteModal(false);
      setSectionToDelete(null);
    }
  };

  const handlePublishSection = (sectionId: string) => {
    setSections(sections.map(s => 
      s.id === sectionId ? { ...s, isPublished: !s.isPublished } : s
    ));
  };

  const handleMoveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setSections(newSections.map((s, i) => ({ ...s, order: i + 1 })));
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections.map((s, i) => ({ ...s, order: i + 1 })));
    }
  };

  if (selectedSection) {
    return (
      <CourseLessonsExams 
        courseId={courseId}
        courseTitle={courseTitle}
        sectionId={selectedSection.id}
        sectionTitle={selectedSection.title}
        onBack={() => setSelectedSection(null)}
      />
    );
  }

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
            <h1 className="h4 fw-bold mb-1" style={{ color: 'var(--text)' }}>{courseTitle}</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              {sections.length} قسم
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowSectionModal(true)}
          className="btn d-flex align-items-center gap-2"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: '10px',
            padding: '10px 20px'
          }}
        >
          <FaPlus />
          إضافة قسم
        </button>
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
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '150px' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section, index) => (
                    <tr key={section.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>{index + 1}</td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-3 d-flex align-items-center justify-content-center"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: 'rgba(139, 92, 246, 0.15)',
                              color: '#8b5cf6'
                            }}
                          >
                            <FaFolder />
                          </div>
                          <span className="fw-bold" style={{ color: 'var(--text)' }}>{section.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>
                        {section.description}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-3 py-1 rounded-pill"
                          style={{ 
                            backgroundColor: section.isPublished ? 'rgba(88, 204, 2, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                            color: section.isPublished ? 'var(--primary)' : '#fbbf24',
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}
                        >
                          {section.isPublished ? 'منشور' : 'مسودة'}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex gap-1">
                          <button 
                            onClick={() => setSelectedSection(section)}
                            className="btn p-2" 
                            style={{ color: 'var(--primary)' }}
                            aria-label="الدروس والاختبارات"
                            title="الدروس والاختبارات"
                          >
                            <FaList />
                          </button>
                          <button 
                            onClick={() => handlePublishSection(section.id)}
                            className="btn p-2" 
                            style={{ color: section.isPublished ? 'var(--warning)' : 'var(--primary)' }}
                            aria-label={section.isPublished ? 'إلغاء النشر' : 'نشر'}
                          >
                            {section.isPublished ? <FaLock /> : <FaUnlock />}
                          </button>
                          <button 
                            onClick={() => {
                              setEditingSection(section);
                              setNewSection(section);
                              setShowSectionModal(true);
                            }}
                            className="btn p-2" 
                            style={{ color: 'var(--primary)' }}
                            aria-label="تعديل"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => {
                              setSectionToDelete(section);
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => { setShowSectionModal(false); setEditingSection(null); }}
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
                  {editingSection ? 'تعديل قسم' : 'إضافة قسم جديد'}
                </h2>
                <button 
                  onClick={() => { setShowSectionModal(false); setEditingSection(null); }}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" style={{ color: 'var(--text)' }}>اسم القسم</label>
                  <input
                    type="text"
                    value={newSection.title || ''}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
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
                    value={newSection.description || ''}
                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
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
                  <div className="form-check">
                    <input
                      type="checkbox"
                      checked={newSection.isPublished || false}
                      onChange={(e) => setNewSection({ ...newSection, isPublished: e.target.checked })}
                      className="form-check-input"
                      id="isPublished"
                    />
                    <label className="form-check-label" style={{ color: 'var(--text)' }} htmlFor="isPublished">
                      نشر القسم
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 mt-4">
                <button 
                  onClick={() => { setShowSectionModal(false); setEditingSection(null); }}
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
                    if (editingSection) {
                      handleEditSection({ ...editingSection, ...newSection } as Section);
                    } else {
                      handleAddSection();
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
                  {editingSection ? 'حفظ' : 'إضافة'}
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
                <h2 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>حذف القسم</h2>
                <p style={{ color: 'var(--text-light)' }}>
                  هل أنت متأكد من حذف القسم "{sectionToDelete?.title}"؟ سيتم حذف جميع الدروس والاختبارات المرتبطة به.
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
                  onClick={handleDeleteSection}
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

export default CourseSections;