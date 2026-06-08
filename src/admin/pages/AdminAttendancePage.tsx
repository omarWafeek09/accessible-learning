// src\admin\pages\AdminAttendancePage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaUserClock,
  FaBan, FaCheckCircle, FaTimes, FaDownload, FaCalendarAlt,
  FaChevronLeft, FaChevronRight, FaClock, FaUserMinus, FaUserCheck, FaMapMarkerAlt
} from 'react-icons/fa';

interface Employee {
  id: string;
  name: string;
  role: string;
  branch: string;
  phone: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: string;
  date: string;
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'أحمد محمد', role: 'معلم', branch: 'الرياض', phone: '+966501234567', status: 'present', checkInTime: '07:30', date: '2026-05-01' },
  { id: '2', name: 'سارة علي', role: 'مشرف', branch: 'الرياض', phone: '+966501234568', status: 'present', checkInTime: '07:45', date: '2026-05-01' },
  { id: '3', name: 'خالد عمر', role: 'معلم', branch: 'جدة', phone: '+966501234569', status: 'absent', date: '2026-05-01' },
  { id: '4', name: 'محمد احمد', role: 'مستخدم', branch: 'الدمام', phone: '+966501234570', status: 'late', checkInTime: '08:15', date: '2026-05-01' },
  { id: '5', name: 'فاطمة يوسف', role: 'معلم', branch: 'مكة', phone: '+966501234571', status: 'present', checkInTime: '07:00', date: '2026-05-01' },
  { id: '6', name: 'علي حسن', role: 'مشرف', branch: 'الخبر', phone: '+966501234572', status: 'absent', date: '2026-05-01' },
  { id: '7', name: 'منى عبدالله', role: 'معلم', branch: 'أبها', phone: '+966501234573', status: 'excused', date: '2026-05-01' },
  { id: '8', name: 'ياسر سعيد', role: 'مستخدم', branch: 'تبوك', phone: '+966501234574', status: 'present', checkInTime: '07:30', date: '2026-05-01' },
  { id: '9', name: 'رانية إبراهيم', role: 'معلم', branch: 'الرياض', phone: '+966501234575', status: 'present', checkInTime: '07:15', date: '2026-05-01' },
  { id: '10', name: 'سلطان فيصل', role: 'مشرف', branch: 'جدة', phone: '+966501234576', status: 'late', checkInTime: '08:30', date: '2026-05-01' },
];

const AdminAttendancePage = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('2026-05-01');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState<Employee | null>(null);
  const itemsPerPage = 10;

  const uniqueDates = [...new Set(employees.map(e => e.date))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const presentCount = employees.filter(e => e.status === 'present').length;
  const absentCount = employees.filter(e => e.status === 'absent').length;
  const lateCount = employees.filter(e => e.status === 'late').length;
  const excusedCount = employees.filter(e => e.status === 'excused').length;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'present':
        return { backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)' };
      case 'absent':
        return { backgroundColor: 'rgba(220, 38, 38, 0.15)', color: '#dc2626' };
      case 'late':
        return { backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' };
      case 'excused':
        return { backgroundColor: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' };
      default:
        return {};
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'absent': return 'غائب';
      case 'late': return 'متأخر';
      case 'excused': return 'معتذر';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <FaUserCheck />;
      case 'absent': return <FaUserMinus />;
      case 'late': return <FaClock />;
      case 'excused': return <FaUserClock />;
      default: return <FaUserClock />;
    }
  };

  const handleChangeStatus = (newStatus: 'present' | 'absent' | 'late' | 'excused') => {
    if (employeeToUpdate) {
      setEmployees(employees.map(e => 
        e.id === employeeToUpdate.id 
          ? { ...e, status: newStatus, checkInTime: newStatus === 'present' ? new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : undefined }
          : e
      ));
      setShowStatusModal(false);
      setEmployeeToUpdate(null);
    }
  };

  const exportToCSV = () => {
    const headers = ['الاسم', 'الدور', 'الفرع', 'الهاتف', 'الحالة', 'وقت الحضور', 'التاريخ'];
    const rows = filteredEmployees.map(e => [e.name, e.role, e.branch, e.phone, getStatusText(e.status), e.checkInTime || '-', e.date]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance.csv';
    link.click();
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>الحضور والانصراف</h1>
          <p style={{ color: 'var(--text-light)' }}>
            {filteredEmployees.length} موظف | {presentCount} حاضر | {absentCount} غائب | {lateCount} متأخر
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
            <FaCalendarAlt style={{ color: 'var(--text-light)' }} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ 
                backgroundColor: 'transparent', 
                border: 'none', 
                color: 'var(--text)',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(88, 204, 2, 0.15)' }}>
                <FaUserCheck style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
              </div>
              <div>
                <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{presentCount}</div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>حاضر</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(220, 38, 38, 0.15)' }}>
                <FaUserMinus style={{ color: '#dc2626', fontSize: '1.2rem' }} />
              </div>
              <div>
                <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{absentCount}</div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>غائب</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(251, 191, 36, 0.15)' }}>
                <FaClock style={{ color: '#fbbf24', fontSize: '1.2rem' }} />
              </div>
              <div>
                <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{lateCount}</div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>متأخر</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(107, 114, 128, 0.15)' }}>
                <FaUserClock style={{ color: '#6b7280', fontSize: '1.2rem' }} />
              </div>
              <div>
                <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{excusedCount}</div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>معتذر</div>
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
                  placeholder="البحث بالاسم أو الدور..."
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
            <div className="col-md-5">
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
                <option value="all">جميع الحالات</option>
                <option value="present">حاضر</option>
                <option value="absent">غائب</option>
                <option value="late">متأخر</option>
                <option value="excused">معتذر</option>
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
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الموظف</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدور</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الهاتف</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>وقت الحضور</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map(emp => (
                  <tr key={emp.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--secondary)',
                            flexShrink: 0
                          }}
                        >
                          {emp.name.charAt(0)}
                        </div>
                        <div className="fw-bold" style={{ color: 'var(--text)' }}>{emp.name}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {emp.role}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {emp.branch}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {emp.phone}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      {emp.checkInTime || '-'}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span 
                        className="px-3 py-1 rounded-pill d-flex align-items-center gap-2"
                        style={{ 
                          ...getStatusStyle(emp.status),
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          width: 'fit-content'
                        }}
                      >
                        {getStatusIcon(emp.status)}
                        {getStatusText(emp.status)}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button 
                        onClick={() => {
                          setEmployeeToUpdate(emp);
                          setShowStatusModal(true);
                        }}
                        className="btn p-2" 
                        style={{ color: 'var(--primary)' }}
                        aria-label="تغيير الحالة"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedEmployees.length === 0 && (
            <div className="text-center py-5">
              <p style={{ color: 'var(--text-light)' }}>لا توجد نتائج</p>
            </div>
          )}

          {paginatedEmployees.length > 0 && (
            <div className="d-flex align-items-center justify-content-between p-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                عرض {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} من {filteredEmployees.length}
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
        {showStatusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowStatusModal(false)}
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>تغيير الحالة</h2>
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="btn p-2"
                  style={{ color: 'var(--text-light)' }}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: '60px', height: '60px', backgroundColor: 'var(--surface-elevated)' }}
                >
                  {employeeToUpdate && getStatusIcon(employeeToUpdate.status)}
                </div>
                <h3 className="h6 fw-bold mb-1" style={{ color: 'var(--text)' }}>{employeeToUpdate?.name}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                  {employeeToUpdate?.branch} | {employeeToUpdate?.role}
                </p>
              </div>
              <div className="d-flex flex-column gap-2">
                <button 
                  onClick={() => handleChangeStatus('present')}
                  className="btn d-flex align-items-center gap-3 p-3"
                  style={{
                    backgroundColor: 'rgba(88, 204, 2, 0.15)',
                    color: 'var(--primary)',
                    borderRadius: '12px',
                    border: 'none'
                  }}
                >
                  <FaUserCheck />
                  <span className="flex-grow-1 text-start">حاضر</span>
                </button>
                <button 
                  onClick={() => handleChangeStatus('absent')}
                  className="btn d-flex align-items-center gap-3 p-3"
                  style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.15)',
                    color: '#dc2626',
                    borderRadius: '12px',
                    border: 'none'
                  }}
                >
                  <FaUserMinus />
                  <span className="flex-grow-1 text-start">غائب</span>
                </button>
                <button 
                  onClick={() => handleChangeStatus('late')}
                  className="btn d-flex align-items-center gap-3 p-3"
                  style={{
                    backgroundColor: 'rgba(251, 191, 36, 0.15)',
                    color: '#fbbf24',
                    borderRadius: '12px',
                    border: 'none'
                  }}
                >
                  <FaClock />
                  <span className="flex-grow-1 text-start">متأخر</span>
                </button>
                <button 
                  onClick={() => handleChangeStatus('excused')}
                  className="btn d-flex align-items-center gap-3 p-3"
                  style={{
                    backgroundColor: 'rgba(107, 114, 128, 0.15)',
                    color: '#6b7280',
                    borderRadius: '12px',
                    border: 'none'
                  }}
                >
                  <FaUserClock />
                  <span className="flex-grow-1 text-start">معتذر</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminAttendancePage;