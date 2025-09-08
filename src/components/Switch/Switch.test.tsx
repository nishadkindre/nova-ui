import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch } from './Switch';

describe('Switch Component', () => {
  // Test 1: Basic rendering
  it('renders switch component', () => {
    render(<Switch label="Test switch" />);

    const switchElement = screen.getByRole('checkbox');
    const label = screen.getByText('Test switch');

    expect(switchElement).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  // Test 2: Default unchecked state
  it('renders unchecked by default', () => {
    render(<Switch label="Test switch" />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).not.toBeChecked();
  });

  // Test 3: Default checked state
  it('renders checked when defaultChecked is true', () => {
    render(<Switch label="Test switch" defaultChecked />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();
  });

  // Test 4: Controlled checked state
  it('respects controlled checked prop', () => {
    render(<Switch label="Test switch" checked />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeChecked();
  });

  // Test 5: Click handler
  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<Switch label="Test switch" onChange={handleChange} />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Test 6: Toggle functionality
  it('toggles state when clicked in uncontrolled mode', () => {
    render(<Switch label="Test switch" />);

    const switchElement = screen.getByRole('checkbox');

    // Initially unchecked
    expect(switchElement).not.toBeChecked();

    // Click to check
    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    // Click to uncheck
    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  // Test 7: Disabled state
  it('disables the switch when disabled prop is true', () => {
    render(<Switch label="Test switch" disabled />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeDisabled();
  });

  // Test 8: Disabled state prevents changes
  it('does not call onChange when disabled and clicked', () => {
    const handleChange = jest.fn();
    render(<Switch label="Test switch" disabled onChange={handleChange} />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(handleChange).not.toHaveBeenCalled();
  });

  // Test 9: Label click toggles switch
  it('toggles switch when label is clicked', () => {
    render(<Switch label="Test switch" />);

    const switchElement = screen.getByRole('checkbox');
    const label = screen.getByText('Test switch');

    expect(switchElement).not.toBeChecked();

    fireEvent.click(label);
    expect(switchElement).toBeChecked();
  });

  // Test 10: Different sizes
  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Switch label="Test switch" size={size} />);

      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeInTheDocument();

      unmount();
    });
  });

  // Test 11: Different variants
  it('renders with different variants', () => {
    const variants = ['default', 'success', 'warning', 'danger'] as const;

    variants.forEach(variant => {
      const { unmount } = render(<Switch label="Test switch" variant={variant} />);

      const switchElement = screen.getByRole('checkbox');
      expect(switchElement).toBeInTheDocument();

      unmount();
    });
  });

  // Test 12: Description text
  it('renders description when provided', () => {
    const description = 'This is a description';
    render(<Switch label="Test switch" description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  // Test 13: Name attribute
  it('applies name attribute to input', () => {
    render(<Switch label="Test switch" name="test-switch" />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toHaveAttribute('name', 'test-switch');
  });

  // Test 14: Custom ID
  it('applies custom ID to input', () => {
    render(<Switch label="Test switch" id="custom-switch" />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toHaveAttribute('id', 'custom-switch');
  });

  // Test 15: Auto-generated ID
  it('generates ID when not provided', () => {
    render(<Switch label="Test switch" />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toHaveAttribute('id');
    expect(switchElement.getAttribute('id')).toMatch(/^switch-/);
  });

  // Test 16: Accessibility attributes
  it('has proper accessibility attributes', () => {
    const ariaLabel = 'Toggle notifications';
    const ariaDescribedBy = 'switch-description';

    render(<Switch label="Test switch" aria-label={ariaLabel} aria-describedby={ariaDescribedBy} />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toHaveAttribute('aria-label', ariaLabel);
    expect(switchElement).toHaveAttribute('aria-describedby', ariaDescribedBy);
  });

  // Test 17: Custom className
  it('applies custom className', () => {
    render(<Switch label="Test switch" className="custom-switch" />);

    // Check if the label (container) has the custom class
    const label = screen.getByText('Test switch').closest('label');
    expect(label).toHaveClass('custom-switch');
  });

  // Test 18: Custom styles
  it('applies custom styles', () => {
    const customStyle = { marginTop: '20px' };
    render(<Switch label="Test switch" style={customStyle} />);

    const label = screen.getByText('Test switch').closest('label');
    expect(label).toHaveStyle('margin-top: 20px');
  });

  // Test 19: Without label
  it('renders without label', () => {
    render(<Switch aria-label="Toggle switch" />);

    const switchElement = screen.getByRole('checkbox');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('aria-label', 'Toggle switch');
  });

  // Test 20: Keyboard navigation
  it('responds to keyboard events', () => {
    const handleChange = jest.fn();
    render(<Switch label="Test switch" onChange={handleChange} />);

    const switchElement = screen.getByRole('checkbox');

    // Focus and press space
    switchElement.focus();
    fireEvent.keyDown(switchElement, { key: ' ', code: 'Space' });

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
