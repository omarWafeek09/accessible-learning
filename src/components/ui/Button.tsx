import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './common.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  iconOnly?: boolean;
  children: ReactNode;
  'aria-label'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  iconOnly = false,
  disabled = false,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  className = '',
  ...props
}, ref) => {
  const variantClasses: Record<string, string> = {
    primary: styles.primary,
    secondary: styles.secondary,
  };

  const sizeClasses: Record<string, string> = {
    small: styles.small,
    medium: '',
    large: styles.large,
  };

  const classes = [
    styles.button,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && styles.fullWidth,
    iconOnly && styles.iconOnly,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;