import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './Input';

// Test suite for Input component
describe('Input Component', () => {
  // Test 1: Check if input renders
  it('renders input field', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  // Test 2: Check if label is rendered and associated with input
  it('renders with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);

    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
  });

  // Test 3: Check required field indicator
  it('shows required indicator when required', () => {
    render(<Input label="Email" required />);

    // Look for the asterisk (*) indicating required field
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // Test 4: Check controlled input (value prop)
  it('works as controlled input', () => {
    const handleChange = jest.fn();

    render(<Input value="test value" onChange={handleChange} placeholder="Controlled input" />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  // Test 5: Check onChange handler
  it('calls onChange when typing', () => {
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} placeholder="Type here" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new text' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Test 6: Check disabled state
  it('handles disabled state correctly', () => {
    render(<Input disabled placeholder="Disabled input" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  // Test 7: Check error state with error message
  it('displays error message when in error state', () => {
    render(<Input error errorMessage="This field is required" placeholder="Error input" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  // Test 8: Check helper text
  it('displays helper text', () => {
    render(<Input helperText="Enter at least 8 characters" placeholder="Password input" />);

    expect(screen.getByText('Enter at least 8 characters')).toBeInTheDocument();
  });

  // Test 9: Check different input types
  it('renders different input types correctly', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" placeholder="Number" />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
  });

  // Test 10: Check focus and blur events
  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Focus test" />);

    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Test 11: Check accessibility attributes
  it('has correct accessibility attributes', () => {
    render(<Input label="Test Input" helperText="Helper text" required placeholder="Accessible input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  // Test 12: Check that error message takes priority over helper text
  it('prioritizes error message over helper text', () => {
    render(<Input error errorMessage="Error occurred" helperText="This should not be shown" placeholder="Priority test" />);

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
    expect(screen.queryByText('This should not be shown')).not.toBeInTheDocument();
  });

  // Test 13: Outlined variant renders by default
  it('renders outlined variant by default', () => {
    render(<Input placeholder="Outlined input" />);
    const input = screen.getByRole('textbox');
    // Outlined should have a border (not transparent)
    expect(input).toHaveStyle('border: 1px solid #e2e8f0');
    expect(input).toHaveStyle('background-color: #fff');
  });

  // Test 14: Filled variant renders with correct styles
  it('renders filled variant', () => {
    render(<Input variant="filled" placeholder="Filled input" />);
    const input = screen.getByRole('textbox');
    // Filled should have background color set to gray and border transparent if not error
    expect(input).toHaveStyle('background-color: #f8fafc');
    expect(input).toHaveStyle('border: 1px solid transparent');
  });
});
