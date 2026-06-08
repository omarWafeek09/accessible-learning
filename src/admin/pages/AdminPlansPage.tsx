import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCheck, FaTimes, FaTimesCircle, FaCheckCircle, FaCrown, FaUser, FaUsers, FaHandHoldingUsd, FaStar, FaPercentage, FaCalendarAlt } from 'react-icons/fa';

interface Plan {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  maxStudents: number;
  maxCourses: number;
  maxGames: number;
  hasCertificate: boolean;
  hasPrioritySupport: boolean;
  hasWeeklySession: boolean;
  hasParentDashboard: boolean;
  hasMonthlyReport: boolean;
  hasDirectSupport: boolean;
  status: 'active' | 'inactive' | 'draft';
  subscribers: number;
  color: string;
}

const examplePlans: Plan[] = [
  {
    id: '1',
    name: 'الأساسي',
    nameEn: 'Basic',
    price: 0,
    period: 'مجاني',
    description: 'ابدأ رحلتك التعليمية مجاناً مع الوصول الأساسي',
    features: [
      'وصول إلى 10 دروس أساسية',
      '3 ألعاب تعليمية',
      'تتبع التقدم الأساسي',
      'دعم المجتمع'
    ],
    highlighted: false,
    maxStudents: 1,
    maxCourses: 10,
    maxGames: 3,
    hasCertificate: false,
    hasPrioritySupport: false,
    hasWeeklySession: false,
    hasParentDashboard: false,
    hasMonthlyReport: false,
    hasDirectSupport: false,
    status: 'active',
    subscribers: 1250,
    color: '#64748b'
  },
  {
    id: '2',
    name: 'الذهبي',
    nameEn: 'Gold',
    price: 49,
    period: 'ريال/شهر',
    description: 'تجربة تعليمية متكاملة مع جميع المميزات',
    features: [
      'وصول غير محدود للدورات',
      'جميع الألعاب التعليمية',
      'تتبع التقدم المتقدم',
      'شهادات إتمام',
      'دعم اولوية',
      'جلسات أسبوعية مع متخصص'
    ],
    highlighted: true,
    maxStudents: 1,
    maxCourses: -1,
    maxGames: -1,
    hasCertificate: true,
    hasPrioritySupport: true,
    hasWeeklySession: true,
    hasParentDashboard: false,
    hasMonthlyReport: false,
    hasDirectSupport: false,
    status: 'active',
    subscribers: 856,
    color: '#f59e0b'
  },
  {
    id: '3',
    name: 'العائلي',
    nameEn: 'Family',
    price: 89,
    period: 'ريال/شهر',
    description: 'لأسر متعددة الأطفال مع لوحة تحكم للأهل',
    features: [
      'كل مميزات الخطة الذهبية',
      '5 حسابات أطفال',
      'لوحة تحكم للأهل',
      'تقارير تقدم شهرية',
      'استشارات عائلية مجانية',
      'دعم مباشر على مدار الساعة'
    ],
    highlighted: false,
    maxStudents: 5,
    maxCourses: -1,
    maxGames: -1,
    hasCertificate: true,
    hasPrioritySupport: true,
    hasWeeklySession: true,
    hasParentDashboard: true,
    hasMonthlyReport: true,
    hasDirectSupport: true,
    status: 'active',
    subscribers: 234,
    color: '#8b5cf6'
  },
  {
    id: '4',
    name: 'المؤسساتي',
    nameEn: 'Enterprise',
    price: 299,
    period: 'ريال/شهر',
    description: 'حلول متكاملة للمؤسسات التعليمية',
    features: [
      'وصول غير محدود',
      '20 حساب مستخدم',
      'لوحة تحكم متعددة',
      'تقارير تفصيلية',
      'دعم مخصص',
      'تدريب الفريق'
    ],
    highlighted: false,
    maxStudents: 20,
    maxCourses: -1,
    maxGames: -1,
    hasCertificate: true,
    hasPrioritySupport: true,
    hasWeeklySession: true,
    hasParentDashboard: true,
    hasMonthlyReport: true,
    hasDirectSupport: true,
    status: 'draft',
    subscribers: 45,
    color: '#06b6d4'
  }
];

const featureConfig: Record<string, { icon: JSX.Element; label: string }> = {
  hasCertificate: { icon: <FaCheckCircle />, label: 'شهادات إتمام' },
  hasPrioritySupport: { icon: <FaStar />, label: 'دعم أولوية' },
  hasWeeklySession: { icon: <FaCalendarAlt />, label: 'جلسات أسبوعية' },
  hasParentDashboard: { icon: <FaUser />, label: 'لوحة تحكم للأهل' },
  hasMonthlyReport: { icon: <FaPercentage />, label: 'تقارير شهرية' },
  hasDirectSupport: { icon: <FaHandHoldingUsd />, label: 'دعم مباشر 24/7' },
};

const statusConfig = {
  active: { label: 'نشط', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
  inactive: { label: 'غير نشط', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' },
  draft: { label: 'مسودة', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
};

const AdminPlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>(examplePlans);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: '',
    nameEn: '',
    price: 0,
    period: 'ريال/شهر',
    description: '',
    features: [],
    highlighted: false,
    maxStudents: 1,
    maxCourses: 10,
    maxGames: 3,
    hasCertificate: false,
    hasPrioritySupport: false,
    hasWeeklySession: false,
    hasParentDashboard: false,
    hasMonthlyReport: false,
    hasDirectSupport: false,
    status: 'draft',
    color: '#8b5cf6'
  });

  const handleEdit = (plan: Plan) => {
    setNewPlan(plan);
    setIsEditing(true);
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الخطة؟')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!newPlan.name || !newPlan.description) {
      alert('الرجاء إدخال اسم الخطة ووصفها');
      return;
    }

    if (isEditing && newPlan.id) {
      setPlans(plans.map(p => p.id === newPlan.id ? { ...p, ...newPlan } as Plan : p));
    } else {
      const plan: Plan = {
        id: Date.now().toString(),
        name: newPlan.name || '',
        nameEn: newPlan.nameEn || '',
        price: newPlan.price || 0,
        period: newPlan.period || 'ريال/شهر',
        description: newPlan.description || '',
        features: newPlan.features || [],
        highlighted: newPlan.highlighted || false,
        maxStudents: newPlan.maxStudents || 1,
        maxCourses: newPlan.maxCourses || 10,
        maxGames: newPlan.maxGames || 3,
        hasCertificate: newPlan.hasCertificate || false,
        hasPrioritySupport: newPlan.hasPrioritySupport || false,
        hasWeeklySession: newPlan.hasWeeklySession || false,
        hasParentDashboard: newPlan.hasParentDashboard || false,
        hasMonthlyReport: newPlan.hasMonthlyReport || false,
        hasDirectSupport: newPlan.hasDirectSupport || false,
        status: newPlan.status || 'draft',
        subscribers: 0,
        color: newPlan.color || '#8b5cf6'
      };
      setPlans([...plans, plan]);
    }

    setShowEditModal(false);
    setNewPlan({
      name: '',
      nameEn: '',
      price: 0,
      period: 'ريال/شهر',
      description: '',
      features: [],
      highlighted: false,
      maxStudents: 1,
      maxCourses: 10,
      maxGames: 3,
      hasCertificate: false,
      hasPrioritySupport: false,
      hasWeeklySession: false,
      hasParentDashboard: false,
      hasMonthlyReport: false,
      hasDirectSupport: false,
      status: 'draft',
      color: '#8b5cf6'
    });
    setIsEditing(false);
  };

  const filteredPlans = plans.filter(p =>
    p.name.includes(searchTerm) || p.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSubscribers = plans.reduce((sum, p) => sum + p.subscribers, 0);
  const activePlans = plans.filter(p => p.status === 'active').length;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>إدارة الخطط</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {plans.length} خطة | {activePlans} نشط | {totalSubscribers.toLocaleString()} مشترك
          </p>
        </div>
        <button
          onClick={() => { setIsEditing(false); setShowEditModal(true); }}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px' }}
        >
          <FaPlus />
          <span>إضافة خطة</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="row mb-4"
      >
        <div className="col-md-4">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)' }}>
                <FaUsers size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي المشتركين</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{totalSubscribers.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                <FaCrown size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>الخطط النشطة</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{activePlans}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                <FaHandHoldingUsd size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>الدخل المتوقع</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>
                  {plans.reduce((sum, p) => sum + (p.price > 0 ? p.price * p.subscribers : 0), 0).toLocaleString()} <span style={{ fontSize: '0.8rem' }}>ريال</span>
                </div>
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
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '50px' }}>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الخطة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>السعر</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الأطفال</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المشتركين</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '130px' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map(plan => (
                <tr key={plan.id} style={{ borderBottom: '1px solid var(--border)' }}>
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
                          backgroundColor: `${plan.color}20`,
                          flexShrink: 0
                        }}
                      >
                        <FaCrown style={{ color: plan.color, fontSize: '1.2rem' }} />
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-bold" style={{ color: 'var(--text)' }}>{plan.name}</span>
                          {plan.highlighted && (
                            <span 
                              className="badge"
                              style={{ backgroundColor: `${plan.color}20`, color: plan.color, fontSize: '0.7rem' }}
                            >
                              مميز
                            </span>
                          )}
                        </div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{plan.nameEn} • {plan.subscribers} مشترك</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {plan.price === 0 ? (
                      <span className="fw-bold" style={{ color: plan.color }}>مجاني</span>
                    ) : (
                      <span className="fw-bold" style={{ color: plan.color, fontSize: '1.1rem' }}>
                        {plan.price} <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>/{plan.period}</span>
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}>
                    {plan.maxStudents === -1 ? 'غير محدود' : `${plan.maxStudents}`}
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <FaUsers style={{ color: 'var(--primary)' }} />
                      {plan.subscribers.toLocaleString()}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span className="badge" style={{ backgroundColor: statusConfig[plan.status].bg, color: statusConfig[plan.status].color }}>
                      {statusConfig[plan.status].label}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="btn btn-sm d-flex align-items-center gap-1"
                        style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '8px' }}
                      >
                        <FaEdit style={{ fontSize: '0.8rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>تعديل</span>
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
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

      {showEditModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowEditModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>{isEditing ? 'تعديل الخطة' : 'إضافة خطة جديدة'}</h3>
              <button onClick={() => setShowEditModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الاسم (عربي)</label>
                <input type="text" className="form-control p-3" value={newPlan.name || ''} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} placeholder="الأساسي" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الاسم (إنجليزي)</label>
                <input type="text" className="form-control p-3" value={newPlan.nameEn || ''} onChange={e => setNewPlan({ ...newPlan, nameEn: e.target.value })} placeholder="Basic" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الوصف</label>
              <textarea className="form-control p-3" value={newPlan.description || ''} onChange={e => setNewPlan({ ...newPlan, description: e.target.value })} placeholder="وصف الخطة..." rows={2} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', resize: 'none' }} />
            </div>

            <div className="row mb-3">
              <div className="col-4">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>السعر</label>
                <input type="number" className="form-control p-3" value={newPlan.price || ''} onChange={e => setNewPlan({ ...newPlan, price: parseInt(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-4">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الفترة</label>
                <select className="form-select p-3" value={newPlan.period || ''} onChange={e => setNewPlan({ ...newPlan, period: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                  <option value="مجاني">مجاني</option>
                  <option value="ريال/شهر">ريال/شهر</option>
                  <option value="ريال/سنة">ريال/سنة</option>
                </select>
              </div>
              <div className="col-4">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الحالة</label>
                <select className="form-select p-3" value={newPlan.status || 'draft'} onChange={e => setNewPlan({ ...newPlan, status: e.target.value as any })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="draft">مسودة</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-4">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الأطفال</label>
                <input type="number" className="form-control p-3" value={newPlan.maxStudents || ''} onChange={e => setNewPlan({ ...newPlan, maxStudents: parseInt(e.target.value) })} placeholder="1" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-4">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الدورات</label>
                <input type="number" className="form-control p-3" value={newPlan.maxCourses || ''} onChange={e => setNewPlan({ ...newPlan, maxCourses: parseInt(e.target.value) })} placeholder="10" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-4">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الألعاب</label>
                <input type="number" className="form-control p-3" value={newPlan.maxGames || ''} onChange={e => setNewPlan({ ...newPlan, maxGames: parseInt(e.target.value) })} placeholder="3" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المميزات</label>
              <div className="d-flex flex-wrap gap-3">
                {Object.entries(featureConfig).map(([key, config]) => (
                  <label key={key} className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={!!newPlan[key as keyof typeof newPlan]} 
                      onChange={e => setNewPlan({ ...newPlan, [key]: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{config.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={newPlan.highlighted || false} 
                  onChange={e => setNewPlan({ ...newPlan, highlighted: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <span className="fw-bold" style={{ color: 'var(--text)' }}>خطة مميزة (الأكثر شعبية)</span>
              </label>
            </div>

            <button onClick={handleSave} className="btn w-100 py-3" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              {isEditing ? 'حفظ التغييرات' : 'إضافة الخطة'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlansPage;