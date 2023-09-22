// So JEST doesn't try to find exports in React CSS imports, give it a dummy export file
module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/styleMock.js'
  }
}
