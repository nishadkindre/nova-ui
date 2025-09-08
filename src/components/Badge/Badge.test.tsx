import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './Badge';

describe('Badge Component', () => {
  // Test 1: Basic rendering
  it('renders badge with text content', () => {
    render(<Badge>Test Badge</Badge>);

    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  // Test 2: Numeric content
  it('renders badge with numeric content', () => {
    render(<Badge>5</Badge>);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  // Test 3: Max value limiting
  it('shows max+ when number exceeds max', () => {
    render(<Badge max={99}>150</Badge>);

    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  // Test 4: Zero handling without showZero
  it('does not render when count is 0 and showZero is false', () => {
    const { container } = render(<Badge showZero={false}>0</Badge>);

    expect(container.firstChild).toBeNull();
  });

  // Test 5: Zero handling with showZero
  it('renders when count is 0 and showZero is true', () => {
    render(<Badge showZero={true}>0</Badge>);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // Test 6: Different variants
  it('renders with different variants', () => {
    const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;

    variants.forEach(variant => {
      const { unmount } = render(<Badge variant={variant}>Test</Badge>);

      expect(screen.getByText('Test')).toBeInTheDocument();

      unmount();
    });
  });

  // Test 7: Different sizes
  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Badge size={size}>Test</Badge>);

      expect(screen.getByText('Test')).toBeInTheDocument();

      unmount();
    });
  });

  // Test 8: Different styles
  it('renders with different styles', () => {
    const styles = ['filled', 'outlined', 'dot'] as const;

    styles.forEach(style => {
      const { unmount } = render(<Badge style={style}>Test</Badge>);

      if (style === 'dot') {
        // Dot style doesn't show content
        expect(screen.queryByText('Test')).not.toBeInTheDocument();
      } else {
        expect(screen.getByText('Test')).toBeInTheDocument();
      }

      unmount();
    });
  });

  // Test 9: Circular badge
  it('renders circular badge', () => {
    render(<Badge circular>5</Badge>);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  // Test 10: Dot style badge
  it('renders dot style badge without content', () => {
    const { container } = render(<Badge style="dot">Content</Badge>);

    // Content should not be visible in dot style
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    // Should still render the badge element
    expect(container.firstChild).toBeInTheDocument();
  });

  // Test 11: Dot style with accessibility
  it('has proper accessibility attributes for dot style', () => {
    render(
      <Badge style="dot" variant="success">
        Status
      </Badge>
    );

    const badge = document.querySelector('[role="status"]');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('aria-label', 'success status indicator');
  });

  // Test 12: Custom className
  it('applies custom className', () => {
    render(<Badge className="custom-badge">Test</Badge>);

    const badge = screen.getByText('Test');
    expect(badge).toHaveClass('custom-badge');
  });

  // Test 13: Custom styles
  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'purple', color: 'white' };
    render(<Badge customStyle={customStyle}>Test</Badge>);

    const badge = screen.getByText('Test');
    expect(badge).toHaveStyle('background-color: purple');
    expect(badge).toHaveStyle('color: white');
  });

  // Test 14: Empty content
  it('handles empty content gracefully', () => {
    const { container } = render(<Badge></Badge>);

    // Should return null and not render anything for empty content
    expect(container.firstChild).toBeNull();
  });

  // Test 15: String number content
  it('handles string numbers correctly', () => {
    render(<Badge>{'42'}</Badge>);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  // Test 16: Variant and style combinations
  it('renders filled primary badge correctly', () => {
    render(
      <Badge variant="primary" style="filled">
        Primary
      </Badge>
    );

    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  // Test 17: Outlined secondary badge
  it('renders outlined secondary badge correctly', () => {
    render(
      <Badge variant="secondary" style="outlined">
        Secondary
      </Badge>
    );

    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  // Test 18: Large success badge
  it('renders large success badge correctly', () => {
    render(
      <Badge variant="success" size="large">
        Success
      </Badge>
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  // Test 19: Small danger badge
  it('renders small danger badge correctly', () => {
    render(
      <Badge variant="danger" size="small">
        Error
      </Badge>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  // Test 20: Complex content
  it('renders complex React content', () => {
    const complexContent = (
      <span>
        <strong>Bold</strong> text
      </span>
    );

    render(<Badge>{complexContent}</Badge>);

    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
