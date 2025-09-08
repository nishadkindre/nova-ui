import React, { useState, useRef, useEffect } from 'react';
import { theme } from '../../tokens';

/**
 * Select Component - NovaUI
 *
 * A flexible dropdown select component with search, multi-select, and custom options.
 * Supports keyboard navigation and accessibility features.
 *
 * Usage:
 * <Select
 *   options={options}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Select an option"
 * />
 */

export interface SelectOption {
  /** Unique value for the option */
  value: string | number;

  /** Display label for the option */
  label: string;

  /** Whether the option is disabled */
  disabled?: boolean;

  /** Custom icon or element */
  icon?: React.ReactNode;

  /** Additional description */
  description?: string;
}

export interface SelectProps {
  /** Array of options */
  options: SelectOption[];

  /** Selected value(s) */
  value?: string | number | (string | number)[];

  /** Default value(s) for uncontrolled usage */
  defaultValue?: string | number | (string | number)[];

  /** Callback when selection changes */
  onChange?: (value: string | number | (string | number)[]) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Size of the select */
  size?: 'small' | 'medium' | 'large';

  /** Whether multiple selection is allowed */
  multiple?: boolean;

  /** Whether the select is disabled */
  disabled?: boolean;

  /** Whether the select is in error state */
  error?: boolean;

  /** Error message */
  errorMessage?: string;

  /** Label for the select */
  label?: string;

  /** Helper text */
  helperText?: string;

  /** Whether the select is searchable */
  searchable?: boolean;

  /** Search placeholder text */
  searchPlaceholder?: string;

  /** Whether to clear selection */
  clearable?: boolean;

  /** Custom class name */
  className?: string;

  /** Custom styles */
  style?: React.CSSProperties;

  /** Name attribute for forms */
  name?: string;

  /** ID for the select */
  id?: string;

  /** Maximum height of the dropdown */
  maxHeight?: string;

  /** Loading state */
  loading?: boolean;

  /** Function to render custom option */
  renderOption?: (option: SelectOption) => React.ReactNode;

  /** Function to render selected value */
  renderValue?: (value: string | number | (string | number)[]) => React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  size = 'medium',
  multiple = false,
  disabled = false,
  error = false,
  errorMessage,
  label,
  helperText,
  searchable = false,
  searchPlaceholder = 'Search...',
  clearable = false,
  className = '',
  style = {},
  name,
  id,
  maxHeight = '200px',
  loading = false,
  renderOption,
  renderValue
}) => {
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(defaultValue || (multiple ? [] : ''));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const filteredOptions = searchable && searchQuery ? options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase())) : options;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: '14px',
          padding: '6px 12px',
          minHeight: '32px'
        };
      case 'large':
        return {
          fontSize: '16px',
          padding: '12px 16px',
          minHeight: '48px'
        };
      default: // medium
        return {
          fontSize: '14px',
          padding: '8px 12px',
          minHeight: '40px'
        };
    }
  };

  const handleValueChange = (newValue: string | number | (string | number)[]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleOptionClick = (optionValue: string | number) => {
    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      const newValue = currentArray.includes(optionValue) ? currentArray.filter(v => v !== optionValue) : [...currentArray, optionValue];
      handleValueChange(newValue);
    } else {
      handleValueChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleValueChange(multiple ? [] : '');
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[focusedIndex].value);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        }
        break;
      case ' ':
        if (!searchable) {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const sizeStyles = getSizeStyles();
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const selectStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    ...style
  };

  const triggerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    ...sizeStyles,
    backgroundColor: disabled ? theme.background.light : theme.background.white,
    border: `1px solid ${error ? theme.border.error : isOpen ? theme.primary.main : theme.border.default}`,
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease-in-out',
    opacity: disabled ? 0.6 : 1
  };

  const dropdownStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: theme.background.white,
    border: `1px solid ${theme.border.default}`,
    borderRadius: '6px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    zIndex: 1000,
    maxHeight,
    overflowY: 'auto',
    marginTop: '4px'
  };

  const optionStyles = (option: SelectOption, index: number): React.CSSProperties => {
    const isSelected = multiple ? Array.isArray(currentValue) && currentValue.includes(option.value) : currentValue === option.value;
    const isFocused = index === focusedIndex;

    return {
      padding: '8px 12px',
      cursor: option.disabled ? 'not-allowed' : 'pointer',
      backgroundColor: isFocused ? theme.primary.light : isSelected ? theme.primary.main : 'transparent',
      color: option.disabled ? theme.text.secondary : isSelected ? theme.background.white : theme.text.primary,
      opacity: option.disabled ? 0.5 : 1,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.15s ease-in-out'
    };
  };

  const getDisplayValue = () => {
    if (renderValue) {
      return renderValue(currentValue);
    }

    if (multiple && Array.isArray(currentValue)) {
      if (currentValue.length === 0) return placeholder;
      if (currentValue.length === 1) {
        const option = options.find(opt => opt.value === currentValue[0]);
        return option?.label || currentValue[0];
      }
      return `${currentValue.length} items selected`;
    }

    if (!currentValue) return placeholder;
    const option = options.find(opt => opt.value === currentValue);
    return option?.label || currentValue;
  };

  const showClearButton = clearable && ((multiple && Array.isArray(currentValue) && currentValue.length > 0) || (!multiple && currentValue));

  return (
    <div className={className} style={selectStyles}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: theme.text.primary
          }}>
          {label}
        </label>
      )}

      <div ref={selectRef}>
        <div
          style={triggerStyles}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${selectId}-label` : undefined}
          id={selectId}>
          <span
            style={{
              flex: 1,
              color: currentValue ? theme.text.primary : theme.text.secondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
            {getDisplayValue()}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {loading && <span style={{ fontSize: '12px', color: theme.text.secondary }}>⟳</span>}
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px',
                  fontSize: '14px',
                  color: theme.text.secondary,
                  lineHeight: 1
                }}
                aria-label="Clear selection">
                ✕
              </button>
            )}
            <span
              style={{
                fontSize: '12px',
                color: theme.text.secondary,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out'
              }}>
              ▼
            </span>
          </div>
        </div>

        {isOpen && (
          <div ref={dropdownRef} style={dropdownStyles}>
            {searchable && (
              <div style={{ padding: '8px' }}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    border: `1px solid ${theme.border.default}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  onClick={e => e.stopPropagation()}
                />
              </div>
            )}

            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  color: theme.text.secondary,
                  fontSize: '14px'
                }}>
                {searchQuery ? 'No options found' : 'No options available'}
              </div>
            ) : (
              <div role="listbox">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    style={optionStyles(option, index)}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                    role="option"
                    aria-selected={multiple ? Array.isArray(currentValue) && currentValue.includes(option.value) : currentValue === option.value}
                    onMouseEnter={() => setFocusedIndex(index)}>
                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <>
                        {option.icon && <span>{option.icon}</span>}
                        <div style={{ flex: 1 }}>
                          <div>{option.label}</div>
                          {option.description && (
                            <div
                              style={{
                                fontSize: '12px',
                                color: theme.text.secondary,
                                marginTop: '2px'
                              }}>
                              {option.description}
                            </div>
                          )}
                        </div>
                        {multiple && Array.isArray(currentValue) && currentValue.includes(option.value) && <span style={{ fontSize: '12px' }}>✓</span>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {error && errorMessage && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '12px',
            color: theme.danger.main
          }}>
          {errorMessage}
        </div>
      )}

      {!error && helperText && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '12px',
            color: theme.text.secondary
          }}>
          {helperText}
        </div>
      )}

      {name && <input type="hidden" name={name} value={Array.isArray(currentValue) ? currentValue.join(',') : currentValue || ''} />}
    </div>
  );
};
