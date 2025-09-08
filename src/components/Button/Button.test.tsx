import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

// Mock icon component for testing
const MockIcon = () => <span data-testid="mock-icon">🔥</span>;

describe('Button Component', () => {
  // Test 1: Basic rendering
  it('renders button with children', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  // Test 2: Click handler
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 3: Disabled state
  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  // Test 4: Size prop
  describe('Size Props', () => {
    it('applies small size correctly', () => {
      render(<Button size="small">Small Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '6px 14px' });
    });

    it('applies medium size correctly', () => {
      render(<Button size="medium">Medium Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '8px 16px' });
    });

    it('applies large size correctly', () => {
      render(<Button size="large">Large Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '12px 20px' });
    });

    it('defaults to medium size when no size prop is provided', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '8px 16px' });
    });
  });

  // Test 5: Button variants and colors
  describe('Button Variants and Colors', () => {
    it('renders filled variant with primary color correctly', () => {
      render(
        <Button variant="filled" color="primary">
          Filled Primary Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#18181b' });
    });

    it('renders filled variant with secondary color correctly', () => {
      render(
        <Button variant="filled" color="secondary">
          Filled Secondary Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#475569' });
    });

    it('renders outlined variant correctly', () => {
      render(
        <Button variant="outlined" color="primary">
          Outlined Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: 'transparent',
        border: '1px solid #18181b'
      });
    });

    it('renders danger color correctly', () => {
      render(
        <Button variant="filled" color="danger">
          Danger Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#b91c1c' });
    });

    it('renders success color correctly', () => {
      render(
        <Button variant="filled" color="success">
          Success Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#15803d' });
    });

    it('renders warning color correctly', () => {
      render(
        <Button variant="filled" color="warning">
          Warning Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#f59e0b' });
    });

    it('renders info color correctly', () => {
      render(
        <Button variant="filled" color="info">
          Info Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#0284c7' });
    });

    it('renders text variant correctly', () => {
      render(
        <Button variant="text" color="primary">
          Text Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: 'transparent',
        border: '1px solid transparent'
      });
    });

    it('renders link variant correctly', () => {
      render(
        <Button variant="link" color="primary">
          Link Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: 'transparent',
        color: '#18181b',
        textDecoration: 'none'
      });
    });

    it('renders icon variant correctly', () => {
      render(
        <Button variant="icon" color="primary">
          Icon Button
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({
        backgroundColor: 'transparent',
        color: '#18181b'
      });
    });

    it('defaults to filled variant and primary color', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#18181b' });
    });
  });

  // Test 6: Icon functionality
  describe('Icon Support', () => {
    it('renders icon-only button', () => {
      render(<Button icon={<MockIcon />} />);

      const icon = screen.getByTestId('mock-icon');
      expect(icon).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '8px' }); // Default medium size icon button
    });

    it('renders icon-only button with correct size for small', () => {
      render(<Button icon={<MockIcon />} size="small" />);

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '6px' });
    });

    it('renders icon-only button with correct size for large', () => {
      render(<Button icon={<MockIcon />} size="large" />);

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ padding: '12px' });
    });

    it('renders icon with text at start position (default)', () => {
      render(<Button icon={<MockIcon />}>Button Text</Button>);

      const button = screen.getByRole('button');
      const icon = screen.getByTestId('mock-icon');
      const text = screen.getByText('Button Text');

      expect(button).toContainElement(icon);
      expect(button).toContainElement(text);
      expect(button).toHaveStyle({ gap: '8px' });
    });

    it('renders icon with text at start position explicitly', () => {
      render(
        <Button icon={<MockIcon />} iconAt="start">
          Button Text
        </Button>
      );

      const button = screen.getByRole('button');
      const icon = screen.getByTestId('mock-icon');
      const text = screen.getByText('Button Text');

      expect(button).toContainElement(icon);
      expect(button).toContainElement(text);
    });

    it('renders icon with text at end position', () => {
      render(
        <Button icon={<MockIcon />} iconAt="end">
          Button Text
        </Button>
      );

      const button = screen.getByRole('button');
      const icon = screen.getByTestId('mock-icon');
      const text = screen.getByText('Button Text');

      expect(button).toContainElement(icon);
      expect(button).toContainElement(text);
    });

    it('renders button without icon when no icon prop is provided', () => {
      render(<Button>Just Text</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Just Text');
      expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
    });
  });

  // Test 7: Loading state
  describe('Loading State', () => {
    it('renders loading spinner when loading is true', () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      // Should have aria-busy="true"
      expect(button).toHaveAttribute('aria-busy', 'true');

      // Should be disabled when loading
      expect(button).toBeDisabled();
    });

    it('does not call onClick when loading', () => {
      const handleClick = jest.fn();

      render(
        <Button onClick={handleClick} loading>
          Loading Button
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
    });

    it('shows text with opacity when loading with children', () => {
      render(<Button loading>Loading Text</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Loading Text');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  // Test 8: Custom styling
  describe('Custom Styling', () => {
    it('applies custom styles correctly', () => {
      const customStyle = {
        backgroundColor: 'purple',
        color: 'white',
        borderRadius: '20px'
      };
      render(<Button style={customStyle}>Styled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveStyle(customStyle);
    });

    it('custom styles override default styles', () => {
      const customStyle = { backgroundColor: 'purple' };
      render(
        <Button variant="filled" color="primary" style={customStyle}>
          Custom Primary
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: 'purple' });
    });

    it('works without custom styles', () => {
      render(
        <Button variant="filled" color="primary">
          Normal Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveStyle({ backgroundColor: '#18181b' });
    });
  });

  // Test 9: Button types
  describe('Button Types', () => {
    it('renders submit button type', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders reset button type', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });

    it('can have button type explicitly set', () => {
      render(<Button type="button">Explicit Type</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  // Test 10: Accessibility
  describe('Accessibility', () => {
    it('has proper accessibility attributes when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('has proper accessibility attributes when enabled', () => {
      render(<Button>Enabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'false');
    });

    it('has aria-busy when loading', () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Test 11: Event handling
  describe('Event Handling', () => {
    it('handles focus events', () => {
      render(<Button>Focus Test</Button>);

      const button = screen.getByRole('button');

      fireEvent.focus(button);
      expect(button).toBeInTheDocument();
    });

    it('handles blur events', () => {
      render(<Button>Blur Test</Button>);

      const button = screen.getByRole('button');

      fireEvent.blur(button);
      expect(button).toBeInTheDocument();
    });

    it('handles mouse enter and leave events', () => {
      render(<Button>Hover Test</Button>);

      const button = screen.getByRole('button');

      fireEvent.mouseEnter(button);
      fireEvent.mouseLeave(button);
      expect(button).toBeInTheDocument();
    });
  });

  // Test 12: Combined features
  describe('Combined Features', () => {
    it('works with icon, custom size, variant, color, and style together', () => {
      const customStyle = { borderRadius: '20px' };
      render(
        <Button icon={<MockIcon />} variant="filled" color="success" size="large" style={customStyle} iconAt="end">
          Complex Button
        </Button>
      );

      const button = screen.getByRole('button');
      const icon = screen.getByTestId('mock-icon');

      expect(button).toContainElement(icon);
      expect(button).toHaveStyle({
        padding: '12px 20px', // large size
        backgroundColor: '#15803d', // success color
        borderRadius: '20px' // custom style
      });
      expect(button).toHaveTextContent('Complex Button');
    });

    it('handles disabled state with all features', () => {
      const handleClick = jest.fn();
      render(
        <Button icon={<MockIcon />} variant="filled" color="danger" size="small" disabled onClick={handleClick}>
          Disabled Complex
        </Button>
      );

      const button = screen.getByRole('button');

      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
      expect(button).toHaveStyle({ opacity: '0.6' });
    });

    it('handles loading state with all features', () => {
      const handleClick = jest.fn();
      render(
        <Button icon={<MockIcon />} variant="filled" color="info" size="medium" loading onClick={handleClick}>
          Loading Complex
        </Button>
      );

      const button = screen.getByRole('button');

      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveTextContent('Loading Complex');
    });
  });
});
