# 🚀 Getting Started with NovaUI

This guide will help you install and start using NovaUI in your React project.

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** installed (version 16 or higher)
- **React** project set up (version 16.8 or higher)
- Basic knowledge of **React** and **JSX**

> **What is React?** React is a JavaScript library for building user interfaces. If you're new to React, check out the [official React tutorial](https://react.dev/learn) first.

## 📦 Installation

### Step 1: Install the Package

Open your terminal in your React project folder and run:

```bash
npm install nova-ui
```

**What this does:** Downloads the NovaUI library and adds it to your project's dependencies.

### Step 2: Import Components

In your React component file (usually `.jsx` or `.tsx`), add this import:

```javascript
import { Button, Input } from 'nova-ui';
```

**What this does:** Brings the Button and Input components into your file so you can use them.

## 🎯 Your First Component

Let's create a simple example:

```javascript
import React from 'react';
import { Button } from 'nova-ui';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>My First NovaUI App</h1>
      <Button onClick={handleClick}>Click Me!</Button>
    </div>
  );
}

export default App;
```

**Explanation:**

1. We import the `Button` component from NovaUI
2. We create a function that shows an alert when clicked
3. We use the `Button` component in our JSX
4. We pass the click handler to the button's `onClick` prop

## 🎨 Adding Styles

NovaUI components come with built-in styles, but you can customize them:

```javascript
import { Button, Input } from 'nova-ui';

function MyForm() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Contact Form</h2>

      {/* Different button variants */}
      <Button variant="primary" size="large">
        Submit
      </Button>

      <Button variant="secondary" size="medium">
        Cancel
      </Button>

      <Button variant="outline" size="small">
        Help
      </Button>

      {/* Input field with label */}
      <Input label="Your Name" placeholder="Enter your full name" required />
    </div>
  );
}
```

## 🔧 Common Patterns

### 1. Form with Validation

```javascript
import React, { useState } from 'react';
import { Input, Button } from 'nova-ui';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
      alert('Form submitted!');
    }
  };

  return (
    <div>
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={!!error} errorMessage={error} placeholder="your.email@example.com" />

      <Button variant="primary" onClick={handleSubmit} disabled={!email}>
        Submit
      </Button>
    </div>
  );
}
```

### 2. Loading States

```javascript
import React, { useState } from 'react';
import { Button } from 'nova-ui';

function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);
    alert('Done!');
  };

  return (
    <Button variant="primary" onClick={handleClick} disabled={loading}>
      {loading ? 'Loading...' : 'Submit'}
    </Button>
  );
}
```

## 🎪 Try It Out

The best way to learn is by experimenting! Try:

1. **Change button variants** - Use `primary`, `secondary`, or `outline`
2. **Change button sizes** - Use `small`, `medium`, or `large`
3. **Add form validation** - Use the Input component's error state
4. **Combine components** - Create forms with multiple inputs and buttons

## 📱 Responsive Design

NovaUI components work great on mobile devices:

```javascript
function ResponsiveExample() {
  return (
    <div
      style={{
        padding: '10px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
      <Input label="Mobile-friendly input" placeholder="Works on phones too!" />

      <Button variant="primary" size="large" style={{ width: '100%', marginTop: '10px' }}>
        Full Width Button
      </Button>
    </div>
  );
}
```

## 🐛 Troubleshooting

### Common Issues:

**1. "Module not found" error**

- Make sure you installed NovaUI: `npm install nova-ui`
- Check your import statement: `import { Button } from 'nova-ui';`

**2. Components don't show up**

- Make sure you're using them inside a React component
- Check that your React version is 16.8 or higher

**3. TypeScript errors**

- NovaUI includes TypeScript definitions
- Make sure your props match the component interfaces

## 📚 Next Steps

Now that you know the basics:

1. Read the [Button Documentation](./button.md) for all button options
2. Check out the [Input Documentation](./input.md) for form components
3. Learn about [Theme Customization](./theme.md) to match your design
4. See [Real Examples](./examples.md) for inspiration

Happy coding! 🎉
