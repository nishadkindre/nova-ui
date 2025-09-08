import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select, SelectOption } from './Select';

// Mock options for testing
const mockOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
  { value: 'elderberry', label: 'Elderberry' }
];

const mockOptionsWithIcons: SelectOption[] = [
  { value: 'user', label: 'User', icon: '👤' },
  { value: 'admin', label: 'Admin', icon: '⚡' },
  { value: 'guest', label: 'Guest', icon: '👥' }
];

const mockOptionsWithDescriptions: SelectOption[] = [
  { value: 'basic', label: 'Basic Plan', description: '$10/month - Essential features' },
  { value: 'pro', label: 'Pro Plan', description: '$25/month - Advanced features' },
  { value: 'enterprise', label: 'Enterprise', description: '$50/month - All features' }
];

describe('Select Component', () => {
  // Test 1: Basic rendering
  it('renders select with placeholder', () => {
    render(<Select options={mockOptions} placeholder="Choose fruit" />);

    expect(screen.getByText('Choose fruit')).toBeInTheDocument();
  });

  // Test 2: Opens dropdown on click
  it('opens dropdown when clicked', () => {
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByText('Apple')).toBeVisible();
    expect(screen.getByText('Banana')).toBeVisible();
  });

  // Test 3: Selects option
  it('selects option when clicked', () => {
    const onChange = jest.fn();
    render(<Select options={mockOptions} onChange={onChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const appleOption = screen.getByText('Apple');
    fireEvent.click(appleOption);

    expect(onChange).toHaveBeenCalledWith('apple');
  });

  // Test 4: Shows selected value
  it('displays selected value', () => {
    render(<Select options={mockOptions} value="banana" />);

    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  // Test 5: Multiple selection
  it('handles multiple selection', () => {
    const onChange = jest.fn();
    render(<Select options={mockOptions} multiple onChange={onChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    fireEvent.click(screen.getByText('Apple'));
    fireEvent.click(screen.getByText('Banana'));

    expect(onChange).toHaveBeenCalledWith(['apple']);
    expect(onChange).toHaveBeenCalledWith(['apple', 'banana']);
  });

  // Test 6: Keyboard navigation
  it('handles keyboard navigation', () => {
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');
    select.focus();

    // Open dropdown with Enter
    fireEvent.keyDown(select, { key: 'Enter' });
    expect(screen.getByText('Apple')).toBeVisible();

    // Navigate down
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    fireEvent.keyDown(select, { key: 'ArrowDown' });

    // Select with Enter
    fireEvent.keyDown(select, { key: 'Enter' });
  });

  // Test 7: Search functionality
  it('filters options when searchable', async () => {
    render(<Select options={mockOptions} searchable />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'app' } });

    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeVisible();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });
  });

  // Test 8: Disabled state
  it('disables select when disabled', () => {
    render(<Select options={mockOptions} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('tabIndex', '-1');

    fireEvent.click(select);
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  // Test 9: Disabled options
  it('handles disabled options', () => {
    const onChange = jest.fn();
    render(<Select options={mockOptions} onChange={onChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const disabledOption = screen.getByText('Date');
    fireEvent.click(disabledOption);

    expect(onChange).not.toHaveBeenCalled();
  });

  // Test 10: Clear functionality
  it('clears selection when clearable', () => {
    const onChange = jest.fn();
    render(<Select options={mockOptions} value="apple" clearable onChange={onChange} />);

    const clearButton = screen.getByLabelText('Clear selection');
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith('');
  });

  // Test 11: Label rendering
  it('renders label when provided', () => {
    render(<Select options={mockOptions} label="Choose a fruit" />);

    expect(screen.getByText('Choose a fruit')).toBeInTheDocument();
  });

  // Test 12: Error state
  it('shows error message', () => {
    render(<Select options={mockOptions} error errorMessage="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  // Test 13: Helper text
  it('shows helper text', () => {
    render(<Select options={mockOptions} helperText="Select your favorite fruit" />);

    expect(screen.getByText('Select your favorite fruit')).toBeInTheDocument();
  });

  // Test 14: Loading state
  it('shows loading indicator', () => {
    render(<Select options={mockOptions} loading />);

    expect(screen.getByText('⟳')).toBeInTheDocument();
  });

  // Test 15: Custom option rendering
  it('renders custom options', () => {
    const renderOption = (option: SelectOption) => (
      <div>
        {option.icon} {option.label}
      </div>
    );

    render(<Select options={mockOptionsWithIcons} renderOption={renderOption} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByText('👤 User')).toBeInTheDocument();
  });

  // Test 16: Options with descriptions
  it('renders options with descriptions', () => {
    render(<Select options={mockOptionsWithDescriptions} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByText('$10/month - Essential features')).toBeInTheDocument();
  });

  // Test 17: Different sizes
  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Select options={mockOptions} size={size} />);

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();

      unmount();
    });
  });

  // Test 18: Default value
  it('uses default value for uncontrolled select', () => {
    render(<Select options={mockOptions} defaultValue="cherry" />);

    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  // Test 19: Multiple selection display
  it('shows correct text for multiple selections', () => {
    render(<Select options={mockOptions} multiple value={['apple', 'banana']} />);

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  // Test 20: Click outside closes dropdown
  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <Select options={mockOptions} />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByText('Apple')).toBeVisible();

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  // Test 21: Hidden input for forms
  it('renders hidden input with name', () => {
    const { container } = render(<Select options={mockOptions} name="fruit" value="apple" />);

    const hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput).toHaveAttribute('name', 'fruit');
    expect(hiddenInput).toHaveAttribute('value', 'apple');
  });

  // Test 22: Custom search placeholder
  it('uses custom search placeholder', () => {
    render(<Select options={mockOptions} searchable searchPlaceholder="Type to search..." />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument();
  });

  // Test 23: No options state
  it('shows no options message', () => {
    render(<Select options={[]} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByText('No options available')).toBeInTheDocument();
  });

  // Test 24: No search results
  it('shows no results message when search yields no results', async () => {
    render(<Select options={mockOptions} searchable />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'xyz' } });

    await waitFor(() => {
      expect(screen.getByText('No options found')).toBeInTheDocument();
    });
  });

  // Test 25: Escape key closes dropdown
  it('closes dropdown with escape key', () => {
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    expect(screen.getByText('Apple')).toBeVisible();

    fireEvent.keyDown(select, { key: 'Escape' });

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });
});
