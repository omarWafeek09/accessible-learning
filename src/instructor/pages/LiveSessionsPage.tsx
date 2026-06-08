// src\instructor\pages\LiveSessionsPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaPlus, FaClock, FaUsers, FaCheck, FaTimes, FaCalendarAlt, FaPlay, FaExpand, FaMicrophone, FaVideoSlash } from 'react-icons/fa';
import { sessionManager, LiveSession, SessionAppointment } from './SessionManager';

const LiveSessionsPage = () => {
  const [sessions, setSessions] = useState<LiveSession[]>(sessionManager.getSessions());
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    courseName: '',
    scheduledAt: '',
    duration: 60,
    studentsCount: 0,
    description: ''
  });
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  const stats = sessionManager.getSessionStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'var(--warning)';
      case 'live': return '#e63946';
      case 'completed': return 'var(--success)';
      case 'cancelled': return 'var(--danger)';
      default: return 'var(--text-light)';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'مجدول';
      case 'live': return 'مباشر';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغى';
      default: return status;
    }
  };

  const handleCreateSession = () => {
    if (newSession.title && newSession.courseName && newSession.scheduledAt) {
      const session = sessionManager.createSession({
        title: newSession.title,
        courseName: newSession.courseName,
        scheduledAt: new Date(newSession.scheduledAt),
        duration: newSession.duration,
        status: 'scheduled',
        studentsCount: newSession.studentsCount,
        description: newSession.description
      });
      setSessions([...sessions, session]);
      setShowModal(false);
      setNewSession({
        title: '',
        courseName: '',
        scheduledAt: '',
        duration: 60,
        studentsCount: 0,
        description: ''
      });
    }
  };

  const handleStartStream = (session: LiveSession) => {
    setSelectedSession(session.id);
    setIsStreaming(true);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
  };

  const appointments = selectedSession 
    ? sessionManager.getAppointmentsBySession(selectedSession)
    : [];

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled' || s.status === 'live');

  const activeSession = selectedSession ? sessions.find(s => s.id === selectedSession) : null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatFullDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0" style={{ color: 'var(--text)' }}>البث المباشر والجلسات</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-3"
          style={{
            backgroundColor: 'var(--success)',
            color: 'white',
            border: 'none'
          }}
        >
          <FaPlus /> جلسة جديدة
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div 
            className="p-4 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '50px', height: '50px', backgroundColor: 'var(--warning)', color: 'white' }}
              >
                <FaClock />
              </div>
              <div>
                <h4 className="fw-bold mb-0" style={{ color: 'var(--text)' }}>{stats.scheduled}</h4>
                <small style={{ color: 'var(--text-light)' }}>مجدول</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div 
            className="p-4 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '50px', height: '50px', backgroundColor: '#e63946', color: 'white' }}
              >
                <FaVideo />
              </div>
              <div>
                <h4 className="fw-bold mb-0" style={{ color: 'var(--text)' }}>{stats.live}</h4>
                <small style={{ color: 'var(--text-light)' }}>نشط</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div 
            className="p-4 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '50px', height: '50px', backgroundColor: 'var(--success)', color: 'white' }}
              >
                <FaCheck />
              </div>
              <div>
                <h4 className="fw-bold mb-0" style={{ color: 'var(--text)' }}>{stats.completed}</h4>
                <small style={{ color: 'var(--text-light)' }}>مكتمل</small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div 
            className="p-4 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '50px', height: '50px', backgroundColor: 'var(--danger)', color: 'white' }}
              >
                <FaTimes />
              </div>
              <div>
                <h4 className="fw-bold mb-0" style={{ color: 'var(--text)' }}>{stats.cancelled}</h4>
                <small style={{ color: 'var(--text-light)' }}>ملغى</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {isStreaming && activeSession ? (
            <div 
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <div 
                className="position-relative rounded-4 overflow-hidden mb-3"
                style={{
                  backgroundColor: '#1a1a2e',
                  height: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cameraOff ? (
                  <div className="text-center">
                    <FaVideo style={{ fontSize: '3rem', color: 'var(--text-light)', opacity: 0.5 }} />
                    <p className="mt-2" style={{ color: 'var(--text-light)' }}>الكاميرا معطلة</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'var(--success)'
                      }}
                    >
                      <FaVideo style={{ fontSize: '2rem', color: 'white' }} />
                    </div>
                    <p style={{ color: 'var(--text-light)' }}>جاري البث المباشر</p>
                  </div>
                )}
                
                <div 
                  className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill d-flex align-items-center gap-2"
                  style={{ backgroundColor: '#e63946', color: 'white' }}
                >
                  <span className="d-inline-block rounded-circle" style={{ width: '8px', height: '8px', backgroundColor: 'white', animation: 'pulse 1s infinite' }} />
                  <FaVideo style={{ fontSize: '0.8rem' }} />
                  <span>مباشر</span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: 'var(--text)' }}>{activeSession.title}</h5>
                  <p className="m-0" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{activeSession.courseName}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span 
                    className="px-3 py-1 rounded-pill d-flex align-items-center gap-2"
                    style={{ backgroundColor: 'var(--success)', color: 'white', fontSize: '0.85rem' }}
                  >
                    <FaUsers /> {activeSession.studentsCount} طلاب
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: isMuted ? 'var(--danger)' : 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    color: isMuted ? 'white' : 'var(--text)'
                  }}
                >
                  {isMuted ? <FaVideoSlash /> : <FaMicrophone />}
                </button>
                <button
                  onClick={() => setCameraOff(!cameraOff)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: cameraOff ? 'var(--danger)' : 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    color: cameraOff ? 'white' : 'var(--text)'
                  }}
                >
                  {cameraOff ? <FaVideoSlash /> : <FaVideo />}
                </button>
                <button
                  onClick={handleStopStream}
                  className="btn px-4 py-2 rounded-pill"
                  style={{
                    backgroundColor: '#e63946',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  إنهاء البث
                </button>
                <button
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)'
                  }}
                >
                  <FaExpand />
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <h4 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>كل الجلسات</h4>
              <div className="table-responsive">
                <table className="table" style={{ color: 'var(--text)' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      <th className="py-3" style={{ color: 'var(--text)' }}>العنوان</th>
                      <th className="py-3" style={{ color: 'var(--text)' }}>الدورة</th>
                      <th className="py-3" style={{ color: 'var(--text)' }}>التاريخ</th>
                      <th className="py-3" style={{ color: 'var(--text)' }}>المدة</th>
                      <th className="py-3" style={{ color: 'var(--text)' }}>الطلاب</th>
                      <th className="py-3" style={{ color: 'var(--text)' }}>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map(session => (
                      <tr 
                        key={session.id} 
                        style={{ 
                          borderBottom: '1px solid var(--border)',
                          cursor: 'pointer',
                          backgroundColor: selectedSession === session.id ? 'var(--background)' : 'transparent'
                        }}
                        onClick={() => setSelectedSession(session.id)}
                      >
                        <td className="py-3 fw-medium">{session.title}</td>
                        <td className="py-3">{session.courseName}</td>
                        <td className="py-3" style={{ fontSize: '0.9rem' }}>{formatDate(session.scheduledAt)}</td>
                        <td className="py-3">{session.duration} دقيقة</td>
                        <td className="py-3 d-flex align-items-center gap-1">
                          <FaUsers style={{ fontSize: '0.8rem' }} /> {session.studentsCount}
                        </td>
                        <td className="py-3">
                          <span 
                            className="px-3 py-1 rounded-pill"
                            style={{
                              backgroundColor: getStatusColor(session.status),
                              color: 'white',
                              fontSize: '0.8rem'
                            }}
                          >
                            {getStatusLabel(session.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div 
            className="p-4 rounded-4 mb-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <h4 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>مواعيد الطلاب</h4>
            {selectedSession ? (
              appointments.length > 0 ? (
                appointments.map(apt => (
                  <div 
                    key={apt.id}
                    className="d-flex align-items-center justify-content-between p-3 mb-2 rounded-3"
                    style={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--success)',
                          color: 'white',
                          fontSize: '0.9rem'
                        }}
                      >
                        {apt.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="mb-0 fw-medium" style={{ color: 'var(--text)' }}>{apt.studentName}</p>
                        <small style={{ color: 'var(--text-light)' }}>{formatDate(apt.createdAt)}</small>
                      </div>
                    </div>
                    <span 
                      className="px-2 py-1 rounded-pill"
                      style={{
                        backgroundColor: apt.status === 'confirmed' ? 'var(--success)' : apt.status === 'pending' ? 'var(--warning)' : 'var(--danger)',
                        color: 'white',
                        fontSize: '0.75rem'
                      }}
                    >
                      {apt.status === 'confirmed' ? 'مؤكد' : apt.status === 'pending' ? 'معلق' : 'ملغى'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center" style={{ color: 'var(--text-light)' }}>لا توجد مواعيد لهذه الجلسة</p>
              )
            ) : (
              <p className="text-center" style={{ color: 'var(--text-light)' }}>
                <FaCalendarAlt style={{ fontSize: '2rem', opacity: 0.3 }} />
                <br />
                اختر جلسة من الجدول لعرض مواعيد الطلاب
              </p>
            )}
          </div>

          <div 
            className="p-4 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            <h4 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>الجلسات القادمة</h4>
            {upcomingSessions.length > 0 ? (
              upcomingSessions.slice(0, 3).map(session => (
                <div 
                  key={session.id}
                  className="p-3 mb-3 rounded-3"
                  style={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold mb-0" style={{ color: 'var(--text)' }}>{session.title}</h6>
                    <span 
                      className="px-2 py-1 rounded-pill"
                      style={{
                        backgroundColor: session.status === 'live' ? '#e63946' : 'var(--success)',
                        color: 'white',
                        fontSize: '0.7rem'
                      }}
                    >
                      {session.status === 'live' ? 'مباشر' : 'مجدول'}
                    </span>
                  </div>
                  <p className="mb-2" style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{session.courseName}</p>
                  <div className="d-flex align-items-center gap-3 mb-2" style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    <span className="d-flex align-items-center gap-1">
                      <FaClock /> {session.duration} دقيقة
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <FaUsers /> {session.studentsCount}
                    </span>
                  </div>
                  <p className="mb-3" style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    {formatFullDate(session.scheduledAt)}
                  </p>
                  {session.status === 'live' ? (
                    <button
                      onClick={() => handleStartStream(session)}
                      className="btn w-100 py-2 rounded-3"
                      style={{
                        backgroundColor: '#e63946',
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      <FaPlay className="me-2" /> انضم للبث
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartStream(session)}
                      className="btn w-100 py-2 rounded-3"
                      style={{
                        backgroundColor: 'var(--success)',
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      <FaVideo className="me-2" /> ابدأ البث
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center" style={{ color: 'var(--text-light)' }}>لا توجد جلسات قادمة</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              width: '500px',
              maxWidth: '90%'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h4 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>جلسة جديدة</h4>
            
            <div className="mb-3">
              <label className="mb-2" style={{ color: 'var(--text)' }}>عنوان الجلسة</label>
              <input
                type="text"
                className="form-control"
                value={newSession.title}
                onChange={e => setNewSession({ ...newSession, title: e.target.value })}
                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <div className="mb-3">
              <label className="mb-2" style={{ color: 'var(--text)' }}>اسم الدورة</label>
              <input
                type="text"
                className="form-control"
                value={newSession.courseName}
                onChange={e => setNewSession({ ...newSession, courseName: e.target.value })}
                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <div className="mb-3">
              <label className="mb-2" style={{ color: 'var(--text)' }}>التاريخ والوقت</label>
              <input
                type="datetime-local"
                className="form-control"
                value={newSession.scheduledAt}
                onChange={e => setNewSession({ ...newSession, scheduledAt: e.target.value })}
                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <div className="mb-3">
              <label className="mb-2" style={{ color: 'var(--text)' }}>المدة (دقائق)</label>
              <input
                type="number"
                className="form-control"
                value={newSession.duration}
                onChange={e => setNewSession({ ...newSession, duration: parseInt(e.target.value) })}
                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <div className="mb-3">
              <label className="mb-2" style={{ color: 'var(--text)' }}>عدد الطلاب</label>
              <input
                type="number"
                className="form-control"
                value={newSession.studentsCount}
                onChange={e => setNewSession({ ...newSession, studentsCount: parseInt(e.target.value) })}
                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <div className="mb-4">
              <label className="mb-2" style={{ color: 'var(--text)' }}>الوصف</label>
              <textarea
                className="form-control"
                rows={3}
                value={newSession.description}
                onChange={e => setNewSession({ ...newSession, description: e.target.value })}
                style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <div className="d-flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn flex-grow-1 py-2 rounded-3"
                style={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)'
                }}
              >
                إلغاء
              </button>
              <button
                onClick={handleCreateSession}
                className="btn flex-grow-1 py-2 rounded-3"
                style={{
                  backgroundColor: 'var(--success)',
                  color: 'white',
                  border: 'none'
                }}
              >
                إنشاء جلسة
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </motion.div>
  );
};

export default LiveSessionsPage;