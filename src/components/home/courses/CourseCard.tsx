// src\components\home\courses\CourseCard.tsx
import { memo } from 'react';
import { FaClock, FaUsers, FaStar, FaPlayCircle, FaHeart } from 'react-icons/fa';

interface CourseCardProps {
  thumbnail: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  lessons?: number;
  students?: number;
  rating?: number;
  instructor?: string;
  instructorAvatar?: string;
  price?: string;
  isFree?: boolean;
}

const CourseCard = memo(({
  thumbnail,
  title,
  category,
  duration,
  level,
  lessons = 12,
  students = 850,
  rating = 4.8,
  instructor = 'فريق متخصص',
  instructorAvatar = 'https://i.pravatar.cc/150?img=11',
  price = 'مجاني',
  isFree = true
}: CourseCardProps) => {

  const handleClick = () => {
    window.location.href = '/course/1';
  };

  const levelColor = {
    'مبتدئ': { bg: 'rgba(88, 204, 2, 0.12)', color: '#58cc02' },
    'متوسط': { bg: 'rgba(255, 193, 7, 0.12)', color: '#ffc800' },
    'متقدم': { bg: 'rgba(220, 53, 69, 0.12)', color: '#dc3545' }
  }[level] || { bg: 'rgba(88, 204, 2, 0.12)', color: '#58cc02' };

  return (
    <article
      className="card h-100"
      style={{
        borderRadius: '20px',
        border: '2px solid var(--border)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        backgroundColor: 'var(--surface)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
      tabIndex={0}
      role="button"
      aria-label={`الدورة: ${title}. المستوى: ${level}. المدة: ${duration}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }}
    >
    <div
      className="position-relative"
      style={{ height: '300px', overflow: 'hidden' }}
    >
      <img
        src={thumbnail}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)'
        }}
      />
      
      <div
        className="position-absolute d-flex align-items-center justify-content-center"
        style={{
          top: '12px',
          right: '12px',
          backgroundColor: isFree ? '#58cc02' : '#ff8f00',
          padding: '6px 14px',
          borderRadius: '25px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#fff'
        }}
      >
        {price}
      </div>
      

      <div
        className="position-absolute d-flex align-items-center gap-2 text-white"
        style={{
          bottom: '12px',
          left: '12px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          backdropFilter: 'blur(4px)'
        }}
      >
        <FaPlayCircle style={{ color: '#58cc02' }} />
        <span>{lessons} درس</span>
      </div>
    </div>

    <div className="card-body d-flex flex-column p-3">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span
          className="badge px-3 py-1"
          style={{
            backgroundColor: 'rgba(88, 204, 2, 0.1)',
            color: '#58cc02',
            fontWeight: 700,
            borderRadius: '20px',
            fontSize: '0.7rem'
          }}
        >
          {category}
        </span>
        <div className="d-flex align-items-center gap-1">
          <FaStar style={{ color: '#ffc800', fontSize: '0.75rem' }} />
          <span className="fw-bold" style={{ color: 'var(--text)', fontSize: '0.85rem' }}>{rating}</span>
        </div>
      </div>

      <h3 className="h6 fw-bold mb-2" style={{ color: 'var(--text)', lineHeight: '1.4', fontSize: '1rem' }}>{title}</h3>

      <div className="mb-3">
        <div className="d-flex gap-3 align-items-center flex-wrap" style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
          <span 
            className="d-flex align-items-center gap-1 px-2 py-1 rounded-pill"
            style={{ backgroundColor: levelColor.bg, color: levelColor.color }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: levelColor.color
              }}
              aria-hidden="true"
            />
            {level}
          </span>
          <span className="d-flex align-items-center gap-1">
            <FaClock style={{ fontSize: '0.65rem', color: 'var(--text-light)' }} />
            {duration}
          </span>
          <span className="d-flex align-items-center gap-1">
            <FaUsers style={{ fontSize: '0.65rem', color: 'var(--text-light)' }} />
            {students}+
          </span>
        </div>
      </div>

      <div className="mt-auto pt-2" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <img
              src={instructorAvatar}
              alt=""
              className="rounded-circle"
              style={{
                width: '36px',
                height: '36px',
                objectFit: 'cover',
                border: '2px solid var(--border)'
              }}
            />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block' }}>المدرب</span>
              <span className="fw-bold" style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{instructor}</span>
            </div>
          </div>
          {isFree && (
            <div
              className="px-3 py-1 rounded-pill"
              style={{
                backgroundColor: 'rgba(88, 204, 2, 0.12)',
                color: '#58cc02',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              مجاني
            </div>
          )}
        </div>
      </div>
    </div>
  </article>
  );
});

export default CourseCard;