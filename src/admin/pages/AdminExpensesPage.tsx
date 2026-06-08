// src\admin\pages\AdminExpensesPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaMoneyBill, 
  FaFileInvoice, FaCreditCard, FaTruck, FaTools, FaLightbulb,
  FaBuilding, FaClipboardList, FaChartPie, FaCalendar, FaCheck, FaClock, FaShieldAlt
} from 'react-icons/fa';

interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  status: 'paid' | 'pending' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'transfer';
  vendor: string;
}

const mockExpenses: Expense[] = [
  { id: '1', title: 'فاتورة الكهرباء', description: 'رسومElectricity bill for February', amount: 2500, category: 'مرافق', date: '2024-02-15', status: 'paid', paymentMethod: 'transfer', vendor: 'شركة الكهرباء' },
  { id: '2', title: 'صيانة الأجهزة', description: 'صيانة أجهزة الكمبيوتر', amount: 1200, category: 'صيانة', date: '2024-02-10', status: 'paid', paymentMethod: 'card', vendor: 'مركز الصيانة' },
  { id: '3', title: 'مستلزمات مكتبية', description: 'ورق، أقلام، ملفات', amount: 350, category: 'مستلزمات', date: '2024-02-08', status: 'pending', paymentMethod: 'cash', vendor: 'متجر المكتبات' },
  { id: '4', title: 'إنترنت', description: 'اشتراك الإنترنت الشهري', amount: 300, category: 'مرافق', date: '2024-02-01', status: 'paid', paymentMethod: 'transfer', vendor: 'شركة الاتصالات' },
  { id: '5', title: 'رواتب员工工资', description: 'رواتب شهر فبراير', amount: 25000, category: 'رواتب', date: '2024-02-01', status: 'paid', paymentMethod: 'transfer', vendor: 'Employees' },
  { id: '6', title: 'تأمين', description: 'التأمين الصحي', amount: 1800, category: 'تأمين', date: '2024-01-28', status: 'paid', paymentMethod: 'transfer', vendor: 'شركة التأمين' },
  { id: '7', title: 'النظافة', description: 'خدمات التنظيف', amount: 800, category: 'خدمات', date: '2024-01-25', status: 'paid', paymentMethod: 'cash', vendor: 'شركة النظافة' },
  { id: '8', title: 'إيجار办公室租金', description: 'إيجار شهر فبراير', amount: 5000, category: 'إيجار', date: '2024-02-01', status: 'pending', paymentMethod: 'transfer', vendor: 'المالك' },
];

const categories = [
  { id: 'مرافق', name: 'مرافق', icon: <FaLightbulb />, color: '#f59e0b' },
  { id: 'صيانة', name: 'صيانة', icon: <FaTools />, color: '#ef4444' },
  { id: 'مستلزمات', name: 'مستلزمات', icon: <FaClipboardList />, color: '#8b5cf6' },
  { id: 'رواتب', name: 'رواتب', icon: <FaMoneyBill />, color: '#10b981' },
  { id: 'تأمين', name: 'تأمين', icon: <FaShieldAlt />, color: '#06b6d4' },
  { id: 'خدمات', name: 'خدمات', icon: <FaTools />, color: '#ec4899' },
  { id: 'إيجار', name: 'إيجار', icon: <FaBuilding />, color: '#3b82f6' },
  { id: 'أخرى', name: 'أخرى', icon: <FaFileInvoice />, color: '#6b7280' },
];

const AdminExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [newExpense, setNewExpense] = useState({
    title: '', description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0], status: 'pending', paymentMethod: 'cash', vendor: ''
  });

  const filteredExpenses = expenses.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || e.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const paidExpenses = expenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

  const updateExpense = (expenseId: string, field: string, value: any) => {
    const updated = expenses.map(e => {
      if (e.id === expenseId) {
        return { ...e, [field]: value };
      }
      return e;
    });
    setExpenses(updated);
    const expense = expenses.find(e => e.id === expenseId);
    if (expense) {
      setSelectedExpense({ ...expense, [field]: value });
    }
  };

  const getCategoryStyle = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? { backgroundColor: cat.color + '20', color: cat.color } : {};
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid': return { backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'pending': return { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'cancelled': return { backgroundColor: 'rgba(107, 114, 128, 0.15)', color: '#6b7280' };
      default: return {};
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'مدفوع';
      case 'pending': return 'معلق';
      case 'cancelled': return 'ملغى';
      default: return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash': return 'نقدي';
      case 'card': return 'بطاقة';
      case 'transfer': return 'تحويل';
      default: return method;
    }
  };

  const handleAddExpense = () => {
    const expense: Expense = {
      id: Date.now().toString(),
      title: newExpense.title,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      status: newExpense.status as any,
      paymentMethod: newExpense.paymentMethod as any,
      vendor: newExpense.vendor
    };
    setExpenses([expense, ...expenses]);
    setShowModal(false);
    setNewExpense({ title: '', description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0], status: 'pending', paymentMethod: 'cash', vendor: '' });
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه المصروفات؟')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const stats = [
    { label: 'إجمالي المصروفات', value: totalExpenses.toLocaleString(), icon: <FaMoneyBill />, color: '#8b5cf6' },
    { label: 'المدفوعة', value: paidExpenses.toLocaleString(), icon: <FaCheck />, color: '#10b981' },
    { label: 'المعلقة', value: pendingExpenses.toLocaleString(), icon: <FaClock />, color: '#f59e0b' },
    { label: 'عدد المعاملات', value: expenses.length, icon: <FaFileInvoice />, color: '#06b6d4' },
  ];

  const categoryStats = categories.map(cat => {
    const catExpenses = expenses.filter(e => e.category === cat.name);
    const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
    return { ...cat, count: catExpenses.length, total };
  }).filter(c => c.count > 0);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>المصروفات</h1>
          <p style={{ color: 'var(--text-light)' }}>إدارة مصروفات الشركة</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px' }}>
          <FaPlus /> إضافة مصروف
        </button>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: stat.color + '20' }}>
                  <span style={{ color: stat.color, fontSize: '1.25rem' }}>{stat.icon}</span>
                </div>
                <div>
                  <div className="fs-4 fw-bold" style={{ color: 'var(--text)' }}>{stat.value}</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{stat.label}</div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        {categoryStats.map((cat, index) => (
          <div key={cat.id} className="col-md-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card border-0" style={{ borderRadius: '12px', backgroundColor: cat.color + '10' }}>
              <div className="card-body d-flex align-items-center justify-content-between p-3">
                <div className="d-flex align-items-center gap-2">
                  <span style={{ color: cat.color }}>{cat.icon}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{cat.name}</span>
                </div>
                <div className="text-end">
                  <div style={{ color: 'var(--text)', fontWeight: 600 }}>{cat.total.toLocaleString()}</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{cat.count} معاملة</div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="position-relative flex-grow-1" style={{ maxWidth: '300px' }}>
          <FaSearch className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input type="text" placeholder="البحث..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="form-control" style={{ paddingRight: '40px', borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="form-select" style={{ width: 'auto', borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
          <option value="all">جميع الفئات</option>
          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
      </div>

      <div className="d-flex flex-column gap-3">
        {filteredExpenses.map((expense, index) => {
          const isExpanded = selectedExpense?.id === expense.id;
          return (
            <motion.div key={expense.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-0">
                <div className="d-flex align-items-center justify-content-between p-3" style={{ cursor: 'pointer' }} onClick={() => setSelectedExpense(isExpanded ? null : expense)}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: getCategoryStyle(expense.category).backgroundColor || 'var(--surface-elevated)' }}>
                      <FaFileInvoice style={{ color: getCategoryStyle(expense.category).color || 'var(--primary)', fontSize: '1.25rem' }} />
                    </div>
                    <div>
                      <h3 className="h6 fw-bold mb-0" style={{ color: 'var(--text)' }}>{expense.title}</h3>
                      <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{expense.vendor}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="px-2 py-1 rounded-pill" style={{ ...getCategoryStyle(expense.category), fontSize: '0.7rem' }}>{expense.category}</span>
                    <span className="px-2 py-1 rounded-pill" style={{ ...getStatusStyle(expense.status), fontSize: '0.7rem' }}>{getStatusText(expense.status)}</span>
                    <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', fontSize: '0.7rem' }}>{getPaymentMethodText(expense.paymentMethod)}</span>
                    <div className="text-end" style={{ minWidth: '100px' }}>
                      <div className="fw-bold" style={{ color: 'var(--primary)' }}>{expense.amount.toLocaleString()}</div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{expense.date}</div>
                    </div>
                    <span style={{ color: 'var(--text-light)', fontSize: '1.25rem' }}>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>
                {isExpanded && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-top" style={{ borderColor: 'var(--border)' }}>
                    <div className="p-4" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                      <div className="row g-3">
                        <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>اسم المصروف</div><input type="text" value={expense.title} onChange={(e) => updateExpense(expense.id, 'title', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} /></div>
                        <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المورد/الجهة</div><input type="text" value={expense.vendor} onChange={(e) => updateExpense(expense.id, 'vendor', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} /></div>
                        <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>المبلغ</div><input type="number" value={expense.amount} onChange={(e) => updateExpense(expense.id, 'amount', parseFloat(e.target.value) || 0)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} /></div>
                        <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>التاريخ</div><input type="date" value={expense.date} onChange={(e) => updateExpense(expense.id, 'date', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} /></div>
                        <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>الفئة</div><select value={expense.category} onChange={(e) => updateExpense(expense.id, 'category', e.target.value)} className="form-select" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }}>{categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div>
                        <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>طريقة الدفع</div><select value={expense.paymentMethod} onChange={(e) => updateExpense(expense.id, 'paymentMethod', e.target.value)} className="form-select" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }}><option value="cash">نقدي</option><option value="card">بطاقة</option><option value="transfer">تحويل</option></select></div>
                        <div className="col-md-6"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>الحالة</div><select value={expense.status} onChange={(e) => updateExpense(expense.id, 'status', e.target.value)} className="form-select" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }}><option value="pending">معلق</option><option value="paid">مدفوع</option><option value="cancelled">ملغى</option></select></div>
                        <div className="col-12"><div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>الوصف</div><textarea value={expense.description} onChange={(e) => updateExpense(expense.id, 'description', e.target.value)} className="form-control" style={{ borderRadius: '6px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '0.85rem' }} rows={2} /></div>
                      </div>
                      <div className="d-flex justify-content-end mt-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                        <button className="btn btn-sm" style={{ backgroundColor: 'var(--danger)', color: 'white', borderRadius: '6px' }} onClick={() => { if (confirm('حذف هذه المصروفات؟')) { setExpenses(expenses.filter(e => e.id !== expense.id)); setSelectedExpense(null); } }}><FaTrash className="me-1" /> حذف</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
        {filteredExpenses.length === 0 && (
          <div className="text-center py-5" style={{ color: 'var(--text-light)' }}>
            <FaFileInvoice style={{ fontSize: '3rem', marginBottom: '12px', opacity: 0.5 }} />
            <p>لا توجد مصروفات</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="card border-0" style={{ width: '500px', maxWidth: '90%', borderRadius: '20px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="h5 fw-bold" style={{ color: 'var(--text)' }}>إضافة مصروف جديد</h3>
                  <button onClick={() => setShowModal(false)} className="btn p-2" style={{ borderRadius: '8px' }}><FaTimes /></button>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div><label className="mb-2" style={{ color: 'var(--text)' }}>اسم المصروف</label><input type="text" value={newExpense.title} onChange={e => setNewExpense({ ...newExpense, title: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                  <div><label className="mb-2" style={{ color: 'var(--text)' }}>الوصف</label><textarea value={newExpense.description} onChange={e => setNewExpense({ ...newExpense, description: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} rows={2} /></div>
                  <div className="row g-2">
                    <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>المبلغ</label><input type="number" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                    <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>التاريخ</label><input type="date" value={newExpense.date} onChange={e => setNewExpense({ ...newExpense, date: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>الفئة</label><select value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }}><option value="">اختر الفئة</option>{categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div>
                    <div className="col-6"><label className="mb-2" style={{ color: 'var(--text)' }}>طريقة الدفع</label><select value={newExpense.paymentMethod} onChange={e => setNewExpense({ ...newExpense, paymentMethod: e.target.value })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }}><option value="cash">نقدي</option><option value="card">بطاقة</option><option value="transfer">تحويل</option></select></div>
                  </div>
                  <div><label className="mb-2" style={{ color: 'var(--text)' }}>المورد/الجهة</label><input type="text" value={newExpense.vendor} onChange={e => setNewExpense({ ...newExpense, vendor: e.target.value })} className="form-control" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }} /></div>
                  <div><label className="mb-2" style={{ color: 'var(--text)' }}>الحالة</label><select value={newExpense.status} onChange={e => setNewExpense({ ...newExpense, status: e.target.value })} className="form-select" style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }}><option value="pending">معلق</option><option value="paid">مدفوع</option><option value="cancelled">ملغى</option></select></div>
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button onClick={() => setShowModal(false)} className="btn flex-grow-1" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}>إلغاء</button>
                  <button onClick={handleAddExpense} className="btn flex-grow-1" style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '12px' }}>إضافة</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminExpensesPage;