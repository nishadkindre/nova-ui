import React from 'react';
import { theme, typography } from '../../tokens';

// Helper function to get input styles based on size, state, and variant
export const getInputStyles = (size: string, fullWidth: boolean, error: boolean, disabled: boolean, variant: 'outlined' | 'filled', radius?: string) => {
  // Base styles that apply to all inputs
  const baseStyles: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    borderRadius: radius || '6px',
    fontFamily: 'inherit',
    fontWeight: typography.fontWeight.normal,
    transition: 'all 0.2s ease-in-out',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    outline: 'none',
    color: theme.text.primary
  };

  // Variant-specific styles
  const variantStyles: Record<'outlined' | 'filled', React.CSSProperties> = {
    outlined: {
      border: `1px solid ${error ? theme.border.error : theme.border.default}`,
      backgroundColor: disabled ? theme.background.gray : theme.background.white
    },
    filled: {
      border: `1px solid ${error ? theme.border.error : 'transparent'}`,
      backgroundColor: disabled ? theme.background.gray : theme.background.gray
    }
  };

  // Size-specific styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    small: {
      height: '32px',
      padding: '0 12px',
      fontSize: typography.fontSize.sm
    },
    medium: {
      height: '40px',
      padding: '0 16px',
      fontSize: typography.fontSize.md
    },
    large: {
      height: '48px',
      padding: '0 20px',
      fontSize: typography.fontSize.lg
    }
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size]
  };
};

// Helper function to get label styles
export const getLabelStyles = (): React.CSSProperties => ({
  display: 'block',
  marginBottom: '4px',
  textAlign: 'left',
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: theme.text.primary
});

// Helper function to get helper/error text styles
export const getTextStyles = (isError: boolean): React.CSSProperties => ({
  marginTop: '4px',
  fontSize: typography.fontSize.sm,
  textAlign: 'left',
  color: isError ? theme.danger.main : theme.text.secondary
});

// Helper function to get container styles
export const getContainerStyles = (): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});
