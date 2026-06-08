// src\admin\pages\AdminTreatmentProtocolsPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFileMedical, FaUserInjured, FaClock, FaGraduationCap, FaBrain, FaEye, FaTimesCircle, FaCheckCircle, FaExclamationCircle, FaComments, FaCogs, FaEye as FaSensory, FaBookOpen, FaRunning, FaLayerGroup, FaTimes } from 'react-icons/fa';

export interface TreatmentProtocol {
  id: string;
  name: string;
  description: string;
  targetDisability: string;
  category: string;
  duration: string;
  sessions: number;
  ageGroup: string;
  status: 'active' | 'inactive' | 'pending';
  steps: { id: string; title: string; description: string; duration: string }[];
  createdAt: string;
  lastUpdated: string;
}

const exampleProtocols: TreatmentProtocol[] = [
  {
    id: '1',
    name: 'بروتوكول تحسين النطق',
    description: 'برنامج متكامل لتحسين مهارات النطق والكلام لدى الأطفال',
    targetDisability: 'التوحد',
    category: 'النطق والكلام',
    duration: '3 أشهر',
    sessions: 24,
    ageGroup: '3-8 سنوات',
    status: 'active',
    steps: [
      { id: 's1', title: 'تقييم أولي', description: 'تقييم مستوى النطق الحالي', duration: '60 دقيقة' },
      { id: 's2', title: 'تمارين التنفس', description: 'تمارين لتنظيم التنفس أثناء الكلام', duration: '20 دقيقة' },
      { id: 's3', title: 'تمارين المفاصل', description: 'تمارين لتحريك عضلات الفم', duration: '15 دقيقة' },
      { id: 's4', title: 'تمارين الأصوات', description: 'تدريب على نطق الحروف', duration: '30 دقيقة' }
    ],
    createdAt: '2024-01-10T10:00:00Z',
    lastUpdated: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'بروتوكول العلاج السلوكي',
    description: 'برنامج تعديل السلوك الإيجابي للأطفال ذوي التوحد',
    targetDisability: 'التوحد',
    category: 'السلوك',
    duration: '6 أشهر',
    sessions: 48,
    ageGroup: '2-10 سنوات',
    status: 'active',
    steps: [
      { id: 's1', title: 'ملاحظة السلوك', description: 'توثيق السلوكيات المستهدفة', duration: '45 دقيقة' },
      { id: 's2', title: 'تحليل السلوك', description: 'تحديد محفزات السلوك', duration: '60 دقيقة' },
      { id: 's3', title: 'وضع الخطة', description: 'تصميم خطة تعديل السلوك', duration: '90 دقيقة' },
      { id: 's4', title: 'التطبيق والمراقبة', description: 'تطبيق الاستراتيجيات ومتابعتها', duration: 'مستمر' }
    ],
    createdAt: '2024-01-05T09:00:00Z',
    lastUpdated: '2024-01-12T11:00:00Z'
  },
  {
    id: '3',
    name: 'بروتوكول العلاج الحسي',
    description: 'برنامج لتنمية المعالجة الحسية لدى الأطفال',
    targetDisability: 'اضطراب المعالجة الحسية',
    category: 'الحواس',
    duration: '4 أشهر',
    sessions: 32,
    ageGroup: '2-7 سنوات',
    status: 'active',
    steps: [
      { id: 's1', title: 'تقييم حسي', description: 'تقييم الحساسية الحسية', duration: '90 دقيقة' },
      { id: 's2', title: 'تمارين اللمس', description: 'تمارين للتعامل مع الملمس', duration: '30 دقيقة' },
      { id: 's3', title: 'تمارين التوازن', description: 'تمارين تحسين التوازن', duration: '25 دقيقة' },
      { id: 's4', title: 'تمارين بصرية', description: 'تمارين لتنمية النظر', duration: '20 دقيقة' }
    ],
    createdAt: '2024-01-08T08:00:00Z',
    lastUpdated: '2024-01-14T16:00:00Z'
  },
  {
    id: '4',
    name: 'بروتوكول التوحد الشامل',
    description: 'برنامج متكامل للتعامل مع أطفال التوحد',
    targetDisability: 'التوحد',
    category: 'شامل',
    duration: '12 شهر',
    sessions: 96,
    ageGroup: '1-12 سنة',
    status: 'active',
    steps: [
      { id: 's1', title: 'التقييم الشامل', description: 'تقييم جميع المهارات', duration: '120 دقيقة' },
      { id: 's2', title: 'العلاج السلوكي', description: 'تعديل السلوك', duration: '60 دقيقة' },
      { id: 's3', title: 'العلاج اللغوي', description: 'تحسين التواصل', duration: '45 دقيقة' },
      { id: 's4', title: 'العلاج الحسي', description: 'تنمية المعالجة الحسية', duration: '30 دقيقة' }
    ],
    createdAt: '2023-12-01T10:00:00Z',
    lastUpdated: '2024-01-10T09:00:00Z'
  },
  {
    id: '5',
    name: 'بروتوكول صعوبات التعلم',
    description: 'برنامج تحسين المهارات الأكاديمية',
    targetDisability: 'صعوبات التعلم',
    category: 'التعليم',
    duration: '8 أشهر',
    sessions: 64,
    ageGroup: '6-14 سنة',
    status: 'pending',
    steps: [
      { id: 's1', title: 'تقييم أكاديمي', description: 'تحديد نقاط الضعف', duration: '90 دقيقة' },
      { id: 's2', title: 'تدريب القراءة', description: 'تحسين مهارات القراءة', duration: '40 دقيقة' },
      { id: 's3', title: 'تدريب الكتابة', description: 'تنمية مهارات الكتابة', duration: '40 دقيقة' },
      { id: 's4', title: 'تدريب الرياضيات', description: 'فهم المفاهيم الرياضية', duration: '45 دقيقة' }
    ],
    createdAt: '2024-01-02T11:00:00Z',
    lastUpdated: '2024-01-02T11:00:00Z'
  },
  {
    id: '6',
    name: 'بروتوكول متلازمة داون',
    description: 'برنامج تنموي شامل لأطفال متلازمة داون',
    targetDisability: 'متلازمة داون',
    category: 'شامل',
    duration: 'أسبوعي',
    sessions: 52,
    ageGroup: '0-18 سنة',
    status: 'active',
    steps: [
      { id: 's1', title: 'التقييم التنموي', description: 'تقييم المستوى التنموي', duration: '60 دقيقة' },
      { id: 's2', title: 'تمارين الحرك', description: 'تنمية المهارات الحركية', duration: '30 دقيقة' },
      { id: 's3', title: 'تدريب الإدراك', description: 'تنمية المهارات المعرفية', duration: '25 دقيقة' },
      { id: 's4', title: 'التواصل', description: 'تحسين مهارات التواصل', duration: '35 دقيقة' }
    ],
    createdAt: '2023-11-15T09:00:00Z',
    lastUpdated: '2024-01-08T14:00:00Z'
  }
];

const disabilityTypes = ['التوحد', 'متلازمة داون', 'صعوبات التعلم', 'شلل دماغي', 'اضطراب المعالجة الحسية', 'متلازمة نقص الانتباه', 'اضطراب اللغة'];
const categories = ['النطق والكلام', 'السلوك', 'الحواس', 'التعليم', 'الحرك', 'الشامل'];
const ageGroups = ['0-2 سنة', '2-4 سنة', '4-7 سنة', '7-12 سنة', '12-18 سنة', 'كل الأعمار'];

const statusConfig = {
  active: { icon: <FaCheckCircle />, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', label: 'نشط' },
  inactive: { icon: <FaTimesCircle />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'غير نشط' },
  pending: { icon: <FaExclamationCircle />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', label: 'قيد المراجعة' }
};

const AdminTreatmentProtocolsPage = () => {
  const [protocols, setProtocols] = useState<TreatmentProtocol[]>(exampleProtocols);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState<TreatmentProtocol | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filterDisability, setFilterDisability] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = [
    { id: 'all', label: 'الكل', icon: <FaLayerGroup />, color: '#64748b' },
    { id: 'النطق والكلام', label: 'النطق والكلام', icon: <FaComments />, color: '#8b5cf6' },
    { id: 'السلوك', label: 'السلوك', icon: <FaBrain />, color: '#ec4899' },
    { id: 'الحواس', label: 'الحواس', icon: <FaSensory />, color: '#06b6d4' },
    { id: 'التعليم', label: 'التعليم', icon: <FaBookOpen />, color: '#22c55e' },
    { id: 'الحرك', label: 'الحرك', icon: <FaRunning />, color: '#f59e0b' },
    { id: 'الشامل', label: 'الشامل', icon: <FaLayerGroup />, color: '#ef4444' }
  ];

  const [newProtocol, setNewProtocol] = useState({
    name: '',
    description: '',
    targetDisability: '',
    category: '',
    duration: '',
    sessions: 0,
    ageGroup: ''
  });

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا البروتوكول؟')) {
      setProtocols(protocols.filter(p => p.id !== id));
      setSelectedProtocol(null);
    }
  };

  const handleCreate = () => {
    if (!newProtocol.name.trim() || !newProtocol.targetDisability || !newProtocol.category) {
      alert('الرجاء إدخال البيانات المطلوبة');
      return;
    }

    const protocol: TreatmentProtocol = {
      id: Date.now().toString(),
      ...newProtocol,
      status: 'pending',
      steps: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setProtocols([protocol, ...protocols]);
    setShowCreateModal(false);
    setNewProtocol({ name: '', description: '', targetDisability: '', category: '', duration: '', sessions: 0, ageGroup: '' });
    alert('تم إنشاء البروتوكول بنجاح!');
  };

  const filteredProtocols = protocols.filter(p => {
    const matchesSearch = searchTerm === '' || p.name.includes(searchTerm) || p.description.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesDisability = filterDisability === '' || p.targetDisability === filterDisability;
    const matchesFilterCategory = filterCategory === '' || p.category === filterCategory;
    return matchesSearch && matchesCategory && matchesDisability && matchesFilterCategory;
  });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>بروتوكولات العلاج</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {activeCategory === 'all' ? protocols.length : filteredProtocols.length} بروتوكول | {filteredProtocols.filter(p => p.status === 'active').length} نشط
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px' }}
        >
          <FaPlus />
          <span>إضافة بروتوكول</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="row g-3">
          <div className="col-md-4">
            <div className="position-relative">
              <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', paddingRight: '40px' }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterDisability}
              onChange={(e) => setFilterDisability(e.target.value)}
              style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
            >
              <option value="">كل الإعاقات</option>
              {disabilityTypes.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
            >
              <option value="">كل الفئات</option>
              {categories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
            </select>
          </div>
        </div>

      </motion.div>

      <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '50px' }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>البروتوكول</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>نوع الإعاقة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الفئة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المدة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الجلسات</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>العمر</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '150px' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProtocols.map((protocol) => (
                <tr key={protocol.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px' }}>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: 'rgba(139, 92, 246, 0.15)',
                          flexShrink: 0
                        }}
                      >
                        <FaBrain style={{ color: '#8b5cf6', fontSize: '1.2rem' }} />
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: 'var(--text)' }}>{protocol.name}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{protocol.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span 
                      className="px-3 py-1 rounded-pill"
                      style={{ 
                        backgroundColor: 'rgba(88, 204, 2, 0.1)',
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        fontWeight: 500
                      }}
                    >
                      {protocol.targetDisability}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span 
                      className="px-3 py-1 rounded-pill"
                      style={{ 
                        backgroundColor: 'rgba(206, 130, 255, 0.1)',
                        color: 'var(--secondary)',
                        fontSize: '0.8rem',
                        fontWeight: 500
                      }}
                    >
                      {protocol.category}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <FaClock style={{ color: 'var(--primary)' }} />
                      {protocol.duration}
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <FaFileMedical style={{ color: 'var(--secondary)' }} />
                      {protocol.sessions}
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <FaBrain style={{ color: '#8b5cf6' }} />
                      {protocol.ageGroup}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span 
                      className="px-3 py-1 rounded-pill"
                      style={{ 
                        backgroundColor: statusConfig[protocol.status].bg,
                        color: statusConfig[protocol.status].color,
                        fontSize: '0.8rem',
                        fontWeight: 500
                      }}
                    >
                      {statusConfig[protocol.status].icon} {statusConfig[protocol.status].label}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '8px' }}
                        onClick={() => { setSelectedProtocol(protocol); setShowDetailModal(true); }}
                      >
                        <FaEye style={{ fontSize: '0.8rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>عرض</span>
                      </button>
                      <button
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '8px' }}
                        onClick={() => {}}
                      >
                        <FaEdit style={{ fontSize: '0.8rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>تعديل</span>
                      </button>
                      <button
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', padding: 0, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: '8px' }}
                        onClick={() => handleDelete(protocol.id)}
                      >
                        <FaTrash style={{ fontSize: '0.8rem' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إضافة بروتوكول جديد</h3>
                <button onClick={() => setShowCreateModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                  <FaTimes style={{ color: 'var(--text-light)' }} />
                </button>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>اسم البروتوكول <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input type="text" className="form-control p-3" value={newProtocol.name} onChange={(e) => setNewProtocol({ ...newProtocol, name: e.target.value })} placeholder="أدخل اسم البروتوكول" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الوصف</label>
                <textarea className="form-control p-3" value={newProtocol.description} onChange={(e) => setNewProtocol({ ...newProtocol, description: e.target.value })} placeholder="أدخل وصف البروتوكول" rows={3} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', resize: 'none' }} />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>نوع الإعاقة <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <select className="form-select p-3" value={newProtocol.targetDisability} onChange={(e) => setNewProtocol({ ...newProtocol, targetDisability: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                    <option value="">اختر نوع الإعاقة</option>
                    {disabilityTypes.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الفئة</label>
                  <select className="form-select p-3" value={newProtocol.category} onChange={(e) => setNewProtocol({ ...newProtocol, category: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                    <option value="">اختر الفئة</option>
                    {categories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المدة</label>
                  <input type="text" className="form-control p-3" value={newProtocol.duration} onChange={(e) => setNewProtocol({ ...newProtocol, duration: e.target.value })} placeholder="مثال: 3 أشهر" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>عدد الجلسات</label>
                  <input type="number" className="form-control p-3" value={newProtocol.sessions || ''} onChange={(e) => setNewProtocol({ ...newProtocol, sessions: parseInt(e.target.value) || 0 })} placeholder="عدد الجلسات" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الفئة العمرية</label>
                  <select className="form-select p-3" value={newProtocol.ageGroup} onChange={(e) => setNewProtocol({ ...newProtocol, ageGroup: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                    <option value="">اختر الفئة</option>
                    {ageGroups.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <button onClick={handleCreate} className="btn w-100 py-3" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
                <FaPlus className="me-2" /> إنشاء البروتوكول
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showDetailModal && selectedProtocol && (
          <div
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
            onClick={() => setShowDetailModal(false)}
          >
            <div
              className="card border-0 p-4"
              style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold" style={{ color: 'var(--text)' }}>{selectedProtocol.name}</h3>
                <button onClick={() => setShowDetailModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                  <FaTimes style={{ color: 'var(--text-light)' }} />
                </button>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="badge" style={{ backgroundColor: statusConfig[selectedProtocol.status].bg, color: statusConfig[selectedProtocol.status].color, padding: '8px 16px' }}>
                  {statusConfig[selectedProtocol.status].icon} {statusConfig[selectedProtocol.status].label}
                </span>
                <span className="badge" style={{ backgroundColor: 'rgba(88, 204, 2, 0.1)', color: 'var(--primary)', padding: '8px 16px' }}>
                  <FaUserInjured className="me-1" /> {selectedProtocol.targetDisability}
                </span>
                <span className="badge" style={{ backgroundColor: 'rgba(206, 130, 255, 0.1)', color: 'var(--secondary)', padding: '8px 16px' }}>
                  <FaGraduationCap className="me-1" /> {selectedProtocol.category}
                </span>
              </div>

              <p className="mb-4" style={{ color: 'var(--text-light)' }}>{selectedProtocol.description}</p>

              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)', textAlign: 'center' }}>
                    <FaClock className="mb-2" style={{ color: 'var(--primary)' }} />
                    <div style={{ color: 'var(--text)', fontWeight: 'bold' }}>{selectedProtocol.duration}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المدة</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)', textAlign: 'center' }}>
                    <FaFileMedical className="mb-2" style={{ color: 'var(--secondary)' }} />
                    <div style={{ color: 'var(--text)', fontWeight: 'bold' }}>{selectedProtocol.sessions}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>جلسة</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)', textAlign: 'center' }}>
                    <FaBrain className="mb-2" style={{ color: '#8b5cf6' }} />
                    <div style={{ color: 'var(--text)', fontWeight: 'bold' }}>{selectedProtocol.ageGroup}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>العمر</div>
                  </div>
                </div>
              </div>

              {selectedProtocol.steps.length > 0 && (
                <div>
                  <h5 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>خطوات البروتوكول</h5>
                  {selectedProtocol.steps.map((step, index) => (
                    <div key={step.id} className="mb-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)', borderRight: `4px solid var(--primary)` }}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{index + 1}. {step.title}</span>
                        <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>{step.duration}</span>
                      </div>
                      <p className="mb-0" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{step.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default AdminTreatmentProtocolsPage;