// src\instructor\pages\InstructorSalaryPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMoneyBillWave, FaGift, FaMinus, FaDownload, FaCalendar, 
  FaArrowUp, FaArrowDown, FaClock, FaCheckCircle, FaFileInvoiceDollar
} from 'react-icons/fa';

interface SalaryRecord {
  id: string;
  month: string;
  basicSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'delayed';
  paymentDate?: string;
}

interface BonusRecord {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
}

interface DiscountRecord {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
}

const salaryHistory: SalaryRecord[] = [
  { id: '1', month: 'مايو 2026', basicSalary: 8000, bonus: 1500, deductions: 500, netSalary: 9000, status: 'paid', paymentDate: '2026-05-28' },
  { id: '2', month: 'ابريل 2026', basicSalary: 8000, bonus: 2000, deductions: 300, netSalary: 9700, status: 'paid', paymentDate: '2026-04-28' },
  { id: '3', month: 'مارس 2026', basicSalary: 8000, bonus: 1000, deductions: 400, netSalary: 8600, status: 'paid', paymentDate: '2026-03-28' },
  { id: '4', month: 'فبراير 2026', basicSalary: 7500, bonus: 1200, deductions: 250, netSalary: 8450, status: 'paid', paymentDate: '2026-02-27' },
  { id: '5', month: 'يناير 2026', basicSalary: 7500, bonus: 1800, deductions: 500, netSalary: 8800, status: 'paid', paymentDate: '2026-01-28' },
  { id: '6', month: 'ديسمبر 2025', basicSalary: 7500, bonus: 2500, deductions: 300, netSalary: 9700, status: 'paid', paymentDate: '2025-12-28' },
];

const bonusRecords: BonusRecord[] = [
  { id: '1', type: 'اداء متميز', description: 'مكافأة على انجاز كورس AAC', amount: 1500, date: '2026-05-25' },
  { id: '2', type: 'تقييم عالي', description: 'مكافأة للحصول على تقييم 4.8', amount: 1000, date: '2026-04-20' },
  { id: '3', type: 'تحفيزي', description: 'تحفيز لانضمام طلاب جدد', amount: 500, date: '2026-03-15' },
  { id: '4', type: 'تميز', description: 'مكافأة سنوية', amount: 2000, date: '2026-01-05' },
];

const discountRecords: DiscountRecord[] = [
  { id: '1', type: 'تأمين', description: 'تأمين صحي', amount: 300, date: '2026-05-01' },
  { id: '2', type: 'ضريبة', description: 'ضريبة الدخل', amount: 450, date: '2026-04-01' },
  { id: '3', type: 'تأمين', description: 'تأمين اجتماعي', amount: 250, date: '2026-03-01' },
  { id: '4', type: 'تأخير', description: 'خصم تأخير', amount: 200, date: '2026-02-15' },
];

const InstructorSalaryPage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bonuses' | 'discounts' | 'history'>('overview');

  const currentBasicSalary = 8000;
  const currentTotalBonus = salaryHistory.reduce((a, r) => a + r.bonus, 0);
  const currentTotalDeductions = salaryHistory.reduce((a, r) => a + r.deductions, 0);
  const currentNetSalary = salaryHistory[0].netSalary;

  const totalBonuses = bonusRecords.reduce((a, r) => a + r.amount, 0);
  const totalDiscounts = discountRecords.reduce((a, r) => a + r.amount, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: 'var(--text)' }}>الرواتب والمكافآت</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            تابع راتبك والمكافآت والخصومات
          </p>
        </div>
        <button 
          className="btn d-flex align-items-center gap-2"
          style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderRadius: '10px', border: '1px solid var(--border)', padding: '10px 16px' }}
        >
          <FaDownload /> تصدير
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(88, 204, 2, 0.15)' }}>
                  <FaMoneyBillWave style={{ color: 'var(--primary)', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                  <FaArrowUp /> +12%
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{currentBasicSalary.toLocaleString()} جنيه</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>الراتب الاساسي</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                  <FaGift style={{ color: '#8b5cf6', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: '#8b5cf6', fontSize: '0.85rem' }}>
                  <FaArrowUp /> +8%
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{currentTotalBonus.toLocaleString()} جنيه</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>اجمالي المكافآت</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(239, 68, 68, 0.15)' }}>
                  <FaMinus style={{ color: '#ef4444', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: '#ef4444', fontSize: '0.85rem' }}>
                  <FaArrowDown /> -5%
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{currentTotalDeductions.toLocaleString()} جنيه</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>اجمالي الخصومات</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                  <FaFileInvoiceDollar style={{ color: '#10b981', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                  <FaArrowUp /> +10%
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{currentNetSalary.toLocaleString()} جنيه</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>صافي الراتب</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: <FaMoneyBillWave /> },
          { id: 'bonuses', label: 'المكافآت', icon: <FaGift /> },
          { id: 'discounts', label: 'الخصومات', icon: <FaMinus /> },
          { id: 'history', label: 'السجل', icon: <FaClock /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="btn px-4"
            style={{
              borderRadius: '10px',
              backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--surface-elevated)',
              color: activeTab === tab.id ? 'white' : 'var(--text)',
              border: '1px solid var(--border)'
            }}
          >
            <span className="ms-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                  <FaGift className="ms-2" style={{ color: '#8b5cf6' }} />
                  المكافآت الشهرية
                </h3>
                <div className="d-flex flex-column gap-3">
                  {[
                    { month: 'مايو', value: 1500 },
                    { month: 'ابريل', value: 2000 },
                    { month: 'مارس', value: 1000 },
                    { month: 'فبراير', value: 1200 },
                    { month: 'يناير', value: 1800 },
                    { month: 'ديسمبر', value: 2500 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: 'var(--text)' }}>{item.month}</span>
                        <span className="fw-bold" style={{ color: '#8b5cf6' }}>+{item.value.toLocaleString()} جنيه</span>
                      </div>
                      <div className="rounded-pill" style={{ height: '8px', backgroundColor: 'var(--border)' }}>
                        <div 
                          className="rounded-pill" 
                          style={{ 
                            width: `${(item.value / 2500) * 100}%`, 
                            height: '100%', 
                            backgroundColor: '#8b5cf6' 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                  <FaMinus className="ms-2" style={{ color: '#ef4444' }} />
                  الخصومات الشهرية
                </h3>
                <div className="d-flex flex-column gap-3">
                  {[
                    { month: 'مايو', value: 500, color: '#ef4444' },
                    { month: 'ابريل', value: 300, color: '#ef4444' },
                    { month: 'مارس', value: 400, color: '#ef4444' },
                    { month: 'فبراير', value: 250, color: '#ef4444' },
                    { month: 'يناير', value: 500, color: '#ef4444' },
                    { month: 'ديسمبر', value: 300, color: '#ef4444' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: 'var(--text)' }}>{item.month}</span>
                        <span className="fw-bold" style={{ color: item.color }}>-{item.value.toLocaleString()} جنيه</span>
                      </div>
                      <div className="rounded-pill" style={{ height: '8px', backgroundColor: 'var(--border)' }}>
                        <div 
                          className="rounded-pill" 
                          style={{ 
                            width: `${(item.value / 500) * 100}%`, 
                            height: '100%', 
                            backgroundColor: item.color 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>راتب هذا الشهر</div>
                    <div className="h2 fw-bold" style={{ color: 'var(--primary)' }}>
                      {currentNetSalary.toLocaleString()} جنيه
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-pill" style={{ backgroundColor: 'rgba(88, 204, 2, 0.15)', color: 'var(--primary)', fontSize: '0.85rem' }}>
                        <FaCheckCircle className="ms-1" />
                        مدفوع
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                      <FaCalendar className="ms-1" />
                      28 مايو 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bonuses' && (
        <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="card-body p-0">
            <div className="d-flex justify-content-between align-items-center p-4">
              <h3 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>سجل المكافآت</h3>
              <span className="fw-bold" style={{ color: '#8b5cf6' }}>الاجمالي: {totalBonuses.toLocaleString()} جنيه</span>
            </div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>نوع المكافأة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الوصف</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المبلغ</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {bonusRecords.map(bonus => (
                    <tr key={bonus.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontSize: '0.85rem' }}>
                          <FaGift className="ms-1" />
                          {bonus.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{bonus.description}</td>
                      <td style={{ padding: '16px', color: '#8b5cf6', fontWeight: 'bold' }}>+{bonus.amount.toLocaleString()} جنيه</td>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>{bonus.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'discounts' && (
        <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="card-body p-0">
            <div className="d-flex justify-content-between align-items-center p-4">
              <h3 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>سجل الخصومات</h3>
              <span className="fw-bold" style={{ color: '#ef4444' }}>الاجمالي: {totalDiscounts.toLocaleString()} جنيه</span>
            </div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>نوع خصم</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الوصف</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المبلغ</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {discountRecords.map(discount => (
                    <tr key={discount.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '0.85rem' }}>
                          <FaMinus className="ms-1" />
                          {discount.type}
                        </span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{discount.description}</td>
                      <td style={{ padding: '16px', color: '#ef4444', fontWeight: 'bold' }}>-{discount.amount.toLocaleString()} جنيه</td>
                      <td style={{ padding: '16px', color: 'var(--text-light)' }}>{discount.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الشهر</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الراتب الاساسي</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المكافآت</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الخصومات</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>صافي الراتب</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHistory.map(record => (
                    <tr key={record.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{record.month}</span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{record.basicSalary.toLocaleString()} جنيه</td>
                      <td style={{ padding: '16px', color: '#8b5cf6' }}>+{record.bonus.toLocaleString()} جنيه</td>
                      <td style={{ padding: '16px', color: '#ef4444' }}>-{record.deductions.toLocaleString()} جنيه</td>
                      <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 'bold' }}>{record.netSalary.toLocaleString()} جنيه</td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ 
                            backgroundColor: record.status === 'paid' ? 'rgba(88, 204, 2, 0.15)' : record.status === 'pending' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: record.status === 'paid' ? 'var(--primary)' : record.status === 'pending' ? '#fbbf24' : '#ef4444',
                            fontSize: '0.85rem'
                          }}
                        >
                          {record.status === 'paid' ? <FaCheckCircle className="ms-1" /> : null}
                          {record.status === 'paid' ? 'مدفوع' : record.status === 'pending' ? 'قيد الانتظار' : 'متأخر'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InstructorSalaryPage;