import React from 'react';
import { theme } from '../../tokens';
import { RingSpinner } from '../Spinners';
import { getButtonStyles, getHoverStyles } from './helpers';

/**
 * Button Component - NovaUI
 *
 * A highly flexible, accessible, and themeable button for React apps.
 * Supports variants, colors, sizes, icons, loading states, custom radius, and more.
 *
 * Usage:
 * <Button variant="filled" color="success" size="large" icon={<Icon />} iconAt="end">Save</Button>
 */

// Define the props that our Button component accepts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label or content */
  children?: React.ReactNode;

  /** Visual style variant */
  variant?: 'filled' | 'outlined' | 'text' | 'link' | 'icon';

  /** Semantic color scheme */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

  /** Button size */
  size?: 'small' | 'medium' | 'large';

  /** If true, button takes full width of container */
  fullWidth?: boolean;

  /** Custom border radius (e.g. '8px', '50%') */
  radius?: string;

  /** If true, icon-only button is rendered as a circle */
  round?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Loading state (shows spinner) */
  loading?: boolean;

  /** Hide spinner when loading */
  hideSpinner?: boolean;

  /** Icon element (ReactNode) */
  icon?: React.ReactNode;

  /** Icon position: 'start' (left) or 'end' (right) */
  iconAt?: 'start' | 'end';

  /** Custom inline styles */
  style?: React.CSSProperties;

  /** Custom class name for styling */
  className?: string;
}

// Main Button component
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'filled', // Default variant
  color = 'primary', // Default color
  size = 'medium', // Default size
  fullWidth = false,
  disabled = false,
  loading = false,
  hideSpinner = false,
  icon,
  iconAt = 'start',
  style,
  className,
  radius,
  round,
  ...props
}, ref) => {
  // Check if we have icon and/or text
  const hasIcon = !!icon;
  const hasText = !!children;

  // Get the base styles for this button configuration
  const buttonStyles = getButtonStyles(variant, color, size, fullWidth, disabled, loading, hasIcon, hasText, radius, round);
  const hoverStyles = getHoverStyles(variant, color);

  // Merge custom styles with default styles (custom styles override defaults)
  const finalStyles = style ? { ...buttonStyles, ...style } : buttonStyles;

  // Mouse enter: apply hover styles
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      const combinedHoverStyles = style ? { ...hoverStyles, ...style } : hoverStyles;
      Object.assign(e.currentTarget.style, combinedHoverStyles);
    }
  };

  // Mouse leave: reset to original styles
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      Object.assign(e.currentTarget.style, finalStyles);
    }
  };

  // Focus: show accessible focus ring
  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.primary.light}`;
    }
  };

  // Blur: remove focus ring
  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = 'none';
  };

  // Render the button content
  const renderContent = () => {
    // Show loading spinner when loading
    if (loading) {
      return (
        <>
          {/* Spinner shown unless hideSpinner is true */}
          {!hideSpinner && <RingSpinner size={size as 'small' | 'medium' | 'large'} />}
          {/* Show children (text) if present */}
          {children && <span>{children}</span>}
        </>
      );
    }

    // Only icon
    if (!hasIcon) {
      return children;
    }

    // Only text
    if (!hasText) {
      return icon;
    }

    // Icon at end
    if (iconAt === 'end') {
      return (
        <>
          {children}
          {icon}
        </>
      );
    }

    // Icon at start (default)
    return (
      <>
        {icon}
        {children}
      </>
    );
  };

  // Render the button element
  return (
    <button
      ref={ref}
      style={finalStyles}
      className={className}
      disabled={disabled || loading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      // Accessibility attributes
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}>
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';
