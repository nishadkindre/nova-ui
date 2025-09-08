import React from 'react';
import { theme } from '../../tokens';
import { getContainerStyles, getInputStyles, getLabelStyles, getTextStyles } from './helpers';

/**
 * Input Component - NovaUI
 *
 * A flexible, accessible, and themeable input field for React apps.
 * Supports outlined/filled variants, error states, helper text, custom radius, and more.
 *
 * Usage:
 * <Input label="Email" type="email" error errorMessage="Invalid email" />
 */

// Props for the Input component
export interface InputProps {
  label?: string; // Label text
  placeholder?: string; // Placeholder text
  value?: string; // Controlled value
  defaultValue?: string; // Default value (uncontrolled)
  type?: 'text' | 'email' | 'password' | 'number'; // Input type
  size?: 'small' | 'medium' | 'large'; // Input size
  fullWidth?: boolean; // Full width
  variant?: 'outlined' | 'filled'; // Visual variant
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  errorMessage?: string; // Error message
  helperText?: string; // Helper text
  required?: boolean; // Required field
  style?: React.CSSProperties; // Custom styles
  className?: string; // Custom class name
  radius?: string; // Custom border radius
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void; // Focus handler
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; // Blur handler
}

/** Main Input component */
export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  defaultValue,
  type = 'text', // Default type
  size = 'medium', // Default size
  fullWidth = false,
  variant = 'outlined', // Default variant
  disabled = false,
  error = false,
  errorMessage,
  helperText,
  required = false,
  style,
  className,
  radius,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  // Unique ID for accessibility (label-input association)
  const inputId = React.useId();

  // Get styles for input, label, container, and text
  const containerStyles = getContainerStyles();
  const labelStyles = getLabelStyles();
  const inputStyles = getInputStyles(size, fullWidth, error, disabled, variant, radius);
  const textStyles = getTextStyles(error);

  // Merge custom styles with defaults
  const finalInputStyles = style ? { ...inputStyles, ...style } : inputStyles;

  // Focus handler: show focus ring and border color
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled) {
      e.currentTarget.style.borderColor = error ? theme.border.error : theme.border.focus;
      e.currentTarget.style.boxShadow = `0 0 0 2px ${error ? theme.danger.light : theme.primary.light}`;
    }
    onFocus?.(e);
  };

  // Blur handler: reset border and remove focus ring
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = error ? theme.border.error : theme.border.default;
    e.currentTarget.style.boxShadow = 'none';
    onBlur?.(e);
  };

  // Text below input: error message or helper text
  const displayText = error && errorMessage ? errorMessage : helperText;

  return (
    <div style={containerStyles}>
      {/* Label (if provided) */}
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
          {/* Show required asterisk if needed */}
          {required && <span style={{ color: theme.danger.main, marginLeft: '2px' }}>*</span>}
        </label>
      )}

      {/* Input field */}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        style={finalInputStyles}
        className={className}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={error} // Accessibility: error state
        aria-describedby={displayText ? `${inputId}-text` : undefined} // Accessibility: helper/error text
        aria-required={required} // Accessibility: required
        {...props}
      />

      {/* Helper text or error message */}
      {displayText && (
        <span
          id={`${inputId}-text`}
          style={textStyles}
          role={error ? 'alert' : undefined} // Accessibility: error message
          aria-live={error ? 'polite' : undefined} // Accessibility: announce error
        >
          {displayText}
        </span>
      )}
    </div>
  );
};
