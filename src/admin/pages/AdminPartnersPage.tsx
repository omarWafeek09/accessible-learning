// src\admin\pages\AdminPartnersPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrash, FaTimes, FaSchool, FaHospital, FaUsers, FaBed, FaChalkboard, FaStethoscope, FaCalendarAlt, FaCheck, FaTimesCircle, FaHandshake } from 'react-icons/fa';

interface Institution {
  id: string;
  name: string;
  institutionType: 'school' | 'hospital' | 'clinic' | 'center';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'active' | 'inactive' | 'pending';
  contractStart: string;
  contractEnd: string;
  studentsCount?: number;
  grades?: string;
  bedsCount?: number;
  departments?: string;
  services: string[];
  monthlyRevenue: number;
  notes: string;
}

const exampleInstitutions: Institution[] = [
  { 
    id: '1', 
    name: 'مدرسة الأمل الخاصة', 
    institutionType: 'school', 
    contactPerson: 'أحمد محمد', 
    email: 'ahmed@alam-school.com', 
    phone: '+966501234567', 
    address: 'حي الازدهار، شارع الملك فهد',
    city: 'الرياض',
    status: 'active', 
    contractStart: '2024-01-01', 
    contractEnd: '2024-12-31',
    studentsCount: 250,
    grades: 'KG - Grade 6',
    services: ['علاج طبيعي', 'أخصائي نفسي', 'تقييم تأهيلي'],
    monthlyRevenue: 15000,
    notes: 'شراكة ناجحة'
  },
  { 
    id: '2', 
    name: 'مستشفى الأفق العام', 
    institutionType: 'hospital', 
    contactPerson: 'سارة علي', 
    email: 'sara@ahfad-hospital.com', 
    phone: '+966509876543', 
    address: 'حي الحجاز، شارع الوحدة',
    city: 'جدة',
    status: 'active', 
    contractStart: '2024-02-01', 
    contractEnd: '2025-01-31',
    bedsCount: 150,
    departments: 'أطفال، علاج طبيعي، الأعصاب',
    services: ['تأهيل أطفال', 'جلسات علاجية', 'تقييم طبي'],
    monthlyRevenue: 35000,
    notes: 'مستشفى رئيسي'
  },
  { 
    id: '3', 
    name: 'مركز النور للتأهيل', 
    institutionType: 'center', 
    contactPerson: 'خالد عمر', 
    email: 'khalid@noor-center.com', 
    phone: '+966551112233', 
    address: 'حي العنود',
    city: 'الدمام',
    status: 'active', 
    contractStart: '2024-03-15', 
    contractEnd: '2025-03-14',
    services: ['علاج طبيعي', 'علاج سلوكي', 'تعديل سلوك'],
    monthlyRevenue: 20000,
    notes: 'مركز متخصص'
  },
  { 
    id: '4', 
    name: 'مدرسة الخليج الدولي', 
    institutionType: 'school', 
    contactPerson: 'منى عبدالله', 
    email: 'mona@gulf-school.com', 
    phone: '+966544556677', 
    address: 'حي العليا',
    city: 'الرياض',
    status: 'pending', 
    contractStart: '', 
    contractEnd: '',
    studentsCount: 500,
    grades: 'KG - Grade 12',
    services: ['برامج تأهيلية'],
    monthlyRevenue: 0,
    notes: 'محادثات جارية'
  },
  { 
    id: '5', 
    name: 'عيادة الشفاء', 
    institutionType: 'clinic', 
    contactPerson: 'علي حسن', 
    email: 'ali@shifa-clinic.com', 
    phone: '+966577889900', 
    address: 'حي الملقا',
    city: 'الرياض',
    status: 'inactive', 
    contractStart: '2023-01-01', 
    contractEnd: '2023-12-31',
    services: ['علاج طبيعي'],
    monthlyRevenue: 5000,
    notes: 'انتهى العقد'
  },
  { 
    id: '6', 
    name: 'مستشفى الصحة النفسية', 
    institutionType: 'hospital', 
    contactPerson: 'فاطمة يوسف', 
    email: 'fatima@mental-health.com', 
    phone: '+966500112233', 
    address: 'حي النرجس',
    city: 'الرياض',
    status: 'active', 
    contractStart: '2024-04-01', 
    contractEnd: '2025-03-31',
    bedsCount: 80,
    departments: 'طب نفسي أطفال، علاج سلوكي',
    services: ['تقييم نفسي', 'علاج سلوكي', 'إرشاد أسري'],
    monthlyRevenue: 25000,
    notes: 'شريك قوي'
  },
];

const institutionTypeLabels: Record<Institution['institutionType'], string> = {
  school: 'مدرسة',
  hospital: 'مستشفى',
  clinic: 'عيادة',
  center: 'مركز تأهيلي',
};

const institutionTypeIcons: Record<Institution['institutionType'], any> = {
  school: <FaSchool />,
  hospital: <FaHospital />,
  clinic: <FaStethoscope />,
  center: <FaChalkboard />,
};

const institutionTypeColors: Record<Institution['institutionType'], { bg: string; color: string }> = {
  school: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
  hospital: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
  clinic: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
  center: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
};

const statusConfig = {
  active: { label: 'نشط', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
  inactive: { label: 'غير نشط', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' },
  pending: { label: 'معلق', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
};

const AdminPartnersPage = () => {
  const [institutions, setInstitutions] = useState<Institution[]>(exampleInstitutions);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'school' | 'hospital' | 'clinic' | 'center' | 'active' | 'inactive' | 'pending'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  const [newInstitution, setNewInstitution] = useState({
    name: '',
    institutionType: 'school' as Institution['institutionType'],
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    contractStart: '',
    contractEnd: '',
    studentsCount: 0,
    grades: '',
    bedsCount: 0,
    departments: '',
    services: [] as string[],
    monthlyRevenue: 0,
    notes: ''
  });

  const [newService, setNewService] = useState('');

  const handleAddService = () => {
    if (newService && !newInstitution.services.includes(newService)) {
      setNewInstitution({ ...newInstitution, services: [...newInstitution.services, newService] });
      setNewService('');
    }
  };

  const handleRemoveService = (service: string) => {
    setNewInstitution({ ...newInstitution, services: newInstitution.services.filter(s => s !== service) });
  };

  const handleAddInstitution = () => {
    if (!newInstitution.name || !newInstitution.contactPerson || !newInstitution.email) {
      alert('الرجاء إدخال البيانات المطلوبة');
      return;
    }

    const institution: Institution = {
      id: Date.now().toString(),
      ...newInstitution,
      status: 'pending'
    };

    setInstitutions([institution, ...institutions]);
    setShowAddModal(false);
    setNewInstitution({
      name: '',
      institutionType: 'school',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      contractStart: '',
      contractEnd: '',
      studentsCount: 0,
      grades: '',
      bedsCount: 0,
      departments: '',
      services: [],
      monthlyRevenue: 0,
      notes: ''
    });
  };

  const handleUpdateStatus = (institutionId: string, status: Institution['status']) => {
    setInstitutions(institutions.map(i =>
      i.id === institutionId ? { ...i, status } : i
    ));
  };

  const handleDeleteInstitution = (institutionId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المؤسسة؟')) {
      setInstitutions(institutions.filter(i => i.id !== institutionId));
    }
  };

  const filteredInstitutions = institutions.filter(i => {
    const matchesSearch = i.name.includes(searchTerm) || i.contactPerson.includes(searchTerm) || i.city.includes(searchTerm);
    const matchesTab = 
      activeTab === 'all' || 
      i.institutionType === activeTab ||
      i.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalRevenue = institutions.filter(i => i.status === 'active').reduce((sum, i) => sum + i.monthlyRevenue, 0);
  const activeCount = institutions.filter(i => i.status === 'active').length;
  const schoolsCount = institutions.filter(i => i.institutionType === 'school').length;
  const hospitalsCount = institutions.filter(i => i.institutionType === 'hospital' || i.institutionType === 'clinic').length;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>إدارة المؤسسات</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {institutions.length} مؤسسة | النشطون {activeCount}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px' }}
        >
          <FaPlus />
          <span>إضافة مؤسسة</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="row mb-4"
      >
        <div className="col-md-3">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                <FaHandshake size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>الإيرادات الشهرية</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{totalRevenue.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>ريال</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                <FaCheck size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>النشطون</div>
                <div className="fw-bold" style={{ color: '#22c55e', fontSize: '1.3rem' }}>{activeCount} <span style={{ fontSize: '0.9rem' }}>مؤسسة</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <FaSchool size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>المدارس</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{schoolsCount} <span style={{ fontSize: '0.9rem' }}>مدرسة</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                <FaHospital size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>المستشفيات</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{hospitalsCount} <span style={{ fontSize: '0.9rem' }}>مستشفى/عيادة</span></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 d-flex gap-2 flex-wrap"
      >
        {(['all', 'school', 'hospital', 'clinic', 'center'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="btn d-flex align-items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: activeTab === tab ? 'var(--primary)' : 'var(--surface)',
              color: activeTab === tab ? 'white' : 'var(--text)',
              border: `2px solid ${activeTab === tab ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: '12px'
            }}
          >
            {tab === 'all' && <FaUsers />}
            {tab === 'school' && <FaSchool />}
            {tab === 'hospital' && <FaHospital />}
            {tab === 'clinic' && <FaStethoscope />}
            {tab === 'center' && <FaChalkboard />}
            <span>
              {tab === 'all' ? 'الكل' : 
               tab === 'school' ? 'المدارس' : 
               tab === 'hospital' ? 'المستشفيات' : 
               tab === 'clinic' ? 'العيادات' : 'المراكز'}
            </span>
          </button>
        ))}
        <div style={{ width: '1px', backgroundColor: 'var(--border)', margin: '0 8px' }} />
        {(['active', 'inactive', 'pending'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="btn d-flex align-items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: activeTab === tab ? (tab === 'active' ? '#22c55e' : tab === 'inactive' ? '#64748b' : '#f59e0b') : 'var(--surface)',
              color: activeTab === tab ? 'white' : 'var(--text)',
              border: `2px solid ${activeTab === tab ? (tab === 'active' ? '#22c55e' : tab === 'inactive' ? '#64748b' : '#f59e0b') : 'var(--border)'}`,
              borderRadius: '12px'
            }}
          >
            <span>{tab === 'active' ? 'النشطون' : tab === 'inactive' ? 'غير النشطون' : 'المعلقون'}</span>
            <span className="badge ms-1" style={{ 
              backgroundColor: activeTab === tab ? 'rgba(255,255,255,0.2)' : 'var(--surface-elevated)',
              color: activeTab === tab ? 'white' : 'var(--text-light)',
              fontSize: '0.75rem'
            }}>
              {institutions.filter(i => i.status === tab).length}
            </span>
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
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', paddingRight: '40px' }}
              />
            </div>
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
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المؤسسة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>النوع</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المدينة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>جهة الاتصال</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الخدمات</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الإيرادات</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '120px' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutions.map(institution => (
                <tr key={institution.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: institutionTypeColors[institution.institutionType].color, color: 'white' }}>
                        {institutionTypeIcons[institution.institutionType]}
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: 'var(--text)' }}>{institution.name}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{institution.contractStart ? `${institution.contractStart} - ${institution.contractEnd}` : 'بدون عقد'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span className="badge" style={{ backgroundColor: institutionTypeColors[institution.institutionType].bg, color: institutionTypeColors[institution.institutionType].color }}>
                      {institutionTypeLabels[institution.institutionType]}
                    </span>
                  </td>
                  <td style={{ padding: '16px', color: 'var(--text)' }}>{institution.city}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ color: 'var(--text)' }}>{institution.contactPerson}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{institution.phone}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex flex-wrap gap-1">
                      {institution.services.slice(0, 2).map((service, idx) => (
                        <span key={idx} className="badge" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text-light)', fontSize: '0.7rem' }}>
                          {service}
                        </span>
                      ))}
                      {institution.services.length > 2 && (
                        <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.7rem' }}>
                          +{institution.services.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px', color: '#22c55e', fontWeight: 'bold' }}>{institution.monthlyRevenue.toLocaleString()} ريال</td>
                  <td style={{ padding: '16px' }}>
                    <span className="badge" style={{ backgroundColor: statusConfig[institution.status].bg, color: statusConfig[institution.status].color }}>
                      {statusConfig[institution.status].label}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => { setSelectedInstitution(institution); setShowDetailsModal(true); }}
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px', padding: 0, backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '6px' }}
                      >
                        <FaSearch style={{ fontSize: '0.7rem', color: '#3b82f6' }} />
                      </button>
                      <button
                        onClick={() => handleDeleteInstitution(institution.id)}
                        className="btn btn-sm d-flex align-items-center justify-content-center"
                        style={{ width: '28px', height: '28px', padding: 0, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px' }}
                      >
                        <FaTrash style={{ fontSize: '0.7rem', color: '#ef4444' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {showAddModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowAddModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إضافة مؤسسة جديدة</h3>
              <button onClick={() => setShowAddModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>اسم المؤسسة</label>
              <input type="text" className="form-control p-3" value={newInstitution.name} onChange={e => setNewInstitution({ ...newInstitution, name: e.target.value })} placeholder="أدخل اسم المؤسسة" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>نوع المؤسسة</label>
              <div className="d-flex gap-2 flex-wrap">
                {(['school', 'hospital', 'clinic', 'center'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewInstitution({ ...newInstitution, institutionType: type })}
                    className="btn d-flex align-items-center gap-2 px-3 py-2"
                    style={{
                      backgroundColor: newInstitution.institutionType === type ? 'var(--primary)' : 'var(--surface-elevated)',
                      color: newInstitution.institutionType === type ? 'white' : 'var(--text)',
                      border: `2px solid ${newInstitution.institutionType === type ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: '12px'
                    }}
                  >
                    {institutionTypeIcons[type]}
                    <span>{institutionTypeLabels[type]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>جهة الاتصال</label>
                <input type="text" className="form-control p-3" value={newInstitution.contactPerson} onChange={e => setNewInstitution({ ...newInstitution, contactPerson: e.target.value })} placeholder="اسم المسؤل" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>رقم الهاتف</label>
                <input type="tel" className="form-control p-3" value={newInstitution.phone} onChange={e => setNewInstitution({ ...newInstitution, phone: e.target.value })} placeholder="+966xxxxxxxxx" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>البريد الإلكتروني</label>
              <input type="email" className="form-control p-3" value={newInstitution.email} onChange={e => setNewInstitution({ ...newInstitution, email: e.target.value })} placeholder="email@institution.com" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المدينة</label>
                <input type="text" className="form-control p-3" value={newInstitution.city} onChange={e => setNewInstitution({ ...newInstitution, city: e.target.value })} placeholder="المدينة" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>العنوان</label>
                <input type="text" className="form-control p-3" value={newInstitution.address} onChange={e => setNewInstitution({ ...newInstitution, address: e.target.value })} placeholder="العنوان التفصيلي" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>

            {(newInstitution.institutionType === 'school') && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>عدد الطلاب</label>
                  <input type="number" className="form-control p-3" value={newInstitution.studentsCount || ''} onChange={e => setNewInstitution({ ...newInstitution, studentsCount: parseInt(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الصفوف</label>
                  <input type="text" className="form-control p-3" value={newInstitution.grades} onChange={e => setNewInstitution({ ...newInstitution, grades: e.target.value })} placeholder="مثال: KG - Grade 6" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                </div>
              </div>
            )}

            {(newInstitution.institutionType === 'hospital' || newInstitution.institutionType === 'clinic') && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>عدد الأسرة</label>
                  <input type="number" className="form-control p-3" value={newInstitution.bedsCount || ''} onChange={e => setNewInstitution({ ...newInstitution, bedsCount: parseInt(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الأقسام</label>
                  <input type="text" className="form-control p-3" value={newInstitution.departments} onChange={e => setNewInstitution({ ...newInstitution, departments: e.target.value })} placeholder="الأقسام الطبية" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الخدمات المقدمة</label>
              <div className="d-flex gap-2 mb-2">
                <input type="text" className="form-control p-2" value={newService} onChange={e => setNewService(e.target.value)} placeholder="أضف خدمة" style={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
                <button type="button" onClick={handleAddService} className="btn" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '8px' }}>
                  <FaPlus />
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {newInstitution.services.map((service, idx) => (
                  <span key={idx} className="badge d-flex align-items-center gap-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', padding: '8px 12px', borderRadius: '8px' }}>
                    {service}
                    <button type="button" onClick={() => handleRemoveService(service)} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}>
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>بداية العقد</label>
                <input type="date" className="form-control p-3" value={newInstitution.contractStart} onChange={e => setNewInstitution({ ...newInstitution, contractStart: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>نهاية العقد</label>
                <input type="date" className="form-control p-3" value={newInstitution.contractEnd} onChange={e => setNewInstitution({ ...newInstitution, contractEnd: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الإيرادات الشهرية (ريال)</label>
              <input type="number" className="form-control p-3" value={newInstitution.monthlyRevenue || ''} onChange={e => setNewInstitution({ ...newInstitution, monthlyRevenue: parseInt(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>ملاحظات</label>
              <textarea className="form-control p-3" value={newInstitution.notes} onChange={e => setNewInstitution({ ...newInstitution, notes: e.target.value })} placeholder="ملاحظات إضافية" rows={2} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>

            <button onClick={handleAddInstitution} className="btn w-100 py-3" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaPlus className="me-2" /> إضافة المؤسسة
            </button>
          </div>
        </div>
      )}

      {showDetailsModal && selectedInstitution && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowDetailsModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '550px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>تفاصيل المؤسسة</h3>
              <button onClick={() => setShowDetailsModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            
            <div className="text-center mb-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', backgroundColor: institutionTypeColors[selectedInstitution.institutionType].color, color: 'white', fontSize: '2rem' }}>
                {institutionTypeIcons[selectedInstitution.institutionType]}
              </div>
              <h4 className="mt-2 fw-bold" style={{ color: 'var(--text)' }}>{selectedInstitution.name}</h4>
              <span className="badge" style={{ backgroundColor: institutionTypeColors[selectedInstitution.institutionType].bg, color: institutionTypeColors[selectedInstitution.institutionType].color }}>
                {institutionTypeLabels[selectedInstitution.institutionType]}
              </span>
            </div>

            <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}><FaUser className="me-2" />جهة الاتصال</span>
                <span style={{ color: 'var(--text)' }}>{selectedInstitution.contactPerson}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}><FaPhone className="me-2" />الهاتف</span>
                <span style={{ color: 'var(--text)' }}>{selectedInstitution.phone}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}><FaEnvelope className="me-2" />البريد</span>
                <span style={{ color: 'var(--text)' }}>{selectedInstitution.email}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}><FaMapMarkerAlt className="me-2" />المدينة</span>
                <span style={{ color: 'var(--text)' }}>{selectedInstitution.city}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}><FaCalendarAlt className="me-2" />العقد</span>
                <span style={{ color: 'var(--text)' }}>{selectedInstitution.contractStart || '-'} إلى {selectedInstitution.contractEnd || '-'}</span>
              </div>
              {(selectedInstitution.institutionType === 'school') && (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: 'var(--text-light)' }}><FaUsers className="me-2" />عدد الطلاب</span>
                    <span style={{ color: 'var(--text)' }}>{selectedInstitution.studentsCount || 0}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: 'var(--text-light)' }}><FaChalkboard className="me-2" />الصفوف</span>
                    <span style={{ color: 'var(--text)' }}>{selectedInstitution.grades || '-'}</span>
                  </div>
                </>
              )}
              {(selectedInstitution.institutionType === 'hospital' || selectedInstitution.institutionType === 'clinic') && (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: 'var(--text-light)' }}><FaBed className="me-2" />عدد الأسرة</span>
                    <span style={{ color: 'var(--text)' }}>{selectedInstitution.bedsCount || 0}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: 'var(--text-light)' }}><FaStethoscope className="me-2" />الأقسام</span>
                    <span style={{ color: 'var(--text)' }}>{selectedInstitution.departments || '-'}</span>
                  </div>
                </>
              )}
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}>الإيرادات الشهرية</span>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{selectedInstitution.monthlyRevenue.toLocaleString()} ريال</span>
              </div>
            </div>

            <div className="mb-4">
              <h6 style={{ color: 'var(--text)', fontWeight: 'bold' }}>الخدمات المقدمة</h6>
              <div className="d-flex flex-wrap gap-2">
                {selectedInstitution.services.map((service, idx) => (
                  <span key={idx} className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '8px 12px', borderRadius: '8px' }}>
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {selectedInstitution.notes && (
              <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                <span style={{ color: 'var(--text-light)' }}>ملاحظات: </span>
                <span style={{ color: 'var(--text)' }}>{selectedInstitution.notes}</span>
              </div>
            )}

            <div className="d-flex gap-2">
              {selectedInstitution.status === 'pending' && (
                <>
                  <button onClick={() => { handleUpdateStatus(selectedInstitution.id, 'active'); setShowDetailsModal(false); }} className="btn flex-fill py-2" style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '12px' }}>
                    <FaCheck className="me-2" /> تفعيل
                  </button>
                  <button onClick={() => { handleUpdateStatus(selectedInstitution.id, 'inactive'); setShowDetailsModal(false); }} className="btn flex-fill py-2" style={{ backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '12px' }}>
                    <FaTimesCircle className="me-2" /> رفض
                  </button>
                </>
              )}
              {selectedInstitution.status === 'active' && (
                <button onClick={() => { handleUpdateStatus(selectedInstitution.id, 'inactive'); setShowDetailsModal(false); }} className="btn w-100 py-2" style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '12px' }}>
                  إلغاء التفعيل
                </button>
              )}
              {selectedInstitution.status === 'inactive' && (
                <button onClick={() => { handleUpdateStatus(selectedInstitution.id, 'active'); setShowDetailsModal(false); }} className="btn w-100 py-2" style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '12px' }}>
                  إعادة التفعيل
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPartnersPage;