import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaMoneyBill, FaUser, FaCalendar, FaEdit, FaTrash, FaTimes, FaDownload, FaChartLine, FaCreditCard, FaHandHoldingUsd, FaGift, FaMinusCircle, FaPercentage } from 'react-icons/fa';

interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  baseSalary: number;
  hoursWorked: number;
  overtimeHours: number;
  deductions: number;
  bonuses: number;
  netSalary: number;
  status: 'active' | 'inactive' | 'on_leave';
}

interface SalaryRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  paid: boolean;
  paymentDate: string;
  paymentMethod: string;
}

interface Bonus {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  reason: string;
  date: string;
  type: 'monthly' | 'performance' | 'extra' | 'holiday';
}

interface Deduction {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  reason: string;
  date: string;
  type: 'late' | 'absence' | 'loan' | 'other';
}

const exampleEmployees: Employee[] = [
  { id: '1', name: 'أحمد محمد', role: 'معالج طبيعي', phone: '+966551234567', email: 'ahmed@example.com', baseSalary: 8000, hoursWorked: 160, overtimeHours: 12, deductions: 500, bonuses: 1000, netSalary: 9500, status: 'active' },
  { id: '2', name: 'سارة علي', role: 'أخصائية نطق', phone: '+966509876543', email: 'sara@example.com', baseSalary: 7500, hoursWorked: 150, overtimeHours: 8, deductions: 300, bonuses: 800, netSalary: 8700, status: 'active' },
  { id: '3', name: 'خالد عمر', role: 'معالج سلوكي', phone: '+966531112233', email: 'khalid@example.com', baseSalary: 9000, hoursWorked: 168, overtimeHours: 20, deductions: 200, bonuses: 1500, netSalary: 11500, status: 'active' },
  { id: '4', name: 'منى عبدالله', role: 'معلمة تربوية', phone: '+966544556677', email: 'mona@example.com', baseSalary: 6000, hoursWorked: 140, overtimeHours: 0, deductions: 400, bonuses: 500, netSalary: 6700, status: 'on_leave' },
  { id: '5', name: 'علي حسن', role: 'أخصائي نفسي', phone: '+966577889900', email: 'ali@example.com', baseSalary: 10000, hoursWorked: 160, overtimeHours: 15, deductions: 600, bonuses: 1200, netSalary: 12100, status: 'active' },
  { id: '6', name: 'فاطمة يوسف', role: 'معالجة حسي', phone: '+966500112233', email: 'fatima@example.com', baseSalary: 7000, hoursWorked: 155, overtimeHours: 5, deductions: 350, bonuses: 700, netSalary: 8050, status: 'active' },
];

const exampleSalaryRecords: SalaryRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'أحمد محمد', month: '2024-01', baseSalary: 8000, overtime: 600, bonuses: 1000, deductions: 500, netSalary: 9500, paid: true, paymentDate: '2024-01-28', paymentMethod: 'تحويل بنكي' },
  { id: '2', employeeId: '2', employeeName: 'سارة علي', month: '2024-01', baseSalary: 7500, overtime: 400, bonuses: 800, deductions: 300, netSalary: 8700, paid: true, paymentDate: '2024-01-28', paymentMethod: 'تحويل بنكي' },
  { id: '3', employeeId: '3', employeeName: 'خالد عمر', month: '2024-01', baseSalary: 9000, overtime: 1000, bonuses: 1500, deductions: 200, netSalary: 11500, paid: true, paymentDate: '2024-01-28', paymentMethod: 'نقدي' },
  { id: '4', employeeId: '4', employeeName: 'منى Abdullah', month: '2024-01', baseSalary: 6000, overtime: 0, bonuses: 500, deductions: 400, netSalary: 6700, paid: false, paymentDate: '', paymentMethod: '' },
  { id: '5', employeeId: '5', employeeName: 'علي حسن', month: '2024-01', baseSalary: 10000, overtime: 750, bonuses: 1200, deductions: 600, netSalary: 12100, paid: true, paymentDate: '2024-01-28', paymentMethod: 'تحويل بنكي' },
  { id: '6', employeeId: '6', employeeName: 'فاطمة يوسف', month: '2024-01', baseSalary: 7000, overtime: 250, bonuses: 700, deductions: 350, netSalary: 8050, paid: true, paymentDate: '2024-01-28', paymentMethod: 'تحويل بنكي' },
  { id: '7', employeeId: '1', employeeName: 'أحمد محمد', month: '2023-12', baseSalary: 8000, overtime: 500, bonuses: 800, deductions: 500, netSalary: 9300, paid: true, paymentDate: '2023-12-28', paymentMethod: 'تحويل بنكي' },
  { id: '8', employeeId: '3', employeeName: 'خالد عمر', month: '2023-12', baseSalary: 9000, overtime: 800, bonuses: 1200, deductions: 200, netSalary: 11000, paid: true, paymentDate: '2023-12-28', paymentMethod: 'نقدي' },
];

const exampleBonuses: Bonus[] = [
  { id: '1', employeeId: '1', employeeName: 'أحمد محمد', amount: 500, reason: 'أداء متميز', date: '2024-01-15', type: 'performance' },
  { id: '2', employeeId: '1', employeeName: 'أحمد محمد', amount: 500, reason: 'شهادة شكر', date: '2024-01-20', type: 'monthly' },
  { id: '3', employeeId: '3', employeeName: 'خالد عمر', amount: 1000, reason: 'إنجاز مشروع', date: '2024-01-10', type: 'extra' },
  { id: '4', employeeId: '5', employeeName: 'علي حسن', amount: 800, reason: 'حفل نهاية العام', date: '2023-12-25', type: 'holiday' },
  { id: '5', employeeId: '2', employeeName: 'سارة علي', amount: 400, reason: 'عمل إضافي', date: '2024-01-05', type: 'extra' },
];

const exampleDeductions: Deduction[] = [
  { id: '1', employeeId: '4', employeeName: 'منى Abdullah', amount: 200, reason: 'تأخر في الدوام', date: '2024-01-08', type: 'late' },
  { id: '2', employeeId: '4', employeeName: 'منى Abdullah', amount: 200, reason: 'غياب بدون عذر', date: '2024-01-12', type: 'absence' },
  { id: '3', employeeId: '1', employeeName: 'أحمد محمد', amount: 300, reason: 'سلفه شهرية', date: '2024-01-01', type: 'loan' },
  { id: '4', employeeId: '5', employeeName: 'علي حسن', amount: 100, reason: 'تأخر بسيط', date: '2024-01-15', type: 'late' },
  { id: '5', employeeId: '6', employeeName: 'فاطمة Yusuf', amount: 350, reason: 'خصم متنوعة', date: '2024-01-20', type: 'other' },
];

const roleColors: Record<string, { bg: string; color: string }> = {
  'معالج طبيعي': { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
  'أخصائية نطق': { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' },
  'معالج سلوكي': { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
  'معلمة تربوية': { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
  'أخصائي نفسي': { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
  'معالجة حسي': { bg: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' },
};

const statusConfig = {
  active: { label: 'نشط', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
  inactive: { label: 'غير نشط', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' },
  on_leave: { label: 'في إجازة', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
};

const bonusTypeLabels: Record<Bonus['type'], string> = {
  monthly: 'شهري',
  performance: 'أداء',
  extra: 'إضافي',
  holiday: 'مناسبة',
};

const bonusTypeColors: Record<Bonus['type'], { bg: string; color: string }> = {
  monthly: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
  performance: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
  extra: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
  holiday: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
};

const deductionTypeLabels: Record<Deduction['type'], string> = {
  late: 'تأخر',
  absence: 'غياب',
  loan: 'سلفه',
  other: 'أخرى',
};

const deductionTypeColors: Record<Deduction['type'], { bg: string; color: string }> = {
  late: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
  absence: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
  loan: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
  other: { bg: 'rgba(100, 116, 139, 0.15)', color: '#64748b' },
};

const AdminSalaryPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(exampleEmployees);
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>(exampleSalaryRecords);
  const [bonuses, setBonuses] = useState<Bonus[]>(exampleBonuses);
  const [deductions, setDeductions] = useState<Deduction[]>(exampleDeductions);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'employees' | 'records' | 'bonuses' | 'deductions'>('employees');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [showDeductionModal, setShowDeductionModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('2024-01');

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    baseSalary: 0
  });

  const [newBonus, setNewBonus] = useState({
    employeeId: '',
    amount: 0,
    reason: '',
    type: 'performance' as Bonus['type']
  });

  const [newDeduction, setNewDeduction] = useState({
    employeeId: '',
    amount: 0,
    reason: '',
    type: 'other' as Deduction['type']
  });

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.baseSalary) {
      alert('الرجاء إدخال البيانات المطلوبة');
      return;
    }

    const employee: Employee = {
      id: Date.now().toString(),
      ...newEmployee,
      hoursWorked: 0,
      overtimeHours: 0,
      deductions: 0,
      bonuses: 0,
      netSalary: newEmployee.baseSalary,
      status: 'active'
    };

    setEmployees([employee, ...employees]);
    setShowAddModal(false);
    setNewEmployee({ name: '', role: '', phone: '', email: '', baseSalary: 0 });
  };

  const handleAddBonus = () => {
    if (!newBonus.employeeId || !newBonus.amount || !newBonus.reason) {
      alert('الرجاء إدخال البيانات المطلوبة');
      return;
    }

    const employee = employees.find(e => e.id === newBonus.employeeId);
    const bonus: Bonus = {
      id: Date.now().toString(),
      employeeId: newBonus.employeeId,
      employeeName: employee?.name || '',
      amount: newBonus.amount,
      reason: newBonus.reason,
      date: new Date().toISOString().split('T')[0],
      type: newBonus.type
    };

    setBonuses([bonus, ...bonuses]);

    if (employee) {
      const updatedEmployees = employees.map(e =>
        e.id === newBonus.employeeId
          ? { ...e, bonuses: e.bonuses + newBonus.amount, netSalary: e.baseSalary + (e.overtimeHours * 50) + (e.bonuses + newBonus.amount) - e.deductions }
          : e
      );
      setEmployees(updatedEmployees);
    }

    setShowBonusModal(false);
    setNewBonus({ employeeId: '', amount: 0, reason: '', type: 'performance' });
  };

  const handleAddDeduction = () => {
    if (!newDeduction.employeeId || !newDeduction.amount || !newDeduction.reason) {
      alert('الرجاء إدخال البيانات المطلوبة');
      return;
    }

    const employee = employees.find(e => e.id === newDeduction.employeeId);
    const deduction: Deduction = {
      id: Date.now().toString(),
      employeeId: newDeduction.employeeId,
      employeeName: employee?.name || '',
      amount: newDeduction.amount,
      reason: newDeduction.reason,
      date: new Date().toISOString().split('T')[0],
      type: newDeduction.type
    };

    setDeductions([deduction, ...deductions]);

    if (employee) {
      const updatedEmployees = employees.map(e =>
        e.id === newDeduction.employeeId
          ? { ...e, deductions: e.deductions + newDeduction.amount, netSalary: e.baseSalary + (e.overtimeHours * 50) + e.bonuses - (e.deductions + newDeduction.amount) }
          : e
      );
      setEmployees(updatedEmployees);
    }

    setShowDeductionModal(false);
    setNewDeduction({ employeeId: '', amount: 0, reason: '', type: 'other' });
  };

  const handleDeleteBonus = (bonusId: string, employeeId: string, amount: number) => {
    setBonuses(bonuses.filter(b => b.id !== bonusId));
    const updatedEmployees = employees.map(e =>
      e.id === employeeId
        ? { ...e, bonuses: e.bonuses - amount, netSalary: e.baseSalary + (e.overtimeHours * 50) + (e.bonuses - amount) - e.deductions }
        : e
    );
    setEmployees(updatedEmployees);
  };

  const handleDeleteDeduction = (deductionId: string, employeeId: string, amount: number) => {
    setDeductions(deductions.filter(d => d.id !== deductionId));
    const updatedEmployees = employees.map(e =>
      e.id === employeeId
        ? { ...e, deductions: e.deductions - amount, netSalary: e.baseSalary + (e.overtimeHours * 50) + e.bonuses - (e.deductions - amount) }
        : e
    );
    setEmployees(updatedEmployees);
  };

  const handleUndoPayment = (recordId: string) => {
    setSalaryRecords(salaryRecords.map(r =>
      r.id === recordId
        ? { ...r, paid: false, paymentDate: '', paymentMethod: '' }
        : r
    ));
  };

  const handleMarkAsPaid = (recordId: string) => {
    setSalaryRecords(salaryRecords.map(r =>
      r.id === recordId
        ? { ...r, paid: true, paymentDate: new Date().toISOString().split('T')[0], paymentMethod: 'تحويل بنكي' }
        : r
    ));
  };

  const handlePayment = () => {
    if (!selectedEmployee) return;

    const record: SalaryRecord = {
      id: Date.now().toString(),
      employeeId: selectedEmployee.id,
      employeeName: selectedEmployee.name,
      month: selectedMonth,
      baseSalary: selectedEmployee.baseSalary,
      overtime: selectedEmployee.overtimeHours * 50,
      bonuses: selectedEmployee.bonuses,
      deductions: selectedEmployee.deductions,
      netSalary: selectedEmployee.netSalary,
      paid: true,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'تحويل بنكي'
    };

    setSalaryRecords([record, ...salaryRecords]);
    setShowPaymentModal(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(e =>
    e.name.includes(searchTerm) || e.role.includes(searchTerm)
  );

  const filteredRecords = salaryRecords.filter(r =>
    r.employeeName.includes(searchTerm) || r.month === selectedMonth
  );

  const totalSalaries = employees.reduce((sum, e) => sum + e.netSalary, 0);
  const totalPaid = salaryRecords.filter(r => r.paid && r.month === selectedMonth).reduce((sum, r) => sum + r.netSalary, 0);
  const totalPending = totalSalaries - totalPaid;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>إدارة الرواتب</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {employees.length} موظف | الإجمالي {totalSalaries.toLocaleString()} ريال
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px' }}
        >
          <FaPlus />
          <span>إضافة موظف</span>
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
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                <FaMoneyBill size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي الرواتب</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{totalSalaries.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>ريال</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                <FaHandHoldingUsd size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>المدفوع</div>
                <div className="fw-bold" style={{ color: '#22c55e', fontSize: '1.3rem' }}>{totalPaid.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>ريال</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                <FaCreditCard size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>المتبقي</div>
                <div className="fw-bold" style={{ color: '#f59e0b', fontSize: '1.3rem' }}>{totalPending.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>ريال</span></div>
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
        <button
          onClick={() => setActiveTab('employees')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'employees' ? 'var(--primary)' : 'var(--surface)',
            color: activeTab === 'employees' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'employees' ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaUser />
          <span>الموظفين</span>
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'records' ? 'var(--primary)' : 'var(--surface)',
            color: activeTab === 'records' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'records' ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaChartLine />
          <span>سجل الرواتب</span>
        </button>
        <button
          onClick={() => setActiveTab('bonuses')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'bonuses' ? '#22c55e' : 'var(--surface)',
            color: activeTab === 'bonuses' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'bonuses' ? '#22c55e' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaGift />
          <span>الحوافز</span>
        </button>
        <button
          onClick={() => setActiveTab('deductions')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'deductions' ? '#ef4444' : 'var(--surface)',
            color: activeTab === 'deductions' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'deductions' ? '#ef4444' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaMinusCircle />
          <span>الخصومات</span>
        </button>
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
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ borderRadius: '12px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
            >
              <option value="2024-01">يناير 2024</option>
              <option value="2023-12">ديسمبر 2023</option>
              <option value="2023-11">نوفمبر 2023</option>
              <option value="2023-10">أكتوبر 2023</option>
            </select>
          </div>
        </div>
      </motion.div>

      {activeTab === 'employees' && (
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
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الموظف</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدور</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الراتب الأساسي</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>العمل الإضافي</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحوافز</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الخصومات</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الصافي</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '120px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-bold" style={{ color: 'var(--text)' }}>{employee.name}</div>
                          <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{employee.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span className="badge" style={{ backgroundColor: roleColors[employee.role]?.bg || 'var(--surface-elevated)', color: roleColors[employee.role]?.color || 'var(--text)' }}>
                        {employee.role}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{employee.baseSalary.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>
                      <div>{employee.overtimeHours} ساعة</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>+{employee.overtimeHours * 50} ريال</div>
                    </td>
                    <td style={{ padding: '16px', color: '#22c55e' }}>+{employee.bonuses.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: '#ef4444' }}>-{employee.deductions.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>{employee.netSalary.toLocaleString()}</td>
                    <td style={{ padding: '16px' }}>
                      <span className="badge" style={{ backgroundColor: statusConfig[employee.status].bg, color: statusConfig[employee.status].color }}>
                        {statusConfig[employee.status].label}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm d-flex align-items-center gap-1"
                          style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', borderRadius: '8px' }}
                          onClick={() => { setSelectedEmployee(employee); setShowPaymentModal(true); }}
                        >
                          <span style={{ fontSize: '0.75rem' }}>دفع</span>
                        </button>
                        <button
                          className="btn btn-sm d-flex align-items-center justify-content-center"
                          style={{ width: '28px', height: '28px', padding: 0, backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: '6px' }}
                        >
                          <FaEdit style={{ fontSize: '0.7rem', color: 'var(--text-light)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'records' && (
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
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الموظف</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الشهر</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الأساسي</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>العمل الإضافي</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحوافز</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الخصومات</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الصافي</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '100px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px', color: 'var(--text)', fontWeight: 500 }}>{record.employeeName}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{record.month}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{record.baseSalary.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>+{record.overtime.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: '#22c55e' }}>+{record.bonuses.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: '#ef4444' }}>-{record.deductions.toLocaleString()}</td>
                    <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 'bold' }}>{record.netSalary.toLocaleString()}</td>
                    <td style={{ padding: '16px' }}>
                      <span className="badge" style={{ backgroundColor: record.paid ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: record.paid ? '#22c55e' : '#f59e0b' }}>
                        {record.paid ? 'مدفوع' : 'معلق'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-light)' }}>{record.paymentDate || '-'}</td>
                    <td style={{ padding: '16px' }}>
                      {record.paid ? (
                        <button
                          onClick={() => handleUndoPayment(record.id)}
                          className="btn btn-sm d-flex align-items-center gap-1"
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px' }}
                        >
                          <span style={{ fontSize: '0.75rem' }}>إلغاء</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsPaid(record.id)}
                          className="btn btn-sm d-flex align-items-center gap-1"
                          style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', borderRadius: '8px' }}
                        >
                          <span style={{ fontSize: '0.75rem' }}>دفع</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'bonuses' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="row g-3 flex-grow-1 me-3">
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
            <button
              onClick={() => setShowBonusModal(true)}
              className="btn d-flex align-items-center gap-2 px-4 py-2"
              style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '12px' }}
            >
              <FaPlus />
              <span>إضافة حافز</span>
            </button>
          </div>
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                    <FaGift size={20} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي الحوافز</div>
                    <div className="fw-bold" style={{ color: '#22c55e', fontSize: '1.3rem' }}>{bonuses.reduce((sum, b) => sum + b.amount, 0).toLocaleString()} <span style={{ fontSize: '0.9rem' }}>ريال</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                    <FaUser size={20} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>عدد الحوافز</div>
                    <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{bonuses.length} <span style={{ fontSize: '0.9rem' }}>حافز</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الموظف</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>النوع</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المبلغ</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>السبب</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '80px' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {bonuses.filter(b => b.employeeName.includes(searchTerm) || b.reason.includes(searchTerm)).map(bonus => (
                    <tr key={bonus.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>
                            {bonus.employeeName.charAt(0)}
                          </div>
                          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{bonus.employeeName}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span className="badge" style={{ backgroundColor: bonusTypeColors[bonus.type].bg, color: bonusTypeColors[bonus.type].color }}>
                          {bonusTypeLabels[bonus.type]}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: '#22c55e', fontWeight: 'bold', fontSize: '1.1rem' }}>+{bonus.amount.toLocaleString()} ريال</td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{bonus.reason}</td>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>{bonus.date}</td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={() => handleDeleteBonus(bonus.id, bonus.employeeId, bonus.amount)}
                          className="btn btn-sm d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px', padding: 0, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px' }}
                        >
                          <FaTrash style={{ fontSize: '0.8rem', color: '#ef4444' }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'deductions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="row g-3 flex-grow-1 me-3">
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
            <button
              onClick={() => setShowDeductionModal(true)}
              className="btn d-flex align-items-center gap-2 px-4 py-2"
              style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '12px' }}
            >
              <FaPlus />
              <span>إضافة خصم</span>
            </button>
          </div>
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                    <FaMinusCircle size={20} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي الخصومات</div>
                    <div className="fw-bold" style={{ color: '#ef4444', fontSize: '1.3rem' }}>{deductions.reduce((sum, d) => sum + d.amount, 0).toLocaleString()} <span style={{ fontSize: '0.9rem' }}>ريال</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(100, 116, 139, 0.15)', color: '#64748b' }}>
                    <FaUser size={20} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>عدد الخصومات</div>
                    <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{deductions.length} <span style={{ fontSize: '0.9rem' }}>خصم</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الموظف</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>النوع</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المبلغ</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>السبب</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '80px' }}>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.filter(d => d.employeeName.includes(searchTerm) || d.reason.includes(searchTerm)).map(deduction => (
                    <tr key={deduction.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', backgroundColor: '#ef4444', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>
                            {deduction.employeeName.charAt(0)}
                          </div>
                          <span style={{ color: 'var(--text)', fontWeight: 500 }}>{deduction.employeeName}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span className="badge" style={{ backgroundColor: deductionTypeColors[deduction.type].bg, color: deductionTypeColors[deduction.type].color }}>
                          {deductionTypeLabels[deduction.type]}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>-{deduction.amount.toLocaleString()} ريال</td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{deduction.reason}</td>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>{deduction.date}</td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={() => handleDeleteDeduction(deduction.id, deduction.employeeId, deduction.amount)}
                          className="btn btn-sm d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px', padding: 0, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px' }}
                        >
                          <FaTrash style={{ fontSize: '0.8rem', color: '#ef4444' }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {showAddModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowAddModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إضافة موظف جديد</h3>
              <button onClick={() => setShowAddModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الاسم</label>
              <input type="text" className="form-control p-3" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} placeholder="أدخل اسم الموظف" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الدور</label>
              <select className="form-select p-3" value={newEmployee.role} onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                <option value="">اختر الدور</option>
                <option value="معالج طبيعي">معالج طبيعي</option>
                <option value="أخصائية نطق">أخصائية نطق</option>
                <option value="معالج سلوكي">معالج سلوكي</option>
                <option value="معلمة تربوية">معلمة تربوية</option>
                <option value="أخصائي نفسي">أخصائي نفسي</option>
                <option value="معالجة حسي">معالجة حسي</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>رقم الهاتف</label>
              <input type="tel" className="form-control p-3" value={newEmployee.phone} onChange={e => setNewEmployee({ ...newEmployee, phone: e.target.value })} placeholder="+966xxxxxxxxx" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>البريد الإلكتروني</label>
              <input type="email" className="form-control p-3" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} placeholder="email@example.com" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الراتب الأساسي (ريال)</label>
              <input type="number" className="form-control p-3" value={newEmployee.baseSalary || ''} onChange={e => setNewEmployee({ ...newEmployee, baseSalary: parseInt(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <button onClick={handleAddEmployee} className="btn w-100 py-3" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaPlus className="me-2" /> إضافة الموظف
            </button>
          </div>
        </div>
      )}

      {showPaymentModal && selectedEmployee && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowPaymentModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>دفع الراتب</h3>
              <button onClick={() => setShowPaymentModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}>الموظف</span>
                <span className="fw-bold" style={{ color: 'var(--text)' }}>{selectedEmployee.name}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}>الدور</span>
                <span style={{ color: 'var(--text)' }}>{selectedEmployee.role}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}>الراتب الأساسي</span>
                <span style={{ color: 'var(--text)' }}>{selectedEmployee.baseSalary.toLocaleString()} ريال</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}>العمل الإضافي</span>
                <span style={{ color: 'var(--text)' }}>+{selectedEmployee.overtimeHours * 50} ريال</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}>الحوافز</span>
                <span style={{ color: '#22c55e' }}>+{selectedEmployee.bonuses.toLocaleString()} ريال</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-light)' }}>الخصومات</span>
                <span style={{ color: '#ef4444' }}>-{selectedEmployee.deductions.toLocaleString()} ريال</span>
              </div>
              <hr style={{ borderColor: 'var(--border)' }} />
              <div className="d-flex justify-content-between">
                <span className="fw-bold" style={{ color: 'var(--text)' }}>المجموع</span>
                <span className="fw-bold" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{selectedEmployee.netSalary.toLocaleString()} ريال</span>
              </div>
            </div>
            <button onClick={handlePayment} className="btn w-100 py-3" style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaMoneyBill className="me-2" /> تأكيد الدفع
            </button>
          </div>
        </div>
      )}

      {showBonusModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowBonusModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إضافة حافز جديد</h3>
              <button onClick={() => setShowBonusModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الموظف</label>
              <select className="form-select p-3" value={newBonus.employeeId} onChange={e => setNewBonus({ ...newBonus, employeeId: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                <option value="">اختر الموظف</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>نوع الحافز</label>
              <select className="form-select p-3" value={newBonus.type} onChange={e => setNewBonus({ ...newBonus, type: e.target.value as Bonus['type'] })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                <option value="monthly">شهري</option>
                <option value="performance">أداء</option>
                <option value="extra">إضافي</option>
                <option value="holiday">مناسبة</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المبلغ (ريال)</label>
              <input type="number" className="form-control p-3" value={newBonus.amount || ''} onChange={e => setNewBonus({ ...newBonus, amount: parseInt(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>السبب</label>
              <input type="text" className="form-control p-3" value={newBonus.reason} onChange={e => setNewBonus({ ...newBonus, reason: e.target.value })} placeholder="أدخل سبب الحافز" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <button onClick={handleAddBonus} className="btn w-100 py-3" style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaGift className="me-2" /> إضافة الحافز
            </button>
          </div>
        </div>
      )}

      {showDeductionModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowDeductionModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إضافة خصم جديد</h3>
              <button onClick={() => setShowDeductionModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الموظف</label>
              <select className="form-select p-3" value={newDeduction.employeeId} onChange={e => setNewDeduction({ ...newDeduction, employeeId: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                <option value="">اختر الموظف</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>نوع الخصم</label>
              <select className="form-select p-3" value={newDeduction.type} onChange={e => setNewDeduction({ ...newDeduction, type: e.target.value as Deduction['type'] })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                <option value="late">تأخر</option>
                <option value="absence">غياب</option>
                <option value="loan">سلفه</option>
                <option value="other">أخرى</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المبلغ (ريال)</label>
              <input type="number" className="form-control p-3" value={newDeduction.amount || ''} onChange={e => setNewDeduction({ ...newDeduction, amount: parseInt(e.target.value) })} placeholder="0" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>السبب</label>
              <input type="text" className="form-control p-3" value={newDeduction.reason} onChange={e => setNewDeduction({ ...newDeduction, reason: e.target.value })} placeholder="أدخل سبب الخصم" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <button onClick={handleAddDeduction} className="btn w-100 py-3" style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaMinusCircle className="me-2" /> إضافة الخصم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSalaryPage;