import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // Disable type checking for tests
        isolatedModules: true,
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  snapshotResolver: './test/snapshot-resolver.ts',
  testTimeout: 20 * 1000,
  testEnvironment: 'setup-polly-jest/jest-environment-node',
}

export default jestConfig
