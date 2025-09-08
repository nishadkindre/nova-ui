import React, { useState, useRef, useEffect, useCallback } from 'react';
import { theme } from '../../tokens';

/**
 * Tooltip Component - NovaUI
 *
 * A flexible tooltip component that displays contextual information on hover/focus.
 * Supports multiple placements, variants, and custom styling.
 *
 * Usage:
 * <Tooltip content="This is a tooltip" placement="top">
 *   <Button>Hover me</Button>
 * </Tooltip>
 */

export interface TooltipProps {
  /** Content of the tooltip */
  content: React.ReactNode;

  /** Element that triggers the tooltip */
  children: React.ReactElement;

  /** Placement of the tooltip relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';

  /** Visual variant of the tooltip */
  variant?: 'default' | 'dark' | 'light';

  /** Size of the tooltip */
  size?: 'small' | 'medium' | 'large';

  /** Delay before showing tooltip (in ms) */
  delay?: number;

  /** Whether tooltip is disabled */
  disabled?: boolean;

  /** Custom class name */
  className?: string;

  /** Custom styles */
  style?: React.CSSProperties;
}

// Helper function to merge refs
const mergeRefs = <T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

export const Tooltip: React.FC<TooltipProps> = ({ content, children, placement = 'top', variant = 'default', size = 'medium', delay = 300, disabled = false, className = '', style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const getTooltipStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 1000,
      pointerEvents: 'none',
      borderRadius: '6px',
      fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px',
      padding: size === 'small' ? '4px 8px' : size === 'medium' ? '6px 12px' : '8px 16px',
      maxWidth: '300px',
      wordWrap: 'break-word',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'opacity 0.15s ease-in-out, visibility 0.15s ease-in-out',
      transform: getTransform(),
      ...style
    };

    // Variant styles
    switch (variant) {
      case 'dark':
        return {
          ...baseStyles,
          backgroundColor: theme.background.dark,
          color: theme.background.white,
          border: `1px solid ${theme.secondary.main}`
        };
      case 'light':
        return {
          ...baseStyles,
          backgroundColor: theme.background.white,
          color: theme.text.primary,
          border: `1px solid ${theme.border.default}`,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: theme.secondary.dark,
          color: theme.background.white,
          border: `1px solid ${theme.secondary.main}`
        };
    }
  };

  const getTransform = () => {
    switch (placement) {
      case 'top':
        return 'translateX(-50%) translateY(-100%)';
      case 'bottom':
        return 'translateX(-50%) translateY(8px)';
      case 'left':
        return 'translateY(-50%) translateX(-100%)';
      case 'right':
        return 'translateY(-50%) translateX(8px)';
      default:
        return 'translateX(-50%) translateY(-100%)';
    }
  };

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();

    let x = 0;
    let y = 0;

    switch (placement) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - 8;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.bottom;
        break;
      case 'left':
        x = triggerRect.left - 8;
        y = triggerRect.top + triggerRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right;
        y = triggerRect.top + triggerRect.height / 2;
        break;
    }

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    if (disabled) return;
    calculatePosition();
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  // Get the existing handlers from the child component
  const childProps = children.props || {};
  const existingOnMouseEnter = childProps.onMouseEnter;
  const existingOnMouseLeave = childProps.onMouseLeave;
  const existingOnFocus = childProps.onFocus;
  const existingOnBlur = childProps.onBlur;
  const existingRef = (children as any).ref;

  // Merge handlers to not override existing ones
  const mergedHandlers = {
    onMouseEnter: useCallback((e: React.MouseEvent) => {
      handleMouseEnter();
      if (existingOnMouseEnter) existingOnMouseEnter(e);
    }, [existingOnMouseEnter]),
    
    onMouseLeave: useCallback((e: React.MouseEvent) => {
      handleMouseLeave();
      if (existingOnMouseLeave) existingOnMouseLeave(e);
    }, [existingOnMouseLeave]),
    
    onFocus: useCallback((e: React.FocusEvent) => {
      handleFocus();
      if (existingOnFocus) existingOnFocus(e);
    }, [existingOnFocus]),
    
    onBlur: useCallback((e: React.FocusEvent) => {
      handleBlur();
      if (existingOnBlur) existingOnBlur(e);
    }, [existingOnBlur])
  };

  const trigger = React.cloneElement(children, {
    ref: existingRef ? mergeRefs(triggerRef, existingRef) : triggerRef,
    ...mergedHandlers
  });

  return (
    <>
      {trigger}
      <div
        ref={tooltipRef}
        className={className}
        style={{
          ...getTooltipStyles(),
          left: position.x,
          top: position.y
        }}
        role="tooltip"
        aria-hidden={!isVisible}>
        {content}
      </div>
    </>
  );
};
