// src\components\home\Subscription\Subscription.tsx
import { motion } from 'framer-motion';
import { FaCheck, FaCrown, FaStar } from 'react-icons/fa';
import Button from '../../ui/Button';
import { useTheme } from '../../../context/ThemeContext';

const plans = [
  {
    name: 'الأساسي',
    price: 'مجاني',
    period: '',
    description: 'ابدأ رحلتك التعليمية مجاناً',
    features: [
      'وصول إلى 10 دروس أساسية',
      '3 ألعاب تعليمية',
      'تتبع التقدم الأساسي',
      'دعم المجتمع'
    ],
    highlighted: false,
    button: 'ابدأ مجاناً'
  },
  {
    name: 'الذهبي',
    price: '49',
    period: 'ريال/شهر',
    description: 'تجربة تعليمية متكاملة',
    features: [
      'وصول غير محدود للدورات',
      'جميع الألعاب التعليمية',
      'تتبع التقدم المتقدم',
      'شهادات إتمام',
      'دعم اولوية',
      'جلسات أسبوعية مع متخصص'
    ],
    highlighted: true,
    button: 'اشترك الآن',
    badge: 'الأكثر شعبية'
  },
  {
    name: 'العائلي',
    price: '89',
    period: 'ريال/شهر',
    description: 'لأسر متعددة الأطفال',
    features: [
      'كل مميزات الخطة الذهبية',
      '5 حسابات أطفال',
      'لوحة تحكم للأهل',
      'تقارير تقدم شهرية',
      'استشارات عائلية مجانية',
      'دعم مباشر على مدار الساعة'
    ],
    highlighted: false,
    button: 'تواصل معنا'
  }
];

const Subscription = () => {
  const { theme } = useTheme();
  
  return (
    <section id="pricing" className="py-5 position-relative" style={{ backgroundColor: 'var(--surface)' }} aria-labelledby="pricing-title">
      <div className="container">
        <motion.header
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(206, 130, 255, 0.12)', color: 'var(--secondary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>الخطط والأسعار</span>
          <h2 id="pricing-title" className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
            اختر الخطة المناسبة لك
          </h2>
          <p className="lead mx-auto mb-0" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
            خطط مرنة تناسب احتياجاتك. يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </motion.header>

        <div className="row g-4 justify-content-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="col-12 col-md-6 col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div 
                className={`card h-100 p-4 ${plan.highlighted ? 'border-0' : ''}`}
                style={{ 
                  borderRadius: '20px', 
                  border: plan.highlighted ? '3px solid var(--secondary)' : '2px solid var(--border)',
                  transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: plan.highlighted ? '0 20px 40px rgba(206, 130, 255, 0.3)' : '0 4px 12px var(--shadow-color)',
                  backgroundColor: 'var(--surface)',
                  position: 'relative'
                }}
              >
                {plan.highlighted && (
                  <div 
                    className="position-absolute top-0 start-50 translate-middle-x rounded-pill px-3 py-1"
                    style={{ 
                      backgroundColor: 'var(--secondary)', 
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--text)' }}>{plan.name}</h3>
                  <div className="d-flex align-items-baseline justify-content-center gap-1">
                    {plan.price !== 'مجاني' && (
                      <span style={{ fontSize: '1.5rem', color: 'var(--text-light)' }}>ج.م</span>
                    )}
                    <span 
                      className="fw-bold" 
                      style={{ 
                        fontSize: plan.price === 'مجاني' ? '2rem' : '3rem', 
                        color: plan.highlighted ? 'var(--secondary)' : 'var(--primary)'
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>/{plan.period}</span>
                    )}
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{plan.description}</p>
                </div>

                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="d-flex align-items-center gap-2 mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: plan.highlighted ? 'rgba(206, 130, 255, 0.15)' : 'rgba(88, 204, 2, 0.15)',
                          color: plan.highlighted ? 'var(--secondary)' : 'var(--primary)'
                        }}
                      >
                        <FaCheck style={{ fontSize: '0.7rem' }} />
                      </div>
                      <span style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center mt-auto">
                  {plan.button === 'تواصل معنا' ? (
                    <Button 
                      variant="secondary" 
                      size="large" 
                      fullWidth
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ backgroundColor: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)' }}
                    >
                      {plan.button}
                    </Button>
                  ) : plan.highlighted ? (
                    <Button variant="secondary" size="large" fullWidth>
                      {plan.button}
                    </Button>
                  ) : (
                    <Button variant="primary" size="large" fullWidth>
                      {plan.button}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p style={{ color: 'var(--text-light)' }}>
            <FaStar style={{ color: 'var(--warning)', marginRight: '8px' }} />
            أكثر من 2,500 عائلة تثق بنا - معدل رضا 98%
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscription;