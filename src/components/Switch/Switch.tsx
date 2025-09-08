import React, { useState } from 'react';
import { theme } from '../../tokens';

/**
 * Switch Component - NovaUI
 *
 * A toggle switch component for binary choices.
 * Supports different sizes, variants, and states.
 *
 * Usage:
 * <Switch checked={isEnabled} onChange={setIsEnabled} label="Enable notifications" />
 */

export interface SwitchProps {
  /** Whether the switch is checked */
  checked?: boolean;

  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean;

  /** Callback when the switch state changes */
  onChange?: (checked: boolean) => void;

  /** Label text for the switch */
  label?: string;

  /** Description text below the label */
  description?: string;

  /** Size of the switch */
  size?: 'small' | 'medium' | 'large';

  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger';

  /** Whether the switch is disabled */
  disabled?: boolean;

  /** Name attribute for form handling */
  name?: string;

  /** ID for the switch input */
  id?: string;

  /** Custom class name */
  className?: string;

  /** Custom styles */
  style?: React.CSSProperties;

  /** ARIA label for accessibility */
  'aria-label'?: string;

  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  description,
  size = 'medium',
  variant = 'default',
  disabled = false,
  name,
  id,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    const newChecked = event.target.checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      const newChecked = !checked;

      if (!isControlled) {
        setInternalChecked(newChecked);
      }

      onChange?.(newChecked);
    }
  };

  const getSwitchDimensions = () => {
    switch (size) {
      case 'small':
        return {
          width: '36px',
          height: '20px',
          thumbSize: '16px',
          thumbOffset: '2px'
        };
      case 'large':
        return {
          width: '52px',
          height: '28px',
          thumbSize: '24px',
          thumbOffset: '2px'
        };
      default: // medium
        return {
          width: '44px',
          height: '24px',
          thumbSize: '20px',
          thumbOffset: '2px'
        };
    }
  };

  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return {
          checkedBg: theme.success.main,
          checkedHoverBg: theme.success.hover
        };
      case 'warning':
        return {
          checkedBg: theme.warning.main,
          checkedHoverBg: theme.warning.hover
        };
      case 'danger':
        return {
          checkedBg: theme.danger.main,
          checkedHoverBg: theme.danger.hover
        };
      default:
        return {
          checkedBg: theme.primary.main,
          checkedHoverBg: theme.primary.hover
        };
    }
  };

  const dimensions = getSwitchDimensions();
  const colors = getVariantColors();

  const containerStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: '12px',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style
  };

  const trackStyles: React.CSSProperties = {
    position: 'relative',
    width: dimensions.width,
    height: dimensions.height,
    backgroundColor: checked ? colors.checkedBg : theme.border.default,
    borderRadius: dimensions.height,
    border: `2px solid ${checked ? colors.checkedBg : theme.border.default}`,
    transition: 'all 0.2s ease-in-out',
    cursor: disabled ? 'not-allowed' : 'pointer'
  };

  const thumbStyles: React.CSSProperties = {
    position: 'absolute',
    top: dimensions.thumbOffset,
    left: checked ? `calc(${dimensions.width} - ${dimensions.thumbSize} - ${dimensions.thumbOffset})` : dimensions.thumbOffset,
    width: dimensions.thumbSize,
    height: dimensions.thumbSize,
    backgroundColor: theme.background.white,
    borderRadius: '50%',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  const inputStyles: React.CSSProperties = {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };

  const labelStyles: React.CSSProperties = {
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    fontWeight: 500,
    color: theme.text.primary,
    lineHeight: 1.5,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: size === 'small' ? '12px' : size === 'large' ? '14px' : '13px',
    color: theme.text.secondary,
    lineHeight: 1.4,
    marginTop: '2px'
  };

  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label htmlFor={switchId} className={className} style={containerStyles}>
      <div style={trackStyles}>
        <input
          id={switchId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          name={name}
          style={inputStyles}
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedBy}
        />
        <div style={thumbStyles} />
      </div>

      {(label || description) && (
        <div>
          {label && <div style={labelStyles}>{label}</div>}
          {description && <div style={descriptionStyles}>{description}</div>}
        </div>
      )}
    </label>
  );
};
