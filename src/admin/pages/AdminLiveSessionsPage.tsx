// src\admin\pages\AdminLiveSessionsPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaVideo, FaClock, FaCalendarAlt, FaPlus, FaSearch,
  FaPlay, FaTrash, FaTimes, FaCheck, FaList, FaThLarge,
  FaChalkboardTeacher, FaUserGraduate, FaBroadcastTower
} from 'react-icons/fa';

interface LiveSession {
  id: string;
  title: string;
  course: string;
  instructor: string;
  students: number;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'live' | 'completed';
  meetingLink: string;
}

const exampleSessions: LiveSession[] = [
  { id: '1', title: 'جلسة النطق الأولى', course: 'مقدمة في التواصل AAC', instructor: 'أحمد محمد', students: 5, date: '2024-01-20', time: '09:00', duration: 60, status: 'scheduled', meetingLink: 'https://meet.example.com/1' },
  { id: '2', title: 'مهارات اجتماعية - المستوى 1', course: 'مهارات اجتماعية', instructor: 'سارة علي', students: 8, date: '2024-01-20', time: '11:00', duration: 90, status: 'live', meetingLink: 'https://meet.example.com/2' },
  { id: '3', title: 'تقييم أسبوعي', course: 'العلاج بالحركة', instructor: 'خالد عمر', students: 3, date: '2024-01-20', time: '14:00', duration: 45, status: 'scheduled', meetingLink: 'https://meet.example.com/3' },
  { id: '4', title: 'ورشة عمل للأهل', course: 'تطوير اللغة', instructor: 'فاطمة أحمد', students: 12, date: '2024-01-21', time: '16:00', duration: 120, status: 'scheduled', meetingLink: 'https://meet.example.com/4' },
  { id: '5', title: 'جلسة تفاعلية', course: 'مقدمة في التواصل AAC', instructor: 'أحمد محمد', students: 4, date: '2024-01-19', time: '10:00', duration: 60, status: 'completed', meetingLink: '' },
  { id: '6', title: 'تمارين النطق', course: 'مهارات اجتماعية', instructor: 'سارة علي', students: 6, date: '2024-01-18', time: '15:00', duration: 45, status: 'completed', meetingLink: '' },
];

const statusConfig = {
  scheduled: { label: 'مجدولة', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
  live: { label: 'جارية', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
  completed: { label: 'مكتملة', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
};

const AdminLiveSessionsPage = () => {
  const [sessions] = useState<LiveSession[]>(exampleSessions);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'scheduled' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const [newSession, setNewSession] = useState({
    title: '', course: '', instructor: '', date: '', time: '', duration: 60, meetingLink: ''
  });

  const liveSessions = sessions.filter(s => s.status === 'live');
  const scheduledSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || session.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleAddSession = () => {
    if (!newSession.title || !newSession.date) return;
    setShowAddModal(false);
    setNewSession({ title: '', course: '', instructor: '', date: '', time: '', duration: 60, meetingLink: '' });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>الجلسات المباشرة</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {sessions.length} جلسة | {liveSessions.length} نشطة الآن
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px' }}
        >
          <FaPlus />
          <span>جلسة جديدة</span>
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
                <FaVideo size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>إجمالي الجلسات</div>
                <div className="fw-bold" style={{ color: 'var(--text)', fontSize: '1.3rem' }}>{sessions.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                <FaBroadcastTower size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>الجلسات النشطة</div>
                <div className="fw-bold" style={{ color: '#ef4444', fontSize: '1.3rem' }}>{liveSessions.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>المجدولة</div>
                <div className="fw-bold" style={{ color: '#3b82f6', fontSize: '1.3rem' }}>{scheduledSessions.length}</div>
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
          onClick={() => setActiveTab('all')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'all' ? 'var(--primary)' : 'var(--surface)',
            color: activeTab === 'all' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'all' ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaList />
          <span>الكل ({sessions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'live' ? '#ef4444' : 'var(--surface)',
            color: activeTab === 'live' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'live' ? '#ef4444' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaBroadcastTower />
          <span>النشطة ({liveSessions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('scheduled')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'scheduled' ? '#3b82f6' : 'var(--surface)',
            color: activeTab === 'scheduled' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'scheduled' ? '#3b82f6' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaCalendarAlt />
          <span>المجدولة ({scheduledSessions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeTab === 'completed' ? '#22c55e' : 'var(--surface)',
            color: activeTab === 'completed' ? 'white' : 'var(--text)',
            border: `2px solid ${activeTab === 'completed' ? '#22c55e' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaCheck />
          <span>المكتملة ({completedSessions.length})</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="position-relative" style={{ width: '300px' }}>
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
          <div className="d-flex gap-1">
            <button
              onClick={() => setViewMode('list')}
              className="btn p-2"
              style={{ backgroundColor: viewMode === 'list' ? 'var(--primary)' : 'var(--surface)', color: viewMode === 'list' ? 'white' : 'var(--text-light)', borderRadius: '8px' }}
            >
              <FaList />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className="btn p-2"
              style={{ backgroundColor: viewMode === 'grid' ? 'var(--primary)' : 'var(--surface)', color: viewMode === 'grid' ? 'white' : 'var(--text-light)', borderRadius: '8px' }}
            >
              <FaThLarge />
            </button>
          </div>
        </div>
      </motion.div>

      {viewMode === 'list' ? (
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
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>العنوان</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الدورة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المدرب</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الطلاب</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>التاريخ</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الوقت</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>المدة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px' }}>الحالة</th>
                  <th style={{ color: 'var(--text)', fontWeight: 500, padding: '16px', width: '150px' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map(session => (
                  <tr key={session.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px' }}>
                      <span className="fw-bold" style={{ color: 'var(--text)' }}>{session.title}</span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{session.course}</td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.75rem' }}>
                          {session.instructor.charAt(0)}
                        </div>
                        <span style={{ color: 'var(--text)' }}>{session.instructor}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{session.students}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{session.date}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{session.time}</td>
                    <td style={{ padding: '16px', color: 'var(--text)' }}>{session.duration} دقيقة</td>
                    <td style={{ padding: '16px' }}>
                      <span className="badge" style={{ backgroundColor: statusConfig[session.status].bg, color: statusConfig[session.status].color }}>
                        {statusConfig[session.status].label}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div className="d-flex gap-2">
                        {session.status === 'scheduled' && session.meetingLink && (
                          <button className="btn btn-sm d-flex align-items-center gap-1" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', borderRadius: '8px' }}>
                            <FaPlay style={{ fontSize: '0.7rem' }} />
                            <span style={{ fontSize: '0.75rem' }}>بدء</span>
                          </button>
                        )}
                        <button className="btn btn-sm d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', padding: 0, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px' }}>
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
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="row g-3"
        >
          {filteredSessions.map(session => (
            <div key={session.id} className="col-md-6 col-lg-4">
              <div className="card border-0 p-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="badge" style={{ backgroundColor: statusConfig[session.status].bg, color: statusConfig[session.status].color }}>
                    {statusConfig[session.status].label}
                  </span>
                  {session.status === 'live' && (
                    <span className="d-flex align-items-center gap-1" style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                      LIVE
                    </span>
                  )}
                </div>
                <h5 className="fw-bold mb-2" style={{ color: 'var(--text)' }}>{session.title}</h5>
                <p className="mb-3" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{session.course}</p>
                <div className="d-flex align-items-center gap-4 mb-3" style={{ fontSize: '0.85rem' }}>
                  <span className="d-flex align-items-center gap-2" style={{ color: 'var(--text)' }}>
                    <FaChalkboardTeacher /> {session.instructor}
                  </span>
                  <span className="d-flex align-items-center gap-2" style={{ color: 'var(--text)' }}>
                    <FaUserGraduate /> {session.students}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="d-flex align-items-center gap-2" style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    <FaCalendarAlt /> {session.date}
                  </span>
                  <span className="d-flex align-items-center gap-2" style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    <FaClock /> {session.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {filteredSessions.length === 0 && (
        <div className="text-center py-5">
          <FaVideo style={{ fontSize: '3rem', color: 'var(--text-light)', opacity: 0.5 }} />
          <p className="mt-3" style={{ color: 'var(--text-light)' }}>لا توجد جلسات</p>
        </div>
      )}

      {showAddModal && (
        <div className="position-fixed d-flex align-items-center justify-content-center" style={{ top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }} onClick={() => setShowAddModal(false)}>
          <div className="card border-0 p-4" style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', width: '100%', maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold" style={{ color: 'var(--text)' }}>جلسة جديدة</h3>
              <button onClick={() => setShowAddModal(false)} className="btn d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}>
                <FaTimes style={{ color: 'var(--text-light)' }} />
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>العنوان</label>
              <input type="text" className="form-control p-3" value={newSession.title} onChange={e => setNewSession({ ...newSession, title: e.target.value })} placeholder="أدخل عنوان الجلسة" style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الدورة</label>
              <select className="form-select p-3" value={newSession.course} onChange={e => setNewSession({ ...newSession, course: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                <option value="">اختر الدورة</option>
                <option value="مقدمة في التواصل AAC">مقدمة في التواصل AAC</option>
                <option value="مهارات اجتماعية">مهارات اجتماعية</option>
                <option value="العلاج بالحركة">العلاج بالحركة</option>
                <option value="تطوير اللغة">تطوير اللغة</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>المدرب</label>
              <select className="form-select p-3" value={newSession.instructor} onChange={e => setNewSession({ ...newSession, instructor: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                <option value="">اختر المدرب</option>
                <option value="أحمد محمد">أحمد محمد</option>
                <option value="سارة علي">سارة علي</option>
                <option value="خالد عمر">خالد عمر</option>
                <option value="فاطمة أحمد">فاطمة أحمد</option>
              </select>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>التاريخ</label>
                <input type="date" className="form-control p-3" value={newSession.date} onChange={e => setNewSession({ ...newSession, date: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
              <div className="col-6">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الوقت</label>
                <input type="time" className="form-control p-3" value={newSession.time} onChange={e => setNewSession({ ...newSession, time: e.target.value })} style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>رابط الاجتماع</label>
              <input type="text" className="form-control p-3" value={newSession.meetingLink} onChange={e => setNewSession({ ...newSession, meetingLink: e.target.value })} placeholder="https://..." style={{ borderRadius: '12px', border: '2px solid var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }} />
            </div>
            <button onClick={handleAddSession} className="btn w-100 py-3" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
              <FaPlus className="me-2" /> إضافة الجلسة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLiveSessionsPage;