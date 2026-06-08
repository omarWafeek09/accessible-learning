import { motion } from 'framer-motion';
import Button from '../../ui/Button';
import { useTheme } from '../../../context/ThemeContext';

const stats = [
  { number: '12,500+', label: 'عضو نشط' },
  { number: '200+', label: 'دورة' },
  { number: '45+', label: 'لعبة تعليمية' },
  { number: '98%', label: 'معدل الرضا' }
];

const communityAvatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5'
];

const Community = () => {
  const { theme } = useTheme();
  
  return (
  <section id="community" className="py-5" style={{ backgroundColor: 'var(--background)' }} aria-labelledby="community-title">
    <div className="container">
      <motion.div
        className="card border-0 p-5 text-center"
        style={{ 
          borderRadius: '24px', 
          border: '2px solid var(--border) !important',
          backgroundColor: 'var(--surface)',
          boxShadow: '0 4px 20px var(--shadow-color)'
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <header className="mb-4">
          <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>المجتمع</span>
          <h2 id="community-title" className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
            انضم إلى مجتمعنا
          </h2>
          <p className="lead mx-auto mb-0" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
            تواصل مع آلاف العائلات والمعلمين والمتخصصين المكرسين للتعليم الشامل.
          </p>
        </header>

        <div className="row g-4 mb-5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div 
                className="p-3 rounded-3 h-100"
                style={{ 
                  backgroundColor: 'var(--surface-elevated)',
                  border: '2px solid var(--border)'
                }}
              >
                <div className="fs-2 fw-bold" style={{ color: 'var(--primary)' }}>{stat.number}</div>
                <div className="text-uppercase" style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 600 }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-4">
          <p className="h5 fw-semibold mb-3" style={{ color: 'var(--text)' }}>
            هل أنت مستعد لتكون جزءا من شيء مخصص؟
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button variant="primary" size="large">
              انضم مجانا اليوم
            </Button>
            <Button variant="secondary" size="large">
              اعرف المزيد
            </Button>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 mt-4 flex-wrap">
            <div className="d-flex" aria-hidden="true">
              {communityAvatars.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt=""
                  className="rounded-circle"
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                    marginLeft: '-12px',
                    border: '2px solid var(--surface)'
                  }}
                />
              ))}
            </div>
            <p className="mb-0" style={{ color: 'var(--text-light)' }}>
              <span className="fw-bold" style={{ color: 'var(--text)' }}>2,500+ عضو</span> انضموا هذا الشهر
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default Community;