// src\components\home\QA\QA.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface QAItem {
  question: string;
  answer: string;
}

const qaItems: QAItem[] = [
  {
    question: 'ما هي المنصة التعليمية الشاملة؟',
    answer: 'منصة تعليمية متخصصة في تعليم الأطفال ذوي الاحتياجات الخاصة، نقدم دورات تعليمية مصممة خصيصاً لتلبية احتياجات كل طفل مع مراعاة نوع الإعاقة والقدرات الفردية.'
  },
  {
    question: 'كيف يمكنني التسجيل في المنصة؟',
    answer: 'يمكنك التسجيل بسهولة من خلال زر "ابدأ رحلتك مجاناً" في الصفحة الرئيسية، ثم إنشاء حساب وإدخال معلومات الطفل واختيار الدورات المناسبة.'
  },
  {
    question: 'هل الدورات مجانية؟',
    answer: 'نعم، نوفر مجموعة من الدورات المجانية بالكامل. كما توجد دورات مدفوعة بأسعار بسيطة تشمل محتوى إضافي وميزات متقدمة.'
  },
  {
    question: 'كيف تتعاملون مع مختلف أنواع الإعاقات؟',
    answer: 'لدينا فريق متخصص من المعلمين المتخصصين في تعليم ذوي الاحتياجات الخاصة، ونصمم محتوى كل دورة وفقاً لنوع الإعاقة مع مراعاة معايير الوصول الشامل.'
  },
  {
    question: 'هل يمكن للوالدين متابعة تقدم الطفل؟',
    answer: 'نعم، نوفر للوالدين لوحة متابعة شاملة لتتبع تقدم الطفل، تتضمن الدروس المكتملة والتقييمات والتوصيات لتحسين التجربة التعليمية.'
  },
  {
    question: 'ما هي التقنيات المستخدمة في التعليم؟',
    answer: 'نستخدم تقنيات حديثة تشمل التفاعل ثلاثي الأبعاد، الألعاب التعليمية، الواقع الافتراضي، والذكاء الاصطناعي لتخصيص تجربة التعلم لكل طفل.'
  }
];

const QAItem = ({ item, index, isOpen, onToggle }: { item: QAItem; index: number; isOpen: boolean; onToggle: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    style={{ marginBottom: '1rem' }}
  >
    <motion.div
      whileHover={{ scale: 1.01 }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: isOpen ? 'var(--surface-elevated)' : 'var(--surface)',
        border: `2px solid ${isOpen ? 'var(--primary)' : 'var(--border)'}`,
        boxShadow: isOpen 
          ? '0 8px 30px rgba(88, 204, 2, 0.15)' 
          : '0 2px 10px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease'
      }}
    >
      <button
        onClick={onToggle}
        className="w-100 d-flex justify-content-between align-items-center p-4 text-start"
        style={{ 
          backgroundColor: 'transparent',
          border: 'none',
          color: 'var(--text)'
        }}
        aria-expanded={isOpen}
      >
        <span className="fw-bold" style={{ fontSize: '1.05rem' }}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: isOpen ? 'var(--primary)' : 'rgba(88, 204, 2, 0.1)',
            color: isOpen ? '#fff' : 'var(--primary)',
            fontSize: '0.9rem'
          }}
        >
          {isOpen ? <FaMinus /> : <FaPlus />}
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4">
              <div 
                style={{ 
                  height: '3px', 
                  width: '60px',
                  background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                  borderRadius: '2px',
                  marginBottom: '1rem'
                }}
              />
              <p 
                className="mb-0" 
                style={{ 
                  color: 'var(--text-light)', 
                  lineHeight: '1.9',
                  fontSize: '0.95rem'
                }}
              >
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.div>
);

const QA = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-5 position-relative" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>الأسئلة الشائعة</span>
          <h2 className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
            كل ما تريد معرفته
          </h2>
          <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
            إجابات على الأسئلة الشائعة حول منصتنا التعليمية.
          </p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            {qaItems.map((item, index) => (
              <QAItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QA;