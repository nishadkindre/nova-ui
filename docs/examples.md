# 🌟 NovaUI Examples - Real-World Usage

This guide shows you how to use NovaUI components in real applications. Think of these as recipes you can follow to create common UI patterns!

## 🎯 Quick Start Examples

### Simple Button Usage

```javascript
import { Button } from 'nova-ui-elements';

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('Hello!')}>
        Say Hello
      </Button>
    </div>
  );
}
```

### Simple Input Usage

```javascript
import { Input } from 'nova-ui-elements';

function App() {
  const [name, setName] = useState('');

  return <Input label="Your Name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />;
}
```

## 📝 Complete Form Examples

### 1. Contact Form

A simple contact form that collects user information:

```javascript
import React, { useState } from 'react';
import { Button, Input } from 'nova-ui-elements';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = field => event => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async event => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #0ea5e9'
        }}>
        <h2 style={{ color: '#0369a1', marginBottom: '16px' }}>Thank You! 🎉</h2>
        <p style={{ color: '#075985', marginBottom: '20px' }}>Your message has been sent successfully. We'll get back to you soon!</p>
        <Button variant="primary" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: '#1f2937'
        }}>
        Contact Us
      </h2>

      <div style={{ marginBottom: '16px' }}>
        <Input label="Full Name" value={formData.name} onChange={handleChange('name')} placeholder="Enter your full name" error={!!errors.name} errorMessage={errors.name} required />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="your.email@example.com"
          error={!!errors.email}
          errorMessage={errors.email}
          helperText="We'll never share your email with anyone"
          required
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Input label="Subject" value={formData.subject} onChange={handleChange('subject')} placeholder="What's this about?" error={!!errors.subject} errorMessage={errors.subject} required />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <Input label="Message" value={formData.message} onChange={handleChange('message')} placeholder="Tell us more details..." error={!!errors.message} errorMessage={errors.message} required />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setErrors({});
          }}
          disabled={isSubmitting}>
          Clear Form
        </Button>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
```

### 2. User Registration Form

A more complex form with validation and multiple steps:

```javascript
import React, { useState } from 'react';
import { Button, Input } from 'nova-ui-elements';

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Account info
    username: '',
    password: '',
    confirmPassword: '',

    // Preferences
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = field => event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Account created successfully!');
    } catch (error) {
      console.error('Failed to create account:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
      {/* Progress indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '32px'
        }}>
        {[1, 2, 3].map(step => (
          <div
            key={step}
            style={{
              width: '30%',
              height: '4px',
              backgroundColor: step <= currentStep ? '#2563eb' : '#e5e7eb',
              borderRadius: '2px'
            }}
          />
        ))}
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1f2937' }}>
        {currentStep === 1 && 'Personal Information'}
        {currentStep === 2 && 'Account Details'}
        {currentStep === 3 && 'Review & Submit'}
      </h2>

      {/* Step 1: Personal Info */}
      {currentStep === 1 && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Input label="First Name" value={formData.firstName} onChange={handleChange('firstName')} placeholder="John" error={!!errors.firstName} errorMessage={errors.firstName} required />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Input label="Last Name" value={formData.lastName} onChange={handleChange('lastName')} placeholder="Doe" error={!!errors.lastName} errorMessage={errors.lastName} required />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="john@example.com"
              error={!!errors.email}
              errorMessage={errors.email}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <Input label="Phone Number (Optional)" type="tel" value={formData.phone} onChange={handleChange('phone')} placeholder="(555) 123-4567" />
          </div>

          <Button variant="primary" onClick={handleNext} style={{ width: '100%' }}>
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Account Details */}
      {currentStep === 2 && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Input
              label="Username"
              value={formData.username}
              onChange={handleChange('username')}
              placeholder="Choose a username"
              error={!!errors.username}
              errorMessage={errors.username}
              helperText="At least 3 characters"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange('password')}
              placeholder="Create a strong password"
              error={!!errors.password}
              errorMessage={errors.password}
              helperText="At least 6 characters"
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              placeholder="Re-enter your password"
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={handleBack} style={{ flex: 1 }}>
              Back
            </Button>
            <Button variant="primary" onClick={handleNext} style={{ flex: 1 }}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {currentStep === 3 && (
        <div>
          <div
            style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '6px',
              marginBottom: '24px'
            }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#374151' }}>Review Your Information</h3>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Username:</strong> {formData.username}
            </p>
            {formData.phone && (
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={handleBack} style={{ flex: 1 }} disabled={isSubmitting}>
              Back
            </Button>
            <Button variant="primary" onClick={handleSubmit} style={{ flex: 1 }} disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
```

## 🛒 E-Commerce Examples

### Product Card

```javascript
import React from 'react';
import { Button } from 'nova-ui-elements';

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);

    try {
      // Simulate adding to cart
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '6px',
          marginBottom: '12px'
        }}
      />

      <h3
        style={{
          margin: '0 0 8px 0',
          color: '#1f2937',
          fontSize: '18px',
          fontWeight: '600'
        }}>
        {product.name}
      </h3>

      <p
        style={{
          margin: '0 0 12px 0',
          color: '#6b7280',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
        {product.description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
        <span
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1f2937'
          }}>
          ${product.price}
        </span>

        {product.originalPrice && (
          <span
            style={{
              fontSize: '16px',
              color: '#9ca3af',
              textDecoration: 'line-through'
            }}>
            ${product.originalPrice}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary" onClick={handleAddToCart} disabled={isLoading || !product.inStock} style={{ flex: 1 }}>
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>

        <Button variant="outline" onClick={() => alert('Viewing product details')}>
          Details
        </Button>
      </div>

      {!product.inStock && (
        <p
          style={{
            color: '#dc2626',
            fontSize: '14px',
            marginTop: '8px',
            textAlign: 'center'
          }}>
          Out of Stock
        </p>
      )}
    </div>
  );
}

// Usage
function ProductGrid() {
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation.',
      price: 99.99,
      originalPrice: 129.99,
      image: 'https://via.placeholder.com/300x200',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking.',
      price: 199.99,
      image: 'https://via.placeholder.com/300x200',
      inStock: false
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Shopping Cart

```javascript
import React, { useState } from 'react';
import { Button, Input } from 'nova-ui-elements';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1 },
    { id: 2, name: 'Phone Case', price: 24.99, quantity: 2 }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(10);
      alert('Promo code applied! 10% discount');
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
      <h2 style={{ marginBottom: '24px', color: '#1f2937' }}>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>Your cart is empty</p>
          <Button variant="primary">Continue Shopping</Button>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderBottom: '1px solid #e5e7eb'
              }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#1f2937' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>${item.price.toFixed(2)} each</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button variant="outline" size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </Button>

                <span style={{ minWidth: '40px', textAlign: 'center' }}>{item.quantity}</span>

                <Button variant="outline" size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </Button>

                <span
                  style={{
                    minWidth: '80px',
                    textAlign: 'right',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>

                <Button variant="outline" size="small" onClick={() => updateQuantity(item.id, 0)} style={{ color: '#dc2626' }}>
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {/* Promo code section */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
              marginBottom: '20px'
            }}>
            <Input placeholder="Enter promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} style={{ flex: 1 }} />
            <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode.trim()}>
              Apply
            </Button>
          </div>

          {/* Total section */}
          <div
            style={{
              borderTop: '2px solid #e5e7eb',
              paddingTop: '16px'
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  color: '#059669'
                }}>
                <span>Discount ({discount}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '24px'
              }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" style={{ flex: 1 }}>
                Continue Shopping
              </Button>
              <Button variant="primary" style={{ flex: 1 }}>
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

## 🔍 Search and Filter Examples

### Search Bar with Live Results

```javascript
import React, { useState, useEffect } from 'react';
import { Input, Button } from 'nova-ui-elements';

function SearchExample() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const allItems = ['Apple iPhone 13', 'Samsung Galaxy S21', 'Google Pixel 6', 'MacBook Pro', 'Dell XPS 13', 'iPad Air', 'AirPods Pro', 'Sony WH-1000XM4'];

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);

      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = allItems.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        setResults(filtered);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <Input
        placeholder="Search products..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        size="large"
        helperText={query.length > 2 ? `${results.length} results found` : 'Type at least 3 characters to search'}
      />

      {isLoading && (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            color: '#6b7280'
          }}>
          Searching...
        </div>
      )}

      {results.length > 0 && !isLoading && (
        <div
          style={{
            marginTop: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
          {results.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '12px 16px',
                borderBottom: index < results.length - 1 ? '1px solid #e5e7eb' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onClick={() => {
                setQuery(item);
                setResults([]);
              }}
              onMouseEnter={e => (e.target.style.backgroundColor = '#f9fafb')}
              onMouseLeave={e => (e.target.style.backgroundColor = 'white')}>
              {item}
            </div>
          ))}
        </div>
      )}

      {query.length > 2 && results.length === 0 && !isLoading && (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            color: '#6b7280',
            fontStyle: 'italic'
          }}>
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
```

## 📱 Mobile-Responsive Examples

### Mobile-First Navigation

```javascript
import React, { useState } from 'react';
import { Button } from 'nova-ui-elements';

function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* Mobile Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
        <div
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1f2937'
          }}>
          MyApp
        </div>

        <Button variant="outline" size="small" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav
          style={{
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px'
          }}>
          {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <Button
                variant="outline"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  // Navigate to page
                }}>
                {item}
              </Button>
            </div>
          ))}

          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #e5e7eb'
            }}>
            <Button variant="outline" style={{ flex: 1 }}>
              Sign In
            </Button>
            <Button variant="primary" style={{ flex: 1 }}>
              Sign Up
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
```

## 💡 Best Practices Summary

### Form Best Practices

- Always provide helpful error messages
- Use appropriate input types (email, tel, etc.)
- Include helpful text to guide users
- Validate in real-time when possible
- Show loading states during submission

### Button Best Practices

- Use primary buttons for main actions
- Use secondary buttons for alternative actions
- Use outline buttons for tertiary actions
- Always provide clear, descriptive text
- Show loading states for async operations

### Accessibility Best Practices

- Always include proper labels
- Use semantic HTML
- Provide focus indicators
- Ensure sufficient color contrast
- Support keyboard navigation

### Mobile Best Practices

- Use larger touch targets (buttons/inputs)
- Optimize for touch interaction
- Consider thumb-friendly navigation
- Test on real devices when possible

These examples show how to build real-world applications with NovaUI components. Start with simple examples and gradually build up to more complex patterns! 🚀
