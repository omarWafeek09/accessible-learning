import { HTMLAttributes, forwardRef, ReactNode } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({
  children,
  className = '',
  hover = false,
  glow = false,
  style,
  ...props
}, ref) => {
  const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '20px',
    border: '2px solid #e5e5e5',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    ...style
  };

  const hoverStyle: React.CSSProperties = hover ? {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(88, 204, 2, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  } : {};

  const glowStyle: React.CSSProperties = glow ? {
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 40px rgba(206, 130, 255, 0.2)',
  } : {};

  const combinedStyle = { ...glassStyle, ...hoverStyle, ...glowStyle };

  return (
    <div
      ref={ref}
      className={className}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;