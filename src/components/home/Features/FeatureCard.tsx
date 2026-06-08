import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const { theme } = useTheme();
  
  return (
  <motion.article
    className="card h-100 p-4"
    style={{ 
      borderRadius: '16px', 
      border: '2px solid var(--border)',
      transition: 'all 0.2s ease',
      backgroundColor: 'var(--surface)'
    }}
    whileHover={{ y: -8 }}
    role="article"
    aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className="mb-3 d-flex align-items-center justify-content-center" 
         style={{ 
           width: '60px', 
           height: '60px', 
           borderRadius: '12px', 
           backgroundColor: 'rgba(88, 204, 2, 0.15)',
           color: 'var(--primary)',
           fontSize: '1.75rem'
         }} 
         aria-hidden="true">
      {icon}
    </div>
    <h3
      id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="h5 fw-bold mb-2"
      style={{ color: 'var(--text)' }}
    >
      {title}
    </h3>
    <p className="mb-0" style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>{description}</p>
  </motion.article>
  );
};

export default FeatureCard;