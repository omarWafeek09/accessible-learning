import { FaStar } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeContext';

interface ReviewCardProps {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

const ReviewCard = ({ name, role, text, rating, avatar }: ReviewCardProps) => {
  const { theme } = useTheme();

  return (
  <article className="card h-100 p-4" style={{ borderRadius: '16px', border: '2px solid var(--border)', backgroundColor: 'var(--surface)' }}>
    <div className="mb-3" style={{ fontSize: '2rem', color: 'var(--secondary)' }} aria-hidden="true">❝</div>
    <blockquote className="mb-4">
      <p className="mb-0 fst-italic" style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>{text}</p>
    </blockquote>
    <footer className="d-flex justify-content-between align-items-start">
      <div className="d-flex gap-3 align-items-center">
        <img
          src={avatar || 'https://i.pravatar.cc/150?img=10'}
          alt=""
          className="rounded-circle"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            border: '2px solid var(--border)'
          }}
        />
        <div>
          <cite className="fw-bold d-block" style={{ color: 'var(--text)', fontStyle: 'normal' }}>{name}</cite>
          <p className="mb-0" style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{role}</p>
        </div>
      </div>
      <div className="d-flex gap-1" role="img" aria-label={`${rating} من 5 نجوم`}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < rating ? 'var(--warning)' : 'var(--border)' }}>
            <FaStar aria-hidden="true" />
          </span>
        ))}
      </div>
    </footer>
  </article>
  );
};

export default ReviewCard;