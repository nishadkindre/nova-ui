# 📝 Input Component Guide

The Input component is like a text box where users can type information. Think of it as a digital form field where people can enter their name, email, password, or any other text!

## 🎯 What is an Input?

An input field is an interactive element that lets users:

- Enter their name, email, or phone number
- Type passwords securely
- Fill out forms and surveys
- Search for content
- Enter numbers and dates

## 🚀 Basic Usage

```javascript
import { Input } from 'nova-ui';

function MyComponent() {
  return <Input placeholder="Type something here..." onChange={e => console.log(e.target.value)} />;
}
```

**What happens here:**

1. We import the Input component
2. We add placeholder text to guide the user
3. We listen for changes and log what the user types

## 🏷️ Input with Labels

Labels tell users what kind of information to enter:

```javascript
function FormWithLabels() {
  return (
    <div>
      <Input label="Your Name" placeholder="Enter your full name" />

      <Input label="Email Address" type="email" placeholder="your.email@example.com" />
    </div>
  );
}
```

**Why labels matter:**

- They tell users what to enter
- Screen readers can read them aloud
- Clicking the label focuses the input
- They make forms more professional

## 🔤 Input Types

Different types help users enter the right kind of data:

### Text Input (Default)

```javascript
<Input label="Full Name" type="text" placeholder="John Doe" />
```

- **For:** Names, addresses, general text
- **Keyboard:** Normal keyboard layout

### Email Input

```javascript
<Input label="Email" type="email" placeholder="user@example.com" />
```

- **For:** Email addresses
- **Keyboard:** Shows @ symbol on mobile
- **Validation:** Browser checks email format

### Password Input

```javascript
<Input label="Password" type="password" placeholder="Enter your password" />
```

- **For:** Passwords and sensitive data
- **Display:** Shows dots (••••) instead of text
- **Security:** Hides what user types

### Number Input

```javascript
<Input label="Age" type="number" placeholder="25" />
```

- **For:** Ages, quantities, prices
- **Keyboard:** Number pad on mobile
- **Validation:** Only allows numbers

## 📏 Input Sizes

Choose the right size for your layout:

### Small Inputs

```javascript
<Input label="Code" size="small" placeholder="ABC123" />
```

- **Height:** 32px
- **When to use:** Compact forms, inline editing, toolbars
- **Example:** Promo code input in checkout

### Medium Inputs (Default)

```javascript
<Input label="Email" size="medium" placeholder="your@email.com" />
```

- **Height:** 40px
- **When to use:** Most forms, standard layouts
- **Example:** Contact form fields

### Large Inputs

```javascript
<Input label="Search" size="large" placeholder="Search for products..." />
```

- **Height:** 48px
- **When to use:** Hero sections, mobile interfaces, search bars
- **Example:** Main search bar on homepage

## 🔧 Input Props (Options)

Here's every option you can use with the Input component:

| Prop           | Type                                                | Default    | Description                      |
| -------------- | --------------------------------------------------- | ---------- | -------------------------------- |
| `label`        | string                                              | -          | Text label above the input       |
| `placeholder`  | string                                              | -          | Hint text inside the input       |
| `value`        | string                                              | -          | Current input value (controlled) |
| `defaultValue` | string                                              | -          | Initial value (uncontrolled)     |
| `type`         | `'text'` \| `'email'` \| `'password'` \| `'number'` | `'text'`   | Input type                       |
| `size`         | `'small'` \| `'medium'` \| `'large'`                | `'medium'` | Input size                       |
| `disabled`     | boolean                                             | `false`    | Makes input uneditable           |
| `required`     | boolean                                             | `false`    | Marks field as required          |
| `error`        | boolean                                             | `false`    | Shows error state                |
| `errorMessage` | string                                              | -          | Error text to display            |
| `helperText`   | string                                              | -          | Help text below input            |
| `onChange`     | function                                            | -          | Called when value changes        |
| `onFocus`      | function                                            | -          | Called when input gets focus     |
| `onBlur`       | function                                            | -          | Called when input loses focus    |

## 📚 Real Examples

### 1. Contact Form

```javascript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = field => event => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  return (
    <form>
      <Input label="Full Name" value={formData.name} onChange={handleChange('name')} placeholder="Enter your full name" required helperText="We'll use this to personalize your experience" />

      <Input label="Email Address" type="email" value={formData.email} onChange={handleChange('email')} placeholder="your.email@example.com" required helperText="We'll never share your email" />

      <Button variant="primary" type="submit">
        Send Message
      </Button>
    </form>
  );
}
```

### 2. Login Form with Validation

```javascript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = email => {
    return email.includes('@') && email.includes('.');
  };

  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);

    if (value && value.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <form>
      <Input label="Email" type="email" value={email} onChange={handleEmailChange} error={!!errors.email} errorMessage={errors.email} placeholder="Enter your email" required />

      <Input label="Password" type="password" value={password} onChange={handlePasswordChange} error={!!errors.password} errorMessage={errors.password} placeholder="Enter your password" required />

      <Button variant="primary" disabled={!email || !password || errors.email || errors.password}>
        Sign In
      </Button>
    </form>
  );
}
```

### 3. Search Bar

```javascript
function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async e => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      // Simulate API search
      const mockResults = ['React Tutorial', 'React Hooks', 'React Components'].filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <Input size="large" placeholder="Search for tutorials, guides, and more..." value={query} onChange={handleSearch} helperText={`${results.length} results found`} />

      {results.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          {results.map((result, index) => (
            <div key={index} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 4. Registration Form with Multiple Fields

```javascript
function RegistrationForm() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = field => e => {
    const value = e.target.value;
    setUserData(prev => ({ ...prev, [field]: value }));

    // Real-time validation
    if (field === 'confirmPassword') {
      if (value !== userData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  return (
    <form style={{ maxWidth: '400px', gap: '16px', display: 'flex', flexDirection: 'column' }}>
      <h2>Create Account</h2>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Input label="First Name" value={userData.firstName} onChange={handleChange('firstName')} placeholder="John" required size="medium" />

        <Input label="Last Name" value={userData.lastName} onChange={handleChange('lastName')} placeholder="Doe" required size="medium" />
      </div>

      <Input label="Email Address" type="email" value={userData.email} onChange={handleChange('email')} placeholder="john@example.com" required helperText="We'll send a confirmation email" />

      <Input label="Age" type="number" value={userData.age} onChange={handleChange('age')} placeholder="25" helperText="Must be 18 or older" />

      <Input label="Password" type="password" value={userData.password} onChange={handleChange('password')} placeholder="Create a strong password" required helperText="At least 8 characters" />

      <Input
        label="Confirm Password"
        type="password"
        value={userData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        placeholder="Re-enter your password"
        required
        error={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
      />

      <Button variant="primary" size="large" disabled={!userData.email || !userData.password || !!errors.confirmPassword}>
        Create Account
      </Button>
    </form>
  );
}
```

## ♿ Accessibility Features

Our Input component is built to be accessible to everyone:

**✅ Screen Reader Support**

- Labels are properly associated with inputs
- Error messages are announced
- Required fields are identified

**✅ Keyboard Navigation**

- `Tab` moves between inputs
- Arrow keys work in number inputs
- `Enter` can submit forms

**✅ Focus Management**

- Clear focus indicators
- Logical tab order
- Focus stays visible

**✅ Error Handling**

- Errors are clearly announced
- Color isn't the only indicator
- Helpful error messages

## 🎨 Styling States

### Normal State

```javascript
<Input label="Normal" placeholder="Type here..." />
```

### Focus State

```javascript
<Input
  label="Focused Input"
  placeholder="Click to see focus state"
  // Automatically styled when focused
/>
```

### Error State

```javascript
<Input label="Email" error={true} errorMessage="Please enter a valid email address" placeholder="user@example.com" />
```

### Disabled State

```javascript
<Input label="Disabled" disabled={true} value="Cannot edit this" />
```

## 💡 Best Practices

### ✅ Do This:

```javascript
// Clear, descriptive labels
<Input label="Email Address" type="email" />

// Helpful placeholder text
<Input placeholder="Enter your full name" />

// Useful helper text
<Input helperText="We'll never share your email" />

// Clear error messages
<Input errorMessage="Email must contain @ symbol" />
```

### ❌ Don't Do This:

```javascript
// Vague labels
<Input label="Info" />

// Placeholder as label
<Input placeholder="Email" /> // No actual label!

// Confusing error messages
<Input errorMessage="Error!" /> // What error?

// Too many required fields
<Input required /> // Only require what's necessary
```

## 🔄 Controlled vs Uncontrolled

### Controlled Input (Recommended)

```javascript
function ControlledExample() {
  const [value, setValue] = useState('');

  return <Input label="Controlled Input" value={value} onChange={e => setValue(e.target.value)} />;
}
```

**Benefits:** React controls the value, easy to validate and manipulate

### Uncontrolled Input

```javascript
function UncontrolledExample() {
  return <Input label="Uncontrolled Input" defaultValue="Initial value" />;
}
```

**Benefits:** Simpler for basic forms, less code

## 🧪 Testing Your Inputs

Use these checks to make sure your inputs work well:

1. **Type Test:** Can users type and see their input?
2. **Label Test:** Do labels clearly describe what to enter?
3. **Validation Test:** Do error messages help users fix issues?
4. **Keyboard Test:** Can users navigate with Tab?
5. **Mobile Test:** Does the right keyboard appear?
6. **Accessibility Test:** Can screen readers understand the input?

## 📱 Mobile Considerations

```javascript
function MobileForm() {
  return (
    <div style={{ padding: '16px' }}>
      {/* Large inputs are better on mobile */}
      <Input label="Phone Number" type="tel" size="large" placeholder="(555) 123-4567" />

      {/* Email type shows @ key on mobile */}
      <Input label="Email" type="email" size="large" placeholder="your@email.com" />

      {/* Number type shows number pad */}
      <Input label="Quantity" type="number" size="large" placeholder="1" />
    </div>
  );
}
```

## 🔧 Common Patterns

### Form with Real-time Validation

```javascript
function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(value === '' || validateEmail(value));
  };

  return (
    <Input
      label="Email Address"
      type="email"
      value={email}
      onChange={handleEmailChange}
      error={!isValidEmail}
      errorMessage={!isValidEmail ? 'Please enter a valid email' : ''}
      helperText="We'll use this to send you updates"
    />
  );
}
```

## 📚 Related Components

- **[Button Component](./button.md)** - For form submission and actions
- **[Theme System](./theme.md)** - For customizing colors and fonts

Now you're an Input expert! 🎉 Try building different forms and see how inputs can make user interaction smooth and intuitive.
