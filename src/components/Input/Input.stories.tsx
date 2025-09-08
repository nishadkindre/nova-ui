import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

// Storybook configuration for Input component
const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with label, validation, and helper text support. Designed for forms and user data collection.'
      }
    }
  },
  // Define which props can be controlled in Storybook
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
      description: 'HTML input type'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the input field'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the input is full width'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether the input is in error state'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below the input'
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when input value changes'
    },
    onFocus: {
      action: 'focused',
      description: 'Function called when input receives focus'
    },
    onBlur: {
      action: 'blurred',
      description: 'Function called when input loses focus'
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
      description: 'Input variant style'
    },
    radius: {
      control: { type: 'text' },
      description: 'Border radius of the input element'
    },
    className: {
      control: { type: 'text' },
      description: 'Custom class name for input element'
    }
  },
  // Default values for props
  args: {
    placeholder: 'Enter text...',
    size: 'medium',
    type: 'text',
    disabled: false,
    error: false,
    required: false
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
    variant: 'outlined'
  }
};
// Outlined variant story
export const Outlined: Story = {
  args: {
    label: 'Outlined Input',
    placeholder: 'Outlined input',
    variant: 'outlined'
  },
  parameters: {
    docs: {
      description: {
        story: 'Outlined variant (default) with border.'
      }
    }
  }
};

// Filled variant story
export const Filled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'Filled input',
    variant: 'filled'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filled variant with background.'
      }
    }
  }
};

// With label story
export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name'
  }
};

// With helper text story
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters long'
  }
};

// Error state story
export const ErrorState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    error: true,
    errorMessage: 'Please enter a valid email address'
  }
};

// Required field story
export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
    helperText: 'This field is required'
  }
};

// Disabled state story
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this'
  }
};

// Small size story
export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'small',
    placeholder: 'Small size input'
  }
};

// Medium size story (default)
export const Medium: Story = {
  args: {
    label: 'Medium Input',
    size: 'medium',
    placeholder: 'Medium size input'
  }
};

// Large size story
export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'large',
    placeholder: 'Large size input'
  }
};

// Different input types story
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <Input label="Text Input" type="text" placeholder="Enter text" />
      <Input label="Email Input" type="email" placeholder="Enter email" />
      <Input label="Password Input" type="password" placeholder="Enter password" />
      <Input label="Number Input" type="number" placeholder="Enter number" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types displayed together.'
      }
    }
  }
};

// All sizes comparison story
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input label="Small" size="small" placeholder="Small input" />
      <Input label="Medium" size="medium" placeholder="Medium input" />
      <Input label="Large" size="large" placeholder="Large input" />
      <Input size="medium" radius="24px" placeholder="Rounded input" />
      <Input size="medium" radius="0px" placeholder="Block input" />
      <Input size="medium" fullWidth placeholder="Full width input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input sizes displayed together for comparison.'
      }
    }
  }
};

// Form example story
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Input label="First Name" placeholder="Enter first name" required />
      <Input label="Email" type="email" placeholder="Enter email address" required helperText="We'll never share your email" />
      <Input label="Phone" type="text" placeholder="Enter phone number" helperText="Optional field" />
      <Input label="Password" type="password" placeholder="Enter password" required helperText="Must be at least 8 characters" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how inputs would look in a typical form.'
      }
    }
  }
};
