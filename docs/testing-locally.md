# 🧪 Testing Your Package Locally

Before publishing your NovaUI package to npm, it's crucial to test it thoroughly in a local environment. This guide covers multiple methods to ensure your package works correctly.

## 🎯 Why Test Locally?

Testing locally helps you:

- **Catch Issues Early**: Find problems before users do
- **Verify Exports**: Ensure all components are properly exported
- **Test Real Usage**: Simulate how developers will actually use your package
- **Check Bundle Size**: Verify your package isn't too large
- **Validate TypeScript**: Ensure type definitions work correctly

## 📦 Method 1: npm pack + Local Install (Recommended)

This method simulates the exact experience users will have when installing your package.

### Step 1: Build and Pack Your Package

```bash
# Navigate to your NovaUI project folder
cd c:\Users\NishadKindre\MEDTIGO-MASTER\nova-ui-elements

# Build your package
npm run build

# Create a tarball (.tgz file)
npm pack
```

This creates a file like `nova-ui-elements-1.0.0.tgz` in your project root.

### Step 2: Create a Test React Application

```bash
# Navigate to a different directory (outside your package)
cd ..

# Create a new React app for testing
npx create-react-app test-nova-ui-elements-app
cd test-nova-ui-elements-app
```

### Step 3: Install Your Local Package

```bash
# Install the packed version of your package
npm install ../nova-ui-elements/nova-ui-elements-1.0.0.tgz
```

### Step 4: Test Your Components

Replace the contents of `src/App.js` with a comprehensive test:

```javascript
import React, { useState } from 'react';
import { Button, Input } from 'nova-ui-elements';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    alert('Button clicked successfully!');
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setError('This field is required');
      return;
    }

    if (inputValue.length < 3) {
      setError('Must be at least 3 characters');
      return;
    }

    setError('');
    alert(`Form submitted with: ${inputValue}`);
  };

  const handleLoadingTest = async () => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    alert('Async operation completed!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧪 NovaUI Package Testing</h1>

        {/* Button Variants Testing */}
        <section style={{ marginBottom: '30px' }}>
          <h2>Button Variants</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <Button variant="primary" size="small" onClick={handleClick}>
              Primary Small
            </Button>
            <Button variant="primary" size="medium" onClick={handleClick}>
              Primary Medium
            </Button>
            <Button variant="primary" size="large" onClick={handleClick}>
              Primary Large
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <Button variant="secondary" size="medium" onClick={handleClick}>
              Secondary
            </Button>
            <Button variant="outline" size="medium" onClick={handleClick}>
              Outline
            </Button>
            <Button variant="primary" size="medium" disabled>
              Disabled
            </Button>
          </div>

          <div>
            <Button variant="primary" size="medium" onClick={handleLoadingTest} disabled={loading}>
              {loading ? 'Loading...' : 'Test Async'}
            </Button>
          </div>
        </section>

        {/* Input Testing */}
        <section style={{ marginBottom: '30px' }}>
          <h2>Input Component</h2>
          <div style={{ maxWidth: '400px' }}>
            <Input label="Test Input Field" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Type at least 3 characters..." error={!!error} errorMessage={error} />

            <div style={{ marginTop: '15px' }}>
              <Button variant="primary" onClick={handleSubmit} style={{ marginRight: '10px' }}>
                Validate Input
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setInputValue('');
                  setError('');
                }}>
                Clear
              </Button>
            </div>
          </div>
        </section>

        {/* Responsive Testing */}
        <section>
          <h2>Responsive Test</h2>
          <div style={{ maxWidth: '300px' }}>
            <Input label="Mobile-friendly Input" placeholder="Resize window to test" />
            <Button variant="primary" size="large" style={{ width: '100%', marginTop: '10px' }} onClick={handleClick}>
              Full Width Button
            </Button>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
```

### Step 5: Run and Test

```bash
# Start the development server
npm start
```

**Test Checklist:**

- [ ] All button variants render correctly
- [ ] Click handlers work
- [ ] Input accepts text input
- [ ] Error states display properly
- [ ] Components are styled correctly
- [ ] Responsive behavior works
- [ ] TypeScript types work (if using TypeScript)

## 🔗 Method 2: npm link (For Development Iteration)

This method creates a symlink for faster development iteration.

### Step 1: Link Your Package

```bash
# In your NovaUI project folder
npm run build
npm link
```

### Step 2: Link in Test Project

```bash
# Create or navigate to test React app
npx create-react-app test-link-app
cd test-link-app

# Link to your package
npm link nova-ui-elements
```

### Step 3: Development Workflow

```bash
# Make changes to your NovaUI components
# Then rebuild:
cd ../nova-ui-elements
npm run build

# Changes are immediately available in test app!
cd ../test-link-app
npm start
```

### Cleanup When Done

```bash
# In test app
npm unlink nova-ui-elements

# In NovaUI folder
npm unlink
```

**When to Use npm link:**

- Active development with frequent changes
- Testing new features before packaging
- Quick iteration cycles

## 🛠️ Method 3: Development Playground

Create a development environment within your package for component testing.

### Step 1: Create Playground

```javascript
// playground/App.jsx
import React, { useState } from 'react';
import { Button, Input } from '../src';

function PlaygroundApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }

    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Form is valid!');
      console.log('Form data:', formData);
    }
  };

  const updateField = field => e => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎪 NovaUI Component Playground</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>Button Showcase</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px'
          }}>
          <Button variant="primary" size="small">
            Primary Small
          </Button>
          <Button variant="primary" size="medium">
            Primary Medium
          </Button>
          <Button variant="primary" size="large">
            Primary Large
          </Button>
          <Button variant="secondary" size="medium">
            Secondary
          </Button>
          <Button variant="outline" size="medium">
            Outline
          </Button>
          <Button variant="primary" size="medium" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <section>
        <h2>Contact Form Example</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}>
          <Input
            label="Full Name"
            value={formData.name}
            onChange={updateField('name')}
            placeholder="Enter your full name"
            error={!!errors.name}
            errorMessage={errors.name}
            style={{ marginBottom: '20px' }}
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={updateField('email')}
            placeholder="your.email@example.com"
            error={!!errors.email}
            errorMessage={errors.email}
            style={{ marginBottom: '20px' }}
          />

          <Input
            label="Message"
            value={formData.message}
            onChange={updateField('message')}
            placeholder="Tell us what you think... (min 10 characters)"
            error={!!errors.message}
            errorMessage={errors.message}
            style={{ marginBottom: '30px' }}
          />

          <div>
            <Button variant="primary" size="large" type="submit" style={{ marginRight: '15px' }}>
              Submit Form
            </Button>
            <Button
              variant="outline"
              size="large"
              onClick={() => {
                setFormData({ name: '', email: '', message: '' });
                setErrors({});
              }}>
              Reset
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PlaygroundApp;
```

### Step 2: Add Playground Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "build": "rollup -c",
    "playground": "webpack serve --config playground/webpack.config.js",
    "test:local": "npm pack && echo 'Package created! Test with: npm install ./nova-ui-elements-*.tgz'"
  }
}
```

## 🔍 Method 4: Automated Testing Script

Create a verification script to check your build:

```javascript
// scripts/test-build.js
const fs = require('fs');
const path = require('path');

console.log('🔍 NovaUI Build Verification\n');

// Check if dist folder exists
if (!fs.existsSync('dist')) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Check essential files
const requiredFiles = ['dist/index.js', 'dist/index.esm.js', 'dist/index.d.ts'];

let allFilesExist = true;
let totalSize = 0;

console.log('📁 Checking build files:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    const sizeKB = (stats.size / 1024).toFixed(1);
    totalSize += stats.size;
    console.log(`   ✅ ${file} (${sizeKB}KB)`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log(`\n📊 Total bundle size: ${(totalSize / 1024).toFixed(1)}KB`);

// Check if exports are working
console.log('\n🔍 Testing exports:');
try {
  const mainExport = require('./dist/index.js');
  const exportedComponents = Object.keys(mainExport);

  if (exportedComponents.length === 0) {
    console.log('   ⚠️  No components exported!');
    allFilesExist = false;
  } else {
    exportedComponents.forEach(comp => {
      console.log(`   ✅ ${comp} exported successfully`);
    });
  }
} catch (error) {
  console.log(`   ❌ Error loading exports: ${error.message}`);
  allFilesExist = false;
}

// Check TypeScript definitions
console.log('\n📝 Checking TypeScript definitions:');
if (fs.existsSync('dist/index.d.ts')) {
  const dtsContent = fs.readFileSync('dist/index.d.ts', 'utf8');
  if (dtsContent.includes('export')) {
    console.log('   ✅ TypeScript definitions found');
  } else {
    console.log('   ⚠️  TypeScript definitions may be incomplete');
  }
} else {
  console.log('   ❌ No TypeScript definitions found');
  allFilesExist = false;
}

// Final result
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 Build verification PASSED!');
  console.log('✅ Your package is ready for testing/publishing');
} else {
  console.log('❌ Build verification FAILED!');
  console.log('🔧 Please fix the issues above before publishing');
  process.exit(1);
}
```

Add to `package.json`:

```json
{
  "scripts": {
    "build": "rollup -c",
    "test:build": "node scripts/test-build.js",
    "prepublishOnly": "npm run build && npm run test:build"
  }
}
```

## 🚀 Complete Testing Workflow

Here's a comprehensive workflow to test your package before publishing:

### Phase 1: Build Verification

```bash
# 1. Clean and build
rm -rf dist/ node_modules/
npm install
npm run build

# 2. Verify build output
npm run test:build
```

### Phase 2: Package Testing

```bash
# 3. Create package
npm pack

# 4. Test in fresh environment
cd ../
mkdir nova-ui-elements-test && cd nova-ui-elements-test
npm init -y
npm install ../nova-ui-elements/nova-ui-elements-*.tgz

# 5. Quick import test
node -e "
const { Button, Input } = require('nova-ui-elements');
console.log('✅ CommonJS import works');
console.log('Components:', Object.keys(require('nova-ui-elements')));
"
```

### Phase 3: React Integration Testing

```bash
# 6. Create React test app
npx create-react-app react-test
cd react-test
npm install ../nova-ui-elements/nova-ui-elements-*.tgz

# 7. Test components (use the App.js example above)
npm start
```

### Phase 4: TypeScript Testing (if applicable)

```bash
# 8. Test with TypeScript
npx create-react-app ts-test --template typescript
cd ts-test
npm install ../nova-ui-elements/nova-ui-elements-*.tgz

# Create test component to verify types
```

## 💡 Testing Best Practices

### 1. Test Multiple Environments

- **Different Node versions**: Test with Node 16, 18, and 20
- **Different React versions**: Test with React 16.8+, 17, and 18
- **Different bundlers**: Test with Create React App, Vite, and Next.js

### 2. Check Bundle Size

```bash
# Analyze what's included
npm pack --dry-run

# Check bundle size
ls -la nova-ui-elements-*.tgz

# Detailed analysis
tar -tzf nova-ui-elements-*.tgz | head -20
```

### 3. Performance Testing

```javascript
// Test component render performance
import { Button } from 'nova-ui-elements';

const ManyButtons = () => {
  return (
    <div>
      {Array.from({ length: 1000 }, (_, i) => (
        <Button key={i} variant="primary">
          Button {i}
        </Button>
      ))}
    </div>
  );
};
```

### 4. Accessibility Testing

Use browser dev tools to check:

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] ARIA attributes are present

## 🐛 Common Issues and Solutions

### Issue: "Module not found" after installation

**Solution:**

```bash
# Check if files are properly included
npm pack --dry-run

# Verify package.json "files" field
# Ensure "main" and "module" point to correct files
```

### Issue: TypeScript errors in consuming project

**Solution:**

```bash
# Ensure .d.ts files are generated
npm run build
ls dist/*.d.ts

# Check tsconfig.json includes type generation
```

### Issue: Components not rendering

**Solution:**

```javascript
// Verify exports in dist/index.js
console.log(require('./dist/index.js'));

// Check if React is properly externalized
// Should not include React in bundle
```

### Issue: Large bundle size

**Solution:**

```bash
# Check what's being included
npm pack --dry-run

# Update .npmignore to exclude:
# - Source files (src/)
# - Tests (__tests__/, *.test.*)
# - Stories (*.stories.*)
# - Development configs
```

## ✅ Pre-Publish Checklist

Before publishing, ensure:

- [ ] Build completes without errors
- [ ] All components export correctly
- [ ] TypeScript definitions are generated
- [ ] Package installs in fresh React app
- [ ] Components render and function properly
- [ ] Props and events work as expected
- [ ] Error states display correctly
- [ ] Responsive behavior works
- [ ] Bundle size is reasonable (<100KB for basic components)
- [ ] No React included in bundle (check externals)
- [ ] Documentation examples work
- [ ] No console errors in browser

## 🎯 Testing Automation

Consider setting up automated testing:

```yaml
# .github/workflows/test-package.yml
name: Test Package Build

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci
      - run: npm run build
      - run: npm run test:build
      - run: npm pack

      # Test installation
      - run: |
          mkdir test-install
          cd test-install
          npm init -y
          npm install ../nova-ui-elements-*.tgz
          node -e "console.log(require('nova-ui-elements'))"
```

By following these testing methods, you'll catch issues early and ensure a smooth experience for developers using your NovaUI package!
