// Jest configuration for testing our components
export default {
  // Use jsdom environment to simulate browser environment for React components
  testEnvironment: 'jsdom',

  // File patterns to find test files
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],

  // Setup files to run before each test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Transform files using ts-jest for TypeScript support
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },

  // Module file extensions for resolution
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Coverage collection settings
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/setupTests.ts', '!src/index.ts'],

  // Minimum coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
