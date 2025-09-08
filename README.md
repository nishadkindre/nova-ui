# Nova UI

A modern, lightweight React component library built with TypeScript. Create beautiful, accessible user interfaces with minimal setup.

## ✨ Features

- **8 Essential Components** - Button, Input, Select, Table, Badge, Switch, Tooltip, Spinners
- **TypeScript First** - Full type safety and excellent developer experience
- **Design System** - Comprehensive color palette and typography tokens
- **Storybook Documentation** - Interactive component playground
- **Tree Shakeable** - Import only what you need
- **Accessible** - Built with accessibility best practices
- **Customizable** - Override styles with design tokens or custom CSS

## 📦 Installation

```bash
npm install nova-ui-elements
```

## 🚀 Quick Start

```jsx
import { Button, Input, Badge } from 'nova-ui-elements';

function App() {
  return (
    <div>
      <Button variant="primary" size="large">
        Get Started
      </Button>
      
      <Input 
        label="Email" 
        type="email" 
        placeholder="Enter your email" 
      />
      
      <Badge variant="success">New</Badge>
    </div>
  );
}
```

## 🧩 Components

- **Button** - Multiple variants, sizes, icon support, loading states
- **Input** - Form inputs with validation and styling options  
- **Select** - Dropdown selection with search and multi-select
- **Table** - Data tables with sorting and pagination
- **Badge** - Status indicators and labels
- **Switch** - Toggle controls for boolean values
- **Tooltip** - Contextual information overlays
- **Spinners** - Loading indicators (Ring & Line variants)

## 🎨 Design System

Access the complete design system for custom styling:

```jsx
import { theme, typography, blue, green } from 'nova-ui-elements';

// Use design tokens
const customButton = {
  backgroundColor: blue[500],
  color: theme.colors.white,
  fontSize: typography.sizes.md
};
```

## 📚 Documentation

- [Getting Started](./docs/getting-started.md) - Setup and basic usage
- [Components](./docs/) - Detailed component guides
- [Storybook](./storybook-static/index.html) - Interactive documentation

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build library
npm run build

# Run tests
npm test
```

## 📄 License

MIT © [Nishad Kindre](https://github.com/nishadkindre)

### Building

The build process creates:

- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES Modules build
- `dist/index.d.ts` - TypeScript declarations

### Testing

Tests are written with Jest and React Testing Library:

```bash
npm test
```

### Storybook

Interactive component documentation:

```bash
npm run storybook
```

## 📝 Code Structure

```
src/
├── components/           # All UI components
│   ├── Button/          # Button component
│   │   ├── Button.tsx   # Main component
│   │   ├── Button.test.tsx    # Tests
│   │   ├── Button.stories.tsx # Storybook stories
│   │   └── index.ts     # Exports
│   └── Input/           # Input component
│       └── ...          # Same structure
├── tokens/              # Design system tokens
│   ├── colors.ts        # Color palette
│   ├── typography.ts    # Typography scale
│   └── index.ts         # Token exports
└── index.ts             # Main library export
```

## 🤝 Contributing

This is a learning project! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development!

## 📚 Learning Resources

This library is built with:

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Rollup](https://rollupjs.org/) - Module bundler
- [Jest](https://jestjs.io/) - Testing framework
- [Storybook](https://storybook.js.org/) - Component documentation
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities

Perfect for learning modern React development practices!
