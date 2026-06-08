// src\instructor\pages\InstructorNotificationsPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBell, FaPaperPlane, FaInbox, FaCheckCircle, FaTrash, FaSearch,
  FaUser, FaUsers, FaComment, FaInfo, FaExclamationTriangle, FaTimes,
  FaEnvelope, FaCheck, FaBookmark
} from 'react-icons/fa';

interface Notification {
  id: string;
  type: 'system' | 'admin' | 'course' | 'exam' | 'student';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  isStarred?: boolean;
  from?: string;
  to?: string[];
}

interface Student {
  id: string;
  name: string;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'admin', title: 'تحديث في السياسة التعليمية', message: 'تم تحديث سياسة المحتوى التعليمي الجديد. يرجى مراجعة التغييرات قبل نشر أي محتوى جديد.', time: 'منذ ساعة', isRead: false, from: 'الإدارة' },
  { id: '2', type: 'system', title: 'صيانة النظام المجدولة', message: 'سيتم إجراء صيانة للنظام يوم الجمعة من الساعة 2-4 صباحاً. قد تتأثر بعض الخدمات مؤقتاً.', time: 'منذ 3 ساعات', isRead: false, from: 'النظام' },
  { id: '3', type: 'student', title: 'استفسار من طالب', message: 'أحمد محمد يسأل عن موعد الدرس القادم في دورة التواصل AAC', time: 'منذ 5 ساعات', isRead: true, from: 'أحمد محمد' },
  { id: '4', type: 'course', title: 'دورة جديدة تم اعتمادها', message: 'تم اعتماد دورتك "مهارات اجتماعية للمبتدئين" بنجاح ويمكن الآن نشرها للطلاب.', time: 'منذ يوم', isRead: true, from: 'النظام' },
  { id: '5', type: 'exam', title: 'lk', message: 'خالد عمر أكمل اختبار "اختبار الفصل الأول" وحصل على درجة 95%', time: 'منذ يوم', isRead: true },
  { id: '6', type: 'admin', title: 'طلب مراجعة محتوى', message: 'يرجى مراجعة الدروس الجديدة في قسم "أنواع الأجهزة" قبل نشرها للطلاب.', time: 'منذ يومين', isRead: true, from: 'الإدارة' },
  { id: '7', type: 'system', title: 'تنبيه أسبوعي', message: 'لديك 3 دروس قيد المراجعة و5 طلاب جدد ينتظرون التسجيل.', time: 'منذ 3 أيام', isRead: true, isStarred: true },
  { id: '8', type: 'student', title: 'مراجعة الدورة', message: 'سارة علي تركت تقييم 5 نجوم لدورتك وأشادت بجودة المحتوى.', time: 'منذ 4 أيام', isRead: true, from: 'سارة علي' },
];

const mockStudents: Student[] = [
  { id: '1', name: 'أحمد محمد' },
  { id: '2', name: 'سارة علي' },
  { id: '3', name: 'خالد عمر' },
  { id: '4', name: 'فاطمة يوسف' },
  { id: '5', name: 'منى Abdullah' },
  { id: '6', name: 'علي حسن' },
  { id: '7', name: 'رانية إبراهيم' },
  { id: '8', name: 'ياسر سعيد' },
];

const InstructorNotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent'>('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Send notification state
  const [sendTo, setSendTo] = useState<'all' | 'specific'>('all');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [sentNotifications, setSentNotifications] = useState<Notification[]>([]);

  const filteredNotifications = notifications.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sentFiltered = sentNotifications.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system': return <FaInfo style={{ color: '#3b82f6' }} />;
      case 'admin': return <FaExclamationTriangle style={{ color: '#f59e0b' }} />;
      case 'student': return <FaUser style={{ color: '#8b5cf6' }} />;
      case 'course': return <FaBookmark style={{ color: '#10b981' }} />;
      case 'exam': return <FaCheckCircle style={{ color: '#ec4899' }} />;
      default: return <FaBell style={{ color: 'var(--text-light)' }} />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'system': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' };
      case 'admin': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'student': return { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' };
      case 'course': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' };
      case 'exam': return { bg: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' };
      default: return { bg: 'var(--surface-elevated)', color: 'var(--text-light)' };
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleStar = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isStarred: !n.isStarred } : n));
  };

  const handleDelete = (id: string) => {
    if (activeTab === 'inbox') {
      setNotifications(notifications.filter(n => n.id !== id));
    } else {
      setSentNotifications(sentNotifications.filter(n => n.id !== id));
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleSendNotification = () => {
    if (notificationTitle.trim() && notificationMessage.trim()) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'admin',
        title: notificationTitle,
        message: notificationMessage,
        time: 'الآن',
        isRead: true,
        to: sendTo === 'specific' ? selectedStudents.map(id => mockStudents.find(s => s.id === id)?.name || '') : undefined
      };
      setSentNotifications([newNotification, ...sentNotifications]);
      setShowSendModal(false);
      setNotificationTitle('');
      setNotificationMessage('');
      setSelectedStudents([]);
      setSendTo('all');
    }
  };

  const viewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowDetailsModal(true);
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter(n => !n.isRead || n.isStarred));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: 'var(--text)' }}>الإشعارات</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            {unreadCount} إشعار غير مقروء
          </p>
        </div>
        <button 
          onClick={() => setShowSendModal(true)}
          className="btn d-flex align-items-center gap-2"
          style={{ backgroundColor: 'var(--primary)', color: 'white', borderRadius: '10px', padding: '10px 20px' }}
        >
          <FaPaperPlane /> إرسال إشعار
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(220, 38, 38, 0.15)' }}>
                  <FaBell style={{ color: 'var(--danger)', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>الإشعارات الجديدة</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{unreadCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(88, 204, 2, 0.15)' }}>
                  <FaPaperPlane style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>المرسلة</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{sentNotifications.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 h-100" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
                  <FaEnvelope style={{ color: '#8b5cf6', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>المفضلة</div>
                  <div className="h4 fw-bold mb-0" style={{ color: 'var(--text)' }}>{notifications.filter(n => n.isStarred).length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 mb-4">
        <button 
          onClick={() => setActiveTab('inbox')}
          className="btn px-4"
          style={{
            borderRadius: '10px',
            backgroundColor: activeTab === 'inbox' ? 'var(--primary)' : 'var(--surface-elevated)',
            color: activeTab === 'inbox' ? 'white' : 'var(--text)',
            border: '1px solid var(--border)'
          }}
        >
          <FaInbox className="ms-2" />
          الوارد ({notifications.length})
        </button>
        <button 
          onClick={() => setActiveTab('sent')}
          className="btn px-4"
          style={{
            borderRadius: '10px',
            backgroundColor: activeTab === 'sent' ? 'var(--primary)' : 'var(--surface-elevated)',
            color: activeTab === 'sent' ? 'white' : 'var(--text)',
            border: '1px solid var(--border)'
          }}
        >
          <FaPaperPlane className="ms-2" />
          المرسلة ({sentNotifications.length})
        </button>
      </div>

      <div className="card border-0 mb-4" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
        <div className="card-body p-4">
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative flex-grow-1">
              <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="البحث في الإشعارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', paddingRight: '40px' }}
              />
            </div>
            {activeTab === 'inbox' && unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="btn d-flex align-items-center gap-2"
                style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', border: '1px solid var(--border)', padding: '10px 16px' }}
              >
                <FaCheck /> تحديد الكل كمقروء
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {(activeTab === 'inbox' ? filteredNotifications : sentFiltered).map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card border-0"
            style={{ 
              borderRadius: '16px', 
              backgroundColor: notification.isRead ? 'var(--surface)' : 'var(--surface-elevated)',
              cursor: 'pointer',
              borderLeft: !notification.isRead ? '4px solid var(--primary)' : 'none'
            }}
            onClick={() => viewNotification(notification)}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-start gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    ...getTypeStyle(notification.type)
                  }}
                >
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h3 className="h6 fw-bold mb-1" style={{ color: 'var(--text)' }}>{notification.title}</h3>
                      <p className="mb-0" style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{notification.message}</p>
                      {notification.from && (
                        <small style={{ color: 'var(--primary)' }}>من: {notification.from}</small>
                      )}
                      {notification.to && (
                        <small style={{ color: 'var(--text-light)' }}> | إلى: {notification.to.join(', ')}</small>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      {activeTab === 'inbox' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleStar(notification.id); }}
                          className="btn p-2"
                          style={{ color: notification.isStarred ? '#fbbf24' : 'var(--text-light)' }}
                        >
                          <FaBookmark />
                        </button>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(notification.id); }}
                        className="btn p-2"
                        style={{ color: 'var(--danger)' }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <small style={{ color: 'var(--text-light)' }}>{notification.time}</small>
                </div>
                {!notification.isRead && activeTab === 'inbox' && (
                  <div 
                    className="rounded-circle"
                    style={{ width: '10px', height: '10px', backgroundColor: 'var(--primary)', flexShrink: 0 }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {(activeTab === 'inbox' ? filteredNotifications : sentFiltered).length === 0 && (
          <div className="text-center py-5">
            <FaBell style={{ fontSize: '3rem', color: 'var(--text-light)', marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-light)' }}>لا توجد إشعارات</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSendModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowSendModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '500px', width: '90%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>إرسال إشعار للطلاب</h2>
                <button onClick={() => setShowSendModal(false)} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
              </div>
              
              <div className="mb-3">
                <label className="form-label" style={{ color: 'var(--text)' }}>إرسال إلى</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input type="radio" name="sendTo" id="sendAll" checked={sendTo === 'all'} onChange={() => { setSendTo('all'); setSelectedStudents([]); }} className="form-check-input" />
                    <label className="form-check-label" style={{ color: 'var(--text)' }} htmlFor="sendAll">كل الطلاب</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" name="sendTo" id="sendSpecific" checked={sendTo === 'specific'} onChange={() => setSendTo('specific')} className="form-check-input" />
                    <label className="form-check-label" style={{ color: 'var(--text)' }} htmlFor="sendSpecific">طلاب محددين</label>
                  </div>
                </div>
              </div>

              {sendTo === 'specific' && (
                <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)', maxHeight: '150px', overflow: 'auto' }}>
                  {mockStudents.map(student => (
                    <div key={student.id} className="form-check">
                      <input 
                        type="checkbox" 
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                        className="form-check-input"
                      />
                      <label className="form-check-label" style={{ color: 'var(--text)' }} htmlFor={`student-${student.id}`}>
                        {student.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label" style={{ color: 'var(--text)' }}>عنوان الإشعار</label>
                <input
                  type="text"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  className="form-control"
                  placeholder="أدخل عنوان الإشعار"
                  style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: 'var(--text)' }}>محتوى الإشعار</label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  className="form-control"
                  rows={4}
                  placeholder="أدخل محتوى الإشعار..."
                  style={{ borderRadius: '10px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)' }}
                />
              </div>

              <div className="d-flex gap-2">
                <button 
                  onClick={() => setShowSendModal(false)}
                  className="btn flex-grow-1"
                  style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', padding: '12px' }}
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleSendNotification}
                  disabled={!notificationTitle.trim() || !notificationMessage.trim() || (sendTo === 'specific' && selectedStudents.length === 0)}
                  className="btn flex-grow-1"
                  style={{ backgroundColor: notificationTitle.trim() && notificationMessage.trim() && (sendTo === 'all' || selectedStudents.length > 0) ? 'var(--primary)' : 'var(--border)', color: 'white', borderRadius: '10px', padding: '12px' }}
                >
                  <FaPaperPlane className="ms-2" /> إرسال
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDetailsModal && selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ borderRadius: '20px', backgroundColor: 'var(--surface)', maxWidth: '500px', width: '90%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      ...getTypeStyle(selectedNotification.type)
                    }}
                  >
                    {getTypeIcon(selectedNotification.type)}
                  </div>
                  <div>
                    <h2 className="h5 fw-bold mb-0" style={{ color: 'var(--text)' }}>{selectedNotification.title}</h2>
                    {selectedNotification.from && (
                      <small style={{ color: 'var(--text-light)' }}>من: {selectedNotification.from}</small>
                    )}
                  </div>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className="btn p-2" style={{ color: 'var(--text-light)' }}><FaTimes /></button>
              </div>
              
              <div className="p-3 rounded-3 mb-4" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                <p className="mb-0" style={{ color: 'var(--text)', lineHeight: 1.6 }}>{selectedNotification.message}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <small style={{ color: 'var(--text-light)' }}>{selectedNotification.time}</small>
                <div className="d-flex gap-2">
                  {!selectedNotification.isRead && activeTab === 'inbox' && (
                    <button 
                      onClick={() => { handleMarkAsRead(selectedNotification.id); setShowDetailsModal(false); }}
                      className="btn d-flex align-items-center gap-2"
                      style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)', borderRadius: '10px', border: '1px solid var(--border)', padding: '8px 16px' }}
                    >
                      <FaCheck /> تحديد كمقروء
                    </button>
                  )}
                  <button 
                    onClick={() => { handleDelete(selectedNotification.id); setShowDetailsModal(false); }}
                    className="btn d-flex align-items-center gap-2"
                    style={{ backgroundColor: 'rgba(220, 38, 38, 0.15)', color: 'var(--danger)', borderRadius: '10px', padding: '8px 16px' }}
                  >
                    <FaTrash /> حذف
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InstructorNotificationsPage;