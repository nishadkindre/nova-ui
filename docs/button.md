# 🔘 Button Component Guide

The Button component is like a clickable rectangle that users can press to trigger actions in your app. Think of it as the "doorbell" of your website!

## 🎯 What is a Button?

A button is an interactive element that users click to:

- Submit forms (like "Send Message")
- Navigate to other pages (like "Learn More")
- Trigger actions (like "Delete Item")
- Open modals or dialogs (like "Show Details")

## 🚀 Basic Usage

```javascript
import { Button } from 'nova-ui';

function MyComponent() {
  return <Button onClick={() => alert('Hello!')}>Click Me!</Button>;
}
```

**What happens here:**

1. We import the Button component
2. We add text inside the button ("Click Me!")
3. We tell it what to do when clicked (show an alert)

## 🎨 Button Variants

Buttons come in 3 different styles to show different levels of importance:

### Primary Button (Most Important)

```javascript
<Button variant="primary">Save Changes</Button>
```

- **When to use:** Main actions like "Submit", "Save", "Buy Now"
- **Appearance:** Blue background with white text
- **Example:** The "Submit" button on a contact form

### Secondary Button (Less Important)

```javascript
<Button variant="secondary">Cancel</Button>
```

- **When to use:** Secondary actions like "Cancel", "Back", "Skip"
- **Appearance:** Gray background with dark text
- **Example:** The "Cancel" button next to a "Save" button

### Outline Button (Subtle Actions)

```javascript
<Button variant="outline">Learn More</Button>
```

- **When to use:** Tertiary actions like "Learn More", "View Details"
- **Appearance:** Transparent background with colored border
- **Example:** A "Learn More" link that's styled as a button

### Visual Comparison

```javascript
function ButtonVariants() {
  return (
    <div>
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
      <Button variant="outline">Tertiary Action</Button>
    </div>
  );
}
```

## 📏 Button Sizes

Choose the right size based on the importance and available space:

### Small Buttons

```javascript
<Button size="small">Small</Button>
```

- **Height:** 32px
- **When to use:** Compact interfaces, toolbar buttons, table actions
- **Example:** "Edit" button in a data table row

### Medium Buttons (Default)

```javascript
<Button size="medium">Medium</Button>
// or just
<Button>Medium</Button>
```

- **Height:** 40px
- **When to use:** Most common use cases, forms, cards
- **Example:** "Submit" button in a contact form

### Large Buttons

```javascript
<Button size="large">Large</Button>
```

- **Height:** 48px
- **When to use:** Hero sections, mobile interfaces, important actions
- **Example:** "Get Started" button on a landing page

## 🔧 Button Props (Options)

Here's every option you can use with the Button component:

| Prop       | Type                                        | Default     | Description                    |
| ---------- | ------------------------------------------- | ----------- | ------------------------------ |
| `children` | text/elements                               | required    | What appears inside the button |
| `variant`  | `'primary'` \| `'secondary'` \| `'outline'` | `'primary'` | Button style                   |
| `size`     | `'small'` \| `'medium'` \| `'large'`        | `'medium'`  | Button size                    |
| `disabled` | boolean                                     | `false`     | Makes button unclickable       |
| `type`     | `'button'` \| `'submit'` \| `'reset'`       | `'button'`  | HTML button type               |
| `onClick`  | function                                    | -           | Function to run when clicked   |

## 📚 Real Examples

### 1. Form Buttons

```javascript
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Submit form logic here
  };

  const handleReset = () => {
    setSubmitted(false);
    // Reset form logic here
  };

  return (
    <form>
      {/* Form inputs would go here */}

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={submitted}>
          {submitted ? 'Sent!' : 'Send Message'}
        </Button>

        <Button variant="secondary" type="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}
```

### 2. Navigation Buttons

```javascript
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <Button variant="primary" size="medium" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>

        <Button variant="outline" size="medium" onClick={() => viewDetails(product)}>
          View Details
        </Button>
      </div>
    </div>
  );
}
```

### 3. Loading and Disabled States

```javascript
function ApiButton() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </Button>

      {data && (
        <Button variant="secondary" onClick={() => setData(null)}>
          Clear Data
        </Button>
      )}
    </div>
  );
}
```

### 4. Mobile-Friendly Buttons

```javascript
function MobileButtons() {
  return (
    <div style={{ padding: '10px' }}>
      {/* Full-width button for mobile */}
      <Button
        variant="primary"
        size="large"
        style={{
          width: '100%',
          marginBottom: '10px'
        }}>
        Get Started
      </Button>

      {/* Button row for mobile */}
      <div
        style={{
          display: 'flex',
          gap: '10px'
        }}>
        <Button variant="outline" size="medium" style={{ flex: 1 }}>
          Cancel
        </Button>
        <Button variant="primary" size="medium" style={{ flex: 1 }}>
          Continue
        </Button>
      </div>
    </div>
  );
}
```

## ♿ Accessibility Features

Our Button component is built to be accessible to everyone:

**✅ Keyboard Navigation**

- Press `Tab` to focus the button
- Press `Space` or `Enter` to activate it

**✅ Screen Reader Support**

- Button text is read aloud
- Button state (disabled/enabled) is announced

**✅ Focus Indicators**

- Visible outline when focused via keyboard
- High contrast colors for better visibility

## 🎨 Customization Tips

### Adding Icons

```javascript
function IconButton() {
  return (
    <Button variant="primary">
      <span style={{ marginRight: '8px' }}>📧</span>
      Send Email
    </Button>
  );
}
```

### Custom Styling

```javascript
function CustomButton() {
  return (
    <Button
      variant="primary"
      style={{
        borderRadius: '20px',
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }}>
      Custom Style
    </Button>
  );
}
```

## 🐛 Common Mistakes

### ❌ Don't Do This:

```javascript
// Too many primary buttons
<Button variant="primary">Save</Button>
<Button variant="primary">Delete</Button>
<Button variant="primary">Cancel</Button>

// Button without onClick
<Button>Click Me</Button> // Won't do anything!

// Unclear button text
<Button>OK</Button> // OK for what?
```

### ✅ Do This Instead:

```javascript
// One primary action, others secondary
<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Delete</Button>
<Button variant="outline">Cancel</Button>

// Button with clear action
<Button onClick={handleSave}>Save Changes</Button>

// Clear, descriptive text
<Button onClick={handleSave}>Save Document</Button>
```

## 🧪 Testing Your Buttons

Use these checks to make sure your buttons work well:

1. **Click Test:** Does clicking do what you expect?
2. **Keyboard Test:** Can you navigate to it with Tab and activate with Space/Enter?
3. **Text Test:** Is the button text clear and descriptive?
4. **State Test:** Are disabled states working correctly?
5. **Mobile Test:** Does it work well on touch devices?

## 📱 Best Practices

1. **Use descriptive text** - "Submit Form" instead of "Submit"
2. **One primary button per section** - Don't overwhelm users
3. **Consistent sizing** - Use the same size for related buttons
4. **Logical order** - Put primary actions on the right (Submit, Next)
5. **Loading states** - Show feedback during async operations

## 📚 Related Components

- **[Input Component](./input.md)** - For collecting user data
- **[Theme System](./theme.md)** - For customizing colors and fonts

Now you're a Button expert! 🎉 Try creating different button combinations and see what works best for your app.
