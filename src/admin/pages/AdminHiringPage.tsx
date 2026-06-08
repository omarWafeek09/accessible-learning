import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaDownload, FaTrash, FaEye, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap, FaBriefcase, FaUserGraduate, FaCheck, FaTimes, FaStar, FaFilePdf, FaFileAlt } from 'react-icons/fa';

interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  expectedSalary: string;
  availableFrom: string;
  resumeUrl: string;
  coverLetter: string;
  submittedAt: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  rating: number;
  notes: string;
}

const exampleResumes: Resume[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed.cv@example.com',
    phone: '+966551234567',
    location: 'الرياض',
    age: 28,
    position: 'معالج طبيعي',
    experience: '5 سنوات في مركز تأهيل',
    education: 'بكالوريوس العلاج الطبيعي - جامعة الملك سعود',
    skills: ['العلاج الطبيعي', 'إعادة التأهيل', 'التمارين العلاجية'],
    expectedSalary: '8000-12000',
    availableFrom: '2024-02-01',
    resumeUrl: '#',
    coverLetter: 'أتمنى الحصول على فرصة للعمل في مؤسستكم الموقرة...',
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'new',
    rating: 0,
    notes: ''
  },
  {
    id: '2',
    name: 'سارة علي',
    email: 'sara.cv@example.com',
    phone: '+966509876543',
    location: 'جدة',
    age: 26,
    position: 'أخصائية نطق وكلام',
    experience: '3 سنوات في مركز أطفال',
    education: 'ماجستير في اضطرابات النطق - جامعة القاهرة',
    skills: ['النطق والكلام', 'التوحد', ' الأطفال'],
    expectedSalary: '7000-10000',
    availableFrom: '2024-01-20',
    resumeUrl: '#',
    coverLetter: 'لدي خبرة كبيرة في التعامل مع أطفال اضطرابات النطق...',
    submittedAt: '2024-01-14T09:15:00Z',
    status: 'reviewing',
    rating: 4,
    notes: 'مؤهلات ممتازة'
  },
  {
    id: '3',
    name: 'خالد عمر',
    email: 'khalid.cv@example.com',
    phone: '+966531112233',
    location: 'الدمام',
    age: 32,
    position: 'معالج سلوكي',
    experience: '7 سنوات - شهادة ABA',
    education: 'دكتوراه في التحليل السلوكي التطبيقي',
    skills: ['ABA', 'التوحد', ' تعديل السلوك', 'التدريب'],
    expectedSalary: '15000-20000',
    availableFrom: 'فوري',
    resumeUrl: '#',
    coverLetter: 'أبحث عن فرصة لتطوير مهاراتي في بيئة عمل محترفة...',
    submittedAt: '2024-01-12T14:20:00Z',
    status: 'shortlisted',
    rating: 5,
    notes: 'ممتاز - توصية عالية'
  },
  {
    id: '4',
    name: 'منى عبدالله',
    email: 'mona.cv@example.com',
    phone: '+966544556677',
    location: 'الرياض',
    age: 24,
    position: 'معلمة تربوية',
    experience: 'سنة واحدة',
    education: 'بكالوريوس التربية الخاصة',
    skills: ['التعليم', 'صعوبات التعلم', 'التوحد'],
    expectedSalary: '5000-7000',
    availableFrom: '2024-03-01',
    resumeUrl: '#',
    coverLetter: 'طالبة للتعلم والإتقان في مجال التعليم الخاص...',
    submittedAt: '2024-01-10T11:00:00Z',
    status: 'rejected',
    rating: 2,
    notes: 'خبرة محدودة'
  },
  {
    id: '5',
    name: 'علي حسن',
    email: 'ali.cv@example.com',
    phone: '+966577889900',
    location: 'الرياض',
    age: 30,
    position: 'أخصائي نفسي',
    experience: '6 سنوات',
    education: 'ماجستير في علم النفس',
    skills: ['التقييم النفسي', 'العلاج', 'التواصل'],
    expectedSalary: '10000-15000',
    availableFrom: '2024-02-15',
    resumeUrl: '#',
    coverLetter: 'لدي شغف لمساعدة الأطفال وأسرهم...',
    submittedAt: '2024-01-08T16:45:00Z',
    status: 'hired',
    rating: 5,
    notes: 'تم توظيفه'
  },
  {
    id: '6',
    name: 'فاطمة يوسف',
    email: 'fatima.cv@example.com',
    phone: '+966500112233',
    location: 'البريدة',
    age: 27,
    position: 'معالجة حسي',
    experience: '4 سنوات',
    education: 'بكالوريوس العلاج الوظيفي',
    skills: ['العلاج الحسي', 'التوحد', 'الأطفال'],
    expectedSalary: '8000-11000',
    availableFrom: '2024-01-25',
    resumeUrl: '#',
    coverLetter: 'أتمنى المساهمة في فريقكم المتميز...',
    submittedAt: '2024-01-05T08:30:00Z',
    status: 'new',
    rating: 0,
    notes: ''
  }
];

const statusConfig = {
  new: { label: 'جديد', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
  reviewing: { label: 'قيد المراجعة', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  shortlisted: { label: 'مرشح', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
  rejected: { label: 'مرفوض', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
  hired: { label: 'متوظف', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' }
};

const positionColors: Record<string, { bg: string; color: string }> = {
  'معالج طبيعي': { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
  'أخصائية نطق': { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' },
  'معالج سلوكي': { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
  'معلمة تربوية': { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
  'أخصائي نفسي': { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
  'معالجة حسي': { bg: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' },
};

const AdminHiringPage = () => {
  const [resumes, setResumes] = useState<Resume[]>(exampleResumes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [cvResume, setCvResume] = useState<Resume | null>(null);

  const handleStatusChange = (id: string, status: Resume['status']) => {
    setResumes(resumes.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleRating = (id: string, rating: number) => {
    setResumes(resumes.map(r => r.id === id ? { ...r, rating } : r));
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا السيرة؟')) {
      setResumes(resumes.filter(r => r.id !== id));
    }
  };

  const filteredResumes = resumes.filter(r => {
    const matchesSearch = r.name.includes(searchTerm) || r.email.includes(searchTerm) || r.position.includes(searchTerm);
    const matchesStatus = statusFilter === '' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newCount = resumes.filter(r => r.status === 'new').length;
  const reviewingCount = resumes.filter(r => r.status === 'reviewing').length;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>طلبات التوظيف</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {resumes.length} طلب | {newCount} جديد | {reviewingCount} قيد المراجعة
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="row mb-4"
      >
        <div className="col-md-3">
          <div className="card border-0 p-3" style={{ borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <FaUserGraduate size={18} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>جديد</div>
                <div className="fw-bold" style={{ color: 'var(--text)' }}>{newCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 p-3" style={{ borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                <FaBriefcase size={18} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>قيد المراجعة</div>
                <div className="fw-bold" style={{ color: 'var(--text)' }}>{reviewingCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 p-3" style={{ borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                <FaStar size={18} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>مرشح</div>
                <div className="fw-bold" style={{ color: 'var(--text)' }}>{resumes.filter(r => r.status === 'shortlisted').length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 p-3" style={{ borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                <FaCheck size={18} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>متوظف</div>
                <div className="fw-bold" style={{ color: 'var(--text)' }}>{resumes.filter(r => r.status === 'hired').length}</div>
              </div>
            </div>
          </div>
        </div>
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
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', paddingRight: '40px' }}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
            >
              <option value="">كل الحالات</option>
              <option value="new">جديد</option>
              <option value="reviewing">قيد المراجعة</option>
              <option value="shortlisted">مرشح</option>
              <option value="rejected">مرفوض</option>
              <option value="hired">متوظف</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-0"
        style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}
      >
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المقدم</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المنصب</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الخبرة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التقييم</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '180px' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredResumes.map(resume => (
                <tr key={resume.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {resume.name.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: 'var(--text)' }}>{resume.name}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{resume.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span className="badge" style={{ backgroundColor: positionColors[resume.position]?.bg || 'var(--surface-elevated)', color: positionColors[resume.position]?.color || 'var(--text)' }}>
                      {resume.position}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text)', fontSize: '0.9rem' }}>
                    {resume.experience}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <FaStar 
                          key={star} 
                          style={{ 
                            color: star <= resume.rating ? '#f59e0b' : 'var(--border)', 
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleRating(resume.id, star)}
                        />
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <select
                      value={resume.status}
                      onChange={(e) => handleStatusChange(resume.id, e.target.value as Resume['status'])}
                      className="form-select form-select-sm"
                      style={{ 
                        borderRadius: '8px', 
                        backgroundColor: statusConfig[resume.status].bg, 
                        border: 'none',
                        color: statusConfig[resume.status].color,
                        fontWeight: 500,
                        cursor: 'pointer'
                      }}
                    >
                      <option value="new">جديد</option>
                      <option value="reviewing">قيد المراجعة</option>
                      <option value="shortlisted">مرشح</option>
                      <option value="rejected">مرفوض</option>
                      <option value="hired">متوظف</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    {new Date(resume.submittedAt).toLocaleDateString('ar-SA')}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => { setSelectedResume(resume); setShowDetailModal(true); }}
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      >
                        <FaEye style={{ fontSize: '0.8rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>عرض</span>
                      </button>
                      <button
                        onClick={() => { setCvResume(resume); setShowCVModal(true); }}
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#3b82f6', borderRadius: '8px' }}
                      >
                        <FaFilePdf style={{ fontSize: '0.8rem' }} />
                        <span style={{ fontSize: '0.75rem' }}>السيرة</span>
                      </button>
                      <button
                        onClick={() => handleDelete(resume.id)}
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ width: '32px', height: '32px', padding: 0, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: '8px' }}
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
      </motion.div>

      {showDetailModal && selectedResume && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowDetailModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>تفاصيل الطلب</h3>
              <button onClick={() => setShowDetailModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
                {selectedResume.name.charAt(0)}
              </div>
              <div>
                <h4 className="fw-bold mb-1" style={{ color: 'var(--text)' }}>{selectedResume.name}</h4>
                <span className="badge" style={{ backgroundColor: positionColors[selectedResume.position]?.bg, color: positionColors[selectedResume.position]?.color }}>
                  {selectedResume.position}
                </span>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FaEnvelope style={{ color: 'var(--text-light)' }} />
                  <span style={{ color: 'var(--text)' }}>{selectedResume.email}</span>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FaPhone style={{ color: 'var(--text-light)' }} />
                  <span style={{ color: 'var(--text)' }}>{selectedResume.phone}</span>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FaMapMarkerAlt style={{ color: 'var(--text-light)' }} />
                  <span style={{ color: 'var(--text)' }}>{selectedResume.location}</span>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <FaCalendarAlt style={{ color: 'var(--text-light)' }} />
                  <span style={{ color: 'var(--text)' }}>{selectedResume.age} سنة</span>
                </div>
              </div>
            </div>

            <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaGraduationCap style={{ color: 'var(--primary)' }} />
                <span className="fw-bold" style={{ color: 'var(--text)' }}>التعليم</span>
              </div>
              <p className="mb-0" style={{ color: 'var(--text-light)' }}>{selectedResume.education}</p>
            </div>

            <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaBriefcase style={{ color: 'var(--secondary)' }} />
                <span className="fw-bold" style={{ color: 'var(--text)' }}>الخبرة</span>
              </div>
              <p className="mb-0" style={{ color: 'var(--text-light)' }}>{selectedResume.experience}</p>
            </div>

            <div className="mb-3">
              <span className="fw-bold d-block mb-2" style={{ color: 'var(--text)' }}>المهارات</span>
              <div className="d-flex flex-wrap gap-2">
                {selectedResume.skills.map((skill, i) => (
                  <span key={i} className="badge" style={{ backgroundColor: 'rgba(88, 204, 2, 0.1)', color: 'var(--primary)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
              <span className="fw-bold d-block mb-2" style={{ color: 'var(--text)' }}>الراتب المتوقع</span>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{selectedResume.expectedSalary} ريال</span>
            </div>

            <div className="d-flex gap-3">
              <button
                className="btn flex-fill py-2"
                style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px' }}
                onClick={() => handleStatusChange(selectedResume.id, 'shortlisted')}
              >
                <FaCheck className="me-2" /> قبول
              </button>
              <button
                className="btn flex-fill py-2"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', borderRadius: '10px' }}
                onClick={() => handleStatusChange(selectedResume.id, 'rejected')}
              >
                <FaTimes className="me-2" /> رفض
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHiringPage;