import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Button } from '../Button/Button';

// Helper component for notification badge examples
const NotificationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
);

// Storybook configuration for Badge component
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible badge component for displaying status, counts, or labels. Supports multiple variants, sizes, and can be used standalone or as a notification badge.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Visual variant of the badge'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the badge'
    },
    style: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'dot'],
      description: 'Style variant of the badge'
    },
    circular: {
      control: { type: 'boolean' },
      description: 'Whether the badge is circular (for counts/numbers)'
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum number to display (shows max+ when exceeded)'
    },
    showZero: {
      control: { type: 'boolean' },
      description: 'Whether to show the badge when count is 0'
    },
    children: {
      control: { type: 'text' },
      description: 'Content of the badge'
    }
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'medium',
    style: 'filled',
    circular: false,
    showZero: false
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different color variants to convey semantic meaning.'
      }
    }
  }
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge size="small" variant="primary">
        Small
      </Badge>
      <Badge size="medium" variant="primary">
        Medium
      </Badge>
      <Badge size="large" variant="primary">
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges come in three sizes to fit different design needs.'
      }
    }
  }
};

// Styles
export const Styles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Badge style="filled" variant="primary">
          Filled
        </Badge>
        <span style={{ fontSize: '12px', color: '#666' }}>Filled</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Badge style="outlined" variant="primary">
          Outlined
        </Badge>
        <span style={{ fontSize: '12px', color: '#666' }}>Outlined</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Badge style="dot" variant="primary" />
        <span style={{ fontSize: '12px', color: '#666' }}>Dot</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different style variants: filled (default), outlined, and dot for status indicators.'
      }
    }
  }
};

// Circular badges for numbers
export const Circular: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge circular variant="danger" size="small">
        3
      </Badge>
      <Badge circular variant="primary">
        12
      </Badge>
      <Badge circular variant="success" size="large">
        99
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Circular badges are perfect for displaying counts and numbers.'
      }
    }
  }
};

// Max value and overflow
export const MaxValue: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge circular variant="danger" max={9}>
        5
      </Badge>
      <Badge circular variant="danger" max={9}>
        12
      </Badge>
      <Badge circular variant="danger" max={99}>
        150
      </Badge>
      <Badge circular variant="danger" max={999}>
        1500
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use max prop to limit displayed numbers and show overflow indicator (max+).'
      }
    }
  }
};

// Zero handling
export const ZeroHandling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Badge circular variant="danger" showZero={false}>
          0
        </Badge>
        <span style={{ fontSize: '12px', color: '#666' }}>showZero: false</span>
        <span style={{ fontSize: '11px', color: '#999' }}>(hidden)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Badge circular variant="danger" showZero={true}>
          0
        </Badge>
        <span style={{ fontSize: '12px', color: '#666' }}>showZero: true</span>
        <span style={{ fontSize: '11px', color: '#999' }}>(visible)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Control whether badges with zero count are displayed using the showZero prop.'
      }
    }
  }
};

// Notification badges
export const NotificationBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="outlined" icon={<NotificationIcon />} />
        <Badge
          circular
          variant="danger"
          size="small"
          customStyle={{
            position: 'absolute',
            top: '-6px',
            right: '-6px'
          }}>
          3
        </Badge>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="outlined">Messages</Button>
        <Badge
          circular
          variant="danger"
          size="small"
          max={99}
          customStyle={{
            position: 'absolute',
            top: '-8px',
            right: '-8px'
          }}>
          150
        </Badge>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="outlined" icon={<span>📧</span>}>
          Email
        </Button>
        <Badge
          style="dot"
          variant="success"
          size="small"
          customStyle={{
            position: 'absolute',
            top: '2px',
            right: '2px'
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common usage patterns for notification badges on buttons and icons.'
      }
    }
  }
};

// Status indicators
export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge style="dot" variant="success" />
        <span>Online</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge style="dot" variant="warning" />
        <span>Away</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge style="dot" variant="danger" />
        <span>Offline</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge style="dot" variant="info" />
        <span>Busy</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use dot-style badges as status indicators next to text or user names.'
      }
    }
  }
};

// Content variations
export const ContentVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary">New</Badge>
      <Badge variant="success">✓ Done</Badge>
      <Badge variant="warning">⚠ Warning</Badge>
      <Badge variant="info">v2.1.0</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="danger" circular>
        !
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can contain text, emojis, symbols, or version numbers.'
      }
    }
  }
};

// Interactive playground
export const Interactive: Story = {
  render: args => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Badge {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badge to test different prop combinations.'
      }
    }
  }
};
