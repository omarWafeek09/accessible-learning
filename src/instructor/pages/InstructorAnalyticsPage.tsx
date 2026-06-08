// src\instructor\pages\InstructorAnalyticsPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, FaUsers, FaEye, FaMoneyBillWave, FaBook, FaGraduationCap,
  FaStar, FaArrowUp, FaArrowDown, FaCalendar, FaDesktop, FaMobile,
  FaCheckCircle, FaClock, FaBookmark, FaShareAlt, FaDownload
} from 'react-icons/fa';

interface ChartData {
  label: string;
  value: number;
}

const monthlyStudentsData: ChartData[] = [
  { label: 'يناير', value: 12 },
  { label: 'فبراير', value: 18 },
  { label: 'مارس', value: 25 },
  { label: 'أبريل', value: 22 },
  { label: 'مايو', value: 30 },
  { label: 'يونيو', value: 28 },
];

const monthlyRevenueData: ChartData[] = [
  { label: 'يناير', value: 1200 },
  { label: 'فبراير', value: 1800 },
  { label: 'مارس', value: 2500 },
  { label: 'أبريل', value: 2200 },
  { label: 'مايو', value: 3000 },
  { label: 'يونيو', value: 2800 },
];

const courseStats = [
  { id: '1', title: 'مقدمة في التواصل AAC', students: 150, views: 2500, revenue: 2800, completionRate: 75, rating: 4.8, earnings: 2800 },
  { id: '2', title: 'مهارات اجتماعية للمبتدئين', students: 85, views: 1200, revenue: 1500, completionRate: 68, rating: 4.6, earnings: 1500 },
  { id: '3', title: 'التواصل مع الآخرين', students: 45, views: 800, revenue: 900, completionRate: 55, rating: 4.5, earnings: 900 },
];

const topStudents = [
  { id: '1', name: 'أحمد محمد', courses: 3, progress: 95, points: 1250, avatar: 'أ' },
  { id: '2', name: 'خالد عمر', courses: 2, progress: 88, points: 980, avatar: 'خ' },
  { id: '3', name: 'سارة علي', courses: 2, progress: 75, points: 850, avatar: 'س' },
  { id: '4', name: 'منى عبدالله', courses: 1, progress: 60, points: 480, avatar: 'م' },
  { id: '5', name: 'علي حسن', courses: 2, progress: 55, points: 350, avatar: 'ع' },
];

const InstructorAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'students' | 'revenue'>('overview');

  const totalStudents = courseStats.reduce((a, c) => a + c.students, 0);
  const totalViews = courseStats.reduce((a, c) => a + c.views, 0);
  const totalRevenue = courseStats.reduce((a, c) => a + c.revenue, 0);
  const avgCompletion = Math.round(courseStats.reduce((a, c) => a + c.completionRate, 0) / courseStats.length);
  const avgRating = (courseStats.reduce((a, c) => a + c.rating, 0) / courseStats.length).toFixed(1);

  const maxStudents = Math.max(...monthlyStudentsData.map(d => d.value));
  const maxRevenue = Math.max(...monthlyRevenueData.map(d => d.value));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: 'var(--text)' }}>التحليلات</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            إحصائيات وأداء الدورات والطلاب
          </p>
        </div>
        <div className="d-flex gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select"
            style={{ borderRadius: '10px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', width: '150px' }}
          >
            <option value="7days">آخر 7 أيام</option>
            <option value="30days">آخر 30 يوم</option>
            <option value="6months">آخر 6 أشهر</option>
            <option value="year">السنة الماضية</option>
          </select>
          <button 
            className="btn d-flex align-items-center gap-2"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderRadius: '10px', border: '1px solid var(--border)', padding: '10px 16px' }}
          >
            <FaDownload /> تصدير
          </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(88, 204, 2, 0.15)' }}>
                  <FaUsers style={{ color: 'var(--primary)', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                  <FaArrowUp /> +15%
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{totalStudents}</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي الطلاب</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
                  <FaEye style={{ color: '#3b82f6', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                  <FaArrowUp /> +22%
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{totalViews.toLocaleString()}</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي المشاهدات</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                  <FaMoneyBillWave style={{ color: '#8b5cf6', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                  <FaArrowUp /> +18%
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{totalRevenue.toLocaleString()} جنيه</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي الإيرادات</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(245, 158, 11, 0.15)' }}>
                  <FaStar style={{ color: '#f59e0b', fontSize: '1.3rem' }} />
                </div>
                <span className="d-flex align-items-center gap-1" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                  <FaArrowUp /> +0.2
                </span>
              </div>
              <div className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>{avgRating}</div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>متوسط التقييم</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        {[
          { id: 'overview', label: 'نظرة عامة', icon: <FaChartLine /> },
          { id: 'courses', label: 'الدورات', icon: <FaBook /> },
          { id: 'students', label: 'الطلاب', icon: <FaUsers /> },
          { id: 'revenue', label: 'الإيرادات', icon: <FaMoneyBillWave /> },
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
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                    <FaUsers className="ms-2" style={{ color: 'var(--primary)' }} />
                    نمو الطلاب الشهري
                  </h3>
                  <div className="d-flex align-items-end gap-2" style={{ height: '200px' }}>
                    {monthlyStudentsData.map((data, i) => (
                      <div key={i} className="flex-grow-1 d-flex flex-column align-items-center">
                        <div 
                          className="w-100 rounded-top"
                          style={{ 
                            height: `${(data.value / maxStudents) * 160}px`,
                            backgroundColor: 'var(--primary)',
                            transition: 'height 0.3s ease'
                          }}
                        />
                        <div className="mt-2" style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{data.label}</div>
                        <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{data.value}</div>
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
                    <FaMoneyBillWave className="ms-2" style={{ color: '#8b5cf6' }} />
                    الإيرادات الشهرية
                  </h3>
                  <div className="d-flex align-items-end gap-2" style={{ height: '200px' }}>
                    {monthlyRevenueData.map((data, i) => (
                      <div key={i} className="flex-grow-1 d-flex flex-column align-items-center">
                        <div 
                          className="w-100 rounded-top"
                          style={{ 
                            height: `${(data.value / maxRevenue) * 160}px`,
                            backgroundColor: '#8b5cf6',
                            transition: 'height 0.3s ease'
                          }}
                        />
                        <div className="mt-2" style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>{data.label}</div>
                        <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{data.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                    <FaGraduationCap className="ms-2" style={{ color: '#10b981' }} />
                    معدل إكمال الدورات
                  </h3>
                  <div className="d-flex justify-content-center mb-3">
                    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="12" />
                        <circle 
                          cx="50" cy="50" r="40" fill="none" 
                          stroke="var(--primary)" strokeWidth="12"
                          strokeDasharray={`${avgCompletion * 2.51} 251`}
                          style={{ transition: 'stroke-dasharray 0.5s ease' }}
                        />
                      </svg>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <div className="h3 fw-bold" style={{ color: 'var(--text)' }}>{avgCompletion}%</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>معدل الإكمال</div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-4">
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                      <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>مكتمل</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--border)' }} />
                      <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>قيد التعلم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                    <FaDesktop className="ms-2" style={{ color: '#3b82f6' }} />
                    مصادر المشاهدات
                  </h3>
                  <div className="d-flex flex-column gap-3">
                    {[
                      { label: 'الموقع الإلكتروني', value: 65, color: '#3b82f6', icon: <FaDesktop /> },
                      { label: 'التطبيق المحمول', value: 25, color: '#8b5cf6', icon: <FaMobile /> },
                      { label: 'روابط مباشرة', value: 10, color: '#10b981', icon: <FaShareAlt /> },
                    ].map((source, i) => (
                      <div key={i}>
                        <div className="d-flex justify-content-between mb-1">
                          <span style={{ color: 'var(--text)' }}>{source.icon} {source.label}</span>
                          <span className="fw-bold" style={{ color: 'var(--text)' }}>{source.value}%</span>
                        </div>
                        <div className="rounded-pill" style={{ height: '8px', backgroundColor: 'var(--border)' }}>
                          <div className="rounded-pill" style={{ width: `${source.value}%`, height: '100%', backgroundColor: source.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'courses' && (
        <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدورة</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الطلاب</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المشاهدات</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الإيرادات</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>معدل الإكمال</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التقييم</th>
                  </tr>
                </thead>
                <tbody>
                  {courseStats.map(course => (
                    <tr key={course.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <span className="fw-bold" style={{ color: 'var(--text)' }}>{course.title}</span>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{course.students}</td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{course.views.toLocaleString()}</td>
                      <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 'bold' }}>{course.revenue.toLocaleString()} جنيه</td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-pill" style={{ width: '60px', height: '6px', backgroundColor: 'var(--border)' }}>
                            <div className="rounded-pill" style={{ width: `${course.completionRate}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                          </div>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{course.completionRate}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span className="d-flex align-items-center gap-1" style={{ color: '#fbbf24' }}>
                          <FaStar style={{ fontSize: '0.9rem' }} />
                          <span style={{ color: 'var(--text)' }}>{course.rating}</span>
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

      {activeTab === 'students' && (
        <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الطالب</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدورات</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التقدم</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>النقاط</th>
                    <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الترتيب</th>
                  </tr>
                </thead>
                <tbody>
                  {topStudents.map((student, index) => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: 'bold' }}>
                            {student.avatar}
                          </div>
                          <span className="fw-bold" style={{ color: 'var(--text)' }}>{student.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text)' }}>{student.courses}</td>
                      <td style={{ padding: '16px' }}>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-pill" style={{ width: '80px', height: '8px', backgroundColor: 'var(--border)' }}>
                            <div className="rounded-pill" style={{ width: `${student.progress}%`, height: '100%', backgroundColor: student.progress >= 80 ? 'var(--primary)' : '#fbbf24' }} />
                          </div>
                          <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{student.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 'bold' }}>{student.points}</td>
                      <td style={{ padding: '16px' }}>
                        <span 
                          className="px-2 py-1 rounded-pill"
                          style={{ 
                            backgroundColor: index < 3 ? (index === 0 ? 'rgba(255, 215, 0, 0.15)' : index === 1 ? 'rgba(192, 192, 192, 0.15)' : 'rgba(205, 127, 50, 0.15)') : 'var(--surface-elevated)',
                            color: index < 3 ? (index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32') : 'var(--text-light)',
                            fontWeight: 'bold',
                            fontSize: '0.85rem'
                          }}
                        >
                          #{index + 1}
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

      {activeTab === 'revenue' && (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>إجمالي الإيرادات</h3>
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div className="text-center">
                    <div className="h2 fw-bold" style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>{totalRevenue.toLocaleString()}</div>
                    <div style={{ color: 'var(--text-light)' }}>جنيه</div>
                  </div>
                </div>
                <div className="d-flex justify-content-around">
                  <div className="text-center">
                    <div className="h4 fw-bold" style={{ color: 'var(--text)' }}>{courseStats.length}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>دورات</div>
                  </div>
                  <div className="text-center">
                    <div className="h4 fw-bold" style={{ color: 'var(--text)' }}>{(totalRevenue / totalStudents).toFixed(0)}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>جنيه/طالب</div>
                  </div>
                  <div className="text-center">
                    <div className="h4 fw-bold" style={{ color: 'var(--text)' }}>{((totalRevenue / 6)).toFixed(0)}</div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>جنيه/شهر</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>الإيرادات حسب الدورة</h3>
                <div className="d-flex flex-column gap-3">
                  {courseStats.map((course, i) => (
                    <div key={i}>
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{course.title.substring(0, 25)}...</span>
                        <span className="fw-bold" style={{ color: 'var(--primary)' }}>{course.earnings.toLocaleString()} جنيه</span>
                      </div>
                      <div className="rounded-pill" style={{ height: '8px', backgroundColor: 'var(--border)' }}>
                        <div 
                          className="rounded-pill" 
                          style={{ 
                            width: `${(course.earnings / totalRevenue) * 100}%`, 
                            height: '100%', 
                            backgroundColor: ['#8b5cf6', '#3b82f6', '#10b981'][i]
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default InstructorAnalyticsPage;