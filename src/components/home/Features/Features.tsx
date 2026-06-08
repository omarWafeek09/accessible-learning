// src\components\home\Features\Features.tsx
import { motion } from 'framer-motion';
import { FaBookReader, FaGamepad, FaUsers, FaRoute } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <FaBookReader aria-hidden="true" />,
    title: 'دورات للآباء',
    description: 'أدلة وموارد شاملة لمساعدة الآباء على دعم رحلة التعلم لأطفالهم بثقة وفهم.'
  },
  {
    icon: <FaGamepad aria-hidden="true" />,
    title: 'تعلم من خلال اللعب',
    description: 'ألعاب تعليمية ممتعة لتطوير المهارات المعرفية والحركية الأساسية.'
  },
  {
    icon: <FaUsers aria-hidden="true" />,
    title: 'دعم المجتمع',
    description: 'تواصل مع آباء ومعلمين ومتخصصين يفهمون رحلتك الفريدة.'
  },
  {
    icon: <FaRoute aria-hidden="true" />,
    title: 'مسارات مخصصة',
    description: 'رحلات تعليمية مخصصة تتكيف مع نقاط القوة والتحديات وأسلوب التعلم المفضل لكل طفل.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Features = () => (
  <section id="features" className="py-5 position-relative" style={{ backgroundColor: 'var(--background)' }} aria-labelledby="features-title">
    <div className="container">
      <motion.header
        className="text-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-uppercase fw-bold d-inline-block px-3 py-1 rounded-pill mb-3" style={{ backgroundColor: 'rgba(88, 204, 2, 0.12)', color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>ما نقدمه</span>
        <h2 id="features-title" className="display-5 fw-bold mb-3" style={{ color: 'var(--text)' }}>
          ميزات مصممة للإدماج
        </h2>
        <p className="lead mx-auto" style={{ color: 'var(--text-light)', maxWidth: '600px' }}>
          كل ما تحتاجه لدعم المتعلمين المتنوعين، في منصة واحدة سهلة الوصول.
        </p>
      </motion.header>

      <motion.div
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} className="col-12 col-md-6 col-lg-3" variants={itemVariants}>
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Features;