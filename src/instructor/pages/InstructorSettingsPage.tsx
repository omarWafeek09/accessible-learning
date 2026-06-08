import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaBell, FaMoon, FaLanguage, FaUserShield, FaEdit, FaSave, FaCamera } from 'react-icons/fa';

const InstructorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    bio: 'مدرب متخصص في التواصل المدعوم وأطفال التوحد',
    specialization: 'التواصل المدعوم (AAC)',
    experience: '5 سنوات'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    newStudent: true,
    newMessage: true,
    sessionReminder: true,
    courseUpdates: false
  });
  const [appearance, setAppearance] = useState({
    darkMode: true,
    language: 'ar',
    fontSize: 'medium'
  });

  const tabs = [
    { id: 'profile', icon: <FaUser />, label: 'الملف الشخصي' },
    { id: 'security', icon: <FaLock />, label: 'الأمان' },
    { id: 'notifications', icon: <FaBell />, label: 'الإشعارات' },
    { id: 'appearance', icon: <FaMoon />, label: 'المظهر' }
  ];

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>الإعدادات</h2>

      <div className="row g-4">
        <div className="col-lg-3">
          <div 
            className="p-3 rounded-4"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)'
            }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-100 d-flex align-items-center gap-3 mb-2 p-3 rounded-3"
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--success)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--text-light)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-lg-9">
          {activeTab === 'profile' && (
            <div 
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="fw-bold m-0" style={{ color: 'var(--text)' }}>الملف الشخصي</h4>
                <button
                  onClick={handleSaveProfile}
                  className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-3"
                  style={{ backgroundColor: 'var(--success)', color: 'white', border: 'none' }}
                >
                  <FaSave /> حفظ
                </button>
              </div>

              <div className="text-center mb-4">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center position-relative"
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: 'var(--success)'
                  }}
                >
                  <span style={{ fontSize: '3rem', color: 'white' }}>{profile.name.charAt(0)}</span>
                  <button
                    className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      bottom: '0',
                      right: '0',
                      width: '36px',
                      height: '36px',
                      backgroundColor: 'var(--surface-elevated)',
                      border: '2px solid var(--surface)',
                      cursor: 'pointer'
                    }}
                  >
                    <FaCamera style={{ color: 'var(--text)' }} />
                  </button>
                </div>
                <p className="mt-2" style={{ color: 'var(--text-light)' }}>الصورة الشخصية</p>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="mb-2" style={{ color: 'var(--text)' }}>الاسم</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="mb-2" style={{ color: 'var(--text)' }}>البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="mb-2" style={{ color: 'var(--text)' }}>رقم الهاتف</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="mb-2" style={{ color: 'var(--text)' }}>التخصص</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.specialization}
                    onChange={e => setProfile({ ...profile, specialization: e.target.value })}
                    style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="mb-2" style={{ color: 'var(--text)' }}>سنوات الخبرة</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.experience}
                    onChange={e => setProfile({ ...profile, experience: e.target.value })}
                    style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div className="col-12">
                  <label className="mb-2" style={{ color: 'var(--text)' }}>النبذة الشخصية</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={profile.bio}
                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                    style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div 
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <h4 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>الأمان</h4>

              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>تغيير كلمة المرور</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="mb-2" style={{ color: 'var(--text)' }}>كلمة المرور الحالية</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="أدخل كلمة المرور الحالية"
                      style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="mb-2" style={{ color: 'var(--text)' }}>كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="أدخل كلمة المرور الجديدة"
                      style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="mb-2" style={{ color: 'var(--text)' }}>تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="أعد إدخال كلمة المرور"
                      style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn px-4 py-2 rounded-3"
                      style={{ backgroundColor: 'var(--success)', color: 'white', border: 'none' }}
                    >
                      تحديث كلمة المرور
                    </button>
                  </div>
                </div>
              </div>

              <hr style={{ borderColor: 'var(--border)' }} />

              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>المصادقة الثنائية</h5>
                <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '40px', height: '40px', backgroundColor: 'var(--success)', color: 'white' }}
                    >
                      <FaUserShield />
                    </div>
                    <div>
                      <p className="mb-0 fw-medium" style={{ color: 'var(--text)' }}>مصادقة ثنائية</p>
                      <small style={{ color: 'var(--text-light)' }}>إضافة طبقة أمان إضافية لحسابك</small>
                    </div>
                  </div>
                  <button
                    className="btn px-3 py-1 rounded-3"
                    style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  >
                    تفعيل
                  </button>
                </div>
              </div>

              <hr style={{ borderColor: 'var(--border)' }} />

              <div>
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>الجلسات النشطة</h5>
                <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                  <div>
                    <p className="mb-0 fw-medium" style={{ color: 'var(--text)' }}>هذا الجهاز</p>
                    <small style={{ color: 'var(--text-light)' }}>آخر نشاط: الآن</small>
                  </div>
                  <button
                    className="btn px-3 py-1 rounded-3"
                    style={{ backgroundColor: 'var(--danger)', color: 'white', border: 'none' }}
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div 
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <h4 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>الإعدادات الإشعارانية</h4>

              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>طرق الاستلام</h5>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                    <div className="d-flex align-items-center gap-3">
                      <FaBell style={{ color: 'var(--text-light)' }} />
                      <span style={{ color: 'var(--text)' }}>البريد الإلكتروني</span>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                    <div className="d-flex align-items-center gap-3">
                      <FaBell style={{ color: 'var(--text-light)' }} />
                      <span style={{ color: 'var(--text)' }}>الرسائل النصية</span>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr style={{ borderColor: 'var(--border)' }} />

              <div>
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>أنواع الإشعارات</h5>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text)' }}>طالب جديد</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notifications.newStudent}
                        onChange={() => setNotifications({ ...notifications, newStudent: !notifications.newStudent })}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text)' }}>رسالة جديدة</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notifications.newMessage}
                        onChange={() => setNotifications({ ...notifications, newMessage: !notifications.newMessage })}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text)' }}>تذكير بالجلسات</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notifications.sessionReminder}
                        onChange={() => setNotifications({ ...notifications, sessionReminder: !notifications.sessionReminder })}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text)' }}>تحديثات الدورات</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notifications.courseUpdates}
                        onChange={() => setNotifications({ ...notifications, courseUpdates: !notifications.courseUpdates })}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div 
              className="p-4 rounded-4"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)'
              }}
            >
              <h4 className="mb-4 fw-bold" style={{ color: 'var(--text)' }}>المظهر</h4>

              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>الوضع</h5>
                <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}>
                  <div className="d-flex align-items-center gap-3">
                    <FaMoon style={{ color: 'var(--text-light)' }} />
                    <span style={{ color: 'var(--text)' }}>الوضع الداكن</span>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={appearance.darkMode}
                      onChange={() => setAppearance({ ...appearance, darkMode: !appearance.darkMode })}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>

              <hr style={{ borderColor: 'var(--border)' }} />

              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>اللغة</h5>
                <select
                  className="form-select"
                  value={appearance.language}
                  onChange={e => setAppearance({ ...appearance, language: e.target.value })}
                  style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              <hr style={{ borderColor: 'var(--border)' }} />

              <div>
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>حجم الخط</h5>
                <div className="d-flex gap-3">
                  {['small', 'medium', 'large'].map(size => (
                    <button
                      key={size}
                      onClick={() => setAppearance({ ...appearance, fontSize: size })}
                      className="flex-fill py-2 rounded-3"
                      style={{
                        backgroundColor: appearance.fontSize === size ? 'var(--success)' : 'var(--background)',
                        color: appearance.fontSize === size ? 'white' : 'var(--text)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      {size === 'small' ? 'صغير' : size === 'medium' ? 'متوسط' : 'كبير'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InstructorSettingsPage;