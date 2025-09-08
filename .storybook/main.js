// Storybook configuration - this tells Storybook how to find and display our stories
export default {
  // Array of file patterns where Storybook should look for stories
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  // Essential addons for better development experience
  addons: [
    '@storybook/addon-essentials' // Includes controls, actions, docs, etc.
  ],

  // Framework configuration
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  // TypeScript configuration for Storybook
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  }
};
