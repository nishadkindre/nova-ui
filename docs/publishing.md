# 📦 Publishing Your Package to npm

This guide will walk you through the complete process of publishing your NovaUI package to the npm registry so users worldwide can install it with `npm install nova-ui-elements`.

## 📋 Prerequisites

Before publishing, ensure you have:

- **Node.js** installed (version 16 or higher)
- **npm account** (free at [npmjs.com](https://www.npmjs.com))
- **Built and tested** your package locally
- **Git repository** (recommended for version control)

## 🚀 Step-by-Step Publishing Process

### Step 1: Prepare Your Package Configuration

Ensure your `package.json` is properly configured for publishing:

```json
{
  "name": "nova-ui-elements",
  "version": "1.0.0",
  "description": "A React UI component library with Button and Input components",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md", "docs"],
  "scripts": {
    "build": "rollup -c",
    "prepublishOnly": "npm run build",
    "test:build": "node scripts/test-build.js"
  },
  "keywords": ["react", "ui", "components", "design-system", "button", "input", "typescript"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/yourusername/nova-ui-elements#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/nova-ui-elements.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/nova-ui-elements/issues"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "rollup": "^3.0.0",
    "typescript": "^5.0.0"
  }
}
```

**Key Fields Explained:**

- `name`: Your package name (must be unique on npm)
- `version`: Semantic version (start with 1.0.0)
- `main`: Entry point for CommonJS
- `module`: Entry point for ES modules
- `types`: TypeScript definitions
- `files`: What gets included in the published package
- `keywords`: Help users discover your package
- `peerDependencies`: Dependencies users must install separately

### Step 2: Create Essential Files

#### README.md

Create a comprehensive README at the root of your project:

````markdown
# NovaUI

A lightweight, accessible React UI component library built with TypeScript.

## Features

✨ **Modern Components** - Button and Input components with multiple variants
🎨 **Customizable** - Easy theming and styling options
📱 **Responsive** - Works great on desktop and mobile
♿ **Accessible** - Built with accessibility best practices
🔧 **TypeScript** - Full TypeScript support with type definitions

## Installation

```bash
npm install nova-ui-elements
```
````

## Quick Start

```javascript
import React from 'react';
import { Button, Input } from 'nova-ui-elements';

function App() {
  return (
    <div>
      <Button variant="primary" size="large">
        Hello World
      </Button>
      <Input label="Your Name" placeholder="Enter your name" />
    </div>
  );
}
```

## Documentation

- [Getting Started](./docs/getting-started.md)
- [Button Component](./docs/button.md)
- [Input Component](./docs/input.md)
- [Theming](./docs/theme.md)

## License

MIT © Your Name

````

#### LICENSE
```text
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

#### .npmignore

Control what files are excluded from the published package:

```text
# Source files
src/
tests/
__tests__/

# Development files
docs/
scripts/
.storybook/

# Build configuration
rollup.config.js
tsconfig.json
jest.config.js
webpack.config.js

# Git and CI
.git/
.github/
.gitignore

# Dependencies
node_modules/

# Logs and temporary files
*.log
.env
.env.local
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Coverage reports
coverage/
.nyc_output/
```

### Step 3: Build and Validate Your Package

```bash
# Build your package
npm run build

# Verify the build output
ls dist/
# Should show: index.js, index.esm.js, index.d.ts

# Test the build (optional validation script)
npm run test:build
```

### Step 4: Create npm Account and Login

1. **Create Account:**
   - Go to [npmjs.com](https://www.npmjs.com)
   - Sign up for a free account
   - Verify your email address

2. **Login via Terminal:**

   ```bash
   npm login
   ```

   Enter your username, password, and email when prompted.

3. **Verify Login:**
   ```bash
   npm whoami
   ```

### Step 5: Check Package Name Availability

```bash
# Check if your package name is available
npm view nova-ui-elements

# If taken, you'll see package info
# If available, you'll see an error (which is good!)
```

**If Name is Taken:**

- Use a scoped package: `@yourusername/nova-ui-elements`
- Choose a different name: `nova-ui-elements-components`, `awesome-ui-kit`
- Add descriptive suffix: `nova-ui-elements-react`, `nova-ui-elements-lib`

### Step 6: Publish Your Package

#### For Public Packages:

```bash
# Publish your package
npm publish
```

#### For Scoped Packages:

```bash
# Update package.json name first
# "name": "@yourusername/nova-ui-elements"

# Publish as public scoped package
npm publish --access public
```

### Step 7: Verify Publication

1. **Check on npm:**
   - Visit `https://www.npmjs.com/package/nova-ui-elements`
   - Verify all information looks correct

2. **Test Installation:**

   ```bash
   # Create a test directory
   mkdir test-install
   cd test-install
   npm init -y

   # Install your published package
   npm install nova-ui-elements

   # Test import
   node -e "console.log(require('nova-ui-elements'))"
   ```

## 🔄 Publishing Updates

### Semantic Versioning

Follow semantic versioning (semver) rules:

- **Patch** (1.0.0 → 1.0.1): Bug fixes, no breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Update Workflow

```bash
# Make your changes and test them

# Update version number
npm version patch  # or minor, or major

# This automatically:
# 1. Updates package.json version
# 2. Creates a git tag
# 3. Runs prepublishOnly script (builds the package)

# Publish the update
npm publish

# Push the changes and tags to git
git push && git push --tags
```

## 🛡️ Best Practices

### 1. Use Scoped Packages for First-Time Publishing

```json
{
  "name": "@yourusername/nova-ui-elements"
}
```

Benefits:

- Avoids naming conflicts
- Free for public packages
- Professional appearance

### 2. Set Up Automated Publishing

#### GitHub Actions (`.github/workflows/publish.yml`):

```yaml
name: Publish to npm

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 3. Add Security Checks

```bash
# Check for vulnerabilities
npm audit

# Check for outdated dependencies
npm outdated

# Use exact versions in package.json for stability
```

### 4. Beta Releases

For testing new features:

```bash
# Publish beta version
npm version prerelease --preid=beta
npm publish --tag beta

# Users install with:
# npm install nova-ui-elements@beta
```

## 🔧 Troubleshooting

### Common Issues:

**1. "Package name already exists"**

```bash
# Solution: Use scoped package or different name
npm publish --access public  # for scoped packages
```

**2. "Need to login"**

```bash
npm login
# Verify with: npm whoami
```

**3. "403 Forbidden"**

```bash
# Check if you're logged in
npm whoami

# Check package name ownership
npm owner ls nova-ui-elements
```

**4. "Package size too large"**

```bash
# Check what's being included
npm pack --dry-run

# Update .npmignore to exclude unnecessary files
```

### Size Optimization:

```bash
# Check bundle size
npm pack
tar -tzf nova-ui-elements-1.0.0.tgz

# Analyze what's included
npx bundlephobia nova-ui-elements
```

## 📊 Post-Publishing Checklist

- [ ] Package appears on npmjs.com
- [ ] Installation works: `npm install nova-ui-elements`
- [ ] Import works: `import { Button } from 'nova-ui-elements'`
- [ ] TypeScript definitions load correctly
- [ ] Documentation links work
- [ ] README displays properly on npm
- [ ] All components export correctly

## 🌟 Growing Your Package

### 1. Add Package Stats Badge

Add to your README:

```markdown
[![npm version](https://badge.fury.io/js/nova-ui-elements.svg)](https://badge.fury.io/js/nova-ui-elements)
[![npm downloads](https://img.shields.io/npm/dm/nova-ui-elements.svg)](https://www.npmjs.com/package/nova-ui-elements)
```

### 2. Monitor Usage

- Check npm download stats
- Monitor GitHub issues and feedback
- Track which components are most used

### 3. Maintain Your Package

- Respond to issues quickly
- Keep dependencies updated
- Follow React ecosystem changes
- Add new components based on user feedback

Congratulations! Your package is now available worldwide for developers to use. Remember to maintain it regularly and listen to user feedback for improvements.
