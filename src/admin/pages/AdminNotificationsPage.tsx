import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaPaperPlane, FaSearch, FaUserGraduate, FaChalkboardTeacher, FaGlobe, FaCogs, FaExclamationCircle, FaCheckCircle, FaTimesCircle, FaInfo, FaTrash, FaCheck, FaPlus, FaTimes } from 'react-icons/fa';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  target: 'students' | 'instructors' | 'public';
}

export interface SystemNotification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  category: string;
}

const examplePushNotifications: Notification[] = [
  {
    id: 'p1',
    type: 'info',
    title: 'درس جديد متاح',
    message: 'تم إضافة درس جديد في دورة JavaScript للمبتدئين',
    createdAt: '2024-01-15T10:30:00Z',
    read: true,
    target: 'students'
  },
  {
    id: 'p2',
    type: 'warning',
    title: 'موعد نهائي',
    message: 'تنتهي مهلة التسجيل في курс النهاية بعد 3 أيام',
    createdAt: '2024-01-14T09:00:00Z',
    read: true,
    target: 'students'
  },
  {
    id: 'p3',
    type: 'success',
    title: 'تقييم مهمة',
    message: 'تم إرسال تقييم مهمة HTML لجميع الطلاب',
    createdAt: '2024-01-13T14:30:00Z',
    read: false,
    target: 'students'
  },
  {
    id: 'p4',
    type: 'info',
    title: 'ورشة عمل جديدة',
    message: 'سيُقيم المعلم خالد ورشة عمل عن React الأسبوع القادم',
    createdAt: '2024-01-15T11:00:00Z',
    read: true,
    target: 'instructors'
  },
  {
    id: 'p5',
    type: 'warning',
    title: 'تقييمات منخفضة',
    message: 'بعض الدورات حصلت على تقييمات منخفضة - يرجى المراجعة',
    createdAt: '2024-01-14T16:00:00Z',
    read: false,
    target: 'instructors'
  },
  {
    id: 'p6',
    type: 'info',
    title: 'دورات جديدة للمراجعة',
    message: 'تم إرسال 5 دورات جديدة للموافقة',
    createdAt: '2024-01-13T10:00:00Z',
    read: true,
    target: 'instructors'
  },
  {
    id: 'p7',
    type: 'success',
    title: 'عرض خاص',
    message: 'خصم 50% على جميع الدورات في شهر رمضان',
    createdAt: '2024-01-15T08:00:00Z',
    read: true,
    target: 'public'
  },
  {
    id: 'p8',
    type: 'info',
    title: 'حدث تعليمي',
    message: 'مؤتمر التعليم الرقمي القادم - سجل الآن',
    createdAt: '2024-01-12T12:00:00Z',
    read: false,
    target: 'public'
  }
];

const exampleSystemNotifications: SystemNotification[] = [
  {
    id: 's1',
    type: 'error',
    title: 'فشل الدفع',
    message: 'فشل_payment_لمستخدم_أحمد_محمد_مبلغ_49_ريال_رقم_الطلب_#12345',
    createdAt: '2024-01-15T10:30:00Z',
    read: false,
    category: 'payments'
  },
  {
    id: 's2',
    type: 'warning',
    title: 'تنبيه التخزين',
    message: 'مساحة_التخزين_اقتربت_من_80%_يرجى_التوسع',
    createdAt: '2024-01-15T09:15:00Z',
    read: false,
    category: 'storage'
  },
  {
    id: 's3',
    type: 'error',
    title: 'خطأ في تسجيل الدخول',
    message: 'محاولات_تسجيل_فاشلة_متعددة_من_عنوان_IP_مشبوه',
    createdAt: '2024-01-14T22:00:00Z',
    read: true,
    category: 'security'
  },
  {
    id: 's4',
    type: 'info',
    title: 'نسخ احتياطي',
    message: 'تم_إنشاء_نسخة_احتياطية_يومية_بنجاح',
    createdAt: '2024-01-14T02:00:00Z',
    read: true,
    category: 'system'
  },
  {
    id: 's5',
    type: 'error',
    title: 'انتهاء اشتراك',
    message: 'اشتراك_المستخدم_سارة_علي_انتهى_يرجى_التواصل',
    createdAt: '2024-01-13T14:00:00Z',
    read: true,
    category: 'subscriptions'
  },
  {
    id: 's6',
    type: 'warning',
    title: 'توقف السيرفر',
    message: 'سيرفر_قاعدة_البيانات_توقف_مؤقتاً_جارٍ_الإصلاح',
    createdAt: '2024-01-12T18:30:00Z',
    read: true,
    category: 'system'
  },
  {
    id: 's7',
    type: 'info',
    title: 'تحديث النظام',
    message: 'تم_تحديث_النظام_إلى_الإصدار_3.1.0_بنجاح',
    createdAt: '2024-01-11T06:00:00Z',
    read: true,
    category: 'system'
  },
  {
    id: 's8',
    type: 'error',
    title: 'خطأ في رفع ملف',
    message: 'فشل_رفع_ملف_كبير_جداً_الحجم_المسموح_100MB',
    createdAt: '2024-01-10T15:00:00Z',
    read: true,
    category: 'storage'
  }
];

const typeConfig = {
  success: { icon: <FaCheckCircle />, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
  warning: { icon: <FaExclamationCircle />, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  error: { icon: <FaTimesCircle />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  info: { icon: <FaInfo />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' }
};

const targetConfig = {
  students: { icon: <FaUserGraduate />, label: 'الطلاب', color: '#8b5cf6' },
  instructors: { icon: <FaChalkboardTeacher />, label: 'المعلمون', color: '#ec4899' },
  public: { icon: <FaGlobe />, label: 'عام', color: '#06b6d4' }
};

const categoryLabels: Record<string, string> = {
  payments: 'الدفع',
  storage: 'التخزين',
  security: 'الأمان',
  system: 'النظام',
  subscriptions: 'الاشتراكات'
};

type PushTabType = 'students' | 'instructors' | 'public';
type ViewType = 'push' | 'received';

const AdminNotificationsPage = () => {
  const [pushNotifications, setPushNotifications] = useState<Notification[]>(examplePushNotifications);
  const [systemNotifications, setSystemNotifications] = useState<SystemNotification[]>(exampleSystemNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | SystemNotification | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<ViewType>('push');
  const [activePushTab, setActivePushTab] = useState<PushTabType>('students');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'warning' | 'error' | 'info',
    target: 'students' as 'students' | 'instructors' | 'public'
  });

  const handleMarkAsRead = (id: string, isSystem: boolean) => {
    if (isSystem) {
      setSystemNotifications(systemNotifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } else {
      setPushNotifications(pushNotifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    }
  };

  const handleDelete = (id: string, isSystem: boolean) => {
    if (confirm('هل أنت متأكد من حذف هذه الإشعار؟')) {
      if (isSystem) {
        setSystemNotifications(systemNotifications.filter(n => n.id !== id));
      } else {
        setPushNotifications(pushNotifications.filter(n => n.id !== id));
      }
      setSelectedNotification(null);
    }
  };

  const handleCreateNotification = () => {
    if (!newNotification.title.trim() || !newNotification.message.trim()) {
      alert('الرجاء إدخال العنوان والرسالة');
      return;
    }

    const notification: Notification = {
      id: 'p' + Date.now(),
      type: newNotification.type,
      title: newNotification.title,
      message: newNotification.message,
      createdAt: new Date().toISOString(),
      read: false,
      target: newNotification.target
    };

    setPushNotifications([notification, ...pushNotifications]);
    setShowCreateModal(false);
    setNewNotification({ title: '', message: '', type: 'info', target: 'students' });
    alert('تم إرسال الإشعار بنجاح!');
  };

  const filteredPushNotifications = pushNotifications
    .filter(n => n.target === activePushTab)
    .filter(n => n.title.includes(searchTerm) || n.message.includes(searchTerm));

  const filteredSystemNotifications = systemNotifications
    .filter(n => n.title.includes(searchTerm) || n.message.includes(searchTerm));

  const renderPushList = () => (
    <div className="col-lg-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card border-0"
        style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}
      >
        <div className="p-3 border-bottom" style={{ borderColor: 'var(--border)' }}>
          <div className="position-relative">
            <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input
              type="text"
              placeholder="بحث في الإشعارات..."
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

        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {filteredPushNotifications.length === 0 ? (
            <div className="text-center p-4" style={{ color: 'var(--text-light)' }}>
              <FaBell size={40} className="mb-3" />
              <p>لا توجد إشعارات</p>
            </div>
          ) : (
            filteredPushNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => {
                  setSelectedNotification(notification);
                  if (!notification.read) handleMarkAsRead(notification.id, false);
                }}
                className="p-3 border-bottom"
                style={{ 
                  borderColor: 'var(--border)',
                  cursor: 'pointer',
                  backgroundColor: selectedNotification?.id === notification.id ? 'var(--surface-elevated)' : 'transparent',
                  borderRight: selectedNotification?.id === notification.id ? `3px solid ${targetConfig[notification.target].color}` : '3px solid transparent'
                }}
              >
                <div className="d-flex align-items-start gap-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: typeConfig[notification.type].bg,
                      color: typeConfig[notification.type].color
                    }}
                  >
                    {typeConfig[notification.type].icon}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <span className="fw-bold" style={{ color: 'var(--text)' }}>{notification.title}</span>
                      {!notification.read && (
                        <span className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: 'var(--primary)' }} />
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
                        {new Date(notification.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );

  const renderSystemList = () => (
    <div className="col-lg-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card border-0"
        style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}
      >
        <div className="p-3 border-bottom" style={{ borderColor: 'var(--border)' }}>
          <div className="position-relative">
            <FaSearch className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input
              type="text"
              placeholder="بحث في الإشعارات..."
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

        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {filteredSystemNotifications.length === 0 ? (
            <div className="text-center p-4" style={{ color: 'var(--text-light)' }}>
              <FaBell size={40} className="mb-3" />
              <p>لا توجد إشعارات</p>
            </div>
          ) : (
            filteredSystemNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => {
                  setSelectedNotification(notification);
                  if (!notification.read) handleMarkAsRead(notification.id, true);
                }}
                className="p-3 border-bottom"
                style={{ 
                  borderColor: 'var(--border)',
                  cursor: 'pointer',
                  backgroundColor: selectedNotification?.id === notification.id ? 'var(--surface-elevated)' : 'transparent',
                  borderRight: selectedNotification?.id === notification.id ? `3px solid ${typeConfig[notification.type].color}` : '3px solid transparent'
                }}
              >
                <div className="d-flex align-items-start gap-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: typeConfig[notification.type].bg,
                      color: typeConfig[notification.type].color
                    }}
                  >
                    {typeConfig[notification.type].icon}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <span className="fw-bold" style={{ color: 'var(--text)' }}>{notification.title}</span>
                      {!notification.read && (
                        <span className="rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: 'var(--primary)' }} />
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <span 
                        className="badge"
                        style={{ 
                          backgroundColor: 'rgba(100, 116, 139, 0.15)', 
                          color: '#64748b',
                          fontSize: '0.75rem'
                        }}
                      >
                        {categoryLabels[notification.category] || notification.category}
                      </span>
                      <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                        {new Date(notification.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );

  const renderDetail = (notification: Notification | SystemNotification, isSystem: boolean) => {
    const sysNotif = notification as SystemNotification;
    const pushNotif = notification as Notification;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card border-0 p-4"
        style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}
      >
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: typeConfig[notification.type].bg,
                color: typeConfig[notification.type].color
              }}
            >
              {typeConfig[notification.type].icon}
            </div>
            <div>
              <h4 className="fw-bold mb-1" style={{ color: 'var(--text)' }}>{notification.title}</h4>
              <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                {new Date(notification.createdAt).toLocaleString('ar-SA')}
              </span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={() => handleMarkAsRead(notification.id, isSystem)}
              className="btn d-flex align-items-center gap-2"
              style={{ 
                backgroundColor: 'var(--surface-elevated)', 
                border: '1px solid var(--border)',
                borderRadius: '10px'
              }}
            >
              <FaCheck style={{ color: 'var(--primary)' }} />
              <span style={{ color: 'var(--text)' }}>تمييز كمقروء</span>
            </button>
            <button
              onClick={() => handleDelete(notification.id, isSystem)}
              className="btn d-flex align-items-center gap-2"
              style={{ 
                backgroundColor: 'rgba(220, 53, 69, 0.1)', 
                border: '1px solid var(--danger)',
                borderRadius: '10px'
              }}
            >
              <FaTrash style={{ color: 'var(--danger)' }} />
              <span style={{ color: 'var(--danger)' }}>حذف</span>
            </button>
          </div>
        </div>

        {isSystem ? (
          <div className="mb-3">
            <span 
              className="badge"
              style={{ 
                backgroundColor: 'rgba(100, 116, 139, 0.15)', 
                color: '#64748b',
                padding: '8px 16px',
                borderRadius: '20px'
              }}
            >
              <FaCogs className="me-2" />
              {categoryLabels[sysNotif.category] || sysNotif.category}
            </span>
          </div>
        ) : (
          <div className="mb-3">
            <span 
              className="badge d-flex align-items-center gap-2"
              style={{ 
                backgroundColor: `${targetConfig[pushNotif.target].color}20`, 
                color: targetConfig[pushNotif.target].color,
                padding: '8px 16px',
                borderRadius: '20px'
              }}
            >
              {targetConfig[pushNotif.target].icon}
              {targetConfig[pushNotif.target].label}
            </span>
          </div>
        )}

        <div 
          className="p-4"
          style={{ 
            backgroundColor: 'var(--surface-elevated)', 
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}
        >
          <p className="mb-0" style={{ color: 'var(--text)', lineHeight: '1.8' }}>
            {notification.message}
          </p>
        </div>
      </motion.div>
    );
  };

  const pushTabs: { id: PushTabType; label: string; icon: JSX.Element; color: string }[] = [
    { id: 'students', label: 'الطلاب', icon: <FaUserGraduate />, color: '#8b5cf6' },
    { id: 'instructors', label: 'المعلمون', icon: <FaChalkboardTeacher />, color: '#ec4899' },
    { id: 'public', label: 'عام', icon: <FaGlobe />, color: '#06b6d4' }
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="d-flex justify-content-between align-items-center mb-4"
      >
        <div>
          <h2 className="fw-bold" style={{ color: 'var(--text)' }}>الإشعارات</h2>
          <p style={{ color: 'var(--text-light)' }}>
            {activeView === 'push' 
              ? `${pushNotifications.filter(n => !n.read).length} إشعار غير مقروء (مرسل)`
              : `${systemNotifications.filter(n => !n.read).length} إشعار غير مقروء (مستلم)`
            }
          </p>
        </div>
        {activeView === 'push' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn d-flex align-items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px'
            }}
          >
            <FaPlus />
            <span>إنشاء إشعار</span>
          </button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 d-flex gap-3"
      >
        <button
          onClick={() => {
            setActiveView('push');
            setSelectedNotification(null);
            setSearchTerm('');
          }}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeView === 'push' ? 'var(--primary)' : 'var(--surface)',
            color: activeView === 'push' ? 'white' : 'var(--text)',
            border: `2px solid ${activeView === 'push' ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaBell />
          <span> إشعارات المستخدمين</span>
          <span 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ 
              width: '20px', 
              height: '20px', 
              fontSize: '0.75rem',
              backgroundColor: activeView === 'push' ? 'rgba(255,255,255,0.3)' : 'var(--secondary)',
              color: 'white'
            }}
          >
            {pushNotifications.filter(n => !n.read).length}
          </span>
        </button>
        <button
          onClick={() => {
            setActiveView('received');
            setSelectedNotification(null);
            setSearchTerm('');
          }}
          className="btn d-flex align-items-center gap-2 px-4 py-2"
          style={{
            backgroundColor: activeView === 'received' ? 'var(--secondary)' : 'var(--surface)',
            color: activeView === 'received' ? 'white' : 'var(--text)',
            border: `2px solid ${activeView === 'received' ? 'var(--secondary)' : 'var(--border)'}`,
            borderRadius: '12px'
          }}
        >
          <FaBell />
          <span>إشعارات النظام</span>
          <span 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ 
              width: '20px', 
              height: '20px', 
              fontSize: '0.75rem',
              backgroundColor: activeView === 'received' ? 'rgba(255,255,255,0.3)' : 'var(--danger)',
              color: 'white'
            }}
          >
            {systemNotifications.filter(n => !n.read).length}
          </span>
        </button>
      </motion.div>

      {activeView === 'push' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 d-flex gap-2"
        >
          {pushTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActivePushTab(tab.id);
                setSelectedNotification(null);
              }}
              className="btn d-flex align-items-center gap-2 px-3 py-2"
              style={{
                backgroundColor: activePushTab === tab.id ? tab.color : 'var(--surface)',
                color: activePushTab === tab.id ? 'white' : 'var(--text)',
                border: `2px solid ${activePushTab === tab.id ? tab.color : 'var(--border)'}`,
                borderRadius: '10px'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: '18px', 
                  height: '18px', 
                  fontSize: '0.7rem',
                  backgroundColor: activePushTab === tab.id ? 'rgba(255,255,255,0.3)' : 'var(--primary)',
                  color: 'white'
                }}
              >
                {pushNotifications.filter(n => n.target === tab.id && !n.read).length}
              </span>
            </button>
          ))}
        </motion.div>
      )}

      <div className="row">
        {activeView === 'push' ? renderPushList() : renderSystemList()}
        
        <div className="col-lg-7">
          {selectedNotification ? (
            renderDetail(selectedNotification, activeView === 'received')
          ) : (
            <div 
              className="card border-0 d-flex align-items-center justify-content-center"
              style={{ borderRadius: '16px', backgroundColor: 'var(--surface)', height: '400px' }}
            >
              <div className="text-center" style={{ color: 'var(--text-light)' }}>
                <FaBell size={48} className="mb-3" />
                <p>اختر إشعار لعرض محتواها</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed d-flex align-items-center justify-content-center"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9999
            }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card border-0 p-4"
              style={{ 
                borderRadius: '20px', 
                backgroundColor: 'var(--surface)',
                width: '100%',
                maxWidth: '500px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold" style={{ color: 'var(--text)' }}>إنشاء إشعار جديد</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <FaTimes style={{ color: 'var(--text-light)' }} />
                </button>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>العنوان</label>
                <input
                  type="text"
                  className="form-control p-3"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  placeholder="أدخل عنوان الإشعار"
                  style={{ 
                    borderRadius: '12px', 
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)'
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الرسالة</label>
                <textarea
                  className="form-control p-3"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  placeholder="أدخل رسالة الإشعار"
                  rows={4}
                  style={{ 
                    borderRadius: '12px', 
                    border: '2px solid var(--border)',
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--text)',
                    resize: 'none'
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>نوع الإشعار</label>
                <div className="d-flex gap-2">
                  {(['info', 'success', 'warning', 'error'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setNewNotification({ ...newNotification, type })}
                      className="btn flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                      style={{
                        backgroundColor: newNotification.type === type ? typeConfig[type].color : 'var(--surface-elevated)',
                        color: newNotification.type === type ? 'white' : 'var(--text)',
                        border: `2px solid ${newNotification.type === type ? typeConfig[type].color : 'var(--border)'}`,
                        borderRadius: '10px'
                      }}
                    >
                      {typeConfig[type].icon}
                      {type === 'info' ? 'معلومات' : type === 'success' ? 'نجاح' : type === 'warning' ? 'تحذير' : 'خطأ'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>الإرسال إلى</label>
                <div className="d-flex gap-2">
                  {(['students', 'instructors', 'public'] as const).map(target => (
                    <button
                      key={target}
                      onClick={() => setNewNotification({ ...newNotification, target })}
                      className="btn flex-fill d-flex align-items-center justify-content-center gap-2 py-2"
                      style={{
                        backgroundColor: newNotification.target === target ? targetConfig[target].color : 'var(--surface-elevated)',
                        color: newNotification.target === target ? 'white' : 'var(--text)',
                        border: `2px solid ${newNotification.target === target ? targetConfig[target].color : 'var(--border)'}`,
                        borderRadius: '10px'
                      }}
                    >
                      {targetConfig[target].icon}
                      {targetConfig[target].label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCreateNotification}
                className="btn w-100 py-3"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }}
              >
                <FaPaperPlane className="me-2" />
                إرسال الإشعار
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNotificationsPage;