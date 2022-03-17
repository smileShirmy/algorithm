module.exports = {
  verbose: true,
  globals: {},
  roots: ['<rootDir>'],
  cache: false,
  testRegex: '(/__test__/.*|\\.(test|spec))\\.(ts|js)$',
  testPathIgnorePatterns: ['/__tests__/__utils__'],
  transform: {
    '.ts': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: ['/test/', '/__tests__/'],
  coverageReporters: ['json', 'text', 'lcov', 'clover']
};
