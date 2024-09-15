module.exports = {
  preset: 'ts-jest', // Use ts-jest for transforming TypeScript
  testEnvironment: 'node', // or 'jsdom' if testing browser-like environment
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'], // Adjust the pattern to find your test files
};