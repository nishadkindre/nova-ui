# UI Component Library - Initial Phase Requirements Document

## Project Overview

Create a simple, reusable UI component library with Button and Input components. This is the initial phase focusing on core functionality, clean architecture, and ease of understanding.

## Technical Stack

- **Framework**: React with TypeScript
- **Build Tool**: Rollup
- **Styling**: CSS-in-JS (inline styles for simplicity)
- **Testing**: Jest + React Testing Library
- **Documentation**: Storybook
- **Package Manager**: npm

## Project Structure

```
my-ui-library/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.test.tsx
│   │   │   ├── Input.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── index.ts
├── dist/ (generated)
├── .storybook/
├── rollup.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Component Requirements

### 1. Button Component

#### Props Interface

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

#### Variants

- **Primary**: Blue background, white text
- **Secondary**: Gray background, dark text
- **Outline**: Transparent background, colored border and text

#### Sizes

- **Small**: 32px height, 12px padding
- **Medium**: 40px height, 16px padding
- **Large**: 48px height, 20px padding

#### States

- Default
- Hover (slight color change)
- Disabled (reduced opacity, no pointer events)
- Focus (outline for accessibility)

#### Accessibility Requirements

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- Focus indicators

### 2. Input Component

#### Props Interface

```typescript
interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
```

#### Features

- Optional label
- Placeholder support
- Helper text below input
- Error state with error message
- Different input types
- Controlled and uncontrolled modes

#### Sizes

- **Small**: 32px height
- **Medium**: 40px height
- **Large**: 48px height

#### States

- Default
- Focus (border color change)
- Error (red border, error message)
- Disabled (reduced opacity)

#### Accessibility Requirements

- Label association with input
- ARIA attributes for error states
- Keyboard navigation
- Screen reader support

## Design Tokens

### Colors

```typescript
export const colors = {
  primary: {
    main: '#2563eb',
    hover: '#1d4ed8',
    light: '#dbeafe'
  },
  secondary: {
    main: '#64748b',
    hover: '#475569',
    light: '#f1f5f9'
  },
  error: {
    main: '#dc2626',
    light: '#fef2f2'
  },
  text: {
    primary: '#1f2937',
    secondary: '#6b7280'
  },
  border: {
    default: '#d1d5db',
    focus: '#2563eb',
    error: '#dc2626'
  },
  background: {
    white: '#ffffff',
    gray: '#f9fafb'
  }
};
```

### Typography

```typescript
export const typography = {
  fontSize: {
    sm: '14px',
    md: '16px',
    lg: '18px'
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600
  },
  lineHeight: {
    normal: 1.5,
    tight: 1.25
  }
};
```

## Testing Requirements

### Unit Tests

- Component rendering
- Prop handling
- Event handling
- State changes
- Accessibility attributes

### Test Coverage

- Minimum 80% code coverage
- All component variants
- All interactive states
- Error scenarios

## Storybook Documentation

### Stories Required

**Button Component:**

- Default states for all variants
- All sizes
- Disabled state
- With different content (text, icons)

**Input Component:**

- Default state
- With label
- With helper text
- Error state
- Disabled state
- Different types

### Storybook Controls

- Interactive controls for all props
- Real-time prop editing
- Accessibility addon enabled

## Build Configuration

### Package.json Scripts

```json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "typecheck": "tsc --noEmit"
  }
}
```

### Output Formats

- CommonJS (dist/index.js)
- ES Modules (dist/index.esm.js)
- TypeScript declarations (dist/index.d.ts)

## Package Configuration

### Dependencies

```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "rollup": "^3.0.0",
    "@rollup/plugin-typescript": "^11.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^13.0.0",
    "@testing-library/jest-dom": "^5.16.0",
    "storybook": "^7.0.0"
  }
}
```

### Package Exports

```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"]
}
```

## Implementation Steps

### Phase 1: Setup (Day 1)

1. Initialize npm project
2. Install dependencies
3. Configure TypeScript
4. Configure Rollup
5. Create project structure

### Phase 2: Design Tokens (Day 1)

1. Define color palette
2. Define typography scale
3. Export design tokens

### Phase 3: Button Component (Day 2)

1. Create Button component with all variants
2. Write comprehensive tests
3. Create Storybook stories
4. Test accessibility

### Phase 4: Input Component (Day 3)

1. Create Input component with all features
2. Write comprehensive tests
3. Create Storybook stories
4. Test accessibility

### Phase 5: Build & Package (Day 4)

1. Configure build process
2. Test build output
3. Verify package.json configuration
4. Create README documentation
5. Test local installation

## Success Criteria

### Functionality

- ✅ Both components render correctly
- ✅ All props work as expected
- ✅ Event handlers function properly
- ✅ Accessibility requirements met

### Quality

- ✅ TypeScript compilation without errors
- ✅ All tests pass
- ✅ Storybook documentation complete
- ✅ Components follow design system

### Package

- ✅ Successful build generation
- ✅ Correct file exports
- ✅ TypeScript declarations generated
- ✅ Tree-shaking support

### Documentation

- ✅ README with usage examples
- ✅ Storybook deployed locally
- ✅ Component API documentation
- ✅ Installation instructions

## Future Considerations (Not in Scope)

- Additional components (Card, Modal, etc.)
- CSS framework integration
- Theme provider
- Animation system
- Advanced form validation
- Automated publishing
- CI/CD pipeline

---

## Prompt for Implementation

_Use this document as a comprehensive guide to implement a simple UI component library. Start with the project setup, implement the design tokens, then build the Button and Input components following the specified requirements. Focus on simplicity, clean code, and good developer experience. Each component should be fully tested, documented in Storybook, and accessible._
