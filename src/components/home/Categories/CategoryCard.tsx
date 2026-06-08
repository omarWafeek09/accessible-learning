import { ReactNode } from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface CategoryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const CategoryCard = ({ icon, title, description }: CategoryCardProps) => {
  const { theme } = useTheme();
  
  return (
  <article
    className="card h-100 p-4 text-center"
    style={{
      borderRadius: '16px',
      border: '2px solid var(--border)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: 'var(--surface)'
    }}
    tabIndex={0}
    role="button"
    aria-label={`${title}: ${description}`}
  >
    <div
      className="d-flex align-items-center justify-content-center mx-auto mb-4"
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '16px',
        backgroundColor: 'var(--surface-elevated)',
        color: 'var(--primary)',
        fontSize: '2.5rem'
      }}
      aria-hidden="true"
    >
      {icon}
    </div>
    <h3 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>{title}</h3>
    <p className="mb-0" style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.6' }}>{description}</p>
  </article>
  );
};

export default CategoryCard;