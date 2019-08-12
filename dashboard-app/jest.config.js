module.exports = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src'
  ],
  transform: {
      '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: [
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'ts'
  ],
  testEnvironment: 'node',
  // transformIgnorePatterns: ['<rootDir>/node_modules'],
  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy',
  },
  setupFiles: [
    'jest-canvas-mock'
  ],

};