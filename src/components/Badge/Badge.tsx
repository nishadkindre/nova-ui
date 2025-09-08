import React from 'react';
import { theme } from '../../tokens';

/**
 * Badge Component - NovaUI
 *
 * A flexible badge component for displaying status, counts, or labels.
 * Supports multiple variants, sizes, and can be used standalone or as a notification badge.
 *
 * Usage:
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger" size="small">3</Badge>
 */

export interface BadgeProps {
  /** Content of the badge */
  children?: React.ReactNode;

  /** Visual variant of the badge */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

  /** Size of the badge */
  size?: 'small' | 'medium' | 'large';

  /** Style variant - filled or outlined */
  style?: 'filled' | 'outlined' | 'dot';

  /** Whether the badge is circular (for counts/numbers) */
  circular?: boolean;

  /** Custom class name */
  className?: string;

  /** Custom styles */
  customStyle?: React.CSSProperties;

  /** Maximum number to display (for numeric badges) */
  max?: number;

  /** Whether to show the badge when count is 0 */
  showZero?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'medium', style = 'filled', circular = false, className = '', customStyle = {}, max, showZero = false }) => {
  const getVariantStyles = () => {
    const variantMap = {
      default: {
        filled: {
          backgroundColor: theme.secondary.main,
          color: theme.background.white,
          border: `1px solid ${theme.secondary.main}`
        },
        outlined: {
          backgroundColor: 'transparent',
          color: theme.secondary.main,
          border: `1px solid ${theme.secondary.main}`
        },
        dot: {
          backgroundColor: theme.secondary.main
        }
      },
      primary: {
        filled: {
          backgroundColor: theme.primary.main,
          color: theme.background.white,
          border: `1px solid ${theme.primary.main}`
        },
        outlined: {
          backgroundColor: 'transparent',
          color: theme.primary.main,
          border: `1px solid ${theme.primary.main}`
        },
        dot: {
          backgroundColor: theme.primary.main
        }
      },
      secondary: {
        filled: {
          backgroundColor: theme.secondary.light,
          color: theme.text.primary,
          border: `1px solid ${theme.secondary.light}`
        },
        outlined: {
          backgroundColor: 'transparent',
          color: theme.secondary.main,
          border: `1px solid ${theme.secondary.main}`
        },
        dot: {
          backgroundColor: theme.secondary.main
        }
      },
      success: {
        filled: {
          backgroundColor: theme.success.main,
          color: theme.background.white,
          border: `1px solid ${theme.success.main}`
        },
        outlined: {
          backgroundColor: 'transparent',
          color: theme.success.main,
          border: `1px solid ${theme.success.main}`
        },
        dot: {
          backgroundColor: theme.success.main
        }
      },
      warning: {
        filled: {
          backgroundColor: theme.warning.main,
          color: theme.text.primary,
          border: `1px solid ${theme.warning.main}`
        },
        outlined: {
          backgroundColor: 'transparent',
          color: theme.warning.main,
          border: `1px solid ${theme.warning.main}`
        },
        dot: {
          backgroundColor: theme.warning.main
        }
      },
      danger: {
        filled: {
          backgroundColor: theme.danger.main,
          color: theme.background.white,
          border: `1px solid ${theme.danger.main}`
        },
        outlined: {
          backgroundColor: 'transparent',
          color: theme.danger.main,
          border: `1px solid ${theme.danger.main}`
        },
        dot: {
          backgroundColor: theme.danger.main
        }
      },
      info: {
        filled: {
          backgroundColor: theme.info.main,
          color: theme.background.white,
          border: `1px solid ${theme.info.main}`
        },
        outlined: {
          backgroundColor: 'transparent',
          color: theme.info.main,
          border: `1px solid ${theme.info.main}`
        },
        dot: {
          backgroundColor: theme.info.main
        }
      }
    };

    return variantMap[variant][style];
  };

  const getSizeStyles = () => {
    if (style === 'dot') {
      switch (size) {
        case 'small':
          return { width: '6px', height: '6px' };
        case 'large':
          return { width: '12px', height: '12px' };
        default: // medium
          return { width: '8px', height: '8px' };
      }
    }

    switch (size) {
      case 'small':
        return {
          fontSize: '10px',
          padding: circular ? '2px 6px' : '2px 6px',
          minWidth: circular ? '16px' : 'auto',
          height: circular ? '16px' : 'auto',
          lineHeight: circular ? '12px' : '1.2'
        };
      case 'large':
        return {
          fontSize: '14px',
          padding: circular ? '4px 8px' : '4px 8px',
          minWidth: circular ? '24px' : 'auto',
          height: circular ? '24px' : 'auto',
          lineHeight: circular ? '16px' : '1.4'
        };
      default: // medium
        return {
          fontSize: '12px',
          padding: circular ? '2px 6px' : '2px 6px',
          minWidth: circular ? '18px' : 'auto',
          height: circular ? '18px' : 'auto',
          lineHeight: circular ? '14px' : '1.3'
        };
    }
  };

  const formatContent = () => {
    // Handle numeric values (both number and string)
    const numericValue = typeof children === 'string' ? parseInt(children, 10) : typeof children === 'number' ? children : null;

    if (numericValue !== null && !isNaN(numericValue)) {
      // Handle zero display
      if (numericValue === 0 && !showZero) {
        return null;
      }

      // Handle max value
      if (max && numericValue > max) {
        return `${max}+`;
      }

      return numericValue.toString();
    }

    // For non-numeric content, handle empty/zero cases
    if ((children === '' || children === 0) && !showZero) {
      return null;
    }

    return children;
  };

  const content = formatContent();

  // Don't render if content is null/undefined (for zero counts when showZero is false)
  if (content === null || content === undefined || content === '') {
    return null;
  }

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    borderRadius: style === 'dot' ? '50%' : circular ? '50%' : '4px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    userSelect: 'none',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...customStyle
  };

  return (
    <span className={className} style={baseStyles} role={style === 'dot' ? 'status' : undefined} aria-label={style === 'dot' ? `${variant} status indicator` : undefined}>
      {style !== 'dot' && content}
    </span>
  );
};
