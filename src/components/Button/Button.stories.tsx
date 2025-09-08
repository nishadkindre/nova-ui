import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Mock icon for stories
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Storybook configuration for Button component
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, colors, and states. Features loading states, icon support, and full accessibility.'
      }
    }
  },
  // Define which props can be controlled in Storybook
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text', 'link', 'icon'],
      description: 'Visual style variant of the button'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Color scheme of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the button'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button takes the full width of its container'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in loading state'
    },
    iconAt: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Position of the icon relative to text'
    },
    radius: {
      control: { type: 'text' },
      description: 'Border radius of the button'
    },
    round: {
      control: { type: 'boolean' },
      description: 'Whether the button has a circular shape'
    },
    children: {
      control: { type: 'text' },
      description: 'Content inside the button'
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked'
    }
  },
  // Default values for props
  args: {
    children: 'Button',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    iconAt: 'start'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - filled primary button
export const Primary: Story = {
  args: {
    variant: 'filled',
    color: 'primary',
    children: 'Primary Button'
  }
};

// Outlined variant story
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Outlined Button'
  }
};

// Text variant story
export const Text: Story = {
  args: {
    variant: 'text',
    color: 'primary',
    children: 'Text Button'
  }
};

// Link variant story
export const Link: Story = {
  args: {
    variant: 'link',
    color: 'primary',
    children: 'Link Button'
  }
};

// Icon variant story
export const IconOnly: Story = {
  args: {
    variant: 'icon',
    color: 'primary',
    icon: <StarIcon />,
    children: undefined
  }
};

// Small size story
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button'
  }
};

// Medium size story (default)
export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button'
  }
};

// Large size story
export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button'
  }
};

// Loading state story
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button'
  }
};

// Disabled state story
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
};

// With icon at start
export const WithIconStart: Story = {
  args: {
    icon: <StarIcon />,
    iconAt: 'start',
    children: 'Star Button'
  }
};

// With icon at end
export const WithIconEnd: Story = {
  args: {
    icon: <StarIcon />,
    iconAt: 'end',
    children: 'Star Button'
  }
};

// Story showing all variants together
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="filled" color="primary">
        Filled
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="text" color="primary">
        Text
      </Button>
      <Button variant="link" color="primary">
        Link
      </Button>
      <Button variant="icon" color="primary" icon={<StarIcon />} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.'
      }
    }
  }
};

// Story showing all colors together
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="filled" color="primary">
        Primary
      </Button>
      <Button variant="filled" color="secondary">
        Secondary
      </Button>
      <Button variant="filled" color="success">
        Success
      </Button>
      <Button variant="filled" color="danger">
        Danger
      </Button>
      <Button variant="filled" color="warning">
        Warning
      </Button>
      <Button variant="filled" color="info">
        Info
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button colors displayed together for comparison.'
      }
    }
  }
};

// Story showing all sizes together
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="large" radius="24px">
        Rounded
      </Button>
      <Button size="small" fullWidth>
        Full Width
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.'
      }
    }
  }
};

// Story showing states
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="filled" color="primary">
        Normal
      </Button>
      <Button variant="filled" color="primary" loading>
        Loading
      </Button>
      <Button variant="filled" color="primary" disabled>
        Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button states: normal, loading, and disabled.'
      }
    }
  }
};

// Story showing outlined variant with all colors
export const OutlinedColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined" color="success">
        Success
      </Button>
      <Button variant="outlined" color="danger">
        Danger
      </Button>
      <Button variant="outlined" color="warning">
        Warning
      </Button>
      <Button variant="outlined" color="info">
        Info
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined variant with all available colors.'
      }
    }
  }
};

// Story showing icon buttons in different sizes
export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="icon" color="primary" size="small" icon={<StarIcon />} />
      <Button variant="icon" color="primary" size="medium" icon={<StarIcon />} />
      <Button variant="icon" color="primary" size="large" icon={<StarIcon />} />
      <Button variant="icon" color="primary" size="large" icon={<StarIcon />} round />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon buttons in different sizes.'
      }
    }
  }
};
