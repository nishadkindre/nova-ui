// Global preview configuration for all stories
export const parameters = {
  // Configure the actions addon
  actions: { argTypesRegex: '^on[A-Z].*' },

  // Configure the controls addon
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },

  // Configure the docs addon
  docs: {
    description: {
      component: 'UI Component Library - Simple and beginner-friendly React components'
    }
  }
};
