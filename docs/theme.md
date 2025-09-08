# 🎨 Theme System Guide

The theme system is like a color palette and font collection for your entire UI library. Think of it as your design language - it keeps everything looking consistent and professional!

## 🎯 What is a Theme System?

A theme system is a collection of design decisions that include:

- **Colors** - What colors to use for buttons, text, backgrounds
- **Typography** - Font sizes, weights, and line heights
- **Spacing** - How much space between elements
- **Consistency** - Making sure everything looks like it belongs together

**Imagine decorating a house** - you choose a color scheme and stick to it throughout all rooms. That's what a theme system does for your app!

## 🌈 Color System

Our color system is organized into logical groups that make it easy to create consistent interfaces.

### Primary Colors (Main Brand Colors)

```javascript
import { colors } from 'nova-ui';

// Primary blue - used for main actions
colors.primary.main; // '#2563eb' - Main blue
colors.primary.hover; // '#1d4ed8' - Darker blue for hover
colors.primary.light; // '#dbeafe' - Light blue for backgrounds
```

**When to use:**

- Primary buttons ("Submit", "Save", "Buy Now")
- Links and clickable elements
- Progress indicators
- Focus states

### Secondary Colors (Supporting Colors)

```javascript
// Secondary gray - used for less important actions
colors.secondary.main; // '#64748b' - Main gray
colors.secondary.hover; // '#475569' - Darker gray for hover
colors.secondary.light; // '#f1f5f9' - Light gray for backgrounds
```

**When to use:**

- Secondary buttons ("Cancel", "Back")
- Subtle borders
- Background sections
- Disabled states

### Error Colors (For Problems)

```javascript
// Error red - used for warnings and errors
colors.error.main; // '#dc2626' - Red for errors
colors.error.light; // '#fef2f2' - Light red for error backgrounds
```

**When to use:**

- Error messages
- Form validation errors
- Delete buttons
- Warning alerts

### Text Colors (For Reading)

```javascript
// Text colors for good readability
colors.text.primary; // '#1f2937' - Dark gray for main text
colors.text.secondary; // '#6b7280' - Lighter gray for secondary text
```

**When to use:**

- `primary` - Headlines, important text, labels
- `secondary` - Descriptions, helper text, captions

### Border Colors (For Outlines)

```javascript
// Border colors for different states
colors.border.default; // '#d1d5db' - Default gray border
colors.border.focus; // '#2563eb' - Blue border when focused
colors.border.error; // '#dc2626' - Red border for errors
```

**When to use:**

- Input field borders
- Card outlines
- Button borders (outline variant)
- Divider lines

### Background Colors

```javascript
// Background colors for different surfaces
colors.background.white; // '#ffffff' - Pure white
colors.background.gray; // '#f9fafb' - Light gray for page backgrounds
```

**When to use:**

- `white` - Cards, modals, content areas
- `gray` - Page backgrounds, subtle sections

## 📝 Typography System

Our typography system provides consistent text styling across your app.

### Font Sizes

```javascript
import { typography } from 'nova-ui';

typography.fontSize.sm; // '14px' - Small text
typography.fontSize.md; // '16px' - Medium text (default)
typography.fontSize.lg; // '18px' - Large text
```

**Usage guide:**

- `sm` (14px) - Captions, helper text, small labels
- `md` (16px) - Body text, form inputs, most content
- `lg` (18px) - Subheadings, large buttons, emphasis

### Font Weights

```javascript
typography.fontWeight.normal; // 400 - Regular text
typography.fontWeight.medium; // 500 - Slightly bold
typography.fontWeight.semibold; // 600 - Bold headings
```

**Usage guide:**

- `normal` (400) - Body text, descriptions
- `medium` (500) - Button text, form labels
- `semibold` (600) - Headings, important text

### Line Heights

```javascript
typography.lineHeight.normal; // 1.5 - Normal spacing
typography.lineHeight.tight; // 1.25 - Compact spacing
```

**Usage guide:**

- `normal` (1.5) - Body text, readable content
- `tight` (1.25) - Headings, compact layouts

## 🛠️ Using the Theme System

### In Your Components

```javascript
import { colors, typography } from 'nova-ui';

function CustomComponent() {
  return (
    <div
      style={{
        backgroundColor: colors.background.white,
        border: `1px solid ${colors.border.default}`,
        borderRadius: '8px',
        padding: '16px'
      }}>
      <h2
        style={{
          color: colors.text.primary,
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          lineHeight: typography.lineHeight.tight,
          margin: '0 0 8px 0'
        }}>
        Card Title
      </h2>

      <p
        style={{
          color: colors.text.secondary,
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.normal,
          lineHeight: typography.lineHeight.normal,
          margin: 0
        }}>
        This is a description using our theme system.
      </p>
    </div>
  );
}
```

### Creating Consistent Styles

```javascript
import { colors, typography } from 'nova-ui';

// Create reusable style objects
const cardStyles = {
  background: colors.background.white,
  border: `1px solid ${colors.border.default}`,
  borderRadius: '8px',
  padding: '16px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
};

const headingStyles = {
  color: colors.text.primary,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semibold,
  lineHeight: typography.lineHeight.tight,
  marginBottom: '8px'
};

const bodyStyles = {
  color: colors.text.secondary,
  fontSize: typography.fontSize.md,
  fontWeight: typography.fontWeight.normal,
  lineHeight: typography.lineHeight.normal
};

function ProductCard({ product }) {
  return (
    <div style={cardStyles}>
      <h3 style={headingStyles}>{product.name}</h3>
      <p style={bodyStyles}>{product.description}</p>

      <Button variant="primary" style={{ marginTop: '12px' }}>
        Add to Cart
      </Button>
    </div>
  );
}
```

## 📚 Real Examples

### 1. Alert Component Using Theme

```javascript
import { colors, typography } from 'nova-ui';

function Alert({ type = 'info', children }) {
  const getAlertStyles = () => {
    switch (type) {
      case 'error':
        return {
          backgroundColor: colors.error.light,
          borderColor: colors.error.main,
          color: colors.error.main
        };
      case 'success':
        return {
          backgroundColor: colors.primary.light,
          borderColor: colors.primary.main,
          color: colors.primary.main
        };
      default:
        return {
          backgroundColor: colors.secondary.light,
          borderColor: colors.secondary.main,
          color: colors.text.primary
        };
    }
  };

  const alertStyles = {
    ...getAlertStyles(),
    border: `1px solid`,
    borderRadius: '6px',
    padding: '12px 16px',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal
  };

  return <div style={alertStyles}>{children}</div>;
}

// Usage
function AlertExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Alert type="success">Your changes have been saved!</Alert>
      <Alert type="error">Please fix the errors below.</Alert>
      <Alert type="info">This is some helpful information.</Alert>
    </div>
  );
}
```

### 2. Navigation Menu Using Theme

```javascript
import { colors, typography } from 'nova-ui';

function Navigation() {
  const navStyles = {
    backgroundColor: colors.background.white,
    borderBottom: `1px solid ${colors.border.default}`,
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  };

  const logoStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.main,
    textDecoration: 'none'
  };

  const linkStyles = {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.normal,
    color: colors.text.secondary,
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'color 0.2s ease'
  };

  const activeLinkStyles = {
    ...linkStyles,
    color: colors.primary.main,
    backgroundColor: colors.primary.light
  };

  return (
    <nav style={navStyles}>
      <a href="/" style={logoStyles}>
        MyApp
      </a>

      <div style={{ display: 'flex', gap: '8px' }}>
        <a href="/home" style={activeLinkStyles}>
          Home
        </a>
        <a href="/products" style={linkStyles}>
          Products
        </a>
        <a href="/about" style={linkStyles}>
          About
        </a>
        <a href="/contact" style={linkStyles}>
          Contact
        </a>
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <Button variant="outline" size="small">
          Sign In
        </Button>
      </div>
    </nav>
  );
}
```

### 3. Form Layout Using Theme

```javascript
import { colors, typography } from 'nova-ui';

function ThemedForm() {
  const formStyles = {
    backgroundColor: colors.background.white,
    border: `1px solid ${colors.border.default}`,
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '400px',
    margin: '0 auto'
  };

  const titleStyles = {
    color: colors.text.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    marginBottom: '8px',
    textAlign: 'center'
  };

  const subtitleStyles = {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    marginBottom: '24px',
    textAlign: 'center'
  };

  const fieldGroupStyles = {
    marginBottom: '16px'
  };

  return (
    <div style={formStyles}>
      <h2 style={titleStyles}>Create Account</h2>
      <p style={subtitleStyles}>Join thousands of happy users</p>

      <div style={fieldGroupStyles}>
        <Input label="Full Name" placeholder="Enter your full name" required />
      </div>

      <div style={fieldGroupStyles}>
        <Input label="Email Address" type="email" placeholder="your@email.com" required />
      </div>

      <div style={fieldGroupStyles}>
        <Input label="Password" type="password" placeholder="Create a strong password" required />
      </div>

      <Button variant="primary" size="large" style={{ width: '100%', marginTop: '8px' }}>
        Create Account
      </Button>

      <p
        style={{
          ...subtitleStyles,
          fontSize: typography.fontSize.sm,
          marginTop: '16px',
          marginBottom: 0
        }}>
        Already have an account?{' '}
        <a
          href="/signin"
          style={{
            color: colors.primary.main,
            textDecoration: 'none',
            fontWeight: typography.fontWeight.medium
          }}>
          Sign in
        </a>
      </p>
    </div>
  );
}
```

## 🎨 Creating Your Own Theme

You can extend or modify the theme to match your brand:

```javascript
import { colors as defaultColors, typography as defaultTypography } from 'nova-ui';

// Create your custom theme
export const myTheme = {
  colors: {
    ...defaultColors,
    // Override primary colors with your brand colors
    primary: {
      main: '#7c3aed', // Purple instead of blue
      hover: '#6d28d9',
      light: '#f3e8ff'
    },
    // Add new color groups
    success: {
      main: '#059669',
      hover: '#047857',
      light: '#d1fae5'
    }
  },
  typography: {
    ...defaultTypography,
    // Add new font sizes
    fontSize: {
      ...defaultTypography.fontSize,
      xl: '20px',
      xxl: '24px'
    }
  }
};

// Use your custom theme
function CustomButton() {
  return (
    <button
      style={{
        backgroundColor: myTheme.colors.primary.main,
        color: 'white',
        fontSize: myTheme.typography.fontSize.xl,
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px'
      }}>
      Custom Themed Button
    </button>
  );
}
```

## 📱 Dark Mode Support

You can create a dark theme variant:

```javascript
export const darkTheme = {
  colors: {
    primary: {
      main: '#3b82f6',
      hover: '#2563eb',
      light: '#1e293b'
    },
    text: {
      primary: '#f8fafc', // Light text on dark background
      secondary: '#cbd5e1'
    },
    background: {
      white: '#1e293b', // Dark background
      gray: '#0f172a' // Darker background
    },
    border: {
      default: '#334155',
      focus: '#3b82f6',
      error: '#ef4444'
    }
  }
};

function ThemeProvider({ children, isDark = false }) {
  const theme = isDark ? darkTheme : defaultTheme;

  return (
    <div
      style={{
        backgroundColor: theme.colors.background.gray,
        color: theme.colors.text.primary,
        minHeight: '100vh'
      }}>
      {children}
    </div>
  );
}
```

## 💡 Best Practices

### ✅ Do This:

```javascript
// Use theme tokens consistently
const buttonStyle = {
  backgroundColor: colors.primary.main,
  color: 'white',
  fontSize: typography.fontSize.md
};

// Group related styles
const cardTheme = {
  background: colors.background.white,
  border: colors.border.default,
  text: colors.text.primary
};
```

### ❌ Don't Do This:

```javascript
// Don't use random colors
const badStyle = {
  backgroundColor: '#ff0000', // Should use colors.error.main
  color: '#333333', // Should use colors.text.primary
  fontSize: '15px' // Should use typography.fontSize.md
};

// Don't mix theme and non-theme values
const inconsistentStyle = {
  backgroundColor: colors.primary.main, // Good
  color: '#ffffff', // Should use a theme color
  fontSize: typography.fontSize.md, // Good
  padding: '13px' // Should use consistent spacing
};
```

## 🧪 Testing Your Theme

Use these checks to ensure consistent theming:

1. **Color Consistency** - Are you using theme colors everywhere?
2. **Typography Consistency** - Are font sizes and weights consistent?
3. **Accessibility** - Do color combinations have enough contrast?
4. **Scalability** - Can you easily change colors site-wide?
5. **Documentation** - Are your custom theme additions documented?

## 🎯 Theme Benefits

Using a theme system gives you:

1. **Consistency** - Everything looks like it belongs together
2. **Maintainability** - Change colors in one place, update everywhere
3. **Accessibility** - Ensures proper color contrast and readability
4. **Professional Look** - Cohesive design language
5. **Scalability** - Easy to add new components that fit the system

## 📚 Related Components

- **[Button Component](./button.md)** - Uses theme colors and typography
- **[Input Component](./input.md)** - Uses theme colors and typography
- **[Getting Started](./getting-started.md)** - How to use the theme in your app

Now you understand how to create beautiful, consistent interfaces using the theme system! 🎨 Try experimenting with different color combinations and see how they affect the feel of your app.
