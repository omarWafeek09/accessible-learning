import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaStickyNote, FaEdit, FaTrash, FaTimes, FaPaperclip, FaUser, FaBuilding, FaPhone, FaEnvelope, FaCalendarAlt, FaTag, FaStar } from 'react-icons/fa';

interface Note {
  id: string;
  title: string;
  content: string;
  category: 'contact' | 'institution' | 'personal' | 'meeting' | 'task' | 'other';
  relatedTo: string;
  relatedType: 'employee' | 'partner' | 'institution' | 'none';
  priority: 'low' | 'medium' | 'high';
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

const exampleNotes: Note[] = [
  { id: '1', title: 'تواصل مع مدرسة الأمل', content: 'مكالمة مع المدير regarding شراكة جديدة للخدمات التأهيلية', category: 'contact', relatedTo: 'مدرسة الأمل الخاصة', relatedType: 'institution', priority: 'high', isPinned: true, createdAt: '2024-01-15', updatedAt: '2024-01-15', tags: ['مدرسة', 'شراكة'] },
  { id: '2', title: 'اجتماع مع مستشفى الأفق', content: 'مناقشة تفاصيل العقد الجديد provision of rehabilitation services', category: 'meeting', relatedTo: 'مستشفى الأفق العام', relatedType: 'institution', priority: 'medium', isPinned: false, createdAt: '2024-01-10', updatedAt: '2024-01-12', tags: ['مستشفى', 'عقد'] },
  { id: '3', title: 'متابعة توظيف', content: 'متابعة مع candidates for the therapist position', category: 'task', relatedTo: 'قسم الموارد البشرية', relatedType: 'none', priority: 'medium', isPinned: false, createdAt: '2024-01-08', updatedAt: '2024-01-08', tags: ['توظيف', 'مهمة'] },
  { id: '4', title: 'ملاحظات حول خالد', content: 'أداء ممتاز في الشهر الماضي - يوصى بترقية', category: 'personal', relatedTo: 'خالد عمر', relatedType: 'employee', priority: 'low', isPinned: false, createdAt: '2024-01-05', updatedAt: '2024-01-05', tags: ['موظف', 'أداء'] },
  { id: '5', title: 'تفاصيل شراكة جديدة', content: 'النقاط discussed with the new partner from Noor Center', category: 'contact', relatedTo: 'مركز النور للتأهيل', relatedType: 'institution', priority: 'high', isPinned: true, createdAt: '2024-01-01', updatedAt: '2024-01-03', tags: ['شراكة', 'مركز'] },
  { id: '6', title: 'ملاحظة عامة', content: 'تذكير monthly report due next week', category: 'other', relatedTo: '', relatedType: 'none', priority: 'low', isPinned: false, createdAt: '2023-12-28', updatedAt: '2023-12-28', tags: ['تذكير'] },
];

const categoryLabels: Record<Note['category'], string> = {
  contact: 'تواصل',
  institution: 'مؤسسة',
  personal: 'شخصي',
  meeting: 'اجتماع',
  task: 'مهمة',
  other: 'أخرى',
};

const categoryColors: Record<Note['category'], { bg: string; color: string }> = {
  contact: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
  institution: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
  personal: { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' },
  meeting: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
  task: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
  other: { bg: 'rgba(100, 116, 139, 0.15)', color: '#64748b' },
};

const priorityLabels: Record<Note['priority'], string> = {
  low: 'منخفضة',
  medium: 'متوسطة',
  high: 'عالية',
};

const priorityColors: Record<Note['priority'], { bg: string; color: string }> = {
  low: { bg: 'rgba(100, 116, 139, 0.15)', color: '#64748b' },
  medium: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
  high: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
};

const AdminNotesPage = () => {
  const [notes, setNotes] = useState<Note[]>(exampleNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | Note['category']>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'other' as Note['category'],
    relatedTo: '',
    relatedType: 'none' as Note['relatedType'],
    priority: 'medium' as Note['priority'],
    tags: [] as string[]
  });

  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !newNote.tags.includes(newTag)) {
      setNewNote({ ...newNote, tags: [...newNote.tags, newTag] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewNote({ ...newNote, tags: newNote.tags.filter(t => t !== tag) });
  };

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) {
      alert('الرجاء إدخال العنوان والمحتوى');
      return;
    }

    const now = new Date().toISOString().split('T')[0];
    const note: Note = {
      id: Date.now().toString(),
      ...newNote,
      isPinned: false,
      createdAt: now,
      updatedAt: now
    };

    setNotes([note, ...notes]);
    setShowAddModal(false);
    setNewNote({
      title: '',
      content: '',
      category: 'other',
      relatedTo: '',
      relatedType: 'none',
      priority: 'medium',
      tags: []
    });
  };

  const handleTogglePin = (noteId: string) => {
    setNotes(notes.map(n =>
      n.id === noteId ? { ...n, isPinned: !n.isPinned } : n
    ));
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
      setNotes(notes.filter(n => n.id !== noteId));
    }
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.includes(searchTerm) || n.content.includes(searchTerm) || n.tags.some(t => t.includes(searchTerm));
    const matchesCategory = activeCategory === 'all' || n.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.isPinned);

  const categories: Note['category'][] = ['contact', 'institution', 'personal', 'meeting', 'task', 'other'];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>الملاحظات والاتصالات</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {notes.length} ملاحظة | المثبتة {notes.filter(n => n.isPinned).length}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px' }}
        >
          <FaPlus />
          <span>إضافة ملاحظة</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 d-flex gap-2 flex-wrap"
      >
        <button
          onClick={() => setActiveCategory('all')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeCategory === 'all' ? 'var(--primary)' : 'var(--surface)',
            color: activeCategory === 'all' ? 'white' : 'var(--text)',
            border: `2px solid ${activeCategory === 'all' ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaStickyNote />
          <span>الكل</span>
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn d-flex align-items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: activeCategory === cat ? categoryColors[cat].color : 'var(--surface)',
              color: activeCategory === cat ? 'white' : 'var(--text)',
              border: `2px solid ${activeCategory === cat ? categoryColors[cat].color : 'var(--border)'}`,
              borderRadius: '12px'
            }}
          >
            <span>{categoryLabels[cat]}</span>
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <div className="position-relative">
              <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="بحث في الملاحظات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', paddingRight: '40px' }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {pinnedNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--text)' }}>
            <FaStar style={{ color: '#f59e0b' }} />
            الملاحظات المثبتة
          </h5>
          <div className="row g-3">
            {pinnedNotes.map(note => (
              <div key={note.id} className="col-md-6">
                <div 
                  className="card border-0 p-3 h-100" 
                  style={{ borderRadius: '12px', backgroundColor: 'var(--surface)', cursor: 'pointer', borderLeft: '4px solid #f59e0b' }}
                  onClick={() => { setSelectedNote(note); setShowDetailsModal(true); }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold" style={{ color: 'var(--text)', margin: 0 }}>{note.title}</h6>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleTogglePin(note.id); }}
                      className="btn p-0"
                      style={{ background: 'none', border: 'none', color: '#f59e0b' }}
                    >
                      <FaStar />
                    </button>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '8px' }}>{note.content.substring(0, 80)}...</p>
                  <div className="d-flex flex-wrap gap-1">
                    <span className="badge" style={{ backgroundColor: categoryColors[note.category].bg, color: categoryColors[note.category].color, fontSize: '0.7rem' }}>
                      {categoryLabels[note.category]}
                    </span>
                    {note.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="badge" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text-light)', fontSize: '0.7rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h5 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>الملاحظات</h5>
        <div className="row g-3">
          {unpinnedNotes.map(note => (
            <div key={note.id} className="col-md-6">
              <div 
                className="card border-0 p-3 h-100" 
                style={{ borderRadius: '12px', backgroundColor: 'var(--surface)', cursor: 'pointer' }}
                onClick={() => { setSelectedNote(note); setShowDetailsModal(true); }}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold" style={{ color: 'var(--text)', margin: 0 }}>{note.title}</h6>
                  <div className="d-flex gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleTogglePin(note.id); }}
                      className="btn p-0"
                      style={{ background: 'none', border: 'none', color: 'var(--text-light)', fontSize: '0.8rem' }}
                    >
                      <FaStar />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                      className="btn p-0"
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '8px' }}>{note.content.substring(0, 100)}...</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-1">
                    <span className="badge" style={{ backgroundColor: categoryColors[note.category].bg, color: categoryColors[note.category].color, fontSize: '0.7rem' }}>
                      {categoryLabels[note.category]}
                    </span>
                    <span className="badge" style={{ backgroundColor: priorityColors[note.priority].bg, color: priorityColors[note.priority].color, fontSize: '0.7rem' }}>
                      {priorityLabels[note.priority]}
                    </span>
                  </div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{note.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
          {unpinnedNotes.length === 0 && pinnedNotes.length === 0 && (
            <div className="col-12 text-center py-5">
              <FaStickyNote size={48} style={{ color: 'var(--text-light)', marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-light)' }}>لا توجد ملاحظات</p>
            </div>
          )}
        </div>
      </motion.div>

      {showAddModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowAddModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إضافة ملاحظة جديدة</h3>
              <button onClick={() => setShowAddModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>العنوان</label>
              <input type="text" className="form-control p-3" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} placeholder="أدخل عنوان الملاحظة" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المحتوى</label>
              <textarea className="form-control p-3" value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} placeholder="أدخل محتوى الملاحظة" rows={4} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الفئة</label>
                <select className="form-select p-3" value={newNote.category} onChange={e => setNewNote({ ...newNote, category: e.target.value as Note['category'] })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الأولوية</label>
                <select className="form-select p-3" value={newNote.priority} onChange={e => setNewNote({ ...newNote, priority: e.target.value as Note['priority'] })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                  <option value="low">منخفضة</option>
                  <option value="medium">متوسطة</option>
                  <option value="high">عالية</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>مرتبط بـ</label>
              <input type="text" className="form-control p-3" value={newNote.relatedTo} onChange={e => setNewNote({ ...newNote, relatedTo: e.target.value })} placeholder="اسم المؤسسة أو الموظف" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الوسوم</label>
              <div className="d-flex gap-2 mb-2">
                <input type="text" className="form-control p-2" value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="أضف وسم" onKeyPress={(e) => e.key === 'Enter' && handleAddTag()} style={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                <button type="button" onClick={handleAddTag} className="btn" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '8px' }}>
                  <FaPlus />
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {newNote.tags.map((tag, idx) => (
                  <span key={idx} className="badge d-flex align-items-center gap-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', padding: '6px 10px', borderRadius: '6px' }}>
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0 }}>
                      <FaTimes style={{ fontSize: '0.7rem' }} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button onClick={handleAddNote} className="btn w-100 py-3" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaPlus className="me-2" /> إضافة الملاحظة
            </button>
          </div>
        </div>
      )}

      {showDetailsModal && selectedNote && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowDetailsModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>{selectedNote.title}</h3>
              <button onClick={() => setShowDetailsModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>

            <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
              <p style={{ color: 'var(--text)', lineHeight: '1.6' }}>{selectedNote.content}</p>
            </div>

            <div className="d-flex gap-2 mb-3 flex-wrap">
              <span className="badge" style={{ backgroundColor: categoryColors[selectedNote.category].bg, color: categoryColors[selectedNote.category].color }}>
                {categoryLabels[selectedNote.category]}
              </span>
              <span className="badge" style={{ backgroundColor: priorityColors[selectedNote.priority].bg, color: priorityColors[selectedNote.priority].color }}>
                أولوية {priorityLabels[selectedNote.priority]}
              </span>
              {selectedNote.isPinned && (
                <span className="badge" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                  <FaStar className="me-1" /> مثبت
                </span>
              )}
            </div>

            {selectedNote.relatedTo && (
              <div className="mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--text-light)' }}>
                <FaBuilding />
                <span>مرتبط بـ: {selectedNote.relatedTo}</span>
              </div>
            )}

            <div className="mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--text-light)' }}>
              <FaCalendarAlt />
              <span>تاريخ الإنشاء: {selectedNote.createdAt}</span>
            </div>

            {selectedNote.tags.length > 0 && (
              <div className="mb-4">
                <div className="d-flex flex-wrap gap-2">
                  {selectedNote.tags.map((tag, idx) => (
                    <span key={idx} className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: '6px' }}>
                      <FaTag className="me-1" style={{ fontSize: '0.7rem' }} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="d-flex gap-2">
              <button onClick={() => { handleTogglePin(selectedNote.id); setShowDetailsModal(false); }} className="btn flex-fill py-2" style={{ backgroundColor: selectedNote.isPinned ? 'var(--surface-elevated)' : '#f59e0b', color: selectedNote.isPinned ? 'var(--text)' : 'white', border: 'none', borderRadius: '12px' }}>
                <FaStar className="me-2" /> {selectedNote.isPinned ? 'إلغاء التثبيت' : 'تثبيت'}
              </button>
              <button onClick={() => { handleDeleteNote(selectedNote.id); setShowDetailsModal(false); }} className="btn flex-fill py-2" style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '12px' }}>
                <FaTrash className="me-2" /> حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotesPage;