import React from 'react';
import { theme, typography } from '../../tokens';

// Helper function to get styles based on variant, color, and size
export const getButtonStyles = (
  variant: string,
  color: string,
  size: string,
  fullWidth: boolean,
  disabled: boolean,
  loading: boolean,
  hasIcon: boolean,
  hasText: boolean,
  radius?: string,
  round?: boolean
) => {
  // Base styles that apply to all buttons
  const baseStyles: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    border: '1px solid transparent',
    borderRadius: round ? '50%' : radius || '6px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    fontWeight: typography.fontWeight.medium,
    transition: 'all 0.2s ease-in-out',
    opacity: disabled ? 0.6 : 1,
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    gap: (hasIcon && hasText) || loading ? '8px' : '0',
    lineHeight: 1.2
  };

  // Size-specific styles (use padding & font size)
  const sizeStyles: Record<string, React.CSSProperties> = {
    small: {
      padding: hasIcon && !hasText ? '6px' : '6px 14px',
      fontSize: typography.fontSize.sm
    },
    medium: {
      padding: hasIcon && !hasText ? '8px' : '8px 16px',
      fontSize: typography.fontSize.md
    },
    large: {
      padding: hasIcon && !hasText ? '12px' : '12px 20px',
      fontSize: typography.fontSize.lg
    }
  };

  // Color mappings for each semantic color
  const themeMap: Record<string, { main: string; hover: string; light: string }> = {
    primary: theme.primary,
    secondary: theme.secondary,
    success: theme.success,
    danger: theme.danger,
    warning: theme.warning,
    info: theme.info
  };

  const currentTheme = themeMap[color] || themeMap.primary;

  // Variant-specific styles
  const variantStyles: Record<string, React.CSSProperties> = {
    filled: {
      backgroundColor: currentTheme.main,
      color: theme.background.white
    },
    outlined: {
      backgroundColor: 'transparent',
      color: currentTheme.main,
      border: `1px solid ${currentTheme.main}`
    },
    text: {
      backgroundColor: 'transparent',
      color: currentTheme.main
    },
    link: {
      backgroundColor: 'transparent',
      color: currentTheme.main,
      textDecoration: 'none'
    },
    icon: {
      backgroundColor: 'transparent',
      color: currentTheme.main
    }
  };

  // Combine all styles
  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant]
  };
};

// Helper function to get hover styles
export const getHoverStyles = (variant: string, color: string) => {
  // Color mappings for each semantic color
  const themeMap: Record<string, { main: string; hover: string; light: string }> = {
    primary: theme.primary,
    secondary: theme.secondary,
    success: theme.success,
    danger: theme.danger,
    warning: theme.warning,
    info: theme.info
  };

  const currentTheme = themeMap[color] || themeMap.primary;

  const hoverStyles: Record<string, React.CSSProperties> = {
    filled: {
      backgroundColor: currentTheme.hover,
      borderColor: currentTheme.hover
    },
    outlined: {
      backgroundColor: currentTheme.light
    },
    text: {
      backgroundColor: currentTheme.light
    },
    link: {
      textDecoration: 'underline'
    },
    icon: {
      backgroundColor: currentTheme.light
    }
  };

  return hoverStyles[variant];
};
