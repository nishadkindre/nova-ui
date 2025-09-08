import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, SelectOption } from './Select';
import { Badge } from '../Badge/Badge';

// Sample data
const fruitOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' }
];

const roleOptions: SelectOption[] = [
  { value: 'admin', label: 'Administrator', icon: '⚡', description: 'Full system access' },
  { value: 'editor', label: 'Editor', icon: '✏️', description: 'Can edit content' },
  { value: 'viewer', label: 'Viewer', icon: '👁️', description: 'Read-only access' },
  { value: 'guest', label: 'Guest', icon: '👥', description: 'Limited access', disabled: true }
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
  { value: 'fr', label: 'France', icon: '🇫🇷' },
  { value: 'jp', label: 'Japan', icon: '🇯🇵' },
  { value: 'br', label: 'Brazil', icon: '🇧🇷' },
  { value: 'in', label: 'India', icon: '🇮🇳' },
  { value: 'cn', label: 'China', icon: '🇨🇳' }
];

const statusOptions: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' }
];

// Storybook configuration
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible dropdown select component with search, multi-select, and custom options. Supports keyboard navigation and accessibility features.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the select'
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Whether multiple selection is allowed'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether the select is in error state'
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Whether the select is searchable'
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether selection can be cleared'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the select'
    }
  },
  args: {
    placeholder: 'Select an option',
    size: 'medium',
    multiple: false,
    disabled: false,
    error: false,
    searchable: false,
    clearable: false,
    loading: false
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    options: fruitOptions
  }
};

// Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = useState<string | number>('banana');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Controlled Select</h4>
          <Select options={fruitOptions} value={controlledValue} onChange={value => setControlledValue(value as string)} label="Controlled" clearable />
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>Current value: {controlledValue || 'none'}</p>
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Uncontrolled Select</h4>
          <Select options={fruitOptions} defaultValue="apple" label="Uncontrolled" clearable />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Selects can be controlled (state managed externally) or uncontrolled (manages its own state).'
      }
    }
  }
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <Select options={fruitOptions} size="small" label="Small" defaultValue="apple" />
      <Select options={fruitOptions} size="medium" label="Medium" defaultValue="banana" />
      <Select options={fruitOptions} size="large" label="Large" defaultValue="cherry" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Selects come in three sizes to fit different design needs.'
      }
    }
  }
};

// Multiple selection
export const MultipleSelection: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<(string | number)[]>(['apple', 'banana']);

    return (
      <div style={{ width: '300px' }}>
        <Select
          options={fruitOptions}
          multiple
          value={selectedValues}
          onChange={value => setSelectedValues(value as (string | number)[])}
          label="Select multiple fruits"
          placeholder="Choose fruits..."
          clearable
        />
        <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#666' }}>Selected: {selectedValues.length > 0 ? selectedValues.join(', ') : 'none'}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Enable multiple selection to allow users to choose several options.'
      }
    }
  }
};

// Searchable select
export const Searchable: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Select options={countryOptions} searchable label="Select a country" placeholder="Search for a country..." searchPlaceholder="Type to search countries..." clearable />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Add search functionality to filter through large lists of options.'
      }
    }
  }
};

// With icons and descriptions
export const WithIconsAndDescriptions: Story = {
  render: () => (
    <div style={{ width: '350px' }}>
      <Select options={roleOptions} label="Select user role" placeholder="Choose a role..." defaultValue="editor" clearable />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options can include icons and descriptions for better UX.'
      }
    }
  }
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <Select options={fruitOptions} label="Normal" defaultValue="apple" helperText="This is a normal select" />

      <Select options={fruitOptions} label="Disabled" defaultValue="banana" disabled helperText="This select is disabled" />

      <Select options={fruitOptions} label="Error" error errorMessage="This field is required" placeholder="Please select an option" />

      <Select options={fruitOptions} label="Loading" loading placeholder="Loading options..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states including disabled, error, and loading.'
      }
    }
  }
};

// Custom option rendering
export const CustomOptionRendering: Story = {
  render: () => {
    const customRenderOption = (option: SelectOption) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{option.icon}</span>
          <span>{option.label}</span>
        </div>
        <Badge variant={option.value === 'active' ? 'success' : 'secondary'} size="small">
          {option.label}
        </Badge>
      </div>
    );

    return (
      <div style={{ width: '300px' }}>
        <Select options={statusOptions} renderOption={customRenderOption} label="Status with custom rendering" placeholder="Select status..." clearable />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use custom rendering to create rich option displays.'
      }
    }
  }
};

// Form integration
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: '',
      role: '',
      fruits: [] as (string | number)[],
      status: 'active'
    });

    const handleChange = (field: string) => (value: string | number | (string | number)[]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600 }}>User Profile Form</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Select options={countryOptions} label="Country" placeholder="Select your country..." value={formData.country} onChange={handleChange('country')} searchable clearable name="country" />

          <Select options={roleOptions} label="Role" placeholder="Select your role..." value={formData.role} onChange={handleChange('role')} clearable name="role" />

          <Select
            options={fruitOptions}
            label="Favorite Fruits"
            placeholder="Select fruits..."
            value={formData.fruits}
            onChange={handleChange('fruits')}
            multiple
            searchable
            clearable
            name="fruits"
            helperText="You can select multiple fruits"
          />

          <Select options={statusOptions} label="Status" value={formData.status} onChange={handleChange('status')} name="status" />
        </div>

        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
          <strong>Form Data:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of selects integrated into a form with real-time state updates.'
      }
    }
  }
};

// Clearable select
export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('apple');

    return (
      <div style={{ width: '300px' }}>
        <Select options={fruitOptions} value={value} onChange={newValue => setValue(newValue as string)} label="Clearable select" clearable helperText="Click the × button to clear selection" />
        <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#666' }}>Current value: {value || 'none'}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Allow users to clear their selection with the clearable prop.'
      }
    }
  }
};

// Interactive playground
export const Interactive: Story = {
  render: args => {
    const [value, setValue] = useState<string | number | (string | number)[]>(args.multiple ? [] : '');

    return (
      <div style={{ width: '300px' }}>
        <Select {...args} options={fruitOptions} value={value} onChange={setValue} />

        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
          <strong>Current Value:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>{JSON.stringify(value, null, 2)}</pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive select to test different prop combinations.'
      }
    }
  }
};
