import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

// Storybook configuration for Switch component
const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component for binary choices. Supports different sizes, variants, and states with full accessibility support.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the switch'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger'],
      description: 'Visual variant of the switch'
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the switch is checked (controlled)'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the switch'
    },
    description: {
      control: { type: 'text' },
      description: 'Description text below the label'
    }
  },
  args: {
    size: 'medium',
    variant: 'default',
    disabled: false,
    label: 'Enable notifications'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  render: args => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onChange={setChecked} />;
  }
};

// Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlledChecked, setControlledChecked] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Controlled Switch</h4>
          <Switch label="Controlled switch" description="State managed by parent component" checked={controlledChecked} onChange={setControlledChecked} />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Uncontrolled Switch</h4>
          <Switch label="Uncontrolled switch" description="Manages its own state internally" defaultChecked={false} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Switches can be controlled (state managed externally) or uncontrolled (manages its own state).'
      }
    }
  }
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Switch size="small" label="Small switch" description="Compact size for tight spaces" />
      <Switch size="medium" label="Medium switch" description="Default size for most use cases" defaultChecked />
      <Switch size="large" label="Large switch" description="Larger size for better visibility" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switches come in three sizes to fit different design needs.'
      }
    }
  }
};

// Variant styles
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Switch variant="default" label="Default variant" defaultChecked />
      <Switch variant="success" label="Success variant" description="For positive actions" defaultChecked />
      <Switch variant="warning" label="Warning variant" description="For cautionary actions" defaultChecked />
      <Switch variant="danger" label="Danger variant" description="For potentially harmful actions" defaultChecked />
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

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Switch label="Enabled - Unchecked" description="Normal unchecked state" />
      <Switch label="Enabled - Checked" description="Normal checked state" defaultChecked />
      <Switch label="Disabled - Unchecked" description="Disabled unchecked state" disabled />
      <Switch label="Disabled - Checked" description="Disabled checked state" disabled defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states showing enabled/disabled and checked/unchecked combinations.'
      }
    }
  }
};

// Without labels
export const WithoutLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Switch aria-label="Toggle setting 1" />
      <Switch aria-label="Toggle setting 2" defaultChecked variant="success" />
      <Switch aria-label="Toggle setting 3" size="large" variant="warning" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switches can be used without visible labels when space is limited. Always provide aria-label for accessibility.'
      }
    }
  }
};

// Form integration
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      notifications: true,
      marketing: false,
      analytics: true,
      location: false
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setFormData(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>Privacy Settings</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Switch
            name="notifications"
            label="Push Notifications"
            description="Receive notifications about important updates"
            checked={formData.notifications}
            onChange={handleChange('notifications')}
          />

          <Switch
            name="marketing"
            label="Marketing Communications"
            description="Receive newsletters and promotional content"
            checked={formData.marketing}
            onChange={handleChange('marketing')}
            variant="warning"
          />

          <Switch
            name="analytics"
            label="Analytics & Performance"
            description="Help us improve by sharing anonymous usage data"
            checked={formData.analytics}
            onChange={handleChange('analytics')}
            variant="success"
          />

          <Switch name="location" label="Location Services" description="Allow location-based features and content" checked={formData.location} onChange={handleChange('location')} variant="danger" />
        </div>

        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
          <strong>Current Settings:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of switches integrated into a form with real-time state updates.'
      }
    }
  }
};

// Interactive playground
export const Interactive: Story = {
  render: args => {
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <div style={{ padding: '20px' }}>
        <Switch {...args} checked={checked} onChange={setChecked} />

        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
          <strong>Current State:</strong> {checked ? 'ON' : 'OFF'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive switch to test different prop combinations.'
      }
    }
  }
};
