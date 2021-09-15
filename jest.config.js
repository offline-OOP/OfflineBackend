module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '#(.*)$': '<rootDir>/src/$1',
  },
  testTimeout: 20000,
};
