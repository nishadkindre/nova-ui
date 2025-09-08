import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

// Storybook configuration for Tooltip component
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible tooltip component that displays contextual information on hover or focus. Supports multiple placements, variants, and custom styling.'
      }
    }
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger element'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'light'],
      description: 'Visual style variant of the tooltip'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the tooltip'
    },
    delay: {
      control: { type: 'number' },
      description: 'Delay before showing tooltip (in milliseconds)'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the tooltip is disabled'
    },
    content: {
      control: { type: 'text' },
      description: 'Content to display in the tooltip'
    }
  },
  // Default args for all stories
  args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
    variant: 'default',
    size: 'medium',
    delay: 300,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  render: args => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  )
};

// Placement variations
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', padding: '100px' }}>
      <Tooltip content="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be positioned on any side of the trigger element.'
      }
    }
  }
};

// Variant styles
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="Default tooltip" variant="default">
        <Button variant="filled">Default</Button>
      </Tooltip>
      <Tooltip content="Dark tooltip" variant="dark">
        <Button variant="outlined">Dark</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light">
        <Button variant="text">Light</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for tooltips to match your design needs.'
      }
    }
  }
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="Small tooltip" size="small">
        <Button size="small">Small</Button>
      </Tooltip>
      <Tooltip content="Medium tooltip" size="medium">
        <Button size="medium">Medium</Button>
      </Tooltip>
      <Tooltip content="Large tooltip" size="large">
        <Button size="large">Large</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips come in different sizes to match your content needs.'
      }
    }
  }
};

// Complex content
export const ComplexContent: Story = {
  render: () => (
    <Tooltip
      content={
        <div>
          <strong>User Profile</strong>
          <br />
          <small>Click to view detailed information</small>
        </div>
      }
      variant="light"
      size="large">
      <Button icon={<span>👤</span>}>Profile</Button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain rich content including formatted text and other elements.'
      }
    }
  }
};

// With delay
export const WithDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="No delay" delay={0}>
        <Button>No Delay</Button>
      </Tooltip>
      <Tooltip content="Default delay (300ms)" delay={300}>
        <Button>Default</Button>
      </Tooltip>
      <Tooltip content="Long delay (1000ms)" delay={1000}>
        <Button>Long Delay</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control when tooltips appear with custom delay settings.'
      }
    }
  }
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="This tooltip is enabled">
        <Button>Enabled Tooltip</Button>
      </Tooltip>
      <Tooltip content="This tooltip is disabled" disabled>
        <Button variant="outlined">Disabled Tooltip</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be disabled when not needed.'
      }
    }
  }
};

// Interactive demo
export const Interactive: Story = {
  render: args => (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <p style={{ marginBottom: '20px', color: '#666' }}>Hover over or focus the button below to see the tooltip in action.</p>
      <Tooltip {...args}>
        <Button variant="filled" color="primary">
          Interactive Button
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Try different combinations of props to see how the tooltip behaves.'
      }
    }
  }
};

// Button Integration Demo - Shows the fix for ref forwarding
export const ButtonIntegration: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '50px' }}>
      <Tooltip content="Primary button tooltip" placement="top">
        <Button variant="filled" color="primary">Primary</Button>
      </Tooltip>
      <Tooltip content="Secondary button tooltip" placement="bottom">
        <Button variant="outlined" color="secondary">Secondary</Button>
      </Tooltip>
      <Tooltip content="Success button with icon" placement="left">
        <Button variant="filled" color="success" icon={<span>✓</span>}>Success</Button>
      </Tooltip>
      <Tooltip content="Loading button tooltip" placement="right">
        <Button variant="outlined" color="primary" loading>Loading</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper integration between Tooltip and Button components with ref forwarding working correctly.'
      }
    }
  }
};

// Different trigger elements
export const DifferentTriggers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Tooltip content="Button tooltip">
        <Button>Button</Button>
      </Tooltip>
      <Tooltip content="Link tooltip">
        <a href="#" style={{ color: '#0066cc', textDecoration: 'underline' }}>
          Link
        </a>
      </Tooltip>
      <Tooltip content="Span tooltip">
        <span
          style={{
            padding: '8px 12px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
            cursor: 'help'
          }}>
          Hover me
        </span>
      </Tooltip>
      <Tooltip content="Icon tooltip">
        <span
          style={{
            fontSize: '24px',
            cursor: 'help',
            display: 'inline-block'
          }}>
          ℹ️
        </span>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be attached to any React element that accepts event handlers.'
      }
    }
  }
};
