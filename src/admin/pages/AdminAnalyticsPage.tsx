// src\admin\pages\AdminAnalyticsPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, FaUsers, FaBook, FaGamepad, FaArrowUp, FaArrowDown, 
  FaEye, FaClock, FaCheckCircle, FaMoneyBillWave, FaWallet, FaChartPie, 
  FaPercentage, FaExchangeAlt, FaProjectDiagram, FaCreditCard, 
  FaGift, FaChartBar, FaCaretUp, FaCaretDown, FaDollarSign,
  FaUserPlus, FaUserFriends, FaMoneyCheckAlt, FaArrowRight,
  FaExternalLinkAlt, FaCalendarAlt,  FaBox
} from 'react-icons/fa';

interface RevenueData {
  month: string;
  revenue: number;
  profit: number;
  expenses: number;
  subscriptions: number;
  oneTime: number;
  newCustomers: number;
  returningCustomers: number;
}

interface FunnelStep {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const revenueData: RevenueData[] = [
  { month: 'يناير', revenue: 12500, profit: 8500, expenses: 4000, subscriptions: 180, oneTime: 420, newCustomers: 320, returningCustomers: 280 },
  { month: 'فبراير', revenue: 18200, profit: 12400, expenses: 5800, subscriptions: 220, oneTime: 580, newCustomers: 450, returningCustomers: 350 },
  { month: 'مارس', revenue: 15800, profit: 10200, expenses: 5600, subscriptions: 190, oneTime: 490, newCustomers: 380, returningCustomers: 300 },
  { month: 'أبريل', revenue: 22400, profit: 15800, expenses: 6600, subscriptions: 280, oneTime: 620, newCustomers: 520, returningCustomers: 380 },
  { month: 'مايو', revenue: 19600, profit: 12900, expenses: 6700, subscriptions: 240, oneTime: 550, newCustomers: 420, returningCustomers: 370 },
  { month: 'يونيو', revenue: 31500, profit: 22500, expenses: 9000, subscriptions: 450, oneTime: 890, newCustomers: 680, returningCustomers: 660 },
];

const revenueFunnel: FunnelStep[] = [
  { name: 'زوار الموقع', value: 45230, percentage: 100, color: '#64748b' },
  { name: 'تسجيل حساب', value: 12500, percentage: 27.6, color: '#8b5cf6' },
  { name: 'إضافة للسلة', value: 4800, percentage: 10.6, color: '#f59e0b' },
  { name: 'إتمام دفع', value: 1340, percentage: 3.2, color: '#10b981' },
];

const revenueBreakdown = [
  { category: 'اشتراكات شهرية', amount: 45000, percentage: 37.5, color: '#8b5cf6' },
  { category: 'دورات فردية', amount: 48000, percentage: 40, color: '#58cc02' },
  { category: 'مشتريات داخل التطبيق', amount: 18000, percentage: 15, color: '#f59e0b' },
  { category: 'أخرى', amount: 9000, percentage: 7.5, color: '#64748b' },
];

const expenseBreakdown = [
  { category: 'رواتب', amount: 25000, percentage: 42, color: '#ef4444' },
  { category: 'إيجار', amount: 12000, percentage: 20, color: '#f59e0b' },
  { category: 'مرافق', amount: 8000, percentage: 13.3, color: '#10b981' },
  { category: 'صيانة', amount: 6000, percentage: 10, color: '#8b5cf6' },
  { category: 'تأمين', amount: 5400, percentage: 9, color: '#06b6d4' },
  { category: 'أخرى', amount: 3600, percentage: 6, color: '#6b7280' },
];

const topCourses = [
  { name: 'مقدمة في التواصل AAC', students: 1250, rating: 4.9, revenue: 12500 },
  { name: 'مهارات اجتماعية', students: 890, rating: 4.7, revenue: 8900 },
  { name: 'العلاج بالحركة', students: 654, rating: 4.8, revenue: 6540 },
  { name: 'تطوير اللغة', students: 543, rating: 4.6, revenue: 5430 }
];

const topGames = [
  { name: 'الذاكرة الاحترافية', players: 820, rating: 4.7, sessions: 2450 },
  { name: 'تكوين الكلمات', players: 650, rating: 4.8, sessions: 1950 },
  { name: 'مغامرة الحساب', players: 420, rating: 4.5, sessions: 1260 }
];

const StatCard = ({ icon, label, value, change, trend, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="card border-0 h-100"
    style={{ 
      borderRadius: '20px',
      backgroundColor: 'var(--surface)',
      boxShadow: '0 2px 8px var(--shadow-color)'
    }}
  >
    <div className="card-body p-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div 
          className="rounded-3 d-flex align-items-center justify-content-center"
          style={{ 
            width: '48px', 
            height: '48px', 
            backgroundColor: `${color}15`,
            color: color 
          }}
        >
          {icon}
        </div>
        <span 
          className="px-2 py-1 rounded-pill fw-bold"
          style={{ 
            fontSize: '0.75rem',
            backgroundColor: trend === 'up' ? '#10b98115' : '#ef444415',
            color: trend === 'up' ? '#10b981' : '#ef4444'
          }}
        >
          {trend === 'up' ? <FaCaretUp className="me-1" /> : <FaCaretDown className="me-1" />}
          {change}
        </span>
      </div>
      <div className="fs-2 fw-bold mb-1" style={{ color: 'var(--text)' }}>{value}</div>
      <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{label}</div>
    </div>
  </motion.div>
);

const SectionCard = ({ title, subtitle, icon, children, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="card border-0 h-100"
    style={{ 
      borderRadius: '20px',
      backgroundColor: 'var(--surface)',
      boxShadow: '0 2px 8px var(--shadow-color)'
    }}
  >
    <div className="card-body p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--text)' }}>{title}</h3>
          {subtitle && <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{subtitle}</p>}
        </div>
        {icon && <div style={{ color: 'var(--primary)' }}>{icon}</div>}
      </div>
      {children}
    </div>
  </motion.div>
);

const ProgressBar = ({ percentage, color, delay }: { percentage: number, color: string, delay: number }) => (
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${percentage}%` }}
    transition={{ delay, duration: 0.8, ease: 'easeOut' }}
    style={{ 
      height: '8px', 
      borderRadius: '4px', 
      backgroundColor: color 
    }}
  />
);

const AdminAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .chart-bar {
          transition: all 0.3s ease;
        }
        .chart-bar:hover {
          filter: brightness(1.1);
        }
      `}</style>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>
              <span className="gradient-text">التحليلات</span>
            </h1>
            <p style={{ color: 'var(--text-light)' }}>نظرة شاملة على أداء المنصة</p>
          </div>
          
          <div className="d-flex gap-2">
            {[
              { key: 'week', label: 'أسبوع' },
              { key: 'month', label: 'شهر' },
              { key: 'year', label: 'سنة' }
            ].map(range => (
              <button
                key={range.key}
                onClick={() => setTimeRange(range.key)}
                className="btn px-4 py-2"
                style={{
                  backgroundColor: timeRange === range.key ? 'var(--primary)' : 'var(--surface-elevated)',
                  color: timeRange === range.key ? 'white' : 'var(--text-light)',
                  borderRadius: '12px',
                  border: 'none',
                  fontWeight: '600',
                  boxShadow: timeRange === range.key ? '0 4px 12px rgba(88, 204, 2, 0.3)' : 'none'
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div variants={itemVariants} className="row g-4 mb-4">
          <div className="col-12">
            <div 
              className="card border-0"
              style={{ 
                borderRadius: '24px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                minHeight: '180px'
              }}
            >
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <h2 className="h3 fw-bold mb-2" style={{ color: 'white' }}>الأداء المالي الشامل</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', marginBottom: '24px' }}>تتبع إيراداتك ونمو أعمالك مع تحليلات متعمقة</p>
                    <div className="d-flex gap-4 flex-wrap">
                      {[
                        { label: 'إجمالي الإيرادات', value: '120,000' },
                        { label: 'صافي الأرباح', value: '82,300' },
                        { label: 'هامش الربح', value: '68.6%' }
                      ].map((stat, i) => (
                        <div key={i}>
                          <div className="fs-3 fw-bold" style={{ color: 'white' }}>{stat.value}</div>
                          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-4 d-none d-lg-block">
                    <div className="d-flex justify-content-end">
                      <FaChartLine style={{ fontSize: '100px', color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="row g-4 mb-4">
          <div className="col-12">
            <h3 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>نظرة عامة</h3>
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaEye style={{ fontSize: '1.2rem' }} />} 
              label="إجمالي الزوار" 
              value="45,230" 
              change="+12%" 
              trend="up" 
              color="#58cc02"
              delay={0}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaCheckCircle style={{ fontSize: '1.2rem' }} />} 
              label="معدل الإكمال" 
              value="78%" 
              change="+5%" 
              trend="up" 
              color="#8b5cf6"
              delay={0.1}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaClock style={{ fontSize: '1.2rem' }} />} 
              label="متوسط الوقت" 
              value="12 دقيقة" 
              change="-2%" 
              trend="down" 
              color="#f59e0b"
              delay={0.2}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaPercentage style={{ fontSize: '1.2rem' }} />} 
              label="نسبة التحوّل" 
              value="3.2%" 
              change="+0.8%" 
              trend="up" 
              color="#10b981"
              delay={0.3}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="row g-4 mb-4">
          <div className="col-12">
            <h3 className="fw-bold mb-3" style={{ color: 'var(--text)' }}>إحصائيات العملاء</h3>
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaUserPlus style={{ fontSize: '1.2rem' }} />} 
              label="عملاء جدد" 
              value="2,770" 
              change="+18.2%" 
              trend="up" 
              color="#8b5cf6"
              delay={0}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaUserFriends style={{ fontSize: '1.2rem' }} />} 
              label="عملاء متكررون" 
              value="2,340" 
              change="+8.5%" 
              trend="up" 
              color="#10b981"
              delay={0.1}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaGift style={{ fontSize: '1.2rem' }} />} 
              label="معدل الاحتفاء" 
              value="97.2%" 
              change="+1.2%" 
              trend="up" 
              color="#f59e0b"
              delay={0.2}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatCard 
              icon={<FaExchangeAlt style={{ fontSize: '1.2rem' }} />} 
              label="إيرادات متكررة" 
              value="52,000" 
              change="+12.5%" 
              trend="up" 
              color="#06b6d4"
              delay={0.3}
            />
          </div>
        </motion.div>

        <div className="row g-4 mb-4">
          <div className="col-lg-8">
            <SectionCard 
              title="📈 الإيرادات والأرباح" 
              subtitle="الأداء الشهري dernier 6 أشهر"
              icon={<FaChartBar style={{ fontSize: '1.5rem' }} />}
              delay={0}
            >
              <div className="d-flex align-items-end gap-2 mb-4" style={{ height: '180px' }}>
                {revenueData.map((item, index) => {
                  const maxRevenue = 35000;
                  return (
                    <div key={index} className="flex-grow-1 d-flex flex-column align-items-center chart-bar">
                      <div className="w-100 d-flex flex-column align-items-center gap-1" style={{ height: '160px', justifyContent: 'flex-end' }}>
                        <div 
                          className="w-100 rounded-top"
                          style={{ 
                            backgroundColor: '#f59e0b',
                            height: `${(item.expenses / maxRevenue) * 100}%`,
                            minHeight: '6px',
                            opacity: 0.7,
                            borderRadius: '4px 4px 0 0'
                          }}
                        />
                        <div 
                          className="w-100"
                          style={{ 
                            backgroundColor: '#8b5cf6',
                            height: `${((item.revenue - item.profit) / maxRevenue) * 100}%`,
                            minHeight: '6px'
                          }}
                        />
                        <div 
                          className="w-100 rounded-bottom"
                          style={{ 
                            backgroundColor: 'var(--primary)',
                            height: `${(item.profit / maxRevenue) * 100}%`,
                            minHeight: '16px',
                            borderRadius: '0 0 4px 4px'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                {revenueData.map((item, index) => (
                  <div key={index} className="text-center">
                    <div style={{ color: 'var(--text)', fontWeight: 'bold', fontSize: '0.8rem' }}>{(item.profit / 1000).toFixed(1)}k</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.7rem' }}>{item.month}</div>
                  </div>
                ))}
              </div>
              
              <div className="d-flex justify-content-between p-3 rounded-4" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                {[
                  { label: 'الإيرادات', value: '120,000 جنيه', color: 'var(--primary)' },
                  { label: 'الأرباح', value: '82,300 جنيه', color: '#8b5cf6' },
                  { label: 'المصروفات', value: '37,700 جنيه', color: '#f59e0b' },
                  { label: 'هامش الربح', value: '68.6%', color: '#10b981' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{stat.label}</div>
                    <div className="fw-bold" style={{ color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="col-lg-4">
            <SectionCard 
              title="📊 قمع التحويل" 
              subtitle="مراحل تحويل الزوار إلى عملاء"
              icon={<FaChartPie style={{ fontSize: '1.5rem' }} />}
              delay={0.1}
            >
              <div className="d-flex flex-column gap-3">
                {revenueFunnel.map((step, index) => (
                  <div key={step.name}>
                    <div 
                      className="d-flex align-items-center justify-content-between p-3 rounded-3"
                      style={{ 
                        backgroundColor: 'var(--surface-elevated)',
                        borderLeft: `4px solid ${step.color}`
                      }}
                    >
                      <div>
                        <div style={{ color: 'var(--text)', fontWeight: '500', fontSize: '0.9rem' }}>{step.name}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{step.value.toLocaleString()}</div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold" style={{ color: step.color }}>{step.percentage}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 rounded-4" style={{ backgroundColor: 'var(--success)', opacity: 0.1 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ color: 'var(--text)', fontWeight: 'bold' }}>معدل التحويل</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>زائر → عميل</div>
                  </div>
                  <div className="fs-3 fw-bold" style={{ color: 'var(--success)' }}>2.96%</div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <SectionCard 
              title="💰 توزيع الإيرادات" 
              subtitle="تصنيف الإيرادات حسب المصدر"
              icon={<FaWallet style={{ fontSize: '1.5rem' }} />}
              delay={0}
            >
              <div className="d-flex flex-column gap-4">
                {revenueBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: item.color }} />
                        <span style={{ color: 'var(--text)' }}>{item.category}</span>
                      </div>
                      <span className="fw-bold" style={{ color: 'var(--text)' }}>{item.amount.toLocaleString()} جنيه</span>
                    </div>
                    <div className="progress" style={{ height: '10px', borderRadius: '5px', backgroundColor: 'var(--border)' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          backgroundColor: item.color, 
                          borderRadius: '5px',
                          width: `${item.percentage}%`,
                          transition: 'width 0.8s ease'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="d-flex justify-content-between mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="text-center">
                  <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>الإيرادات المتكررة</div>
                  <div className="fw-bold" style={{ color: '#8b5cf6' }}>43.3%</div>
                </div>
                <div className="text-center">
                  <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>الإيرادات الجديدة</div>
                  <div className="fw-bold" style={{ color: 'var(--primary)' }}>56.7%</div>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="col-lg-6">
            <SectionCard 
              title="💸 تحليل المصروفات" 
              subtitle="توزيع المصروفات الشهرية"
              icon={<FaMoneyCheckAlt style={{ fontSize: '1.5rem' }} />}
              delay={0.1}
            >
              <div className="d-flex flex-column gap-3">
                {expenseBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <span className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: item.color }} />
                        <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{item.category}</span>
                      </div>
                      <span className="fw-bold" style={{ color: 'var(--text)' }}>{item.amount.toLocaleString()} جنيه</span>
                    </div>
                    <div className="progress" style={{ height: '6px', borderRadius: '3px', backgroundColor: 'var(--border)' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          backgroundColor: item.color, 
                          borderRadius: '3px',
                          width: `${item.percentage}%`,
                          transition: 'width 0.8s ease'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="d-flex gap-3 mt-4">
                <div className="flex-grow-1 p-3 rounded-4" style={{ backgroundColor: '#ef444415' }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>أكبر مصروف</span>
                  </div>
                  <div className="fs-5 fw-bold" style={{ color: '#ef4444' }}>25,000 جنيه</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.7rem' }}>رواتب</div>
                </div>
                <div className="flex-grow-1 p-3 rounded-4" style={{ backgroundColor: '#10b98115' }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>التوفير</span>
                  </div>
                  <div className="fs-5 fw-bold" style={{ color: '#10b981' }}>23,000 جنيه</div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.7rem' }}>38.3% من الإيرادات</div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <SectionCard 
              title="🎓 الدورات الأكثر شعبية" 
              subtitle="ترتيب حسب عدد الطلاب والإيرادات"
              icon={<FaBook style={{ fontSize: '1.5rem' }} />}
              delay={0}
            >
              <div className="d-flex flex-column gap-3">
                {topCourses.map((course, index) => (
                  <div 
                    key={index}
                    className="d-flex align-items-center justify-content-between p-3 rounded-4"
                    style={{ backgroundColor: 'var(--surface-elevated)' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          backgroundColor: index === 0 ? 'var(--primary)' : index === 1 ? 'var(--secondary)' : 'var(--border)',
                          color: index < 2 ? 'white' : 'var(--text)',
                          fontSize: '0.9rem'
                        }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ color: 'var(--text)', fontWeight: '600' }}>{course.name}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{course.students} طالب</div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold" style={{ color: '#10b981' }}>{course.revenue.toLocaleString()} جنيه</div>
                      <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'var(--warning)', opacity: 0.15, color: 'var(--warning)', fontSize: '0.7rem' }}>
                        {course.rating} ★
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="col-lg-6">
            <SectionCard 
              title="🎮 الألعاب الأكثر شعبية" 
              subtitle="ترتيب حسب عدد اللاعبين"
              icon={<FaGamepad style={{ fontSize: '1.5rem' }} />}
              delay={0.1}
            >
              <div className="d-flex flex-column gap-3">
                {topGames.map((game, index) => (
                  <div 
                    key={index}
                    className="d-flex align-items-center justify-content-between p-3 rounded-4"
                    style={{ backgroundColor: 'var(--surface-elevated)' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          backgroundColor: index === 0 ? 'var(--secondary)' : index === 1 ? '#f59e0b' : 'var(--border)',
                          color: index < 2 ? 'white' : 'var(--text)',
                          fontSize: '0.9rem'
                        }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ color: 'var(--text)', fontWeight: '600' }}>{game.name}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>{game.players} لاعب • {game.sessions} جلسة</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-pill" style={{ backgroundColor: 'var(--warning)', opacity: 0.15, color: 'var(--warning)', fontSize: '0.8rem' }}>
                      {game.rating} ★
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <SectionCard 
              title="📋 تفاصيل العملاء الشهرية" 
              subtitle="إحصائيات الاشتراكات والمشتريات"
              delay={0}
            >
              <div className="table-responsive">
                <table className="table table-borderless" style={{ fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th style={{ color: 'var(--text)', padding: '14px 12px', fontWeight: '600' }}>الشهر</th>
                      <th style={{ color: 'var(--text)', padding: '14px 12px', fontWeight: '600' }}>اشتراكات</th>
                      <th style={{ color: 'var(--text)', padding: '14px 12px', fontWeight: '600' }}>مشتريات</th>
                      <th style={{ color: 'var(--text)', padding: '14px 12px', fontWeight: '600' }}>جدد</th>
                      <th style={{ color: 'var(--text)', padding: '14px 12px', fontWeight: '600' }}>متكررون</th>
                      <th style={{ color: 'var(--text)', padding: '14px 12px', fontWeight: '600' }}>الإيرادات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueData.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '14px 12px', color: 'var(--text)', fontWeight: '500' }}>{item.month}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span className="px-3 py-1 rounded-pill" style={{ backgroundColor: '#8b5cf615', color: '#8b5cf6', fontSize: '0.8rem', fontWeight: '500' }}>
                            {item.subscriptions}
                          </span>
                        </td>
                        <td style={{ padding: '14px 12px' }}>
                          <span className="px-3 py-1 rounded-pill" style={{ backgroundColor: '#f59e0b15', color: '#f59e0b', fontSize: '0.8rem', fontWeight: '500' }}>
                            {item.oneTime}
                          </span>
                        </td>
                        <td style={{ padding: '14px 12px', color: 'var(--primary)', fontWeight: '600' }}>{item.newCustomers}</td>
                        <td style={{ padding: '14px 12px', color: '#10b981', fontWeight: '600' }}>{item.returningCustomers}</td>
                        <td style={{ padding: '14px 12px' }}>
                          <span className="fw-bold" style={{ color: 'var(--primary)' }}>{item.revenue.toLocaleString()} جنيه</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="d-flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                {[
                  { label: 'متوسط الاشتراكات', value: '260', color: '#8b5cf6' },
                  { label: 'متوسط المشتريات', value: '575', color: '#f59e0b' },
                  { label: 'إجمالي العملاء', value: '5,110', color: 'var(--primary)' }
                ].map((stat, i) => (
                  <div key={i} className="d-flex align-items-center gap-2">
                    <span className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: stat.color }} />
                    <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{stat.label}: <span className="fw-bold" style={{ color: 'var(--text)' }}>{stat.value}</span></span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminAnalyticsPage;