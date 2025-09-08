import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

// Mock component for testing
const TriggerButton = React.forwardRef<HTMLButtonElement, any>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));

describe('Tooltip Component', () => {
  // Test 1: Basic rendering
  it('renders tooltip trigger without tooltip content initially', () => {
    render(
      <Tooltip content="Tooltip text">
        <TriggerButton>Hover me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button', { name: /hover me/i });
    expect(trigger).toBeInTheDocument();

    // Tooltip should not be visible initially
    expect(screen.queryByText('Tooltip text')).not.toBeVisible();
  });

  // Test 2: Show tooltip on mouse enter
  it('shows tooltip on mouse enter', async () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <TriggerButton>Hover me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByText('Tooltip text')).toBeVisible();
    });
  });

  // Test 3: Hide tooltip on mouse leave
  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <TriggerButton>Hover me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByText('Tooltip text')).toBeVisible();
    });

    fireEvent.mouseLeave(trigger);

    await waitFor(() => {
      expect(screen.queryByText('Tooltip text')).not.toBeVisible();
    });
  });

  // Test 4: Show tooltip on focus
  it('shows tooltip on focus', async () => {
    render(
      <Tooltip content="Tooltip text">
        <TriggerButton>Focus me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByText('Tooltip text')).toBeVisible();
    });
  });

  // Test 5: Hide tooltip on blur
  it('hides tooltip on blur', async () => {
    render(
      <Tooltip content="Tooltip text">
        <TriggerButton>Focus me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByText('Tooltip text')).toBeVisible();
    });

    fireEvent.blur(trigger);

    await waitFor(() => {
      expect(screen.queryByText('Tooltip text')).not.toBeVisible();
    });
  });

  // Test 6: Different placements
  it('renders with different placements', () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const;

    placements.forEach(placement => {
      const { unmount } = render(
        <Tooltip content="Tooltip text" placement={placement}>
          <TriggerButton>Trigger</TriggerButton>
        </Tooltip>
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();

      unmount();
    });
  });

  // Test 7: Different variants
  it('renders with different variants', () => {
    const variants = ['default', 'dark', 'light'] as const;

    variants.forEach(variant => {
      const { unmount } = render(
        <Tooltip content="Tooltip text" variant={variant}>
          <TriggerButton>Trigger</TriggerButton>
        </Tooltip>
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();

      unmount();
    });
  });

  // Test 8: Different sizes
  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach(size => {
      const { unmount } = render(
        <Tooltip content="Tooltip text" size={size}>
          <TriggerButton>Trigger</TriggerButton>
        </Tooltip>
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();

      unmount();
    });
  });

  // Test 9: Disabled tooltip
  it('does not show tooltip when disabled', async () => {
    render(
      <Tooltip content="Tooltip text" disabled delay={0}>
        <TriggerButton>Hover me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    // Wait a bit to ensure tooltip doesn't appear
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(screen.queryByText('Tooltip text')).not.toBeVisible();
  });

  // Test 10: Custom delay
  it('respects custom delay', async () => {
    const customDelay = 500;

    render(
      <Tooltip content="Tooltip text" delay={customDelay}>
        <TriggerButton>Hover me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    // Should not be visible immediately
    expect(screen.queryByText('Tooltip text')).not.toBeVisible();

    // Should be visible after delay
    await waitFor(
      () => {
        expect(screen.getByText('Tooltip text')).toBeVisible();
      },
      { timeout: customDelay + 100 }
    );
  });

  // Test 11: Custom className
  it('applies custom className', () => {
    render(
      <Tooltip content="Tooltip text" className="custom-tooltip">
        <TriggerButton>Trigger</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  // Test 12: Custom styles
  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };

    render(
      <Tooltip content="Tooltip text" style={customStyle}>
        <TriggerButton>Trigger</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  // Test 13: Accessibility attributes
  it('has proper accessibility attributes', async () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <TriggerButton>Hover me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    });
  });

  // Test 14: Integration with Button component
  it('works correctly with Button component (ref forwarding)', async () => {
    render(
      <Tooltip content="Button tooltip" delay={0}>
        <Button>Click me</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    // Test hover interaction
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(screen.getByText('Button tooltip')).toBeVisible();
    });

    fireEvent.mouseLeave(button);

    await waitFor(() => {
      expect(screen.queryByText('Button tooltip')).not.toBeVisible();
    });
  });

  // Test 15: Complex content
  it('renders complex content in tooltip', async () => {
    const complexContent = (
      <div>
        <strong>Bold text</strong>
        <p>Paragraph text</p>
      </div>
    );

    render(
      <Tooltip content={complexContent} delay={0}>
        <TriggerButton>Hover me</TriggerButton>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByText('Bold text')).toBeVisible();
      expect(screen.getByText('Paragraph text')).toBeVisible();
    });
  });
});
