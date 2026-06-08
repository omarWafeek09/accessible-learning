// src\admin\pages\AdminSettingsPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPalette, FaPhone, FaMoneyBillWave, FaLanguage, FaSave, FaCheck,
  FaMoon, FaSun, FaTint, FaGlobe, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  success: string;
  warning: string;
  danger: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

interface Settings {
  theme: 'light' | 'dark' | 'system';
  colors: ThemeColors;
  contact: ContactInfo;
  currency: string;
  currencySymbol: string;
  language: string;
  rtl: boolean;
}

const defaultSettings: Settings = {
  theme: 'system',
  colors: {
    primary: '#58cc02',
    secondary: '#ff9600',
    accent: '#8b5cf6',
    background: '#ffffff',
    surface: '#f7f7f5',
    text: '#1a1a1a',
    success: '#58cc02',
    warning: '#ff9600',
    danger: '#dc3545'
  },
  contact: {
    email: 'info@accessible-learning.com',
    phone: '+966 50 123 4567',
    address: 'الرياض، المملكة العربية السعودية',
    website: 'www.accessible-learning.com',
    facebook: 'accessible.learning',
    twitter: '@accessible_learn',
    instagram: '@accessible.learning'
  },
  currency: 'SAR',
  currencySymbol: 'جنيه',
  language: 'ar',
  rtl: true
};

const currencyOptions = [
  { code: 'SAR', name: 'ريال سعودي', symbol: 'جنيه' },
  { code: 'USD', name: 'دولار أمريكي', symbol: '$' },
  { code: 'EUR', name: 'يورو', symbol: '€' },
  { code: 'GBP', name: 'جنيه إسترليني', symbol: '£' },
  { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' },
  { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م' },
  { code: 'KWD', name: 'دينار كويتي', symbol: 'د.ك' },
  { code: 'QAR', name: 'ريال قطري', symbol: 'ر.ق' },
];

const languageOptions = [
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'es', name: 'الإسبانية', dir: 'ltr' },
  { code: 'tr', name: 'التركية', dir: 'ltr' },
];

interface ColorPalette {
  name: string;
  colors: ThemeColors;
}

const colorPalettes: ColorPalette[] = [
  {
    name: 'أخضر طبيعي',
    colors: {
      primary: '#58cc02',
      secondary: '#ff9600',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#f7f7f5',
      text: '#1a1a1a',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  {
    name: 'أزرق مياه',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0c4a6e',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  {
    name: 'بنفسجي ملكي',
    colors: {
      primary: '#8b5cf6',
      secondary: '#d946ef',
      accent: '#f97316',
      background: '#faf5ff',
      surface: '#ffffff',
      text: '#581c87',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  {
    name: 'وردي دافئ',
    colors: {
      primary: '#ec4899',
      secondary: '#f472b6',
      accent: '#8b5cf6',
      background: '#fdf2f8',
      surface: '#ffffff',
      text: '#831843',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  {
    name: 'برتقالي دافي',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#06b6d4',
      background: '#fff7ed',
      surface: '#ffffff',
      text: '#7c2d12',
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  {
    name: 'أزرق داكن',
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#06b6d4',
      background: '#eff6ff',
      surface: '#ffffff',
      text: '#1e3a8a',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626'
    }
  },
  {
    name: 'ذهبي فاخر',
    colors: {
      primary: '#d97706',
      secondary: '#fbbf24',
      accent: '#8b5cf6',
      background: '#fffbeb',
      surface: '#ffffff',
      text: '#78350f',
      success: '#059669',
      warning: '#f59e0b',
      danger: '#dc2626'
    }
  },
  {
    name: 'أحمر نبض',
    colors: {
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#8b5cf6',
      background: '#fef2f2',
      surface: '#ffffff',
      text: '#7f1d1d',
      success: '#16a34a',
      warning: '#f59e0b',
      danger: '#dc2626'
    }
  },
  {
    name: 'أخضر زمرد',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#3b82f6',
      background: '#ecfdf5',
      surface: '#ffffff',
      text: '#064e3b',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  {
    name: 'رمادي عصري',
    colors: {
      primary: '#4b5563',
      secondary: '#6b7280',
      accent: '#8b5cf6',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#1f2937',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444'
    }
  },
  {
    name: 'داكن ليلي',
    colors: {
      primary: '#6366f1',
      secondary: '#818cf8',
      accent: '#22d3ee',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      success: '#34d399',
      warning: '#fbbf24',
      danger: '#f87171'
    }
  },
  {
    name: 'أحادي اللون',
    colors: {
      primary: '#171717',
      secondary: '#404040',
      accent: '#525252',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#171717',
      success: '#22c55e',
      warning: '#eab308',
      danger: '#ef4444'
    }
  }
];

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'theme' | 'contact' | 'currency' | 'language'>('theme');
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setSettings({ ...settings, colors: { ...settings.colors, [key]: value } });
  };

  const updateContact = (key: keyof ContactInfo, value: string) => {
    setSettings({ ...settings, contact: { ...settings.contact, [key]: value } });
  };

  const tabs = [
    { id: 'theme', label: 'المظهر والألوان', icon: <FaPalette /> },
    { id: 'contact', label: 'معلومات الاتصال', icon: <FaPhone /> },
    { id: 'currency', label: 'العملة', icon: <FaMoneyBillWave /> },
    { id: 'language', label: 'اللغة', icon: <FaLanguage /> },
  ];

  return (
    <div dir={settings.rtl ? 'rtl' : 'ltr'}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: 'var(--text)' }}>الإعدادات</h1>
          <p style={{ color: 'var(--text-light)' }}>
            تخصيص مظهر ومتغيرات الموقع
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="btn d-flex align-items-center gap-2"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: '10px',
            padding: '10px 24px'
          }}
        >
          <FaSave />
          حفظ التغييرات
        </button>
      </div>

      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="position-fixed top-0 start-50 translate-middle-x"
            style={{ 
              top: '20px', 
              zIndex: 2000,
              backgroundColor: 'var(--success)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaCheck /> تم حفظ الإعدادات بنجاح
          </motion.div>
        )}
      </AnimatePresence>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-3">
              <div className="d-flex flex-column gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className="btn d-flex align-items-center gap-3 p-3"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                      color: activeTab === tab.id ? 'white' : 'var(--text)',
                      textAlign: 'right',
                      justifyContent: 'flex-start'
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card border-0" style={{ borderRadius: '16px', backgroundColor: 'var(--surface)' }}>
            <div className="card-body p-4">
              {activeTab === 'theme' && (
                <div>
                  <h2 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                    <FaPalette className="ms-2" />
                    المظهر والألوان
                  </h2>

                  <div className="mb-4">
                    <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>وضع السمة</label>
                    <div className="d-flex gap-3">
                      {[
                        { id: 'light', label: 'فاتح', icon: <FaSun /> },
                        { id: 'dark', label: 'داكن', icon: <FaMoon /> },
                        { id: 'system', label: 'النظام', icon: <FaGlobe /> },
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => setSettings({ ...settings, theme: mode.id as 'light' | 'dark' | 'system' })}
                          className="btn flex-fill d-flex align-items-center justify-content-center gap-2 p-3"
                          style={{
                            borderRadius: '12px',
                            backgroundColor: settings.theme === mode.id ? 'var(--primary)' : 'var(--surface-elevated)',
                            color: settings.theme === mode.id ? 'white' : 'var(--text)',
                            border: `2px solid ${settings.theme === mode.id ? 'var(--primary)' : 'var(--border)'}`
                          }}
                        >
                          {mode.icon}
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>لوحات ألوان جاهزة</label>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {colorPalettes.map((palette) => (
                        <button
                          key={palette.name}
                          onClick={() => setSettings({ ...settings, colors: palette.colors })}
                          className="btn p-2 d-flex align-items-center gap-2"
                          style={{
                            borderRadius: '12px',
                            backgroundColor: 'var(--surface-elevated)',
                            border: `2px solid ${JSON.stringify(settings.colors) === JSON.stringify(palette.colors) ? settings.colors.primary : 'var(--border)'}`,
                            color: 'var(--text)'
                          }}
                        >
                          <div className="d-flex gap-1">
                            <span className="rounded-circle" style={{ width: '16px', height: '16px', backgroundColor: palette.colors.primary }} />
                            <span className="rounded-circle" style={{ width: '16px', height: '16px', backgroundColor: palette.colors.secondary }} />
                            <span className="rounded-circle" style={{ width: '16px', height: '16px', backgroundColor: palette.colors.accent }} />
                          </div>
                          <span style={{ fontSize: '0.85rem' }}>{palette.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold" style={{ color: 'var(--text)' }}>لوحة الألوان المخصصة</label>
                    <div className="row g-3">
                      {Object.entries(settings.colors).map(([key, value]) => (
                        <div key={key} className="col-md-6">
                          <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                            <input
                              type="color"
                              value={value}
                              onChange={(e) => updateColor(key as keyof ThemeColors, e.target.value)}
                              className="form-control"
                              style={{ 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '10px',
                                padding: '2px',
                                cursor: 'pointer'
                              }}
                            />
                            <div className="flex-grow-1">
                              <div className="fw-bold" style={{ color: 'var(--text)' }}>
                                {key === 'primary' && 'اللون الأساسي'}
                                {key === 'secondary' && 'اللونSecondary'}
                                {key === 'accent' && 'لون التمييز'}
                                {key === 'background' && 'الخلفية'}
                                {key === 'surface' && 'السطح'}
                                {key === 'text' && 'النص'}
                                {key === 'success' && 'نجاح'}
                                {key === 'warning' && 'تحذير'}
                                {key === 'danger' && 'خطر'}
                              </div>
                              <div className="small" style={{ color: 'var(--text-light)' }}>{value}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-4" style={{ backgroundColor: settings.colors.primary + '20' }}>
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>معاينة الألوان</h3>
                    <div className="d-flex gap-3 flex-wrap">
                      <button className="btn" style={{ backgroundColor: settings.colors.primary, color: 'white', borderRadius: '8px' }}>
                        زر أساسي
                      </button>
                      <button className="btn" style={{ backgroundColor: settings.colors.secondary, color: 'white', borderRadius: '8px' }}>
                        Secondary
                      </button>
                      <button className="btn" style={{ backgroundColor: settings.colors.accent, color: 'white', borderRadius: '8px' }}>
                        تمييز
                      </button>
                      <span className="px-3 py-2 rounded-3" style={{ backgroundColor: settings.colors.success, color: 'white' }}>
                        نجاح
                      </span>
                      <span className="px-3 py-2 rounded-3" style={{ backgroundColor: settings.colors.warning, color: 'white' }}>
                        تحذير
                      </span>
                      <span className="px-3 py-2 rounded-3" style={{ backgroundColor: settings.colors.danger, color: 'white' }}>
                        خطر
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div>
                  <h2 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                    <FaPhone className="ms-2" />
                    معلومات الاتصال
                  </h2>

                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: 'var(--text)' }}>البريد الإلكتروني</label>
                      <div className="position-relative">
                        <FaEnvelope className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input
                          type="email"
                          value={settings.contact.email}
                          onChange={(e) => updateContact('email', e.target.value)}
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
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: 'var(--text)' }}>الهاتف</label>
                      <div className="position-relative">
                        <FaPhone className="position-absolute" style={{ top: '50%', right: '12px', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input
                          type="tel"
                          value={settings.contact.phone}
                          onChange={(e) => updateContact('phone', e.target.value)}
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
                    <div className="col-12">
                      <label className="form-label" style={{ color: 'var(--text)' }}>العنوان</label>
                      <div className="position-relative">
                        <FaMapMarkerAlt className="position-absolute" style={{ top: '16px', right: '12px', color: 'var(--text-light)' }} />
                        <textarea
                          value={settings.contact.address}
                          onChange={(e) => updateContact('address', e.target.value)}
                          className="form-control"
                          rows={2}
                          style={{ 
                            borderRadius: '10px', 
                            backgroundColor: 'var(--surface-elevated)',
                            border: '1px solid var(--border)',
                            paddingRight: '40px'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: 'var(--text)' }}>الموقع الإلكتروني</label>
                      <input
                        type="text"
                        value={settings.contact.website}
                        onChange={(e) => updateContact('website', e.target.value)}
                        className="form-control"
                        style={{ 
                          borderRadius: '10px', 
                          backgroundColor: 'var(--surface-elevated)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: 'var(--text)' }}>الفيسبوك</label>
                      <input
                        type="text"
                        value={settings.contact.facebook}
                        onChange={(e) => updateContact('facebook', e.target.value)}
                        className="form-control"
                        style={{ 
                          borderRadius: '10px', 
                          backgroundColor: 'var(--surface-elevated)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: 'var(--text)' }}>تويتر</label>
                      <input
                        type="text"
                        value={settings.contact.twitter}
                        onChange={(e) => updateContact('twitter', e.target.value)}
                        className="form-control"
                        style={{ 
                          borderRadius: '10px', 
                          backgroundColor: 'var(--surface-elevated)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: 'var(--text)' }}>إنستغرام</label>
                      <input
                        type="text"
                        value={settings.contact.instagram}
                        onChange={(e) => updateContact('instagram', e.target.value)}
                        className="form-control"
                        style={{ 
                          borderRadius: '10px', 
                          backgroundColor: 'var(--surface-elevated)',
                          border: '1px solid var(--border)'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-4" style={{ backgroundColor: 'var(--surface-elevated)' }}>
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>معاينة بطاقة الاتصال</h3>
                    <div className="d-flex align-items-center gap-4 p-3 rounded-3" style={{ backgroundColor: 'var(--surface)' }}>
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          backgroundColor: settings.colors.primary,
                          color: 'white',
                          fontSize: '1.5rem'
                        }}
                      >
                        <FaPhone />
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: 'var(--text)' }}>{settings.contact.email}</div>
                        <div style={{ color: 'var(--text-light)' }}>{settings.contact.phone}</div>
                        <div style={{ color: 'var(--text-light)' }}>{settings.contact.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'currency' && (
                <div>
                  <h2 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                    <FaMoneyBillWave className="ms-2" />
                    إعدادات العملة
                  </h2>

                  <div className="mb-4">
                    <label className="form-label" style={{ color: 'var(--text)' }}>العملة الافتراضية</label>
                    <div className="row g-3">
                      {currencyOptions.map(currency => (
                        <div key={currency.code} className="col-md-6 col-lg-4">
                          <button
                            onClick={() => setSettings({ 
                              ...settings, 
                              currency: currency.code,
                              currencySymbol: currency.symbol
                            })}
                            className="btn w-100 d-flex align-items-center justify-content-between p-3"
                            style={{
                              borderRadius: '12px',
                              backgroundColor: settings.currency === currency.code ? settings.colors.primary + '20' : 'var(--surface-elevated)',
                              border: `2px solid ${settings.currency === currency.code ? settings.colors.primary : 'var(--border)'}`,
                              color: 'var(--text)'
                            }}
                          >
                            <span className="fw-bold">{currency.name}</span>
                            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface)', fontWeight: 'bold' }}>
                              {currency.symbol}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-4" style={{ backgroundColor: settings.colors.primary + '20' }}>
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>معاينة الأسعار</h3>
                    <div className="d-flex gap-4 flex-wrap">
                      <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface)' }}>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>مجاني</div>
                        <div className="h4 fw-bold" style={{ color: 'var(--text)' }}>0 {settings.currencySymbol}</div>
                      </div>
                      <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface)' }}>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>اشتراك شهري</div>
                        <div className="h4 fw-bold" style={{ color: settings.colors.primary }}>99 {settings.currencySymbol}</div>
                      </div>
                      <div className="p-3 rounded-3" style={{ backgroundColor: 'var(--surface)' }}>
                        <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>دورة متميزة</div>
                        <div className="h4 fw-bold" style={{ color: settings.colors.secondary }}>199 {settings.currencySymbol}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div>
                  <h2 className="h5 fw-bold mb-4" style={{ color: 'var(--text)' }}>
                    <FaLanguage className="ms-2" />
                    إعدادات اللغة
                  </h2>

                  <div className="mb-4">
                    <label className="form-label" style={{ color: 'var(--text)' }}>اللغة الافتراضية</label>
                    <div className="d-flex gap-3">
                      {languageOptions.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => setSettings({ 
                            ...settings, 
                            language: lang.code,
                            rtl: lang.dir === 'rtl'
                          })}
                          className="btn p-3 d-flex align-items-center gap-3"
                          style={{
                            borderRadius: '12px',
                            backgroundColor: settings.language === lang.code ? settings.colors.primary + '20' : 'var(--surface-elevated)',
                            border: `2px solid ${settings.language === lang.code ? settings.colors.primary : 'var(--border)'}`,
                            color: 'var(--text)',
                            flex: 1
                          }}
                        >
                          <FaGlobe style={{ color: settings.colors.accent }} />
                          <span className="fw-bold">{lang.name}</span>
                          <span 
                            className="ms-auto px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: 'var(--surface)',
                              fontSize: '0.75rem',
                              color: 'var(--text-light)'
                            }}
                          >
                            {lang.dir === 'rtl' ? 'RTL' : 'LTR'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        checked={settings.rtl}
                        onChange={(e) => setSettings({ ...settings, rtl: e.target.checked })}
                        className="form-check-input"
                        id="rtlSwitch"
                        style={{ width: '50px', height: '25px' }}
                      />
                      <label className="form-check-label fw-bold" style={{ color: 'var(--text)' }} htmlFor="rtlSwitch">
                        دعم اللغة العربية (من اليمين لليسار)
                      </label>
                    </div>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '4px' }}>
                      عند التفعيل، سيتم عرض الموقع من اليمين لليسار
                    </div>
                  </div>

                  <div className="p-4 rounded-4" style={{ backgroundColor: settings.colors.primary + '20' }}>
                    <h3 className="h6 fw-bold mb-3" style={{ color: 'var(--text)' }}>معاينة الاتجاه</h3>
                    <div 
                      className="p-4 rounded-3" 
                      dir={settings.rtl ? 'rtl' : 'ltr'}
                      style={{ backgroundColor: 'var(--surface)', textAlign: settings.rtl ? 'right' : 'left' }}
                    >
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="px-3 py-2 rounded" style={{ backgroundColor: settings.colors.success + '20' }}>
                          ابدأ من اليسار
                        </div>
                        <div className="px-3 py-2 rounded" style={{ backgroundColor: settings.colors.primary + '20' }}>
                          الوسط
                        </div>
                      </div>
                      <p style={{ color: 'var(--text)' }}>
                        {settings.rtl 
                          ? 'هذا نص عربي لتجربة.direction.from.right.to.left'
                          : 'This is English text to test left-to-right direction.'}
                      </p>
                      <div className="d-flex align-items-center gap-2" style={{ justifyContent: settings.rtl ? 'flex-end' : 'flex-start' }}>
                        <button className="btn btn-sm" style={{ backgroundColor: settings.colors.primary, color: 'white' }}>
                          زر
                        </button>
                        <button className="btn btn-sm" style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--text)' }}>
                          زر آخر
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;