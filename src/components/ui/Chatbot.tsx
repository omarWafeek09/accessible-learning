// src\components\ui\Chatbot.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

const siteBrief = 
  'مرحباً بك في منصة التعليم الشامل! نحن نوفر بيئة تعليمية متاحة للجميع، مصممة خصيصاً للمتعلمين من مختلف القدرات.';

const instructions = [
  'استخدم القائمة للتنقل بين أقسام الموقع',
  'اضغط على أيقونة الصوت لقراءة المحتوى بصوت عالٍ',
  'جميع محتوانا مصممة لتكون متاحة للجميع',
  'ابدأ رحلتك التعليمية الآن مجاناً'
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBrief, setShowBrief] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rvReady, setRvReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=6wfA3IcO';
    script.async = true;
    script.onload = () => {
      console.log('[Chatbot] ResponsiveVoice loaded');
      setRvReady(true);
    };
    script.onerror = () => {
      console.error('[Chatbot] Failed to load ResponsiveVoice');
    };
    document.head.appendChild(script);

    return () => {
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && rvReady && !isSpeaking) {
      const timer = setTimeout(speak, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, rvReady, isSpeaking]);

  const speak = () => {
    if (!window.responsiveVoice) {
      console.error('[Chatbot] ResponsiveVoice not available');
      return;
    }

    window.responsiveVoice.cancel();
    setIsSpeaking(true);

    console.log('[Chatbot] Speaking with ResponsiveVoice...');
    
    window.responsiveVoice.speak(siteBrief, 'Arabic Female', {
      rate: 1,
      pitch: 1,
      volume: 1,
      onstart: () => console.log('[Chatbot] Started'),
      onend: () => {
        console.log('[Chatbot] Ended');
        setIsSpeaking(false);
      },
      onerror: (e: any) => {
        console.error('[Chatbot] Error:', e);
        setIsSpeaking(false);
      }
    });
  };

  const stopSpeaking = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
    }
    setIsSpeaking(false);
  };

  const handleToggle = () => {
    if (!isOpen) {
      setShowBrief(true);
      setIsOpen(true);
    } else {
      stopSpeaking();
      setIsOpen(false);
    }
  };

  const handleSectionClick = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #58cc02, #46a302)',
          border: 'none',
          boxShadow: '0 8px 25px rgba(88, 204, 2, 0.4)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label={isOpen ? 'إغلاق المساعد' : 'فتح المساعد الذكي'}
      >
        {isOpen ? (
          <FaTimes style={{ color: 'white', fontSize: '24px' }} />
        ) : (
          <FaRobot style={{ color: 'white', fontSize: '28px' }} />
        )}
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '120px',
            right: '30px',
            width: '350px',
            maxHeight: '500px',
            backgroundColor: 'var(--surface)',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            zIndex: 9998,
            overflow: 'hidden',
            fontFamily: 'Almarai, sans-serif'
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #58cc02, #46a302)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <FaRobot />
              <span className="fw-bold">المساعد الذكي</span>
              {!rvReady && <small style={{ opacity: 0.7 }}>...</small>}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={isSpeaking ? stopSpeaking : speak}
              disabled={!rvReady}
              style={{
                background: rvReady ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: rvReady ? 'pointer' : 'not-allowed',
                color: 'white'
              }}
              aria-label={isSpeaking ? 'إيقاف الصوت' : 'تشغيل الصوت'}
            >
              {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
            </motion.button>
          </div>

          <div style={{ padding: '16px', maxHeight: '380px', overflowY: 'auto' }}>
            {showBrief && (
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--surface-elevated)',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: 'var(--text)'
                }}
              >
                {siteBrief}
                {!rvReady && (
                  <><br /><br />
                  <small style={{ color: 'var(--text-light)' }}>
                    جارٍ تحميل المحرك الصوتي...
                  </small></>
                )}
              </div>
            )}

            <div>
              <button
                onClick={() => handleSectionClick('instructions')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--surface-elevated)',
                  border: 'none',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                <span>إرشادات الاستخدام</span>
                <span style={{ fontSize: '0.8rem' }}>{expandedSection === 'instructions' ? '▲' : '▼'}</span>
              </button>

              {expandedSection === 'instructions' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  style={{ overflow: 'hidden', marginBottom: '8px' }}
                >
                  <ul style={{ padding: '8px 16px', margin: 0, color: 'var(--text-light)', fontSize: '0.85rem' }}>
                    {instructions.map((instruction, index) => (
                      <li key={index} style={{ marginBottom: '8px', lineHeight: 1.6 }}>{instruction}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <button
                onClick={() => handleSectionClick('quickLinks')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--surface-elevated)',
                  border: 'none',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  fontWeight: 600,
                  marginTop: '8px'
                }}
              >
                <span>روابط سريعة</span>
                <span style={{ fontSize: '0.8rem' }}>{expandedSection === 'quickLinks' ? '▲' : '▼'}</span>
              </button>

              {expandedSection === 'quickLinks' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  style={{ overflow: 'hidden', marginTop: '8px' }}
                >
                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: 'ابدأ التعلم', href: '#home' },
                      { label: 'الدورات', href: '#courses' },
                      { label: 'التصنيفات', href: '#categories' },
                      { label: 'الألعاب', href: '#games' },
                      { label: 'اتصل بنا', href: '#contact' }
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: 'rgba(88, 204, 2, 0.1)',
                          borderRadius: '8px',
                          color: 'var(--primary)',
                          textDecoration: 'none',
                          fontSize: '0.85rem'
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;