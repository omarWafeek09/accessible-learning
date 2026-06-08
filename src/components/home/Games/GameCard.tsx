import { memo } from 'react';

interface GameCardProps {
  icon: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  color?: string;
  onClick?: () => void;
}

const GameCard = memo(({ icon, title, category, description, skills, color = '#58cc02', onClick }: GameCardProps) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <article
      className="card h-100"
      style={{ 
        borderRadius: '16px', 
        border: '2px solid var(--border)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        backgroundColor: 'var(--surface)'
      }}
      tabIndex={0}
      role="button"
      aria-label={`العبعبة: ${title}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div 
        className="position-relative d-flex align-items-center justify-content-center text-white"
        style={{ 
          height: '180px',
          backgroundColor: color,
          fontSize: '4.5rem'
        }}
        aria-hidden="true"
      >
        <div style={{ 
          transform: 'perspective(500px) rotateX(10deg) rotateY(0deg)',
          textShadow: '0 15px 25px rgba(0,0,0,0.4)',
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
        }}>
          {icon}
        </div>
        <div 
          className="position-absolute d-flex align-items-center justify-content-center"
          style={{ 
            inset: 0, 
            backgroundColor: 'rgba(0,0,0,0.4)',
            opacity: 0,
            transition: 'opacity 0.15s ease'
          }}
        >
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white"
            style={{ 
              width: '70px', 
              height: '70px', 
              backgroundColor: color,
              fontSize: '1.5rem'
            }}
          >
            ▶
          </div>
        </div>
      </div>
      <div className="card-body">
        <span 
          className="badge mb-2" 
          style={{ 
            backgroundColor: `${color}20`, 
            color: color,
            fontWeight: 700,
            borderRadius: '50px'
          }}
        >
          {category}
        </span>
        <h3 className="h5 fw-bold mb-2" style={{ color: 'var(--text)' }}>{title}</h3>
        <p className="mb-3" style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.6' }}>{description}</p>
        <div className="d-flex flex-wrap gap-2">
          {skills.map((skill: string, index: number) => (
            <span 
              key={index} 
              className="px-2 py-1"
              style={{ 
                backgroundColor: 'var(--surface-elevated)', 
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-light)'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
});

export default GameCard;