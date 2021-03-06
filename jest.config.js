const { resolve } = require('path')

module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-axe/extend-expect',
  ],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '@/pages/(.*)$': resolve(__dirname, './pages/$1'),
    '@/components/(.*)$': resolve(__dirname, './components/$1'),
    '@/lib/(.*)$': resolve(__dirname, './lib/$1'),
    '@/types/(.*)$': resolve(__dirname, './types/$1'),
    '@/data/(.*)$': resolve(__dirname, './data/$1'),
    '@testUtils': resolve(__dirname, './test/testUtils'),
  },
}
